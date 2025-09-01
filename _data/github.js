// Fetch GitHub projects at build time
const fetch = require('node-fetch');

module.exports = async function() {
  const GITHUB_USER = 'LynnColeArt';
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN; // Optional, for higher rate limits
  
  try {
    const headers = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'LynnColeArt-Website'
    };
    
    // Add token if available for higher rate limits
    if (GITHUB_TOKEN) {
      headers['Authorization'] = `token ${GITHUB_TOKEN}`;
    }
    
    // Fetch user repos
    const reposResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      { headers }
    );
    
    if (!reposResponse.ok) {
      console.error('Failed to fetch repos:', reposResponse.statusText);
      return { repos: [], user: null };
    }
    
    const repos = await reposResponse.json();
    
    // Fetch user info
    const userResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USER}`,
      { headers }
    );
    
    const user = userResponse.ok ? await userResponse.json() : null;
    
    // Process and filter repos
    const processedRepos = repos
      .filter(repo => !repo.fork) // Exclude forks by default
      .map(repo => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        updated: repo.updated_at,
        created: repo.created_at,
        archived: repo.archived,
        is_template: repo.is_template
      }))
      .filter(repo => !repo.archived); // Exclude archived repos
    
    return {
      repos: processedRepos,
      user: user ? {
        name: user.name,
        bio: user.bio,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        public_repos: user.public_repos,
        profile_url: user.html_url
      } : null,
      fetched_at: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return { repos: [], user: null };
  }
};