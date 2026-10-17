import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Layers,
  Menu,
  Search,
  X,
} from "lucide-react";
import { PreferencesPopup } from "./components/PreferencesPopup";
import { GlassBadge } from "./components/GlassUI";
import {
  componentDocs,
  groups,
  usageCode,
  ComponentDoc,
  ComponentGroup,
} from "./development/catalog";
import { ComponentDemo } from "./development/demos";
import "./development.css";

const sourceRoot =
  "https://github.com/taxvui/potato/blob/codex/portfolio-pages-preview/src/";
const getRoute = () =>
  decodeURIComponent(
    window.location.hash.replace(/^#\/development\/?/, "").split("?")[0],
  );

function CopyCode({ code }: { code: string }) {
  const [status, setStatus] = useState("");
  useEffect(() => setStatus(""), [code]);
  return (
    <div className="dev-code">
      <div className="dev-code-heading">
        <span>React / TypeScript</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setStatus("Copied");
            } catch {
              setStatus("Select the code below to copy.");
            }
          }}
        >
          {status === "Copied" ? <Check size={14} /> : <Copy size={14} />} Copy
          code
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      <p role="status">{status}</p>
    </div>
  );
}

function ComponentPage({ doc }: { doc: ComponentDoc }) {
  const [tab, setTab] = useState<"preview" | "code">("preview");
  const [width, setWidth] = useState("100%");
  const index = componentDocs.findIndex((item) => item.slug === doc.slug);
  const isBasic =
    doc.module === "components/GlassUI" ||
    doc.module === "components/GlassButton" ||
    doc.module === "components/GlassCard";
  return (
    <>
      <div className="dev-breadcrumb">
        <a href="#/development">Components</a>
        <span>/</span>
        <span>{doc.title}</span>
      </div>
      <div className="dev-detail-title">
        <GlassBadge tone="accent">{doc.group}</GlassBadge>
        <h1>{doc.title}</h1>
        <p>{doc.description}</p>
        <div className="dev-meta">
          <span>{doc.component}</span>
          <a
            href={`${sourceRoot}${doc.module}.tsx`}
            target="_blank"
            rel="noreferrer"
          >
            Source <ExternalLink size={12} />
          </a>
          <a
            href={`https://ui.shadcn.com/docs/components/${doc.slug}`}
            target="_blank"
            rel="noreferrer"
          >
            shadcn reference <ExternalLink size={12} />
          </a>
        </div>
      </div>
      <section
        className="dev-playground glass-frosted"
        aria-label={`${doc.title} playground`}
      >
        <div className="dev-playground-toolbar">
          <div className="dev-view" role="group" aria-label="Example view">
            <button
              aria-pressed={tab === "preview"}
              onClick={() => setTab("preview")}
            >
              Preview
            </button>
            <button
              aria-pressed={tab === "code"}
              onClick={() => setTab("code")}
            >
              Code
            </button>
          </div>
          {tab === "preview" && (
            <label className="dev-width-control">
              Width
              <select
                aria-label="Preview width"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
              >
                <option value="100%">Full</option>
                <option value="640px">Tablet</option>
                <option value="340px">Mobile</option>
              </select>
            </label>
          )}
        </div>
        {tab === "preview" ? (
          <div className="dev-demo-frame">
            <div className="dev-demo-width" style={{ maxWidth: width }}>
              <ComponentDemo doc={doc} />
            </div>
          </div>
        ) : (
          <CopyCode code={usageCode(doc)} />
        )}
      </section>
      <section className="dev-doc-section">
        <h2>Usage</h2>
        <p>
          Sao chép component và các phần phụ thuộc, sau đó dùng ví dụ bên dưới
          trong dự án React.
        </p>
        <CopyCode code={usageCode(doc)} />
      </section>
      <section className="dev-doc-section">
        <h2>API & behavior</h2>
        <div className="dev-api glass-clear">
          <div>
            <span>Import</span>
            <code>{doc.module}.tsx</code>
          </div>
          <div>
            <span>Props</span>
            <code>{doc.api}</code>
          </div>
          <div>
            <span>Behavior</span>
            <p>{doc.behavior}</p>
          </div>
          <div>
            <span>Dependencies</span>
            <p>
              {isBasic
                ? "React · Motion · existing theme and device hooks"
                : "React · shared glass styles" +
                  (["Overlays", "Forms"].includes(doc.group) ||
                  doc.title === "Direction"
                    ? " · Radix primitives where used"
                    : "")}
            </p>
          </div>
        </div>
      </section>
      <aside className="dev-callout">
        <strong>Use the source, keep your design.</strong>
        <p>
          Đây là API của Potato UI. Bạn có thể chỉnh mã và CSS tokens theo dự
          án. Danh mục tham chiếu shadcn; các component không thay thế trực tiếp
          API của shadcn/ui.{" "}
          <a href="#/development/installation">Xem hướng dẫn tích hợp →</a>
        </p>
      </aside>
      <nav className="dev-page-links" aria-label="Adjacent components">
        {index > 0 ? (
          <a href={`#/development/${componentDocs[index - 1].slug}`}>
            <ArrowLeft size={14} />
            {componentDocs[index - 1].title}
          </a>
        ) : (
          <span />
        )}
        {index < componentDocs.length - 1 && (
          <a href={`#/development/${componentDocs[index + 1].slug}`}>
            {componentDocs[index + 1].title}
            <ArrowRight size={14} />
          </a>
        )}
      </nav>
    </>
  );
}

