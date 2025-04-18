import PerfTimer from "./PerfTimer";

export default abstract class Timer {
  // One or various stored timers instantiated by subclasses
  protected static instances: Timer[] = [];

  // A signal activated by sub timers, closed by Timer
  protected static state: boolean = false;

  protected constructor() {}

  /**
   * Initializes the first time-related property of a private member 
   */
  protected abstract start(): void;


  /**
   * Instantiates an instance of a subclass to Timer's `instances` thereafter
   * restoring the default values of the subclasses' volatile private member 
   */
  protected abstract end(): void;

  /**
   * Utility method to display timer-related information as output
   *
   * @param timer - an instance of a timer subclass
   * @param options - the options for formatting
   */
  private static format(timer: Timers, options?: FormatOptions): string {
    // Destructure timer properties
    let { start, end } = timer;

    // Round start and end with 10^2
    start = Math.round(start * 100) / 100;
    end = Math.round(end * 100) / 100;

    // Initialize difference for ms runtime 
    const rt = Math.round(1 + (end - start) * 1000) / 1000;

    // Handle optional arguments
    // TODO: Implement methods or concrete case definitions
    if (options && options.diff) {
      // Initialize millisecond differences of both timers
      // Offset by 1 to handle cases of 0-based quotients
      const timer1Diff = 1 + end - start;
      const timer2Diff = 1 + options.diff.end - options.diff.start;

      // Truncate to 10^4 for rounding then evaluate to nearest tenths of a second for %
      const timerDiffPercent = Math.round((timer1Diff - timer2Diff) / timer1Diff * 10000) / 100;

      // Truncate millisecond difference between the timers
      const timerDiff = Math.round(timer1Diff - timer2Diff * 10000) / 100;

      // If signaling 'final', return the change in % from start (options) to end (timer)
      if (options.final) {
        return `Overall change: ${timerDiffPercent}%\n\n`;
      }

      // Format when comparing a previous record
      return `\u{1F7E2}: ${start}ms\n\u{1F3C1}: ${end}ms - (${rt}ms)\n    \u2193\nChanged by ${timerDiffPercent}%, ${timerDiff}ms\n\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\n`
    }
    // Default format
    return this.instances.length !== 1 ? 
      `\u{1F7E2} : ${start}ms\n\u{1F3C1} : ${end}ms - (${rt}ms)\n    \u2193\n    \u2193` :
      `\u{1F7E2} : ${start}ms\n\u{1F3C1} : ${end}ms - (${rt}ms)\n\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\n`;
  }

  /**
   * Displays the time records and their changes if specified
   *
   * @param options - the required properties specifying type of timer and output
   *
   * TODO: Find if possible a better solution to length checking 
   * or modularize and encapsulate the case definitions
   *
   * TODO: Override this within subclasses to which their display method
   * displays their timer, position in this class and the position respective 
   * to other timers of the same type
   */
    public static display(options: DisplayOptions = {
    type: TimerType.Debug,
    change: true
  }): void {

    // Operate relative to timer type
    switch (options.type) {
      case TimerType.Debug: { 
        const debugTimers = Timer.instances.filter(timer => timer instanceof PerfTimer);
        let first: DebugTimer | null = null;
        let prev: DebugTimer | null = null;

        if (debugTimers.length === 1) {
          return console.debug(Timer.format(debugTimers[0].getTimer()));
        }

        if (debugTimers.length === 2) {
          const [timer1, timer2] = debugTimers;
          console.debug(Timer.format(timer1.getTimer()));
          return console.debug(Timer.format(timer2.getTimer(), { diff: timer1.getTimer() }));
        }

        for (let i = 0; i < debugTimers.length; i++) {
          const timer = debugTimers[i].getTimer();

          if (i === 0) {
            first = timer;
          }
          if (i % 2 === 1 && prev !== null && i !== debugTimers.length - 1) {
            const formatted = Timer.format(timer, { diff: prev });
            console.debug(formatted);
          } else if (i === debugTimers.length - 1 && first !== null) {
            const formatted = Timer.format(timer, { diff: first, final: true });
            console.debug(formatted);
          } else {
            console.debug(Timer.format(timer));
          }
          prev = timer;
        }
        break;
      }
    }
  };

  /**
   * Getter used to extract the timer from timer instances, 
   * these objects are separate from the Timer reference
   *
   * @returns the private timer object within instances
   */
  protected abstract getTimer(): Timers;

/**
 * Returns if a session of timers are active
 *
 * @returns true if a timer is stored, else false
 */
  public getState(): boolean {
    return Timer.state;
  }

  /**
   * Recursively call the end method for each stored timer
   * instance. A safeguard MUST be placed within the
   * subclasses' end methods which validates the caller's
   * instance, e.g., (`this instanceof Timer`)
   *
   * @privateRemarks
   *
   * Utilizes a design pattern I learned from Java called
   * the Template Pattern, where a method relies on an
   * abstract method to be concretely defined by subclasses
   */
  public clear() {
    for (let i = 0; i < Timer.instances.length; i++) {
      this.end();
    }
    Timer.state = false;
  }
}

/** Relevant types intended for this class or its subclasses only */

export type DebugTimer = {
  start: DOMHighResTimeStamp;
  end: DOMHighResTimeStamp;
}

/**
 * Prefer extends over intersections as the former 
 * detects property conflicts, whereas the latter 
 * performs recursive merging of properties
 *
 * @privateRemarks
 *
 * Using type for now to avoid linter
 *
 * @see {@link https://github.com/microsoft/TypeScript/wiki/Performance#preferring-interfaces-over-intersections}
 */
// interface Timers extends DebugTimer {};
type Timers = DebugTimer;

// Used for `options` param in display method
type DisplayOptions = {
  type?: TimerType,
  change: boolean,
}

// Used for 'options' param in format method
type FormatOptions = {
  diff: Timers;
  final?: boolean;
}

// Used to control operational flow of display method 
export enum TimerType {
  Debug = "PERF",
}

