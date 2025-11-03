# Deploying Churn Docs to Cloudflare Pages

This guide walks you through deploying the Churn documentation site to Cloudflare Pages using `@cloudflare/next-on-pages`.

## Prerequisites

- A Cloudflare account
- GitHub account with this repository
- Git repository pushed to GitHub

## About Next.js on Cloudflare Pages

This project uses `@cloudflare/next-on-pages` to deploy Next.js applications to Cloudflare Pages. This adapter allows the full Next.js application (including SSR, API routes, etc.) to run on Cloudflare's edge network.

## Deployment Methods

### Method 1: Deploy via Cloudflare Dashboard (Recommended)

#### Step 1: Push to GitHub

If you haven't already, push your code to GitHub:

```bash
cd churn-docs
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/churn-docs.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages** in the sidebar
3. Click **Create application**
4. Select the **Pages** tab
5. Click **Connect to Git**
6. Authorize Cloudflare to access your GitHub account
7. Select your `churn-docs` repository

#### Step 3: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Framework preset** | Next.js |
| **Build command** | `npx @cloudflare/next-on-pages@1` |
| **Build output directory** | `.vercel/output/static` |
| **Root directory** | `/` (leave empty) |

**Environment Variables:**

Add these in the Cloudflare Dashboard under **Settings** → **Environment variables**:

| Variable | Value |
|----------|-------|
| `NODE_VERSION` | `20` |
| `SKIP_DEPENDENCY_INSTALL` | `true` |

#### Step 4: Configure Compatibility Flags

After deployment, go to **Settings** → **Functions**:

1. Add compatibility flag: `nodejs_compat`
2. Save changes

#### Step 5: Deploy

1. Click **Save and Deploy**
2. Cloudflare will build and deploy your site
3. Your site will be available at `https://churn-docs.pages.dev`

### Method 2: Deploy via Wrangler CLI

#### Prerequisites

Wrangler is already installed as a dev dependency.

#### Step 1: Build the Site

```bash
cd churn-docs
bun run build
```

This will:
1. Run `next build` to create the Next.js build
2. Transform it with `@cloudflare/next-on-pages`
3. Output to `.vercel/output/static`

#### Step 2: Preview Locally

Test the Cloudflare Pages build locally:

```bash
bun run preview
```

Visit `http://localhost:8788` to test.

#### Step 3: Deploy

```bash
bun run deploy
# or
wrangler pages deploy
```

Follow the prompts to authenticate and configure your project.

## Build Configuration Details

### Next.js Configuration

The `next.config.mjs` is configured for SSR (no static export):

```javascript
const config = {
  reactStrictMode: true,
};
```

### Cloudflare Configuration

The `wrangler.toml` file configures Cloudflare Pages:

```toml
name = "churn-docs"
compatibility_date = "2025-01-01"
compatibility_flags = ["nodejs_compat"]

pages_build_output_dir = ".vercel/output/static"
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next-on-pages",
    "preview": "wrangler pages dev",
    "deploy": "wrangler pages deploy"
  }
}
```

## Automatic Deployments

Once connected to Git, Cloudflare Pages will automatically:

- **Deploy on push**: Every push to `main` triggers a production deployment
- **Preview deployments**: Pull requests get preview URLs automatically
- **Branch deployments**: Configure branch patterns for staging environments

## Troubleshooting

### Build Fails with "Module not found"

If the build fails on Cloudflare:

1. Ensure `NODE_VERSION` is set to `20` or higher
2. Check that all dependencies are in `package.json`
3. Try building locally first: `bun run build`
4. Check build logs for specific error messages

### Runtime Errors

If you see runtime errors after deployment:

1. Verify `nodejs_compat` compatibility flag is enabled
2. Check that you're using Edge-compatible APIs only
3. Review the [next-on-pages documentation](https://github.com/cloudflare/next-on-pages/tree/main/packages/next-on-pages)

### 500 Errors

If pages return 500 errors:

1. Check the **Functions** tab in Cloudflare Dashboard for error logs
2. Ensure compatibility flags are set correctly
3. Verify all API routes use Edge Runtime

### Styling Issues

If styles don't load correctly:

1. Clear Cloudflare cache in Dashboard
2. Rebuild and redeploy
3. Check that `@tailwindcss/postcss` is installed
4. Verify `postcss.config.js` is correct

## Performance Optimization

### Cloudflare Features

Enable these in your Cloudflare Dashboard:

1. **Auto Minify**: HTML, CSS, JavaScript minification
2. **Brotli Compression**: Better compression than gzip  
3. **HTTP/3**: Faster page loads
4. **Early Hints**: Preload critical resources

### Caching

Cloudflare automatically caches static assets. Configure cache rules:

1. Go to **Caching** → **Cache Rules**
2. Set up custom rules for different content types
3. Configure TTLs for optimal performance

## Monitoring

### Real-time Logs

View real-time logs:

```bash
wrangler pages deployment tail
```

### Analytics

Cloudflare provides free analytics:

1. Go to your Pages project
2. Click **Analytics**
3. View requests, bandwidth, errors, and more

### Web Analytics (Optional)

Enable privacy-first analytics:

1. Go to **Web Analytics** in Cloudflare Dashboard
2. Add your site
3. Insert the tracking script in `app/layout.tsx`

## Custom Domain

### Add a Custom Domain

1. In your Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `docs.churn.com`)
4. If the domain is on Cloudflare, it will auto-configure DNS
5. If external, follow DNS configuration instructions
6. Wait for SSL certificate issuance (usually < 5 minutes)

## Rollbacks

To rollback to a previous deployment:

1. Go to your Pages project
2. Click **Deployments**
3. Find the working deployment
4. Click **⋯** → **Rollback to this deployment**

## Environment Variables

### Adding Variables

1. Go to **Settings** → **Environment variables**
2. Add variables for **Production** and/or **Preview** environments
3. Click **Save**
4. Trigger a new deployment to apply changes

### Common Variables

```
NODE_VERSION=20
NEXT_PUBLIC_SITE_URL=https://docs.churn.com
```

## Advanced Configuration

### Edge Runtime

To ensure compatibility with Cloudflare Pages, use Edge Runtime in API routes:

```typescript
export const runtime = 'edge';
```

### Middleware

Middleware runs on every request. Keep it lightweight:

```typescript
// middleware.ts
export const config = {
  matcher: '/docs/:path*',
};
```

## Limitations

### Next.js Features Not Supported

- Incremental Static Regeneration (ISR)
- On-Demand Revalidation
- Image Optimization (use Cloudflare Images instead)
- Internationalization (i18n) routing

See the [next-on-pages supported features](https://github.com/cloudflare/next-on-pages/blob/main/packages/next-on-pages/docs/supported.md) for details.

## Local Development

### Development Server

```bash
bun run dev
```

### Preview Production Build

```bash
bun run build
bun run preview
```

## Additional Resources

- [@cloudflare/next-on-pages Documentation](https://github.com/cloudflare/next-on-pages)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare](https://developers.cloudflare.com/pages/framework-guides/nextjs/)
- [Fumadocs Documentation](https://fumadocs.dev)

## Support

If you encounter issues:

1. Check [next-on-pages GitHub Issues](https://github.com/cloudflare/next-on-pages/issues)
2. Review [Cloudflare Community](https://community.cloudflare.com/)
3. Open an issue in the Churn Docs repository

---

**Note**: This project uses the Edge Runtime compatible with Cloudflare Workers. Ensure all dependencies and APIs used are compatible with the Edge Runtime.
