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
        return;
      } 
      for (let i = 0; i < inputs.length; i++) {
        this.dq.enqueue(inputs[i]);
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
    // Return the current collection if called on empty
    if (this.dq.size() === 0) {
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

  public dispatch(storedNode?: P | undefined): void {
    console.log(storedNode);
  }

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
    return this.dq.size();
  }

  public clear(): void {
  }
}
