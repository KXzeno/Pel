export type ActiveCollection<T> = {
  readonly leader: T;
  inactive: T[];
}

/**
 * A collection of queued nodes, typically functions,
 * that self-executes after the completion of the leader 
 * function
 *
 * @typeParam T - Type of function to store in collection 
 *
 * @author Kx
 */
export default interface Dispatcher<T> {
  /**
   * Returns an object which separately 
   * references the leader and the collection
   * @return the active collection
   */
  items(): ActiveCollection<T>;

  /**
   * Begins the autonomous execution
   * 
   * @param storedNode - a node to mark as leader
   *
   * @throws Error
   * Thrown if this method is called during an on-going
   * dispatch unless called with an optional parameter
   */
  dispatch(storedNode?: T): void;

  /**
   * Returns the number of nodes in the collection
   *
   * @returns number of nodes in collection
   */
  capacity(): number;

  /**
   * Appends the node argument to the collection 
   * and returns the new capacity
   *
   * @returns the new capacity after appending
   */
  append(node: T): number;

  /** 
   * Recursively remove each node in the collection
   */
  clear(): void;
}
