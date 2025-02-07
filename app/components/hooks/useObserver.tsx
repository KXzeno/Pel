import React from 'react';

type ReducerState = {
  evoked: boolean;
}

type ReducerAction = {
  type: "crossed";
  action?: {
    fn?: () => boolean;
  }
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'crossed': return { ...state, evoked: !state.evoked };
  }
}

/**
 * Observer-based hook to invoke a callback once an element is viewed; use only
 * if scroll based features do not seem practical
 *
 * @typeParam T - Type of DOM element
 * @param ref - Element to track by observer
 */
export default function useObserver<T extends HTMLElement | null = HTMLDivElement>(ref?: React.RefObject<T>)
: [ReducerState, React.RefObject<null>]{
  let [observerState, dispatch] = React.useReducer<ReducerState, [ReducerAction]>(reducer, { evoked: false });
  let observedRef = React.useRef(null);

  // Statically type margin option as template literal
  type ObserverRootMargin = `${number}px`;

  // Statically type root as HTMLElement and its subtypes, default to arg type
  type ObserverRoot<T extends HTMLElement | null = typeof observedRef['current']> = T | Document;

  /** @remarks
   * Defines a range type via recursion and index accessors
   * 
   * A "number extending a number" works, despite being 
   * primitives, they are treated as literals in ths context,
   * implying a varying type array called a tuple which is parsed
   * via `Range[number]` that enumerates the array for different types
   *
   * With love to Java's strict typing, this foreign complexity
   * of flexible typing is a delightful reprieve, however it cannot
   * gracefully handle decimal stepping thus requiring conditional
   * typing */
  type CreateRange<Max extends number, Range extends Array<unknown> = []> = Range['length'] extends Max ? Range[number] : CreateRange<Max, [...Range, Range['length']]>;

  // Initialize range
  type ObserverThresholdStrings = Exclude<`0.${CreateRange<10>}`, "0.0"> | "1";

  // Unlike with Array<infer Item> which does content type inference, this checks
  // an existing string and infers the types before evaluated to the string
  type ObserverThreshold = ObserverThresholdStrings extends `${infer Num extends number}` ? Num : never;

  // Statically type options for observer
  type ObserverOptions = {
    root: ObserverRoot;
    rootMargin: ObserverRootMargin;
    threshold: ObserverThreshold;
  }

  // Initialize options
  let options: ObserverOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  }

  function observerFn(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dispatch({ type: 'crossed' });
      }
    });
  }

  React.useEffect(() => {
    // Cease operation on invalid ref 
    if (observedRef.current === null) {
      return;
    }

    // Initialize observer
    const observer = new IntersectionObserver(observerFn, options);
    observer.observe(observedRef.current);

    // Handle cleanup between renders
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return [observerState, observedRef];
}
