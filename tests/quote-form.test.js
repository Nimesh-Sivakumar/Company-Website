import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initQuoteForm } from '../assets/js/quote-form.js';

describe('initQuoteForm', () => {
  let form;
  let success;

  beforeEach(() => {
    document.body.innerHTML = '<form id="quoteForm"></form><div id="formSuccess"></div>';
    form = document.getElementById('quoteForm');
    success = document.getElementById('formSuccess');
  });

  it('shows the success message on submit', () => {
    initQuoteForm(form, success);
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(success.classList.contains('show')).toBe(true);
  });

  it('prevents the default form navigation', () => {
    const onSubmit = initQuoteForm(form, success);
    const event = { preventDefault: vi.fn() };
    onSubmit(event);
    expect(event.preventDefault).toHaveBeenCalledOnce();
  });

  it('stays shown across repeated submits', () => {
    initQuoteForm(form, success);
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    form.dispatchEvent(new Event('submit', { cancelable: true }));
    expect(success.className).toBe('show');
  });

  it('is a no-op when the form or success element is missing', () => {
    expect(() => initQuoteForm(null, success)()).not.toThrow();
    expect(() => initQuoteForm(form, null)()).not.toThrow();
  });
});
