# Portfolio Website

A PSG-inspired personal portfolio. Everything you're likely to want to change
lives in one file: **`config.js`**. You don't need to know how to code (or
use AI) to update it.

## Editing your info (text)

1. Open `config.js` in any text editor (even TextEdit/Notepad works, though
   a code editor like VS Code makes it easier to avoid typos).
2. Find the section you want to change — they're labeled with comments like
   `// PERSONAL`, `// EXPERIENCE`, `// PROJECTS`, etc.
3. Edit the text between the quotes `" "`. Don't delete the quotes, commas,
   or curly braces `{ }` — just change the words inside them.
4. Save the file and refresh the page in your browser.

## Adding or changing a project screenshot/video

Each project in `config.js` has a `media` block, e.g.:

```js
media: {
    type: "image",
    src: "assets/projects/world-cup-simulator/cover.svg",
    alt: "Soccer World Cup Simulator screenshot placeholder",
},
```

**To swap the screenshot:**

1. Save your new screenshot (PNG or JPG) somewhere on your computer.
2. Put it into the matching folder, e.g. `assets/projects/world-cup-simulator/`.
   You can name it anything — a good option is `cover.png`.
3. In `config.js`, update `src` to point at the new filename, e.g.
   `"assets/projects/world-cup-simulator/cover.png"`.
4. Update `alt` to a short description of what's in the image (this is read
   aloud by screen readers, and shown if the image fails to load).

**To use a video instead of a screenshot:**

1. Put your video file (`.mp4` works everywhere) in the project's folder.
2. Change `type: "image"` to `type: "video"`.
3. Point `src` at the video file, e.g. `"assets/projects/my-project/demo.mp4"`.

## Adding a brand-new project

1. In `config.js`, find the `projects:` array.
2. Copy one whole project block — from the opening `{` to the closing `},`.
3. Paste it right below, and edit every value inside.
4. Create a new folder for its media at `assets/projects/<your-slug>/` and
   drop your screenshot/video in there, updating `media.src` to match.

There's also a commented-out example template at the bottom of the
`projects` array in `config.js` you can copy from.

## Adding your resume as a downloadable file

The "Download Resume" button is turned off until you add a resume:

1. Save your resume as a PDF.
2. Place it at `assets/resume.pdf` (that exact path, or update
   `resumeUrl` in `config.js` if you'd rather use a different filename).
3. In `config.js`, set `resumeAvailable: true`.
4. **Heads up:** most resumes list a phone number. Double check what's on
   the PDF before publishing it, since anything in `assets/` becomes
   publicly downloadable once the site is live.

## Running the site locally

```bash
npm start
```

This opens `http://localhost:8080` in your browser. Or just open
`index.html` directly in a browser — everything here is static, no build
step required.

## Deploying to GitHub Pages

```bash
git add .
git commit -m "Update portfolio"
git push
```

Then in the repo's Settings → Pages, make sure the source is set to the
`main` branch. Your site will be live at `https://<your-username>.github.io`.

## File structure

- `index.html` — page structure/sections (shouldn't need edits for content changes)
- `styles.css` — all styling (colors, fonts, layout)
- `script.js` — renders the page using the data in `config.js`
- `config.js` — **your content lives here**
- `assets/` — images, videos, favicon

## Editing the jersey stickers

The small jersey graphics pinned to the About card, Education card, and
project cards come from `sticker: { name, number }` blocks in `config.js`
(search for `sticker:`). They're original artwork generated in code — no
real photos, no official crest or sponsor logos — just a name and number
printed on a stylized kit silhouette. Edit the name/number, or delete a
`sticker` block to remove that card's sticker.

## Notes

- This design is a personal fan project inspired by Paris Saint-Germain's
  colors, crest style, and current squad — it is not affiliated with or
  endorsed by the club.
- The fleur-de-lis (⚜️) used throughout — background pattern, crest logo,
  bullet points, the "Allez Paris" stat — is the standard Unicode emoji
  character, not custom artwork. It's a generic heraldic symbol used by
  many organizations (French coats of arms, Scouting, sports teams), not
  owned by anyone. To change it, search this codebase for "⚜️" and swap
  in a different character or emoji.
- Colors and fonts are defined as CSS variables at the top of `styles.css`
  under `:root` if you want to adjust the palette.
