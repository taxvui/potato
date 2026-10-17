import React, { useId, useRef, useState } from 'react';
import { GlassButton } from './GlassButton';
import './glass-ui.css';

export const GlassInput = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`ui-field glass-clear ${props.className || ''}`} />;
export const GlassTextarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea {...props} className={`ui-field glass-clear ${props.className || ''}`} />;
export const GlassSelect = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => <select {...props} className={`ui-field glass-deep ${props.className || ''}`} />;
export function GlassBadge({ children, tone = 'neutral' }: { children: React.ReactNode; tone?: 'neutral' | 'accent' | 'success' }) {
  return <span className={`ui-badge glass-clear ui-tone-${tone}`}>{children}</span>;
}
export function GlassSwitch({ checked, onCheckedChange, label, disabled = false }: { checked: boolean; onCheckedChange: (checked: boolean) => void; label: string; disabled?: boolean }) {
  return <button type="button" role="switch" aria-checked={checked} disabled={disabled} onClick={() => onCheckedChange(!checked)} className="ui-switch-label"><span className="ui-switch glass-clear" data-checked={checked}><span /></span>{label}</button>;
}
export function GlassTabs({ items }: { items: { label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  return <div className="ui-tabs"><div role="tablist" aria-label="Content" className="ui-tablist glass-clear">{items.map((item, i) => <button key={item.label} id={`${id}-tab-${i}`} role="tab" aria-selected={i === active} aria-controls={`${id}-panel-${i}`} tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => { const next = e.key === 'ArrowRight' ? (i + 1) % items.length : e.key === 'ArrowLeft' ? (i - 1 + items.length) % items.length : e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1 : -1; if (next >= 0) { e.preventDefault(); setActive(next); document.getElementById(`${id}-tab-${next}`)?.focus(); } }}>{item.label}</button>)}</div>{items.map((item, i) => <div key={item.label} id={`${id}-panel-${i}`} role="tabpanel" aria-labelledby={`${id}-tab-${i}`} hidden={active !== i} tabIndex={0} className="ui-tabpanel">{item.content}</div>)}</div>;
}
export function GlassAccordion({ items }: { items: { title: string; content: React.ReactNode }[] }) {
  return <div className="ui-accordion">{items.map(item => <details key={item.title} className="glass-clear"><summary>{item.title}</summary><div>{item.content}</div></details>)}</div>;
}
export function GlassAlert({ title, children }: { title: string; children: React.ReactNode }) {
  return <div role="note" className="ui-alert glass-clear"><strong>{title}</strong><p>{children}</p></div>;
}
export function GlassProgress({ value, label }: { value: number; label: string }) {
  const safe = Math.max(0, Math.min(100, value));
  return <div className="ui-progress-wrap"><div>{label} <span>{safe}%</span></div><div role="progressbar" aria-label={label} aria-valuenow={safe} aria-valuemin={0} aria-valuemax={100} className="ui-progress glass-clear"><span style={{ width: `${safe}%` }} /></div></div>;
}
export function GlassDialog({ trigger, title, children }: { trigger: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  return <><GlassButton onClick={() => ref.current?.showModal()}>{trigger}</GlassButton><dialog ref={ref} aria-labelledby={id} className="ui-dialog glass-deep" onClick={e => { if (e.target === e.currentTarget) ref.current?.close(); }}><h3 id={id}>{title}</h3><div>{children}</div><form method="dialog"><GlassButton type="submit" variant="outline">Close / Đóng</GlassButton></form></dialog></>;
}
