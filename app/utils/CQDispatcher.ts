import Dispatcher, { type ActiveCollection } from './Dispatcher';

export class CQDispatcher<N> implements Dispatcher<N> {
  private dispatchQueue: N[];
  private sz: number = 0;

  public constructor(startingNode: N) {
    this.dispatchQueue = [startingNode];
    this.sz = this.dispatchQueue.length;
  }

  public items(): ActiveCollection<N> {
    const temp: ActiveCollection<N> = {
      leader: this.dispatchQueue[0],
      inactive: this.dispatchQueue,
    }
    return temp;
  }

  public dispatch(storedNode?: N | undefined): void {
    console.log(storedNode);
  }

  public capacity(): number {
    return -1;
  }

  public append(node: N): number {
    return this.sz;
  }

  public clear(): void {
  }
}
