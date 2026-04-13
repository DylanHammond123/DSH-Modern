// ================================
//  GROUNDFORM LANDSCAPES — script.js
// ================================

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──
  const cursor = document.getElementById('cursor');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });
    document.querySelectorAll('a, button, .service-card, .gallery__item, .review-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('grow'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('grow'));
    });
  }


  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });


  // ── MOBILE BURGER ──
  const burger   = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');
  const spans    = burger.querySelectorAll('span');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    spans[0].style.transform = open ? 'translateY(8px) rotate(45deg)' : '';
    spans[1].style.transform = open ? 'translateY(-8px) rotate(-45deg)' : '';
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    });
  });


  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => revealObs.observe(el));


  // ── FAQ ACCORDION ──
  document.querySelectorAll('.faq__item').forEach(item => {
    item.querySelector('.faq__q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq__item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq__q').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq__q').setAttribute('aria-expanded', 'true');
      }
    });
  });


  // ── CONTACT FORM ──
  window.handleSubmit = function(e) {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    success.classList.add('show');
    setTimeout(() => {
      success.classList.remove('show');
      e.target.reset();
    }, 4500);
  };


  // ── SMOOTH SCROLL (offset for fixed nav) ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 80,
          behavior: 'smooth'
        });
      }
    });
  });


  // ── PARALLAX HERO IMAGE ──
  const heroImg = document.getElementById('heroImg');
  if (heroImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroImg.style.transform = `scale(1) translateY(${scrollY * 0.25}px)`;
      }
    }, { passive: true });
  }


  // ── GALLERY ITEM: subtle tilt on mouse ──
  document.querySelectorAll('.gallery__item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const rect = item.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 6;
      item.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });

});
