// Image validation fallback
document.addEventListener('DOMContentLoaded', () => {

    // Smooth Scroll for Internal Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .fade-up');
    animatedElements.forEach(el => fadeInObserver.observe(el));

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(5, 5, 7, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.4)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(5, 5, 7, 0.85)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '0 0'; // Reset if needed, handled by height
        }
    });

    // Basic Number Counter Animation (for stats)
    // Runs when stats container is visible
    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                document.querySelectorAll('.stat-item .count').forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // ms
                    const step = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + '+';
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + '+';
                        }
                    };
                    updateCounter();
                });
                statsObserver.unobserve(statsContainer);
            }
        });
        statsObserver.observe(statsContainer);
    }

    // Cursor glow effect tracking
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    }
});
