/*
This is a refactored script to combine all your features, fix conflicts,
and improve performance.

KEY CHANGES:
1.  One Scroll Listener: All scroll-based actions (navbar, active link, back-to-top)
    are in ONE event listener for much better performance.
2.  CSS Classes: JS now adds/removes classes.
3.  Observer Fix: Intersection Observer uses .active class.
4.  NEW: Dark Mode Toggle added.
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
    const backToTop = document.getElementById('backToTop'); 
    const progressBar = document.getElementById('progressBar');
    const themeToggle = document.getElementById('theme-toggle'); // NEW: Theme toggle button

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

    // === 3. DARK MODE TOGGLE (NEW) ===
    if (themeToggle) {
        const body = document.body;
        const icon = themeToggle.querySelector('i');

        // Check local storage for saved theme
        if (localStorage.getItem('theme') === 'dark') {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                localStorage.setItem('theme', 'dark');
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
    }

    // === 4. SCROLL EVENT HANDLER ===
    // All scroll-based logic is combined into one function
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const navHeight = navbar.offsetHeight;

        // --- Logic 1: Active Nav Link ---
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

        // --- Logic 2: Back To Top Button ---
        // Show button if scrolled more than 500px
        if (backToTop) {
            if (scrollY > 500) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        }

        // --- Logic 3: Scroll Progress Bar ---
        // Calculate percentage of page scrolled
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    }
    // Add the single scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Run it once on load to set initial active link
    handleScroll();


    // === 5. INTERSECTION OBSERVER (for reveal animations) ===
    const revealElements = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15, // Trigger when 15% is visible
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the .active class to trigger the CSS animation
                entry.target.classList.add('active');
                // Stop observing the element once it's visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with the .reveal class
    revealElements.forEach(element => {
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
    
    console.log('Portfolio website loaded successfully! v2.0');
});