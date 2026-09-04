(() => {
    "use strict";

    /* =========================================================
       🌸 FLORAL DREAM
       Personal Portfolio Interaction Engine
       ========================================================= */

    const root = document.documentElement;

    /* ---------------------------------------------------------
       1. Create atmosphere
       --------------------------------------------------------- */

    function createAtmosphere() {
        if (document.querySelector(".floral-atmosphere")) return;

        const atmosphere = document.createElement("div");

        atmosphere.className = "floral-atmosphere";
        atmosphere.setAttribute("aria-hidden", "true");

        document.body.prepend(atmosphere);
    }


    /* ---------------------------------------------------------
       2. Create floating petals
       --------------------------------------------------------- */

    function createPetals() {
        if (document.querySelector(".floral-petals")) return;

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

        const isMobile = window.innerWidth < 768;

        const count = isMobile ? 10 : 20;

        for (let i = 0; i < count; i++) {

            const petal = document.createElement("span");

            petal.className = "floral-petal";

            petal.textContent =
                symbols[Math.floor(Math.random() * symbols.length)];

            petal.style.left =
                `${Math.random() * 100}%`;

            petal.style.animationDelay =
                `${Math.random() * 12}s`;

            petal.style.animationDuration =
                `${9 + Math.random() * 9}s`;

            petal.style.fontSize =
                `${12 + Math.random() * 14}px`;

            petal.style.opacity =
                `${0.25 + Math.random() * 0.45}`;

            petal.style.setProperty(
                "--petal-drift",
                `${-80 + Math.random() * 160}px`
            );

            petal.style.setProperty(
                "--petal-rotate",
                `${180 + Math.random() * 360}deg`
            );

            container.appendChild(petal);
        }

        document.body.appendChild(container);
    }


    /* ---------------------------------------------------------
       3. Cursor glow
       --------------------------------------------------------- */

    function createCursorGlow() {

        if (
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        if (document.querySelector(".floral-cursor-glow")) {
            return;
        }

        const glow = document.createElement("div");

        glow.className = "floral-cursor-glow";

        glow.setAttribute("aria-hidden", "true");

        document.body.appendChild(glow);

        let currentX = window.innerWidth / 2;
        let currentY = window.innerHeight / 2;

        let targetX = currentX;
        let targetY = currentY;

        window.addEventListener(
            "mousemove",
            (event) => {

                targetX = event.clientX;
                targetY = event.clientY;

            },
            { passive: true }
        );

        function animateGlow() {

            currentX +=
                (targetX - currentX) * 0.12;

            currentY +=
                (targetY - currentY) * 0.12;

            glow.style.transform =
                `translate3d(${currentX}px, ${currentY}px, 0)`;

            requestAnimationFrame(animateGlow);
        }

        animateGlow();
    }


    /* ---------------------------------------------------------
       4. Wind effect
       --------------------------------------------------------- */

    function windEffect() {

        let targetWind = 0;
        let currentWind = 0;

        window.addEventListener(
            "mousemove",
            (event) => {

                const position =
                    event.clientX / window.innerWidth;

                targetWind =
                    (position - 0.5) * 2;

            },
            { passive: true }
        );

        function animateWind() {

            currentWind +=
                (targetWind - currentWind) * 0.04;

            root.style.setProperty(
                "--floral-wind",
                `${currentWind * 35}px`
            );

            requestAnimationFrame(animateWind);
        }

        animateWind();
    }


    /* ---------------------------------------------------------
       5. Mouse parallax
       --------------------------------------------------------- */

    function mouseParallax() {

        if (
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        const elements =
            document.querySelectorAll(
                "[data-parallax]"
            );

        if (!elements.length) return;

        let mouseX = 0;
        let mouseY = 0;

        window.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX /
                    window.innerWidth -
                    0.5;

                mouseY =
                    event.clientY /
                    window.innerHeight -
                    0.5;

            },
            { passive: true }
        );

        function animate() {

            elements.forEach((element) => {

                const strength =
                    Number(
                        element.dataset.parallax
                    ) || 8;

                const x =
                    mouseX * strength;

                const y =
                    mouseY * strength;

                element.style.setProperty(
                    "--parallax-x",
                    `${x}px`
                );

                element.style.setProperty(
                    "--parallax-y",
                    `${y}px`
                );
            });

            requestAnimationFrame(animate);
        }

        animate();
    }


    /* ---------------------------------------------------------
       6. Card tilt
       --------------------------------------------------------- */

    function cardTilt() {

        if (
            window.matchMedia("(pointer: coarse)").matches
        ) {
            return;
        }

        const cards =
            document.querySelectorAll(
                "[data-tilt]"
            );

        cards.forEach((card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();

                    const x =
                        event.clientX - rect.left;

                    const y =
                        event.clientY - rect.top;

                    const rotateY =
                        ((x / rect.width) - 0.5) * 7;

                    const rotateX =
                        ((y / rect.height) - 0.5) * -7;

                    card.style.setProperty(
                        "--rotate-x",
                        `${rotateX}deg`
                    );

                    card.style.setProperty(
                        "--rotate-y",
                        `${rotateY}deg`
                    );

                    card.classList.add(
                        "floral-tilting"
                    );
                }
            );

            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--rotate-x",
                        "0deg"
                    );

                    card.style.setProperty(
                        "--rotate-y",
                        "0deg"
                    );

                    card.classList.remove(
                        "floral-tilting"
                    );
                }
            );
        });
    }


    /* ---------------------------------------------------------
       7. Scroll reveal
       --------------------------------------------------------- */

    function scrollReveal() {

        const elements =
            document.querySelectorAll(
                "[data-reveal]"
            );

        if (!elements.length) return;

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        elements.forEach(
            (element) => {
                observer.observe(element);
            }
        );
    }


    /* ---------------------------------------------------------
       8. Interactive elements
       --------------------------------------------------------- */

    function interactiveElements() {

        const elements =
            document.querySelectorAll(
                "a, button, .card, input, textarea, select"
            );

        elements.forEach(
            (element) => {

                element.classList.add(
                    "floral-interactive"
                );
            }
        );
    }


    /* ---------------------------------------------------------
       9. Active link micro interaction
       --------------------------------------------------------- */

    function navigationEffect() {

        const links =
            document.querySelectorAll(
                ".nav-links a"
            );

        links.forEach(
            (link) => {

                link.addEventListener(
                    "mouseenter",
                    () => {
                        link.classList.add(
                            "floral-nav-hover"
                        );
                    }
                );

                link.addEventListener(
                    "mouseleave",
                    () => {
                        link.classList.remove(
                            "floral-nav-hover"
                        );
                    }
                );
            }
        );
    }


    /* ---------------------------------------------------------
       10. Smooth scroll
       --------------------------------------------------------- */

    function smoothScroll() {

        document.documentElement.style.scrollBehavior =
            "smooth";
    }


    /* ---------------------------------------------------------
       11. Accessibility
       --------------------------------------------------------- */

    function accessibility() {

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            );

        function update() {

            root.classList.toggle(
                "floral-reduced-motion",
                reducedMotion.matches
            );
        }

        update();

        reducedMotion.addEventListener(
            "change",
            update
        );
    }


    /* ---------------------------------------------------------
       Initialize
       --------------------------------------------------------- */

    function init() {

        createAtmosphere();

        createPetals();

        createCursorGlow();

        windEffect();

        mouseParallax();

        cardTilt();

        scrollReveal();

        interactiveElements();

        navigationEffect();

        smoothScroll();

        accessibility();

        console.log(
            "🌸 Floral Dream initialized"
        );
    }


    if (
        document.readyState === "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();
