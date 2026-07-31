import { initStickyNav, initMobileMenu } from './nav.js';
import { initReveal } from './reveal.js';
import { initQuoteForm } from './quote-form.js';
import { initZoomHero } from './zoom-hero.js';

export function init(doc = document, win = window) {
  initStickyNav(doc.getElementById('siteNav'), win);
  initMobileMenu(doc.getElementById('menuToggle'), doc.querySelector('.primary-links'));
  initReveal(doc);
  initQuoteForm(doc.getElementById('quoteForm'), doc.getElementById('formSuccess'));
  initZoomHero(
    {
      section: doc.querySelector('.zoomhero'),
      copy: doc.getElementById('zoomCopy'),
      frame: doc.getElementById('zoomFrame'),
      tag: doc.getElementById('zoomTag')
    },
    win
  );
}

init();
