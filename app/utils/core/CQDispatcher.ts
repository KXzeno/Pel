import Dispatcher, {
  type ActiveCollection, 
  type AsyncFunction 
} from './Dispatcher';
import CircularQueue from './CircularQueue';

/**
 * A circular-queue implementation of a promise dispatcher
 *
 * @typeParam T - Type parameterized within promise argument(s)
 * @typeParam P - Type of promise to concretely define Dispatcher
 *
 * TODO: The major flaw of this design is that it initially assumed that
 * the body definitions of Promise objects are not executed on instantiation.
 * Being brought light to that, this class needs to be refactored for
 * polling or another signaling logic to retry their resolvers.
 */
export default class CQDispatcher<T, P extends Promise<T> | AsyncFunction<T>> implements Dispatcher<P> {
  private dq: CircularQueue<P> = new CircularQueue<P>();
  private collection: ActiveCollection<P> = { leader: null, inactive: null };
  public active: boolean = false;

  /**
   * @param inputs - the passed promise inputs
   * 
   * @privateRemarks
   *
   * Spreading the arguments seem to force an optional
   *
   * The use of spread here reminds me of the JVM command line
   * string args within the main methods, akin to node's runetime
   * environment using 'process.argv'
   */
  public constructor(...inputs: P[]) {
    // Only modify the class queue if inputs are passed
    if (inputs) {
      if (inputs.length === 1) {
        this.dq.enqueue(inputs[0]);
        // Call items to update collection
        this.items();
        return;
      } 
      for (let i = 0; i < inputs.length; i++) {
        this.dq.enqueue(inputs[i]);
        this.items();
      }
    }
  }

  /**
   * Returns an object specifying separately 
   * the priority item and the rest of the items
   *
   * @returns an active collectioned keying the priority item and the rest
   */
  public items(): ActiveCollection<P> {
    // Return the current collection if called on empty or stale leader
    if (this.dq.size() === 0) {
      if (this.collection.leader !== null) {
        return { leader: null, inactive: null };
      }
      return this.collection;
    }

    // Return a collection only defining the leader if called on a one-item queue
    if (this.dq.size() === 1) {
      return { leader: this.dq.first().item, inactive: null };
    }

    // Initialize an array for storing items post-traversal of queue
    const items = [];

    // Store the priority item first before traversing
    let traverser = this.dq.first();
    items.push(traverser.item);

    // Traverse the queue and store to items array without dereferencing
    while (this.dq.size() !== items.length) {
      traverser = traverser.next() as NonNullable<ReturnType<typeof traverser['next']>>;
      items.push(traverser.item);
    }

    // Update the current collection
    return this.collection = {
      leader: items[0] as P,
      inactive: items.filter((_, i) => i !== 0) as P[],
    }
  }

  /**
   * Begins a synchronous dispatch of stored events starting 
   * from the leader and returns the refreshed dispatcher
   *
   * @returns the cleared dispatcher
   */
  public async dispatch(): Promise<{ dispatcher: CQDispatcher<T, P>, fulfilled: boolean }> {
    // Extract event and next reference
    // FIXME: Employ checks / logic using next to avoid linter
    // const [evt, next] = [this.dq.first(), this.dq.first().next()];
    const evt = this.dq.first();
    const { item } = evt;
    if (item === null) {
      this.clear();
      return { dispatcher: this, fulfilled: this.active };
    }

    // Cannot invoke via ternary otherwise compiler error
    const dispatchedRef: boolean | null = this.isAsyncFunction(item) ? await this.dispatchAsyncFunction(item) : await this.dispatchPromise(item);

    return { dispatcher: this, fulfilled: dispatchedRef };
  }

  /**
   * Returns the current length of the queue
   *
   * @returns length of dispatch queue
   */
  public capacity(): number {
    return this.dq.size();
  }

