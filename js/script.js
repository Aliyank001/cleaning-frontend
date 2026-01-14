// =============================================
// CLEANING BUSINESS WEBSITE - PROFESSIONAL JAVASCRIPT
// =============================================

// Scroll Progress Bar
const createScrollProgress = () => {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.prepend(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
};

// Navbar Scroll Effect
const navbarScrollEffect = () => {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    const heroHeight = hero ? hero.offsetHeight : 600;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > heroHeight - 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
};

// Mobile Menu Toggle with Animation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // Animate hamburger to X
        mobileMenuBtn.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navMenu && !navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
    }
});

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.nav-link, .nav-btn');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
            if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
        }
    });
});

// Enhanced Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') {
            return;
        }
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            // Update URL without jumping
            history.pushState(null, null, href);
        }
    });
});

// Active Navigation Highlight on Scroll (Enhanced)
const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);

// Form Submission Handler with Enhanced Validation
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Show loading state
        const submitBtn = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>⏳ Processing...</span>';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Show success message with better formatting
            const serviceNames = {
                'residential': 'Residential Cleaning',
                'commercial': 'Commercial Cleaning',
                'deep': 'Deep Cleaning',
                'moveinout': 'Move In/Out Cleaning',
                'carpet': 'Carpet & Window Cleaning'
            };

            alert(`✅ Booking Request Confirmed!\n\n` +
                  `Thank you, ${data.name}!\n\n` +
                  `Service: ${serviceNames[data.service]}\n` +
                  `Date: ${data.date}\n` +
                  `Time: ${data.time}\n` +
                  `Address: ${data.address}\n\n` +
                  `We'll contact you at ${data.phone} within 2 hours to confirm your appointment!\n\n` +
                  `Check your email at ${data.email} for confirmation details.`);
            
            // Reset form and button
            bookingForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 1500);
    });

    // Real-time form validation
    const inputs = bookingForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = '#10b981';
            }
        });

        input.addEventListener('input', function() {
            if (this.value) {
                this.style.borderColor = '#10b981';
            }
        });
    });
}

// Set minimum date for booking (today)
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.setAttribute('min', tomorrow.toISOString().split('T')[0]);
}

// Enhanced Scroll to Top Button
const createScrollToTopBtn = () => {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        z-index: 999;
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    `;

    document.body.appendChild(scrollToTopBtn);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.05)';
        this.style.boxShadow = '0 12px 30px rgba(102, 126, 234, 0.6)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '0 8px 20px rgba(102, 126, 234, 0.4)';
    });
};

// Intersection Observer for Animations
const createAnimationObserver = () => {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.service-card, .review-card, .feature-item, .trust-item, .gallery-item, .area-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(el);
    });
};

// Phone number formatting (Enhanced)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) value = value.slice(0, 10);
        
        if (value.length >= 6) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        }
        
        e.target.value = value;
    });
}

// Click to Call Analytics (tracking)
const setupCallTracking = () => {
    const callLinks = document.querySelectorAll('a[href^="tel:"]');
    callLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('📞 Call button clicked:', link.href);
            // Here you can add analytics tracking
            // Example: gtag('event', 'click_to_call', { phone_number: link.href });
        });
    });
};

// WhatsApp link tracking
const setupWhatsAppTracking = () => {
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('💬 WhatsApp button clicked');
            // Add analytics tracking here
        });
    });
};

// Service card click tracking
const setupServiceTracking = () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const serviceName = card.querySelector('h3').textContent;
            console.log('🧹 Service card clicked:', serviceName);
            // Add analytics tracking here
        });
    });
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createScrollProgress();
    navbarScrollEffect();
    createScrollToTopBtn();
    createAnimationObserver();
    setupCallTracking();
    setupWhatsAppTracking();
    setupServiceTracking();
    
    console.log('✨ SparkleClean Professional Website Loaded Successfully!');
    console.log('🚀 All interactive features activated!');
});

// Preload important images
window.addEventListener('load', () => {
    console.log('✅ Website fully loaded and ready!');
});
