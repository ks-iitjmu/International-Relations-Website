// Opportunities Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const toggleContainer = document.querySelector('.toggle-container');
    const outboundGrid = document.getElementById('outbound-opportunities');
    const inboundGrid = document.getElementById('inbound-opportunities');

    // Initialize
    toggleContainer.setAttribute('data-active', 'outbound');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // Remove active class from all buttons
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update toggle container attribute for slider animation
            toggleContainer.setAttribute('data-active', type);
            
            // Show/hide appropriate grid with smooth transition
            if (type === 'outbound') {
                // Fade out inbound, fade in outbound
                if (!inboundGrid.classList.contains('hidden')) {
                    inboundGrid.classList.add('fade-out');
                    setTimeout(() => {
                        inboundGrid.classList.add('hidden');
                        inboundGrid.classList.remove('fade-out');
                        outboundGrid.classList.remove('hidden');
                        setTimeout(() => {
                            outboundGrid.classList.add('fade-in');
                        }, 50);
                    }, 200);
                }
            } else {
                // Fade out outbound, fade in inbound
                if (!outboundGrid.classList.contains('hidden')) {
                    outboundGrid.classList.add('fade-out');
                    setTimeout(() => {
                        outboundGrid.classList.add('hidden');
                        outboundGrid.classList.remove('fade-out');
                        inboundGrid.classList.remove('hidden');
                        setTimeout(() => {
                            inboundGrid.classList.add('fade-in');
                        }, 50);
                    }, 200);
                }
            }
        });
    });
});
