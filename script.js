document.addEventListener('DOMContentLoaded', () => {
  // Helper function to check if the device is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Loader Animation
  const loader = document.querySelector('.loader');
  window.addEventListener('load', () => {
      setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
          // Trigger US Safety Nets Stamp animation on mobile after loader
          if (isMobile()) {
              setTimeout(show => {
                  const stamp = document.querySelector('.us-stamp');
                  stamp.style.display = 'flex';
              }, 500);
          }
      }, 2000);
  });

  // Navbar Functionality
  const menuToggle = document.querySelector('.menu-toggle');
  const navUl = document.querySelector('nav ul');
  const dropdown = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => {
      navUl.classList.toggle('active');
      menuToggle.querySelector('i').classList.toggle('fa-bars');
      menuToggle.querySelector('i').classList.toggle('fa-times');
  });

  // Dropdown functionality for mobile (click) and desktop (hover)
  if (isMobile()) {
      dropdown.addEventListener('click', (e) => {
          e.preventDefault();
          dropdownMenu.classList.toggle('active');
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

  // Sticky Navbar on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.classList.add('sticky');
      } else {
          header.classList.remove('sticky');
      }
  });

  // Hero Slider Functionality
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  let currentSlide = 0;

  const showSlide = (index) => {
      slides.forEach((slide, i) => {
          slide.classList.remove('active');
          dots[i].classList.remove('active');
          if (i === index) {
              slide.classList.add('active');
              dots[i].classList.add('active');
              // Trigger scroll animations for the active slide
              animateSlideContent(slide);
          }
      });
  };

  // Animate slide content (h1, p, buttons)
  const animateSlideContent = (slide) => {
      const elements = slide.querySelectorAll('.scroll-animate');
      elements.forEach((el, i) => {
          setTimeout(() => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              // Add a bounce effect on mobile
              if (isMobile()) {
                  el.style.animation = 'mobileBounce 0.8s ease forwards';
              }
          }, i * 300);
      });
  };

  // Slider navigation
  nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  });

  prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
  });

  dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
          currentSlide = index;
          showSlide(currentSlide);
      });
  });

  // Auto-slide every 5 seconds
  setInterval(() => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
  }, 5000);

  // Initial slide animation
  showSlide(currentSlide);

  // Scroll Reveal for Sections
  const revealElements = (selector, animationClass) => {
      const elements = document.querySelectorAll(selector);
      const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                  setTimeout(() => {
                      entry.target.classList.add(animationClass);
                      entry.target.classList.add('visible');
                      // Add mobile-specific animation
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

  // Apply animations to different sections
  revealElements('.service-box', 'animate-flip');
  revealElements('.gallery-item', 'animate-flow');
  revealElements('.feature-card', 'animate-rotate');
  revealElements('.about-content p', 'animate-fade');

  // Unique animations for specific sections
  const applySectionAnimations = () => {
      // About Section
      const aboutImage = document.querySelector('.about-image img');
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
      if (aboutImage) aboutObserver.observe(aboutImage);

      // Video Section
      const videoWrapper = document.querySelector('.video-wrapper');
      const videoContent = document.querySelector('.video-content');
      const videoObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
              if (entry.isIntersecting) {
                  videoWrapper.style.animation = isMobile()
                      ? 'slideInLeft 1s ease forwards, mobileFade 1s ease forwards'
                      : 'slideInLeft 1s ease forwards';
                  videoContent.style.animation = isMobile()
                      ? 'slideInRight 1s ease forwards, mobileFade 1s ease forwards'
                      : 'slideInRight 1s ease forwards';
                  videoObserver.unobserve(entry.target);
              }
          });
      }, { threshold: 0.3 });
      if (videoWrapper) videoObserver.observe(videoWrapper);

      // Clients Section
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

  applySectionAnimations();

  // Testimonial Slider
  const testimonialSlides = document.querySelectorAll('.testimonial-slide');
  const prevTestimonialBtn = document.querySelector('.prev-btn');
  const nextTestimonialBtn = document.querySelector('.next-btn');
  let currentTestimonial = 0;

  const showTestimonial = (index) => {
      testimonialSlides.forEach((slide, i) => {
          slide.style.transform = `translateX(-${index * 100}%)`;
      });
  };

  nextTestimonialBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
  });

  prevTestimonialBtn.addEventListener('click', () => {
      currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
  });

  // Auto-slide testimonials every 4 seconds
  setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
      showTestimonial(currentTestimonial);
  }, 4000);

  // Percentage Bar Animation
  const progressBars = document.querySelectorAll('.progress');
  const progressObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              progressBars.forEach(bar => {
                  const percent = bar.getAttribute('data-percent');
                  const fill = bar.querySelector('.progress-fill');
                  fill.style.width = `${percent}%`;
                  // Add mobile animation
                  if (isMobile()) {
                      fill.style.animation += ', mobileGlow 1s ease forwards';
                  }
              });
              progressObserver.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  const percentageBar = document.querySelector('.percentage-bar');
  if (percentageBar) progressObserver.observe(percentageBar);

  // Footer Year
  const currentYear = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYear;

  // Google Maps Animation
  const map = document.querySelector('.map');
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

  if (map) mapObserver.observe(map);
});

