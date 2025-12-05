// Smooth scrolling for all pages
document.documentElement.style.scrollBehavior = "smooth";

// Highlight the current navbar link
const navLinks = document.querySelectorAll("nav ul li a");
navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

// ---------------- DARK MODE TOGGLE ----------------

// Button that switches between modes
const darkBtn = document.getElementById("darkModeBtn");

// When the button is clicked → change theme
darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Change icon based on theme
    if (document.body.classList.contains("dark")) {
        darkBtn.textContent = "☀️";   // light mode icon
        localStorage.setItem("mode", "dark");
    } else {
        darkBtn.textContent = "🌙";   // dark mode icon
        localStorage.setItem("mode", "light");
    }
});

// Keep user’s theme saved after refresh
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    darkBtn.textContent = "☀️";
}
