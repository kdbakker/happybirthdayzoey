# Happy Birthday Card

A simple, customisable 3D text birthday wish. Share a link, get a birthday card.

---

## How it works

Open the page with a `?name=` query parameter and the recipient's name appears in large 3D text. Click the text to make it spin.

```
https://your-site.netlify.app/?name=Zoey
```

If no name is provided, it falls back to "Friend".

---

## Setup

No build step required — this is a plain static site.

1. Clone the repo
2. Open `index.html` in a browser, or serve it locally with any static file server:
   ```
   npx serve .
   ```
3. Add `?name=YourName` to the URL to test personalisation

---

## File Structure

```
/
├── CLAUDE.md               # Claude Code instructions
├── ROADMAP.md              # Feature roadmap and task backlog
├── README.md               # This file
├── netlify.toml            # Netlify deploy config and security headers
├── index.html              # Single HTML entry point
├── css/
│   └── styles.css          # All styles (3D transforms, layout, animation)
└── js/
    └── main.js             # URL param parsing and click/spin logic
```

---

## Deployment

Deployed on **Netlify** as a static site with no build step.

- Push to `main` to trigger an automatic deploy
- Publish directory: `.` (repo root)
- Config: `netlify.toml`
