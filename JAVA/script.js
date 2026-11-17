
// ==========================================
// KHOVA SCROLL REVEAL ANIMATION
// ==========================================

const revealElements = document.querySelectorAll(
    ".section, .service-card, .portfolio-card"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


// ==========================================
// KHOVA INTERACTIVE MOUSE GLOW
// ==========================================

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", function(event) {
    if (mouseGlow) {
        mouseGlow.style.left = event.clientX + "px";
        mouseGlow.style.top = event.clientY + "px";
    }
});


// ==========================================
// KHOVA 3D CARD INTERACTION
// ==========================================

const projectCards = document.querySelectorAll(".portfolio-card");

projectCards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 8;
        const rotateX = ((centerY - y) / centerY) * 8;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });

});


// ==========================================
// KHOVA MOBILE NAVIGATION
// ==========================================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );

        menuToggle.classList.toggle("open", isOpen);
    });

    navLinks.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
        });

    });

}


// ==========================================
// KHOVA CONTACT FORM FEEDBACK
// ==========================================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {

    contactForm.addEventListener("submit", () => {

        const submitButton = contactForm.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.textContent = "Sending Enquiry...";
            submitButton.disabled = true;
        }

        formStatus.textContent = "Your enquiry is being submitted.";
    });

}


// ==========================================
// KHOVA CLOSE MOBILE MENU
// ==========================================

document.addEventListener("click", (event) => {

    if (
        navLinks &&
        menuToggle &&
        navLinks.classList.contains("active") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
    ) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape" && navLinks && menuToggle) {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

});


// ==========================================
// KHOVA PROJECT DETAILS MODAL
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const projectModal = document.getElementById("projectModal");
    const closeModal = document.getElementById("closeModal");

    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalFeatures = document.getElementById("modalFeatures");
    const modalTechnology = document.getElementById("modalTechnology");
    const modalLink = document.getElementById("modalLink");

    const projectButtons = document.querySelectorAll(
        ".project-details-button"
    );

    if (
        !projectModal ||
        !closeModal ||
        !modalTitle ||
        !modalDescription ||
        !modalFeatures ||
        !modalTechnology ||
        !modalLink
    ) {
        console.error("Project modal elements not found.");
        return;
    }

    // ALL PROJECT INFORMATION

    const projects = {

        chefmenu: {
            title: "ChefMenuApp",
            description: "A mobile application designed to help restaurant chefs manage and organise their menus.",
            features: [
                "Add new dishes",
                "Edit existing menu items",
                "Delete menu items",
                "Organise restaurant menus"
            ],
            technology: "React Native | Expo | JavaScript",
            link: "https://chefmenuapp.expo.app",
            button: "Launch Application →"
        },

        greenleaf: {
            title: "GreenLeaf Garden Services",
            description: "A digital garden services solution designed to help customers request garden services and manage bookings.",
            features: [
                "Service booking interface",
                "Customer enquiry functionality",
                "Garden service management",
                "User-friendly interface design"
            ],
            technology: "Figma | UI/UX Design",
            link: "",
            button: "View Project →"
        },

        breeze: {
            title: "Breeze Café",
            description: "A modern café website concept designed to provide customers with business information, explore the menu and submit reservation enquiries.",
            features: [
                "Digital café menu",
                "Reservation enquiry form",
                "Contact information",
                "About the café section",
                "Responsive website design"
            ],
            technology: "HTML | CSS | JavaScript",
            link: "https://owethu-khumalo.github.io/owethu-khumalo/",
            button: "Visit Website →"
        },


nextlevel: {
    title: "Next Level Gaming",
    description: "A modern digital platform concept designed for an esports and gaming arena.",
    features: [
        "Gaming arena information",
        "Membership information",
        "Service information",
        "Gaming fee calculator",
        "Responsive website design"
    ],
    technology: "HTML | CSS | JavaScript",
    link: "https://owethu-khumalo.github.io/Work-Intergrated-Learning/",
    button: "Visit Website →"
}


    };


    // OPEN PROJECT POPUP

    projectButtons.forEach(button => {

        button.addEventListener("click", () => {

            const project = projects[button.dataset.project];

            if (!project) return;

            modalTitle.textContent = project.title;
            modalDescription.textContent = project.description;
            modalTechnology.textContent = project.technology;

            modalLink.href = project.link;
            modalLink.textContent = project.button;

            modalFeatures.innerHTML = "";

            project.features.forEach(feature => {

                const li = document.createElement("li");
                li.textContent = feature;

                modalFeatures.appendChild(li);

            });

            modalLink.style.display = project.link
                ? "inline-block"
                : "none";

            projectModal.classList.add("active");
            document.body.style.overflow = "hidden";

        });

    });


    // CLOSE PROJECT POPUP

    function closeProjectModal() {

        projectModal.classList.remove("active");
        document.body.style.overflow = "";

    }

    closeModal.addEventListener("click", closeProjectModal);

    projectModal.addEventListener("click", (event) => {

        if (event.target === projectModal) {
            closeProjectModal();
        }

    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeProjectModal();
        }

    });
    

});
