const header = document.querySelector(".header");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const menuIsOpen = navLinks.classList.contains("active");

    menuToggle.setAttribute("aria-expanded", menuIsOpen);

    menuToggle.textContent = menuIsOpen ? "✕" : "☰";

});


navItems.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    });

});


emailjs.init({
    publicKey: "7zZR12WuQsRpBMO6A"
});

contactForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const business = document.getElementById("business").value.trim();
    const message = document.getElementById("message").value.trim();

    const submitButton = contactForm.querySelector(
        'button[type="submit"]'
    );

    if (name === "" || email === "" || message === "") {

        formStatus.textContent =
            "Please complete all required fields.";

        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    formStatus.textContent = "Sending your message...";

    const whatsappNumber = "212718678125";

    const whatsappMessage =
        `Hello Hamza Web Design,%0A%0A` +
        `My name is: ${encodeURIComponent(name)}%0A` +
        `My email is: ${encodeURIComponent(email)}%0A` +
        `Business type: ${encodeURIComponent(
            business || "Not specified"
        )}%0A%0A` +
        `Website details:%0A${encodeURIComponent(message)}`;

    const whatsappURL =
        `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    try {
        
        await emailjs.send(
            "service_opxs26p",
            "template_vowpqhr",
            {
                name: name,
                email: email,
                business_type: business || "Not specified",
                message: message,
                time: new Date().toLocaleString()
            }
        );

        formStatus.textContent =
            "Email sent successfully. Opening WhatsApp...";

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

        contactForm.reset();

    } catch (error) {

        console.error("EmailJS error:", error);

        formStatus.textContent =
            "Email could not be sent. Opening WhatsApp instead...";

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );

    } finally {

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    }

});


window.addEventListener("resize", () => {

    if (window.innerWidth > 800) {

        navLinks.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.textContent = "☰";

    }

});

const revealElements = document.querySelectorAll(
    ".section, .project-card, .about-box"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    revealObserver.observe(element);
});

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;

    const progress = (scrollTop / pageHeight) * 100;

    progressBar.style.width = progress + "%";

});

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const darkModeActive =
        document.body.classList.contains("dark-mode");

    if (darkModeActive) {
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme", "light");
    }
});

const pageSections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let currentSection = "";

    pageSections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }
    });

    navigationLinks.forEach((link) => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
});


const backToTopButton = document.querySelector(".scroll-top");

if (backToTopButton) {

    function updateBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }
    }

    window.addEventListener("scroll", updateBackToTopButton);

    updateBackToTopButton();

    backToTopButton.addEventListener("click", (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}