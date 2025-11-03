# Churn Documentation

Official documentation site for Churn - a local-first AI code analysis tool.

Built with [Fumadocs](https://fumadocs.dev) and styled with Churn's vibrant red (#ff5656) brand color.

## Getting Started

### Prerequisites

- Bun 1.x or Node.js 18+
- Git

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the documentation site.

### Build for Cloudflare Pages

```bash
# Build with next-on-pages adapter
bun run pages:build

# Preview locally
bun run preview
```

The build output will be in `.vercel/output/static/` directory.

## Deployment

This site is configured for Cloudflare Pages using `@cloudflare/next-on-pages` adapter, which enables full Next.js features (SSR, API routes, etc.) on Cloudflare's edge network.

### Deploy to Cloudflare Pages

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete instructions on deploying to Cloudflare Pages.

**Quick deploy via CLI:**

```bash
# Build and deploy
bun run pages:build
bun run deploy
```

**Quick deploy via Dashboard:**

1. Push to GitHub
2. Connect repository to Cloudflare Pages
3. Set build command: `npx @cloudflare/next-on-pages@1`
4. Set output directory: `.vercel/output/static`
5. Add environment variable: `NODE_VERSION=20`
6. Enable compatibility flag: `nodejs_compat`
7. Deploy!

Your site will be live at `https://churn-docs.pages.dev`

## Project Structure

```
churn-docs/
├── app/                    # Next.js app directory
│   ├── docs/              # Documentation pages layout
│   ├── layout.tsx         # Root layout with Fumadocs provider
│   ├── page.tsx           # Homepage
│   └── global.css         # Global styles with Churn theme
├── content/               # MDX documentation content
│   └── docs/              # All documentation pages
│       ├── getting-started/
│       ├── core-features/
│       └── ...
├── lib/                   # Utility functions
│   └── source.ts          # Fumadocs source configuration
├── next.config.mjs        # Next.js configuration
├── tailwind.config.js     # Tailwind + Fumadocs preset
├── tsconfig.json          # TypeScript configuration
└── source.config.ts       # Fumadocs MDX configuration
```

## Theming

The site uses Churn's brand color **#ff5656** (vibrant red) as the primary theme color.

### Color Configuration

Colors are defined in `app/global.css` using CSS custom properties:

```css
:root {
  --color-fd-primary: 0 100% 67%; /* #ff5656 in HSL */
  /* ... other theme variables */
}
```

### Dark Mode

Dark mode is fully supported and automatically switches based on system preferences. Dark mode colors are defined in the `.dark` class selector.

## Adding Documentation

### Create a New Page

1. Create an MDX file in `content/docs/`:

```mdx
---
title: Your Page Title
description: Your page description
---

# Your Page Title

Your content here...
```

2. Update the `meta.json` file in the relevant directory to add your page to the navigation.

### Navigation Structure

Navigation is defined in `meta.json` files throughout the `content/docs/` directory:

```json
{
  "title": "Section Title",
  "pages": ["page-1", "page-2", "subsection"]
}
```

## Documentation Content

The site includes comprehensive documentation based on `docs.md`:

- **Getting Started**: Installation, quick start, basic concepts
- **Core Features**: Analysis modes, AI providers, interactive review
- **CLI Reference**: All available commands
- **Configuration**: Config files, environment variables
- **Ollama**: Local model setup and usage
- **Performance**: Optimization tips and benchmarks
- **Architecture**: Technical details and design
- **Workflows**: Common usage patterns
- **Development**: Contributing guide
- **Troubleshooting**: Common issues and solutions
- **API Reference**: Programmatic usage
- **Integration Guides**: CI/CD, hooks, IDE integration

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org) with App Router
- **Documentation**: [Fumadocs](https://fumadocs.dev)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Content**: MDX (Markdown + JSX)
- **Runtime**: Bun 1.x

## Related Links

- [Churn GitHub Repository](https://github.com/cloudboy-jh/churn2.0)
- [Fumadocs Documentation](https://fumadocs.dev)
- [Next.js Documentation](https://nextjs.org/docs)

## License

Documentation content is part of the Churn project (MIT License).
