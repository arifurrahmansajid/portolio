function initHeader() {
    // --- Resolve logo path from pages with different folder depth ---
    const logoImg = document.querySelector('.logo-img');
    if (logoImg) {
        const logoPaths = [
            'Assets/Rumon.webp',
            '../Assets/Rumon.webp',
            '../../Assets/Rumon.webp',
            '../../../Assets/Rumon.webp'
        ];
        let currentLogoPath = 0;

        logoImg.src = logoPaths[currentLogoPath];
        logoImg.onerror = () => {
            currentLogoPath += 1;
            if (currentLogoPath < logoPaths.length) {
                logoImg.src = logoPaths[currentLogoPath];
            }
        };
    }

    // --- Sticky Header on Scroll ---
    const header = document.getElementById('main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('is-sticky');
            } else {
                header.classList.remove('is-sticky');
            }
        });
    }

    // --- Mobile Menu Logic ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('is-active');
            mobileMenu.classList.toggle('is-active');
            document.body.style.overflow = mobileMenu.classList.contains('is-active') ? 'hidden' : 'auto';
        });

        mobileNavItems.forEach(item => {
            item.addEventListener('click', () => {
                mobileToggle.classList.remove('is-active');
                mobileMenu.classList.remove('is-active');
                document.body.style.overflow = 'auto';
            });
        });
    }
}

// Run init on DOMContentLoaded or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
} else {
    initHeader();
}