// Keyframe definitions (for CSS animations used in JS)
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
`;
document.head.appendChild(styleSheet);



// Loader
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none';

  // Show US Safety Nets Stamp on mobile
  if (window.innerWidth <= 768) {
    const stamp = document.querySelector('.us-stamp');
    stamp.style.display = 'flex';
    setTimeout(() => {
      stamp.style.display = 'none';
    }, 3000);
  }
});

// Sticky Header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  header.classList.toggle('sticky', window.scrollY > 0);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
  navUl.classList.toggle('active');
  menuToggle.querySelector('i').classList.toggle('fa-bars');
  menuToggle.querySelector('i').classList.toggle('fa-times');
});

// Dropdown Menu for Mobile
const dropdowns = document.querySelectorAll('.dropdown');
dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const dropdownMenu = dropdown.querySelector('.dropdown-menu');
      dropdownMenu.classList.toggle('active');
    }
  });
});

// Scroll Animation for Hero Section
const scrollElements = document.querySelectorAll('.scroll-animate');
const elementInView = (el, offset = 0) => {
  const elementTop = el.getBoundingClientRect().top;
  return elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset;
};

const handleScrollAnimation = () => {
  scrollElements.forEach(el => {
    if (elementInView(el, 100)) {
      el.classList.add('scroll-animate');
    }
  });
};

window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);

// Set Current Year in Footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;



// contact page

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
  });
  
  // Mobile Menu Toggle
  const menuTogglee = document.querySelector('.menu-toggle');
  const navUll = document.querySelector('nav ul');
  
  menuTogglee.addEventListener('click', () => {
    navUll.classList.toggle('active');
    menuTogglee.querySelector('i').classList.toggle('fa-bars');
    menuTogglee.querySelector('i').classList.toggle('fa-times');
  });
  
  // Form Submission to WhatsApp
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        // Get form data
        const name = contactForm.querySelector('input[name="name"]').value.trim();
        const email = contactForm.querySelector('input[name="email"]').value.trim();
        const phone = contactForm.querySelector('input[name="phone"]').value.trim();
        const message = contactForm.querySelector('textarea[name="message"]').value.trim();
  
        // Basic validation
        if (!name || !email || !phone || !message) {
          alert('Please fill in all fields correctly.');
          return;
        }
  
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
  
        // Validate phone format (basic check for digits and length)
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
          alert('Please enter a valid 10-digit phone number.');
          return;
        }
  
        // Create WhatsApp message
        const whatsappNumber = "+917032859701"; // Replace with your WhatsApp number
        const whatsappMessage = `New Contact Form Submission:%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0AMessage: ${message}`;
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
        // Open WhatsApp with the pre-filled message
        window.open(whatsappUrl, '_blank');
  
        // Show success message
        alert('Thank you for your message! It has been sent to Urban Shield via WhatsApp.');
  
        // Reset form
        contactForm.reset();
      });
    }
  });
  
  // Set Current Year in Footer
  const currentYearr = new Date().getFullYear();
  document.getElementById('current-year').textContent = currentYearr;
