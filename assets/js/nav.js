(function() {
  const links = [...document.querySelectorAll('.nav__list a[href^="#"]')];
  const items = [];

  for (const link of links) {
    const section = document.getElementById(link.hash.slice(1));
    if (section) items.push({ section, link });
  }
  if (!items.length) return;

  const nav = document.querySelector('.nav');

  const update = () => {
    const line = nav.offsetHeight + 20;
    let current = null;
    for (const item of items) {
      const box = item.section.getBoundingClientRect();
      if (box.top <= line && box.bottom > line) current = item;
    }
    for (const item of items) {
      if (item === current) item.link.setAttribute('aria-current', 'true');
      else item.link.removeAttribute('aria-current');
    }
  };

  let ticking = false;
  addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });

  update();
})();
