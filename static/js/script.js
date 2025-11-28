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
// --------------------- DARK MODE -----------------------
const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // change icon
    if (document.body.classList.contains("dark")) {
        darkBtn.textContent = "☀️";
        localStorage.setItem("mode", "dark");
    } else {
        darkBtn.textContent = "🌙";
        localStorage.setItem("mode", "light");
    }
});

// keep mode after refresh
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    darkBtn.textContent = "☀️";
}
