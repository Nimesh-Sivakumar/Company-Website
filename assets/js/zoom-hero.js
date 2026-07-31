export const FADE_END = 0.35;
export const GROW_START = 0.05;
export const GROW_SPAN = 0.72;
export const TAG_START = 0.7;
export const TAG_SPAN = 0.22;
export const OVERSCAN = 1.04;
export const BASE_RADIUS = 20;
export const COPY_SHIFT = -40;

export function clamp01(value) {
  return Math.min(Math.max(value, 0), 1);
}

export function ease(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function computeScaleTarget(baseW, baseH, viewportW, viewportH) {
  return Math.max(viewportW / baseW, viewportH / baseH) * OVERSCAN;
}

export function computeProgress(rectTop, sectionHeight, viewportH) {
  const total = sectionHeight - viewportH;
  return clamp01(-rectTop / total);
}

export function computeZoomState(progress, scaleTarget) {
  const fadeT = Math.min(progress / FADE_END, 1);
  const eased = ease(clamp01((progress - GROW_START) / GROW_SPAN));
  return {
    copyOpacity: 1 - fadeT,
    copyTranslateY: COPY_SHIFT * fadeT,
    scale: 1 + (scaleTarget - 1) * eased,
    borderRadius: BASE_RADIUS * (1 - eased),
    tagOpacity: clamp01((progress - TAG_START) / TAG_SPAN)
  };
}

export function prefersReducedMotion(win = window) {
  return Boolean(win.matchMedia && win.matchMedia('(prefers-reduced-motion: reduce)').matches);
}

export function initZoomHero(elements, win = window) {
  const { section, copy, frame, tag } = elements;

  if (prefersReducedMotion(win) || !section) {
    if (tag) tag.style.opacity = '1';
    return null;
  }

  let scaleTarget = 1;
  let ticking = false;

  function measure() {
    frame.style.transform = 'none';
    const rect = frame.getBoundingClientRect();
    scaleTarget = computeScaleTarget(rect.width, rect.height, win.innerWidth, win.innerHeight);
  }

  function update() {
    const progress = computeProgress(
      section.getBoundingClientRect().top,
      section.offsetHeight,
      win.innerHeight
    );
    const state = computeZoomState(progress, scaleTarget);
    copy.style.opacity = String(state.copyOpacity);
    copy.style.transform = `translateY(${state.copyTranslateY}px)`;
    frame.style.transform = `scale(${state.scale})`;
    frame.style.borderRadius = `${state.borderRadius}px`;
    tag.style.opacity = String(state.tagOpacity);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    win.requestAnimationFrame(update);
    ticking = true;
  }

  measure();
  win.addEventListener('resize', measure);
  win.addEventListener('scroll', onScroll);
  update();

  return { measure, update, onScroll };
}
