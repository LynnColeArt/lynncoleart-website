// Initialize Mermaid diagrams
document.addEventListener('DOMContentLoaded', function() {
  // Find all mermaid code blocks and convert them
  document.querySelectorAll('pre code.language-mermaid').forEach((block) => {
    const mermaidDiv = document.createElement('div');
    mermaidDiv.className = 'mermaid';
    mermaidDiv.textContent = block.textContent;
    block.parentElement.replaceWith(mermaidDiv);
  });
  
  // Copy code button functionality
  document.querySelectorAll('pre').forEach((pre) => {
    const code = pre.querySelector('code');
    if (!code) return;
    
    const button = document.createElement('button');
    button.className = 'copy-button';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
    
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copied!';
        setTimeout(() => {
          button.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    });
    
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
});