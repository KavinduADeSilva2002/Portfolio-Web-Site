// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 80
});

// ─── Scroll Progress Bar ───────────────────────────────────────────────────────
const progressBar = document.getElementById('progressBar');
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
});

// ─── Active Navigation Highlight on Scroll ────────────────────────────────────
const sections = document.querySelectorAll('section, footer');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });

    // Header scroll effect
    const header = document.getElementById('main-header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ─── Mobile Menu Toggle ───────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
    const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;

    if (menuBtn && navbar && menuIcon) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuIcon.classList.toggle('fa-bars');
            menuIcon.classList.toggle('fa-times');
        });

        // Close menu when a nav link is clicked
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });

        // Close menu on scroll
        window.addEventListener('scroll', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    }
});

// ─── Scroll Animations for Section Items ─────────────────────────────────────
function checkScroll() {
    const animateSections = document.querySelectorAll('.skills, .experience, .education, .projects');

    animateSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.85;

        if (sectionTop < triggerBottom) {
            section.classList.add('animate');

            const items = section.querySelectorAll(
                '.skill-item, .education-item, .project-item, .experience-item'
            );
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 150 * index);
            });
        }
    });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);