// Dark Mode JavaScript for Index Page

document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
});

function initDarkMode() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Force dark theme on dedicated dark page
    setTheme('dark');
    
    // Theme toggle event listener - redirect to light mode page
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Redirect to light mode version
            window.location.href = 'index.html';
        });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(function(e) {
            if (!localStorage.getItem('theme')) {
                setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }
}

function setTheme(theme) {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Set theme attribute
    html.setAttribute('data-theme', theme);
    
    // Update theme toggle icon
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'Switch to light mode');
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'Switch to dark mode');
        }
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Trigger custom event for theme change
    const themeChangeEvent = new CustomEvent('themeChanged', {
        detail: { theme: theme }
    });
    document.dispatchEvent(themeChangeEvent);
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColor(theme);
    
    // Animate theme transition
    animateThemeTransition();
}

function updateMetaThemeColor(theme) {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    
    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.name = 'theme-color';
        document.head.appendChild(metaThemeColor);
    }
    
    const themeColors = {
        light: '#ffffff',
        dark: '#0f172a'
    };
    
    metaThemeColor.content = themeColors[theme];
}

function animateThemeTransition() {
    const body = document.body;
    
    // Add transition class
    body.classList.add('theme-transitioning');
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transitioning');
    }, 300);
}

// Enhanced theme toggle with smooth animations
function enhancedThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Toggle theme with delay for smooth animation
            setTimeout(() => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setTheme(newTheme);
            }, 100);
        });
    }
}

// Auto-detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Initialize theme based on time of day (optional feature)
function initTimeBasedTheme() {
    const hour = new Date().getHours();
    const isNightTime = hour < 6 || hour > 18;
    
    if (!localStorage.getItem('theme')) {
        const autoTheme = isNightTime ? 'dark' : 'light';
        setTheme(autoTheme);
    }
}

// Theme persistence across page navigation
function persistThemeAcrossPages() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
    }
}

// Enhanced accessibility for theme toggle
function enhanceThemeAccessibility() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Add keyboard support
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styles
        themeToggle.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        themeToggle.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    }
}

// Theme-aware image loading
function loadThemeAwareImages() {
    const images = document.querySelectorAll('img[data-light-src][data-dark-src]');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    
    images.forEach(img => {
        const lightSrc = img.getAttribute('data-light-src');
        const darkSrc = img.getAttribute('data-dark-src');
        
        if (currentTheme === 'dark' && darkSrc) {
            img.src = darkSrc;
        } else if (lightSrc) {
            img.src = lightSrc;
        }
    });
}

// Listen for theme changes and update images
document.addEventListener('themeChanged', function(e) {
    loadThemeAwareImages();
});

// Smooth color transitions for better UX
function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-transitioning * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        .theme-toggle {
            transition: all 0.2s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.05);
        }
        
        .theme-toggle:active {
            transform: scale(0.95);
        }
    `;
    document.head.appendChild(style);
}

// Initialize all dark mode features
function initAllDarkModeFeatures() {
    persistThemeAcrossPages();
    enhancedThemeToggle();
    enhanceThemeAccessibility();
    loadThemeAwareImages();
    addSmoothTransitions();
    
    // Optional: Initialize time-based theme
    // initTimeBasedTheme();
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initAllDarkModeFeatures();
});

// Export functions for use in other scripts
window.DarkModeUtils = {
    setTheme,
    detectSystemTheme,
    updateMetaThemeColor,
    loadThemeAwareImages
};

