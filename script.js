'use strict';

document.addEventListener('DOMContentLoaded', () => {
    initScrollProgress();
    initHeader();
    initNavigation();
    initMobileMenu();
    initTypedText();
    initScrollAnimations();
    initSkillBars();
    initSmoothScroll();
});

/* ── Scroll Progress ── */
function initScrollProgress() {
    const bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (window.scrollY / max * 100) + '%';
    }, { passive: true });
}

/* ── Header shadow on scroll ── */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });
}

/* ── Active nav link on scroll ── */
function initNavigation() {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    const setActive = () => {
        let current = '';
        sections.forEach(s => {
            if (window.scrollY >= s.offsetTop - 130) current = s.id;
        });
        links.forEach(l => {
            l.classList.remove('active');
            if (l.getAttribute('href') === '#' + current) l.classList.add('active');
        });
    };

    window.addEventListener('scroll', setActive, { passive: true });
    setActive();
}

/* ── Mobile hamburger menu ── */
function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const navbar = document.getElementById('navbar');
    if (!btn || !navbar) return;

    btn.addEventListener('click', () => {
        const open = navbar.classList.toggle('open');
        btn.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
    });

    navbar.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });

    document.addEventListener('click', e => {
        if (!navbar.contains(e.target) && !btn.contains(e.target) && navbar.classList.contains('open')) {
            navbar.classList.remove('open');
            btn.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* ── Typed text effect ── */
function initTypedText() {
    const el = document.getElementById('typedText');
    if (!el) return;

    const words = [
        'Full Stack Developer',
        'Vue.js Engineer',
        'Laravel Developer',
        'ML Enthusiast',
        'Python Programmer',
        'Problem Solver'
    ];

    let wi = 0, ci = 0, deleting = false, pausing = false;

    function tick() {
        if (pausing) return;
        const word = words[wi];
        if (!deleting) {
            el.textContent = word.slice(0, ++ci);
            if (ci === word.length) { pausing = true; setTimeout(() => { pausing = false; deleting = true; }, 2000); }
        } else {
            el.textContent = word.slice(0, --ci);
            if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
        }
        setTimeout(tick, pausing ? 0 : deleting ? 60 : 100);
    }
    setTimeout(tick, 1000);
}

/* ── IntersectionObserver: fade + bar animations ── */
function initScrollAnimations() {
    const targets = document.querySelectorAll(
        '.skill-cat-card, .proj-card, .edu-card, .exp-card'
    );

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.dataset.delay || 0);
                setTimeout(() => entry.target.classList.add('visible'), delay);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

    targets.forEach(el => obs.observe(el));
}

/* ── Skill bar fill on scroll ── */
function initSkillBars() {
    const bars = document.querySelectorAll('.bar-fill');

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 300);
                obs.unobserve(bar);
            }
        });
    }, { threshold: 0.4 });

    bars.forEach(b => { b.style.width = '0%'; obs.observe(b); });
}

/* ── Smooth anchor scroll ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
}