# Portfolio maintenance

## Content and sharing

Contact details now come from the published Sanity `pageInfo` document. Empty contact fields are hidden. The form still opens an email draft; it does not send mail from a server.

The PageInfo schema adds optional **Public website URL**, **Search description**, and **Social preview image** fields. Restart/rebuild the Studio to expose these fields, then publish the document. Existing content works without migration: the description falls back to the biography and the preview image to the hero/profile image.

Set the public HTTPS homepage URL in Sanity, or set `NEXT_PUBLIC_SITE_URL` in the hosting environment before building. This enables absolute canonical and Open Graph URLs. No deployment domain is assumed. Preview images are requested from Sanity at 1200 × 630.

Each project has a `/projects/<Sanity document ID>` page with its own title, summary, image, and sharing metadata. These stable URLs do not require new project fields.

## Published content refresh

The homepage and project pages use `revalidate: 60`. After the cached page becomes 60 seconds old, a request triggers background regeneration; that request may receive the previous page, and subsequent requests receive the refreshed page. This is request-driven, not a scheduled update or an immediate publishing webhook.

New project URLs render on their first request using blocking fallback. Missing/deleted projects return 404; cached project pages can remain visible until regeneration completes. Sanity queries bypass its CDN to read published changes. If fetching fails, Next.js retains the last successfully generated page.

Deploy with a Next.js server (`yarn build` then `yarn start`) or a host supporting ISR. Static export does not support this behavior. See [Next.js ISR documentation](https://nextjs.org/docs/pages/guides/incremental-static-regeneration).

With the current Next.js 12 configuration, development and production share `.next`. Stop `yarn dev` before building or running the production preview, then stop that preview before restarting development. Concurrent servers can overwrite each other's route manifests and cause false 404s or rendering failures.

## Framework upgrade plan

The requested upgrade is planned here; the dependency migration has not been performed. The current site runs Next.js 12.3.7, React 18.3.1, TypeScript 4.9.5, and `next-sanity` 2.x. The separate Studio runs Sanity 2 with React 17.

Target the latest patched **Next.js 16.x**, which is Active LTS as checked on 2026-09-14. Version 12 is unsupported. Verify the [support policy](https://nextjs.org/support-policy) and current patch release when implementing.

1. Record the working production build and use an isolated upgrade branch. Keep the Pages Router initially; retain the existing API routes, `getStaticProps`, project paths, and ISR behavior.
2. Standardize local, CI, and hosting on a supported Node LTS satisfying Node 20.9+. The local Node 24 runtime meets the minimum. Update TypeScript to at least 5.1, and update React, React DOM, and their types together after checking package compatibility.
3. Resolve `next-sanity` first: installed 2.x declares Next 12/13 peers. Upgrade to a compatible release or replace this site's small fetch wrapper with `@sanity/client`. Verify image URLs and published-content queries. Plan Studio migration separately because it has its own dependency tree and schemas.
4. Upgrade Next.js and its ESLint configuration together. Review the intermediate major-version guides. Replace legacy `Link` children with the supported link syntax, remove obsolete `swcMinify`, and replace `next lint` with an explicit ESLint command/configuration. Check Framer Motion, social icons, and the typewriter against the selected React version.
5. Move standard images to the supported Next Image API, preserving Sanity cropping, descriptive alternatives, sizes, and lazy loading. Configure the Sanity image host. Refresh the outdated Browserslist database.
6. Run lint, type checking, and production build separately. Verify direct project navigation, unknown-project 404s, metadata, contact validation, mobile layouts, keyboard navigation, reduced motion, and ISR after a controlled staging content update. Deploy to preview before production; retain the previous deployment for rollback.

See the [Next.js 16 upgrade guide](https://nextjs.org/docs/app/guides/upgrading/version-16) for runtime, compiler, and tooling changes.

## Verification

Run `yarn lint`, `yarn tsc --noEmit`, and `yarn build`. After the build, run `node --test tests/production.test.mjs` to verify generated metadata, published contact values, accessible server-rendered markup, and ISR configuration for every project. These checks read build output and do not modify Sanity content.

Browser checks covered 320px and 375px phone widths and a 1280px desktop width, form errors and focus, image descriptions, and project navigation. Publishing-to-refresh behavior should additionally be exercised with a staging Sanity document; no production content was changed for testing. Standard-image lint warnings and the outdated Browserslist database remain tracked in the upgrade plan.

The production server also returned 200 for the homepage and all nine current project URLs, and 404 for an unknown project. The Sanity Studio production build passed with the new PageInfo fields.
