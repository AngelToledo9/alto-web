/* ─────────────────────────────────────
   main.js  –  ALTO Soluciones
   Navbar · Scroll · Formulario
───────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  // ────────────────────────────────────
  // 1. MENÚ HAMBURGUESA (móvil)
  // ────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger?.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Cerrar menú al hacer clic en un enlace
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });


  // ────────────────────────────────────
  // 2. NAVBAR: cambio al hacer scroll
  // ────────────────────────────────────
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });


  // ────────────────────────────────────
  // 3. HIGHLIGHT LINK ACTIVO EN NAV
  // ────────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -40% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => sectionObserver.observe(section));


  // ────────────────────────────────────
  // 4. ANIMACIÓN DE ENTRADA (scroll reveal)
  // ────────────────────────────────────
  const revealElements = document.querySelectorAll(
    '.service-card, .why-item, .step, .photo-slot, .contact-item, .stat'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Pequeño delay escalonado por índice
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (i % 4) * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });


  // ────────────────────────────────────
  // 5. FORMULARIO DE CONTACTO
  // ────────────────────────────────────
  const form = document.getElementById('contactForm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre   = form.nombre?.value.trim();
    const telefono = form.telefono?.value.trim();
    const servicio = form.servicio?.value;
    const mensaje  = form.mensaje?.value.trim();

    // Validación básica
    if (!nombre) {
      showToast('Por favor ingresa tu nombre.', 'error');
      return;
    }

    // ─── Aquí puedes conectar con tu backend o servicio de email ───
    // Por ahora mostramos confirmación y redirigimos a WhatsApp
    const waNumber = '56939595424';
    const waText = encodeURIComponent(
      `Hola ALTO, soy ${nombre}.\n` +
      `Servicio: ${servicio || 'No especificado'}\n` +
      `Teléfono: ${telefono || 'No indicado'}\n\n` +
      `${mensaje || ''}`
    );

    showToast('¡Gracias! Redirigiendo a WhatsApp…', 'success');

    setTimeout(() => {
      window.open(`https://wa.me/${waNumber}?text=${waText}`, '_blank');
      form.reset();
    }, 1200);
  });


  // ────────────────────────────────────
  // 6. TOAST NOTIFICATIONS
  // ────────────────────────────────────
  function showToast(message, type = 'success') {
    // Eliminar toast anterior si existe
    document.querySelector('.toast')?.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast--visible');
    });

    setTimeout(() => {
      toast.classList.remove('toast--visible');
      toast.classList.add('toast--hiding');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }


  // ────────────────────────────────────
  // 7. TABS DE TRABAJOS (CCTV / Redes / Ensamblados)
  // ────────────────────────────────────
  document.querySelectorAll('.works-tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.works-tab').forEach(tab => {
      tab.addEventListener('click', () => {
        tabGroup.querySelectorAll('.works-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const panel = tab.closest('.works-panel');
        panel.querySelectorAll('.works-gallery').forEach(g => g.classList.add('works-gallery--hidden'));
        panel.querySelector(`#gallery-${tab.dataset.tab}`)?.classList.remove('works-gallery--hidden');
      });
    });
  });


  // ────────────────────────────────────
  // 8. SLIDER DE INSTALACIONES
  // ────────────────────────────────────
  (function initSlider() {
    const sliderViewport = document.querySelector('#gallery-instalaciones .slider-viewport');
    const sliderTrack    = document.querySelector('#gallery-instalaciones .slider-track');
    const btnPrevS       = document.getElementById('sliderPrev');
    const btnNextS       = document.getElementById('sliderNext');
    const countEl        = document.getElementById('sliderCount');

    if (!sliderTrack) return;

    const slides = sliderTrack.querySelectorAll('.slider-slide');
    const total  = slides.length;
    let idx      = 0;

    function perView() {
      return window.innerWidth < 640 ? 1 : 2;
    }

    function go(newIdx) {
      const pv   = perView();
      idx        = Math.max(0, Math.min(newIdx, total - pv));
      const slideW = slides[0].offsetWidth + 10;
      sliderTrack.style.transform = `translateX(-${idx * slideW}px)`;
      if (countEl)  countEl.textContent = `${idx + 1} / ${total}`;
      if (btnPrevS) btnPrevS.disabled   = idx === 0;
      if (btnNextS) btnNextS.disabled   = idx >= total - pv;
    }

    btnPrevS?.addEventListener('click', () => go(idx - 1));
    btnNextS?.addEventListener('click', () => go(idx + 1));

    let touchX = 0;
    sliderViewport?.addEventListener('touchstart', e => {
      touchX = e.changedTouches[0].screenX;
    }, { passive: true });
    sliderViewport?.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 50) go(dx < 0 ? idx + 1 : idx - 1);
    }, { passive: true });

    window.addEventListener('resize', () => go(idx));
    go(0);
  })();


  // ────────────────────────────────────
  // 9. LIGHTBOX CARRUSEL – Instalaciones físicas
  // ────────────────────────────────────
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxCtr   = document.getElementById('lightboxCounter');
  const btnClose      = document.getElementById('lightboxClose');
  const btnPrev       = document.getElementById('lightboxPrev');
  const btnNext       = document.getElementById('lightboxNext');

  const gallery = document.getElementById('gallery-instalaciones');
  const images  = [];
  let current   = 0;

  if (gallery) {
    gallery.querySelectorAll('.photo-slot').forEach((slot, i) => {
      const img = slot.querySelector('img');
      if (!img) return;
      images.push(img.src);
      slot.addEventListener('click', () => openLB(i));
    });
  }

  function openLB(index) {
    current = index;
    showImage(false);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLB() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function showImage(animate = true) {
    if (animate) {
      lightboxImg.classList.add('fading');
      setTimeout(() => {
        lightboxImg.src = images[current];
        lightboxCtr.textContent = `${current + 1} / ${images.length}`;
        lightboxImg.classList.remove('fading');
      }, 150);
    } else {
      lightboxImg.src = images[current];
      lightboxCtr.textContent = `${current + 1} / ${images.length}`;
    }
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    showImage();
  }

  function next() {
    current = (current + 1) % images.length;
    showImage();
  }

  btnClose?.addEventListener('click', closeLB);
  btnPrev?.addEventListener('click', prev);
  btnNext?.addEventListener('click', next);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLB();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('open')) return;
    if (e.key === 'Escape')      closeLB();
    if (e.key === 'ArrowLeft')   prev();
    if (e.key === 'ArrowRight')  next();
  });

  // Swipe táctil
  let touchX = 0;
  lightbox?.addEventListener('touchstart', (e) => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });
  lightbox?.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
  }, { passive: true });

}); // fin DOMContentLoaded
