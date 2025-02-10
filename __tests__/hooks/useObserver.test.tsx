import React from "react";
import "@testing-library/jest-dom";
import { render, renderHook } from "@testing-library/react";

import useObserver from '../../app/components/hooks/useObserver';
import StepAccumlator from 'utils/StepAccumulator';

describe("A dynamic observer intersection hook", () => {
  beforeEach(() => {
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  test('creates a numbered array', () => {
    // Initialize accumulator instance
    let acc = new StepAccumlator([1 as const]);
    
    // Create decimal and integer arrays by instance methods
    let numberedArrayDecimal = acc.createNumberedArray(0, 1, 0.1);
    let numberedArrayInteger = acc.createNumberedArray(0, 10);

    // Initialize expected outputs
    let intendedOutputForDecimal = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    let intendedOutputForInteger = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Recursively validate instance's outputs for decimal array
    for (let i = 0; i < numberedArrayDecimal.length; i++) {
      expect(numberedArrayDecimal[i]).toBe(intendedOutputForDecimal[i]);
    }

    // Recursively validate instance's outputs for integer array
    for (let i = 0; i < numberedArrayInteger.length; i++) {
      expect(numberedArrayInteger[i]).toBe(intendedOutputForInteger[i]);
    }
  });

  test('contains an active element to observe', () => {
    // Create a React node and render it to jestdom
    let reactNode: React.ReactNode = <div>A Node</div>;
    let { container } = render(reactNode);

    // Reference the node
    let target = container.querySelector('div');

    // Use the custom hook's optional RefObject argument for test
    let hook1 = renderHook(() => React.useRef(target));
    let hook2 = renderHook(() => useObserver(hook1.result.current));

    // Extract states
    let [state, ref] = hook2.result.current;

    // Validate on-screen (cannot simulate intersection API; always false)
    expect(state.evoked).toBeNull();
    // Validate react ref object
    expect(ref).toBeDefined();
    // Validate rendered DOM node and React node equality
    expect(ref.current).toEqual({ current: target });
  });
});
