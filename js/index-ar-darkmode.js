// Dark Mode JavaScript for Arabic Index Page

document.addEventListener('DOMContentLoaded', function() {
    initDarkModeArabic();
});

function initDarkModeArabic() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const html = document.documentElement;
    
    // Force dark theme on dedicated Arabic dark page
    setThemeArabic('dark');
    
    // Theme toggle event listener - redirect to light mode page
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Redirect to Arabic light mode version
            window.location.href = 'index-ar.html';
        });
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addListener(function(e) {
            if (!localStorage.getItem('theme')) {
                setThemeArabic(e.matches ? 'dark' : 'light');
            }
        });
    }
}

function setThemeArabic(theme) {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;
    
    // Set theme attribute
    html.setAttribute('data-theme', theme);
    
    // Update theme toggle icon with Arabic labels
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeToggle.setAttribute('aria-label', 'التبديل إلى الوضع المضيء');
            themeToggle.title = 'التبديل إلى الوضع المضيء';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeToggle.setAttribute('aria-label', 'التبديل إلى الوضع المظلم');
            themeToggle.title = 'التبديل إلى الوضع المظلم';
        }
    }
    
    // Save theme preference
    localStorage.setItem('theme', theme);
    
    // Trigger custom event for theme change
    const themeChangeEvent = new CustomEvent('themeChanged', {
        detail: { theme: theme, language: 'ar' }
    });
    document.dispatchEvent(themeChangeEvent);
    
    // Update meta theme-color for mobile browsers
    updateMetaThemeColorArabic(theme);
    
    // Animate theme transition with RTL considerations
    animateThemeTransitionArabic();
    
    // Update RTL specific elements
    updateRTLElements(theme);
}

function updateMetaThemeColorArabic(theme) {
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

function animateThemeTransitionArabic() {
    const body = document.body;
    
    // Add transition class with RTL support
    body.classList.add('theme-transitioning-rtl');
    
    // Remove transition class after animation
    setTimeout(() => {
        body.classList.remove('theme-transitioning-rtl');
    }, 300);
}

function updateRTLElements(theme) {
    // Update RTL specific elements based on theme
    const rtlElements = document.querySelectorAll('[dir="rtl"]');
    
    rtlElements.forEach(element => {
        if (theme === 'dark') {
            element.classList.add('dark-rtl');
        } else {
            element.classList.remove('dark-rtl');
        }
    });
    
    // Update Arabic font rendering for better readability in dark mode
    updateArabicFontRendering(theme);
}

function updateArabicFontRendering(theme) {
    const arabicTextElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
    
    arabicTextElements.forEach(element => {
        if (theme === 'dark') {
            // Enhance Arabic text rendering in dark mode
            element.style.textShadow = '0 0 1px rgba(255, 255, 255, 0.1)';
            element.style.fontSmooth = 'always';
            element.style.webkitFontSmoothing = 'antialiased';
        } else {
            // Reset text rendering for light mode
            element.style.textShadow = '';
            element.style.fontSmooth = '';
            element.style.webkitFontSmoothing = '';
        }
    });
}

// Enhanced theme toggle with Arabic-specific animations
function enhancedThemeToggleArabic() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation with RTL consideration
            this.style.transform = 'scale(0.95) rotateY(180deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotateY(0deg)';
            }, 150);
            
            // Toggle theme with delay for smooth animation
            setTimeout(() => {
                const currentTheme = document.documentElement.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                setThemeArabic(newTheme);
            }, 100);
        });
    }
}

// Auto-detect system theme preference with Arabic locale
function detectSystemThemeArabic() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Initialize theme based on Arabic prayer times (optional feature)
function initPrayerTimeBasedTheme() {
    const hour = new Date().getHours();
    // Maghrib to Fajr (approximate times)
    const isNightTime = hour < 5 || hour > 18;
    
    if (!localStorage.getItem('theme')) {
        const autoTheme = isNightTime ? 'dark' : 'light';
        setThemeArabic(autoTheme);
    }
}

