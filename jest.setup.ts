import '@testing-library/jest-dom';

/** Globally set observer mock
 *
// @ts-expect-error
global.IntersectionObserver = class {
  public callback;
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe() {}
  unobserve() {}
  disconnect() {}
} 
*/
