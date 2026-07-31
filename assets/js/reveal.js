export const REVEAL_THRESHOLD = 0.15;

export function revealOnIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('in-view');
  });
}

export function initReveal(root = document, ObserverCtor = globalThis.IntersectionObserver) {
  if (typeof ObserverCtor !== 'function') return null;
  const observer = new ObserverCtor(revealOnIntersect, { threshold: REVEAL_THRESHOLD });
  root.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  return observer;
}
