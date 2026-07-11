# Finwave Forex

A single-page marketing website built with plain HTML, CSS, and JavaScript.

## 🔗 Live link

**https://kunaldsoni.github.io/FinwaveForex/**

> The live link is served via GitHub Pages. If it 404s, enable Pages in the repo:
> **Settings → Pages → Build and deployment → Source: `Deploy from a branch` → Branch: `main` / `/ (root)` → Save.**

## Pages / Sections

The site is a single page (`index.html`) with the following in-page sections, reachable from the top navigation:

| Section | Anchor |
|---|---|
| Home / Intro | `#intro` |
| Product Overview | `#product` |
| Features | `#features` |
| Integrations | `#integrations` |
| Pricing | `#pricing` |
| Customers | `#customers` |
| Company | `#company` |
| Technology | `#technology` |
| Blog | `#blog` |
| Contact | `#contact` |
| Privacy Policy | `#privacy` |

## Project structure

```
.
├── index.html    # Page markup and content
├── styles.css    # Styling
└── script.js     # Interactions
```

## Running locally

No build step required — it's a static site. Open the file directly:

```bash
open index.html
```

Or serve it over a local web server (recommended, so relative paths and anchors behave):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Tech

- HTML5
- CSS3
- Vanilla JavaScript
