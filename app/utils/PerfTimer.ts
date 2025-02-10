import Timer, { type DebugTimer } from './AbstractTimer';

export default class PerfTimer extends Timer {
  private timer: DebugTimer = { start: 0, end: 0 };
  public static calls: number = 0;
  private static activeTimer: PerfTimer | null = null;

  private constructor() {
    super();
  }

  protected start(): void {
    this.timer.start = performance.now();
  }

  protected end(): void {
    if (PerfTimer.activeTimer === null) {
      throw new Error('No timer in session to end.');
    }

    this.timer.end = performance.now();

    Timer.state = true;

    Timer.instances.push(PerfTimer.activeTimer);
    PerfTimer.activeTimer = null;
  }

  public getTimer(): DebugTimer {
    return this.timer;
  }

  public static track() {
    if (!PerfTimer.activeTimer) {
      PerfTimer.activeTimer = new PerfTimer();
    }
    PerfTimer.calls++;
    switch (PerfTimer.calls % 2) {
      case 0: PerfTimer.activeTimer.end(); break;
      case 1: PerfTimer.activeTimer.start(); break;
    }
  }
}
