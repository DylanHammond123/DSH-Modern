// ============================
//  NEW VIEW BUILDERS — script.js
// ============================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR: scroll state ──
  const navbar = document.getElementById('navbar');
  const handleNavScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();


  // ── MOBILE BURGER MENU ──
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const burgerSpans = burger.querySelectorAll('span');

  burger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    burger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');

    if (isOpen) {
      burgerSpans[0].style.transform = 'translateY(7px) rotate(45deg)';
      burgerSpans[1].style.opacity = '0';
      burgerSpans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      burgerSpans[0].style.transform = '';
      burgerSpans[1].style.opacity = '';
      burgerSpans[2].style.transform = '';
    }
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burgerSpans[0].style.transform = '';
      burgerSpans[1].style.opacity = '';
      burgerSpans[2].style.transform = '';
    });
  });


  // ── SCROLL REVEAL ──
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => revealObserver.observe(el));


  // ── FAQ ACCORDION ──
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq__question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  });


  // ── CONTACT FORM (DEMO) ──
  function handleFormSubmit(e) {
    e.preventDefault();
    const successEl = document.getElementById('formSuccess');
    successEl.classList.add('visible');
    setTimeout(() => {
      successEl.classList.remove('visible');
      document.getElementById('contactForm').reset();
    }, 4000);
  }
  // Expose to global scope for the inline onsubmit
  window.handleFormSubmit = handleFormSubmit;


  // ── SMOOTH SCROLL OFFSET (for fixed nav) ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ── SERVICE CARDS: stagger animation on load ──
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

});
