/* ══════════════════════════════════════
   RENTLA — rentla_script.js
   Handles: Hamburger, FAQ, Forms,
   Products Carousel, Navbar scroll
══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── HAMBURGER ─── */
  const hb = document.getElementById('hamburger');
  const mm = document.getElementById('mobileMenu');
  if (hb && mm) {
    hb.addEventListener('click', () => {
      const o = mm.classList.toggle('open');
      hb.setAttribute('aria-expanded', o);
    });
    mm.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
      mm.classList.remove('open');
      hb.setAttribute('aria-expanded', 'false');
    }));
  }


  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';
      // Close all
      document.querySelectorAll('.faq-q').forEach(o => {
        o.setAttribute('aria-expanded', 'false');
        const a = o.nextElementSibling;
        const ic = o.querySelector('.faq-icon');
        if (a) a.classList.remove('open');
        if (ic) ic.textContent = '+';
      });
      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        btn.nextElementSibling.classList.add('open');
        btn.querySelector('.faq-icon').textContent = '×';
      }
    });
  });


  /* ─── FORM VALIDATION & TOAST ─── */
  function showToast(msg, type) {
    const existing = document.querySelector('.rl-toast');
    if (existing) existing.remove();
    const t = document.createElement('div');
    t.className = 'rl-toast';
    t.style.cssText = `
      position:fixed;bottom:90px;left:50%;
      transform:translateX(-50%) translateY(16px);
      padding:13px 28px;border-radius:0;
      font-family:'Nunito',sans-serif;font-size:.93rem;font-weight:600;
      z-index:9999;opacity:0;
      transition:opacity .3s,transform .3s;
      box-shadow:0 4px 16px rgba(0,0,0,.2);
      white-space:nowrap;
      background:${type === 'success' ? '#0d1b3e' : '#c62828'};
      color:#fff;
    `;
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      t.style.opacity = '1';
      t.style.transform = 'translateX(-50%) translateY(0)';
    }));
    setTimeout(() => {
      t.style.opacity = '0';
      setTimeout(() => t.remove(), 400);
    }, 3500);
  }

  function validateForm(wrap) {
    const inputs = wrap.querySelectorAll('input[type="text"], input[type="tel"], input[type="email"]');
    let valid = true;
    inputs.forEach(inp => {
      if (!inp.value.trim()) {
        inp.style.boxShadow = '0 0 0 2px #c62828';
        valid = false;
      } else {
        inp.style.boxShadow = '';
      }
    });
    if (!valid) { showToast('Please fill in all required fields.', 'error'); return false; }
    const tel = wrap.querySelector('input[type="tel"]');
    if (tel && !/^\d{10}$/.test(tel.value.replace(/\s/g, ''))) {
      tel.style.boxShadow = '0 0 0 2px #c62828';
      showToast('Enter a valid 10-digit mobile number.', 'error');
      return false;
    }
    return true;
  }

  // Hero form
  const heroSubmit = document.querySelector('.hero-submit');
  if (heroSubmit) {
    heroSubmit.addEventListener('click', () => {
      const wrap = heroSubmit.closest('.enquire-form').parentElement;
      if (validateForm(document.querySelector('.enquire-form'))) {
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
      }
    });
  }

  // Contact form
  const contactSubmit = document.querySelector('.contact-submit');
  if (contactSubmit) {
    contactSubmit.addEventListener('click', () => {
      const wrap = contactSubmit.closest('.contact-form-side');
      if (validateForm(wrap)) {
        // Redirect to thank you page
        window.location.href = 'thankyou.html';
      }
    });
  }


  /* ─── PRODUCTS CAROUSEL ─── */
  const track = document.getElementById('productsTrack');
  const prevBtn = document.getElementById('prodPrev');
  const nextBtn = document.getElementById('prodNext');

  if (track && prevBtn && nextBtn) {
    let idx = 0;

    function getVisible() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 900) return 2;
      return 4;
    }

    function getCardWidth() {
      const cards = track.querySelectorAll('.product-card');
      if (!cards.length) return 0;
      const vis = getVisible();
      const gap = 20;
      const outer = track.parentElement;
      return (outer.offsetWidth - gap * (vis - 1)) / vis;
    }

    function setWidths() {
      const w = getCardWidth();
      track.querySelectorAll('.product-card').forEach(c => { c.style.minWidth = w + 'px'; });
    }

    function goTo(i) {
      const total = track.querySelectorAll('.product-card').length;
      const vis = getVisible();
      const max = Math.max(0, total - vis);
      idx = Math.max(0, Math.min(i, max));
      const w = getCardWidth();
      track.style.transform = `translateX(-${idx * (w + 20)}px)`;
    }

    prevBtn.addEventListener('click', () => goTo(idx - 1));
    nextBtn.addEventListener('click', () => goTo(idx + 1));
    window.addEventListener('resize', () => { setWidths(); goTo(idx); }, { passive: true });
    setWidths();
    goTo(0);
  }


  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.style.boxShadow = scrollY > 10
        ? '0 4px 20px rgba(0,0,0,0.25)'
        : 'none';
    }, { passive: true });
  }


  /* ─── IMAGE ERROR HANDLING ─── */
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => { img.style.display = 'none'; });
    img.addEventListener('load', () => {
      const ph = img.nextElementSibling;
      if (ph && (ph.classList.contains('hero-img-ph') || ph.classList.contains('browse-img-ph') ||
          ph.classList.contains('prod-img-ph') || ph.classList.contains('find-img-ph') ||
          ph.classList.contains('cta-img-ph'))) {
        ph.style.display = 'none';
      }
    });
  });

});
