// Gallery loader for embedded galleries
(function() {
  'use strict';
  
  // Configuration
  const GITHUB_OWNER = 'LynnColeArt';
  const GITHUB_REPO = 'lynncoleart-website';
  const MAX_PREVIEW_IMAGES = 6; // Maximum images to show in preview
  
  // Load all gallery thumbnails on the page
  async function loadGalleryThumbnails() {
    const thumbs = document.querySelectorAll('.gallery-thumb[data-issue]');
    
    for (const thumb of thumbs) {
      const issueNumber = thumb.dataset.issue;
      if (issueNumber) {
        await loadGalleryThumbnail(thumb, issueNumber);
      }
    }
  }
  
  // Load all embedded galleries on the page
  async function loadEmbeddedGalleries() {
    const galleries = document.querySelectorAll('.embedded-gallery[data-issue]');
    
    for (const gallery of galleries) {
      const issueNumber = gallery.dataset.issue;
      if (issueNumber) {
        await loadGallery(gallery, issueNumber);
      }
    }
  }
  
  // Load gallery thumbnail (first image only)
  async function loadGalleryThumbnail(container, issueNumber) {
    try {
      // Fetch comments (images)
      const commentsResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`);
      const comments = await commentsResponse.json();
      
      // Extract first image
      for (const comment of comments) {
        const imageMatch = comment.body.match(/!\[.*?\]\((.*?)\)/);
        if (imageMatch && imageMatch[1]) {
          const imageUrl = imageMatch[1];
          container.innerHTML = `<img src="${imageUrl}" alt="Gallery thumbnail" loading="lazy">`;
          return;
        }
      }
      
      // No images found
      container.innerHTML = '<div class="gallery-error">No preview</div>';
    } catch (error) {
      console.error(`Error loading gallery thumbnail ${issueNumber}:`, error);
      container.innerHTML = '<div class="gallery-error">Error</div>';
    }
  }
  
  // Load a single gallery
  async function loadGallery(container, issueNumber) {
    try {
      // Fetch issue data
      const issueResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`);
      const issue = await issueResponse.json();
      
      // Parse metadata
      const metadata = parseIssueMetadata(issue.body);
      
      // Fetch comments (images)
      const commentsResponse = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}/comments`);
      const comments = await commentsResponse.json();
      
      // Extract images
      const images = comments
        .filter(comment => comment.body.includes('!['))
        .map(comment => {
          const imageMatch = comment.body.match(/!\[.*?\]\((.*?)\)/);
          return imageMatch ? imageMatch[1] : null;
        })
        .filter(url => url);
      
      // Render gallery
      if (images.length > 0) {
        container.innerHTML = `
          <div class="loaded-gallery">
            <h3 class="gallery-title">${metadata.title || 'Gallery'}</h3>
            <div class="gallery-grid">
              ${images.map((url, idx) => `
                <img data-src="${url}" 
                     src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%231a1a1a' width='400' height='300'/%3E%3C/svg%3E"
                     alt="${metadata.alt || 'Gallery image'} - Image ${idx + 1}" 
                     loading="lazy"
                     class="lazy-image"
                     onclick="openLightbox('${url}', '${metadata.alt || 'Gallery image'} - Image ${idx + 1}')">
              `).join('')}
            </div>
          </div>
        `;
        
        // Initialize lazy loading
        initLazyLoading(container);
      } else {
        container.innerHTML = '<div class="gallery-error">No images found in this gallery.</div>';
      }
    } catch (error) {
      console.error(`Error loading gallery ${issueNumber}:`, error);
      container.innerHTML = '<div class="gallery-error">Error loading gallery.</div>';
    }
  }
  
  // Parse issue metadata
  function parseIssueMetadata(body) {
    const match = body.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return { title: '', alt: '' };
    
    const yamlContent = match[1];
    const metadata = {};
    
    // Simple YAML parser
    yamlContent.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        metadata[key.trim()] = value;
      }
    });
    
    return metadata;
  }
  
  // Initialize lazy loading for images
  function initLazyLoading(container) {
    const lazyImages = container.querySelectorAll('.lazy-image');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add('loaded');
            img.classList.remove('lazy-image');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      lazyImages.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers that don't support IntersectionObserver
      lazyImages.forEach(img => {
        img.src = img.dataset.src;
        img.classList.add('loaded');
      });
    }
  }
  
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
  
  // Load galleries when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadGalleryThumbnails();
      loadEmbeddedGalleries();
    });
  } else {
    loadGalleryThumbnails();
    loadEmbeddedGalleries();
  }
})();