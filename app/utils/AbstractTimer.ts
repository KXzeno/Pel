import PerfTimer from "./PerfTimer";

export type DebugTimer = {
  start: DOMHighResTimeStamp;
  end: DOMHighResTimeStamp;
}

type Timers = DebugTimer;

type DisplayOptions = {
  type?: TimerType,
  change: boolean,
}

type FormatOptions = {
  diff: Timers;
  final?: boolean;
}

export enum TimerType {
  Debug = "PERF",
}

export default abstract class Timer {
  protected static instances: Timer[] = [];
  protected static state: boolean = false;

  protected constructor() {}

  protected abstract start(): void;

  protected abstract end(): void;

  private static format(timer: Timers, options?: FormatOptions, notation?: unknown): string {
    let { start, end } = timer;
    start = Math.round(start * 100) / 100;
    end = Math.round(end * 100) / 100;
    if (options && options.diff) {
      const timerDiff = Math.round((end - options.diff.start) / options.diff.start * 10000) / 100;
      if (options.final) {
        return `Overall change: ${timerDiff}%\n\n`;
      }
      return `\u{1F7E2}: ${start}ms\n\u{1F3C1}: ${end}ms\n    \u2193\nChanged by ${timerDiff}%\n\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\u{A8}\n`
    }
    return `\u{1F7E2}: ${start}ms\n\u{1F3C1}: ${end}ms\n    \u2193\n    \u2193`
  }

  public static display(options: DisplayOptions = {
    type: TimerType.Debug,
    change: true
  }) {

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

  protected abstract getTimer(): Timers;

  public getState(): boolean {
    return Timer.state;
  }

  // Template method pattern
  public clear() {
    for (let i = 0; i < Timer.instances.length; i++) {
      this.end();
    }
    Timer.state = false;
  }
}
