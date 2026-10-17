# Potato portfolio preview

React 19, TypeScript, Tailwind CSS 4, Vite and Motion. This branch retains the Liquid Glass design and labels the profile and projects as sample content.

## Development

Use Node 22 or newer. Run `npm ci`, `npm run dev`, `npm test`, and `npm run build`. Build includes strict TypeScript checking.

## Contact and CV

Set `VITE_CONTACT_EMAIL` and an HTTPS `VITE_RESUME_URL` in `.env.local` for local builds. For Pages, set repository Actions variables with these names. They are public browser configuration, not secrets.

The contact form opens the visitor's email application; they must review and send there. It does not send messages or claim delivery. Without an address the submit button is disabled. CV and sample project URLs remain disabled until real HTTPS URLs are configured. Replace sample biography, experience, metrics, and screenshots before production use. Preview pages are marked noindex.

## GitHub Pages

The `Portfolio preview` workflow builds the `codex/portfolio-pages-preview` branch with base `/potato/`, then deploys the artifact using GitHub Pages. Other branches and pull requests only run checks. It can also be dispatched manually from the preview branch. GitHub Pages must be available for this repository/account; private repositories may require a paid GitHub plan. The workflow attempts initial Pages enablement with the workflow token. If GitHub denies it, an administrator must enable Pages with source GitHub Actions in repository Settings, then rerun the workflow.

The deployed site is public unless your GitHub plan explicitly provides private Pages access. The repository remains private. No source-branch merge is required.
