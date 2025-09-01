// Combine tags from posts and galleries
module.exports = async function() {
  const galleries = await require('./galleries.js')();
  
  // Get all unique tags from galleries
  const galleryTags = new Set();
  galleries.forEach(gallery => {
    if (gallery.tags && Array.isArray(gallery.tags)) {
      gallery.tags.forEach(tag => galleryTags.add(tag));
    }
  });
  
  return [...galleryTags];
};