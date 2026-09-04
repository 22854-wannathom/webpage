```javascript
(() => {
  "use strict";

  /* =========================================================
     🌸 FLORAL DREAM INTERACTION ENGINE
     9 EFFECTS • Vanilla JS • No external libraries
     ========================================================= */

  const CSS_FILE = "floral-effects.css";

  /* Prevent duplicate initialization */
  if (window.__FLORAL_DREAM_INITIALIZED__) {
    return;
  }

  window.__FLORAL_DREAM_INITIALIZED__ = true;

  /* =========================================================
     1. Load enhancement CSS automatically
     ========================================================= */

  function loadFloralCSS() {
    const existingCSS = document.querySelector(
      `link[href="${CSS_FILE}"]`
    );

    if (existingCSS) return;

    const link = document.createElement("link");

    link.rel = "stylesheet";
    link.href = CSS_FILE;

    document.head.appendChild(link);
  }

  /* =========================================================
     2. Atmospheric background
     ========================================================= */

  function createAtmosphere() {
    if (document.querySelector(".floral-atmosphere")) {
      return;
    }

    const layer = document.createElement("div");

    layer.className = "floral-atmosphere";
    layer.setAttribute("aria-hidden", "true");

    document.body.prepend(layer);
  }

  /* =========================================================
     3. Floating petals
     ========================================================= */

  function createPetals() {
    if (document.querySelector(".floral-petals")) {
      return;
    }

    const container = document.createElement("div");

    container.className = "floral-petals";
    container.setAttribute("aria-hidden", "true");

    const symbols = [
      "🌸",
      "✿",
      "❀",
      "🌷",
      "🍃"
    ];

    const count = Math.min(
      28,
      Math.max(
        14,
        Math.floor(window.innerWidth / 45)
      )
    );

    for (let i = 0; i < count; i++) {
      const petal = document.createElement("span");

      petal.className = "floral-petal";
      petal.textContent = symbols[i % symbols.length];

      petal.style.left = `${Math.random() * 100}%`;

      petal.style.animationDelay =
        `${Math.random() * 12}s`;

      petal.style.animationDuration =
        `${8 + Math.random() * 10}s`;

      petal.style.fontSize =
        `${12 + Math.random() * 14}px`;

      petal.style.opacity =
        `${0.25 + Math.random() * 0.55}`;

      container.appendChild(petal);
    }

    document.body.appendChild(container);
  }

  /* =========================================================
     4. Wind effect
     ========================================================= */

  function windEffect() {
    let windX = 0;
    let targetWind = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        if (!window.innerWidth) return;

        targetWind =
          (event.clientX / window.innerWidth - 0.5) * 2;
      },
      { passive: true }
    );

    function animate() {
      windX +=
        (targetWind - windX) * 0.035;

      document.documentElement.style.setProperty(
        "--floral-wind",
        `${windX * 18}px`
      );

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* =========================================================
     5. Mouse parallax
     ========================================================= */

  function mouseParallax() {
    const elements = document.querySelectorAll(
      "section, article, .card, .box, .container"
    );

    if (!elements.length) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener(
      "mousemove",
      (event) => {
        if (!window.innerWidth || !window.innerHeight) {
          return;
        }

        mouseX =
          event.clientX / window.innerWidth - 0.5;

        mouseY =
          event.clientY / window.innerHeight - 0.5;
      },
      { passive: true }
    );

    function animate() {
      elements.forEach((element, index) => {
        if (
          element.matches("nav, header, footer") ||
          element.closest(".floral-atmosphere") ||
          element.closest(".floral-petals")
        ) {
          return;
        }

        const depth = 2 + (index % 3);

        element.style.setProperty(
          "--floral-parallax-x",
          `${mouseX * depth}px`
        );

        element.style.setProperty(
          "--floral-parallax-y",
          `${mouseY * depth}px`
        );
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  /* =========================================================
     6. Card tilt
     ========================================================= */

  function cardTilt() {
    const cards = document.querySelectorAll(
      ".card, .box, article, .project, .project-card"
    );

    if (!cards.length) {
      return;
    }

    cards.forEach((card) => {
      card.addEventListener(
        "mousemove",
        (event) => {
          const rect =
            card.getBoundingClientRect();

          if (!rect.width || !rect.height) {
            return;
          }

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const rotateX =
            ((y / rect.height) - 0.5) * -6;

          const rotateY =
            ((x / rect.width) - 0.5) * 6;

          card.style.setProperty(
            "--floral-rotate-x",
            `${rotateX}deg`
          );

          card.style.setProperty(
            "--floral-rotate-y",
            `${rotateY}deg`
          );

          card.classList.add(
            "floral-tilting"
          );
        },
        { passive: true }
      );

      card.addEventListener(
        "mouseleave",
        () => {
          card.classList.remove(
            "floral-tilting"
          );

          card.style.setProperty(
            "--floral-rotate-x",
            "0deg"
          );

          card.style.setProperty(
            "--floral-rotate-y",
            "0deg"
          );
        }
      );
    });
  }

  /* =========================================================
     7. Hover interaction
     ========================================================= */

  function hoverInteraction() {
    const interactive =
      document.querySelectorAll(
        "a, button, .card, .box, input, textarea, select"
      );

    interactive.forEach((element) => {
      element.classList.add(
        "floral-interactive"
      );
    });
  }

  /* =========================================================
     8. Soft glow
     ========================================================= */

  function softGlow() {
    const headings =
      document.querySelectorAll(
        "h1, h2, h3"
      );

    headings.forEach((heading) => {
      heading.classList.add(
        "floral-soft-glow"
      );
    });
  }

  /* =========================================================
     9. Smooth scroll
     ========================================================= */

  function smoothScroll() {
    document.documentElement.style.scrollBehavior =
      "smooth";
  }

  /* =========================================================
     Accessibility
     ========================================================= */

  function accessibility() {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const applyReducedMotion = () => {
      if (media.matches) {
        document.documentElement.classList.add(
          "floral-reduced-motion"
        );
      } else {
        document.documentElement.classList.remove(
          "floral-reduced-motion"
        );
      }
    };

    applyReducedMotion();

    if (typeof media.addEventListener === "function") {
      media.addEventListener(
        "change",
        applyReducedMotion
      );
    } else if (
      typeof media.addListener === "function"
    ) {
      media.addListener(
        applyReducedMotion
      );
    }
  }

  /* =========================================================
     Start everything
     ========================================================= */

  function init() {
    loadFloralCSS();

    accessibility();

    /*
     * Respect reduced-motion preference.
     * Decorative static effects can still be created,
     * but continuous motion is skipped.
     */
    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    createAtmosphere();
    createPetals();

    hoverInteraction();
    softGlow();
    smoothScroll();

    if (!reducedMotion) {
      windEffect();
      mouseParallax();
      cardTilt();
    }
  }

  /* =========================================================
     DOM Ready
     ========================================================= */

  if (
    document.readyState === "loading"
  ) {
    document.addEventListener(
      "DOMContentLoaded",
      init,
      { once: true }
    );
  } else {
    init();
  }

})();
```
