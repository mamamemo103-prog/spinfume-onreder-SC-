(() => {
  const head = document.querySelector('.sf-head');
  const burger = document.querySelector('.sf-burger');
  const nav = document.querySelector('#sf-nav');

  if (head && burger && nav) {
    burger.addEventListener('click', () => {
      const on = head.classList.toggle('open');
      burger.setAttribute('aria-expanded', on ? 'true' : 'false');
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        head.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const chips = [...document.querySelectorAll('[data-sf-filter]')];
  const cards = [...document.querySelectorAll('[data-sf-cat]')];

  const applyFilter = (key) => {
    cards.forEach((card) => {
      card.hidden = !(key === 'all' || card.dataset.sfCat === key);
    });
    chips.forEach((chip) => {
      chip.setAttribute('aria-pressed', chip.dataset.sfFilter === key ? 'true' : 'false');
    });
  };

  chips.forEach((chip) => chip.addEventListener('click', () => applyFilter(chip.dataset.sfFilter)));

  const hash = String(location.hash || '').replace(/^#/, '').toLowerCase();
  const valid = new Set(['slots', 'roulette', 'blackjack', 'poker', 'wheel']);
  if (chips.length && cards.length) applyFilter(valid.has(hash) ? hash : 'all');

  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add('in')),
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  );
  document.querySelectorAll('.sf-reveal').forEach((el) => observer.observe(el));

  document.querySelectorAll('.js-year').forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
