// Portfolio Configuration
// Update this file with your personal information and projects

const config = {
    // Personal Information
    personal: {
        name: "Hossein Hatami",
        title: "My Portfolio",
        description: "Building amazing things with code",
        about: "Purdue CS Student Graduating in Spring 2028. Aspiring Software Developer",
        email: "hhatamiy@gmail.com",
        github: "hhatamiy",
        linkedin: "hhatamiy"
    },
    // Skills Configuration
    skills: {
        languages: ["Python", "JavaScript", "HTML", "CSS", "SQL"],
        frameworks: ["React", "Node.js", "Express", "Django", "Flask"],
        tools: ["Git", "GitHub", "Docker", "AWS", "Azure"],
    },
    // Projects Configuration
    projects: {
        // GitHub repositories to fetch and display
        // Add your repository names here (format: "username/repo-name")
        githubRepos: [
            "hhatamiy/WCS",
            "hhatamiy/Brightspace / Canvas Grade Checker",
            "hhatamiy/soccer-rules"
        ],
        // Manual projects (sites, apps, etc. that aren't on GitHub)
        // You can add any project here with custom information
        manual: [
            // Example:
            // {
            //     name: "My Portfolio Site",
            //     description: "A beautiful portfolio website built with React and Tailwind CSS",
            //     type: "site", // "site", "app", "other"
            //     url: "https://example.com",
            //     repo: "https://github.com/username/repo", // Optional
            //     languages: ["React", "Tailwind CSS", "JavaScript"]
            // },

            {
                name: "World Cup Simulator/Predictor",
                description: "A web app that simulates the World Cup and allows users to predict the winner based on the teams' performance.",
                type: "site",
                "url": "https://worldcupsim26.vercel.app/simulator",
            },
            {
                name: "Soccer Rules",
                description: "A web app that displays the rules of soccer.",
                type: "site",
                "url": "https://soccer-rules.vercel.app/",
            },
            {
                name: "Brightspace / Canvas Grade Checker",
                description: "A web app that checks the grades of the students in the Brightspace / Canvas platform.",
                type: "extension",
                "url": "https://github.com/hhatamiy/grade-checker",
            },
        ]
    }
};

