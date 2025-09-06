/**
 * =============================================================================
 * MOU PAGE JAVASCRIPT - International Relations Office
 * =============================================================================
 * 
 * JavaScript implementation of the MOU page featuring:
 * - Interactive accordion functionality 
 * - URL hash-based navigation for direct country access
 * - Responsive design optimizations
 * - Keyboard accessibility support
 * 
 * @author Kunal Sharma
 * @version 1.0.0
 * =============================================================================
 */

/**
 * =============================================================================
 * MOU PAGE FUNCTIONALITY
 * =============================================================================
 */

/**
 * State management
 */
let activeAccordion = null;

/**
 * Handle accordion toggle
 * @param {string} countryName - Name of the country to toggle
 */
function handleAccordionToggle(countryName) {
    const wasActive = activeAccordion === countryName;
    
    // Close all accordions first
    const allItems = document.querySelectorAll('.mou-accordion-item');
    allItems.forEach(item => {
        item.classList.remove('active');
        const button = item.querySelector('.mou-accordion-button');
        const content = item.querySelector('.mou-accordion-content');
        const chevron = item.querySelector('.accordion-chevron');
        
        button.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = '0';
        content.style.opacity = '0';
        chevron.style.transform = 'rotate(0deg)';
    });

    // If it wasn't active, open the clicked one
    if (!wasActive) {
        activeAccordion = countryName;
        const targetItem = document.querySelector(`[data-country="${countryName}"]`);
        if (targetItem) {
            targetItem.classList.add('active');
            const button = targetItem.querySelector('.mou-accordion-button');
            const content = targetItem.querySelector('.mou-accordion-content');
            const chevron = targetItem.querySelector('.accordion-chevron');
            
            button.setAttribute('aria-expanded', 'true');
            content.style.maxHeight = content.scrollHeight + 'px';
            content.style.opacity = '1';
            chevron.style.transform = 'rotate(180deg)';
        }
    } else {
        activeAccordion = null;
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} event - Keyboard event
 * @param {string} countryName - Name of the country
 */
function handleKeyDown(event, countryName) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleAccordionToggle(countryName);
    }
}

/**
 * Handle URL hash navigation
 */
function handleHashNavigation() {
    if (window.location.hash) {
        const country = decodeURIComponent(window.location.hash.substring(1)).toLowerCase();
        const allItems = document.querySelectorAll('.mou-accordion-item');
        
        for (const item of allItems) {
            const countryData = item.getAttribute('data-country');
            if (countryData && countryData.toLowerCase() === country) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    handleAccordionToggle(countryData);
                    item.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
                break;
            }
        }
    }
}

/**
 * Initialize MOU page
 */
function initializeMOUPage() {
    // Add event listeners to all accordion buttons
    const accordionButtons = document.querySelectorAll('.mou-accordion-button');
    accordionButtons.forEach(button => {
        const countryName = button.getAttribute('data-country');
        
        button.addEventListener('click', () => {
            handleAccordionToggle(countryName);
        });

        button.addEventListener('keydown', (event) => {
            handleKeyDown(event, countryName);
        });
    });

    // Handle hash navigation
    handleHashNavigation();
    
    // Listen for hash changes
    window.addEventListener('hashchange', handleHashNavigation);
}

/**
 * =============================================================================
 * INITIALIZATION
 * =============================================================================
 */

document.addEventListener('DOMContentLoaded', initializeMOUPage);
