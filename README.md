# markmcdermott.io

Personal portfolio and blog site built with Astro, Tailwind CSS 4, and DaisyUI.

## Tech Stack

- [Astro 5](https://astro.build) - Static site generator
- [Tailwind CSS 4](https://tailwindcss.com) - Utility-first CSS
- [DaisyUI 5](https://daisyui.com) - Tailwind component library
- [MDX](https://mdxjs.com/) - Markdown with components
- [Keen Slider](https://keen-slider.io/) - Project gallery carousel

## Development

```bash
# Install dependencies
pnpm install

# Start dev server (localhost:4321)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Run tests
pnpm test
```

## Project Structure

```
src/
├── assets/        # Images and static assets
├── components/    # Astro components
├── content/       # Blog posts and content (MDX)
├── layouts/       # Page layouts
├── pages/         # File-based routing
└── styles/        # Global CSS
```

## Deployment

Built site outputs to `./dist/`. Deployed to Cloudflare Pages
