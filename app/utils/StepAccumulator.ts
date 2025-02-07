export default class StepAccumlator {
  private initial;

  constructor(initial: readonly [number]) {
    this.initial = initial;
  }

  public static attach(num: number) {
    return this.transform(num);
  }

  private static transform<T extends number>(num: T): T {
    return num;
  }

  public createNumberedArray(start: number, end: number, step: number = 1): Array<string> {
    let arr = [start];
    while (arr[arr.length - 1] < end) {
      // Ensure .1 incrementation by pre/post mapping with multiple of 10
      let val = (arr[arr.length - 1] * 10 + step * 10) / 10;
      arr.push(val);
    }
    const newArr = arr.map(num => num.toString());
    return newArr;
  };
}
