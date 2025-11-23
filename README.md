
# Mark McDermott Portfolio/Blog

## ✨ Features

- 🎨 **6 Built-in Themes** - Light, Dark, Synthwave, Retro, Valentine, and Dim
- 📝 **6 Content Collections** - Blog, Projects, Work, Education, Hackathons, and About
- 🔒 **Type-Safe Content** - Full TypeScript support with validated schemas
- 📱 **Fully Responsive** - Mobile-first design with DaisyUI components
- ⚡ **Fast & Optimized** - Static site generation with automatic image optimization
- 🎭 **Smooth Transitions** - Page transitions using Astro's View Transitions API
- 📦 **MDX Support** - Enhanced markdown with component imports (Spotify, YouTube, Twitter)
- 🎯 **Configuration-Driven** - Customize everything through a central config file
- 🌸 **FAB Flower Menu** - Expandable floating action button for extra links
- 🎨 **Modern Stack** - Astro 5 + Tailwind CSS 4 + DaisyUI 5 + TypeScript
- 🔍 **SEO Optimized** - Meta tags, Open Graph, and semantic HTML
- ♿ **Accessible** - Built with accessibility in mind

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lauroguedes/bloomfolio.git

# Navigate to the project directory
cd bloomfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:4321` to see your portfolio!

## 📋 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |
| `npm run astro check` | Run TypeScript and Astro checks |
| `npm run astro ...` | Run Astro CLI commands |

## ⚙️ Configuration

All site configuration is centralized in `src/config.ts`. Edit this file to customize your portfolio.

### Basic Information

```typescript
export const siteConfig: SiteConfig = {
  name: "Your Name",
  title: "Your Professional Title",
  description: "Brief description of your portfolio",
  avatar: "../assets/your-avatar.png",
  location: "Your City, Country",
  email: "your@email.com",
  // ...
};
```

### Social Links

Add your social media profiles:

```typescript
socialLinks: {
  github: "https://github.com/username",
  linkedin: "https://linkedin.com/in/username",
  twitter: "https://twitter.com/username",
  bluesky: "https://bsky.app/profile/username",
  instagram: "https://instagram.com/username",
  youTube: "https://youtube.com/@username",
  codetips: "https://codetips.cloud/u/username",
}
```

### Section Visibility

Control which sections appear on your homepage:

```typescript
sections: {
  about: true,      // About section
  projects: true,   // Projects showcase
  blog: true,       // Latest blog posts (shows 3 most recent)
  work: true,       // Work experience timeline
  education: true,  // Education history
  hackathons: true, // Hackathon participation
  contact: true,    // Contact section
}
```

Set any section to `false` to hide it. The Hero section is always visible.

### Theme Settings

Choose between a theme selector dropdown or a simple light/dark toggle:

```typescript
enableThemeSelector: true  // true = dropdown with 6 themes, false = toggle
```

**Available Themes**: light, dark, synthwave, retro, valentine, dim

### Extra Links (FAB Flower)

Configure the floating action button menu:

```typescript
extraLinks: {
  enable: true,
  links: [
    { link: "/blog/guide", icon: BookOpen, label: "Guide" },
    { link: "/resume.pdf", icon: FileUser, label: "Resume" },
    // Add more links...
  ],
}
```

## 📂 Project Structure

```
bloomfolio/
├── public/              # Static assets
│   └── favicon.svg
├── src/
│   ├── assets/         # Images and media
│   │   └── bloomfolio.png
│   ├── components/     # Reusable components
│   │   ├── About.astro
│   │   ├── Blog.astro
│   │   ├── BlogCard.astro
│   │   ├── Contact.astro
│   │   ├── FabFlower.astro
│   │   ├── Hackathons.astro
│   │   ├── Hero.astro
│   │   ├── ProjectCard.astro
│   │   ├── Projects.astro
│   │   ├── SkillBadge.astro
│   │   ├── Spotify.astro
│   │   ├── ThemeSelector.astro
│   │   ├── ThemeToggle.astro
│   │   ├── Timeline.astro
│   │   ├── Twitter.astro
│   │   └── YouTube.astro
│   ├── content/        # Content collections
│   │   ├── about/     # About section (1 file)
│   │   ├── blog/      # Blog posts (.md or .mdx)
│   │   ├── education/ # Education history
│   │   ├── hackathons/# Hackathon entries
│   │   ├── projects/  # Portfolio projects
│   │   └── work/      # Work experience
│   ├── layouts/       # Page layouts
│   │   ├── Layout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/         # File-based routing
│   │   ├── index.astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   └── [...slug].astro
│   │   └── projects/
│   │       ├── index.astro
│   │       └── [...slug].astro
│   ├── styles/
│   │   └── global.css # Tailwind + DaisyUI
│   ├── config.ts      # Site configuration
│   └── content.config.ts # Content schemas
├── astro.config.mjs   # Astro configuration
├── package.json
├── tsconfig.json
└── README.md
```

## 📝 Content Management

### Creating Content

All content is stored in `src/content/` organized by type. Each content type has a specific schema.

#### Blog Posts

Create a new file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO"
image: "./featured-image.png"
publishDate: "2024-01-25"
tags: ["Tag1", "Tag2"]
---

Your content here...
```

