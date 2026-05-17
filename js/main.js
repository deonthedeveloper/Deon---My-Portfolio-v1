// ── 4. Typewriter effect ────────────────────── 
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