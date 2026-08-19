// ============================================================================
// PORTFOLIO CONTENT — edit this file to change what shows up on the site.
// You do NOT need to touch index.html, styles.css, or script.js to update
// your info, add a project, or swap a screenshot. Just edit the values below.
//
// Quick guide:
//   - Anything in "quotes" is text you can freely rewrite.
//   - Arrays (things inside [ ]) are lists — copy/paste a block to add
//     another entry, or delete a block to remove one.
//   - To swap a project screenshot/video, replace the file at the path in
//     `media.src` (or point `media.src` at a new file). See README.md.
//   - `sticker: { name, number }` blocks render a small jersey-sticker
//     graphic (original artwork, not a real photo) in a card's corner.
//     Edit the name/number, or delete the block to remove the sticker.
// ============================================================================

const config = {
  // --------------------------------------------------------------------
  // PERSONAL
  // --------------------------------------------------------------------
  personal: {
    name: "Hossein Hatami",
    // Shown as a jersey-style number badge next to your name in the hero.
    // Purely a fun visual flourish — change the number or delete its usage
    // in index.html if you'd rather not have it.
    squadNumber: "10",
    role: "Computer Science Student @ Purdue University",
    tagline:
      "Security-minded software engineer with a Management minor from Purdue. Based in the Bay Area, usually one tab away from a PSG match.",
    location: "San Carlos, CA",
    graduation: "Expected May 2028",
    email: "hhatamiy@gmail.com",
    github: "hhatamiy",
    linkedin: "hhatamiy",
    // Set to true once you've added your own resume PDF at assets/resume.pdf
    // (left out by default since resumes usually list a phone number you
    // may not want published on a public site).
    resumeAvailable: true,
    resumeUrl: "assets/resume.pdf",
  },

  // --------------------------------------------------------------------
  // ABOUT / PLAYER PROFILE
  // --------------------------------------------------------------------
  about: {
    bio: [
      "I'm a junior at Purdue University studying Computer Science with a minor in Management, graduating in May 2028.",
      "This past summer I worked as a Security Analyst intern at Cloudflare, shipping a production threat-intelligence pipeline. Before that, I built frontend and analytics features at Rose.ai and Jamiez LLC.",
      "Outside of that: two-time intramural team captain, Secretary of the Persian Cultural Center, and a member of Purdue ARC's Rocket League Autonomy team — plus a fairly committed Paris Saint-Germain habit.",
    ],
    attributes: [
      { label: "Position", value: "Full-Stack / Security" },
      { label: "Club", value: "Purdue University" },
      { label: "Squad", value: "Class of 2028" },
      { label: "Languages", value: "English, Farsi, Spanish" },
    ],
    // Shown as a small jersey sticker pinned to the corner of the About
    // card. Change the name/number, or delete this whole object to remove
    // the sticker from this card.
    sticker: { name: "DEMBÉLÉ", number: 10 },
  },

  // --------------------------------------------------------------------
  // EDUCATION
  // --------------------------------------------------------------------
  education: {
    school: "Purdue University",
    location: "West Lafayette, IN",
    degree: "B.S. in Computer Science, Minor in Management",
    graduation: "Expected May 2028",
    coursework: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Computer Architecture",
    ],
    extracurriculars: [
      "Intramural Sports — Two-time Team Captain",
      "Persian Cultural Center — Secretary",
      "SWANA-affiliated — Information Team Member",
      "Purdue ARC — Rocket League Autonomy Team Member",
    ],
    sticker: { name: "DOUÉ", number: 14 },
  },

  // --------------------------------------------------------------------
  // EXPERIENCE — most recent first. Each entry renders as one row in the
  // "lineup"; the badge number is auto-generated (counts up from your
  // oldest role to your newest, like caps earned over a career), so you
  // don't need to set it manually.
  // --------------------------------------------------------------------
  experience: [
    {
      role: "Security Analyst",
      org: "Cloudflare",
      type: "Internship",
      start: "May 2026",
      end: "August 2026",
      bullets: [
        "Designed and shipped a production Python threat-intelligence pipeline ingesting public research from 6 sources and extracting 1,000+ malicious-domain indicators for analyst review.",
        "Designed an extensible feed adapter and registry system supporting RSS, REST, GitHub, JSON, and HTML sources while minimizing feed-specific implementation.",
        "Implemented safety controls to prevent false positives, duplicate submissions, compromised websites, and unsafe writes to shared infrastructure.",
        "Deployed containerized workloads to staging and production using Docker, Kubernetes CronJobs, Helmfile, Vault, and GitLab CI/CD.",
        "Built incremental processing, automated tests, monitoring, and outage alerting, improving pipeline reliability and preventing silent feed failures.",
      ],
    },
    {
      role: "AI and Analytics SWE",
      org: "Rose.ai",
      type: "Internship",
      start: "June 2025",
      end: "August 2025",
      bullets: [
        "Integrated PostHog analytics into the website frontend, enabling user behavior tracking and insights.",
        "Implemented secure authentication workflows for a Chrome extension, improving reliability and user trust.",
      ],
    },
    {
      role: "Software Engineer",
      org: "Jamiez LLC",
      type: "Internship",
      start: "May 2025",
      end: "August 2025",
      bullets: [
        "Developed frontend features for the Jamiez app, improving usability and responsiveness.",
        "Connected customer service requests to a backend database, streamlining support workflows.",
      ],
    },
  ],

  // --------------------------------------------------------------------
  // PROJECTS
  // Each project gets a media slot (screenshot or video) — see README.md
  // for exactly how to swap those files.
  //
  // media.type: "image" or "video"
  // media.src:  path to the file (put files in assets/projects/<slug>/)
  //
  // status: omit for a normal live project. Set to "archived" for a
  // project you're no longer running/paying for — it shows an "Archived"
  // badge and the card links to the repo instead of the (likely dead)
  // live URL.
  //
  // To add a new project, copy one whole { ... } block below (including
  // the surrounding commas) and edit the values.
  // --------------------------------------------------------------------
  projects: [
    {
      slug: "world-cup-simulator",
      name: "Soccer World Cup Simulator & Predictor",
      dates: "November 2025 – January 2026",
      description:
        "A web platform that let users simulate and predict World Cup matches, powered by a backend that computed custom probability and odds models for each matchup.",
      tags: ["Web App", "Probability Modeling", "JavaScript"],
      // Backend was taken down to stop the hosting cost — see the repo
      // for the code instead of a live demo.
      status: "archived",
      links: {
        live: "https://worldcupsim26.vercel.app/simulator",
        repo: "https://github.com/hhatamiy/WCS",
      },
      media: {
        type: "image",
        src: "assets/projects/world-cup-simulator/cover.jpg",
        alt: "Soccer World Cup Simulator group stage screen",
      },
      // Jersey sticker pinned to this card's corner — change name/number,
      // or delete this object to fall back to a plain corner accent.
      sticker: { name: "VITINHA", number: 17 },
    },
    {
      slug: "soccer-rules",
      name: "Soccer Rules Website",
      dates: "April – May 2025",
      description:
        "An educational website explaining soccer's rules in depth, with interactive scenario-based examples and in-site quizzes designed for a clean, engaging learning experience.",
      tags: ["Education", "UI/UX", "JavaScript"],
      links: {
        live: "https://soccer-rules.vercel.app/",
        repo: "",
      },
      media: {
        type: "image",
        src: "assets/projects/soccer-rules/cover.jpg",
        alt: "Soccer Rules Explained homepage",
      },
      sticker: { name: "HAKIMI", number: 2 },
    },
    {
      slug: "grade-checker",
      name: "Brightspace / Canvas Grade Checker",
      dates: "",
      description:
        "A browser extension that checks and surfaces student grades from the Brightspace and Canvas platforms.",
      tags: ["Browser Extension", "JavaScript", "Automation"],
      links: {
        live: "",
        repo: "https://github.com/hhatamiy/grade-checker",
      },
      media: {
        type: "image",
        src: "assets/projects/grade-checker/cover.svg",
        alt: "Brightspace / Canvas Grade Checker screenshot placeholder",
      },
      sticker: { name: "MARQUINHOS", number: 5 },
    },

    // Example of a not-yet-live project, and a video instead of an image —
    // copy this block to add your own. Just delete the leading "//" on
    // each line (or copy the block fresh) once you're ready to use it.
    // {
    //   slug: "my-next-project",
    //   name: "My Next Project",
    //   dates: "Month Year – Month Year",
    //   description: "One or two sentences about what it does.",
    //   tags: ["Tag One", "Tag Two"],
    //   links: { live: "https://example.com", repo: "https://github.com/hhatamiy/repo" },
    //   media: {
    //     type: "video",
    //     src: "assets/projects/my-next-project/demo.mp4",
    //     alt: "Demo of my next project",
    //   },
    //   sticker: { name: "PLAYER NAME", number: 9 },
    // },
  ],

  // --------------------------------------------------------------------
  // SKILLS
  // --------------------------------------------------------------------
  skills: {
    Languages: ["C", "C++", "Java", "JavaScript", "Python"],
    Frameworks: ["React", "Next.js"],
    Databases: ["MongoDB", "Supabase"],
    "Machine Learning": ["PyTorch", "Stable-Baselines"],
    DevOps: ["Docker", "Kubernetes", "Vault", "GitLab CI/CD", "Vercel", "Railway"],
    Tools: ["Git", "GitHub"],
  },
};
