// modules/form.js
// Handles form validation and submission

/**
 * Initialize form handling functionality
 */
export function initFormHandling() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        // Add form validation and submission
        contactForm.addEventListener('submit', handleFormSubmit);
        
        // Add input validation as user types
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', () => {
                // Remove error state as user types
                if (input.classList.contains('error')) {
                    input.classList.remove('error');
                    const errorMessage = input.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        });
    }
}

/**
 * Handle form submission
 * @param {Event} e - Form submit event
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Validate all inputs before submission
    let isValid = true;
    const formInputs = form.querySelectorAll('input, textarea, select');
    
    formInputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Scroll to the first error
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('.submit-button');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // In a real implementation, you would send the form data to a server
    // For the demo, we'll simulate a form submission with a timeout
    setTimeout(() => {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.classList.add('success-message');
        successMessage.innerHTML = `
            <div class="success-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <h3>Thank you for your interest!</h3>
            <p>We've received your request and will be in touch shortly to schedule your demo.</p>
        `;
        
        // Replace form with success message
        form.innerHTML = '';
        form.appendChild(successMessage);
        
        // Reset button state (not necessary but for completeness)
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Log form data (for demo)
        console.log('Form submitted with data:', Object.fromEntries(formData));
    }, 1500);
}

/**
 * Validate an input field
 * @param {Event} e - Input blur event
 * @returns {boolean} - Whether the input is valid
 */
function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove existing error message
    const existingError = input.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validate based on input type and requirements
    let isValid = true;
    let errorMessage = '';
    
    if (input.hasAttribute('required') && value === '') {
        isValid = false;
        errorMessage = 'This field is required';
    } else if (input.type === 'email' && value !== '') {
        // Basic email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Display error message if invalid
    if (!isValid) {
        input.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.classList.add('error-message');
        errorElement.textContent = errorMessage;
        
        input.parentElement.appendChild(errorElement);
    } else {
        input.classList.remove('error');
    }
    
    return isValid;
}

// Add CSS styles for form validation
const formStyles = `
    .error {
        border-color: #ef4444 !important;
    }
    
    .error-message {
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.5rem;
    }
    
    .success-message {
        text-align: center;
        padding: 2rem;
    }
    
    .success-icon {
        font-size: 3rem;
        color: #10b981;
        margin-bottom: 1rem;
    }
    
    .success-message h3 {
        margin-bottom: 1rem;
        color: #10b981;
    }
`;

// Add form styles to the document
function injectFormStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = formStyles;
    document.head.appendChild(styleElement);
}

// Call this when the module is loaded
injectFormStyles();
