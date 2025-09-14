const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const Image = require("@11ty/eleventy-img");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function(eleventyConfig) {
  // Plugins
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);

  // Markdown configuration
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.ariaHidden({
      placement: "after",
      class: "direct-link",
      symbol: "#"
    }),
    level: [1,2,3,4],
    slugify: eleventyConfig.getFilter("slug")
  });
  
  eleventyConfig.setLibrary("md", markdownLibrary);

  // Copy static assets
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy({"_data/robots.txt": "robots.txt"});

  // Collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("posts/*.md").sort((a, b) => b.date - a.date);
  });
  
  eleventyConfig.addCollection("galleries", function(collectionApi) {
    return collectionApi.getFilteredByGlob("galleries/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("timeline", async function(collectionApi) {
    // Get all posts
    const posts = collectionApi.getFilteredByGlob("posts/*.md");

    // Get galleries
    const galleries = await require('./_data/galleries.js')();

    // Create combined timeline
    let timelineItems = [];

    // Add posts
    posts.forEach(post => {
      timelineItems.push({
        date: post.date,
        url: post.url,
        data: {
          ...post.data,
          type: 'post'
        }
      });
    });

    // Add visible galleries
    galleries.forEach(gallery => {
      if (!gallery.hidden && !gallery.hideFromHomepage) {
        timelineItems.push({
          date: new Date(gallery.date),
          url: `/gallery/${gallery.number}/`,
          data: {
            title: gallery.title,
            description: gallery.description,
            excerpt: gallery.description,
            tags: gallery.tags,
            type: 'gallery',
            imageCount: gallery.imageCount,
            firstImage: gallery.firstImage,
            issueNumber: gallery.number
          }
        });
      }
    });

    // Sort by date descending (newest first)
    return timelineItems.sort((a, b) => {
      const dateA = a.date instanceof Date ? a.date : new Date(a.date);
      const dateB = b.date instanceof Date ? b.date : new Date(b.date);
      return dateB - dateA;
    });
  });

  eleventyConfig.addCollection("tagList", async function(collection) {
    let tagSet = new Set();
    
    // Get tags from posts
    collection.getAll().forEach(item => {
      // Ensure tags is always an array
      let tags = item.data.tags;
      if (typeof tags === 'string') {
        tags = [tags];
      } else if (!Array.isArray(tags)) {
        tags = [];
      }
      tags.forEach(tag => tagSet.add(tag));
    });
    
    // Get tags from galleries
    try {
      const galleries = await require('./_data/galleries.js')();
      galleries.forEach(gallery => {
        if (gallery.tags && Array.isArray(gallery.tags)) {
          gallery.tags.forEach(tag => tagSet.add(tag));
        }
      });
    } catch (err) {
      console.error('Error loading gallery tags:', err);
    }
    
    return [...tagSet];
  });

  // Filters
  eleventyConfig.addFilter("dateDisplay", (dateObj) => {
    return new Date(dateObj).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });
  
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return new Date(dateObj).toISOString().split('T')[0];
  });

  eleventyConfig.addFilter("limit", (array, limit) => {
    return array.slice(0, limit);
  });
  
  eleventyConfig.addFilter("concat", (arr1, arr2) => {
    return (arr1 || []).concat(arr2 || []);
  });
  
  eleventyConfig.addFilter("unique", (array) => {
    return [...new Set(array)];
  });
  
  eleventyConfig.addFilter("sortByPopularity", (repos) => {
    return repos.sort((a, b) => {
      const popularityA = (a.stars || 0) + (a.forks || 0);
      const popularityB = (b.stars || 0) + (b.forks || 0);
      
      // Sort by popularity descending
      if (popularityB !== popularityA) {
        return popularityB - popularityA;
      }
      
      // If same popularity, sort alphabetically
      return a.name.localeCompare(b.name);
    });
  });
  
  eleventyConfig.addFilter("map", (array, prop) => {
    return array.map(item => item[prop]);
  });
  
  eleventyConfig.addFilter("reject", (array, test) => {
    if (test === 'falsy') {
      return array.filter(Boolean);
    }
    if (typeof test === 'string') {
      return array.filter(item => !item[test]);
    }
    return array.filter(item => !item);
  });
  
  eleventyConfig.addFilter("markdown", (content) => {
    return markdownLibrary.render(content || '');
  });
  
  // GitHub language colors
  eleventyConfig.addFilter("languageColor", (language) => {
    const colors = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      HTML: '#e34c26',
      CSS: '#563d7c',
      Java: '#b07219',
      Ruby: '#701516',
      Go: '#00ADD8',
      Rust: '#dea584',
      PHP: '#4F5D95',
      Swift: '#ffac45',
      Kotlin: '#F18E33',
      'C++': '#f34b7d',
      'C#': '#178600',
      Shell: '#89e051',
      Vue: '#4fc08d',
      React: '#61dafb'
    };
    return colors[language] || '#6e7681';
  });
  
  // Process gallery and suno embeds
  eleventyConfig.addFilter("processGalleryEmbeds", async function(content) {
    if (!content) return content;
    
    // Process gallery embeds with [gallery:id] syntax
    content = content.replace(/\[gallery:(\d+)\]/g, (match, issueNumber) => {
      return `<div class="embedded-gallery" data-issue="${issueNumber}">
        <div class="gallery-loading">Loading gallery #${issueNumber}...</div>
      </div>`;
    });
    
    // Process suno embeds with [suno:id] syntax
    content = content.replace(/\[suno:([a-zA-Z0-9-]+)\]/g, (match, songId) => {
      return `<div class="content-block suno-block">
        <iframe 
          src="https://suno.com/embed/${songId}" 
          width="100%" 
          height="240" 
          frameborder="0" 
          allow="autoplay"
          loading="lazy">
        </iframe>
      </div>`;
    });
    
    return content;
  });

  // Image shortcode for responsive images
  eleventyConfig.addShortcode("image", async function(src, alt, sizes) {
    let metadata = await Image(src, {
      widths: [300, 600, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "./_site/img/"
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
};