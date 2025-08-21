// Cybersecurity Arabic Dark Mode JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animations and interactions
    initializeAnimations();
    initializeStats();
    initializeTypewriter();
    initializeToolInteractions();
    initializeGlitchEffects();
});

// Initialize counter animations for stats
function initializeStats() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 20);
    };

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Initialize typewriter effects
function initializeTypewriter() {
    const typewriterElements = document.querySelectorAll('.typewriter');
    
    const typeWriter = (element, text, speed = 50) => {
        element.innerHTML = '';
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    };

    // Intersection Observer for typewriter animation
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                typeWriter(entry.target, text, 30);
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    typewriterElements.forEach(element => {
        typewriterObserver.observe(element);
    });
}

// Initialize tool interactions
function initializeToolInteractions() {
    const toolItems = document.querySelectorAll('.tool-item');
    
    toolItems.forEach(tool => {
        tool.addEventListener('mouseenter', () => {
            tool.style.transform = 'translateY(-5px) scale(1.05)';
            tool.style.boxShadow = '0 10px 20px rgba(0, 255, 65, 0.3)';
        });
        
        tool.addEventListener('mouseleave', () => {
            tool.style.transform = 'translateY(0) scale(1)';
            tool.style.boxShadow = 'none';
        });
        
        tool.addEventListener('click', () => {
            const toolName = tool.dataset.tool;
            showToolInfo(toolName);
        });
    });
}

// Show tool information in Arabic
function showToolInfo(toolName) {
    const toolInfo = {
        'burp-suite': 'منصة متقدمة لاختبار أمان تطبيقات الويب',
        'metasploit': 'إطار عمل شامل لاختبار الاختراق',
        'wireshark': 'محلل بروتوكولات الشبكة وأداة التقاط الحزم',
        'nmap': 'أداة اكتشاف الشبكة والتدقيق الأمني',
        'splunk': 'منصة إدارة معلومات وأحداث الأمان',
        'kali-linux': 'توزيعة لينكس لاختبار الاختراق والتدقيق الأمني',
        'owasp-zap': 'ماسح أمان تطبيقات الويب',
        'volatility': 'إطار عمل متقدم لتحليل الذاكرة الجنائي'
    };
    
    const info = toolInfo[toolName] || 'معلومات أداة الأمان';
    
    // Create temporary notification
    const notification = document.createElement('div');
    notification.className = 'tool-notification';
    notification.textContent = info;
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: var(--secondary-bg);
        color: var(--primary-green);
        padding: 1rem 2rem;
        border: 1px solid var(--primary-green);
        border-radius: 8px;
        z-index: 10000;
        box-shadow: 0 0 20px rgba(0, 255, 65, 0.5);
        animation: fadeInOut 3s ease-in-out;
        text-align: center;
        font-family: 'Noto Sans Arabic', sans-serif;
        direction: rtl;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 3000);
}

// Initialize glitch effects
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance every interval
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = 'glitch 0.3s ease-in-out';
                }, 10);
            }
        }, 2000);
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
    
    // Add loading animation to page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in-out';
        document.body.style.opacity = '1';
    }, 100);
    
    // Initialize progress bar animations
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressLoad 2s ease-out';
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });
}

// Terminal command simulation in Arabic
function simulateTerminalCommand(command, output) {
    console.log(`$ ${command}`);
    console.log(output);
}

// Add some terminal-style console messages in Arabic
setTimeout(() => {
    simulateTerminalCommand('whoami', 'ahmed_roshdi');
    simulateTerminalCommand('pwd', '/home/ahmed/cybersecurity');
    simulateTerminalCommand('ls -la', 'total 42\ndrwxr-xr-x 5 ahmed ahmed 4096 Dec 15 10:30 .\ndrwxr-xr-x 3 ahmed ahmed 4096 Dec 15 10:29 ..\ndrwxr-xr-x 2 ahmed ahmed 4096 Dec 15 10:30 tools\ndrwxr-xr-x 2 ahmed ahmed 4096 Dec 15 10:30 reports\ndrwxr-xr-x 2 ahmed ahmed 4096 Dec 15 10:30 scripts');
}, 1000);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Shift + D for dark mode toggle (already in dark mode)
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        window.location.href = 'cybersecurity-ar.html';
    }
    
    // Ctrl + Shift + L for language toggle
    if (e.ctrlKey && e.shiftKey && e.key === 'L') {
        window.location.href = 'cybersecurity-darkmode.html';
    }
    
    // Escape key to go home
    if (e.key === 'Escape') {
        window.location.href = 'index-ar-darkmode.html';
    }
});

// Add matrix rain effect (optional, lightweight version)
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = '۰۱';
    const charSize = 14;
    const columns = canvas.width / charSize;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = charSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * charSize, drops[i] * charSize);
            
            if (drops[i] * charSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 100);
}

// Initialize matrix rain effect after a delay
setTimeout(createMatrixRain, 2000);

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
`;
document.head.appendChild(style);

// Console welcome message in Arabic
console.log('%c🛡️ محفظة الأمن السيبراني - الوضع المظلم', 'color: #00ff41; font-size: 16px; font-weight: bold;');
console.log('%cمرحباً بك في محفظة أحمد رشدي للأمن السيبراني', 'color: #cccccc; font-size: 14px;');
console.log('%cاضغط Ctrl+Shift+D للتبديل إلى الوضع الفاتح', 'color: #00cc33; font-size: 12px;');
console.log('%cاضغط Ctrl+Shift+L للتبديل إلى الإنجليزية', 'color: #00cc33; font-size: 12px;');

