export const MOBILE_MENU_STYLE =
  'display:flex;flex-direction:column;position:fixed;top:66px;left:0;right:0;background:rgba(246,239,225,0.97);padding:24px;gap:20px;box-shadow:0 10px 30px rgba(42,29,18,0.08);';

export const SOLID_NAV_SCROLL_THRESHOLD = 40;

export function initStickyNav(nav, win = window) {
  if (!nav) return () => {};
  const onScroll = () =>
    nav.classList.toggle('solid', win.scrollY > SOLID_NAV_SCROLL_THRESHOLD);
  win.addEventListener('scroll', onScroll);
  return onScroll;
}

export function initMobileMenu(toggle, links) {
  if (!toggle || !links) return () => {};
  const onClick = () => {
    const open = links.style.display === 'flex';
    links.style.cssText = open ? '' : MOBILE_MENU_STYLE;
  };
  toggle.addEventListener('click', onClick);
  return onClick;
}
