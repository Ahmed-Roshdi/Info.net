// Cybersecurity Arabic Dark Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initGlitchEffects();
    initTypingAnimations();
    initCounterAnimations();
    initSkillBars();
    initThreatMap();
    initToolsArsenal();
    initMobileMenu();
    initScrollAnimations();
    initMatrixBackground();
});

// Glitch Effects
function initGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Random glitch intervals
        setInterval(() => {
            element.style.animation = 'none';
            setTimeout(() => {
                element.style.animation = 'glitch 0.5s infinite';
            }, 10);
            
            setTimeout(() => {
                element.style.animation = 'none';
            }, 500);
        }, Math.random() * 3000 + 2000);
    });
}

// Typing Animations
function initTypingAnimations() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach((element, index) => {
        const text = element.textContent;
        element.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        }, index * 1000);
    });
}

// Counter Animations
function initCounterAnimations() {
    const counters = document.querySelectorAll('.stat-value[data-target]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };

    // Intersection Observer for counter animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    animateCounter(entry.target);
                }, Math.random() * 500);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// Skill Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.progress');
                if (progressBar) {
                    const level = entry.target.getAttribute('data-level');
                    progressBar.style.width = '0%';
                    
                    setTimeout(() => {
                        progressBar.style.transition = 'width 2s ease-in-out';
                        progressBar.style.width = level + '%';
                    }, Math.random() * 500);
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Threat Map Animation
function initThreatMap() {
    const threatIndicators = document.querySelectorAll('.threat-indicator');
    
    threatIndicators.forEach((indicator, index) => {
        const pulseDot = indicator.querySelector('.pulse-dot');
        if (pulseDot) {
            pulseDot.style.animationDelay = (index * 0.5) + 's';
            
            // Random threat level changes
            setInterval(() => {
                const threats = ['danger', 'warning', 'safe'];
                const currentClass = Array.from(pulseDot.classList).find(cls => threats.includes(cls));
                const newThreat = threats[Math.floor(Math.random() * threats.length)];
                
                if (currentClass !== newThreat) {
                    pulseDot.classList.remove(currentClass);
                    pulseDot.classList.add(newThreat);
                }
            }, Math.random() * 10000 + 5000);
        }
    });
}

// Tools Arsenal Animation
function initToolsArsenal() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach((tool, index) => {
        tool.addEventListener('mouseenter', () => {
            tool.style.transform = 'translateY(-5px) scale(1.05)';
            tool.style.boxShadow = '0 0 20px rgba(0, 255, 65, 0.5)';
            
            // Add scanning effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #00ff41, transparent);
                animation: scan 1s ease-in-out;
            `;
            tool.appendChild(scanLine);
            
            setTimeout(() => {
                scanLine.remove();
            }, 1000);
        });
        
        tool.addEventListener('mouseleave', () => {
            tool.style.transform = 'translateY(0) scale(1)';
            tool.style.boxShadow = 'none';
        });
        
        // Staggered entrance animation
        tool.style.opacity = '0';
        tool.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            tool.style.transition = 'all 0.5s ease';
            tool.style.opacity = '1';
            tool.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Mobile Menu
function initMobileMenu() {
    // Mobile menu functionality would go here
    // Since this is a dashboard-style layout, mobile menu might be different
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.dashboard-widget, .case-study, .cert-item, .contact-btn');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Matrix Background Effect
function initMatrixBackground() {
    const matrixContainer = document.createElement('div');
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    document.body.appendChild(matrixContainer);

    const characters = '01أبتثجحخدذرزسشصضطظعغفقكلمنهوي';
    const columns = Math.floor(window.innerWidth / 20);
    
    for (let i = 0; i < columns; i++) {
        const column = document.createElement('div');
        column.style.cssText = `
            position: absolute;
            left: ${i * 20}px;
            top: 0;
            color: #00ff41;
            font-size: 14px;
            font-family: monospace;
            animation: matrixFall ${Math.random() * 3 + 2}s linear infinite;
            animation-delay: ${Math.random() * 2}s;
        `;
        
        let text = '';
        for (let j = 0; j < 20; j++) {
            text += characters.charAt(Math.floor(Math.random() * characters.length)) + '<br>';
        }
        column.innerHTML = text;
        
        matrixContainer.appendChild(column);
    }

    // Add matrix animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrixFall {
            0% { transform: translateY(-100vh); opacity: 0; }
            10% { opacity: 0.3; }
            90% { opacity: 0.3; }
            100% { transform: translateY(100vh); opacity: 0; }
        }
        
        @keyframes scan {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
    `;
    document.head.appendChild(style);
}

// Terminal Command Simulation
function initTerminalSimulation() {
    const terminals = document.querySelectorAll('.log-content');
    
    terminals.forEach(terminal => {
        // Simulate new log entries
        setInterval(() => {
            const logTypes = ['success', 'warning', 'info', 'error'];
            const messages = [
                'نظام الحماية نشط',
                'تم اكتشاف محاولة اختراق',
                'تم حظر عنوان IP مشبوه',
                'تحديث قاعدة بيانات التهديدات',
                'فحص الشبكة مكتمل'
            ];
            
            const logEntry = document.createElement('div');
            logEntry.className = 'log-entry';
            logEntry.innerHTML = `
                <span class="timestamp">[${new Date().toLocaleTimeString('ar-SA')}]</span>
                <span class="log-level ${logTypes[Math.floor(Math.random() * logTypes.length)]}">${logTypes[Math.floor(Math.random() * logTypes.length)]}</span>
                <span class="log-message">${messages[Math.floor(Math.random() * messages.length)]}</span>
            `;
            
            terminal.appendChild(logEntry);
            
            // Keep only last 10 entries
            const entries = terminal.querySelectorAll('.log-entry');
            if (entries.length > 10) {
                entries[0].remove();
            }
            
            // Auto scroll to bottom
            terminal.scrollTop = terminal.scrollHeight;
        }, Math.random() * 5000 + 3000);
    });
}

// Cyber Grid Background
function initCyberGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
            linear-gradient(rgba(0, 255, 65, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.1) 1px, transparent 1px);
        background-size: 50px 50px;
        pointer-events: none;
        z-index: -2;
        opacity: 0.3;
        animation: gridPulse 4s ease-in-out infinite;
    `;
    document.body.appendChild(gridContainer);

    const gridStyle = document.createElement('style');
    gridStyle.textContent = `
        @keyframes gridPulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.1; }
        }
    `;
    document.head.appendChild(gridStyle);
}

// Status Indicators
function initStatusIndicators() {
    const statusDots = document.querySelectorAll('.status-dot');
    
    statusDots.forEach(dot => {
        // Random status changes
        setInterval(() => {
            const statuses = ['online', 'warning', 'error'];
            const colors = ['#00ff41', '#ffff00', '#ff0040'];
            const randomStatus = Math.floor(Math.random() * statuses.length);
            
            dot.style.background = colors[randomStatus];
            dot.style.boxShadow = `0 0 10px ${colors[randomStatus]}`;
        }, Math.random() * 10000 + 5000);
    });
}

// Particle System
function initParticleSystem() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #00ff41;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 10 + 5}s linear infinite;
        `;
        particleContainer.appendChild(particle);
    }

    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% { transform: translateY(0px) translateX(0px); }
            25% { transform: translateY(-20px) translateX(10px); }
            50% { transform: translateY(-40px) translateX(-5px); }
            75% { transform: translateY(-20px) translateX(-10px); }
            100% { transform: translateY(0px) translateX(0px); }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Initialize additional effects when page loads
window.addEventListener('load', () => {
    initTerminalSimulation();
    initCyberGrid();
    initStatusIndicators();
    initParticleSystem();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Reinitialize matrix background on resize
    const matrixContainer = document.querySelector('div[style*="matrix"]');
    if (matrixContainer) {
        matrixContainer.remove();
        initMatrixBackground();
    }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl + Shift + L for language toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        window.location.href = 'cybersecurity-darkmode.html';
    }
    
    // Ctrl + Shift + T for theme toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        window.location.href = 'cybersecurity-ar.html';
    }
    
    // F11 for fullscreen
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// Custom cursor effect removed as requested

// Sound effects (optional - would require audio files)
function playSound(soundType) {
    // This would require audio files
    // const audio = new Audio(`sounds/${soundType}.mp3`);
    // audio.volume = 0.1;
    // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Console easter egg
console.log(`
    ╔══════════════════════════════════════╗
    ║       نظام الوصول الآمن مُفعّل        ║
    ║                                      ║
    ║  مرحباً بك في محطة أحمد رشدي         ║
    ║  للأمن السيبراني                     ║
    ║                                      ║
    ║  الحالة: آمن                         ║
    ║  مستوى التهديد: محايد                ║
    ║                                      ║
    ╚══════════════════════════════════════╝
`);

console.log('%c[أمان] جميع الأنظمة تعمل بشكل طبيعي', 'color: #00ff41; font-weight: bold;');
console.log('%c[معلومات] تم تفعيل مطر الماتريكس', 'color: #ffff00;');
console.log('%c[نجح] نظام كشف التهديدات نشط', 'color: #00ff41;');

