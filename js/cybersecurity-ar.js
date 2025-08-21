// Cybersecurity Arabic Light Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Auto-redirect to dark mode after 7 seconds (only once per session)
    if (!sessionStorage.getItem('cybersecurity_ar_visited')) {
        let countdown = 7;
        const countdownElement = document.getElementById('countdown');
        
        const timer = setInterval(() => {
            countdown--;
            if (countdownElement) {
                countdownElement.textContent = countdown;
            }
            
            if (countdown <= 0) {
                clearInterval(timer);
                sessionStorage.setItem('cybersecurity_ar_visited', 'true');
                window.location.href = 'cybersecurity-ar-darkmode.html';
            }
        }, 1000);
        
        // Allow user to cancel redirect by interacting with the page
        document.addEventListener('click', () => {
            clearInterval(timer);
            sessionStorage.setItem('cybersecurity_ar_visited', 'true');
            if (countdownElement && countdownElement.parentElement) {
                countdownElement.parentElement.style.display = 'none';
            }
        });
    } else {
        // Hide countdown notice if user has already visited
        const notice = document.querySelector('.auto-redirect-notice');
        if (notice) {
            notice.style.display = 'none';
        }
    }
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
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
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 2px 0 rgb(0 0 0 / 0.05)';
        }
    });
    
    // Animate stats on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach(stat => {
                    const finalValue = stat.textContent;
                    const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                    
                    if (!isNaN(numericValue)) {
                        animateNumber(stat, 0, numericValue, finalValue);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Number animation function
    function animateNumber(element, start, end, originalText) {
        const duration = 2000;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = Math.floor(start + (end - start) * progress);
            
            if (originalText.includes('%')) {
                element.textContent = current + '%';
            } else if (originalText.includes('+')) {
                element.textContent = current + '+';
            } else {
                element.textContent = current;
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.textContent = originalText;
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('.btn, .contact-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
    
    // RTL-specific adjustments
    document.body.setAttribute('dir', 'rtl');
    
    // Adjust animations for RTL
    const style = document.createElement('style');
    style.textContent = `
        .btn, .contact-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
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
        
        /* RTL-specific animations */
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideInLeft {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .service-card {
            animation: slideInRight 0.6s ease-out;
        }
        
        .service-card:nth-child(even) {
            animation: slideInLeft 0.6s ease-out;
        }
        
        /* Mobile menu adjustments for RTL */
        @media (max-width: 768px) {
            .nav-menu.active {
                transform: translateX(0);
                right: 0;
                left: auto;
            }
            
            .nav-menu {
                transform: translateX(100%);
            }
        }
    `;
    document.head.appendChild(style);
});

// Arabic number formatting
function formatArabicNumbers(text) {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return text.replace(/[0-9]/g, function(match) {
        return arabicNumbers[parseInt(match)];
    });
}

// Optional: Convert numbers to Arabic numerals
function convertToArabicNumerals() {
    const numberElements = document.querySelectorAll('.stat-number, .countdown');
    numberElements.forEach(element => {
        if (element.textContent) {
            element.textContent = formatArabicNumbers(element.textContent);
        }
    });
}

// Uncomment the line below if you want to use Arabic numerals
// convertToArabicNumerals();