  /**
   * Appends and event to the dispatcher
   *
   * @param evt - the event to append
   * @returns the new capacity of the queue
   */
  public append(evt: P): number {
    if (this.active === true) {
      const qArr = this.toArray();
      if (this.isAsyncFunction(evt) && qArr !== null) {
        const queued = Promise.all(qArr).then(() => evt())
        this.append(queued as P);
        this.items();
        return this.capacity();
      }
    }
    this.dq.enqueue(evt);
    // Call items to update collection
    this.items();
    return this.capacity();
  }

  /**
   * Recursively dequeue and update the active collection
   *
   * @remarks
   *
   * An optional param to dequeue an in-between requires
   * a new data structure, like a deque.
   */
  public clear(): void {
    if (this.capacity() === 0) {
      return;
    }
    const size = this.capacity();
    for (let i = size; i !== 0; i--) {
      this.dq.dequeue();
      this.items();
    }
  }

  /**
   * Type predicate for item to dispatch
   *
   * @param fn - a promise or a async function
   */
  private isAsyncFunction(fn: Promise<T> | AsyncFunction<T> | null): fn is AsyncFunction<T> {
    return (fn as Promise<T>).then === undefined;
  }

  /**
   * Dispatches an async function argument
   *
   * @param evt - an async function to dispatch
   * @returns a pending boolean indicating dispatch completion
   */
  private async dispatchAsyncFunction(evt: AsyncFunction<T>): Promise<boolean> {
    // Set active state
    this.active = true;

    evt().then(async () => {
    // Attempt to dequeue for linear dispatch
      try {
        this.dq.dequeue();
      } catch (e) {
        // FIXME: Handle empty dequeue
        console.error(e);
      }
      // Call items method to update active collection
      this.items();
      const { item } = this.dq.first();
      // Recursively dispatch existing items
      if (item !== null && this.isAsyncFunction(item)) {
        await this.dispatchAsyncFunction(item);
      }
      // Set inactive state when complete
      this.active = false;
    });
    // Return the inverse as success indication
    return !(this.active)
  }

  /**
   * Dispatches a promise argument
   *
   * @param evt - the promise to dispatch
   * @returns a pending boolean indicating dispatch completion
   */
  private async dispatchPromise(evt: Promise<T>): Promise<boolean> {
    // Set active state
    this.active = true;
    // Dispatch when leader is truthy
    evt.then(async () => {
    // Attempt to dequeue for linear dispatch
      try {
        this.dq.dequeue();
      } catch (e) {
        // FIXME: Handle error
        console.error(e);
      }
      // Call items method to update active collection
      this.items();
      // Recursively dispatch existing items
      if (this.dq.first() !== null) {
        await this.dispatch();
      } 
      // Set inactive state
      this.active = false;
    });
    // Return the inverse as success indication
    return !(this.active);
  } 

  /**
   * Outputs the active collection as an array
   *
   * @returns an array of 
   */
  public toArray(): Array<P> | null {
    const arr: Array<P> = [];
    const first = this.dq.first();

    let traverser: NonNullable<typeof first> | null = null;

    while (arr.length !== this.capacity()) {
      // Check if traverser is initialized
      if (!traverser) {
        // Check if first can be initialized to traverser, else null
        if (!first || !first.item) {
          return null;
        }
        traverser = first;
        arr.push(first.item);
        continue;
      }
      // Traverse through next node and push it's item after check
      traverser = traverser.next();
      if (traverser && traverser.item) {
        arr.push(traverser.item);
      }
    }

    // Deploy truthy predicate
    if (this.isNonNullishArray(arr)) {
      return null;
    }
    return arr;
  }

  /**
   * Type predicate for toArray method's return
   *
   * @param arr - an array of promise or async 
   * function with potential nullish candidates
   */
  private isNonNullishArray(arr: Array<Promise<T> | AsyncFunction<T> | null>): arr is Array<P> {
    return !arr.some(item => item === null);
  }
}
