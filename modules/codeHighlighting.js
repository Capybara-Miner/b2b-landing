// modules/codeHighlighting.js - ENHANCED VERSION
// Handles code syntax highlighting and interaction with whitespace preservation fixes

/**
 * Initialize code highlighting functionality
 */
export function initCodeHighlighting() {
    enhanceCodeBlocks();
    
    // Force Prism to re-highlight after page load
    if (window.Prism) {
        setTimeout(() => {
            Prism.highlightAll();
        }, 500);
    }
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
        
        // Fix line returns and whitespace issues
        normalizeCodeIndentation(block);
        
        // Create a container for the entire code presentation
        wrapCodeBlock(block, blockId);
        
        // Ensure code block width is proper
        ensureCodeBlockWidth(block);
    });
}

/**
 * Normalize code indentation and fix whitespace issues
 * @param {HTMLElement} block - The code block element
 */
function normalizeCodeIndentation(block) {
    const codeElement = block.querySelector('code');
    if (!codeElement) return;
    
    // Get the content and normalize whitespace
    let codeText = codeElement.innerHTML;
    
    // Fix line returns (replace double line breaks with single ones)
    codeText = codeText.replace(/\n\s*\n/g, '\n');
    
    // Remove trailing whitespace on each line
    codeText = codeText.replace(/[ \t]+$/gm, '');
    
    // Fix indentation: find common indentation and remove it
    const lines = codeText.split('\n');
    let minIndent = Number.MAX_SAFE_INTEGER;
    
    // First, find the minimum indentation level (ignore empty lines)
    for (const line of lines) {
        if (line.trim() === '') continue;
        const indent = line.match(/^\s*/)[0].length;
        if (indent < minIndent) {
            minIndent = indent;
        }
    }
    
    // Remove common indentation from each line
    if (minIndent > 0 && minIndent < Number.MAX_SAFE_INTEGER) {
        const normalizedLines = lines.map(line => {
            if (line.trim() === '') return '';
            return line.substring(minIndent);
        });
        codeText = normalizedLines.join('\n');
    }
    
    // Update code element with normalized content
    codeElement.innerHTML = codeText;
}

/**
 * Wrap code block in a container and add toolbar
 * @param {HTMLElement} block - The code block element
 * @param {string} blockId - The unique ID of the code block
 */
function wrapCodeBlock(block, blockId) {
    // First check if already wrapped to avoid double-wrapping
    if (block.closest('.code-container')) return;
    
    // Create the overall container
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-container';
    
    // Create the toolbar
    const toolbar = createCodeBlockToolbar(blockId);
    
    // Create code content wrapper
    const codeContent = document.createElement('div');
    codeContent.className = 'code-content';
    
    // Add line numbers
    const lineNumbers = createLineNumbers(block);
    
    // Clone the original block to preserve event listeners
    const originalParent = block.parentNode;
    
    // Assemble structure
    codeContent.appendChild(lineNumbers);
    codeContent.appendChild(block);
    codeContainer.appendChild(toolbar);
    codeContainer.appendChild(codeContent);
    
    // Insert the assembled structure where the block was
    originalParent.insertBefore(codeContainer, block.nextSibling);
    
    // Move the block to its new location (prevents duplicate)
    codeContent.appendChild(block);
}

/**
 * Ensure code block width is handled properly
 * @param {HTMLElement} block - The code block element
 */
function ensureCodeBlockWidth(block) {
    const codeElement = block.querySelector('code');
    if (codeElement) {
        // Make sure the code has proper width
        codeElement.style.display = 'block';
        codeElement.style.width = '100%';
        codeElement.style.overflowX = 'auto';
    }
    
    // Make sure pre has proper width
    if (block.tagName.toLowerCase() === 'pre') {
        block.style.width = '100%';
        block.style.margin = '0';
        block.style.overflowX = 'auto';
    }
}

/**
 * Create a toolbar for a code block
 * @param {string} blockId - The unique ID of the code block
 * @returns {HTMLElement} - The created toolbar
 */
