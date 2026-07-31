import { describe, it, expect, beforeEach, vi } from 'vitest';

const markup = `
  <nav id="siteNav"></nav>
  <button id="menuToggle"></button>
  <div class="primary-links"></div>
  <div class="reveal"></div>
  <form id="quoteForm"></form>
  <div id="formSuccess"></div>
  <section class="zoomhero">
    <div id="zoomCopy"></div>
    <div id="zoomFrame"></div>
    <div id="zoomTag"></div>
  </section>`;

describe('init', () => {
  beforeEach(() => {
    vi.resetModules();
    document.body.innerHTML = markup;
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        observe() {}
      }
    );
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
  });

  it('wires up nav, menu, form and hero from the document', async () => {
    const { init } = await import('../assets/js/main.js');
    document.body.innerHTML = markup;
    init(document, window);

    document.getElementById('menuToggle').click();
    expect(document.querySelector('.primary-links').style.display).toBe('flex');

    document.getElementById('quoteForm').dispatchEvent(new Event('submit', { cancelable: true }));
    expect(document.getElementById('formSuccess').classList.contains('show')).toBe(true);

    expect(document.getElementById('zoomTag').style.opacity).toBe('1');
  });

  it('does not throw when the expected elements are missing', async () => {
    const { init } = await import('../assets/js/main.js');
    document.body.innerHTML = '';
    expect(() => init(document, window)).not.toThrow();
  });
});
