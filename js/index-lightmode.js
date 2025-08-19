// Light Mode JavaScript for Index Page

document.addEventListener('DOMContentLoaded', function() {
    initLightMode();
});

function initLightMode() {
    const themeToggle = document.getElementById('themeToggle');
    
    // Theme toggle event listener - redirect to dark mode page
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            // Redirect to dark mode version
            window.location.href = 'index-darkmode.html';
        });
    }
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
            
            // Redirect to dark mode with delay for smooth animation
            setTimeout(() => {
                window.location.href = 'index-darkmode.html';
            }, 200);
        });
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

// Smooth transitions for better UX
function addSmoothTransitions() {
    const style = document.createElement('style');
    style.textContent = `
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

// Initialize all light mode features
function initAllLightModeFeatures() {
    enhancedThemeToggle();
    enhanceThemeAccessibility();
    addSmoothTransitions();
}

// Call initialization
document.addEventListener('DOMContentLoaded', function() {
    initAllLightModeFeatures();
});

