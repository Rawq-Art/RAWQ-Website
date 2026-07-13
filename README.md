# RAWQ-Website

Source of [rawq.art](https://rawq.art) — رَوْق، دار تنسيق العيش (RAWQ — The House of Curated Living).

## Structure

- `public/` — the website files, served by Firebase Hosting
  - `index.html` — homepage (Arabic-first, with English toggle)
  - `terms.html` — Terms & Conditions
  - `internal-policy.html` — House Policy
- `firebase.json` / `.firebaserc` — Firebase Hosting configuration (project `rawq-website`)

## Deployment

Merging to `main` automatically deploys `public/` to Firebase Hosting (rawq.art) via
`.github/workflows/deploy.yml`.

This requires a repository secret named `FIREBASE_SERVICE_ACCOUNT_RAWQ_WEBSITE`
containing a Firebase service-account JSON key for the `rawq-website` project
(GitHub repo → Settings → Secrets and variables → Actions).
