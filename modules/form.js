// modules/form.js - Fixed version with corrected URL and proper data handling

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
    
    // Get form values directly from the DOM elements to ensure they're not null
    const companyName = document.getElementById('name').value || '';
    const email = document.getElementById('email').value || '';
    const message = document.getElementById('message').value || '';
    const packageType = document.getElementById('package').value || 'Enterprise Package ($14,999)';
    
    // Log the actual values being collected
    console.log("Submitting form with values:", { companyName, email, message, packageType });
    
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
    
    // CORRECTED Google Form submission URL - make sure you check this if it works
    const googleFormUrl = 'https://docs.google.com/forms/d/1ZGO8yMk6AcvqKZE-XjajCFcrPpMooFxQ8YN11RetDsY/formResponse';
    
    // Direct form submission method - more reliable than the iframe technique
    try {
        // Create a hidden form that posts directly to Google
        const hiddenForm = document.createElement('form');
        hiddenForm.method = 'POST';
        hiddenForm.action = googleFormUrl;
        hiddenForm.target = '_blank'; // This opens in a new tab, but we'll intercept and prevent it
        hiddenForm.style.display = 'none';
        
        // Add the form fields with the correct entry IDs
        const addField = (name, value) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            hiddenForm.appendChild(input);
        };
        
        // Add all our form fields
        addField('entry.1131091911', companyName);
        addField('entry.374807083', email);
        addField('entry.1722254725', message);
        addField('entry.1760730952', packageType);
        
        // Append the form to the body
        document.body.appendChild(hiddenForm);
        
        // Create a temporary iframe
        const iframe = document.createElement('iframe');
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        // Set the form to target our hidden iframe
        hiddenForm.target = 'hidden_iframe';
        
        // When the iframe loads, show success message
        iframe.addEventListener('load', () => {
            // Show success message
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
            
            // Reset button state
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            
            // Clean up
            setTimeout(() => {
                document.body.removeChild(hiddenForm);
                document.body.removeChild(iframe);
            }, 1000);
        });
        
        // Submit the form
        hiddenForm.submit();
        console.log("Form submitted to:", googleFormUrl);
        
    } catch (error) {
        console.error("Error submitting form:", error);
        
        // Reset button state on error
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
        
        // Show error message
        alert("There was an error submitting your request. Please try again or contact us directly.");
    }
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