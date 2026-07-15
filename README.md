# Dreamy Denz

Website for Dreamy Denz — kids' party rentals (bounce houses, soft play, balloon arches) based in Lava Hot Springs, ID.

## Running locally

This is a static site, no build step required.

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## Deploying with GitHub Pages

1. Push this repo to GitHub (already done if you're reading this on github.com).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. Save. The site will be published at `https://<username>.github.io/<repo-name>/`.

## Before this goes live

Search the codebase for `FILL IN` — a few placeholders still need real info:

- Phone number and email (in `index.html`, contact section)
- Facebook / Instagram links
- Owner/family name for the About section
- Weather / cancellation / deposit policy (FAQ section)
- Theme sticker pricing
- Real photos to replace the placeholder gallery blocks
