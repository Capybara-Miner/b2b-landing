/**
 * Game Architecture Diagram Module
 * Creates an SVG diagram of the mining game architecture
 * For use in vanilla HTML/JS projects
 */

// Check if the class is already defined to prevent duplicate declarations
if (typeof window.GameArchitectureDiagram === 'undefined') {
  
  class GameArchitectureDiagram {
    constructor(options = {}) {
      this.containerId = options.containerId || 'game-architecture-container';
      this.className = options.className || '';
    }

    /**
     * Renders the SVG diagram to the specified container
     */
    render() {
      const container = document.getElementById(this.containerId);
      if (!container) {
        console.error(`Container with ID "${this.containerId}" not found`);
        return;
      }

      // Create SVG element with responsive settings
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('version', '1.1');
      svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      svg.setAttribute('viewBox', '0 0 1000 600');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '600');
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      
      if (this.className) {
        svg.setAttribute('class', this.className);
      }

      // Add SVG content
      svg.innerHTML = `
        <!-- Background -->
        <rect width="1000" height="600" fill="#f8f9fa" />

        <!-- Client Side -->
        <rect x="50" y="70" width="160" height="80" rx="10" fill="#6babff" stroke="#2d5986" stroke-width="2" />
        <text x="130" y="110" font-family="Arial" font-size="16" text-anchor="middle" fill="white">Telegram Mini App</text>
        <text x="130" y="130" font-family="Arial" font-size="12" text-anchor="middle" fill="white">Game Client</text>

        <!-- API Gateway -->
        <rect x="270" y="70" width="160" height="80" rx="10" fill="#ff9966" stroke="#994c30" stroke-width="2" />
        <text x="350" y="110" font-family="Arial" font-size="16" text-anchor="middle" fill="white">API Gateway</text>
        <text x="350" y="130" font-family="Arial" font-size="12" text-anchor="middle" fill="white">HTTP Endpoints</text>

        <!-- AWS Lambda -->
        <rect x="270" y="200" width="350" height="240" rx="10" fill="#ffcc99" stroke="#996633" stroke-width="2" />
        <text x="445" y="225" font-family="Arial" font-size="18" text-anchor="middle" font-weight="bold">AWS Lambda</text>
          
        <!-- Handler -->
        <rect x="290" y="240" width="120" height="60" rx="5" fill="#fff" stroke="#666" stroke-width="1" />
        <text x="350" y="270" font-family="Arial" font-size="14" text-anchor="middle">Lambda Handler</text>
          
        <!-- DB Module -->
        <rect x="290" y="320" width="120" height="100" rx="5" fill="#99cc99" stroke="#336633" stroke-width="1" />
        <text x="350" y="345" font-family="Arial" font-size="14" text-anchor="middle">Cache</text>
        <text x="350" y="365" font-family="Arial" font-size="12" text-anchor="middle">- Users</text>
        <text x="350" y="385" font-family="Arial" font-size="12" text-anchor="middle">- Projects</text>
        <text x="350" y="405" font-family="Arial" font-size="12" text-anchor="middle">- Resources</text>
          
        <!-- Utils Module -->
        <rect x="480" y="240" width="120" height="180" rx="5" fill="#9999cc" stroke="#333366" stroke-width="1" />
        <text x="540" y="265" font-family="Arial" font-size="14" text-anchor="middle">Utilities</text>
        <text x="540" y="285" font-family="Arial" font-size="12" text-anchor="middle">- CDN Utils</text>
        <text x="540" y="305" font-family="Arial" font-size="12" text-anchor="middle">- IP Utils</text>
        <text x="540" y="325" font-family="Arial" font-size="12" text-anchor="middle">- Telegram Auth</text>
        <text x="540" y="345" font-family="Arial" font-size="12" text-anchor="middle">- Data Transform</text>
        <text x="540" y="365" font-family="Arial" font-size="12" text-anchor="middle">- Level Calc</text>
          
        <!-- PostgreSQL -->
        <rect x="270" y="480" width="160" height="80" rx="10" fill="#6699cc" stroke="#336699" stroke-width="2" />
        <text x="350" y="520" font-family="Arial" font-size="16" text-anchor="middle" fill="white">PostgreSQL</text>
        <text x="350" y="540" font-family="Arial" font-size="12" text-anchor="middle" fill="white">Game Database</text>
          
        <!-- CDN - moved to the right -->
        <rect x="700" y="200" width="160" height="150" rx="10" fill="#cc99cc" stroke="#663366" stroke-width="2" />
        <text x="780" y="220" font-family="Arial" font-size="16" text-anchor="middle" fill="white">CDN</text>
        <text x="780" y="240" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Config</text>
        <text x="780" y="260" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Mines Data</text>
        <text x="780" y="280" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Improvements</text>
        <text x="780" y="300" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Employees</text>
        <text x="780" y="320" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Sales Items</text>
        <text x="780" y="340" font-family="Arial" font-size="12" text-anchor="middle" fill="white">- Static Assets</text>
          
        <!-- API Endpoints Box -->
        <rect x="500" y="70" width="240" height="100" rx="10" fill="#f0f0f0" stroke="#666" stroke-width="1" />
        <text x="620" y="90" font-family="Arial" font-size="14" text-anchor="middle" font-weight="bold">API Endpoints</text>
        <text x="520" y="110" font-family="Arial" font-size="12">POST /login</text>
        <text x="520" y="130" font-family="Arial" font-size="12">POST /update</text>
        <text x="520" y="150" font-family="Arial" font-size="12">POST /change</text>
        <text x="620" y="110" font-family="Arial" font-size="12">POST /upgrade</text>
        <text x="620" y="130" font-family="Arial" font-size="12">POST /claim</text>
        <text x="620" y="150" font-family="Arial" font-size="12">GET /test</text>
          
        <!-- AWS Cloud Border - extended wider -->
        <rect x="260" y="50" width="620" height="520" rx="20" fill="none" stroke="#232f3e" stroke-width="3" stroke-dasharray="10,5" />
        <text x="800" y="75" font-family="Arial" font-size="18" text-anchor="middle" fill="#232f3e" font-weight="bold">AWS Cloud</text>
          
        <!-- Connection Lines -->
        <!-- Client to API Gateway -->
        <line x1="210" y1="110" x2="270" y2="110" stroke="#333" stroke-width="2" />
        <polygon points="265,105 275,110 265,115" fill="#333" />
          
        <!-- API Gateway to Lambda -->
        <line x1="350" y1="150" x2="350" y2="200" stroke="#333" stroke-width="2" />
        <polygon points="345,195 350,205 355,195" fill="#333" />
          
        <!-- Lambda to PostgreSQL -->
        <line x1="350" y1="440" x2="350" y2="480" stroke="#333" stroke-width="2" />
        <polygon points="345,475 350,485 355,475" fill="#333" />
          
        <!-- Lambda to CDN -->
        <line x1="620" y1="270" x2="700" y2="270" stroke="#333" stroke-width="2" />
        <polygon points="695,265 705,270 695,275" fill="#333" />
          
        <!-- CDN to Client (new connection) -->
        <path d="M700,250 C500,250 300,150 210,110" stroke="#333" stroke-width="2" fill="none" />
        <polygon points="213,105 207,114 217,114" fill="#333" />
          
        <!-- API Gateway to API Endpoints -->
        <line x1="430" y1="110" x2="500" y2="110" stroke="#333" stroke-width="2" />
        <polygon points="495,105 505,110 495,115" fill="#333" />
          
        <!-- Legend -->
        <rect x="50" y="480" width="170" height="90" rx="5" fill="#fff" stroke="#666" stroke-width="1" />
        <text x="60" y="500" font-family="Arial" font-size="14" font-weight="bold">Game Features</text>
        <text x="60" y="520" font-family="Arial" font-size="12">• Mining Projects</text>
        <text x="60" y="540" font-family="Arial" font-size="12">• Resource Management</text>
        <text x="60" y="560" font-family="Arial" font-size="12">• Upgrades & Employees</text>
          
        <!-- CDN Connection Labels -->
        <text x="630" y="250" font-family="Arial" font-size="10" text-anchor="middle">Load configs</text>
        <text x="450" y="180" font-family="Arial" font-size="10" text-anchor="middle">Static assets</text>
      `;

      // Apply responsive container styles
      container.style.width = "100%";
      container.style.maxWidth = "1200px";
      container.style.margin = "0 auto";
      
      // Add styles to ensure the SVG is properly contained
      const styleId = "arch-diagram-styles";
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
          #${this.containerId} {
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible;
          }
          #${this.containerId} svg {
            max-width: 100%;
            height: auto;
          }
        `;
        document.head.appendChild(style);
      }

      // Append SVG to container
      container.appendChild(svg);
    }
  }
  
  // Make the class available globally to prevent redefinition errors
  window.GameArchitectureDiagram = GameArchitectureDiagram;
} else {
  console.log("GameArchitectureDiagram already defined, skipping redefinition");
}