import React from 'react';

/**
 * Observer-based hook to invoke a callback once an element is viewed; use only
 * if scroll based features do not seem practical
 *
 * @typeParam T - Type of DOM element
 * @param elem - Element to track by observer
 */
export default function useObserver<T extends HTMLElement = HTMLDivElement>(elem: T) {

  // Statically type margin option as template literal
  type ObserverRootMargin = `${number}px`;

  // Statically type root as HTMLElement and its subtypes, default to arg type
  type ObserverRoot<T extends HTMLElement = typeof elem> = T | Document;

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
    root: elem,
    rootMargin: "2px",
    threshold: 1,
  }

  // const observer = new IntersectionObserver(() => null, options);
}
