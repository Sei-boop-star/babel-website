document.addEventListener('DOMContentLoaded', () => {
    const whiteFill = document.querySelector('.bg-white-fill');
    const bgPieta = document.querySelector('.bg-pieta');
    const bgBranches = document.querySelector('.bg-branches-new');

    // --- Background Scroll Effects ---
    const updateScrollEffects = () => {
        const scrolled = window.scrollY;
        const maxScroll = document.body.scrollHeight - window.innerHeight;
        // Safety check to avoid division by zero
        const scrollPercent = maxScroll > 0 ? Math.min(scrolled / maxScroll, 1) : 0;

        // Phase 1: Painting over (White Fill)
        // Starts at 0, fully white by 15% (Accelerated)
        let whiteOpacity = scrollPercent * 6.6;
        if (whiteOpacity > 1) whiteOpacity = 1;
        whiteFill.style.opacity = whiteOpacity;

        // Phase 2: Appearance of Pieta (Emerging)
        // Starts appearing after 15%, fully visible by 40%
        // Using "LATEST NEWS" section as a cue for visibility
        let pietaProgress = (scrollPercent - 0.15) * 4;
        if (pietaProgress < 0) pietaProgress = 0;
        if (pietaProgress > 1) pietaProgress = 1;
        bgPieta.style.opacity = pietaProgress;

        // Phase 3: Growing Branches (Top Left)
        // Starts appearing after 30%, fully grown by 65%
        let branchProgress = (scrollPercent - 0.3) * 2.8;
        if (branchProgress < 0) branchProgress = 0;
        if (branchProgress > 1) branchProgress = 1;

        bgBranches.style.opacity = branchProgress;

        // "Grow" behavior using clip-path
        const clipRadius = branchProgress * 150;
        bgBranches.style.clipPath = `circle(${clipRadius}% at 0 0)`;
    };

    window.addEventListener('scroll', updateScrollEffects);
    // Initial call
    updateScrollEffects();

    // --- Intersection Observer for Text Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Hamburger Menu Logic ---
    const hamburger = document.querySelector('.hamburger');
    const menuItems = document.querySelector('.menu-items');
    const navLinks = document.querySelectorAll('.menu-items a');

    if (hamburger) {
        const nav = document.querySelector('nav');
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            menuItems.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            menuItems.classList.remove('active');
            document.querySelector('nav').classList.remove('active');
        });
    });
});
