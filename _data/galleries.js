// Fetch galleries from GitHub Issues at build time
const fetch = require('node-fetch');

module.exports = async function() {
  const GITHUB_OWNER = 'LynnColeArt';
  const GITHUB_REPO = 'lynncoleart-website';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'LynnColeArt-Website'
    };
    
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    // Fetch issues labeled as 'media'
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?labels=media&state=all&per_page=100`,
      { headers }
    );
    
    if (!response.ok) {
      console.error('Failed to fetch galleries:', response.statusText);
      return [];
    }
    
    const issues = await response.json();
    
    // Process issues to extract gallery data
    const galleries = await Promise.all(
      issues
        .filter(issue => !issue.pull_request) // Exclude pull requests
        .map(async issue => {
          // Parse metadata from issue body
          const metadata = parseIssueMetadata(issue.body);
          
          // Fetch all images from comments
          let firstImage = null;
          let images = [];
          try {
            const commentsResponse = await fetch(
              `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issue.number}/comments?per_page=100`,
              { headers }
            );
            if (commentsResponse.ok) {
              const comments = await commentsResponse.json();
              for (const comment of comments) {
                const imageMatches = comment.body.matchAll(/!\[.*?\]\((.*?)\)/g);
                for (const match of imageMatches) {
                  if (match[1]) {
                    images.push(match[1]);
                    if (!firstImage) {
                      firstImage = match[1];
                    }
                  }
                }
              }
            }
          } catch (error) {
            console.error(`Error fetching comments for issue ${issue.number}:`, error);
          }
          
          return {
            number: issue.number,
            title: metadata.title || issue.title.replace('[Media] ', ''),
            description: metadata.description || '',
            date: metadata.date || issue.created_at,
            tags: metadata.tags || [],
            gallery: metadata.gallery || '',
            imageCount: metadata.imageCount || images.length,
            firstImage: firstImage,
            images: images, // Include all images
            url: `/gallery/${issue.number}/`, // URL for individual gallery page
            created: issue.created_at,
            updated: issue.updated_at,
            hidden: metadata.hidden || false, // Completely hidden
            hideFromHomepage: metadata.hideFromHomepage || false, // Hidden from homepage only
            private: metadata.private || false // Private (could be used for future access control)
          };
        })
    );
    
    // Only include galleries with images
    return galleries.filter(gallery => gallery.imageCount > 0);
    
  } catch (error) {
    console.error('Error fetching galleries:', error);
    return [];
  }
};

function parseIssueMetadata(body) {
  const match = body.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const yamlContent = match[1];
  const metadata = {};
  
  // Simple YAML parser
  yamlContent.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
      
      if (key === 'tags') {
        try {
          metadata[key] = JSON.parse(value);
        } catch {
          metadata[key] = [];
        }
      } else if (key === 'imageCount') {
        metadata[key] = parseInt(value) || 0;
      } else if (key === 'hidden' || key === 'hideFromHomepage' || key === 'private') {
        metadata[key] = value.toLowerCase() === 'true';
      } else {
        metadata[key] = value;
      }
    }
  });
  
  return metadata;
}