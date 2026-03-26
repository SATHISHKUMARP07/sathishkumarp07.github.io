document.addEventListener('DOMContentLoaded', () => {
    /*--------------------------------------------------------------
    # Custom Cursor
    --------------------------------------------------------------*/
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    // Only initialize custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Adding a small delay for the outline for a smooth trailing effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect for links and buttons
        const hoverElements = document.querySelectorAll('a, button, .project-card, .timeline-content, .skill-category');

        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.classList.add('cursor-hover');
                cursorDot.style.transform = "translate(-50%, -50%) scale(0.5)";
            });

            el.addEventListener('mouseleave', () => {
                cursorOutline.classList.remove('cursor-hover');
                cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
            });
        });
    }

    /*--------------------------------------------------------------
    # Navbar Scroll Effect
    --------------------------------------------------------------*/
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /*--------------------------------------------------------------
    # Mobile Menu Toggle
    --------------------------------------------------------------*/
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /*--------------------------------------------------------------
    # Smooth Scroll with Offset for Fixed Navbar
    --------------------------------------------------------------*/
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /*--------------------------------------------------------------
    # Scroll Reveal Animations via Intersection Observer
    --------------------------------------------------------------*/
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Optional: Stop observing once revealed to only animate once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'hidden' class
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    /*--------------------------------------------------------------
    # Typing Effect for Hero Section
    --------------------------------------------------------------*/
    const roles = [
        "Software Engineer",
        "ASP.NET Core Expert",
        "SQL Server Pro",
        "Angular Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;
    let deletingDelay = 50;
    let nextWordDelay = 2000;

    const typeWriterElement = document.getElementById('typewriter');

    function type() {
        if (!typeWriterElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            // Remove a character
            typeWriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Add a character
            typeWriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        // Dynamic typing speed
        let speed = isDeleting ? deletingDelay : typingDelay;

        // Randomize typing speed slightly for realism
        if (!isDeleting) {
            speed -= Math.random() * 30;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of word
            speed = nextWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word completely deleted, move to next word
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            // Brief pause before starting new word
            speed = 500;
        }

        setTimeout(type, speed);
    }

    // Start typing effect after a short delay
    setTimeout(type, 1000);

    /*--------------------------------------------------------------
    # Back to Top Button Visibility Toggle
    --------------------------------------------------------------*/
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
    }

    /*--------------------------------------------------------------
    # Magnetic/Glow Cards Effect & 3D Tilt
    --------------------------------------------------------------*/
    const cards = document.querySelectorAll('.project-card, .text-card, .skill-category, .contact-method-card, .edu-card');

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);

                // 3D Tilt calculations
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                if (card.classList.contains('project-card') || card.classList.contains('edu-card') || card.classList.contains('text-card')) {
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            });

            card.addEventListener('mouseleave', () => {
                if (card.classList.contains('project-card') || card.classList.contains('edu-card') || card.classList.contains('text-card')) {
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
                    card.style.transition = 'transform 0.5s ease';
                }
            });

            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('project-card') || card.classList.contains('edu-card') || card.classList.contains('text-card')) {
                    card.style.transition = 'none';
                }
            });
        });
    }

    /*--------------------------------------------------------------
    # Scroll Progress Bar
    --------------------------------------------------------------*/
    const scrollBar = document.getElementById('scrollBar');
    if (scrollBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = (scrollTop / scrollHeight) * 100;
            scrollBar.style.width = scrollPercentage + '%';
        });
    }
});
