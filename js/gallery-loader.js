// Gallery loader - now only handles lightbox functionality
(function() {
  'use strict';
  
  // Simple lightbox functionality
  window.openLightbox = function(src, alt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${src}" alt="${alt}">
        <button class="lightbox-close" onclick="closeLightbox()">×</button>
      </div>
    `;
    lightbox.onclick = (e) => {
      if (e.target === lightbox) closeLightbox();
    };
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
  };
  
  window.closeLightbox = function() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
      lightbox.remove();
      document.body.style.overflow = '';
    }
  };
  
  // Add keyboard support for lightbox
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
})();