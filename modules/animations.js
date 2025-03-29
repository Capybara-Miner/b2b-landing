// modules/animations.js
// Handles all animation related functionality

/**
 * Initialize animations for the landing page
 */
export function initAnimations() {
    initHeroAnimation();
    initScrollAnimations();
    initResourceFlowAnimation();
}

/**
 * Setup animations for the hero section
 */
function initHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    const phoneMockup = document.querySelector('.phone-mockup');
    
    if (heroContent && phoneMockup) {
        // Add animation classes with slight delay
        setTimeout(() => {
            heroContent.classList.add('animated', 'fadeInLeft');
        }, 300);
        
        setTimeout(() => {
            phoneMockup.classList.add('animated', 'fadeInRight');
        }, 600);
    }
}

/**
 * Setup animations for elements as they scroll into view
 */
function initScrollAnimations() {
    // Select all elements to animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .mechanics-content, .pricing-card, .code-showcase, .ui-card');
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Add animation class when element is in viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('animated', 'fadeIn');
                // Unobserve after animation is triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });
    
    // Observe each element
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Animate the resource flow diagram
 */
function initResourceFlowAnimation() {
    const flowDiagram = document.querySelector('.resource-flow-diagram');
    
    if (flowDiagram) {
        // Create intersection observer for the diagram
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                // Get all flow items
                const flowItems = flowDiagram.querySelectorAll('.flow-item, .flow-arrow');
                
                // Animate each item in sequence
                flowItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated', 'fadeInUp');
                    }, index * 200); // Stagger the animations
                });
                
                // Start the continuous pulse animation after initial animation
                setTimeout(() => {
                    startPulseAnimation(flowItems);
                }, flowItems.length * 200 + 500);
                
                // Unobserve after animation is triggered
                observer.unobserve(flowDiagram);
            }
        }, {
            threshold: 0.7 // Trigger when 70% of the diagram is visible
        });
        
        // Observe the flow diagram
        observer.observe(flowDiagram);
    }
}

/**
 * Start a subtle pulse animation for flow diagram elements
 * @param {NodeList} elements - The elements to animate
 */
function startPulseAnimation(elements) {
    // Add pulse class to all elements
    elements.forEach(element => {
        if (element.classList.contains('flow-item')) {
            element.classList.add('pulse');
        }
    });
}

// Define CSS animations that will be added dynamically
const animationStyles = `
    /* Fade in animations */
    .animated {
        animation-duration: 0.8s;
        animation-fill-mode: both;
    }
    
    .fadeIn {
        animation-name: fadeIn;
    }
    
    .fadeInLeft {
        animation-name: fadeInLeft;
    }
    
    .fadeInRight {
        animation-name: fadeInRight;
    }
    
    .fadeInUp {
        animation-name: fadeInUp;
    }
    
    .pulse {
        animation: pulse 2s infinite;
    }
    
    /* Animation keyframes */
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
        100% {
            transform: scale(1);
        }
    }
`;

// Add animation styles to the document
function injectAnimationStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = animationStyles;
    document.head.appendChild(styleElement);
}

// Call this when the module is loaded
injectAnimationStyles();
