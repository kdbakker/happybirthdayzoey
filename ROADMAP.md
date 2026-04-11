# Happy Birthday Card — Roadmap

## Status Key
- 🟡 In progress
- 🔴 Not started
- ~~Strikethrough~~ = complete

---

## Current Milestone: Working birthday page with static text and 3D styling

What we're building toward right now: a deployable page that shows styled 3D "Happy Birthday [NAME]" text. Tasks here are in sequence — complete them in order, top to bottom.

- 🟡 Stage 1 — HTML skeleton: `index.html` with "Happy Birthday [NAME]" as static placeholder text, linked to empty `css/styles.css` and `js/main.js`
- 🟡 Stage 2 — 3D text styling: CSS `text-shadow` layering and/or `transform: perspective()` to give the text a convincing 3D look; full-screen centred layout, mobile-first
- 🟡 Stage 3 — URL param personalisation: `js/main.js` reads `?name=` from the URL and writes it into the page; falls back to "Friend" if absent
- 🔴 Stage 4 — Spin animation: clicking the text triggers a CSS keyframe spin; JS adds/removes a class to drive it

---

## Up Next

- Add a confetti burst on page load (CSS-only or lightweight JS library)
- Colour theme variants selectable via a second URL param (e.g. `?theme=gold`)
- Subtle entrance animation so text flies in on first load
- `og:image` / social meta tags so link previews look nice when shared

---

## Done

---

## Backlog

- Keyboard accessibility: make the spin triggerable via Enter/Space on the text element
- Reduced-motion media query — disable or soften animations for users who prefer it
- Design system page (`/ds/index.html`) once visual language is settled
- Consider a share button that copies the personalised URL to clipboard
- Favicon and page `<title>` personalised with the recipient's name
