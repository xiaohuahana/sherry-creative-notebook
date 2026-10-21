/* Native vertical scrolling drives a pinned horizontal strip. No wheel/touch trapping. */
(() => {
  const root = document.documentElement;
  const work = document.querySelector('#work');
  const stage = work?.querySelector('.work-stage');
  const viewport = work?.querySelector('.project-window');
  const track = work?.querySelector('.projects');
  const controls = work?.querySelector('.work-scroll-controls');
  if (!stage || !viewport || !track || !controls) return;
  const cards = [...track.querySelectorAll('.project')];
  const count = controls.querySelector('.work-scroll-count');
  let enabled = false, start = 0, travel = 0, distance = 0, scheduled = false, measureScheduled = false;
  const clamp = (value, max) => Math.max(0, Math.min(value, max));

  function render() {
    scheduled = false;
    if (!enabled) return;
    const offset = clamp(scrollY - start, travel);
    track.style.setProperty('--work-offset', `${offset}px`);
    controls.style.setProperty('--work-progress', travel ? offset / travel : 1);
    let nearest = 0;
    cards.forEach((card, index) => {
      if (Math.abs(Math.min(card.offsetLeft, travel) - offset) <
          Math.abs(Math.min(cards[nearest].offsetLeft, travel) - offset)) nearest = index;
    });
    const label = `${String(nearest + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    if (count.textContent !== label) count.textContent = label;
    // Focusing an offscreen link must not create a second, nested horizontal scroll.
    viewport.scrollLeft = 0;
  }
  function requestRender() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(render); }
  }
  function goToCard(card) {
    if (!enabled || !cards.includes(card)) return;
    window.scrollTo({ top: start + Math.min(card.offsetLeft, travel), behavior: 'instant' });
    render();
  }
  function followHash() {
    if (!location.hash) return;
    const card = cards.find(card => `#${card.id}` === location.hash);
    if (card) goToCard(card);
  }
  function measure() {
    measureScheduled = false;
    const previousEnd = start + distance + stage.offsetHeight;
    const previousHeight = work.offsetHeight;
    const previousDistance = distance;
    const previousStart = start;
    const previousY = scrollY;
    const wasEnabled = enabled;
    work.style.removeProperty('--work-card-width');
    root.classList.add('horizontal-work');
    controls.hidden = false;
    const style = getComputedStyle(stage);
    const contentHeight = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom) +
      [...stage.children].reduce((height, child) => {
        const css = getComputedStyle(child);
        if (css.display === 'none') return height;
        return height + child.getBoundingClientRect().height +
          parseFloat(css.marginTop) + parseFloat(css.marginBottom);
      }, 0);
    const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
    // Leave actual paper after the last card, then a short reading buffer before Contact.
    const endSpace = Math.min(280, Math.max(160, viewport.clientWidth * .22));
    const endHold = Math.min(420, Math.max(220, stage.clientHeight * .35));
    travel = overflow ? overflow + endSpace : 0;
    distance = travel ? travel + endHold : 0;
    enabled = CSS.supports('position', 'sticky') && travel > 0 &&
      contentHeight <= stage.clientHeight + 2;
    root.classList.toggle('horizontal-work', enabled);
    controls.hidden = !enabled;
    viewport.tabIndex = enabled ? 0 : -1;
    viewport.setAttribute('aria-label', enabled ?
      '精选案例，向下滚动浏览；也可用左右方向键切换' : '精选案例');
    if (enabled) track.querySelectorAll('img').forEach(image => { image.loading = 'eager'; });
    if (enabled) work.style.setProperty('--work-scroll-height', `${Math.ceil(stage.offsetHeight + distance)}px`);
    else {
      work.style.removeProperty('--work-scroll-height');
      track.style.removeProperty('--work-offset');
    }
    start = work.getBoundingClientRect().top + scrollY;
    // Preserve reading position if a resize changes the available scrolling distance.
    if (wasEnabled && previousY >= previousStart && previousY <= previousEnd) {
      const progress = previousDistance ? clamp(previousY - previousStart, previousDistance) / previousDistance : 0;
      window.scrollTo({ top: enabled ? start + progress * distance : start, behavior: 'instant' });
    } else if (wasEnabled && previousY > previousEnd) {
      window.scrollTo({ top: previousY + work.offsetHeight - previousHeight, behavior: 'instant' });
    }
    render();
    window.dispatchEvent(new Event('scroll'));
  }
  function requestMeasure() {
    if (!measureScheduled) { measureScheduled = true; requestAnimationFrame(measure); }
  }
  addEventListener('scroll', requestRender, { passive: true });
  addEventListener('resize', requestMeasure);
  addEventListener('pageshow', requestMeasure);
  addEventListener('hashchange', () => requestAnimationFrame(followHash));
  track.addEventListener('focusin', event => {
    const card = event.target.closest('.project');
    if (card && event.target.matches(':focus-visible')) goToCard(card);
  });
  // Arrow keys are an alternative to scrolling, without changing touch gestures.
  viewport.addEventListener('keydown', event => {
    if (!enabled || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey ||
        !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const current = cards.reduce((nearest, card, index) =>
      Math.abs(Math.min(card.offsetLeft, travel) - clamp(scrollY - start, travel)) <
      Math.abs(Math.min(cards[nearest].offsetLeft, travel) - clamp(scrollY - start, travel)) ? index : nearest, 0);
    const next = cards[clamp(current + (event.key === 'ArrowRight' ? 1 : -1), cards.length - 1)];
    goToCard(next);
    next.querySelector('a')?.focus({ preventScroll: true });
  });
  measure();
  document.fonts?.ready.then(() => { measure(); followHash(); });
  track.querySelectorAll('img').forEach(image => image.addEventListener('load', requestMeasure, { once: true }));
})();
