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

        // Ensure page starts at hero section on load
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
            // Set active nav link to home
            navLinks.forEach(link => link.classList.remove('active'));
            document.querySelector('a[href="#home"]').classList.add('active');
        });

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

        // Enhanced micro-interactions: Service card hover effects with glow and ripple
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.03)';
                card.style.boxShadow = '0 25px 50px rgba(230, 0, 126, 0.4), 0 0 40px rgba(230, 0, 126, 0.2)';
                card.style.borderColor = 'var(--accent-color)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '';
                card.style.borderColor = 'transparent';
            });

            // Add ripple effect on click
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.6)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = (e.offsetX - 10) + 'px';
                ripple.style.top = (e.offsetY - 10) + 'px';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                this.style.position = 'relative';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
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
                setInterval(nextSlide, 4000);
            }
            showSlide(current);
        })();

        // Best Results Carousels Auto-Rotate
        (function() {
            // First carousel
            const bestSlides1 = document.querySelectorAll('#best-carousel-1 .best-slide');
            const bestDots1 = document.querySelectorAll('#best-dots-1 .best-dot');
            let bestIndex1 = 0;

            function showBestSlide1(idx) {
                bestSlides1.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                });
                bestDots1.forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
            }

            // Second carousel
            const bestSlides2 = document.querySelectorAll('#best-carousel-2 .best-slide');
            const bestDots2 = document.querySelectorAll('#best-dots-2 .best-dot');
            let bestIndex2 = 0;

            function showBestSlide2(idx) {
                bestSlides2.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                });
                bestDots2.forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
            }

            // Auto-rotate first carousel
            setInterval(() => {
                bestIndex1 = (bestIndex1 + 1) % bestSlides1.length;
                showBestSlide1(bestIndex1);
            }, 3500);

            // Auto-rotate second carousel
            setInterval(() => {
                bestIndex2 = (bestIndex2 + 1) % bestSlides2.length;
                showBestSlide2(bestIndex2);
            }, 3500);

            // Dot navigation for first carousel
            bestDots1.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    bestIndex1 = index;
                    showBestSlide1(bestIndex1);
                });
            });

            // Dot navigation for second carousel
            bestDots2.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    bestIndex2 = index;
                    showBestSlide2(bestIndex2);
                });
            });
        })();

        // Hero Carousel Auto-Slide
        (function() {
            const heroSlides = document.querySelectorAll('.hero-slide');
            let heroIndex = 0;
            function showHeroSlide(idx) {
                heroSlides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === idx);
                });
            }
            showHeroSlide(heroIndex);
            setInterval(() => {
                heroIndex = (heroIndex + 1) % heroSlides.length;
                showHeroSlide(heroIndex);
            }, 2000);
        })();
        const heroslides=document.querySelectorAll('.hero-slide');
        console.log(heroslides);
