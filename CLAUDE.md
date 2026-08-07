# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Static marketing site for Dreamy Denz, a kids' party rental business (bounce houses, soft play, slides) in Lava Hot Springs, ID. Plain HTML/CSS/JS, no framework, no build step, no package manager. Deployed via GitHub Pages with a custom domain (`www.dreamydenz.org`, set via the `CNAME` file) on DNS hosted at Squarespace.

## Commands

There is no build, lint, or test tooling in this repo — it's hand-written static HTML/CSS/JS served as-is.

Run locally:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`. A matching launch config for this exists at `.claude/launch.json` (`dreamy-denz-site`).

**Local dev caching gotcha:** the browser aggressively caches `css/style.css` and the HTML files across reloads and even new tabs/server restarts — a plain reload after editing CSS/HTML will often still show old content. Verify changes with a hard refresh, an incognito window, or a cache-busted query string (`?cb=1`) rather than trusting a normal reload.

## Architecture

**Two pages, no templating.** `index.html` (home) and `rentals.html` (rental package details) are independent HTML files — there's no shared partial/include system, so the `<header>` nav and `<footer>` are duplicated in both. Any nav/footer change must be made in both files by hand. Links between them use the appropriate form: `index.html` uses local `#anchor` links for its own sections; `rentals.html` links back with `index.html#anchor`.

**Shared assets:** `css/style.css` (single stylesheet, no preprocessor) and `js/main.js` (vanilla JS, no dependencies) are both loaded by both pages. Theme colors/spacing live as CSS custom properties in `:root` at the top of `style.css` — that's the source of truth for the palette. Fonts (Fredoka for headings, Nunito for body) are loaded from Google Fonts via a `<link>` in each page's `<head>`.

**Reusable accordion pattern:** `js/main.js` wires up `.faq-item` / `.faq-q` / `.faq-a` click-to-toggle behavior once, generically, for every matching element in the DOM. Despite the class names, this isn't FAQ-specific — it's reused for all the spec accordions (Dimensions, Pricing, Set Up/Take Down, etc.) inside each rental block on `rentals.html`. Any new expandable section should reuse these same classes rather than writing new JS.

**Package cards ↔ rental sections are ID-coupled.** The 4 package cards in `index.html#packages` are `<a>` tags linking to `rentals.html#<id>`, where `<id>` matches the `id` on a `<section class="rental-item" id="...">` block in `rentals.html` (`deluxe`, `dreamy-denz`, `giant`, `royal`). Renaming a package's anchor id requires updating it in both places. The card icons (`.card-img img`) intentionally reuse the same black-and-white line-art "diagram" images (`images/rentals/*-diagram.png`) shown on the rentals page for that package, deliberately oversized via CSS (`.card-img img{height:155px}` inside a `130px` box, `overflow:visible`) so the illustration pops out of its colored frame — this is a deliberate design choice, not a bug, if it comes up again.

**Booking, payment, and contracts are fully externalized to Dubsado**, not built in this repo. `index.html#contact` embeds a live Dubsado form via `<iframe>` (plus the `iframe-resizer` library from a CDN to auto-size the height). This repo only contains the iframe `src` URL — the form's fields, and its custom CSS theming to match the site's look, are configured entirely inside Dubsado's own dashboard and aren't version-controlled here. `rentals.html`'s closing `#contact` section is just a CTA banner linking back to `index.html#contact`, not a second copy of the form.

**Images:** `images/gallery/` and `images/rentals/` hold processed, web-sized photos actually used by the site. `images/hero.jpg`, `images/about.jpg`, and `images/logo.png` are page-level assets. Raw/unprocessed source photos and video live in `Media/`, which is gitignored (large — hundreds of MB) and should never be committed; only pull optimized copies into `images/` when adding new photos.
