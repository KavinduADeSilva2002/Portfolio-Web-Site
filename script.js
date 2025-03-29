document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const navbar = document.querySelector('#navbar');
    const menuIcon = document.querySelector('.menu-btn i');

    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        // Toggle between menu and close icons
        menuIcon.classList.toggle('fa-bars');
        menuIcon.classList.toggle('fa-times');
    });

    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        });
    });

    // Close menu when scrolling
    window.addEventListener('scroll', () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    });
});

// Add scroll animations
function checkScroll() {
    const sections = document.querySelectorAll('.skills, .education, .projects');
    const items = document.querySelectorAll('.skill-item, .education-item, .project-item');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerBottom = window.innerHeight * 0.8;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('animate');
            
            // Animate items within the section
            const sectionItems = section.querySelectorAll('.skill-item, .education-item, .project-item');
            sectionItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animate');
                }, 200 * index); // Stagger the animations
            });
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', checkScroll);
// Run once on load
window.addEventListener('load', checkScroll);