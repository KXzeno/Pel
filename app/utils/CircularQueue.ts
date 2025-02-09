/**
 * A utility node class with unidirectional 
 * traversal intended for a circular queue
 *
 * @typeParam E - Type of data the node stores
 *
 * @author Kx
 */
class Node<E> {
  // Initialize content and successor node
  public item: E | null = null;
  private successor: Node<E> | null = null;
  constructor(item?: E) {
    // If an element is passed, modify this node's item
    if (item) {
      this.item = item;
      return;
    }
  }

  /**
   * Gets the node referenced by this node
   *
   * @return the successor node
   */
  public next(): Node<E> | null {
    return this.successor;
  }

  /**
   * Assigns the node a reference to a successor node
   *
   * @param node - a successor node to reference
   * @return true if the node is valid, else false
   */
  public setNext(node: Node<E>): boolean {
    if (node instanceof Node) {
      this.successor = node;
      return true;
    } 
    return false;
  }

  /**
   * Mutates the stored value in the node
   *
   * @param item - the item to update the node data
   * @return the updated node
   */
  public mutate(item: E): Node<E> {
    this.item = item;
    return this;
  }
}

/**
 * A general-purposed circular queue to store data
 *
 * @typeParam T - Type of element stored in the queue
 *
 * @author Kx
 */
export default class CircularQueue<T> {
  // Initialize priority node
  private leader: Node<T> = new Node();
  
  /**
   * Initializes utility node whose purpose is to
   * watch the terminal node, allowing the enforcement
   * of assigning a penultimate and a successor
   *
   * @privateRemarks
   * The class logic is birthed by pure intuition, perhaps
   * a far more effective approach had passed me
   */
  private sentinel: Node<T> = new Node();

  // Initialize capacity
  private sz: number = 0;

  /**
   * Constructs a circular queue, assigning the leader
   * node when an argument is given
   *
   * @param leader - an optional value to assign the leader node
   */
  public constructor(leader?: T) {
    if (leader || leader === 0) {
      this.leader.mutate(leader);
      this.sz++;
    } 
  }

  /**
   * Returns the first node
   *
   * @return the leader node
   */
  public first(): Node<T> {
    return this.leader;
  }

  /**
   * Appends a node to the queue
   *
   * @param item - the value to assign to the node
   * @return the new capacity
   */
  public enqueue(item: T): number {
    // Initialize the node with the given value
    const node = new Node(item);

    /**
     * Populate the priority node for a argumentless prototype,
     * this replicates the the constructor logic 
     *
     * @privateRemarks
     * Seems like in TS, not only is there no constructor overloading,
     * but you cannot self-construct in the class definition.
     */
    if (this.sz === 0) {
      this.leader.mutate(item);
      return ++this.sz
    }

    // Throws an error if item somehow is null
    if (item === null) {
      throw new Error('Nullish item detected.');
    }

    // Defines a basic relationship between header and enqueued
    // node, terminating early to avoid sentinel's core behavior
    if (this.terminal() === true) {
      this.sentinel.setNext(node); 
      this.leader.setNext(node);
      node.setNext(this.leader);
      return ++this.sz;
    }

    // Reference the penultimate node using the sentinel
    const penultimate = this.sentinel.next();

    // Throw an error if the penultimate node is somehow nullish
    if (penultimate === null) {
      throw new Error('Sentinel failed to reference penultimate node.');
    }

    // Reference the penultimate node to the enqueued node
    penultimate.setNext(node);

    // Reference the enqueued node to the leader/priority node
    node.setNext(this.leader);

    // Enforce sentinel node to watch the new terminal node

    this.sentinel.setNext(node); 

    // Update capacity
    this.sz++;
    return this.size();
  }

  /**
   * Removes the first node from the queue
   *
   * @throws an error if dequeuing nothing
   * @return the node removed from queue
   *
   * @privateRemarks
   *
   * This has potential to excise a node regardless
   * of position, but to tarry no further it will
   * be defined at a time needed
   */
  public dequeue(): Node<T> {
    // Throw an error if dequeuing an empty queue
    if (this.size() === 1 || !this.leader.next()) {
      // If the leader node contains data, extract the node and terminate
      if (this.leader.item !== null) {
        const data = { ...this.leader } as const;
        this.leader.item = null;
        return data as Node<T>;
      }
      throw new Error('No items to dequeue.');
    }

    // Assign the leader node to the next node in queue
    const fallen = this.leader; 
    this.leader = this.leader.next() as Node<T>;

    // Use the sentinel node to reassign the terminal node's reference
    const terminal = this.sentinel.next();

    // Throw an error if terminal node is undefined
    if (terminal === null) {
      throw new Error('Terminal node is nullish.');
    }

    terminal.setNext(this.leader);

    // Decrement to update capacity
    this.sz--;
    return fallen;
  }

  /**
   * Returns the queue capacity
   *
   * @return the size of the queue
   */
  size(): number {
    return this.sz;
  }

  /**
   * Validates a single-item queue
   *
   * @return true if the queue contains one node, else false
   */
  protected terminal(): boolean {
    return this.sz === 1 ? true : false;
  }
}
