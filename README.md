# Portfolio Website

A modern, responsive portfolio website that automatically fetches and displays your GitHub repositories and custom projects.

## Features

- 🎨 Modern, clean design with smooth animations
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔄 Automatically fetches GitHub repository data via API
- ⚙️ Easy configuration via `config.js`
- 🚀 Ready for GitHub Pages deployment

## Setup Instructions

### 1. Configure Your Personal Information

Edit `config.js` and update the `personal` object with your information:

```javascript
personal: {
    name: "Hossein",
    title: "Software Developer",
    description: "Building amazing things with code",
    about: "Purdue CS Student Graduating in Spring 2028. Aspiring Software Developer",
    email: "hhatamiy@gmail.com",
    github: "hhatamiy",
    linkedin: "hhatamiy"
}
```

### 2. Add Your Projects

#### Adding GitHub Repositories

In `config.js`, add your repository names to the `githubRepos` array:

```javascript
githubRepos: [
    "yourusername/repo-name",
    "yourusername/another-repo"
]
```

The script will automatically fetch repository information including:
- Description
- Stars and forks count
- Programming languages
- Links to repository and homepage (if available)

#### Adding Manual Projects (Sites, Apps, etc.)

Add projects that aren't on GitHub to the `manual` array:

```javascript
manual: [
    {
        name: "My Portfolio Site",
        description: "A beautiful portfolio website",
        type: "site", // "site", "app", or "other"
        url: "https://example.com",
        repo: "https://github.com/username/repo", // Optional
        languages: ["React", "JavaScript", "CSS"]
    }
]
```

### 3. Run Locally

You can preview your portfolio locally before deploying. Here are several options:

#### Option 1: Using npm (Recommended)

1. Run the local server:
   ```bash
   npm start
   ```
   This will automatically open your browser at `http://localhost:8080`

   Or just start the server without opening:
   ```bash
   npm run serve
   ```

#### Option 2: Using Python

If you have Python installed:

**Python 3:**
```bash
python3 -m http.server 8080
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8080
```

Then open `http://localhost:8080` in your browser.

#### Option 3: Using Node.js http-server

If you have Node.js installed but don't want to use npm scripts:
```bash
npx http-server -p 8080 -o
```

#### Option 4: Using VS Code Live Server

If you use VS Code, install the "Live Server" extension and right-click on `index.html` → "Open with Live Server"

#### Option 5: Direct File Open (Limited)

You can open `index.html` directly in your browser, but note:
- GitHub API requests may fail due to CORS restrictions
- Some features may not work properly
- **Recommended**: Use one of the server options above

### 4. Deploy to GitHub Pages

1. Commit and push your changes:
   ```bash
   git add .
   git commit -m "Add portfolio website"
   git push
   ```

2. Go to your repository settings on GitHub
3. Navigate to "Pages" in the left sidebar
4. Under "Source", select the branch (usually `main` or `master`)
5. Your site will be available at `https://yourusername.github.io`

## File Structure

- `index.html` - Main HTML structure
- `styles.css` - All styling and responsive design
- `script.js` - JavaScript for fetching GitHub data and rendering projects
- `config.js` - Configuration file for personal info and projects

## Customization

- **Colors**: Edit the CSS variables in `styles.css` (`:root` section)
- **Layout**: Modify the HTML structure in `index.html`
- **Styling**: Update `styles.css` to match your preferences

## Notes

- GitHub API has rate limits (60 requests/hour for unauthenticated requests)
- If you have many repositories, consider using a GitHub Personal Access Token
- The site works entirely client-side - no backend required
