/* =========================================================
   HWD PORTFOLIO — CLEAN FINAL JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector, scope = document) =>
    scope.querySelector(selector);

const $$ = (selector, scope = document) =>
    [...scope.querySelectorAll(selector)];

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

const hasFinePointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;


/* =========================================================
   REFRESH → TOP
========================================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


/* =========================================================
   ELEMENTS
========================================================= */

const header = $(".header");

const menuToggle = $("#menu-toggle");
const navLinks = $("#nav-links");
const navItems = $$(".nav-links a");

const themeToggle = $("#themeToggle");

const contactForm = $("#contact-form");
const formStatus = $("#form-status");

const backToTopButton = $(".scroll-top");

const progressTrack = $(".scroll-progress");
const progressBar = $(".scroll-progress span");

const pageLoader = $("#pageLoader");

const logoLink = $(".logo");

const cursorDot = $(".cursor-dot");
const cursorOutline = $(".cursor-outline");

const heroBrowser = $(".browser-card");


/* =========================================================
   MOBILE MENU
========================================================= */

function closeMobileMenu() {

    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    menuToggle.textContent = "☰";

}


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("active");

            const isOpen =
                navLinks.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    navItems.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener(
        "click",
        (event) => {

            const clickedInsideMenu =
                navLinks.contains(event.target) ||
                menuToggle.contains(event.target);

            if (!clickedInsideMenu) {
                closeMobileMenu();
            }

        }
    );


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 820) {
                closeMobileMenu();
            }

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function scrollToTarget(target) {

    if (!target) return;

    const headerHeight =
        header
            ? header.getBoundingClientRect().height
            : 0;

    const top =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;

    window.scrollTo({

        top: Math.max(0, top),

        behavior:
            prefersReducedMotion
                ? "auto"
                : "smooth"

    });

}


$$('a[href^="#"]').forEach((link) => {

    link.addEventListener(
        "click",
        (event) => {

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {
                return;
            }

            const target = $(href);

            if (!target) return;

            event.preventDefault();

            scrollToTarget(target);

            if (history.replaceState) {

                history.replaceState(
                    null,
                    "",
                    href
                );

            }

        }
    );

});


/* =========================================================
   LOGO → TOP
========================================================= */

if (logoLink) {

    logoLink.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            closeMobileMenu();

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });

            if (history.replaceState) {

                history.replaceState(
                    null,
                    "",
                    window.location.pathname
                );

            }

        }
    );

}


/* =========================================================
   PAGE LOADER
========================================================= */

function hidePageLoader() {

    if (!pageLoader) return;

    pageLoader.classList.add("hide");

    setTimeout(
        () => {

            pageLoader.setAttribute(
                "aria-hidden",
                "true"
            );

        },
        550
    );

}


window.addEventListener(
    "load",
    () => {

        setTimeout(

            hidePageLoader,

            prefersReducedMotion
                ? 0
                : 350

        );

    }
);


/* =========================================================
   THEME
========================================================= */

function applyTheme(theme) {

    const dark =
        theme === "dark";

    document.body.classList.toggle(
        "dark-mode",
        dark
    );

    if (themeToggle) {

        themeToggle.textContent =
            dark
                ? "☀️"
                : "🌙";

        themeToggle.setAttribute(

            "aria-label",

            dark
                ? "Switch to light mode"
                : "Switch to dark mode"

        );

    }

}


let savedTheme = null;


try {

    savedTheme =
        localStorage.getItem("theme");

} catch (error) {

    savedTheme = null;

}


applyTheme(
    savedTheme === "light"
        ? "light"
        : "dark"
);


if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const nextTheme =
                document.body.classList.contains(
                    "dark-mode"
                )
                    ? "light"
                    : "dark";

            applyTheme(nextTheme);

            try {

                localStorage.setItem(
                    "theme",
                    nextTheme
                );

            } catch (error) {}

        }
    );

}


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

const revealElements = $$(
    [
        ".section-heading",
        ".section-title",
        ".service-card",
        ".project-card",
        ".about-text",
        ".about-box",
        ".benefit",
        ".testimonial-card",
        ".faq-item",
        ".contact-text",
        ".contact-form"
    ].join(",")
);


revealElements.forEach(
    (element, index) => {

        element.classList.add("reveal");

        const stagger =
            Math.min(
                (index % 4) * 70,
                210
            );

        element.style.transitionDelay =
            `${stagger}ms`;

    }
);


