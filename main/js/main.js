(() => {
  const gnbButtons = Array.from(document.querySelectorAll('.header_gnb_list > button'));
  const breadcrumbChap = document.querySelector('.header_sub_chap');
  const sections = gnbButtons
    .map((button) => document.getElementById(button.dataset.target))
    .filter(Boolean);

  const setActive = (targetId) => {
    const activeButton = gnbButtons.find((button) => button.dataset.target === targetId);
    if (!activeButton) return;

    gnbButtons.forEach((button) => {
      const isActive = button === activeButton;
      button.closest('.header_gnb_list').classList.toggle('select', isActive);
      if (isActive) {
        button.setAttribute('aria-current', 'true');
      } else {
        button.removeAttribute('aria-current');
      }
    });

    breadcrumbChap.innerHTML = activeButton.querySelector('i').outerHTML + activeButton.textContent.trim();
  };

  gnbButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.getElementById(button.dataset.target);
      target?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
})();

(() => {
  const header = document.getElementById('header');
  if (!header) return;

  const toggleScrolled = () => {
    header.classList.toggle('_is_scroll', window.scrollY > 0);
  };

  toggleScrolled();
  window.addEventListener('scroll', toggleScrolled, { passive: true });
})();

(() => {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  revealEls.forEach((el) => revealObserver.observe(el));
})();
