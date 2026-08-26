(function() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) return;

  const blocks = document.querySelectorAll('.section, .hero__inner');
  if (!blocks.length) return;

  /* Only now is it safe to hide anything: if this script never
  *      runs, the content stays visible. */
  document.documentElement.classList.add('js');
  for (const block of blocks) block.classList.add('reveal');

  const nav = document.querySelector('.nav');
  const navH = nav ? nav.offsetHeight : 0;

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    }
  }, { rootMargin: `-${navH + 20}px 0px -10% 0px` });

  for (const block of blocks) observer.observe(block);
})();
