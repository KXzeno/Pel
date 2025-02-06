import React from 'react';

export default function useObserver<T extends HTMLElement = HTMLDivElement>(elem: T) {

  type ObserverRootMargin = `${number}px`;

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
   * of flexible typing is a delightful reprieve
   * */
  type ObserverThreshold<Max extends number, Range extends Array<unknown> = []> = Range['length'] extends Max ? Range[number] : ObserverThreshold<Max, [...Range, Range['length']]>;

  type ObserverOptions = {
    root: ObserverRoot;
    rootMargin: ObserverRootMargin;
    threshold: ObserverThreshold<2>;
  }
  let options: ObserverOptions = {
    root: elem,
    rootMargin: "2px",
    threshold: 1,
  }

  const observer = new IntersectionObserver(() => null, options);
}

