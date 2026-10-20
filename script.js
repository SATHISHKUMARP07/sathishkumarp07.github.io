document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.classList.add('js');

    const menuButton = document.querySelector('.nav-toggle');
    const navigation = document.querySelector('.nav-links');

    function closeMenu() {
        if (!menuButton || !navigation) return;
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        menuButton.innerHTML = '<i class="fas fa-bars" aria-hidden="true"></i>';
        navigation.classList.remove('active');
    }

    if (menuButton && navigation) {
        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            menuButton.setAttribute('aria-expanded', String(!isOpen));
            menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
            menuButton.innerHTML = `<i class="fas fa-${isOpen ? 'bars' : 'times'}" aria-hidden="true"></i>`;
            navigation.classList.toggle('active', !isOpen);
        });

        navigation.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape') closeMenu();
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealElements.forEach(element => revealObserver.observe(element));
    } else {
        revealElements.forEach(element => element.classList.add('is-visible'));
    }

    const scrollBar = document.getElementById('scrollBar');
    const updateScrollProgress = () => {
        if (!scrollBar) return;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
        scrollBar.style.width = `${Math.min(progress, 100)}%`;
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
});
