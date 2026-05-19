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

(function () {

  /* ── Skill bars — animate once on scroll into view ── */
  const skillSection = document.getElementById('about');
  if (!skillSection) return;

  const bars    = skillSection.querySelectorAll('.skill-fill[data-width]');
  let animated  = false;

  const skillObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        /* Small delay so the section entrance animation
           completes before the bars shoot across */
        setTimeout(() => {
          bars.forEach(bar => {
            bar.style.width = bar.dataset.width + '%';
          });
        }, 300);

        skillObserver.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  skillObserver.observe(skillSection);

})();