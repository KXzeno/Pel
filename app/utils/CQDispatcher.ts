import Dispatcher, { type ActiveCollection } from './Dispatcher';
import CircularQueue from './CircularQueue';

/**
 * A circular-queue implementation of a promise dispatcher
 *
 * @typeParam T - Type parameterized within promise argument(s)
 * @typeParam P - Type of promise to concretely define Dispatcher
 */
export default class CQDispatcher<T, P extends Promise<T>> implements Dispatcher<P> {
  private dq: CircularQueue<P> = new CircularQueue<P>();
  private collection: ActiveCollection<P> = { leader: null, inactive: null };

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
    let items = [];

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
      leader: items[0],
      inactive: items.filter((_, i) => i !== 0) as P[],
    }
  }

  /**
   * Begins a synchronous dispatch of stored events starting 
   * from the leader and returns the refreshed dispatcher
   *
   * @returns the cleared dispatcher
   */
  public async dispatch(): Promise<CQDispatcher<T, P>> {
    // Extract event and next reference
    const [evt, next] = [this.dq.first(), this.dq.first().next()];
    // Dispatch when leader is truthy
    if (evt !== null && evt.item !== null) {
      await evt.item.then(async () => {
        this.dq.dequeue();
        this.items();
        if (next) {
          await this.dispatch();
        } 
      });
    } else {
      // Ensure queue is cleared
      this.clear();
    }
    return this;
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
    this.dq.enqueue(evt);
    // Call items to update collection
    this.items();
    return this.dq.size();
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
}
