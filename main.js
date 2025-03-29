// main.js - Entry point for our modular JS
import { initNavigation } from './modules/navigation.js';
import { initAnimations } from './modules/animations.js';
import { initFormHandling } from './modules/form.js';
import { initCodeHighlighting } from './modules/codeHighlighting.js';

// Initialize all modules when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initAnimations();
    initFormHandling();
    initCodeHighlighting();
    
    console.log('Capybara Kombat Landing Page Initialized');
});
