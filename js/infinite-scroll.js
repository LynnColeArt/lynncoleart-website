// Infinite Scroll for Timeline Pages
class InfiniteScroll {
  constructor(options = {}) {
    this.container = document.querySelector(options.container || '.timeline');
    this.loadMoreTrigger = options.trigger || 200; // pixels from bottom
    this.itemsPerPage = options.itemsPerPage || 20;
    this.currentPage = 1;
    this.isLoading = false;
    this.hasMore = true;
    this.allItems = [];
    this.filteredItems = [];
    this.currentFilter = options.filter || null; // for tag filtering

    this.init();
  }

  async init() {
    if (!this.container) return;

    // Load all timeline data
    try {
      const response = await fetch('/api/timeline.json');
      const data = await response.json();
      this.allItems = data.items;

      // Apply filter if needed (for tag pages)
      if (this.currentFilter) {
        this.filteredItems = this.allItems.filter(item =>
          item.tags && item.tags.includes(this.currentFilter)
        );
      } else {
        this.filteredItems = [...this.allItems];
      }

      // Hide initial server-rendered items beyond first page
      this.hideInitialOverflow();

      // Add loading indicator
      this.addLoadingIndicator();

      // Setup scroll listener
      this.setupScrollListener();

      // Check if we need to load more immediately (short pages)
      this.checkScroll();
    } catch (error) {
      console.error('Failed to initialize infinite scroll:', error);
    }
  }

  hideInitialOverflow() {
    const existingItems = this.container.querySelectorAll('.timeline-item');
    existingItems.forEach((item, index) => {
      if (index >= this.itemsPerPage) {
        item.style.display = 'none';
        item.classList.add('server-rendered-hidden');
      }
    });
  }

  addLoadingIndicator() {
    const loader = document.createElement('div');
    loader.className = 'infinite-scroll-loader';
    loader.innerHTML = `
      <div class="loader-spinner"></div>
      <p>Loading more...</p>
    `;
    loader.style.display = 'none';
    this.container.after(loader);
    this.loader = loader;
  }

  setupScrollListener() {
    let scrollTimeout;

    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        this.checkScroll();
      }, 100);
    });
  }

  checkScroll() {
    if (this.isLoading || !this.hasMore) return;

    const scrollPosition = window.innerHeight + window.scrollY;
    const threshold = document.body.offsetHeight - this.loadMoreTrigger;

    if (scrollPosition >= threshold) {
      this.loadMore();
    }
  }

  async loadMore() {
    if (this.isLoading || !this.hasMore) return;

    this.isLoading = true;
    this.loader.style.display = 'block';

    // Simulate network delay for smooth UX
    await new Promise(resolve => setTimeout(resolve, 300));

    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    const itemsToAdd = this.filteredItems.slice(startIndex, endIndex);

    if (itemsToAdd.length === 0) {
      this.hasMore = false;
      this.loader.innerHTML = '<p>No more posts to load</p>';
      setTimeout(() => {
        this.loader.style.display = 'none';
      }, 2000);
      return;
    }

    // Check for hidden server-rendered items first
    const hiddenItems = this.container.querySelectorAll('.server-rendered-hidden');
    let itemsRevealed = 0;

    for (let i = 0; i < hiddenItems.length && itemsRevealed < this.itemsPerPage; i++) {
      hiddenItems[i].style.display = '';
      hiddenItems[i].classList.remove('server-rendered-hidden');
      hiddenItems[i].classList.add('fade-in');
      itemsRevealed++;
    }

    // If we revealed all hidden items we needed, we're done
    if (itemsRevealed >= itemsToAdd.length) {
      this.currentPage++;
      this.isLoading = false;
      this.loader.style.display = 'none';

      // Check if we need to load more
      setTimeout(() => this.checkScroll(), 100);
      return;
    }

    // Otherwise, create new items for the remaining
    const remainingItems = itemsToAdd.slice(itemsRevealed);

    remainingItems.forEach(item => {
      const element = this.createTimelineItem(item);
      this.container.appendChild(element);

      // Trigger animation
      requestAnimationFrame(() => {
        element.classList.add('fade-in');
      });
    });

    this.currentPage++;
    this.isLoading = false;
    this.loader.style.display = 'none';

    // Check if we need to load more (in case page is still not full)
    setTimeout(() => this.checkScroll(), 100);
  }

  createTimelineItem(item) {
    const article = document.createElement('article');
    article.className = `timeline-item ${item.isGallery ? 'timeline-gallery' : ''}`;

    if (item.isGallery && item.gallery) {
      // Gallery item with background
      article.innerHTML = `
        ${item.gallery.firstImage ? `<div class="timeline-gallery-bg" style="background-image: url('${item.gallery.firstImage}');"></div>` : ''}
        <div class="timeline-gallery-content">
          <time class="timeline-meta" datetime="${item.date}">
            ${item.displayDate} · Gallery
          </time>
          <h2 class="timeline-title">
            <a href="${item.url}">${item.title}</a>
          </h2>
          ${item.excerpt ? `<p class="timeline-excerpt">${item.excerpt}</p>` : ''}
          ${this.renderTags(item.tags)}
        </div>
      `;
    } else {
      // Regular post item
      article.innerHTML = `
        <time class="timeline-meta" datetime="${item.date}">
          ${item.displayDate} · Post
        </time>
        <h2 class="timeline-title">
          <a href="${item.url}">${item.title}</a>
        </h2>
        ${item.excerpt ? `<p class="timeline-excerpt">${item.excerpt}</p>` : ''}
        ${this.renderTags(item.tags)}
      `;
    }

    return article;
  }

  renderTags(tags) {
    if (!tags || tags.length === 0) return '';

    return `
      <div class="timeline-tags">
        ${tags.map(tag => `<a href="/tags/${this.slugify(tag)}/" class="tag">#${tag}</a>`).join('')}
      </div>
    `;
  }

  slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

// Auto-initialize on pages with timelines
document.addEventListener('DOMContentLoaded', () => {
  const timeline = document.querySelector('.timeline');
  if (!timeline) return;

  // Check if we're on a tag page
  const tagMatch = window.location.pathname.match(/\/tags\/([^\/]+)\//);
  const currentTag = tagMatch ? decodeURIComponent(tagMatch[1]).replace(/-/g, ' ') : null;

  // Initialize infinite scroll
  new InfiniteScroll({
    container: '.timeline',
    itemsPerPage: 20,
    trigger: 300, // Load when 300px from bottom
    filter: currentTag
  });
});

// CSS for the loader
const style = document.createElement('style');
style.textContent = `
  .infinite-scroll-loader {
    text-align: center;
    padding: 2rem;
    color: var(--text-secondary);
  }

  .loader-spinner {
    width: 40px;
    height: 40px;
    margin: 0 auto 1rem;
    border: 3px solid var(--border-color);
    border-top-color: var(--purple-primary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .timeline-item {
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .timeline-item.fade-in {
    animation: fadeInUp 0.5s ease forwards;
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

  .server-rendered-hidden {
    display: none !important;
  }
`;
document.head.appendChild(style);