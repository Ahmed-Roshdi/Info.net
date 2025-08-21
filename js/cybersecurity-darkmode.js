// Cybersecurity Dark Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMatrixRain();
    initTypingAnimations();
    initCounterAnimations();
    initGlitchEffects();
    initMobileMenu();
    initSmoothScrolling();
    initFloatingElements();
    initTerminalAnimations();
});

// Matrix Rain Effect
function initMatrixRain() {
    const matrixContainer = document.getElementById('matrixRain');
    if (!matrixContainer) return;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.position = 'absolute';
        column.style.left = i * 20 + 'px';
        column.style.top = '0';
        column.style.color = '#00ff41';
        column.style.fontSize = '14px';
        column.style.fontFamily = 'monospace';
        column.style.opacity = '0.3';
        column.style.animation = `matrixFall ${Math.random() * 3 + 2}s linear infinite`;
        column.style.animationDelay = Math.random() * 2 + 's';
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Typing Animations
function initTypingAnimations() {
    const typingElements = document.querySelectorAll('.typing-text, .command.typing');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #ffff00';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' ? '2px solid #ffff00' : 'none';
                }, 500);
            }
        }, 100);
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (target > 99 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target > 99 ? '+' : '');
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
    });

    counters.forEach(counter => observer.observe(counter));
}

// Glitch Effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.5s infinite';
            }, 10);
        }, Math.random() * 5000 + 3000);
    });
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
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
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = (index * 0.5) + 's';
        element.style.animationDuration = (Math.random() * 3 + 4) + 's';
    });
}

// Terminal Animations
function initTerminalAnimations() {
    const terminalLines = document.querySelectorAll('.terminal-line');
    
    terminalLines.forEach((line, index) => {
        line.style.opacity = '0';
        line.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            line.style.transition = 'all 0.5s ease';
            line.style.opacity = '1';
            line.style.transform = 'translateX(0)';
        }, index * 500);
    });
}

// Threat Map Animation
function initThreatMap() {
    const threatPoints = document.querySelectorAll('.threat-point');
    
    threatPoints.forEach((point, index) => {
        const pulse = point.querySelector('.threat-pulse');
        if (pulse) {
            pulse.style.animationDelay = (index * 0.3) + 's';
        }
    });
}

// Skill Bar Animations
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.transition = 'width 2s ease-in-out';
                    entry.target.style.width = width;
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    });

    skillBars.forEach(bar => observer.observe(bar));
}

// Tool Cards Hover Effects
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 0 30px rgba(0, 255, 65, 0.5)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.3)';
        });
    });
}

// Operations Log Auto-scroll
function initOperationsLog() {
    const logContainer = document.getElementById('operationsLog');
    if (!logContainer) return;
    
    // Auto-scroll to bottom
    setInterval(() => {
        logContainer.scrollTop = logContainer.scrollHeight;
    }, 5000);
}

// Particle System for Background
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '-1';
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.backgroundColor = '#00ff41';
        particle.style.borderRadius = '50%';
        particle.style.opacity = Math.random() * 0.5;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `particleFloat ${Math.random() * 10 + 5}s linear infinite`;
        
        particleContainer.appendChild(particle);
    }

    // Add particle animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(-10px); }
            100% { transform: translateY(0px) translateX(0px); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize additional effects when page loads
window.addEventListener('load', () => {
    initThreatMap();
    initSkillBars();
    initToolCards();
    initOperationsLog();
    initParticleSystem();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize matrix rain on resize
    const matrixContainer = document.getElementById('matrixRain');
    if (matrixContainer) {
        matrixContainer.innerHTML = '';
        initMatrixRain();
    }
});

// Add custom cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.custom-cursor');
    if (!cursor) {
        const newCursor = document.createElement('div');
        newCursor.className = 'custom-cursor';
        newCursor.style.position = 'fixed';
        newCursor.style.width = '20px';
        newCursor.style.height = '20px';
        newCursor.style.border = '2px solid #00ff41';
        newCursor.style.borderRadius = '50%';
        newCursor.style.pointerEvents = 'none';
        newCursor.style.zIndex = '9999';
        newCursor.style.transition = 'all 0.1s ease';
        document.body.appendChild(newCursor);
    }
    
    const cursorElement = document.querySelector('.custom-cursor');
    if (cursorElement) {
        cursorElement.style.left = (e.clientX - 10) + 'px';
        cursorElement.style.top = (e.clientY - 10) + 'px';
    }
});

// Add sound effects (optional)
function playSound(soundType) {
    // This would require audio files
    // const audio = new Audio(`sounds/${soundType}.mp3`);
    // audio.volume = 0.1;
    // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + D for dark mode toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        window.location.href = 'cybersecurity.html';
    }
    
    // Ctrl + Shift + L for language toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        window.location.href = 'cybersecurity-ar-darkmode.html';
    }
});

// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║          SYSTEM ACCESS GRANTED       ║
    ║                                      ║
    ║  Welcome to Ahmed Roshdi's           ║
    ║  Cybersecurity Terminal              ║
    ║                                      ║
    ║  Status: SECURE                      ║
    ║  Threat Level: NEUTRALIZED           ║
    ║                                      ║
    ╚══════════════════════════════════════╝
`);

console.log('%c[SECURITY] All systems operational', 'color: #00ff41; font-weight: bold;');
console.log('%c[INFO] Matrix rain initialized', 'color: #ffff00;');
console.log('%c[SUCCESS] Threat detection active', 'color: #00ff41;');

