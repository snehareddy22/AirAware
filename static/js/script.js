document.documentElement.style.scrollBehavior = "smooth";

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add("active");
    }
});

const aboutBoxes = document.querySelectorAll(".about-box");

const aboutBoxes = document.querySelectorAll(".about-box");

window.addEventListener("scroll", () => {
    aboutBoxes.forEach(box => {
        let position = box.getBoundingClientRect().top;
        let screenHeight = window.innerHeight;

        if (position < screenHeight - 100) {
            box.style.opacity = "1";      // fully visible
            box.style.transform = "translateY(0)";
        }
    });
});

