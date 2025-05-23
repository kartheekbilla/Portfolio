// Theme Switcher with Animation
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#checkbox');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    // Set the toggle state based on the current theme
    if (themeToggle) {
        themeToggle.checked = savedTheme === 'light';
        
        // Add event listener to toggle theme
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                changeTheme('light');
            } else {
                changeTheme('dark');
            }
        });
    }
    
    // Function to change theme with animation
    function changeTheme(theme) {
        // Create overlay for transition effect
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = theme === 'light' ? '#f7f7ff' : '#0f0f1a';
        overlay.style.zIndex = '9999';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = 'opacity 0.5s ease';
        
        document.body.appendChild(overlay);
        
        // Fade in overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Change theme after overlay is visible
        setTimeout(() => {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            
            // Fade out overlay
            overlay.style.opacity = '0';
            
            // Remove overlay after transition
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 500);
        }, 500);
    }
    
    // Add theme toggle animation
    const themeSwitch = document.querySelector('.theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('mouseenter', () => {
            themeSwitch.style.transform = 'scale(1.1)';
        });
        
        themeSwitch.addEventListener('mouseleave', () => {
            themeSwitch.style.transform = 'scale(1)';
        });
    }
});