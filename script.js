// Portfolio Script
// Handles fetching GitHub data and rendering projects

// Set current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Load personal information
function loadPersonalInfo() {
    const personal = config.personal;
    
    // Hero section
    document.getElementById('hero-name').textContent = personal.name;
    document.getElementById('hero-title').textContent = personal.title;
    document.getElementById('hero-description').textContent = personal.description;
    
    // About section
    document.getElementById('about-text').textContent = personal.about;
    
    // Contact section
    document.getElementById('contact-email').href = `mailto:${personal.email}`;
    document.getElementById('contact-email').textContent = personal.email;
    document.getElementById('contact-github').href = `https://github.com/${personal.github}`;
    document.getElementById('contact-linkedin').href = `https://linkedin.com/in/${personal.linkedin}`;
    
    // Hero links
    document.getElementById('github-link').href = `https://github.com/${personal.github}`;
    document.getElementById('linkedin-link').href = `https://linkedin.com/in/${personal.linkedin}`;
    
    // Footer
    document.getElementById('footer-name').textContent = personal.name;
}

// Fetch GitHub repository data
async function fetchGitHubRepo(repoName) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${repoName}`);
        }
        const data = await response.json();
        
        // Fetch languages
        const languagesResponse = await fetch(data.languages_url);
        const languagesData = await languagesResponse.json();
        const languages = Object.keys(languagesData);
        
        return {
            name: data.name,
            description: data.description || 'No description available',
            url: data.html_url,
            homepage: data.homepage,
            stars: data.stargazers_count,
            forks: data.forks_count,
            languages: languages.slice(0, 5), // Top 5 languages
            updated: new Date(data.updated_at).toLocaleDateString(),
            type: 'github'
        };
    } catch (error) {
        console.error(`Error fetching ${repoName}:`, error);
        return null;
    }
}

// Render a project card
function renderProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const typeClass = project.type === 'github' ? 'github' : 'site';
    const typeLabel = project.type === 'github' ? 'GitHub' : project.type || 'Project';
    
    card.innerHTML = `
        <div class="project-card-header">
            <div>
                <h3>${project.name}</h3>
                <span class="project-card-type ${typeClass}">${typeLabel}</span>
            </div>
        </div>
        <p class="project-card-description">${project.description}</p>
        ${project.languages && project.languages.length > 0 ? `
            <div class="project-languages">
                ${project.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
            </div>
        ` : ''}
        ${project.type === 'github' && (project.stars || project.forks) ? `
            <div class="project-stats">
                ${project.stars ? `<div class="project-stat">⭐ ${project.stars}</div>` : ''}
                ${project.forks ? `<div class="project-stat">🍴 ${project.forks}</div>` : ''}
            </div>
        ` : ''}
        <div class="project-card-footer">
            ${project.homepage || project.url ? `
                <a href="${project.homepage || project.url}" class="project-link" target="_blank" rel="noopener noreferrer">
                    ${project.type === 'github' ? 'View Project' : 'Visit Site'}
                </a>
            ` : ''}
            ${project.repo || (project.type === 'github' && project.url) ? `
                <a href="${project.repo || project.url}" class="project-repo" target="_blank" rel="noopener noreferrer">
                    ${project.type === 'github' ? 'View Code' : 'View Repo'}
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Load and render all projects
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
    
    const projects = [];
    
    // Fetch GitHub repositories
    if (config.projects.githubRepos && config.projects.githubRepos.length > 0) {
        const githubProjects = await Promise.all(
            config.projects.githubRepos.map(repo => fetchGitHubRepo(repo))
        );
        projects.push(...githubProjects.filter(p => p !== null));
    }
    
    // Add manual projects
    if (config.projects.manual && config.projects.manual.length > 0) {
        projects.push(...config.projects.manual.map(project => ({
            ...project,
            type: project.type || 'other'
        })));
    }
    
    // Render projects
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div class="loading">No projects configured yet. Edit config.js to add your projects!</div>';
        return;
    }
    
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const card = renderProjectCard(project);
        projectsGrid.appendChild(card);
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPersonalInfo();
    loadProjects();
});

