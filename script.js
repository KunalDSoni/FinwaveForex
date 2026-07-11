/* =============================================
   PROSPECT — JavaScript
   ============================================= */
document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.querySelector('.mobile-menu');
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
            const on = menu.classList.toggle('active');
            menuBtn.classList.toggle('active');
            document.body.style.overflow = on ? 'hidden' : '';
        });
    }

    // --- Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const h = this.getAttribute('href');
            if (h === '#' || h.length < 2) return;
            const t = document.querySelector(h);
            if (t) {
                e.preventDefault();
                const y = t.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: y, behavior: 'smooth' });
                if (menu && menu.classList.contains('active')) {
                    menu.classList.remove('active');
                    menuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });

    // --- Nav Scroll Shadow ---
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = window.pageYOffset > 50 ? '0 2px 18px rgba(0,0,0,.06)' : 'none';
    }, { passive: true });

    // --- Carousel Dots ---
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const cards = document.querySelectorAll('.testimonial-card');
    dots.forEach((d, i) => d.addEventListener('click', () => {
        dots.forEach(dd => dd.classList.remove('active'));
        d.classList.add('active');
        if (window.innerWidth <= 809 && cards[i]) {
            cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }));

    // --- Scroll Reveal ---
    const els = document.querySelectorAll(
        '.feature-card, .feature-img, .bento-quote, .bento-photo, .widget, ' +
        '.ai-card, .video-test-card, .testimonial-card, .pricing-card, ' +
        '.performance-content, .perf-img, .newsletter-content, .newsletter-image, ' +
        '.scale-phones, .section-header, .chat-preview-card, .scale-icon-item, .ai-feature-item'
    );
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sibs = entry.target.parentElement.children;
                const idx = Array.from(sibs).indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.08}s`;
                entry.target.classList.add('ani', 'vis');
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(el => { el.classList.add('ani'); obs.observe(el); });

    // --- Bar Fill Animation ---
    const bars = document.querySelectorAll('.bar-fill');
    const barObs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const w = e.target.style.width;
                e.target.style.width = '0%';
                requestAnimationFrame(() => requestAnimationFrame(() => e.target.style.width = w));
                barObs.unobserve(e.target);
            }
        });
    }, { threshold: 0.5 });
    bars.forEach(b => barObs.observe(b));

    // --- Hero 3D Parallax ---
    const heroImg = document.querySelector('.hero-image');
    const hero = document.querySelector('.hero');
    if (heroImg && hero && window.innerWidth > 1024) {
        hero.addEventListener('mousemove', e => {
            const r = hero.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width - 0.5;
            const y = (e.clientY - r.top) / r.height - 0.5;
            heroImg.style.transform = `perspective(1000px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`;
        });
        hero.addEventListener('mouseleave', () => {
            heroImg.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            heroImg.style.transition = 'transform .5s ease';
            setTimeout(() => heroImg.style.transition = '', 500);
        });
    }

    // --- Newsletter Form ---
    const form = document.querySelector('.newsletter-form');
    if (form) form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const inp = form.querySelector('input');
        if (inp.value) {
            btn.textContent = 'Subscribed!';
            btn.style.background = '#61ab77';
            inp.value = '';
            setTimeout(() => { btn.textContent = 'Subscribe'; btn.style.background = ''; }, 2500);
        }
    });

    // --- Touch Dropdowns ---
    document.querySelectorAll('.nav-dropdown').forEach(dd => {
        dd.addEventListener('touchstart', function () {
            document.querySelectorAll('.nav-dropdown').forEach(o => { if (o !== this) o.classList.remove('touch-active'); });
            this.classList.toggle('touch-active');
        }, { passive: true });
    });
    document.addEventListener('touchstart', e => {
        if (!e.target.closest('.nav-dropdown')) document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('touch-active'));
    }, { passive: true });

    // --- Escape Key ---
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && menu && menu.classList.contains('active')) {
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
