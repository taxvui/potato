import React, { useId, useState } from "react";
import {
  AlertDialog,
  ContextMenu,
  Dialog,
  DropdownMenu,
  HoverCard,
  Menubar,
  Popover,
  Select,
  Toast,
  Tooltip,
  NavigationMenu,
} from "radix-ui";
import { Check, ChevronDown, X } from "lucide-react";
import { GlassButton } from "../GlassButton";
import { GlassInput } from "../GlassUI";
import "./styles.css";

export type MenuAction = {
  label: string;
  onSelect: () => void;
  disabled?: boolean;
};

export function GlassSelectMenu({
  label,
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
}: {
  label: string;
  options: string[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <Select.Root value={value} onValueChange={onValueChange}>
      <Select.Trigger
        aria-label={label}
        className="g-select-trigger glass-clear"
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown size={15} />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="g-popup" position="popper" sideOffset={8}>
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item key={option} value={option} className="g-menu-item">
                <Select.ItemText>{option}</Select.ItemText>
                <Select.ItemIndicator>
                  <Check size={14} />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
export function GlassTooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactElement;
}) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content sideOffset={8} className="g-popup g-tooltip">
            {text}
            <Tooltip.Arrow style={{ fill: "var(--g-surface)" }} />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
export function GlassPopover({
  trigger,
  title,
  children,
}: {
  trigger: string;
  title: string;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <GlassButton variant="outline">{trigger}</GlassButton>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          aria-labelledby={id}
          sideOffset={8}
          className="g-popup"
          style={{ padding: 20 }}
        >
          <h3 id={id} className="g-label" style={{ marginBottom: 14 }}>
            {title}
          </h3>
          {children}
          <Popover.Close className="g-close" aria-label="Close popover">
            <X size={14} />
          </Popover.Close>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
export function GlassHoverCard({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <HoverCard.Root openDelay={150}>
      <HoverCard.Trigger asChild>
        <a href={href} className="accent-color underline underline-offset-4">
          {label}
        </a>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          sideOffset={10}
          className="g-popup"
          style={{ padding: 20 }}
        >
          {children}
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
}
export function GlassDropdownMenu({
  label,
  actions,
}: {
  label: string;
  actions: MenuAction[];
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <GlassButton variant="outline" iconRight={<ChevronDown size={14} />}>
          {label}
        </GlassButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content sideOffset={8} className="g-popup">
          {actions.map((action) => (
            <DropdownMenu.Item
              key={action.label}
              disabled={action.disabled}
              onSelect={action.onSelect}
              className="g-menu-item"
            >
              {action.label}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
export function GlassContextMenu({
  actions,
  children,
}: {
  actions: MenuAction[];
  children: React.ReactNode;
}) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger className="g-trigger-zone" tabIndex={0}>
        {children}
      </ContextMenu.Trigger>
      <ContextMenu.Portal>
        <ContextMenu.Content className="g-popup">
          {actions.map((action) => (
            <ContextMenu.Item
              key={action.label}
              onSelect={action.onSelect}
              disabled={action.disabled}
              className="g-menu-item"
            >
              {action.label}
            </ContextMenu.Item>
          ))}
        </ContextMenu.Content>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  );
}
export function GlassMenubar({
  menus,
}: {
  menus: { label: string; actions: MenuAction[] }[];
}) {
  return (
    <Menubar.Root
      className="g-inline glass-clear"
      style={{ padding: 4, borderRadius: 12 }}
    >
      {menus.map((menu) => (
        <Menubar.Menu key={menu.label}>
          <Menubar.Trigger className="g-menu-item">
            {menu.label}
          </Menubar.Trigger>
          <Menubar.Portal>
            <Menubar.Content className="g-popup" sideOffset={6}>
              {menu.actions.map((action) => (
                <Menubar.Item
                  key={action.label}
                  disabled={action.disabled}
                  onSelect={action.onSelect}
                  className="g-menu-item"
                >
                  {action.label}
                </Menubar.Item>
              ))}
            </Menubar.Content>
          </Menubar.Portal>
        </Menubar.Menu>
      ))}
    </Menubar.Root>
  );
}
export function GlassNavigationMenu({
  items,
}: {
  items: { label: string; href: string; description?: string }[];
}) {
  return (
    <NavigationMenu.Root aria-label="Resources">
      <NavigationMenu.List className="g-navlinks">
        {items.map((item) => (
          <NavigationMenu.Item key={item.label}>
            <NavigationMenu.Link
              href={item.href}
              className="g-stack"
              style={{ gap: 3 }}
            >
              {item.label}
              {item.description && (
                <span className="g-muted">{item.description}</span>
              )}
            </NavigationMenu.Link>
          </NavigationMenu.Item>
        ))}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}

export function GlassAlertDialog({
  trigger,
  title,
  description,
  onConfirm,
  confirmLabel = "Confirm",
}: {
  trigger: string;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmLabel?: string;
}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <GlassButton variant="outline">{trigger}</GlassButton>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="g-overlay" />
        <AlertDialog.Content className="g-modal">
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description className="g-modal-description">
            {description}
          </AlertDialog.Description>
          <div className="g-modal-actions">
            <AlertDialog.Cancel asChild>
              <GlassButton variant="outline">Cancel</GlassButton>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <GlassButton onClick={onConfirm}>{confirmLabel}</GlassButton>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
type PanelProps = {
  trigger: string;
  title: string;
  description: string;
  children: React.ReactNode;
};
function Panel({
  trigger,
  title,
  description,
  children,
  mode,
}: PanelProps & { mode: "sheet" | "drawer" }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <GlassButton variant="outline">{trigger}</GlassButton>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="g-overlay" />
        <Dialog.Content className={`g-modal g-${mode}`}>
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description className="g-modal-description">
            {description}
          </Dialog.Description>
          {children}
          <Dialog.Close className="g-close" aria-label={`Close ${mode}`}>
            <X size={16} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function GlassSheet(props: PanelProps) {
  return <Panel {...props} mode="sheet" />;
}
export function GlassDrawer(props: PanelProps) {
  return <Panel {...props} mode="drawer" />;
}

export function GlassCommand({
  label,
  actions,
}: {
  label: string;
  actions: MenuAction[];
}) {
  const [query, setQuery] = useState("");
  const results = actions.filter((action) =>
    action.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  return (
    <div className="g-command glass-clear" role="region" aria-label={label}>
      <GlassInput
        className="g-command-search"
        aria-label="Search commands"
        placeholder="Type a command…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="g-command-list">
        {results.length ? (
          results.map((action) => (
            <button
              key={action.label}
              disabled={action.disabled}
              onClick={action.onSelect}
            >
              {action.label}
            </button>
          ))
        ) : (
          <p className="g-muted" role="status">
            No matching command.
          </p>
        )}
      </div>
    </div>
  );
}
export function GlassCombobox({
  label,
  options,
  value,
  onValueChange,
}: {
  label: string;
  options: string[];
  value: string;
  onValueChange: (value: string) => void;
}) {
  const id = useId();
  return (
    <label className="g-stack">
      <span className="g-label">{label}</span>
      <GlassInput
        list={id}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder="Search or choose…"
      />
      <datalist id={id}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </label>
  );
}
export function GlassToast({
  trigger,
  title,
  description,
}: {
  trigger: string;
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Toast.Provider duration={5000} swipeDirection="right">
      <GlassButton variant="outline" onClick={() => setOpen(true)}>
        {trigger}
      </GlassButton>
      <Toast.Root open={open} onOpenChange={setOpen} className="g-toast">
        <Toast.Title className="g-toast-title">{title}</Toast.Title>
        <Toast.Description className="g-toast-description">
          {description}
        </Toast.Description>
        <Toast.Close asChild>
          <button className="g-label">Dismiss</button>
        </Toast.Close>
      </Toast.Root>
      <Toast.Viewport className="g-toast-viewport" />
    </Toast.Provider>
  );
}
