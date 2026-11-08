# ARCH34 — каркас справочника и редакторской системы

This branch is a staging copy of the public ARCH34 repository. It contains the first multi-page SPA shell for the archaeology reference site and the Decap Turbo editorial panel.

- Eight top-level navigation items with active-route highlighting, including the archaeology news section.
- Separate routes for the periods and cultural-historical communities.
- Page text can be filled through the `Страницы справочника` CMS collection; empty areas keep `<!-- CONTENT: ... -->` placeholders.
- Direct page URLs resolve through the Netlify SPA fallback.
- Editors select the destination site section for each article. Published articles appear in their selected chronology section or in the news section.

Netlify build command: node build.mjs
Published folder: dist

This branch is intended for preview before launch. The live `main` branch and `arch34science.ru` domain remain unchanged until launch is ready.
