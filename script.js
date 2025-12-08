document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const curtainLayer = document.getElementById('curtain-layer');
    const spotlightLayer = document.getElementById('spotlight-layer');

    // Animation sequence
    const animations = ['fade', 'curtain', 'spotlight'];
    let currentAnimIndex = 0;

    // Check for saved user preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark-mode') {
        body.classList.add('dark-mode');
    } else if (!currentTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        body.classList.add('dark-mode');
    }

    toggleButton.addEventListener('click', () => {
        const animType = animations[currentAnimIndex];
        
        // Determine target state (we are toggling, so if currently dark, target is light)
        const isGoingToDark = !body.classList.contains('dark-mode');
        
        if (animType === 'fade') {
            runFadeAnimation(isGoingToDark);
        } else if (animType === 'curtain') {
            runCurtainAnimation(isGoingToDark);
        } else if (animType === 'spotlight') {
            runSpotlightAnimation(isGoingToDark);
        }

        // Cycle to next animation for next click
        currentAnimIndex = (currentAnimIndex + 1) % animations.length;
    });

    function toggleTheme() {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark-mode');
        } else {
            localStorage.setItem('theme', 'light');
        }
    }

    // --- 1. Soft Fade ---
    function runFadeAnimation(toDark) {
        toggleTheme();
    }

    // --- 2. Curtain ---
    function runCurtainAnimation(toDark) {
        // Set color based on where we are going
        const targetColor = toDark ? '#111111' : '#ffffff';
        curtainLayer.style.backgroundColor = targetColor;
        
        // Drop curtain
        curtainLayer.style.height = '100%';

        setTimeout(() => {
            toggleTheme();
            
            // Lift curtain
            setTimeout(() => {
                curtainLayer.style.height = '0%';
            }, 100);
        }, 600); 
    }

    // --- 3. Spotlight ---
    function runSpotlightAnimation(toDark) {
        const rect = toggleButton.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        const targetColor = toDark ? '#111111' : '#ffffff';
        spotlightLayer.style.backgroundColor = targetColor;

        // Start at button
        spotlightLayer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        spotlightLayer.style.transition = 'clip-path 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)';
        
        // Force reflow
        spotlightLayer.offsetHeight; 

        // Expand
        spotlightLayer.style.clipPath = `circle(150vw at ${x}px ${y}px)`;

        setTimeout(() => {
            toggleTheme();
            
            // Reset layer (hide it) without animation
            spotlightLayer.style.transition = 'none';
            spotlightLayer.style.clipPath = `circle(0px at ${x}px ${y}px)`;
        }, 800);
    }
});
