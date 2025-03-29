// modules/codeHighlighting.js
// Handles code syntax highlighting and interaction

/**
 * Initialize code highlighting functionality
 */
export function initCodeHighlighting() {
    enhanceCodeBlocks();
}

/**
 * Enhance code blocks with additional features
 */
function enhanceCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.code-block');
    
    codeBlocks.forEach((block, index) => {
        // Add a unique ID to each code block
        const blockId = `code-block-${index}`;
        block.id = blockId;
        
        // Create toolbar for the code block
        createCodeBlockToolbar(block, blockId);
        
        // Add line numbers to the code block
        addLineNumbers(block);
    });
}

/**
 * Create a toolbar for a code block
 * @param {HTMLElement} block - The code block element
 * @param {string} blockId - The unique ID of the code block
 */
function createCodeBlockToolbar(block, blockId) {
    // Get language from the class
    const codeElement = block.querySelector('code');
    const classes = codeElement.className.split(' ');
    let language = 'code';
    
    for (const cls of classes) {
        if (cls.startsWith('language-')) {
            language = cls.replace('language-', '');
            break;
        }
    }
    
    // Create toolbar
    const toolbar = document.createElement('div');
    toolbar.className = 'code-toolbar';
    
    // Add language badge
    const langBadge = document.createElement('span');
    langBadge.className = 'language-badge';
    langBadge.textContent = language.toUpperCase();
    toolbar.appendChild(langBadge);
    
    // Add copy button
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = '<i class="fas fa-copy"></i> Copy';
    copyButton.addEventListener('click', () => copyCode(blockId));
    toolbar.appendChild(copyButton);
    
    // Insert toolbar before code block
    block.parentNode.insertBefore(toolbar, block);
}

/**
 * Add line numbers to a code block
 * @param {HTMLElement} block - The code block element
 */
function addLineNumbers(block) {
    const codeElement = block.querySelector('code');
    const codeLines = codeElement.innerHTML.split('\n');
    
    // Create line number element
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    
    // Add numbers
    for (let i = 1; i <= codeLines.length; i++) {
        const lineNumber = document.createElement('span');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
    }
    
    // Wrap code content with a container to allow horizontal scrolling
    const codeContent = document.createElement('div');
    codeContent.className = 'code-content';
    block.parentNode.insertBefore(codeContent, block);
    codeContent.appendChild(block);
    
    // Add line numbers before code block
    codeContent.insertBefore(lineNumbers, block);
}

/**
 * Copy code to clipboard
 * @param {string} blockId - The ID of the code block to copy
 */
function copyCode(blockId) {
    const codeBlock = document.getElementById(blockId);
    const codeElement = codeBlock.querySelector('code');
    
    // Get text content
    const codeText = codeElement.textContent;
    
    // Use Clipboard API to copy
    navigator.clipboard.writeText(codeText)
        .then(() => {
            // Show copied state
            const copyButton = codeBlock.parentNode.querySelector('.copy-button');
            const originalText = copyButton.innerHTML;
            
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
            copyButton.classList.add('copied');
            
            // Reset after a delay
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.classList.remove('copied');
            }, 2000);
        })
        .catch(err => {
            console.error('Failed to copy code: ', err);
            
            // Fallback copy method
            fallbackCopyCode(codeText);
        });
}

/**
 * Fallback method to copy code if Clipboard API fails
 * @param {string} text - The text to copy
 */
function fallbackCopyCode(text) {
    // Create a temporary textarea
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        // Attempt to copy
        document.execCommand('copy');
        console.log('Code copied using fallback method');
    } catch (err) {
        console.error('Fallback copy failed: ', err);
    }
    
    // Clean up
    document.body.removeChild(textarea);
}

// Add CSS styles for code highlighting enhancements
const codeStyles = `
    .code-content {
        position: relative;
        display: flex;
        margin: 1.5rem 0;
        border-radius: var(--border-radius);
        overflow: hidden;
    }
    
    .code-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: #2d2d2d;
        color: #abb2bf;
        border-top-left-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
    }
    
    .language-badge {
        font-size: 0.75rem;
        font-weight: 600;
        color: #abb2bf;
        padding: 0.25rem 0.5rem;
        background-color: #3d3d3d;
        border-radius: 4px;
    }
    
    .copy-button {
        background: none;
        border: none;
        color: #abb2bf;
        cursor: pointer;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        transition: var(--transition);
    }
    
    .copy-button:hover {
        background-color: #3d3d3d;
    }
    
    .copy-button.copied {
        color: #10b981;
    }
    
    .line-numbers {
        padding: 1rem 0.5rem;
        text-align: right;
        background-color: #1e1e1e;
        color: #6e7681;
        user-select: none;
        min-width: 2.5rem;
    }
    
    .line-numbers span {
        display: block;
        font-size: 0.875rem;
        line-height: 1.5;
    }
    
    .code-block {
        margin: 0;
        border-radius: 0;
        max-width: 100%;
        overflow-x: auto;
    }
    
    /* Adjust code block with PrismJS styles */
    pre[class*="language-"] {
        margin: 0;
        border-radius: 0;
    }
`;

// Add code styles to the document
function injectCodeStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = codeStyles;
    document.head.appendChild(styleElement);
}

// Call this when the module is loaded
injectCodeStyles();