if (
    prefersReducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(
        (element) => {

            element.classList.add("active");

            element.style.transitionDelay =
                "0ms";

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(

            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        entry.target.classList.add(
                            "active"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },

            {

                threshold: 0.10,

                rootMargin:
                    "0px 0px -45px 0px"

            }

        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   SCROLL UI
========================================================= */

const sections =
    $$("section[id]");

let scrollTicking = false;


function updateScrollUI() {

    const scrollY =
        window.scrollY;


    /* HEADER */

    if (header) {

        header.classList.toggle(
            "scrolled",
            scrollY > 45
        );

    }


    /* PROGRESS */

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage =
        maxScroll > 0
            ? Math.min(
                100,
                Math.max(
                    0,
                    (scrollY / maxScroll) * 100
                )
            )
            : 0;


    if (progressBar) {

        progressBar.style.width =
            `${percentage}%`;

    } else if (progressTrack) {

        progressTrack.style.width =
            `${percentage}%`;

    }


    /* BACK TO TOP */

    if (backToTopButton) {

        backToTopButton.classList.toggle(

            "show",

            scrollY > 320

        );

    }


    /* ACTIVE NAV */

    let currentId = "home";

    const headerOffset =
        (
            header
                ? header.offsetHeight
                : 0
        ) + 45;


    sections.forEach(
        (section) => {

            const top =
                section.offsetTop -
                headerOffset;

            const bottom =
                top +
                section.offsetHeight;

            if (
                scrollY >= top &&
                scrollY < bottom
            ) {

                currentId =
                    section.id;

            }

        }
    );


    navItems.forEach(
        (link) => {

            const active =
                link.getAttribute("href") ===
                `#${currentId}`;

            link.classList.toggle(
                "active",
                active
            );

        }
    );


    scrollTicking = false;

}


function requestScrollUIUpdate() {

    if (scrollTicking) return;

    scrollTicking = true;

    requestAnimationFrame(
        updateScrollUI
    );

}


window.addEventListener(

    "scroll",

    requestScrollUIUpdate,

    {
        passive: true
    }

);


window.addEventListener(

    "resize",

    requestScrollUIUpdate,

    {
        passive: true
    }

);


updateScrollUI();


/* =========================================================
   BACK TO TOP
========================================================= */

if (backToTopButton) {

    backToTopButton.addEventListener(
        "click",
        (event) => {

            event.preventDefault();

            window.scrollTo({

                top: 0,

                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth"

            });


            if (history.replaceState) {

                history.replaceState(

                    null,

                    "",

                    window.location.pathname

                );

            }

        }
    );

}


/* =========================================================
   PREMIUM CURSOR
========================================================= */

if (
    cursorDot &&
    cursorOutline
) {

    if (!hasFinePointer) {

        cursorDot.style.display =
            "none";

        cursorOutline.style.display =
            "none";

    } else {

        let mouseX =
            window.innerWidth / 2;

        let mouseY =
            window.innerHeight / 2;

        let outlineX =
            mouseX;

        let outlineY =
            mouseY;

        let cursorFrame =
            null;


        const hideCursor = () => {

            cursorDot.classList.add(
                "cursor-hidden"
            );

            cursorOutline.classList.add(
                "cursor-hidden"
            );

            cursorOutline.classList.remove(
                "cursor-hover"
            );

        };


        const showCursor = () => {

            cursorDot.classList.remove(
                "cursor-hidden"
            );

            cursorOutline.classList.remove(
                "cursor-hidden"
            );

        };


        const animateCursor = () => {

            outlineX +=
                (
                    mouseX -
                    outlineX
                ) * 0.16;

            outlineY +=
                (
                    mouseY -
                    outlineY
                ) * 0.16;


            cursorOutline.style.left =
                `${outlineX}px`;

            cursorOutline.style.top =
                `${outlineY}px`;


            cursorFrame =
                requestAnimationFrame(
                    animateCursor
                );

        };


        document.addEventListener(

            "mousemove",

            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;


                showCursor();

            },

            {
                passive: true
            }

        );


        document.addEventListener(
            "mouseleave",
            hideCursor
        );


        document.addEventListener(
            "mouseenter",
            showCursor
        );


        window.addEventListener(
            "blur",
            hideCursor
        );


        document.addEventListener(
            "mouseout",
            (event) => {

                if (
                    !event.relatedTarget &&
                    !event.toElement
                ) {

                    hideCursor();

                }

            }
        );


        $$(
            [
                "a",
                "button",
                ".btn",
                "summary",
                ".project-browser",
                ".service-card",
                ".benefit",
                ".testimonial-card",
                ".project-tags span"
            ].join(",")
        ).forEach(
            (element) => {

                element.addEventListener(

                    "mouseenter",

                    () => {

                        cursorOutline.classList.add(
                            "cursor-hover"
                        );

                    }

                );


                element.addEventListener(

                    "mouseleave",

                    () => {

                        cursorOutline.classList.remove(
                            "cursor-hover"
                        );

                    }

                );

            }
        );


        animateCursor();


        window.addEventListener(
            "pagehide",
            () => {

                if (cursorFrame) {

                    cancelAnimationFrame(
                        cursorFrame
                    );

                }

            }
        );

    }

}


/* =========================================================
   HERO 3D PARALLAX
========================================================= */

if (
    heroBrowser &&
    hasFinePointer &&
    !prefersReducedMotion
) {

    let heroFrame = null;

    let heroPointerX = 0.5;
    let heroPointerY = 0.5;


    function updateHeroTilt() {

        const rotateY =
            (
                heroPointerX -
                0.5
            ) * 12;

        const rotateX =
            (
                0.5 -
                heroPointerY
            ) * 9;


        heroBrowser.style.setProperty(

            "--rx",

            `${rotateX.toFixed(2)}deg`

        );


        heroBrowser.style.setProperty(

            "--ry",

            `${rotateY.toFixed(2)}deg`

        );


        heroFrame = null;

    }


    heroBrowser.addEventListener(

        "mousemove",

        (event) => {

            const rect =
                heroBrowser
                    .getBoundingClientRect();


            heroPointerX =
                (
                    event.clientX -
                    rect.left
                ) /
                rect.width;


            heroPointerY =
                (
                    event.clientY -
                    rect.top
                ) /
                rect.height;


            if (!heroFrame) {

                heroFrame =
                    requestAnimationFrame(
                        updateHeroTilt
                    );

            }

        },

        {
            passive: true
        }

    );


    heroBrowser.addEventListener(
        "mouseleave",
        () => {

            heroBrowser.style.setProperty(
                "--rx",
                "2deg"
            );

            heroBrowser.style.setProperty(
                "--ry",
                "-6deg"
            );

        }
    );

}


/* =========================================================
   PROJECT MICRO INTERACTIONS
========================================================= */

const projectCards =
    $$(".project-card");


projectCards.forEach(
    (card) => {

        if (
            !hasFinePointer ||
            prefersReducedMotion
        ) {
            return;
        }


        const browser =
            $(".project-browser", card);


        if (!browser) return;


        card.addEventListener(
            "mouseenter",
            () => {

                card.classList.add(
                    "project-hovering"
                );

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.classList.remove(
                    "project-hovering"
                );

            }
        );

    }
);


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    $$(".faq-item");


faqItems.forEach(
    (item) => {

        item.addEventListener(
            "toggle",
            () => {

                if (!item.open) {
                    return;
                }


                faqItems.forEach(
                    (otherItem) => {

                        if (
                            otherItem !==
                            item
                        ) {

                            otherItem.open =
                                false;

                        }

                    }
                );

            }
        );

    }
);


/* =========================================================
   CONTACT FORM
========================================================= */

const EMAILJS_PUBLIC_KEY =
    "7zZR12WuQsRpBMO6A";

const EMAILJS_SERVICE_ID =
    "service_saku0l3";

const EMAILJS_TEMPLATE_ID =
    "template_gqeig79";

const WHATSAPP_NUMBER =
    "212718678125";


if (
    window.emailjs &&
    typeof window.emailjs.init ===
        "function"
) {

    window.emailjs.init({

        publicKey:
            EMAILJS_PUBLIC_KEY

    });

}


function buildWhatsAppURL({

    name,
    email,
    business,
    message

}) {

    const text = [

        "Hello HWD Studio,",

        "",

        `My name is: ${name}`,

        `My email is: ${email}`,

        `Business type: ${
            business ||
            "Not specified"
        }`,

        "",

        "Website details:",

        message

    ].join("\n");


    return (

        `https://wa.me/${WHATSAPP_NUMBER}` +

        `?text=${encodeURIComponent(text)}`

    );

}


function openWhatsApp(url) {

    const popup =
        window.open(

            url,

            "_blank",

            "noopener,noreferrer"

        );


    if (!popup) {

        window.location.href =
            url;

    }

}


if (contactForm) {

    contactForm.addEventListener(

        "submit",

        async (event) => {

            event.preventDefault();


            const name =
                $("#name")
                    ?.value
                    .trim() ||
                "";


            const email =
                $("#email")
                    ?.value
                    .trim() ||
                "";


            const selectedBusiness =
                $("#business")
                    ?.value
                    .trim() ||
                "";

            const customBusiness =
                $("#otherWebsite")
                    ?.value
                    .trim() ||
                "";

            const business =
                selectedBusiness === "Other"
                    ? customBusiness
                    : selectedBusiness;


            const message =
                $("#message")
                    ?.value
                    .trim() ||
                "";


            const submitButton =
                $(
                    'button[type="submit"]',
                    contactForm
                );


            if (
                !name ||
                !email ||
                !message
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please complete all required fields.";

                }

                return;

            }


            if (
                email.length > 180 ||
                name.length > 100 ||
                message.length > 5000
            ) {

                if (formStatus) {

                    formStatus.textContent =
                        "Please shorten your message and try again.";

                }

                return;

            }


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";

            }


            if (formStatus) {

                formStatus.textContent =
                    "Sending your message...";

            }


            const whatsappURL =
                buildWhatsAppURL({

                    name,
                    email,
                    business,
                    message

                });


            let emailSent = false;


            try {

                if (
                    !window.emailjs ||
                    typeof window.emailjs.send !==
                        "function"
                ) {

                    throw new Error(
                        "EmailJS is unavailable."
                    );

                }


                await window.emailjs.send(

                    EMAILJS_SERVICE_ID,

                    EMAILJS_TEMPLATE_ID,

                    {

                        name,

                        email,

                        business_type:
                            business ||
                            "Not specified",

                        message,

                        time:
                            new Date()
                                .toLocaleString()

                    }

                );


                emailSent = true;


                if (formStatus) {

                    formStatus.textContent =
                        "Message sent successfully. Opening WhatsApp...";

                }


                contactForm.reset();


            } catch (error) {

                console.error(

                    "Contact form error:",

                    error

                );


                if (formStatus) {

                    formStatus.textContent =
                        "Opening WhatsApp so you can send the message directly.";

                }

            } finally {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Message";

                }

            }


            openWhatsApp(
                whatsappURL
            );


            if (
                emailSent &&
                formStatus
            ) {

                setTimeout(
                    () => {

                        formStatus.textContent =
                            "Message sent successfully.";

                    },
                    1800
                );

            }

        }

    );

}


