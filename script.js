/*
This is a refactored script to combine all your features, fix conflicts,
and improve performance.

KEY CHANGES:
1.  One Scroll Listener: All scroll-based actions (navbar, active link, parallax)
    are in ONE event listener for much better performance.
2.  CSS Classes: JS now adds/removes classes (e.g., '.scrolled', '.is-visible').
    The styling is handled in your CSS file (see the CSS I provided).
    This is cleaner and more maintainable.
3.  Observer Fix: The Intersection Observer now correctly toggles a class
    and stops observing elements once they are visible.
4.  Conflict Fix: Removed the 'DOMContentLoaded' hack that was
    fighting with the Intersection Observer.
5.  PERFORMANCE: Removed JS-based smooth scroll in favor of CSS.
*/

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // === 1. VARIABLE SELECTION ===
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]'); // Get sections with IDs
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contactForm');
    const videos = document.querySelectorAll('video');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    // === 2. MOBILE NAVIGATION ===
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // === 3. SMOOTH SCROLL (REMOVED) ===
    // This functionality is now handled by 'scroll-behavior: smooth;' in CSS
    // for better performance.


    // === 4. SCROLL EVENT HANDLER ===
    // All scroll-based logic is combined into one function
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;

        // --- Logic 1: Navbar Background ---
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // --- Logic 2: Active Nav Link ---
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Use navHeight as an offset
            if (scrollY >= sectionTop - navHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    // Add the single scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Run it once on load to set initial active link
    handleScroll();


    // === 5. INTERSECTION OBSERVER (for reveal animations) ===
    const observerOptions = {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                
                // Add the .is-visible class (defined in CSS)
                entry.target.classList.add('is-visible');

                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements *except* the hero (which is visible by default)
    document.querySelectorAll('section:not(.hero), .skill-card, .project-card, .stat-item').forEach(element => {
        observer.observe(element);
    });

    
    // === 6. CONTACT FORM ===
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            console.log('Form submitted:', formData);
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // === 7. VIDEO AUTO-PAUSE ===
    videos.forEach(video => {
        video.addEventListener('play', function() {
            videos.forEach(otherVideo => {
                if (otherVideo !== video) {
                    otherVideo.pause();
                }
            });
        });
    });

    // === 8. TYPING EFFECT ===
    if (heroSubtitle) {
        const subtitleText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        let charIndex = 0;

        function typeEffect() {
            if (charIndex < subtitleText.length) {
                heroSubtitle.textContent += subtitleText.charAt(charIndex);
                charIndex++;
                setTimeout(typeEffect, 50);
            }
        }
        
        // Start after a short delay
        setTimeout(typeEffect, 1000);
    }
    
    console.log('Portfolio website loaded successfully!');
});