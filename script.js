// ============================================================================
// Renders the page from config.js. You shouldn't need to edit this file to
// update content — see config.js instead.
// ============================================================================

(function () {
    "use strict";

    const cfg = typeof config !== "undefined" ? config : null;
    if (!cfg) {
        console.error("config.js failed to load — check that it's included before script.js.");
        return;
    }

    const $ = (id) => document.getElementById(id);

    function escapeXML(str) {
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Original jersey-sticker artwork — a simplified, hand-drawn jersey
    // silhouette printed with a player's real name/number. No official
    // crest, sponsor logos, or player photos are used, just kit colors.
    function jerseySticker(sticker) {
        if (!sticker) return "";
        const name = escapeXML((sticker.name || "").toUpperCase());
        const number = escapeXML(String(sticker.number != null ? sticker.number : ""));
        // Longer names need a smaller font to stay within the jersey's
        // printed width instead of spilling past its edges.
        const nameFontSize = name.length > 9 ? 6.5 : name.length > 7 ? 7.5 : 9;
        return `
            <svg viewBox="0 0 90 104" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 20 L1 14 L4 40 L18 33 Z" fill="#0a1a44" stroke="#c9a24b" stroke-width="1"/>
                <path d="M75 20 L89 14 L86 40 L72 33 Z" fill="#0a1a44" stroke="#c9a24b" stroke-width="1"/>
                <path d="M18 33 L14 19 Q45 6 76 19 L72 33 L69 100 L21 100 Z" fill="#0a1a44" stroke="#c9a24b" stroke-width="1.5"/>
                <path d="M38 19 L52 19 L49.5 100 L40.5 100 Z" fill="#e31934"/>
                <path d="M36 17 Q45 27 54 17" fill="none" stroke="#c9a24b" stroke-width="2"/>
                <text x="45" y="52" text-anchor="middle" font-family="Inter, sans-serif" font-weight="700" font-size="${nameFontSize}" letter-spacing="0.5" fill="#f8f9fc">${name}</text>
                <text x="45" y="90" text-anchor="middle" font-family="Anton, sans-serif" font-size="30" fill="#f8f9fc">${number}</text>
            </svg>`;
    }

    // ---------------------------------------------------------------
    // HERO
    // ---------------------------------------------------------------
    function renderHero() {
        $("hero-name-text").textContent = cfg.personal.name;
        $("hero-squad-number").textContent = cfg.personal.squadNumber || "";
        $("hero-role").textContent = cfg.personal.role;
        $("hero-tagline").textContent = cfg.personal.tagline;
        document.title = `${cfg.personal.name} — Portfolio`;

        const resumeLink = $("hero-resume-link");
        if (cfg.personal.resumeAvailable) {
            resumeLink.href = cfg.personal.resumeUrl;
            resumeLink.setAttribute("target", "_blank");
            resumeLink.setAttribute("rel", "noopener noreferrer");
        } else {
            resumeLink.setAttribute("aria-disabled", "true");
            resumeLink.href = "#contact";
            resumeLink.textContent = "Resume Coming Soon";
        }
    }

    // ---------------------------------------------------------------
    // STAT STRIP
    // ---------------------------------------------------------------
    function renderStats() {
        $("stat-internships").textContent = cfg.experience.length;
        $("stat-projects").textContent = cfg.projects.length;
        const gradMatch = (cfg.personal.graduation || "").match(/\d{4}/);
        $("stat-gradyear").textContent = gradMatch ? gradMatch[0] : "—";
    }

    // ---------------------------------------------------------------
    // ABOUT
    // ---------------------------------------------------------------
    function renderAbout() {
        const textEl = $("about-text");
        cfg.about.bio.forEach((paragraph) => {
            const p = document.createElement("p");
            p.textContent = paragraph;
            textEl.appendChild(p);
        });

        const attrsEl = $("about-attributes");
        cfg.about.attributes.forEach((attr) => {
            const row = document.createElement("div");
            const dt = document.createElement("dt");
            dt.textContent = attr.label;
            const dd = document.createElement("dd");
            dd.textContent = attr.value;
            row.appendChild(dt);
            row.appendChild(dd);
            attrsEl.appendChild(row);
        });

        const stickerEl = $("about-sticker");
        if (cfg.about.sticker) {
            stickerEl.innerHTML = jerseySticker(cfg.about.sticker);
        }
    }

    // ---------------------------------------------------------------
    // EXPERIENCE / LINEUP
    // `experience` is listed most-recent-first, so the badge counts up
    // from the oldest role (Cap 1) to the newest — like caps earned over
    // a career — instead of an arbitrary jersey number.
    // ---------------------------------------------------------------
    function renderExperience() {
        const list = $("experience-list");
        const total = cfg.experience.length;
        cfg.experience.forEach((job, index) => {
            const item = document.createElement("article");
            item.className = "lineup-item reveal";

            const number = document.createElement("div");
            number.className = "lineup-number";
            const numberValue = document.createElement("span");
            numberValue.className = "lineup-number-value";
            numberValue.textContent = total - index;
            const numberLabel = document.createElement("span");
            numberLabel.className = "lineup-number-label";
            numberLabel.textContent = "Cap";
            number.appendChild(numberValue);
            number.appendChild(numberLabel);

            const body = document.createElement("div");

            const header = document.createElement("div");
            header.className = "lineup-header";

            const roleGroup = document.createElement("div");
            const role = document.createElement("span");
            role.className = "lineup-role";
            role.textContent = job.role + " — ";
            const org = document.createElement("span");
            org.className = "lineup-org";
            org.textContent = job.org;
            roleGroup.appendChild(role);
            roleGroup.appendChild(org);

            const dates = document.createElement("span");
            dates.className = "lineup-dates";
            dates.textContent = `${job.start} – ${job.end}`;

            header.appendChild(roleGroup);
            header.appendChild(dates);

            const bullets = document.createElement("ul");
            bullets.className = "lineup-bullets";
            job.bullets.forEach((bullet) => {
                const li = document.createElement("li");
                li.textContent = bullet;
                bullets.appendChild(li);
            });

            body.appendChild(header);
            body.appendChild(bullets);
            item.appendChild(number);
            item.appendChild(body);
            list.appendChild(item);
        });
    }

    // ---------------------------------------------------------------
    // PROJECTS
    // ---------------------------------------------------------------
    function renderProjects() {
        const grid = $("projects-grid");
        cfg.projects.forEach((project, index) => {
            const card = document.createElement("article");
            card.className = "project-card reveal";

            const media = document.createElement("div");
            media.className = "project-media";

            let mediaEl;
            if (project.media && project.media.type === "video") {
                mediaEl = document.createElement("video");
                mediaEl.src = project.media.src;
                mediaEl.setAttribute("controls", "");
                mediaEl.setAttribute("muted", "");
                mediaEl.setAttribute("playsinline", "");
            } else if (project.media) {
                mediaEl = document.createElement("img");
                mediaEl.src = project.media.src;
                mediaEl.alt = project.media.alt || project.name;
                mediaEl.loading = "lazy";
            }
            if (mediaEl) media.appendChild(mediaEl);

            let badge = null;
            if (project.sticker) {
                badge = document.createElement("div");
                badge.className = "jersey-sticker" + (index % 2 === 1 ? " jersey-sticker--left" : "");
                badge.setAttribute("aria-hidden", "true");
                badge.innerHTML = jerseySticker(project.sticker);
            }

            const body = document.createElement("div");
            body.className = "project-body";

            const header = document.createElement("div");
            header.className = "project-header";
            const nameGroup = document.createElement("div");
            nameGroup.className = "project-name-group";
            const name = document.createElement("h3");
            name.className = "project-name";
            name.textContent = project.name;
            nameGroup.appendChild(name);
            if (project.status === "archived") {
                const statusBadge = document.createElement("span");
                statusBadge.className = "project-status";
                statusBadge.textContent = "Archived";
                nameGroup.appendChild(statusBadge);
            }
            const dates = document.createElement("span");
            dates.className = "project-dates";
            dates.textContent = project.dates || "";
            header.appendChild(nameGroup);
            header.appendChild(dates);

            const desc = document.createElement("p");
            desc.className = "project-description";
            desc.textContent = project.description;

            const tagList = document.createElement("ul");
            tagList.className = "tag-list";
            (project.tags || []).forEach((tag) => {
                const li = document.createElement("li");
                li.className = "tag";
                li.textContent = tag;
                tagList.appendChild(li);
            });

            const links = document.createElement("div");
            links.className = "project-links";
            // Archived projects skip the (likely dead) live link and lead
            // with the repo instead.
            if (project.status !== "archived" && project.links && project.links.live) {
                const live = document.createElement("a");
                live.href = project.links.live;
                live.target = "_blank";
                live.rel = "noopener noreferrer";
                live.textContent = "Live Site ↗";
                links.appendChild(live);
            }
            if (project.links && project.links.repo) {
                const repo = document.createElement("a");
                repo.href = project.links.repo;
                repo.target = "_blank";
                repo.rel = "noopener noreferrer";
                repo.textContent = "Source ↗";
                links.appendChild(repo);
            }

            body.appendChild(header);
            body.appendChild(desc);
            body.appendChild(tagList);
            body.appendChild(links);

            card.appendChild(media);
            if (badge) card.appendChild(badge);
            card.appendChild(body);
            grid.appendChild(card);
        });
    }

    // ---------------------------------------------------------------
    // SKILLS
    // ---------------------------------------------------------------
    function renderSkills() {
        const grid = $("skills-grid");
        Object.entries(cfg.skills).forEach(([category, items]) => {
            const group = document.createElement("div");
            group.className = "skill-group reveal";

            const heading = document.createElement("h3");
            heading.textContent = category;

            const list = document.createElement("ul");
            list.className = "tag-list";
            items.forEach((item) => {
                const li = document.createElement("li");
                li.className = "tag";
                li.textContent = item;
                list.appendChild(li);
            });

            group.appendChild(heading);
            group.appendChild(list);
            grid.appendChild(group);
        });
    }

    // ---------------------------------------------------------------
    // EDUCATION
    // ---------------------------------------------------------------
    function renderEducation() {
        const edu = cfg.education;
        $("edu-school").textContent = edu.school;
        $("edu-degree").textContent = edu.degree;
        $("edu-grad").textContent = edu.graduation;

        const coursework = $("edu-coursework");
        edu.coursework.forEach((course) => {
            const li = document.createElement("li");
            li.className = "tag";
            li.textContent = course;
            coursework.appendChild(li);
        });

        const extracurriculars = $("edu-extracurriculars");
        edu.extracurriculars.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            extracurriculars.appendChild(li);
        });

        const stickerEl = $("education-sticker");
        if (edu.sticker) {
            stickerEl.innerHTML = jerseySticker(edu.sticker);
        }
    }

    // ---------------------------------------------------------------
    // CONTACT
    // ---------------------------------------------------------------
    function renderContact() {
        $("contact-email").href = `mailto:${cfg.personal.email}`;
        $("contact-github").href = `https://github.com/${cfg.personal.github}`;
        $("contact-linkedin").href = `https://linkedin.com/in/${cfg.personal.linkedin}`;
        $("contact-location").textContent = cfg.personal.location;
        $("footer-name").textContent = cfg.personal.name;
        $("current-year").textContent = new Date().getFullYear();
    }

    // ---------------------------------------------------------------
    // NAV TOGGLE (mobile)
    // ---------------------------------------------------------------
    function setupNavToggle() {
        const toggle = $("nav-toggle");
        const links = $("nav-links");
        toggle.addEventListener("click", () => {
            const isOpen = links.classList.toggle("is-open");
            toggle.classList.toggle("is-open", isOpen);
            toggle.setAttribute("aria-expanded", String(isOpen));
        });
        links.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                links.classList.remove("is-open");
                toggle.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    // ---------------------------------------------------------------
    // SCROLL REVEAL
    // ---------------------------------------------------------------
    function setupScrollReveal() {
        const targets = document.querySelectorAll(".reveal");
        if (!("IntersectionObserver" in window) || targets.length === 0) {
            targets.forEach((t) => t.classList.add("is-visible"));
            return;
        }
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        targets.forEach((t) => observer.observe(t));
    }

    // ---------------------------------------------------------------
    // INIT
    // ---------------------------------------------------------------
    document.addEventListener("DOMContentLoaded", () => {
        renderHero();
        renderStats();
        renderAbout();
        renderExperience();
        renderProjects();
        renderSkills();
        renderEducation();
        renderContact();
        setupNavToggle();
        setupScrollReveal();
    });
})();
