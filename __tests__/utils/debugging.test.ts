import PerfTimer from "@/utils/PerfTimer";
import Timer from "@/utils/AbstractTimer";

describe('initializes valid timers', () => {
  test('automates performance timer tracking via single method', () => {
    PerfTimer.track();
    let arr1 = [];
    while (arr1.length !== 20000) {
      arr1.push(1);
      expect(arr1[arr1.length - 1] === 1);
    }
    PerfTimer.track();

    PerfTimer.track();
    let arr2 = [];
    while (arr2.length !== 20) {
      arr2.push(1);
      expect(arr2[arr2.length - 1] === 1);
    }
    PerfTimer.track();
    Timer.display();
  });
});