function Installation() {
  return (
    <>
      <div className="dev-breadcrumb">
        <a href="#/development">Documentation</a>
        <span>/</span>Installation
      </div>
      <div className="dev-detail-title">
        <h1>Start building.</h1>
        <p>Đưa hệ Liquid Glass vào dự án React của bạn.</p>
      </div>
      <section className="dev-doc-section">
        <h2>1. Install dependencies</h2>
        <CopyCode code="npm install react react-dom motion lucide-react radix-ui\nnpm install -D typescript @types/react @types/react-dom vite @vitejs/plugin-react tailwindcss @tailwindcss/vite" />
        <p>
          Dùng React 19 và Tailwind CSS 4 như cấu hình trong repository. Với dự
          án Vite, bật plugin React và Tailwind trong vite.config.ts.
        </p>
        <CopyCode
          code={
            'import { defineConfig } from "vite";\nimport react from "@vitejs/plugin-react";\nimport tailwindcss from "@tailwindcss/vite";\n\nexport default defineConfig({\n  plugins: [react(), tailwindcss()],\n});'
          }
        />
      </section>
      <section className="dev-doc-section">
        <h2>2. Copy the source</h2>
        <p>
          Sao chép các thư mục bên dưới từ repository, giữ nguyên đường dẫn
          tương đối. Đây là thư viện mã nguồn trong dự án, chưa phát hành gói
          npm hoặc registry CLI.
        </p>
        <CopyCode
          code={
            "src/components/          # Existing components + ui primitives\nsrc/hooks/               # Theme, device and i18n hooks\nsrc/styles/              # Accent and material definitions\nsrc/types/               # Shared TypeScript types\nsrc/i18n/                # I18n provider\nsrc/locales/             # Provider dictionaries\nsrc/index.css            # Tailwind + Liquid Glass tokens"
          }
        />
        <a
          className="dev-text-link"
          href="https://github.com/taxvui/potato/tree/codex/portfolio-pages-preview/src"
          target="_blank"
          rel="noreferrer"
        >
          Open source files ↗
        </a>
      </section>
      <section className="dev-doc-section">
        <h2>3. Add the providers</h2>
        <CopyCode
          code={
            'import { I18nProvider } from "./i18n";\nimport { ThemeProvider } from "./hooks/useTheme";\nimport { GlassButton } from "./components/GlassButton";\nimport "./index.css";\n\nexport default function App() {\n  return (\n    <I18nProvider>\n      <ThemeProvider>\n        <GlassButton>Build something beautiful</GlassButton>\n      </ThemeProvider>\n    </I18nProvider>\n  );\n}'
          }
        />
        <p>
          Các module trong components/ui tự import styles.css. Giữ glass-ui.css
          và các file CSS đi kèm khi sao chép.
        </p>
      </section>
      <section className="dev-doc-section">
        <h2>4. Compose and customize</h2>
        <p>
          Mỗi trang component có demo, mã TSX hoàn chỉnh, API, hành vi bàn phím
          và liên kết đến file nguồn. Chọn theme/màu ở góc trên để kiểm tra
          trong hệ thiết kế đang dùng.
        </p>
        <a href="#/development/theming" className="dev-text-link">
          Explore design tokens →
        </a>
      </section>
    </>
  );
}
function Theming() {
  return (
    <>
      <div className="dev-detail-title">
        <GlassBadge tone="accent">Foundation</GlassBadge>
        <h1>
          One system.
          <br />
          Your expression.
        </h1>
        <p>
          Chất liệu kính, màu sắc và typography dùng chung trên toàn website.
        </p>
      </div>
      <section className="dev-doc-section">
        <h2>Theme tokens</h2>
        <div className="dev-token-grid">
          {[
            "--accent",
            "--color-accent-subtle",
            "--accent-border",
            "--color-text-primary",
            "--glass-bg-frosted",
            "--glass-blur-md",
          ].map((token) => (
            <div className="glass-clear" key={token}>
              <span
                style={{
                  background: token.includes("blur")
                    ? "var(--glass-bg-frosted)"
                    : `var(${token})`,
                  backdropFilter: token.includes("blur")
                    ? `blur(var(${token}))`
                    : undefined,
                }}
              />
              <code>{token}</code>
            </div>
          ))}
        </div>
        <p>
          ThemeProvider áp dụng màu nhấn và class dark trên document root. Các
          popup render qua portal cũng thừa hưởng các token này.
        </p>
      </section>
      <section className="dev-doc-section">
        <h2>Material scale</h2>
        <ComponentDemo
          doc={componentDocs.find((doc) => doc.slug === "card")!}
        />
      </section>
      <section className="dev-doc-section">
        <h2>Motion & accessibility</h2>
        <p>
          Dùng focus rõ ràng, nhãn có nghĩa và nội dung thật cho trạng thái.
          Radix quản lý focus và bàn phím trong các primitive tương ứng.
          Animation tôn trọng prefers-reduced-motion; tránh dùng hover làm cách
          duy nhất để truyền đạt thông tin thiết yếu.
        </p>
      </section>
    </>
  );
}
function WebsiteComponents() {
  return (
    <>
      <div className="dev-detail-title">
        <h1>Built into the website.</h1>
        <p>Các thành phần riêng đang tạo nên portfolio hiện tại.</p>
      </div>
      <div className="dev-website-list">
        {[
          ["GlassButton", "buttons, calls to action"],
          ["GlassCard", "content surfaces and project cards"],
          ["PreferencesPopup", "language, theme and accent preferences"],
          ["GlassThemeSwitcher", "appearance controls"],
          ["GlassColorSwitcher", "accent palette"],
          ["GlassLanguageSwitcher", "language selection"],
          ["BrandLogo", "brand mark"],
          ["SocialIcon", "social network icons"],
          ["SocialLink", "social links with labels"],
          ["Section", "section layout"],
          ["BackgroundGlass3D", "ambient glass background"],
          ["GlassOrbVisual", "decorative glass composition"],
        ].map(([name, usage]) => (
          <a
            className="glass-clear"
            href={`${sourceRoot}components/${name}.tsx`}
            key={name}
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={18} />
            <div>
              <strong>{name}</strong>
              <p>{usage}</p>
            </div>
            <ExternalLink size={14} />
          </a>
        ))}
      </div>
      <aside className="dev-callout">
        <p>
          Button, Card và các controls trong PreferencesPopup được tái sử dụng
          trực tiếp. Những component mới mở rộng cùng hệ token, thay vì tạo một
          giao diện khác.
        </p>
      </aside>
    </>
  );
}

