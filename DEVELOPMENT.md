# Potato UI development

The Liquid Glass catalog follows all 66 entries in the shadcn/ui Components index reviewed on 2026-10-17. This is Potato UI source with its own API, not a drop-in shadcn distribution.

## Open the catalog

- Overview: `#/development`
- Component: `#/development/<slug>` (for example `#/development/data-table`)
- Setup: `#/development/installation`
- Tokens: `#/development/theming`
- Existing portfolio components: `#/development/website-components`

Hash routing works with GitHub Pages and reloads. Development remains lazy-loaded, keeping Radix and catalog code out of the initial portfolio bundle.

## Reuse

Install dependencies from package.json (React 19, Tailwind CSS 4, Motion, Lucide, radix-ui). Copy `components`, `hooks`, `styles`, `types`, `i18n`, `locales` and `index.css`, preserving relative imports. Wrap your application in I18nProvider and ThemeProvider. UI modules import their own styles. Every component page includes a complete TSX example, a source link, a concise API, dependencies and behavior notes. This repository is not an npm package or CLI registry.

## Module map

- `src/components/GlassButton.tsx`, `GlassCard.tsx`, `GlassUI.tsx`: existing foundation.
- `src/components/ui/controls.tsx`: form primitives and input composition.
- `src/components/ui/overlays.tsx`: Radix popups, menus, selection, toast and panels.
- `src/components/ui/data.tsx`: calendar, date picker, table, chart, carousel, pagination and resizable panels.
- `src/components/ui/content.tsx`: content, conversation and layout components.
- `src/development/catalog.ts`: documentation metadata and copyable usage examples.
- `src/development/demos.tsx`: live component demonstrations.

## Coverage

| Category | Components |
| --- | --- |
| Foundation | Aspect Ratio, Avatar, Badge, Button, Button Group, Card, Direction, Kbd, Progress, Resizable, Scroll Area, Separator, Skeleton, Spinner, Typography |
| Forms | Checkbox, Combobox, Date Picker, Field, Input, Input Group, Input OTP, Label, Native Select, Questionnaire, Radio Group, Select, Slider, Switch, Textarea, Toggle, Toggle Group |
| Navigation | Breadcrumb, Command, Menubar, Navigation Menu, Pagination, Sidebar, Tabs |
| Overlays | Alert Dialog, Context Menu, Dialog, Drawer, Dropdown Menu, Hover Card, Popover, Sheet, Toast, Tooltip |
| Data | Calendar, Carousel, Chart, Data Table, Table |
| Content | Accordion, Alert, Attachment, Bubble, Code Block, Collapsible, Empty, Item, Marker, Message, Message Scroller, Trace |

## Scope and accessibility

Radix handles keyboard/focus behavior in menus, select, dialogs, popovers, radio, checkbox, toggle, slider and toast. Native elements handle dialog, accordion, collapsible, datalist, inputs and form validation. Calendar implements day/week keyboard navigation; Resizable supports pointer and keyboard input. Static skeletons are hidden from assistive technology; containers supply loading labels. Reduced motion is supported by CSS and the existing Motion hooks.

The chart is a nonnegative bar-chart implementation with an accessible data table, not the full range of shadcn chart types. Data Table filtering/sorting/pagination is client-side. Drawer is a bottom dialog without drag-to-dismiss. Combobox uses a native datalist and permits free text. Command is a searchable action list navigated with Tab/Enter, not an application-global shortcut. OTP is a single numeric text field with paste/autofill, not a verification backend. Message/Trace/Questionnaire are reusable display/form components without an AI or server integration. Each page states these boundaries.

## Validation

Run `npm test` and `GITHUB_PAGES=true npm run build`. The catalog tests render every demo, typecheck every copyable example against actual exports, check unique routes and validate boundary cases. Existing contact tests remain in place. Browser verification should cover portal overlays, keyboard controls, clipboard, navigation, filtering and responsive layouts.

The existing preview workflow publishes `codex/portfolio-pages-preview`.
