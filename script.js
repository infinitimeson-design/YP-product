/* ==========================================================
   YP PRODUCT
   script.js
   PART 1 / 4
   Core
========================================================== */

"use strict";

/* ==========================================================
   SELECTORS
========================================================== */

const body = document.body;

const navbar = document.querySelector(".navbar");

const navLinks = document.querySelectorAll(".navbar__menu a");

const revealElements = document.querySelectorAll(".reveal");


/* ==========================================================
   SCROLL NAVBAR
========================================================== */

const updateNavbar = () => {

    if (window.scrollY > 40) {

        navbar?.classList.add("scrolled");

    } else {

        navbar?.classList.remove("scrolled");

    }

};

window.addEventListener("scroll", updateNavbar);

updateNavbar();


/* ==========================================================
   ACTIVE NAV LINK
========================================================== */

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});


/* ==========================================================
   REVEAL ON SCROLL
========================================================== */

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            revealObserver.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.15

});

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==========================================================
   DOM READY
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateNavbar();

});

/* ==========================================================
   PART 2 / 4
   Theme System
========================================================== */

const STORAGE_KEY = "yp-theme";

/* ==========================================================
   APPLY THEME
========================================================== */

const applyTheme = (theme) => {

    const heroLogo = document.getElementById("hero-logo");

    if (theme === "light") {

        body.classList.add("light");

        if (heroLogo) {
            heroLogo.src = "assets/images/logo/logo-black.png";
        }

    } else {

        body.classList.remove("light");

        if (heroLogo) {
            heroLogo.src = "assets/images/logo/logo-white.png";
        }

    }

    localStorage.setItem(STORAGE_KEY, theme);

};


/* ==========================================================
   INITIAL THEME
========================================================== */

const initTheme = () => {

    const savedTheme = localStorage.getItem(STORAGE_KEY);

    if (savedTheme) {

        applyTheme(savedTheme);

        return;

    }

    const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;

    applyTheme(prefersLight ? "light" : "dark");

};


/* ==========================================================
   TOGGLE
========================================================== */

themeToggle?.addEventListener("click", () => {

    const isLight = body.classList.contains("light");

    applyTheme(isLight ? "dark" : "light");

});


/* ==========================================================
   SYSTEM CHANGE
========================================================== */

window.matchMedia("(prefers-color-scheme: light)")
.addEventListener("change", (event) => {

    if (!localStorage.getItem(STORAGE_KEY)) {

        applyTheme(event.matches ? "light" : "dark");

    }

});


/* ==========================================================
   INIT
========================================================== */

initTheme();

/* ==========================================================
   PART 3 / 4
   Navigation + Portfolio
========================================================== */


/* ==========================================================
   SMOOTH SCROLL
========================================================== */

navLinks.forEach(link => {

    link.addEventListener("click", (event) => {

        const targetID = link.getAttribute("href");

        if (!targetID || !targetID.startsWith("#")) return;

        const target = document.querySelector(targetID);

        if (!target) return;

        event.preventDefault();

        window.scrollTo({

            top: target.offsetTop - 90,

            behavior: "smooth"

        });

    });

});


/* ==========================================================
   ACTIVE SECTION
========================================================== */

const sections = document.querySelectorAll("section[id]");

const sectionObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === `#${id}`) {

                link.classList.add("active");

            }

        });

    });

}, {

    threshold: 0.45

});

sections.forEach(section => {

    sectionObserver.observe(section);

});


/* ==========================================================
   PORTFOLIO CARDS
========================================================== */

const portfolioCards = document.querySelectorAll(".portfolio-card");

portfolioCards.forEach(card => {

    card.addEventListener("mouseenter", () => {

        portfolioCards.forEach(item => {

            if (item !== card) {

                item.style.opacity = ".65";

                item.style.transform = "scale(.98)";

            }

        });

    });

    card.addEventListener("mouseleave", () => {

        portfolioCards.forEach(item => {

            item.style.opacity = "1";

            item.style.transform = "";

        });

    });

});


/* ==========================================================
   TOUCH DEVICES
========================================================== */

portfolioCards.forEach(card => {

    card.addEventListener("touchstart", () => {

        portfolioCards.forEach(item => {

            item.classList.remove("active");

        });

        card.classList.add("active");

    }, { passive: true });

});


/* ==========================================================
   HERO SCROLL
========================================================== */

const heroScroll = document.querySelector(".hero__scroll");

heroScroll?.addEventListener("click", () => {

    const nextSection = document.querySelector("section");

    if (!nextSection) return;

    window.scrollTo({

        top: nextSection.offsetTop - 80,

        behavior: "smooth"

    });

});

/* ==========================================================
   PART 4 / 4
   Final
========================================================== */


/* ==========================================================
   IMAGE PRELOAD
========================================================== */

window.addEventListener("load", () => {

    document.body.classList.add("loaded");

});


/* ==========================================================
   REMOVE ACTIVE FROM TOUCH
========================================================== */

document.addEventListener("touchstart", (event) => {

    if (event.target.closest(".portfolio-card")) return;

    portfolioCards.forEach(card => {

        card.classList.remove("active");

    });

}, { passive: true });


/* ==========================================================
   ESC CLOSE STATES
========================================================== */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    portfolioCards.forEach(card => {

        card.classList.remove("active");

    });

});


/* ==========================================================
   RESIZE HANDLER
========================================================== */

let resizeTimer;

window.addEventListener("resize", () => {

    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {

        updateNavbar();

    }, 150);

});


/* ==========================================================
   PERFORMANCE
========================================================== */

window.addEventListener("pageshow", () => {

    updateNavbar();

});


/* ==========================================================
   PREVENT DRAG
========================================================== */

document.querySelectorAll("img").forEach(image => {

    image.setAttribute("draggable", "false");

});


/* ==========================================================
   CONSOLE
========================================================== */

console.log("%cYP Product",
"font-size:18px;font-weight:bold;color:#ffffff;background:#111;padding:8px 14px;border-radius:8px;");

console.log("%cDesigned & Developed by Sicily Design",
"color:#888;font-size:12px;");


/* ==========================================================
   END
========================================================== */
