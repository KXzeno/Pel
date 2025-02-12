import PerfTimer from "@/utils/PerfTimer";
import Timer from "@/utils/AbstractTimer";

describe('initializes valid timers', () => {
  test('automates performance timer tracking via single method', () => {
    // Call count is 0
    expect(PerfTimer.calls).toBe(0);

    // Starts a new timer
    PerfTimer.track();

    const arr1: number[] = [];
    while (arr1.length !== 200) {
      arr1.push(1);
    }

    // Instantiates the PerfTimer to Timer
    PerfTimer.track();

    expect(PerfTimer.calls).toBe(2);

    // Starts a new timer
    PerfTimer.track();
    const arr2: number[] = [];
    while (arr2.length !== 20) {
      arr2.push(1);
    }
    // Instantiates the PerfTimer to Timer
    PerfTimer.track();

    expect(PerfTimer.calls).toBe(4);

    // Outputs the difference between the previous two timers
    Timer.display();
  });
});
