// Portfolio Script
// Handles fetching GitHub data and rendering projects

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
    const emailLink = document.getElementById('contact-email');
    emailLink.href = `mailto:${personal.email}`;
    emailLink.setAttribute('title', personal.email);
    emailLink.setAttribute('aria-label', `Email: ${personal.email}`);
    document.getElementById('contact-github').href = `https://github.com/${personal.github}`;
    document.getElementById('contact-linkedin').href = `https://www.linkedin.com/in/${personal.linkedin}`;
    
    // Footer
    document.getElementById('footer-name').textContent = personal.name;
}

// Fetch GitHub repository data
async function fetchGitHubRepo(repoName) {
    try {
        console.log(`Fetching ${repoName}...`);
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        if (!response.ok) {
            if (response.status === 404) {
                console.warn(`Repository ${repoName} not found or is private`);
            } else {
                console.error(`Failed to fetch ${repoName}: ${response.status} ${response.statusText}`);
            }
            return null;
        }
        const data = await response.json();
        
        // Fetch languages
        let languages = [];
        try {
            const languagesResponse = await fetch(data.languages_url);
            if (languagesResponse.ok) {
                const languagesData = await languagesResponse.json();
                languages = Object.keys(languagesData);
            }
        } catch (langError) {
            console.warn(`Could not fetch languages for ${repoName}:`, langError);
        }
        
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
    
    // Map project.type to specific tag styles and labels
    const typeClass = (() => {
        switch (project.type) {
            case 'github':
                return 'github';
            case 'site':
                return 'site';
            case 'extension':
                return 'extension';
            case 'bot':
                return 'bot';
            default:
                return 'site';
        }
    })();

    const typeLabel = (() => {
        switch (project.type) {
            case 'github':
                return 'GitHub';
            case 'site':
                return 'Site';
            case 'extension':
                return 'Extension';
            case 'bot':
                return 'Bot';
            default:
                return project.type || 'Project';
        }
    })();
    
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
            ${project.homepage ? `
                <a href="${project.homepage}" class="project-link" target="_blank" rel="noopener noreferrer">
                    View Project
                </a>
            ` : ''}
            ${project.url ? `
                <a href="${project.url}" class="project-repo" target="_blank" rel="noopener noreferrer">
                    ${project.type === 'github' ? 'View Code' : (project.repo ? 'View Repo' : 'View Project')}
                </a>
            ` : ''}
            ${project.repo && project.type !== 'github' ? `
                <a href="${project.repo}" class="project-repo" target="_blank" rel="noopener noreferrer">
                    View Repo
                </a>
            ` : ''}
        </div>
    `;
    
    return card;
}

// Load and render all projects
async function loadProjects() {
    const projectsGrid = document.getElementById('projects-grid');
    if (!projectsGrid) {
        console.error('Projects grid element not found');
        return;
    }
    
    projectsGrid.innerHTML = '<div class="loading">Loading projects...</div>';
    
    const projects = [];
    
    // Fetch GitHub repositories
    if (config && config.projects && config.projects.githubRepos && config.projects.githubRepos.length > 0) {
        console.log(`Fetching ${config.projects.githubRepos.length} GitHub repositories...`);
        const githubProjects = await Promise.all(
            config.projects.githubRepos.map(repo => fetchGitHubRepo(repo))
        );
        const validProjects = githubProjects.filter(p => p !== null);
        console.log(`Successfully loaded ${validProjects.length} GitHub repositories`);
        projects.push(...validProjects);
    }
    
    // Add manual projects
    if (config && config.projects && config.projects.manual && config.projects.manual.length > 0) {
        projects.push(...config.projects.manual.map(project => ({
            ...project,
            type: project.type || 'other'
        })));
    }
    
    // Render projects
    if (projects.length === 0) {
        projectsGrid.innerHTML = '<div class="loading">No projects found. Check the browser console for errors or edit config.js to add your projects!</div>';
        return;
    }
    
    projectsGrid.innerHTML = '';
    projects.forEach(project => {
        const card = renderProjectCard(project);
        projectsGrid.appendChild(card);
    });
    
    console.log(`Rendered ${projects.length} projects`);
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

// Interactive background: update glow position based on mouse
document.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }
    
    // Check if config is loaded
    if (typeof config === 'undefined') {
        console.error('Config not loaded! Make sure config.js is loaded before script.js');
        return;
    }
    
    console.log('Initializing portfolio...');
    loadPersonalInfo();
    loadProjects();
});

