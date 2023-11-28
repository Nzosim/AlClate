document.addEventListener('DOMContentLoaded', function() {

    const hamburgerMenu = document.getElementById("hamburger");
    const nav = document.getElementById('nav');

    hamburgerMenu.addEventListener("click", (e) => {
        e.stopPropagation();
        nav.classList.toggle("open");
    });

    document.addEventListener('click', function(e) {
        nav.classList.remove("open");
    });
});