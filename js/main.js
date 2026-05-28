// ── 4. Typewriter effect 
const phrases = [
    'I build full-stack web apps.',
    'I turn ideas into products.',
    'I write clean, scalable code.',
    'I craft seamless experiences.',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const typedEl    = document.getElementById('typed-text');

function typeLoop() {
    const phrase = phrases[phraseIndex];

    if (!isDeleting) {
        typedEl.textContent = phrase.slice(0, ++charIndex);
        if (charIndex === phrase.length) {
            isDeleting = true;
            return setTimeout(typeLoop, 1600);
        }
    } else {
        typedEl.textContent = phrase.slice(0, --charIndex);
        if (charIndex === 0) {
            isDeleting   = false;
            phraseIndex  = (phraseIndex + 1) % phrases.length;
        }
    }
    setTimeout(typeLoop, isDeleting ? 38 : 68);
}
typeLoop();

(function () {
 
  const form       = document.getElementById('contact-form');
  const successBox = document.getElementById('form-success');
  const submitBtn  = document.getElementById('form-submit-btn');
  const btnText    = document.getElementById('btn-text');
  const btnLoading = document.getElementById('btn-loading');
 
  if (!form) return;
 
  /* ── Validation helpers ── */
  function showError(id, inputId) {
    document.getElementById(id).classList.add('show');
    document.getElementById(inputId).classList.add('error');
  }
  function clearError(id, inputId) {
    document.getElementById(id).classList.remove('show');
    document.getElementById(inputId).classList.remove('error');
  }
 
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
 
  function validateForm() {
    let valid = true;
 
    const name    = document.getElementById('contact-name').value.trim();
    const email   = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();
 
    if (!name) {
      showError('err-name', 'contact-name');
      valid = false;
    } else {
      clearError('err-name', 'contact-name');
    }
 
    if (!email || !isValidEmail(email)) {
      showError('err-email', 'contact-email');
      valid = false;
    } else {
      clearError('err-email', 'contact-email');
    }
 
    if (!message) {
      showError('err-message', 'contact-message');
      valid = false;
    } else {
      clearError('err-message', 'contact-message');
    }
 
    return valid;
  }
 
  /* ── Clear error on input ── */
  ['contact-name', 'contact-email', 'contact-message'].forEach(id => {
    document.getElementById(id)?.addEventListener('input', () => {
      const errId = id.replace('contact-', 'err-');
      clearError(errId, id);
    });
  });
 
  /* ── Form submit handler ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
 
    if (!validateForm()) return;
 
    /* Loading state */
    submitBtn.disabled        = true;
    btnText.style.display     = 'none';
    btnLoading.style.display  = 'flex';
 
    try {
      const response = await fetch(form.action, {
        method:  'POST',
        body:    new FormData(form),
        headers: { 'Accept': 'application/json' },
      });
 
      if (response.ok) {
        /* Success — hide form, show confirmation */
        form.style.display      = 'none';
        successBox.classList.add('show');
      } else {
        /* Formspree returned an error */
        const data = await response.json();
        const msg  = data?.errors?.map(e => e.message).join(', ')
                     || 'Something went wrong. Please email me directly.';
        alert(msg);
        resetButtonState();
      }
    } catch {
      /* Network error */
      alert('Could not send your message. Please email me directly at deonthedeveloper@gmail.com');
      resetButtonState();
    }
  });
 
  function resetButtonState() {
    submitBtn.disabled       = false;
    btnText.style.display    = 'flex';
    btnLoading.style.display = 'none';
  }
 
  /* ── Reset — lets user send another message ─── */
  window.resetContactForm = function () {
    form.reset();
    form.style.display = '';
    successBox.classList.remove('show');
    resetButtonState();
  };
 
  /* ── CSS for spinner animation ──────────────── */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to   { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
 
})();

(function () {
  // Reveal-on-scroll for elements with `data-reveal`.
  const reveals = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!reveals.length) return;

  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  reveals.forEach(el => revealObserver.observe(el));
})();

(function () {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileNav = document.getElementById('mobile-nav');

  if (!mobileMenuButton || !mobileNav) return;

  function closeMobileNav() {
    mobileNav.classList.remove('open');
    mobileNav.classList.add('closing');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileMenuButton.querySelector('.material-symbols-outlined').textContent = 'menu';

    window.setTimeout(() => {
      if (!mobileNav.classList.contains('open')) {
        mobileNav.classList.remove('closing');
      }
    }, 280);
  }

  function openMobileNav() {
    mobileNav.classList.remove('closing');
    mobileNav.classList.add('open');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileMenuButton.setAttribute('aria-expanded', 'true');
    mobileMenuButton.querySelector('.material-symbols-outlined').textContent = 'close';
  }

  mobileMenuButton.addEventListener('click', () => {
    const isOpen = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNav.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  const desktopNavLinks = document.querySelectorAll('#desktop-nav a');
  const sectionIds = ['about', 'skills', 'work', 'experience', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  function setActiveNavLink(id) {
    desktopNavLinks.forEach(link => {
      const href = link.getAttribute('href')?.replace('#', '');
      if (href === id) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (sections.length) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveNavLink(entry.target.id);
          }
        });
      },
      { threshold: 0.45 }
    );

    sections.forEach(section => observer.observe(section));
  }
})();

(function () {
  const themeToggle = document.getElementById('theme-toggle');
  const rootElement = document.documentElement;
  const storageKey = 'theme';

  if (!themeToggle) return;

  function getStoredTheme() {
    return localStorage.getItem(storageKey);
  }

  function getPreferredTheme() {
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function updateToggleButton(theme) {
    const icon = themeToggle.querySelector('.material-symbols-outlined');
    if (icon) {
      icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
    }
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      rootElement.classList.add('light');
    } else {
      rootElement.classList.remove('light');
    }
    updateToggleButton(theme);
  }

  function initTheme() {
    const stored = getStoredTheme();
    const theme = stored || getPreferredTheme();
    applyTheme(theme);
  }

  themeToggle.addEventListener('click', () => {
    const current = rootElement.classList.contains('light') ? 'light' : 'dark';
    const nextTheme = current === 'light' ? 'dark' : 'light';
    localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  });

  initTheme();
})();
