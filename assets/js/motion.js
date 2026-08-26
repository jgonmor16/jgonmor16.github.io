(function() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  const blocks = document.querySelectorAll('.section, .hero__inner');
  if (!blocks.length) return;

  /* Only now is it safe to hide anything: if this script never
  *      runs, the content stays visible. */
  document.documentElement.classList.add('js');
  for (const block of blocks) block.classList.add('reveal');

  const observer = new IntersectionObserver((entries, obs) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -10% 0px' });

  for (const block of blocks) observer.observe(block);
})();
