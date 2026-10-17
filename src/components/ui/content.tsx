import React, { useId, useRef, useState } from "react";
import { Direction } from "radix-ui";
import { ChevronRight, Download, FileText, Inbox } from "lucide-react";
import { GlassButton } from "../GlassButton";
import "./styles.css";

export function GlassAspectRatio({
  ratio = 16 / 9,
  children,
}: {
  ratio?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="g-aspect" style={{ aspectRatio: Math.max(0.1, ratio) }}>
      {children}
    </div>
  );
}
export function GlassAvatar({
  name,
  src,
  size = 48,
}: {
  name: string;
  src?: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <span
      className="g-avatar"
      role="img"
      aria-label={name}
      style={{ width: size, height: size }}
    >
      {src && !failed ? (
        <img src={src} alt="" onError={() => setFailed(true)} />
      ) : (
        name
          .split(/\s+/)
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase()
      )}
    </span>
  );
}
export function GlassBreadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="g-breadcrumb">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="g-inline">
            {i > 0 && <ChevronRight size={12} aria-hidden="true" />}
            {item.href && i !== items.length - 1 ? (
              <a href={item.href}>{item.label}</a>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
export function GlassCollapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details
      className="glass-clear"
      style={{ padding: 18, borderRadius: 14, width: "100%" }}
    >
      <summary className="g-label" style={{ cursor: "pointer" }}>
        {title}
      </summary>
      <div style={{ paddingTop: 16 }}>{children}</div>
    </details>
  );
}
export function GlassDirection({
  dir,
  children,
}: {
  dir: "ltr" | "rtl";
  children: React.ReactNode;
}) {
  return (
    <Direction.Provider dir={dir}>
      <div dir={dir} className="g-stack" style={{ width: "100%" }}>
        {children}
      </div>
    </Direction.Provider>
  );
}
export function GlassEmpty({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="g-empty">
      <Inbox size={34} className="accent-color" aria-hidden="true" />
      <h3>{title}</h3>
      <p className="g-muted">{description}</p>
      {children}
    </div>
  );
}
export function GlassItem({
  title,
  description,
  leading,
  trailing,
}: {
  title: string;
  description?: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="g-item glass-clear">
      {leading}
      <div className="g-item-main">
        <strong>{title}</strong>
        {description && <p>{description}</p>}
      </div>
      {trailing}
    </div>
  );
}
export function GlassKbd({ children }: { children: React.ReactNode }) {
  return <kbd className="g-kbd">{children}</kbd>;
}
export function GlassSeparator() {
  return <hr className="g-separator" />;
}
export function GlassScrollArea({
  label,
  children,
  height = 200,
}: {
  label: string;
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="g-scroll"
      style={{ maxHeight: height }}
    >
      {children}
    </div>
  );
}
export function GlassSkeleton({
  width = "100%",
  height = 16,
  rounded = false,
}: {
  width?: number | string;
  height?: number;
  rounded?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className="g-skeleton"
      style={{ width, height, borderRadius: rounded ? "50%" : undefined }}
    />
  );
}
export function GlassSpinner({ label = "Loading" }: { label?: string }) {
  return (
    <span role="status" aria-label={label} className="g-inline">
      <span className="g-spinner" aria-hidden="true" />
      <span className="g-muted">{label}</span>
    </span>
  );
}
export function GlassSidebar({
  title,
  items,
  activeHref,
}: {
  title: string;
  items: { label: string; href: string }[];
  activeHref: string;
}) {
  return (
    <aside className="g-sidebar glass-clear">
      <h3 className="g-label">{title}</h3>
      <nav aria-label={title}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeHref === item.href ? "page" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
export function GlassAttachment({
  name,
  meta,
  href,
}: {
  name: string;
  meta: string;
  href: string;
}) {
  return (
    <a className="g-attachment glass-clear" href={href} download={name}>
      <FileText size={22} className="accent-color" />
      <span style={{ flex: 1 }}>
        <strong className="g-label">{name}</strong>
        <span className="g-muted" style={{ display: "block" }}>
          {meta}
        </span>
      </span>
      <Download size={16} aria-label="Download" />
    </a>
  );
}
export function GlassBubble({ children }: { children: React.ReactNode }) {
  return <div className="g-bubble">{children}</div>;
}
export function GlassMarker({ children }: { children: React.ReactNode }) {
  return <mark className="g-marker">{children}</mark>;
}
export function GlassMessage({
  author,
  name,
  children,
}: {
  author: "user" | "assistant";
  name: string;
  children: React.ReactNode;
}) {
  return (
    <article
      className="g-message"
      data-author={author}
      aria-label={`Message from ${name}`}
    >
      <GlassAvatar name={name} size={32} />
      <div>
        <p className="g-muted" style={{ marginBottom: 6 }}>
          {name}
        </p>
        <GlassBubble>{children}</GlassBubble>
      </div>
    </article>
  );
}
export function GlassMessageScroller({
  children,
  label = "Conversation",
}: {
  children: React.ReactNode;
  label?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="g-stack">
      <div
        ref={ref}
        className="g-scroll g-stack"
        role="log"
        aria-label={label}
        tabIndex={0}
        style={{ maxHeight: 240 }}
      >
        {children}
      </div>
      <GlassButton
        variant="ghost"
        size="sm"
        onClick={() => {
          if (ref.current) ref.current.scrollTop = ref.current.scrollHeight;
        }}
      >
        Jump to latest ↓
      </GlassButton>
    </div>
  );
}
export function GlassCodeBlock({
  code,
  language = "tsx",
}: {
  code: string;
  language?: string;
}) {
  const [status, setStatus] = useState("");
  return (
    <div className="g-code glass-clear">
      <div className="g-code-toolbar">
        <span>{language}</span>
        <button
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(code);
              setStatus("Copied");
            } catch {
              setStatus("Select code to copy");
            }
          }}
        >
          Copy
        </button>
      </div>
      <pre tabIndex={0}>
        <code>{code}</code>
      </pre>
      <span role="status" className="g-muted">
        {status}
      </span>
    </div>
  );
}
export function GlassTrace({
  steps,
}: {
  steps: {
    title: string;
    description: string;
    status: "complete" | "running" | "pending";
  }[];
}) {
  return (
    <ol className="g-trace">
      {steps.map((step, i) => (
        <li key={i}>
          <strong>{step.title}</strong>
          <span className="g-muted"> · {step.status}</span>
          <p className="g-muted">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
export function GlassTypography({ children }: { children: React.ReactNode }) {
  return <div className="g-typography">{children}</div>;
}
export function GlassQuestionnaire({
  question,
  options,
  onSubmit,
}: {
  question: string;
  options: string[];
  onSubmit: (value: string) => void;
}) {
  const id = useId();
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  return (
    <form
      className="g-stack"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(value);
        setSubmitted(true);
      }}
    >
      <fieldset className="g-stack">
        <legend className="g-label" style={{ marginBottom: 16 }}>
          {question}
        </legend>
        {options.map((option, i) => (
          <label key={option} htmlFor={`${id}-${i}`} className="g-inline">
            <input
              id={`${id}-${i}`}
              type="radio"
              name={id}
              value={option}
              checked={value === option}
              onChange={() => {
                setValue(option);
                setSubmitted(false);
              }}
              required
            />
            {option}
          </label>
        ))}
      </fieldset>
      <GlassButton type="submit" disabled={!value}>
        Submit answer
      </GlassButton>
      <p role="status" className="g-muted">
        {submitted ? `Selected: ${value}` : ""}
      </p>
    </form>
  );
}
