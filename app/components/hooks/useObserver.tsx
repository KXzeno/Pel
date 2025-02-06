import React from 'react';

/** @remarks
 * Arithmetic expressions cannot be performed in type definitions,
 * which shouldn't anyway. The quirky nature of the stepper type above 
 * is that it uses the field 'length' to step. To automate decimal union 
 * types, we will create a cocnrete stepper function and access it's types */
export function createNumberedArray(start: number, end: number, step: number = 1): Array<number> {
  let arr = [start];
  while (arr[arr.length - 1] < end) {
    // Ensure .1 incrementation by pre/post mapping with multiple of 10
    let val = (arr[arr.length - 1] * 10 + step * 10) / 10;
    arr.push(val);
  }
  return arr;
};

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
   * of flexible typing is a delightful reprieve, however it cannot
   * handle decimal stepping, thus requiring the external function
   * */
  type CreateRange<Max extends number, Range extends Array<number> = []> = Range['length'] extends Max ? Range[number] : CreateRange<Max, [...Range, Range['length']]>;

  type ObserverThreshold = CreateRange<2>;

  type ObserverOptions = {
    root: ObserverRoot;
    rootMargin: ObserverRootMargin;
    threshold: ObserverThreshold;
  }

  let options: ObserverOptions = {
    root: elem,
    rootMargin: "2px",
    threshold: 1,
  }

  const observer = new IntersectionObserver(() => null, options);
}

