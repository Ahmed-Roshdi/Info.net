// Cybersecurity Light Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeAutoRedirect();
    initializeAnimations();
    initializeSkillBars();
    initializeCounters();
});

// Auto-redirect functionality
function initializeAutoRedirect() {
    // Check if user has already been redirected in this session
    if (sessionStorage.getItem('cybersecurity_redirect_shown')) {
        // Hide the notification if already shown
        const notification = document.getElementById('redirect-notification');
        if (notification) {
            notification.style.display = 'none';
        }
        return;
    }

    let countdown = 7;
    const countdownElement = document.getElementById('countdown');
    const stayBtn = document.getElementById('stay-btn');
    const notification = document.getElementById('redirect-notification');
    
    // Update countdown every second
    const countdownTimer = setInterval(() => {
        countdown--;
        if (countdownElement) {
            countdownElement.textContent = countdown;
        }
        
        if (countdown <= 0) {
            clearInterval(countdownTimer);
            // Set session flag to prevent future redirects
            sessionStorage.setItem('cybersecurity_redirect_shown', 'true');
            // Redirect to dark mode
            window.location.href = 'cybersecurity-darkmode.html';
        }
    }, 1000);
    
    // Handle stay button click
    if (stayBtn) {
        stayBtn.addEventListener('click', () => {
            clearInterval(countdownTimer);
            sessionStorage.setItem('cybersecurity_redirect_shown', 'true');
            if (notification) {
                notification.style.animation = 'slideOut 0.5s ease-in-out';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 500);
            }
        });
    }
}

// Initialize skill bar animations
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const animateSkillBar = (bar) => {
        const width = bar.dataset.width;
        bar.style.width = width;
    };
    
    // Intersection Observer for skill bars
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBar(entry.target);
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
}

// Initialize counter animations
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number, .result-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
        const suffix = element.textContent.replace(/[\d]/g, '');
        let current = 0;
        const increment = target / 100;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize general animations
function initializeAnimations() {
    // Smooth scrolling for internal links
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
    
    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.case-card, .tool-card, .cert-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + D for dark mode toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        sessionStorage.setItem('cybersecurity_redirect_shown', 'true');
        window.location.href = 'cybersecurity-darkmode.html';
    }
    
    // Ctrl + Shift + L for language toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        window.location.href = 'cybersecurity-ar.html';
    }
    
    // Escape key to go home
    if (e.key === 'Escape') {
        window.location.href = 'index.html';
    }
});

// Add scroll-based header background opacity
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Add CSS for slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// Console welcome message
console.log('%c🛡️ Cybersecurity Portfolio - Light Mode', 'color: #2563eb; font-size: 16px; font-weight: bold;');
console.log('%cWelcome to Ahmed Roshdi\'s Cybersecurity Portfolio', 'color: #6b7280; font-size: 14px;');
console.log('%cPress Ctrl+Shift+D to switch to Dark Mode', 'color: #059669; font-size: 12px;');
console.log('%cPress Ctrl+Shift+L to switch to Arabic', 'color: #059669; font-size: 12px;');

