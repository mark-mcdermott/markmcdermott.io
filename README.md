# Mark McDermott --- Portfolio

Personal portfolio site built with Astro.\
This repository contains the source code for
**https://markmcdermott.io**, where I showcase selected software
projects, technical writing, and UI experiments.

------------------------------------------------------------------------

## Overview

The goal of this site is to provide a fast, minimal, and content-focused
portfolio that highlights real, working applications rather than static
screenshots. It is designed to be easy to maintain, accessible, and
performant.

------------------------------------------------------------------------

## Tech Stack

-   Framework: Astro\
-   Styling: Sass (no Tailwind for a more handmade feel)\
-   Content: Astro Content Collections (Markdown)\
-   Testing: Playwright end-to-end tests\
-   CI: CircleCI\
-   Deployment: Cloudflare Pages

------------------------------------------------------------------------

## Project Structure

``` text
/
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable UI components
│   ├── content/       # Markdown content (projects, posts)
│   ├── layouts/       # Page layouts
│   ├── pages/         # Route-based pages
│   └── styles/        # Global styles
├── tests/             # Playwright tests
└── astro.config.mjs
```

------------------------------------------------------------------------

## Development

All commands are run from the project root.

``` bash
pnpm install      # Install dependencies
pnpm dev          # Start local dev server (localhost:4321)
pnpm build        # Build production site to dist/
pnpm preview      # Preview production build
pnpm test         # Run Playwright tests
```

------------------------------------------------------------------------

## Content Workflow

Project pages and posts are written in Markdown and stored in:

``` text
src/content/
```

Each entry uses frontmatter for metadata:

``` md
---
title: "Project Title"
description: "Short summary"
date: 2026-01-01
tags: ["astro", "playwright"]
---
```

Content is automatically routed and rendered using shared layouts.

------------------------------------------------------------------------

## Featured Projects

-   Xin --- Desktop note-taking and lightweight CMS\
-   Puravida --- Bash script oneliner combining touch, mkdir and other stuff

Additional projects will be added as they reach a stable,
production-ready state.

------------------------------------------------------------------------

## Testing

Playwright tests cover:

-   Core page loading
-   Navigation
-   Theme toggle functionality

Tests run locally and in CI.

------------------------------------------------------------------------

## Design Goals

-   Minimal JavaScript by default\
-   Strong performance and accessibility scores\
-   Clear typography and spacing\
-   Maintainable, readable codebase\
-   Fast content publishing workflow

------------------------------------------------------------------------

## Contact

Website: https://markmcdermott.io\
Email: hello@markmcdermott.io\
GitHub: https://github.com/mark-mcdermott

------------------------------------------------------------------------

## License

MIT
