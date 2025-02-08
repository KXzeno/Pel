import React from 'react';

type ReducerState = {
  evoked: boolean | null;
  payload?: {
    observer?: IntersectionObserver;
  }
}

type ReducerAction = {
  type: "crossedAndSeen" | "crossedAndLeft";
  payload?: {
    observer?: IntersectionObserver;
  }
}

function reducer(state: ReducerState, action: ReducerAction): ReducerState {
  switch (action.type) {
    case 'crossedAndSeen': return { ...state, evoked: true, payload: { observer: action.payload?.observer } };
    case 'crossedAndLeft': return { ...state, evoked: false, payload: { observer: action.payload?.observer } };
  }
}

/**
 * Observer-based hook to invoke a callback once an element is viewed; use only
 * if scroll based features do not seem practical
 *
 * @typeParam T - Type of DOM element
 * @param ref - Element to track by observer
 */
export default function useObserver<T extends HTMLElement | null = HTMLHeadingElement>(ref: React.RefObject<T> | null = null)
: [ReducerState, React.RefObject<T | null>]{
  const [observerState, dispatch] = React.useReducer<ReducerState, [ReducerAction]>(reducer, { evoked: null });
  const observedRef = React.useRef(ref as null);

  // Statically type margin option as template literal
  type ObserverRootMargin = `${number}px` | `${number}px ${number}px` | `${number}px ${number}px ${number}px` | `${number}px ${number}px ${number}px ${number}px`;

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
  type ObserverThresholdStrings = Exclude<`0.${CreateRange<10>}`, "0"> | "1";

  // Unlike with Array<infer Item> which does content type inference, this checks
  // an existing string and infers the types before evaluated to the string
  type ObserverThreshold = ObserverThresholdStrings extends `${infer Num extends number}` ? Num | Num[] : never;

  // Statically type options for observer
  type ObserverOptions = {
    root: ObserverRoot;
    rootMargin: ObserverRootMargin;
    threshold: ObserverThreshold;
  }

  // Initialize options
  const options: ObserverOptions = {
    root: null,
    rootMargin: "-17px",
    threshold: [0, 1],
  }

  // Initialize nullish time reference to signal first render
  let previousDOMHighResTime: number | null = null;

  function observerFn(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    entries.forEach(entry => {
      // Prevent callback from invoking on initial render
      if (previousDOMHighResTime === null) {
        previousDOMHighResTime = entry.time;
        return;
      }
      previousDOMHighResTime = entry.time;

      switch (entry.intersectionRatio) {
        case 0: {
          dispatch({ 
            type: 'crossedAndLeft',
            payload: {
              observer: observer,
            }
          });
          break;
        }
        case 1: {
          dispatch({ 
            type: 'crossedAndSeen',
            payload: {
              observer: observer,
            }
          });
          break;
        }
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
