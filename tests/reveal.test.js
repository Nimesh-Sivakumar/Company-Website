import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initReveal, revealOnIntersect, REVEAL_THRESHOLD } from '../assets/js/reveal.js';

class FakeObserver {
  constructor(callback, options) {
    this.callback = callback;
    this.options = options;
    this.observed = [];
  }

  observe(el) {
    this.observed.push(el);
  }
}

describe('revealOnIntersect', () => {
  it('marks intersecting targets as in-view', () => {
    const target = document.createElement('div');
    revealOnIntersect([{ isIntersecting: true, target }]);
    expect(target.classList.contains('in-view')).toBe(true);
  });

  it('leaves non-intersecting targets untouched', () => {
    const target = document.createElement('div');
    revealOnIntersect([{ isIntersecting: false, target }]);
    expect(target.classList.contains('in-view')).toBe(false);
  });
});

describe('initReveal', () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<div class="reveal"></div><div class="reveal"></div><div class="static"></div>';
  });

  it('observes every .reveal element with the configured threshold', () => {
    const observer = initReveal(document, FakeObserver);
    expect(observer.observed).toHaveLength(2);
    expect(observer.options).toEqual({ threshold: REVEAL_THRESHOLD });
  });

  it('reveals elements when the observer callback fires', () => {
    const observer = initReveal(document, FakeObserver);
    const [first, second] = observer.observed;
    observer.callback([
      { isIntersecting: true, target: first },
      { isIntersecting: false, target: second }
    ]);
    expect(first.classList.contains('in-view')).toBe(true);
    expect(second.classList.contains('in-view')).toBe(false);
  });

  it('returns null when IntersectionObserver is unavailable', () => {
    expect(initReveal(document, undefined)).toBeNull();
  });

  it('scopes observation to the provided root', () => {
    const root = document.createElement('div');
    root.innerHTML = '<span class="reveal"></span>';
    const observer = initReveal(root, FakeObserver);
    expect(observer.observed).toHaveLength(1);
  });

  it('uses the global IntersectionObserver by default', () => {
    const spy = vi.fn(function (cb, options) {
      return new FakeObserver(cb, options);
    });
    vi.stubGlobal('IntersectionObserver', spy);
    initReveal(document);
    expect(spy).toHaveBeenCalledOnce();
    vi.unstubAllGlobals();
  });
});
