# Potato UI development

Open `#/development` from the portfolio navigation. Hash routing supports GitHub Pages and direct reloads without server rewrites. Development is loaded in a separate JavaScript/CSS chunk.

The catalog renders the actual GlassButton and GlassCard used in the portfolio. The header renders the existing PreferencesPopup. New primitives live in `src/components/GlassUI.tsx` with styles in `glass-ui.css`.

## Reuse

This is source code, not an npm package or a shadcn registry. Use React 19, TypeScript, Tailwind CSS 4, motion and lucide-react as declared in package.json. Copy components and their relative dependencies (`hooks`, `styles`, `types`, `i18n`, `locales`) and import `src/index.css`. Wrap the application in I18nProvider and ThemeProvider as shown in App.tsx. GlassUI imports its own stylesheet.

```tsx
import { useState } from 'react';
import { GlassCard } from './components/GlassCard';
import { GlassSwitch, GlassInput } from './components/GlassUI';

export function Settings() {
  const [enabled, setEnabled] = useState(true);
  return <GlassCard>
    <label>Email<GlassInput type="email" required /></label>
    <GlassSwitch label="Notifications" checked={enabled} onCheckedChange={setEnabled} />
  </GlassCard>;
}
```

## Component API

| Component | Props |
| --- | --- |
| GlassButton | variant: primary / secondary / glass / ghost / outline; size: sm / md / lg; isLoading; disabled; iconLeft; iconRight; native motion button props |
| GlassCard | level: clear / frosted / crystal / deep / liquid; interactive; tilt; glare; reveal; padding: none / sm / md / lg; motion div props |
| GlassInput / GlassTextarea / GlassSelect | Native HTML props, including id, name, required, disabled, aria-invalid and aria-describedby; associate visible labels |
| GlassBadge | tone: neutral / accent / success; children |
| GlassSwitch | checked: boolean; onCheckedChange: (boolean) => void; label: string; disabled?: boolean |
| GlassTabs | items: { label: string; content: ReactNode }[]; provide at least one item |
| GlassAccordion | items: { title: string; content: ReactNode }[] |
| GlassDialog | trigger: string; title: string; children: ReactNode |
| GlassAlert | title: string; children: ReactNode; static informational note |
| GlassProgress | value: number (clamped 0–100); label: string |

Tabs use roving focus with arrows/Home/End. Dialog uses native showModal for focus trapping, Escape dismissal and focus restoration. Accordion and Select use native keyboard behavior. Motion on Switch is disabled for reduced-motion preferences. Use semantic labels and real text for statuses.

Theme values are inherited from the existing CSS custom properties: `--accent`, `--accent-subtle`, `--accent-border`, `--color-text-primary`, `--glass-bg-frosted`, `--glass-blur-md`, and the glass material classes. Keep these dependencies when copying code.

Run `npm test` and `GITHUB_PAGES=true npm run build` before publishing. The existing preview workflow deploys the `codex/portfolio-pages-preview` branch.
