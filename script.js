document.addEventListener('DOMContentLoaded', () => {
    // Utility function to check if device is mobile
    const isMobile = () => window.innerWidth <= 768;

    // Navigation Menu
    const setupNavigation = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navUl = document.querySelector('nav ul');
        const dropdown = document.querySelector('.dropdown');
        const dropdownMenu = dropdown?.querySelector('.dropdown-menu');

        if (!menuToggle || !navUl) return;

        // Toggle mobile menu
        menuToggle.addEventListener('click', () => {
            navUl.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (isMobile() && navUl.classList.contains('active') &&
                !e.target.closest('nav') && !e.target.closest('.menu-toggle')) {
                navUl.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });

        // Handle dropdown menu
        if (dropdown && dropdownMenu) {
            if (isMobile()) {
                const dropdownAnchor = dropdown.querySelector('a');
                dropdownAnchor?.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdownMenu.classList.toggle('active');
                    dropdown.classList.toggle('active');
                });

                // Close dropdown when clicking a link
                dropdownMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        dropdownMenu.classList.remove('active');
                        dropdown.classList.remove('active');
                        navUl.classList.remove('active');
                        menuToggle.querySelector('i').classList.add('fa-bars');
                        menuToggle.querySelector('i').classList.remove('fa-times');
                    });
                });
            } else {
                // Desktop hover functionality
                dropdown.addEventListener('mouseenter', () => {
                    dropdownMenu.classList.add('active');
                });
                dropdown.addEventListener('mouseleave', () => {
                    dropdownMenu.classList.remove('active');
                });
            }
        }

        // Close menu when resizing to desktop
        window.addEventListener('resize', () => {
            if (!isMobile() && navUl.classList.contains('active')) {
                navUl.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
                if (dropdownMenu) dropdownMenu.classList.remove('active');
                if (dropdown) dropdown.classList.remove('active');
            }
        });
    };

    // Sticky Header
    const setupStickyHeader = () => {
        const header = document.querySelector('header');
        if (!header) return;

        window.addEventListener('scroll', () => {
            header.classList.toggle('sticky', window.scrollY > 50);
        });
    };

    // Hero Slider
    const setupHeroSlider = () => {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.dot');
        const prevBtn = document.querySelector('.slider-prev');
        const nextBtn = document.querySelector('.slider-next');
        let currentSlide = 0;

        if (!slides.length || !dots.length) return;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                dots[i].classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                    dots[i].classList.add('active');
                    animateSlideContent(slide);
                }
            });
        };

        const animateSlideContent = (slide) => {
            const elements = slide.querySelectorAll('.scroll-animate');
            elements.forEach((el, i) => {
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    if (isMobile()) {
                        el.style.animation = 'mobileBounce 0.8s ease forwards';
                    }
                }, i * 300);
            });
        };

        nextBtn?.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn?.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);

        showSlide(currentSlide);
    };

    // Scroll Reveal Animations
    const setupScrollAnimations = () => {
        const revealElements = (selector, animationClass) => {
            const elements = document.querySelectorAll(selector);
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add(animationClass, 'visible');
                            if (isMobile()) {
                                entry.target.style.animation += ', mobilePulse 1s ease forwards';
                            }
                        }, index * 200);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });

            elements.forEach(el => observer.observe(el));
        };

        revealElements('.service-box', 'animate-flip');
        revealElements('.gallery-item', 'animate-flow');
        revealElements('.feature-card', 'animate-rotate');
        revealElements('.about-content p', 'animate-fade');

        // About Section Animation
        const aboutImage = document.querySelector('.about-image img');
        if (aboutImage) {
            const aboutObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        aboutImage.style.animation = isMobile()
                            ? 'slideInRight 1.2s ease forwards, mobileZoom 1s ease forwards'
                            : 'slideInRight 1.2s ease forwards';
                        aboutObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            aboutObserver.observe(aboutImage);
        }

        // Video Section Animation
        const videoWrapper = document.querySelector('.video-wrapper');
        const videoContent = document.querySelector('.video-content');
        if (videoWrapper) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        videoWrapper.style.animation = isMobile()
                            ? 'slideInLeft 1s ease forwards, mobileFade 1s ease forwards'
                            : 'slideInLeft 1s ease forwards';
                        if (videoContent) {
                            videoContent.style.animation = isMobile()
                                ? 'slideInRight 1s ease forwards, mobileFade 1s ease forwards'
                                : 'slideInRight 1s ease forwards';
                        }
                        videoObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.3 });
            videoObserver.observe(videoWrapper);
        }

        // Clients Section Animation
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        const clientsObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = isMobile()
                            ? `fadeInScale 1s ease forwards, mobileRotate 1s ease forwards`
                            : `fadeInScale 1s ease forwards`;
                    }, index * 200);
                    clientsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        testimonialCards.forEach(card => clientsObserver.observe(card));
    };

    // Testimonial Slider
    const setupTestimonialSlider = () => {
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const prevTestimonialBtn = document.querySelector('.prev-btn');
        const nextTestimonialBtn = document.querySelector('.next-btn');
        let currentTestimonial = 0;

        if (!testimonialSlides.length) return;

        const showTestimonial = (index) => {
            testimonialSlides.forEach(slide => {
                slide.style.transform = `translateX(-${index * 100}%)`;
            });
        };

        nextTestimonialBtn?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        });

        prevTestimonialBtn?.addEventListener('click', () => {
            currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        });

        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }, 4000);
    };

    // Progress Bar Animation
    const setupProgressBars = () => {
        const progressBars = document.querySelectorAll('.progress');
        const percentageBar = document.querySelector('.percentage-bar');
        if (!percentageBar || !progressBars.length) return;

        const progressObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const percent = bar.getAttribute('data-percent');
                        const fill = bar.querySelector('.progress-fill');
                        fill.style.width = `${percent}%`;
                        if (isMobile()) {
                            fill.style.animation += ', mobileGlow 1s ease forwards';
                        }
                    });
                    progressObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        progressObserver.observe(percentageBar);
    };

    // Google Maps Animation
    const setupMapAnimation = () => {
        const map = document.querySelector('.map');
        if (!map) return;

        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    map.classList.add('animate-map');
                    if (isMobile()) {
                        map.style.animation += ', mobileMapZoom 1s ease forwards';
                    }
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        mapObserver.observe(map);
    };

    // Contact Form Submission
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]').value.trim();
            const email = contactForm.querySelector('input[name="email"]').value.trim();
            const phone = contactForm.querySelector('input[name="phone"]').value.trim();
            const message = contactForm.querySelector('textarea[name="message"]').value.trim();

            // Validation
            if (!name || !email || !phone || !message) {
                alert('Please fill in all fields correctly.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            const phoneRegex = /^\d{10}$/;
            if (!phoneRegex.test(phone)) {
                alert('Please enter a valid 10-digit phone number.');
                return;
            }

            // WhatsApp submission
            const whatsappNumber = "+917032859701";
            const whatsappMessage = `New Contact Form Submission:%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            window.open(whatsappUrl, '_blank');
            alert('Thank you for your message! It has been sent to Urban Shield via WhatsApp.');
            contactForm.reset();
        });
    };

    // Loader and Mobile Stamp
    const setupLoader = () => {
        window.addEventListener('load', () => {
            const loader = document.querySelector('.loader');
            if (loader) loader.style.display = 'none';

            
        });
    };

    // Set Footer Year
    const setupFooterYear = () => {
        const currentYear = new Date().getFullYear();
        const yearElement = document.getElementById('current-year');
        if (yearElement) yearElement.textContent = currentYear;
    };

    // Add Animation Keyframes
    const addAnimationKeyframes = () => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            @keyframes mobileBounce {
                0% { transform: translateY(20px); opacity: 0; }
                60% { transform: translateY(-10px); opacity: 1; }
                100% { transform: translateY(0); opacity: 1; }
            }
            @keyframes mobilePulse {
                0% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 107, 0, 0.4); }
                50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(255, 107, 0, 0.6); }
                100% { transform: scale(1); box-shadow: 0 0 0 rgba(255, 107, 0, 0.4); }
            }
            @keyframes mobileZoom {
                0% { transform: scale(0.9); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes mobileFade {
                0% { opacity: 0; filter: blur(5px); }
                100% { opacity: 1; filter: blur(0); }
            }
            @keyframes mobileRotate {
                0% { transform: rotate(0deg); }
                50% { transform: rotate(5deg); }
                100% { transform: rotate(0deg); }
            }
            @keyframes mobileGlow {
                0% { box-shadow: 0 0 0 rgba(255, 107, 0, 0); }
                50% { box-shadow: 0 0 10px rgba(255, 107, 0, 0.8); }
                100% { box-shadow: 0 0 0 rgba(255, 107, 0, 0); }
            }
            @keyframes mobileMapZoom {
                0% { transform: scale(0.95); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes slideInRight {
                0% { transform: translateX(100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideInLeft {
                0% { transform: translateX(-100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }
            @keyframes fadeInScale {
                0% { transform: scale(0.8); opacity: 0; }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(styleSheet);
    };

    // Initialize all functionalities
    setupNavigation();
    setupStickyHeader();
    setupHeroSlider();
    setupScrollAnimations();
    setupTestimonialSlider();
    setupProgressBars();
    setupMapAnimation();
    setupContactForm();
    setupLoader();
    setupFooterYear();
    addAnimationKeyframes();
});
