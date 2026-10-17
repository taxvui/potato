import React, { useEffect, useId, useRef, useState } from "react";
import { ArrowDownUp, ChevronLeft, ChevronRight } from "lucide-react";
import { GlassButton } from "../GlassButton";
import { GlassInput } from "../GlassUI";
import { GlassPopover } from "./overlays";
import "./styles.css";

export function GlassPagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const total = Math.max(1, totalPages);
  const pages = Array.from({ length: total }, (_, i) => i + 1).filter(
    (n) => n === 1 || n === total || Math.abs(n - page) <= 1,
  );
  return (
    <nav className="g-pagination" aria-label="Pagination">
      <button
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((n, i) => (
        <React.Fragment key={n}>
          {i > 0 && n - pages[i - 1] > 1 && <span aria-hidden="true">…</span>}
          <button
            aria-label={`Page ${n}`}
            aria-current={page === n ? "page" : undefined}
            onClick={() => onPageChange(n)}
          >
            {n}
          </button>
        </React.Fragment>
      ))}
      <button
        disabled={page >= total}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
export type GlassColumn = { key: string; label: string };
export type GlassRow = Record<string, string | number>;
export function GlassTable({
  columns,
  rows,
  caption,
}: {
  columns: GlassColumn[];
  rows: GlassRow[];
  caption: string;
}) {
  return (
    <div className="g-table-wrap">
      <table className="g-table">
        <caption
          className="g-muted"
          style={{ captionSide: "bottom", padding: 12 }}
        >
          {caption}
        </caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {columns.map((column) => (
                <td key={column.key}>{row[column.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function GlassDataTable({
  columns,
  rows,
  caption,
  pageSize = 4,
}: {
  columns: GlassColumn[];
  rows: GlassRow[];
  caption: string;
  pageSize?: number;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<{ key: string; direction: number } | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const filtered = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLocaleLowerCase().includes(query.toLocaleLowerCase()),
    ),
  );
  const sorted = sort
    ? [...filtered].sort((a, b) => {
        const av = a[sort.key],
          bv = b[sort.key];
        return (
          (typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv))) * sort.direction
        );
      })
    : filtered;
  const size = Math.max(1, pageSize),
    total = Math.max(1, Math.ceil(sorted.length / size)),
    current = Math.min(page, total);
  return (
    <div className="g-stack">
      <GlassInput
        aria-label="Filter table"
        placeholder="Filter all columns…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setPage(1);
        }}
      />
      <div className="g-table-wrap">
        <table className="g-table">
          <caption
            className="g-muted"
            style={{ captionSide: "bottom", padding: 12 }}
          >
            {caption} · {filtered.length} results
          </caption>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  aria-sort={
                    sort?.key === column.key
                      ? sort.direction === 1
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                >
                  <button
                    onClick={() => {
                      setSort({
                        key: column.key,
                        direction:
                          sort?.key === column.key ? -sort.direction : 1,
                      });
                      setPage(1);
                    }}
                  >
                    {column.label}
                    <ArrowDownUp size={12} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted
              .slice((current - 1) * size, current * size)
              .map((row, i) => (
                <tr key={i}>
                  {columns.map((column) => (
                    <td key={column.key}>{row[column.key]}</td>
                  ))}
                </tr>
              ))}
            {!filtered.length && (
              <tr>
                <td colSpan={columns.length}>No results.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <GlassPagination
        page={current}
        totalPages={total}
        onPageChange={setPage}
      />
    </div>
  );
}
export function GlassCarousel({
  slides,
}: {
  slides: { title: string; description: string }[];
}) {
  const [index, setIndex] = useState(0);
  if (!slides.length) return null;
  return (
    <section
      className="g-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured slides"
    >
      <div
        className="g-slide"
        role="group"
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${slides.length}`}
      >
        <div>
          <h3>{slides[index].title}</h3>
          <p>{slides[index].description}</p>
        </div>
      </div>
      <div className="g-carousel-controls">
        <GlassButton
          size="sm"
          variant="outline"
          aria-label="Previous slide"
          disabled={index === 0}
          onClick={() => setIndex(index - 1)}
        >
          <ChevronLeft size={14} />
        </GlassButton>
        <span role="status">
          {index + 1} / {slides.length}
        </span>
        <GlassButton
          size="sm"
          variant="outline"
          aria-label="Next slide"
          disabled={index === slides.length - 1}
          onClick={() => setIndex(index + 1)}
        >
          <ChevronRight size={14} />
        </GlassButton>
      </div>
    </section>
  );
}
export function GlassChart({
  data,
  label,
}: {
  data: { label: string; value: number }[];
  label: string;
}) {
  const titleId = useId();
  const max = Math.max(1, ...data.map((item) => Math.max(0, item.value)));
  const step = 460 / Math.max(1, data.length);
  return (
    <figure className="g-chart">
      <svg viewBox="0 0 520 240" role="img" aria-labelledby={titleId}>
        <title id={titleId}>{label}</title>
        {[0, 1, 2, 3].map((tick) => (
          <g key={tick}>
            <line
              x1="40"
              x2="505"
              y1={200 - tick * 55}
              y2={200 - tick * 55}
              stroke="var(--g-border)"
            />
            <text x="30" y={204 - tick * 55} textAnchor="end">
              {Math.round((max * tick) / 3)}
            </text>
          </g>
        ))}
        {data.map((item, i) => {
          const h = (Math.max(0, item.value) / max) * 165;
          return (
            <g key={i}>
              <rect
                data-bar=""
                x={48 + i * step}
                y={200 - h}
                width={Math.max(2, step - 18)}
                height={h}
                rx="5"
              >
                <title>{`${item.label}: ${item.value}`}</title>
              </rect>
              <text
                x={48 + i * step + (step - 18) / 2}
                y="223"
                textAnchor="middle"
              >
                {item.label}
              </text>
            </g>
          );
        })}
      </svg>
      <figcaption>{label} · Sample data</figcaption>
      <details>
        <summary className="g-muted">View data table</summary>
        <GlassTable
          caption={label}
          columns={[
            { key: "label", label: "Period" },
            { key: "value", label: "Value" },
          ]}
          rows={data}
        />
      </details>
    </figure>
  );
}
function dateKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
export function GlassCalendar({
  value,
  onValueChange,
  label = "Choose a date",
}: {
  value: string;
  onValueChange: (value: string) => void;
  label?: string;
}) {
  const initial = /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? new Date(`${value}T12:00:00`)
    : new Date();
  const [month, setMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1),
  );
  const [focusDay, setFocusDay] = useState(initial.getDate());
  const pendingFocus = useRef(false),
    root = useRef<HTMLDivElement>(null);
  const year = month.getFullYear(),
    m = month.getMonth(),
    days = new Date(year, m + 1, 0).getDate(),
    offset = (month.getDay() + 6) % 7;
  useEffect(() => {
    if (pendingFocus.current) {
      root.current
        ?.querySelector<HTMLButtonElement>(`[data-day="${focusDay}"]`)
        ?.focus();
      pendingFocus.current = false;
    }
  }, [month, focusDay]);
  const move = (day: number, delta: number) => {
    const next = new Date(year, m, day + delta);
    pendingFocus.current = true;
    setFocusDay(next.getDate());
    setMonth(new Date(next.getFullYear(), next.getMonth(), 1));
  };
  return (
    <div
      className="g-calendar glass-clear"
      ref={root}
      role="group"
      aria-label={label}
    >
      <div className="g-calendar-header">
        <button
          aria-label="Previous month"
          onClick={() => {
            setMonth(new Date(year, m - 1, 1));
            setFocusDay(1);
          }}
        >
          <ChevronLeft size={16} />
        </button>
        <span aria-live="polite">
          {month.toLocaleDateString("en", { month: "long", year: "numeric" })}
        </span>
        <button
          aria-label="Next month"
          onClick={() => {
            setMonth(new Date(year, m + 1, 1));
            setFocusDay(1);
          }}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      <div className="g-calendar-grid">
        {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
          <span key={day} aria-hidden="true">
            {day}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1,
            date = new Date(year, m, day),
            key = dateKey(date);
          return (
            <button
              key={key}
              data-day={day}
              tabIndex={day === Math.min(focusDay, days) ? 0 : -1}
              aria-label={date.toLocaleDateString("en", { dateStyle: "full" })}
              aria-pressed={value === key}
              aria-current={dateKey(new Date()) === key ? "date" : undefined}
              onFocus={() => setFocusDay(day)}
              onClick={() => onValueChange(key)}
              onKeyDown={(event) => {
                const delta =
                  event.key === "ArrowRight"
                    ? 1
                    : event.key === "ArrowLeft"
                      ? -1
                      : event.key === "ArrowDown"
                        ? 7
                        : event.key === "ArrowUp"
                          ? -7
                          : event.key === "Home"
                            ? -((date.getDay() + 6) % 7)
                            : event.key === "End"
                              ? 6 - ((date.getDay() + 6) % 7)
                              : null;
                if (delta !== null) {
                  event.preventDefault();
                  move(day, delta);
                }
              }}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export function GlassDatePicker({
  label,
  value,
  onValueChange,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
}) {
  return (
    <div className="g-stack">
      <span className="g-label">{label}</span>
      <GlassPopover trigger={value || "Pick a date"} title={label}>
        <GlassCalendar
          label={label}
          value={value}
          onValueChange={onValueChange}
        />
        <p className="g-muted" aria-live="polite">
          Selected: {value || "None"}
        </p>
      </GlassPopover>
    </div>
  );
}
export function GlassResizable({
  left,
  right,
  label = "Resize panels",
}: {
  left: React.ReactNode;
  right: React.ReactNode;
  label?: string;
}) {
  const [percent, setPercent] = useState(50),
    root = useRef<HTMLDivElement>(null);
  const update = (next: number) => setPercent(Math.max(20, Math.min(80, next)));
  return (
    <div ref={root} className="g-resizable glass-clear">
      <section style={{ width: `calc(${percent}% - 6px)` }}>{left}</section>
      <div
        role="separator"
        aria-label={label}
        aria-orientation="vertical"
        aria-valuemin={20}
        aria-valuemax={80}
        aria-valuenow={Math.round(percent)}
        tabIndex={0}
        className="g-resize-handle"
        onKeyDown={(event) => {
          if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) {
            event.preventDefault();
            update(
              event.key === "Home"
                ? 20
                : event.key === "End"
                  ? 80
                  : percent + (event.key === "ArrowLeft" ? -5 : 5),
            );
          }
        }}
        onPointerDown={(event) => {
          event.preventDefault();
          event.currentTarget.focus();
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (
            event.currentTarget.hasPointerCapture(event.pointerId) &&
            root.current
          ) {
            const rect = root.current.getBoundingClientRect();
            update(((event.clientX - rect.left) / rect.width) * 100);
          }
        }}
        onPointerUp={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId))
            event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      />
      <section style={{ width: `calc(${100 - percent}% - 6px)` }}>
        {right}
      </section>
    </div>
  );
}
