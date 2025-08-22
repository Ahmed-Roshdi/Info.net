// Cybersecurity Light Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initCounterAnimations();
    initMobileMenu();
    initSmoothScrolling();
    initAutoRedirect();
    initScrollAnimations();
    initProgressBars();
});

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const text = counter.textContent;
        const target = parseInt(text.replace(/[^0-9]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                const value = Math.ceil(current);
                counter.textContent = value + (text.includes('+') ? '+' : '') + (text.includes('%') ? '%' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = text;
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                });
            }
        });
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Auto Redirect to Dark Mode
function initAutoRedirect() {
    // Check if user has already visited or cancelled redirect
    if (sessionStorage.getItem('cybersecurity_visited')) {
        const notice = document.querySelector('.auto-redirect-notice');
        if (notice) {
            notice.style.display = 'none';
        }
        return;
    }

    const countdownElement = document.getElementById('countdown');
    const cancelButton = document.getElementById('cancel-redirect');
    if (!countdownElement) return;

    let timeLeft = 7;
    let redirectTimer;
    
    const updateCountdown = () => {
        countdownElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            sessionStorage.setItem('cybersecurity_visited', 'true');
            window.location.href = 'cybersecurity-darkmode.html';
            return;
        }
        
        timeLeft--;
        redirectTimer = setTimeout(updateCountdown, 1000);
    };
    
    // Cancel redirect functionality
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            clearTimeout(redirectTimer);
            sessionStorage.setItem('cybersecurity_visited', 'true');
            const notice = document.querySelector('.auto-redirect-notice');
            if (notice) {
                notice.style.display = 'none';
            }
        });
    }
    
    // Also cancel on any other page interaction
    document.addEventListener('click', (e) => {
        if (e.target.id !== 'cancel-redirect' && !e.target.closest('.auto-redirect-notice')) {
            clearTimeout(redirectTimer);
            sessionStorage.setItem('cybersecurity_visited', 'true');
            const notice = document.querySelector('.auto-redirect-notice');
            if (notice) {
                notice.style.display = 'none';
            }
        }
    });
    
    updateCountdown();
}

// Scroll Animations
function initScrollAnimations() {
    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add animation styles to elements
    const animatedElements = document.querySelectorAll('.service-card, .stat-card, .cert-card, .contact-btn');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Progress Bars Animation
function initProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0%';
                
                setTimeout(() => {
                    progressBar.style.transition = 'width 2s ease-in-out';
                    progressBar.style.width = width;
                }, 200);
                
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Card Hover Effects
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .stat-card, .cert-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        });
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }
    });
}

// Typing Effect for Hero Section
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-effect');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #2563eb';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Remove cursor after typing is complete
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }, 50);
    });
}

// Dashboard Animation
function initDashboardAnimation() {
    const dashboard = document.querySelector('.security-dashboard');
    if (!dashboard) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate dashboard stats
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => {
                        stat.style.transform = 'scale(1.1)';
                        stat.style.color = '#2563eb';
                        setTimeout(() => {
                            stat.style.transform = 'scale(1)';
                        }, 300);
                    }, index * 200);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(dashboard);
}

// Button Click Effects
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn, .contact-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add ripple CSS
    const style = document.createElement('style');
    style.textContent = `
        .btn, .contact-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Form Validation (if contact form exists)
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#dc2626';
                    input.style.boxShadow = '0 0 0 3px rgba(220, 38, 38, 0.1)';
                } else {
                    input.style.borderColor = '#059669';
                    input.style.boxShadow = '0 0 0 3px rgba(5, 150, 105, 0.1)';
                }
            });
            
            if (isValid) {
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.textContent = 'Message sent successfully!';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #059669;
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    z-index: 1000;
                    animation: slideIn 0.3s ease;
                `;
                document.body.appendChild(successMessage);
                
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
                
                this.reset();
            }
        });
    });
}

// Initialize additional effects when page loads
window.addEventListener('load', () => {
    initCardHoverEffects();
    initNavbarScrollEffect();
    initTypingEffect();
    initDashboardAnimation();
    initButtonEffects();
    initFormValidation();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate animations if needed
    const animatedElements = document.querySelectorAll('.service-card, .stat-card, .cert-card');
    animatedElements.forEach(element => {
        element.style.transition = 'all 0.3s ease';
    });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + D for dark mode toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        window.location.href = 'cybersecurity-darkmode.html';
    }
    
    // Ctrl + Shift + L for language toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        window.location.href = 'cybersecurity-ar.html';
    }
    
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Accessibility improvements
function initAccessibility() {
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid #2563eb';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = 'none';
        });
    });
    
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
initAccessibility();

// Console message
console.log('%c🔒 Cybersecurity Portfolio - Light Mode', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%c✨ All systems operational', 'color: #059669;');
console.log('%c🚀 Performance optimized', 'color: #d97706;');

