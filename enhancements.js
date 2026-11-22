/* Optional progressive enhancement: editorial transitions and small interactions. */
(function () {
  'use strict';
  function init() {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const header = document.querySelector('.site-header');
    const heroCopy = document.querySelector('.hero-copy');

    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.prepend(progress);

    let scrollCue = null;
    let scrollLabel = null;
    if (heroCopy) {
      scrollCue = document.createElement('a');
      scrollCue.className = 'scroll-cue';
      scrollCue.href = '#about';
      scrollLabel = document.createElement('span');
      const line = document.createElement('span');
      line.className = 'scroll-cue-line';
      line.setAttribute('aria-hidden', 'true');
      const arrow = document.createElement('span');
      arrow.className = 'scroll-cue-arrow';
      arrow.setAttribute('aria-hidden', 'true');
      arrow.textContent = '↓';
      scrollCue.append(scrollLabel, line, arrow);
      heroCopy.append(scrollCue);
    }

    const backToTop = document.createElement('a');
    backToTop.className = 'back-to-top';
    backToTop.href = '#home';
    backToTop.textContent = '↑';
    backToTop.title = 'Back to top';
    document.body.append(backToTop);

    function translateNewControls() {
      const fr = document.documentElement.lang === 'fr';
      if (scrollLabel) scrollLabel.textContent = fr ? 'Faire défiler' : 'Scroll to explore';
      backToTop.setAttribute('aria-label', fr ? 'Retour en haut de page' : 'Back to top');
      backToTop.title = fr ? 'Retour en haut' : 'Back to top';
    }
    document.addEventListener('portfolio:languagechange', translateNewControls);
    translateNewControls();

    let pendingScroll = false;
    function updateScrollState() {
      pendingScroll = false;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, window.scrollY / maxScroll))})`;
      if (header) header.classList.toggle('is-scrolled', window.scrollY > 22);
      backToTop.classList.toggle('is-shown', window.scrollY > 740);
    }
    window.addEventListener('scroll', () => {
      if (pendingScroll) return;
      pendingScroll = true;
      window.requestAnimationFrame(updateScrollState);
    }, { passive: true });
    window.addEventListener('resize', updateScrollState, { passive: true });
    window.addEventListener('load', updateScrollState, { once: true });
    updateScrollState();

    const editorialElements = Array.from(document.querySelectorAll(
      '.section-heading-row, .section-kicker, .experience-item, .mobility-card, .interest-card, .contact-panel'
    )).filter(element => !element.classList.contains('reveal'));
    editorialElements.forEach(element => element.classList.add('reveal'));

    document.querySelectorAll('.project-card, .skill-group, .mobility-card, .interest-card')
      .forEach((element, index) => {
        element.style.setProperty('--reveal-delay', `${(index % 3) * 95}ms`);
      });

    if ('IntersectionObserver' in window && !reducedMotion.matches) {
      const observer = new IntersectionObserver(entries => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }, { threshold: .07, rootMargin: '0px 0px 18px 0px' });
      editorialElements.forEach(element => observer.observe(element));
    } else {
      editorialElements.forEach(element => element.classList.add('is-visible'));
    }

    const filters = document.querySelectorAll('[data-filter]');
    const cards = document.querySelectorAll('[data-project-card]');
    filters.forEach(filter => filter.addEventListener('click', () => {
      if (reducedMotion.matches) return;
      window.requestAnimationFrame(() => {
        cards.forEach(card => {
          if (card.hidden || typeof card.animate !== 'function') return;
          card.animate([
            { opacity: .55, translate: '0 9px' },
            { opacity: 1, translate: '0 0' }
          ], { duration: 370, easing: 'cubic-bezier(.22,1,.36,1)' });
        });
      });
    }));

    /* Follow the pointer with light rather than tilting entire cards. */
    if (finePointer.matches && !reducedMotion.matches) {
      document.querySelectorAll('.project-card, .mobility-card').forEach(card => {
        let nextPoint = null;
        let frame = false;
        card.addEventListener('pointermove', event => {
          nextPoint = [event.clientX, event.clientY];
          if (frame) return;
          frame = true;
          window.requestAnimationFrame(() => {
            frame = false;
            if (!nextPoint) return;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--glow-x', `${nextPoint[0] - rect.left}px`);
            card.style.setProperty('--glow-y', `${nextPoint[1] - rect.top}px`);
          });
        }, { passive: true });
      });

      const frame = document.querySelector('.portrait-frame');
      if (frame) {
        let point = null;
        let scheduled = false;
        frame.addEventListener('pointermove', event => {
          point = [event.clientX, event.clientY];
          if (scheduled) return;
          scheduled = true;
          window.requestAnimationFrame(() => {
            scheduled = false;
            if (!point) return;
            const rect = frame.getBoundingClientRect();
            const x = (point[0] - rect.left) / rect.width - .5;
            const y = (point[1] - rect.top) / rect.height - .5;
            frame.style.setProperty('--photo-x', `${(x * -7).toFixed(1)}px`);
            frame.style.setProperty('--photo-y', `${(y * -5).toFixed(1)}px`);
            frame.style.setProperty('--photo-glow-x', `${((x + .5) * 100).toFixed(0)}%`);
            frame.style.setProperty('--photo-glow-y', `${((y + .5) * 100).toFixed(0)}%`);
          });
        }, { passive: true });
        frame.addEventListener('pointerleave', () => {
          frame.style.setProperty('--photo-x', '0px');
          frame.style.setProperty('--photo-y', '0px');
          frame.style.setProperty('--photo-glow-x', '50%');
          frame.style.setProperty('--photo-glow-y', '30%');
        });
      }
    }

    document.documentElement.classList.add('enhanced');
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();