function createCodeBlockToolbar(blockId) {
    // Get the block
    const block = document.getElementById(blockId) || document.querySelector(`#${blockId}`);
    if (!block) return document.createElement('div');
    
    // Get language from the class
    const codeElement = block.querySelector('code');
    if (!codeElement) return document.createElement('div');
    
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
    copyButton.setAttribute('data-target', blockId);
    copyButton.addEventListener('click', () => copyCode(blockId));
    toolbar.appendChild(copyButton);
    
    return toolbar;
}

/**
 * Create line numbers element for a code block
 * @param {HTMLElement} block - The code block element
 * @returns {HTMLElement} - The created line numbers element
 */
function createLineNumbers(block) {
    const codeElement = block.querySelector('code');
    if (!codeElement) return document.createElement('div');
    
    // Split by line breaks to count lines
    const codeLines = codeElement.textContent.split('\n');
    
    // Create line number element
    const lineNumbers = document.createElement('div');
    lineNumbers.className = 'line-numbers';
    
    // Add numbers (one for each line, including blank lines)
    for (let i = 1; i <= codeLines.length; i++) {
        const lineNumber = document.createElement('span');
        lineNumber.textContent = i;
        lineNumbers.appendChild(lineNumber);
    }
    
    return lineNumbers;
}

/**
 * Copy code to clipboard
 * @param {string} blockId - The ID of the code block to copy
 */
function copyCode(blockId) {
    const codeBlock = document.getElementById(blockId);
    if (!codeBlock) return;
    
    const codeElement = codeBlock.querySelector('code');
    if (!codeElement) return;
    
    // Get text content (not innerHTML) to avoid HTML entities
    const codeText = codeElement.textContent;
    
    // Use Clipboard API to copy
    navigator.clipboard.writeText(codeText)
        .then(() => {
            // Show copied state
            const copyButton = document.querySelector(`.copy-button[data-target="${blockId}"]`);
            
            if (copyButton) {
                const originalText = copyButton.innerHTML;
                
                copyButton.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyButton.classList.add('copied');
                
                // Reset after a delay
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.classList.remove('copied');
                }, 2000);
            }
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

// Add CSS styles for code highlighting
const codeStyles = `
    .code-container {
        margin: 1.5rem 0;
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    
    .code-content {
        position: relative;
        display: flex;
        width: 100%;
        max-height: 400px;
        overflow: hidden;
    }
    
    .code-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 1rem;
        background-color: #2d2d2d;
        color: #abb2bf;
        width: 100%;
        border-bottom: 1px solid #3d3d3d;
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
        transition: all 0.3s ease;
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
        flex-shrink: 0;
    }
    
    .line-numbers span {
        display: block;
        font-size: 0.875rem;
        line-height: 1.5;
    }

    .code-block {
        margin: 0 !important;
        padding: 0 !important;
        border-radius: 0 !important;
        flex-grow: 1;
        min-width: 0;
        width: 100%;
        height: 100%;
        overflow: hidden !important;
    }

    pre[class*="language-"] {
        margin: 0 !important;
        padding: 1rem !important;
        border-radius: 0 !important;
        width: 100%;
        height: 100%;
        overflow-y: auto !important;
        overflow-x: auto !important;
        font-size: 0.875rem !important;
        line-height: 1.5 !important;
        tab-size: 2 !important;
    }

    code[class*="language-"] {
        display: block !important;
        padding: 0 !important;
        white-space: pre !important;
        width: 100%;
        min-height: 100%;
        font-family: 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace !important;
        text-shadow: none !important;
    }

    /* Fix for weird whitespace in code blocks */
    pre[class*="language-"] br {
        display: none !important;
    }
    
    /* Ensure Prism styling is overridden where needed */
    pre[class*="language-"] {
        background: #1e1e1e !important;
    }
    
    /* Preserve whitespace but handle it properly */
    code[class*="language-"] {
        white-space: pre !important;
    }
`;

// Add the styles to the document - use an ID to avoid duplicate style injection
function injectCodeStyles() {
    // Check if styles are already injected
    if (document.getElementById('code-highlight-styles')) return;
    
    const styleElement = document.createElement('style');
    styleElement.id = 'code-highlight-styles';
    styleElement.textContent = codeStyles;
    document.head.appendChild(styleElement);
}

// Call this when the module is loaded
injectCodeStyles();