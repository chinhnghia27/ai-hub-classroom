document.addEventListener('DOMContentLoaded', () => {
    console.log('AI Hub loaded');

    /* Mobile Interaction */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.desktop-nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('active');
            
            // Toggle Icon
            const icon = menuToggle.querySelector('i');
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark'); // Requires FontAwesome 6
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when clicking a link (UX best practice)
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* Scroll Animations */
    // We pause the CSS animation initially, then run it when the element is in view.
    const scrollObserverParams = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Resume animation
                entry.target.style.animationPlayState = 'running';
                // Optional: add a class for other transitions
                entry.target.classList.add('in-view');
                // Stop observing once animated
                scrollObserver.unobserve(entry.target);
            }
        });
    }, scrollObserverParams);

    const animatedSections = document.querySelectorAll('.section-fade-in');
    animatedSections.forEach(section => {
        // Pause animation immediately
        section.style.animationPlayState = 'paused';
        scrollObserver.observe(section);
    });

    /* Optional: Tool Card Hover Tilt Effect (3D) */
    // Adds a subtle premium feel on desktop
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});
