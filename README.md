# ARCH34 — каркас справочника и редакторской системы

This branch is a staging copy of the public ARCH34 repository. It contains the first multi-page SPA shell for the archaeology reference site and the Decap Turbo editorial panel.

- Eight top-level navigation items with active-route highlighting, including the archaeology news section.
- Separate routes for the periods and cultural-historical communities.
- Page text can be filled through the `Страницы справочника` CMS collection; empty areas keep `<!-- CONTENT: ... -->` placeholders.
- Direct page URLs resolve through the Netlify SPA fallback.
- Editors select the destination site section for each article. Published articles appear in their selected chronology section or in the news section.

Netlify build command: node build.mjs
Published folder: dist

The production site is published to `arch34science.ru` through GitHub Pages. The Netlify preview project is kept for checking changes before launch.