/* =========================================================
   ESC KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key ===
            "Escape"
        ) {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   INITIAL STATE
========================================================= */

document.documentElement
    .classList
    .add("js-ready");


requestAnimationFrame(
    () => {

        updateScrollUI();

    }
);


/* =========================================================
   CURSOR — HIDE OUTSIDE WEBSITE AREA
========================================================= */

if (cursorDot && cursorOutline) {

    function hideCustomCursor() {
        cursorDot.style.opacity = "0";
        cursorOutline.style.opacity = "0";
    }

    function showCustomCursor() {
        cursorDot.style.opacity = "1";
        cursorOutline.style.opacity = "1";
    }

    /* Mouse dakhel page */
    document.documentElement.addEventListener("mouseenter", () => {
        showCustomCursor();
    });

    /* Mouse khrej mn page l Chrome / tabs / barra */
    document.documentElement.addEventListener("mouseleave", () => {
        hideCustomCursor();
    });

    /* Ila browser فقد focus */
    window.addEventListener("blur", () => {
        hideCustomCursor();
    });

    /* Mlli يرجع focus ma nbanohach
       7ta mouse يتحرك داخل site */
    window.addEventListener("focus", () => {
        hideCustomCursor();
    });

    document.addEventListener("mousemove", (event) => {

        const insideViewport =
            event.clientX >= 0 &&
            event.clientX <= window.innerWidth &&
            event.clientY >= 0 &&
            event.clientY <= window.innerHeight;

        if (insideViewport) {
            showCustomCursor();
        }

    });

}

/* =========================================================
   CONTACT — OTHER WEBSITE TYPE
========================================================= */

const websiteTypeSelect =
    document.getElementById("business");

const otherWebsiteField =
    document.getElementById("otherWebsiteField");

const otherWebsiteInput =
    document.getElementById("otherWebsite");


if (
    websiteTypeSelect &&
    otherWebsiteField &&
    otherWebsiteInput
) {

    websiteTypeSelect.addEventListener(
        "change",
        () => {

            const isOther =
                websiteTypeSelect.value === "Other";


            otherWebsiteField.classList.toggle(
                "show",
                isOther
            );


            otherWebsiteInput.required =
                isOther;


            if (isOther) {

                setTimeout(
                    () => {
                        otherWebsiteInput.focus();
                    },
                    200
                );

            } else {

                otherWebsiteInput.value = "";

            }

        }
    );

}