export function Development() {
  const [route, setRoute] = useState(getRoute),
    [query, setQuery] = useState(""),
    [group, setGroup] = useState<ComponentGroup | "All">("All"),
    [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const change = () => {
      setRoute(getRoute());
      setMobileOpen(false);
    };
    window.addEventListener("hashchange", change);
    return () => window.removeEventListener("hashchange", change);
  }, []);
  const selected = componentDocs.find((doc) => doc.slug === route);
  const filtered = componentDocs.filter(
    (doc) =>
      (group === "All" || doc.group === group) &&
      `${doc.title} ${doc.description} ${doc.group}`
        .toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()),
  );
  useEffect(() => {
    document.title = `${selected?.title || (route === "installation" ? "Installation" : route === "theming" ? "Theming" : "Development")} · Potato UI`;
  }, [route, selected]);
  return (
    <div className="dev-shell">
      <header className="dev-header glass-deep">
        <div className="g-inline">
          <button
            className="dev-menu-button"
            aria-label={
              mobileOpen
                ? "Close component navigation"
                : "Open component navigation"
            }
            aria-expanded={mobileOpen}
            aria-controls="dev-sidebar"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a href="#/development" className="dev-wordmark">
            <span className="dev-logo">
              <Layers size={20} />
            </span>
            Potato <strong>UI</strong>
            <span className="dev-version">66 components</span>
          </a>
        </div>
        <div className="dev-header-right">
          <a href="#hero" className="dev-home-link">
            <ArrowLeft size={14} />
            Portfolio
          </a>
          <PreferencesPopup
            id="dev-preferences"
            variant="icon-only"
            align="right"
          />
        </div>
      </header>
      {mobileOpen && (
        <button
          className="dev-nav-overlay"
          aria-label="Close component navigation"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <div className="dev-layout">
        <aside
          id="dev-sidebar"
          className={`dev-sidebar ${mobileOpen ? "is-open" : ""}`}
        >
          <div className="dev-sidebar-top">
            <a href="#/development" aria-current={!route ? "page" : undefined}>
              Overview <span>{componentDocs.length}</span>
            </a>
            <a
              href="#/development/installation"
              aria-current={route === "installation" ? "page" : undefined}
            >
              Installation
            </a>
            <a
              href="#/development/theming"
              aria-current={route === "theming" ? "page" : undefined}
            >
              Theming
            </a>
            <a
              href="#/development/website-components"
              aria-current={route === "website-components" ? "page" : undefined}
            >
              Website components
            </a>
          </div>
          <label className="dev-search">
            <Search size={15} />
            <input
              aria-label="Search components"
              placeholder="Search components…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query && (
              <button onClick={() => setQuery("")} aria-label="Clear search">
                <X size={13} />
              </button>
            )}
          </label>
          <nav aria-label="Components">
            {groups.map((category) => {
              const items = componentDocs.filter(
                (doc) =>
                  doc.group === category &&
                  `${doc.title} ${doc.description} ${doc.group}`
                    .toLocaleLowerCase()
                    .includes(query.toLocaleLowerCase()),
              );
              return (
                !!items.length && (
                  <div className="dev-nav-group" key={category}>
                    <h2>
                      {category}
                      <span>{items.length}</span>
                    </h2>
                    {items.map((doc) => (
                      <a
                        href={`#/development/${doc.slug}`}
                        key={doc.slug}
                        aria-current={route === doc.slug ? "page" : undefined}
                      >
                        {doc.title}
                      </a>
                    ))}
                  </div>
                )
              );
            })}
            {!componentDocs.some((doc) =>
              `${doc.title} ${doc.description} ${doc.group}`
                .toLocaleLowerCase()
                .includes(query.toLocaleLowerCase()),
            ) && (
              <p className="g-muted" role="status">
                No components found.
              </p>
            )}
          </nav>
          <p className="dev-sidebar-note">
            React · TypeScript · Radix
            <br />
            Liquid Glass design system
          </p>
        </aside>
        <main id="main-content" tabIndex={-1} className="dev-main">
          {selected ? (
            <ComponentPage key={selected.slug} doc={selected} />
          ) : route === "installation" ? (
            <Installation />
          ) : route === "theming" ? (
            <Theming />
          ) : route === "website-components" ? (
            <WebsiteComponents />
          ) : route ? (
            <div className="dev-detail-title">
              <h1>Component not found.</h1>
              <p>The component may have moved.</p>
              <a className="dev-text-link" href="#/development">
                Browse all components →
              </a>
            </div>
          ) : (
            <>
              <section className="dev-hero">
                <GlassBadge tone="accent">
                  LIQUID GLASS / COMPONENT LIBRARY
                </GlassBadge>
                <h1>
                  Every building block.
                  <br />
                  <span>One glass system.</span>
                </h1>
                <p>
                  66 component để thiết kế và xây dựng giao diện React. Thử
                  tương tác, xem API, sao chép mã và tùy biến theo phong cách
                  của bạn.
                </p>
                <div className="dev-hero-actions">
                  <a
                    className="dev-primary-link"
                    href="#/development/installation"
                  >
                    Start building <ArrowRight size={15} />
                  </a>
                  <a href="#/development/button">Explore components ↗</a>
                </div>
                <div className="dev-stats">
                  <div>
                    <strong>{componentDocs.length}</strong>
                    <span>Components</span>
                  </div>
                  <div>
                    <strong>6</strong>
                    <span>Categories</span>
                  </div>
                  <div>
                    <strong>5</strong>
                    <span>Glass materials</span>
                  </div>
                  <div>
                    <strong>Light / Dark</strong>
                    <span>Shared theme tokens</span>
                  </div>
                </div>
              </section>
              <div className="dev-catalog-heading">
                <div>
                  <h2>All components</h2>
                  <p>
                    Mỗi mục có trang tài liệu, demo thực và mã TSX sử dụng được.
                  </p>
                </div>
                <span>
                  {filtered.length} / {componentDocs.length}
                </span>
              </div>
              <div
                className="dev-filters"
                role="group"
                aria-label="Filter by category"
              >
                {(["All", ...groups] as const).map((category) => (
                  <button
                    key={category}
                    aria-pressed={group === category}
                    onClick={() => setGroup(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
              <div className="dev-component-grid">
                {filtered.map((doc, index) => (
                  <a
                    key={doc.slug}
                    href={`#/development/${doc.slug}`}
                    className="dev-component-tile glass-clear"
                  >
                    <div
                      className={`dev-tile-visual dev-visual-${doc.group.toLowerCase()}`}
                      aria-hidden="true"
                    >
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="dev-tile-label">
                      <h3>{doc.title}</h3>
                      <ArrowRight size={14} />
                    </div>
                    <p>{doc.description}</p>
                    <span className="dev-tile-category">{doc.group}</span>
                  </a>
                ))}
              </div>
              {!filtered.length && (
                <div className="dev-no-results" role="status">
                  Không tìm thấy component. Thử từ khóa khác hoặc chọn All.
                </div>
              )}
              <aside className="dev-callout">
                <strong>
                  Inspired by the shadcn catalog. Styled for Potato.
                </strong>
                <p>
                  Danh mục đối chiếu 66 mục tại{" "}
                  <a
                    href="https://ui.shadcn.com/docs/components"
                    target="_blank"
                    rel="noreferrer"
                  >
                    shadcn/ui Components ↗
                  </a>
                  . Đây là mã nguồn và API riêng của Potato UI, với hành vi và
                  phạm vi hỗ trợ ghi rõ ở từng trang.
                </p>
              </aside>
            </>
          )}
          <footer className="dev-footer">
            <a href="#/development">Potato UI</a>
            <span>Designed in glass. Built to be yours.</span>
            <a
              href="https://github.com/taxvui/potato/tree/codex/portfolio-pages-preview"
              target="_blank"
              rel="noreferrer"
            >
              Source ↗
            </a>
          </footer>
        </main>
      </div>
    </div>
  );
}
