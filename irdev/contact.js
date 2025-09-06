// Contact Page JavaScript Functionality

// FAQ Toggle Functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const toggle = element.querySelector('.faq-toggle');
    
    // Close all other open FAQs
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            const itemAnswer = item.querySelector('.faq-answer');
            const itemQuestion = item.querySelector('.faq-question');
            const itemToggle = item.querySelector('.faq-toggle');
            
            itemAnswer.classList.remove('active');
            itemQuestion.classList.remove('active');
            itemToggle.textContent = '+';
        }
    });
    
    // Toggle current FAQ
    const isActive = answer.classList.contains('active');
    
    if (isActive) {
        answer.classList.remove('active');
        element.classList.remove('active');
        toggle.textContent = '+';
    } else {
        answer.classList.add('active');
        element.classList.add('active');
        toggle.textContent = '−';
    }
}

// Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#ef4444';
                    field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
                } else {
                    field.style.borderColor = '#e5e7eb';
                    field.style.boxShadow = 'none';
                }
            });
            
            // Email validation
            const emailField = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailField.value && !emailRegex.test(emailField.value)) {
                isValid = false;
                emailField.style.borderColor = '#ef4444';
                emailField.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
            }
            
            // Privacy policy checkbox validation
            const privacyCheckbox = document.getElementById('privacy');
            if (!privacyCheckbox.checked) {
                isValid = false;
                alert('Please accept the Privacy Policy and Terms of Service to continue.');
                return;
            }
            
            if (isValid) {
                // Show success message
                showSubmissionSuccess();
                
                // Here you would typically send the form data to your server
                // For now, we'll just reset the form after a delay
                setTimeout(() => {
                    contactForm.reset();
                }, 2000);
            } else {
                alert('Please fill in all required fields correctly.');
            }
        });
        
        // Clear error styling when user starts typing
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#e5e7eb';
                this.style.boxShadow = 'none';
            });
        });
    }
});

// Show submission success message
function showSubmissionSuccess() {
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent Successfully!';
    submitBtn.style.background = '#10b981';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '#0c458c';
        submitBtn.disabled = false;
    }, 3000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header-kunal').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Phone number formatting
document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length >= 10) {
                value = value.substring(0, 10);
                value = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
            } else if (value.length >= 6) {
                value = value.replace(/(\d{3})(\d{3})/, '($1) $2-');
            } else if (value.length >= 3) {
                value = value.replace(/(\d{3})/, '($1) ');
            }
            
            e.target.value = value;
        });
    }
});
