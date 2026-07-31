import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  clamp01,
  ease,
  computeScaleTarget,
  computeProgress,
  computeZoomState,
  prefersReducedMotion,
  initZoomHero,
  BASE_RADIUS,
  COPY_SHIFT,
  OVERSCAN,
  TAG_START
} from '../assets/js/zoom-hero.js';

describe('clamp01', () => {
  it('clamps below, within and above the unit range', () => {
    expect(clamp01(-3)).toBe(0);
    expect(clamp01(0.42)).toBeCloseTo(0.42);
    expect(clamp01(9)).toBe(1);
  });
});

describe('ease', () => {
  it('is anchored at the endpoints and midpoint', () => {
    expect(ease(0)).toBe(0);
    expect(ease(0.5)).toBeCloseTo(0.5);
    expect(ease(1)).toBeCloseTo(1);
  });

  it('is monotonically increasing', () => {
    const samples = [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1].map(ease);
    const sorted = [...samples].sort((a, b) => a - b);
    expect(samples).toEqual(sorted);
  });

  it('eases in slowly before the midpoint', () => {
    expect(ease(0.25)).toBeLessThan(0.25);
    expect(ease(0.75)).toBeGreaterThan(0.75);
  });
});

describe('computeScaleTarget', () => {
  it('covers the viewport using the larger axis ratio plus overscan', () => {
    expect(computeScaleTarget(500, 250, 1000, 400)).toBeCloseTo(2 * OVERSCAN);
    expect(computeScaleTarget(500, 100, 1000, 400)).toBeCloseTo(4 * OVERSCAN);
  });
});

describe('computeProgress', () => {
  it('is 0 before the section starts scrolling past', () => {
    expect(computeProgress(0, 2000, 1000)).toBe(0);
    expect(computeProgress(500, 2000, 1000)).toBe(0);
  });

  it('is proportional through the scroll range', () => {
    expect(computeProgress(-500, 2000, 1000)).toBeCloseTo(0.5);
  });

  it('saturates at 1 past the end of the section', () => {
    expect(computeProgress(-5000, 2000, 1000)).toBe(1);
  });
});

describe('computeZoomState', () => {
  it('starts fully faded in, unscaled and with the tag hidden', () => {
    const state = computeZoomState(0, 3);
    expect(state.copyOpacity).toBe(1);
    expect(state.copyTranslateY).toBeCloseTo(0);
    expect(state.scale).toBeCloseTo(1);
    expect(state.borderRadius).toBeCloseTo(BASE_RADIUS);
    expect(state.tagOpacity).toBe(0);
  });

  it('ends fully zoomed with square corners and the tag visible', () => {
    const state = computeZoomState(1, 3);
    expect(state.copyOpacity).toBe(0);
    expect(state.copyTranslateY).toBe(COPY_SHIFT);
    expect(state.scale).toBeCloseTo(3);
    expect(state.borderRadius).toBeCloseTo(0);
    expect(state.tagOpacity).toBe(1);
  });

  it('fully hides the copy once the fade window closes', () => {
    expect(computeZoomState(0.35, 2).copyOpacity).toBeCloseTo(0);
    expect(computeZoomState(0.6, 2).copyOpacity).toBe(0);
  });

  it('keeps the tag hidden until its reveal window', () => {
    expect(computeZoomState(TAG_START, 2).tagOpacity).toBe(0);
    expect(computeZoomState(TAG_START + 0.11, 2).tagOpacity).toBeCloseTo(0.5);
  });
});

describe('prefersReducedMotion', () => {
  it('reports the media query result', () => {
    expect(prefersReducedMotion({ matchMedia: () => ({ matches: true }) })).toBe(true);
    expect(prefersReducedMotion({ matchMedia: () => ({ matches: false }) })).toBe(false);
  });

  it('is false when matchMedia is unavailable', () => {
    expect(prefersReducedMotion({})).toBe(false);
  });
});

function buildElements() {
  document.body.innerHTML = `
    <section class="zoomhero">
      <div id="zoomCopy"></div>
      <div id="zoomFrame"></div>
      <div id="zoomTag"></div>
    </section>`;
  const section = document.querySelector('.zoomhero');
  const frame = document.getElementById('zoomFrame');
  Object.defineProperty(section, 'offsetHeight', { value: 3000, configurable: true });
  section.getBoundingClientRect = () => ({ top: -1000 });
  frame.getBoundingClientRect = () => ({ width: 500, height: 500 });
  return {
    section,
    copy: document.getElementById('zoomCopy'),
    frame,
    tag: document.getElementById('zoomTag')
  };
}

function fakeWindow(overrides = {}) {
  const listeners = {};
  return {
    innerWidth: 1000,
    innerHeight: 1000,
    matchMedia: () => ({ matches: false }),
    requestAnimationFrame: (fn) => fn(),
    addEventListener(type, fn) {
      (listeners[type] ||= []).push(fn);
    },
    emit(type) {
      (listeners[type] || []).forEach((fn) => fn());
    },
    listeners,
    ...overrides
  };
}

describe('initZoomHero', () => {
  let elements;

  beforeEach(() => {
    elements = buildElements();
  });

  it('applies the initial scroll state and binds listeners', () => {
    const win = fakeWindow();
    const hero = initZoomHero(elements, win);

    expect(hero).not.toBeNull();
    expect(win.listeners.scroll).toHaveLength(1);
    expect(win.listeners.resize).toHaveLength(1);
    expect(elements.frame.style.transform).toMatch(/^scale\(/);
    expect(elements.copy.style.opacity).toBe('0');
  });

  it('updates the frame transform on scroll', () => {
    const win = fakeWindow();
    initZoomHero(elements, win);
    elements.section.getBoundingClientRect = () => ({ top: -2000 });
    win.emit('scroll');
    expect(elements.frame.style.transform).toBe(`scale(${OVERSCAN * 2})`);
    expect(elements.tag.style.opacity).toBe('1');
  });

  it('coalesces scroll events into a single animation frame', () => {
    const frames = [];
    const win = fakeWindow({ requestAnimationFrame: (fn) => frames.push(fn) });
    initZoomHero(elements, win);
    win.emit('scroll');
    win.emit('scroll');
    expect(frames).toHaveLength(1);

    frames[0]();
    win.emit('scroll');
    expect(frames).toHaveLength(2);
  });

  it('re-measures the scale target on resize', () => {
    const win = fakeWindow();
    const spy = vi.fn(() => ({ width: 500, height: 500 }));
    elements.frame.getBoundingClientRect = spy;
    initZoomHero(elements, win);
    win.emit('resize');
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('skips the animation and shows the tag when reduced motion is preferred', () => {
    const win = fakeWindow({ matchMedia: () => ({ matches: true }) });
    const hero = initZoomHero(elements, win);
    expect(hero).toBeNull();
    expect(elements.tag.style.opacity).toBe('1');
    expect(win.listeners.scroll).toBeUndefined();
  });

  it('does nothing when the hero section is absent', () => {
    const win = fakeWindow();
    expect(initZoomHero({ ...elements, section: null, tag: null }, win)).toBeNull();
    expect(win.listeners.scroll).toBeUndefined();
  });
});
