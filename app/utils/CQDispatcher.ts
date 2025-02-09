import Dispatcher, { type ActiveCollection } from './Dispatcher';
import CircularQueue from './CircularQueue';

export default class CQDispatcher<T, P extends Promise<T>> implements Dispatcher<P> {
  private dq: CircularQueue<P> = new CircularQueue<P>();
  private sz: number = 0;

  public constructor(...inputs: P[]) {
    console.log('hi', inputs.length, inputs);
    if (inputs) {
      this.sz = inputs.length;
      if (inputs.length === 1) {
        this.dq.enqueue(inputs[0]);
        return;
      } 
      for (let i = 0; i < inputs.length; i++) {
        this.dq.enqueue(i);
      }
    }
  }

  public items(): ActiveCollection<P> {
    const temp: ActiveCollection<P> = {
      leader: this.dq[0],
      inactive: this.dq.filter((_, i) => i !== 0),
    }
    return temp;
  }

  public dispatch(storedNode?: P | undefined): void {
    console.log(storedNode);
  }

  public capacity(): number {
    return this.dq.length;
  }

  public append(evt: P): number {
    return this.sz;
  }

  public clear(): void {
  }
}
