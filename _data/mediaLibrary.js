// Media Library - Aggregates all images from galleries for easy selection
module.exports = async function() {
  const galleries = await require('./galleries.js')();
  const mediaItems = [];

  // Process all galleries
  galleries.forEach(gallery => {
    if (!gallery.hidden && gallery.images && gallery.images.length > 0) {
      gallery.images.forEach((imageUrl, index) => {
        mediaItems.push({
          url: imageUrl,
          thumbnail: imageUrl, // Could generate smaller versions later
          title: `${gallery.title} - Image ${index + 1}`,
          gallery: gallery.title,
          galleryNumber: gallery.number,
          tags: gallery.tags || [],
          date: gallery.date,
          id: `gallery-${gallery.number}-${index}`
        });
      });
    }
  });

  // Sort by date, newest first
  mediaItems.sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    images: mediaItems,
    totalCount: mediaItems.length,
    galleries: galleries.map(g => ({
      title: g.title,
      number: g.number,
      imageCount: g.imageCount
    }))
  };
};