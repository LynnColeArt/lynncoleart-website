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
    const galleries = issues
      .filter(issue => !issue.pull_request) // Exclude pull requests
      .map(issue => {
        // Parse metadata from issue body
        const metadata = parseIssueMetadata(issue.body);
        
        return {
          number: issue.number,
          title: metadata.title || issue.title.replace('[Media] ', ''),
          description: metadata.description || '',
          date: metadata.date || issue.created_at,
          tags: metadata.tags || [],
          gallery: metadata.gallery || '',
          imageCount: metadata.imageCount || 0,
          url: `/gallery/${issue.number}/`, // URL for individual gallery page
          created: issue.created_at,
          updated: issue.updated_at
        };
      })
      .filter(gallery => gallery.imageCount > 0); // Only include galleries with images
    
    return galleries;
    
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
      } else {
        metadata[key] = value;
      }
    }
  });
  
  return metadata;
}