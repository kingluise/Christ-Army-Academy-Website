document.addEventListener('DOMContentLoaded', () => {
    // --- Carousel functionality ---
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }

    // Ensure the carousel starts immediately if elements exist
    if (carouselSlides.length > 0) {
        showSlide(currentSlide); // Show the first slide on load
        setInterval(nextSlide, 4000); // Change slide every 4 seconds
    }

    // --- WhatsApp Chat Widget Animation ---
    const chatMessage = document.getElementById('chatMessage');
    if (chatMessage) {
        // Add the class to start the animation
        chatMessage.classList.add('blink-message');

        // Optional: Stop blinking after some time or on hover
        chatMessage.parentElement.addEventListener('mouseenter', () => {
            chatMessage.classList.remove('blink-message');
        });
        chatMessage.parentElement.addEventListener('mouseleave', () => {
            chatMessage.classList.add('blink-message');
        });
    }

    // --- Scroll-triggered Animations (Now re-animates on scroll) ---
    // Select all sections that are initially hidden and will animate
    const animatedSections = document.querySelectorAll('.anim-initial');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // Trigger when 20% of the element is visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const section = entry.target;
            const staggeredItems = section.querySelectorAll('[data-stagger-item="true"]');

            if (entry.isIntersecting) {
                // When element enters viewport
                section.classList.add('anim-active'); // Activate section animation

                // Apply staggered animation to child items
                staggeredItems.forEach((item, index) => {
                    // Increased delay for a more noticeable staggered effect
                    item.style.transitionDelay = `${index * 200}ms`; // Changed from 100ms to 200ms
                    item.classList.add('anim-active'); // Activate item animation
                });

            } else {
                // When element leaves viewport, remove active class to allow re-animation
                section.classList.remove('anim-active');
                // Reset transition delay for staggered items so they re-animate correctly next time
                staggeredItems.forEach(item => {
                    item.style.transitionDelay = '0s';
                    item.classList.remove('anim-active');
                });
            }
        });
    }, observerOptions);

    // Observe each animated section
    animatedSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Initial check for elements already in view on page load
    // This ensures elements visible on load also animate without needing a scroll
    animatedSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight && rect.bottom > 0);

        if (isVisible) {
            section.classList.add('anim-active');
            const staggeredItems = section.querySelectorAll('[data-stagger-item="true"]');
            staggeredItems.forEach((item, index) => {
                // Increased delay for a more noticeable staggered effect
                item.style.transitionDelay = `${index * 200}ms`; // Changed from 100ms to 200ms
                item.classList.add('anim-active');
            });
            // No unobserve here, as we want them to re-animate if scrolled out and back in
        }
    });

    // --- Mobile Navbar Toggle Functionality ---
    const mobileMenu = document.getElementById('mobile-menu');
    const mainNav = document.getElementById('main-nav');

    if (mobileMenu && mainNav) {
        mobileMenu.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            mobileMenu.classList.toggle('active'); // Toggle class for hamburger icon animation
        });

        // Close menu when a link is clicked (optional, but good UX for single-page sites)
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                mobileMenu.classList.remove('active');
            });
        });
    }
});
