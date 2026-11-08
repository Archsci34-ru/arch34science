# ARCH34 — тестовый каркас справочника и редакторской системы

This branch is a staging copy of the public ARCH34 repository. It contains the first multi-page SPA shell for the archaeology reference site and the Decap Turbo editorial panel.

- Seven top-level navigation items with active-route highlighting.
- Separate routes for the periods and cultural-historical communities.
- Page text can be filled through the `Страницы справочника` CMS collection; empty areas keep `<!-- CONTENT: ... -->` placeholders.
- Direct page URLs resolve through the Netlify SPA fallback.
- The existing sample articles collection remains available.

Netlify build command: node build.mjs
Published folder: dist

This staging branch is intended for preview only. Do not change the live GitHub Pages branch or domain settings until the owner approves the final launch.
