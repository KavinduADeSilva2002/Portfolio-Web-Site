document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('#navbar');

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuBtn.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuBtn.classList.remove('fa-times');
        });
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    });
});