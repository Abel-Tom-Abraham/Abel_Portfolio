document.addEventListener('DOMContentLoaded', () => {
    // 1. Fallback: Force visibility if script/observer hang
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
    }, 2500);

    // 2. Typewriter Effect
    const roles = ["Technical Engineer.", "Linux Administrator.", "VoIP Specialist.", "Software Developer."];
    let roleIndex = 0; let charIndex = 0; let isDeleting = false;
    const typewriter = document.querySelector('.typewriter');

    function type() {
        if (!typewriter) return;
        const currentRole = roles[roleIndex];
        typewriter.textContent = isDeleting ? currentRole.substring(0, charIndex - 1) : currentRole.substring(0, charIndex + 1);
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
        
        let speed = isDeleting ? 60 : 150;
        if (!isDeleting && charIndex === currentRole.length) { speed = 2000; isDeleting = true; }
        else if (isDeleting && charIndex === 0) { isDeleting = false; roleIndex = (roleIndex + 1) % roles.length; speed = 500; }
        setTimeout(type, speed);
    }
    type();

    // 3. Scroll Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 4. Interaction Handlers
    document.querySelectorAll('.expandable-card').forEach(card => {
        card.addEventListener('click', () => card.classList.toggle('active'));
    });

    window.addEventListener('scroll', () => {
        const nav = document.getElementById('navbar');
        if (window.scrollY > 50) {
            nav.style.padding = '1rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.95)';
        } else {
            nav.style.padding = '1.5rem 0';
            nav.style.background = 'rgba(2, 6, 23, 0.8)';
        }
    });
});
