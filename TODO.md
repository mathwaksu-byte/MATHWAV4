# SEO CMS and Content Automation Plan

## Phase 1 — Admin CMS
- [x] Extend Blogs form: title, slug, category, excerpt, og_image_url, published_at, active
- [x] Confirm Blog table has fields; add migration if missing
- [x] Extend Settings form: default_title, default_description, default_og_image_url, twitter_card_type

## Phase 2 — Client Dynamic Blog
- [x] Add route `app/routes/blog.$slug.tsx` rendering blog from API
- [x] Switch blog hub to API list with categories and excerpts
- [x] Generate meta/OG/Twitter from blog data with Settings fallback
- [x] Add JSON-LD Article and Breadcrumbs to blog pages

## Phase 3 — Sitemap & Robots
- [x] Include all published blogs in `sitemap.xml` via API
- [x] Keep universities and static pages included

## Phase 4 — Internal Linking
 - [x] Link pillar and guides to related posts
 - [x] Link university pages to relevant guides and posts

## Phase 5 — Content Publishing
- [x] Enable scheduling and OG uploads in blog forms
- [ ] Publish 1–2 posts weekly targeting Indian student intent
- [ ] Initial topics: NEET/NMC/FMGE, Visa documents & timeline, Fees, Living in Bishkek
- [ ] Add university spotlights and deep dives

## Phase 6 — Backlink Outreach
- [x] Create Backlinks admin resource to manage outreach status
- [ ] Prepare outreach pack (press note, partner blurb, URLs)
- [ ] Build list of edu directories, portals, reputable news/blogs
- [ ] Contact schedule; track status and update status in Backlinks
- [ ] Record published links; avoid low‑quality schemes

## Phase 7 — Performance & Caching
- [x] Add Cache-Control headers to public API endpoints
- [ ] Keep text headline above the fold; defer heavy media
- [ ] Use `public, max-age` for non‑sensitive SSR responses

## Phase 8 — Monitoring
- [ ] Set up Google Search Console on production domain
- [ ] Add analytics; track SERP, coverage, and backlinks

### Acceptance Criteria
- Admin can create/publish blog/guides without code changes
- New posts appear on blog hub and in sitemap automatically
- Blog pages have correct meta, OG/Twitter, and JSON‑LD
- Internal links connect pillar, guides, and universities
- Outreach tracked; backlinks start appearing

Pending your approval to execute these phases.
