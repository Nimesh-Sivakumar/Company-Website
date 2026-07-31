# Cabinet Creation Co. — Website

Multi-page marketing site for **Cabinet Creation Co.**, a custom cabinetry and interior fit-out studio serving Kuala Lumpur & Selangor, Malaysia.

**Live:** https://nimesh-sivakumar.github.io/Company-Website/

## Stack

- **Next.js 15** (App Router) with static export (`output: "export"`)
- **TypeScript**
- **Tailwind CSS v4** — brand palette and fonts defined in `app/globals.css`
- **Fonts:** Fraunces (display), Inter (body), Space Mono (labels) via `next/font`

## Pages

| Route | Contents |
| --- | --- |
| `/` | Hero, studio intro, stats, differentiators, collections, selected work, sintered stone spotlight, auto-scrolling process, testimonials, FAQ, CTA |
| `/services` | The six collections in detail plus the six-step process |
| `/portfolio` | Four recent projects with scope tags |
| `/about` | Studio story, stats, how we work, FAQ |
| `/contact` | Studio details and the quote request form |

Copy, imagery and project data live in `lib/content.ts` — edit there to update the site.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build    # static export to ./out
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_BASE_PATH` | Path prefix for GitHub Pages (`/Company-Website`). Leave unset locally. |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Form-forwarding endpoint (e.g. a Formspree URL) for the quote form. When unset, the form shows a preview confirmation and sends nothing. |

## Deployment

`.github/workflows/deploy.yml` builds the static export and publishes it to GitHub Pages on every push to `main`.

Two one-time settings in the repo:

1. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
2. **Settings → Secrets and variables → Actions → Variables:** add `NEXT_PUBLIC_FORM_ENDPOINT` to receive real enquiries.
