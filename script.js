// Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active nav link based on scroll position
            const sections = document.querySelectorAll('section');
            let current = '';

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Theme toggle functionality
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        themeToggle.addEventListener('click', () => {
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            body.setAttribute('data-theme', newTheme);
            themeToggle.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            
            // Save theme preference
            localStorage.setItem('theme', newTheme);
        });

        // Load saved theme
        const savedTheme = localStorage.getItem('theme') || 'dark';
        body.setAttribute('data-theme', savedTheme);
        themeToggle.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

        // Scroll reveal animation
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Gallery lightbox functionality
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxClose = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');

        // Gallery image data (using SVG data URLs)
        const galleryImages = {
            gallery1: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23222"/><circle cx="300" cy="240" r="120" fill="%23fff" opacity="0.9"/><path d="M200 360 Q300 400 400 360 L380 440 Q300 480 220 440 Z" fill="%23ff0033" opacity="0.8"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Professional Hair Styling</text></svg>',
            gallery2: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23333"/><circle cx="300" cy="300" r="160" fill="%23ffe0e0" opacity="0.9"/><circle cx="260" cy="260" r="10" fill="%23000"/><circle cx="340" cy="260" r="10" fill="%23000"/><path d="M280 320 Q300 340 320 320" stroke="%23000" stroke-width="4" fill="none"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Bridal Makeup Artistry</text></svg>',
            gallery3: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23111"/><rect x="200" y="200" width="200" height="30" rx="15" fill="%23ff0033"/><rect x="200" y="240" width="200" height="30" rx="15" fill="%23fff"/><rect x="200" y="280" width="200" height="30" rx="15" fill="%23ff0033"/><rect x="200" y="320" width="200" height="30" rx="15" fill="%23fff"/><rect x="200" y="360" width="200" height="30" rx="15" fill="%23ff0033"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Creative Nail Art</text></svg>',
            gallery4: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23444"/><circle cx="300" cy="300" r="200" fill="%23ffeeee" opacity="0.8"/><circle cx="300" cy="300" r="120" fill="%23fff" opacity="0.3"/><circle cx="300" cy="300" r="60" fill="%23ff0033" opacity="0.2"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Advanced Skincare</text></svg>',
            gallery5: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23222"/><circle cx="300" cy="200" r="100" fill="%23fff" opacity="0.9"/><path d="M240 300 Q300 240 360 300 Q340 360 300 400 Q260 360 240 300" fill="%23ff0033" opacity="0.7"/><circle cx="300" cy="440" r="40" fill="%23fff" opacity="0.8"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Bridal Services</text></svg>',
            gallery6: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23555"/><circle cx="300" cy="300" r="160" fill="%23e0ffe0" opacity="0.7"/><path d="M200 300 Q300 200 400 300 Q300 400 200 300" fill="%23fff" opacity="0.5"/><circle cx="300" cy="300" r="40" fill="%23ff0033" opacity="0.8"/><text x="300" y="550" text-anchor="middle" fill="%23fff" font-size="24" font-family="Poppins">Spa %26 Wellness</text></svg>'
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imageKey = item.getAttribute('data-image');
                lightboxImg.src = galleryImages[imageKey];
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // ESC key to close lightbox
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });

        // Contact form handling
        const contactForm = document.getElementById('contact-form');
        const submitBtn = contactForm.querySelector('.submit-btn');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Add loading state
            submitBtn.classList.add('loading');
            submitBtn.textContent = '';
            
            // Simulate form submission
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Reset form and button
            contactForm.reset();
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 3000);
        });

        // Service card hover effects
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Animate service icons on scroll
        const serviceCards = document.querySelectorAll('.service-card');
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        serviceCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            serviceObserver.observe(card);
        });

        // Add typing effect to hero tagline
        const tagline = document.querySelector('.tagline');
        const text = tagline.textContent;
        tagline.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };

        // Start typing animation after page load
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 1000);
        });

        // Add hover effect to gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'scale(1.05)';
            });
            
            item.addEventListener('mouseleave', () => {
                item.style.transform = 'scale(1)';
            });
        });

        // Performance optimization: Lazy load animations
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                } else {
                    entry.target.style.animationPlayState = 'paused';
                }
            });
        });

        // Initialize all animations as paused
        document.querySelectorAll('*').forEach(el => {
            if (getComputedStyle(el).animationName !== 'none') {
                el.style.animationPlayState = 'paused';
                animationObserver.observe(el);
            }
        });

        // Testimonials Carousel Auto Slide
        (function() {
            const slides = document.querySelectorAll('.testimonial-slide');
            let current = 0;
            function showSlide(idx) {
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                });
            }
            function nextSlide() {
                current = (current + 1) % slides.length;
                showSlide(current);
            }
            if (slides.length > 1) {
                setInterval(nextSlide, 3500);
            }
            showSlide(current);
        })();

        // Best Results Carousel Auto-Rotate
        (function() {
            const bestSlides = document.querySelectorAll('.best-slide');
            let bestIndex = 0;
            function showBestSlide(idx) {
                bestSlides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                });
            }
            setInterval(() => {
                bestIndex = (bestIndex + 1) % bestSlides.length;
                showBestSlide(bestIndex);
            }, 3500);
        })();