// Theme persistence across Arabic pages
function persistThemeAcrossArabicPages() {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        // Ensure RTL direction is maintained
        document.documentElement.setAttribute('dir', 'rtl');
    }
}

// Enhanced accessibility for Arabic theme toggle
function enhanceThemeAccessibilityArabic() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        // Add keyboard support with Arabic labels
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styles for RTL
        themeToggle.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
            this.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
        });
        
        themeToggle.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.boxShadow = 'none';
        });
    }
}

// Theme-aware image loading for Arabic content
function loadThemeAwareImagesArabic() {
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
        
        // Add RTL specific image handling
        if (document.documentElement.getAttribute('dir') === 'rtl') {
            img.style.transform = 'scaleX(-1)';
        }
    });
}

// Listen for theme changes and update Arabic-specific elements
document.addEventListener('themeChanged', function(e) {
    if (e.detail.language === 'ar') {
        loadThemeAwareImagesArabic();
        updateArabicFontRendering(e.detail.theme);
    }
});

// Smooth color transitions for Arabic content
function addSmoothTransitionsArabic() {
    const style = document.createElement('style');
    style.textContent = `
        .theme-transitioning-rtl * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease !important;
        }
        
        [dir="rtl"] .theme-toggle {
            transition: all 0.2s ease;
        }
        
        [dir="rtl"] .theme-toggle:hover {
            transform: scale(1.05) rotateY(5deg);
        }
        
        [dir="rtl"] .theme-toggle:active {
            transform: scale(0.95) rotateY(-5deg);
        }
        
        /* Arabic text optimization for dark mode */
        [data-theme="dark"][dir="rtl"] h1,
        [data-theme="dark"][dir="rtl"] h2,
        [data-theme="dark"][dir="rtl"] h3 {
            font-weight: 600;
            letter-spacing: -0.025em;
        }
        
        [data-theme="dark"][dir="rtl"] p {
            line-height: 1.8;
            font-weight: 400;
        }
        
        /* Enhanced contrast for Arabic text in dark mode */
        [data-theme="dark"][dir="rtl"] .hero-description,
        [data-theme="dark"][dir="rtl"] .timeline-content p,
        [data-theme="dark"][dir="rtl"] .vision-card p {
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(style);
}

// Arabic-specific theme notifications
function showThemeChangeNotificationArabic(theme) {
    const notification = document.createElement('div');
    notification.className = 'theme-notification-ar';
    notification.textContent = theme === 'dark' ? 'تم التبديل إلى الوضع المظلم' : 'تم التبديل إلى الوضع المضيء';
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-secondary);
        color: var(--text-primary);
        padding: 12px 20px;
        border-radius: 8px;
        border: 1px solid var(--border-color);
        box-shadow: var(--shadow-medium);
        z-index: 10000;
        font-family: 'Cairo', sans-serif;
        font-size: 14px;
        opacity: 0;
        transform: translateX(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Initialize all Arabic dark mode features
function initAllDarkModeFeaturesArabic() {
    persistThemeAcrossArabicPages();
    enhancedThemeToggleArabic();
    enhanceThemeAccessibilityArabic();
    loadThemeAwareImagesArabic();
    addSmoothTransitionsArabic();
    
    // Listen for theme changes to show notifications
    document.addEventListener('themeChanged', function(e) {
        if (e.detail.language === 'ar') {
            showThemeChangeNotificationArabic(e.detail.theme);
        }
    });
    
    // Optional: Initialize prayer time-based theme
    // initPrayerTimeBasedTheme();
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initAllDarkModeFeaturesArabic();
});

// Export functions for use in other Arabic scripts
window.DarkModeUtilsArabic = {
    setThemeArabic,
    detectSystemThemeArabic,
    updateMetaThemeColorArabic,
    loadThemeAwareImagesArabic,
    updateArabicFontRendering
};

