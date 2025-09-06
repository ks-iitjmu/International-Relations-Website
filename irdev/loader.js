/**
 * =============================================================================
 * LOADING SCRIPT - International Relations Office
 * =============================================================================
 * 
 * JavaScript to handle the loading animation with:
 * - Automatic hide after page load
 * - Failsafe timeout to prevent infinite loading
 * - Smooth fade-out transition
 * - Body scroll lock during loading
 * 
 * @author Kunal Sharma
 * @version 1.0.0
 * =============================================================================
 */

// Add loading class to body initially
document.body.classList.add('loading');

// Hide loader when page is fully loaded
window.addEventListener('load', function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    // Delay to show the loader for at least 2.5 seconds
    setTimeout(function () {
        if (loader) {
            loader.classList.add('hidden');
            body.classList.remove('loading');

            // Remove loader element after transition completes
            setTimeout(function () {
                if (loader.parentNode) {
                    loader.remove();
                }
            }, 500); // Match the CSS transition duration
        }
    }, 2500);
});

// Failsafe: Force hide loader after 8 seconds
setTimeout(function () {
    const loader = document.getElementById('loader');
    const body = document.body;

    if (loader && !loader.classList.contains('hidden')) {
        loader.classList.add('hidden');
        body.classList.remove('loading');

        setTimeout(function () {
            if (loader && loader.parentNode) {
                loader.remove();
            }
        }, 500);
    }
}, 8000);
