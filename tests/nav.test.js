import { describe, it, expect, beforeEach } from 'vitest';
import {
  initStickyNav,
  initMobileMenu,
  MOBILE_MENU_STYLE,
  SOLID_NAV_SCROLL_THRESHOLD
} from '../assets/js/nav.js';

function fakeWindow() {
  const listeners = {};
  return {
    scrollY: 0,
    addEventListener(type, fn) {
      (listeners[type] ||= []).push(fn);
    },
    emit(type) {
      (listeners[type] || []).forEach((fn) => fn());
    },
    listeners
  };
}

describe('initStickyNav', () => {
  let nav;

  beforeEach(() => {
    nav = document.createElement('nav');
  });

  it('registers a scroll listener on the given window', () => {
    const win = fakeWindow();
    initStickyNav(nav, win);
    expect(win.listeners.scroll).toHaveLength(1);
  });

  it('adds the solid class only past the scroll threshold', () => {
    const win = fakeWindow();
    initStickyNav(nav, win);

    win.scrollY = SOLID_NAV_SCROLL_THRESHOLD;
    win.emit('scroll');
    expect(nav.classList.contains('solid')).toBe(false);

    win.scrollY = SOLID_NAV_SCROLL_THRESHOLD + 1;
    win.emit('scroll');
    expect(nav.classList.contains('solid')).toBe(true);
  });

  it('removes the solid class when scrolling back to the top', () => {
    const win = fakeWindow();
    initStickyNav(nav, win);

    win.scrollY = 200;
    win.emit('scroll');
    win.scrollY = 0;
    win.emit('scroll');
    expect(nav.classList.contains('solid')).toBe(false);
  });

  it('is a no-op when the nav element is missing', () => {
    const win = fakeWindow();
    expect(() => initStickyNav(null, win)()).not.toThrow();
    expect(win.listeners.scroll).toBeUndefined();
  });
});

describe('initMobileMenu', () => {
  let toggle;
  let links;

  beforeEach(() => {
    document.body.innerHTML = '<button id="menuToggle"></button><div class="primary-links"></div>';
    toggle = document.getElementById('menuToggle');
    links = document.querySelector('.primary-links');
  });

  it('opens the menu on first click', () => {
    initMobileMenu(toggle, links);
    toggle.click();
    expect(links.style.display).toBe('flex');
    expect(links.style.position).toBe('fixed');
  });

  it('closes the menu on the second click', () => {
    initMobileMenu(toggle, links);
    toggle.click();
    toggle.click();
    expect(links.style.cssText).toBe('');
  });

  it('applies the documented mobile menu styles', () => {
    const onClick = initMobileMenu(toggle, links);
    onClick();
    const declared = MOBILE_MENU_STYLE.split(';')
      .map((rule) => rule.trim())
      .filter(Boolean)
      .map((rule) => rule.split(':')[0]);
    declared.forEach((property) => {
      expect(links.style.getPropertyValue(property)).not.toBe('');
    });
  });

  it('is a no-op when elements are missing', () => {
    expect(() => initMobileMenu(null, links)()).not.toThrow();
    expect(() => initMobileMenu(toggle, null)()).not.toThrow();
  });
});
