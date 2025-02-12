import Timer, { type DebugTimer } from './AbstractTimer';

/**
 * A concrete timer for testing performance of functions,
 * one is intended to only use the static method `track`
 * unless he is to debug an issue with the held timer.
 * 
 * @author Kx
 */
export default class PerfTimer extends Timer {
  // Volatile timer to define static member activeTimer
  private timer: DebugTimer = { start: 0, end: 0 };

  // Number of calls updated by track method
  public static calls: number = 0;

  // Defined by the volatile timer, used to instantiate to class Timer
  private static activeTimer: PerfTimer | null = null;

  private constructor() {
    // Initialize parent class definitions
    super();
  }

  /**
   * {@inheritDoc Timer.start} 
   * @override
   */
  protected start(): void {
    this.timer.start = performance.now();
  }

  /** 
   * {@inheritDoc Timer.end}
   * @override
   */
  protected end(): void {
    if (PerfTimer.activeTimer === null) {
      throw new Error('No timer in session to end.');
    }

    this.timer.end = performance.now();

    // Signals to Timer class a timer is active
    Timer.state = true;

    // Self instantiates to Timer class
    Timer.instances.push(PerfTimer.activeTimer);

    // Nulls the static PerfTimer for a new tracker
    PerfTimer.activeTimer = null;
  }

  /**
   * {@inheritDoc Timer.getTimer} 
   * @override
   */
  public getTimer(): DebugTimer {
    return this.timer;
  }

  /**
   * Starts or ends a current tracker
   *
   * @returns the number of tracking calls the class has received
   */
  public static track(): number {
    // If the end timer is initialized, pseudo-label the
    // timer as complete and self-instantiate to Timer class
    if (!PerfTimer.activeTimer) {
      // Reinstantiate static timer for tracking a new session
      PerfTimer.activeTimer = new PerfTimer();
    }

    // Append to call count; used for debugging purposes
    PerfTimer.calls++;

    switch (PerfTimer.calls % 2) {
      // Call end method with a concrete DebugTimer
      case 0: PerfTimer.activeTimer.end(); break;
      // Initialize the DebugTimer's start
      case 1: PerfTimer.activeTimer.start(); break;
    }

    return PerfTimer.calls;
  }
}
