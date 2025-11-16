// Enable smooth scrolling for the whole page
document.documentElement.style.scrollBehavior = "smooth";

// Highlight the active navbar link
const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// Select all about-page boxes for animation
const aboutBoxes = document.querySelectorAll(".about-box");

// Fade-in animation while scrolling
window.addEventListener("scroll", () => {
    aboutBoxes.forEach(box => {
        let position = box.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            box.style.opacity = "1";
            box.style.transform = "translateY(0)";
        }
    });
});
