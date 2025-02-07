import "@testing-library/jest-dom";

import useObserver from '../../app/components/hooks/useObserver';
import StepAccumlator from 'utils/StepAccumulator';

describe("A dynamic observer intersection hook", () => {
  test('creates a numbered array', () => {
    let acc = new StepAccumlator([1 as const]);
    let numberedArrayDecimal = acc.createNumberedArray(0, 1, 0.1);
    let numberedArrayInteger = acc.createNumberedArray(0, 10);
    let intendedOutputForDecimal = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    let intendedOutputForInteger = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    for (let i = 0; i < numberedArrayDecimal.length; i++) {
      expect(numberedArrayDecimal[i]).toBe(intendedOutputForDecimal[i]);
    }

    for (let i = 0; i < numberedArrayInteger.length; i++) {
      expect(numberedArrayInteger[i]).toBe(intendedOutputForInteger[i]);
    }
  });
});