Supports both `.md` and `.mdx` files. Use `.mdx` for rich media embeds (Spotify, YouTube, Twitter).

#### Projects

Create a new file in `src/content/projects/`:

```markdown
---
title: "Project Name"
description: "Brief description"
image: "./screenshot.png"
startDate: "2023-01-15"
endDate: "2023-06-30"  # Optional (omit for ongoing)
skills: ["React", "Node.js", "MongoDB"]
demoLink: "https://demo.example.com"  # Optional
sourceLink: "https://github.com/..."  # Optional
---

Detailed project description...
```

#### Work Experience

Create a new file in `src/content/work/`:

```markdown
---
title: "Company Name"
subtitle: "Job Title"
startDate: "2020-01-15"
endDate: "2023-06-30"  # Optional (omit for current position)
logo: "https://company-logo-url.com"  # Optional
link: "https://company-website.com"   # Optional
---

Job description and achievements...
```

For complete documentation on content creation, see the [Content Collections Guide](/blog/guides/content-collections-guide) and [Markdown Guide](/blog/guides/markdown-guide).

## 🎨 Customization

### Changing Themes

Edit `src/config.ts`:

```typescript
enableThemeSelector: true  // Dropdown with 6 themes
// OR
enableThemeSelector: false  // Simple light/dark toggle
```

### Adding Custom Styles

Add custom CSS in component `<style>` tags or extend `src/styles/global.css`:

```css
@import "tailwindcss";
@plugin "daisyui";

/* Your custom styles here */
```

### Creating New Sections

1. Create a new component in `src/components/`
2. Import and add to `src/pages/index.astro`
3. Optionally add a toggle in `src/config.ts`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

Output is generated in `dist/` directory.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/lauroguedes/bloomfolio)

1. Connect your GitHub repository
2. Vercel auto-detects Astro
3. Deploy!

### Deploy to Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `dist`

### Deploy to Cloudflare Pages

1. Connect your repository
2. Build command: `npm run build`
3. Build output directory: `dist`

### Other Platforms

Bloomfolio works with any static hosting platform that supports Node.js builds:
- GitHub Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Render
- Railway

## 🛠️ Tech Stack

- **[Astro 5](https://astro.build)** - Static site generator
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first CSS framework
- **[DaisyUI 5](https://daisyui.com)** - Component library for Tailwind
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[MDX](https://mdxjs.com/)** - Enhanced Markdown
- **[Lucide Icons](https://lucide.dev/)** - Icon library

## 📚 Documentation

- **[Complete Guide](https://bloomfolio-astro.vercel.app/blog/guides/bloomfolio-complete-guide)** - Comprehensive setup and customization guide
- **[Content Collections Guide](https://bloomfolio-astro.vercel.app/blog/guides/content-collections-guide)** - Learn about Astro Content Collections
- **[Markdown Guide](https://bloomfolio-astro.vercel.app/blog/guides/markdown-guide)** - Master Markdown and MDX syntax
- **[Astro Docs](https://docs.astro.build)** - Official Astro documentation
- **[Tailwind CSS Docs](https://tailwindcss.com/docs)** - Tailwind CSS documentation
- **[DaisyUI Docs](https://daisyui.com/docs)** - DaisyUI component documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com) and [DaisyUI](https://daisyui.com)
- Icons from [Lucide](https://lucide.dev)
- Inspired by modern portfolio designs and the developer community

## 💬 Support

- 📖 [Documentation](https://bloomfolio-astro.vercel.app/blog/guides/bloomfolio-complete-guide)
- 🐛 [Report Issues](https://github.com/lauroguedes/bloomfolio/issues)
- 💬 [Discussions](https://github.com/lauroguedes/bloomfolio/discussions)

---
Please if you find this project helpful, consider giving it a ⭐ on GitHub!

Crafted by an Artisan ⛏️ [Lauro Guedes](https://lauroguedes.dev)
