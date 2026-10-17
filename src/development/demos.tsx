import React, { useState } from "react";
import { Download, Layers, Search } from "lucide-react";
import { GlassButton } from "../components/GlassButton";
import { GlassCard } from "../components/GlassCard";
import * as B from "../components/GlassUI";
import * as C from "../components/ui/controls";
import * as O from "../components/ui/overlays";
import * as T from "../components/ui/content";
import * as D from "../components/ui/data";
import { ComponentDoc } from "./catalog";

const rows = [
  { name: "Portfolio", status: "Live", visitors: 2840 },
  { name: "Coffee dashboard", status: "In progress", visitors: 1240 },
  { name: "Design system", status: "Live", visitors: 3520 },
  { name: "Mobile app", status: "Draft", visitors: 120 },
  { name: "Analytics", status: "Live", visitors: 1880 },
  { name: "Brand kit", status: "Draft", visitors: 460 },
  { name: "Documentation", status: "Live", visitors: 5320 },
  { name: "Customer portal", status: "In progress", visitors: 920 },
];
const columns = [
  { key: "name", label: "Project" },
  { key: "status", label: "Status" },
  { key: "visitors", label: "Visitors" },
];
export function ComponentDemo({ doc }: { doc: ComponentDoc }) {
  const [enabled, setEnabled] = useState(true),
    [value, setValue] = useState("React"),
    [number, setNumber] = useState(64),
    [date, setDate] = useState("2026-10-17"),
    [otp, setOtp] = useState(""),
    [result, setResult] = useState(""),
    [dir, setDir] = useState<"ltr" | "rtl">("ltr");
  const actions = [
    {
      label: "Edit project",
      onSelect: () => setResult("Edit project selected"),
    },
    {
      label: "Duplicate",
      onSelect: () => setResult("A local demo copy was created"),
    },
    {
      label: "Archive",
      onSelect: () => setResult("Project archived in this demo"),
    },
    { label: "Delete (disabled)", onSelect: () => {}, disabled: true },
  ];
  let preview: React.ReactNode;
  switch (doc.slug) {
    case "accordion":
      preview = (
        <B.GlassAccordion
          items={[
            {
              title: "Can I customize the design?",
              content:
                "Yes. All components share the same CSS tokens. Edit the source to fit your project.",
            },
            {
              title: "What dependencies do I need?",
              content:
                "React, Tailwind CSS, Motion, Lucide and Radix UI. The usage section lists the source module.",
            },
            {
              title: "Is this the official shadcn/ui?",
              content:
                "This is Potato UI with a Liquid Glass theme and its own API. The catalog follows the shadcn component list.",
            },
          ]}
        />
      );
      break;
    case "alert":
      preview = (
        <div className="g-stack">
          <B.GlassAlert title="Your workspace is ready">
            Start by adding your first reusable component.
          </B.GlassAlert>
          <B.GlassAlert title="Preview environment">
            The data shown in these examples is local sample data.
          </B.GlassAlert>
        </div>
      );
      break;
    case "alert-dialog":
      preview = (
        <O.GlassAlertDialog
          trigger="Reset demo"
          title="Reset this preview?"
          description="This changes only local demo state. Your website content will not be deleted."
          confirmLabel="Reset demo"
          onConfirm={() => setResult("Demo state reset successfully")}
        />
      );
      break;
    case "aspect-ratio":
      preview = (
        <T.GlassAspectRatio ratio={16 / 9}>
          <div className="dev-aspect-art">
            <Layers size={48} />
            <strong>Liquid Glass</strong>
            <span>16 : 9</span>
          </div>
        </T.GlassAspectRatio>
      );
      break;
    case "attachment":
      preview = (
        <div className="g-stack">
          <T.GlassAttachment
            name="design-notes.txt"
            meta="Text document · click to download"
            href="data:text/plain,Potato%20UI%20design%20notes"
          />
          <p className="g-muted">
            A small sample file, generated entirely in your browser.
          </p>
        </div>
      );
      break;
    case "avatar":
      preview = (
        <div className="g-inline">
          <T.GlassAvatar name="Alex Chen" size={64} />
          <T.GlassAvatar name="Design Team" size={48} />
          <T.GlassAvatar name="Potato UI" size={36} />
        </div>
      );
      break;
    case "badge":
      preview = (
        <div className="g-inline">
          <B.GlassBadge>Neutral</B.GlassBadge>
          <B.GlassBadge tone="accent">New component</B.GlassBadge>
          <B.GlassBadge tone="success">Published</B.GlassBadge>
        </div>
      );
      break;
    case "breadcrumb":
      preview = (
        <T.GlassBreadcrumb
          items={[
            { label: "Development", href: "#/development" },
            { label: "Components", href: "#/development" },
            { label: "Breadcrumb" },
          ]}
        />
      );
      break;
    case "bubble":
      preview = (
        <div className="g-stack">
          <T.GlassBubble>
            Could we build a reusable glass interface?
          </T.GlassBubble>
          <T.GlassBubble>
            Start with the same tokens, then compose the components.
          </T.GlassBubble>
        </div>
      );
      break;
    case "button":
      preview = (
        <div className="g-stack">
          <div className="g-inline">
            {(
              ["primary", "secondary", "glass", "ghost", "outline"] as const
            ).map((variant) => (
              <GlassButton
                key={variant}
                variant={variant}
                onClick={() => setResult(`${variant} clicked`)}
              >
                {variant}
              </GlassButton>
            ))}
          </div>
          <div className="g-inline">
            <GlassButton size="sm">Small</GlassButton>
            <GlassButton>Medium</GlassButton>
            <GlassButton size="lg" iconLeft={<Download size={16} />}>
              Large
            </GlassButton>
          </div>
          <div className="g-inline">
            <GlassButton disabled>Disabled</GlassButton>
            <GlassButton isLoading>Loading</GlassButton>
          </div>
        </div>
      );
      break;
    case "button-group":
      preview = (
        <C.GlassButtonGroup label="Project actions">
          <GlassButton
            magnetic={false}
            variant="outline"
            onClick={() => setResult("Draft saved")}
          >
            Save
          </GlassButton>
          <GlassButton
            magnetic={false}
            variant="outline"
            onClick={() => setResult("Export prepared")}
          >
            Export
          </GlassButton>
          <GlassButton
            magnetic={false}
            variant="outline"
            onClick={() => setResult("Preview selected")}
          >
            Preview
          </GlassButton>
        </C.GlassButtonGroup>
      );
      break;
    case "calendar":
      preview = (
        <div className="g-stack">
          <D.GlassCalendar value={date} onValueChange={setDate} />
          <p className="g-muted" role="status">
            Selected: {date}
          </p>
        </div>
      );
      break;
    case "card":
      preview = (
        <div className="dev-materials">
          {(["clear", "frosted", "crystal", "deep", "liquid"] as const).map(
            (level) => (
              <GlassCard
                key={level}
                level={level}
                reveal={false}
                interactive
                padding="sm"
              >
                <Layers size={22} />
                <h3>{level}</h3>
                <p>Glass surface</p>
              </GlassCard>
            ),
          )}
        </div>
      );
      break;
    case "carousel":
      preview = (
        <D.GlassCarousel
          slides={[
            {
              title: "01 · Design",
              description: "Start with clear hierarchy and shared tokens.",
            },
            {
              title: "02 · Develop",
              description: "Compose accessible, typed React components.",
            },
            {
              title: "03 · Publish",
              description: "Build and share your interface.",
            },
          ]}
        />
      );
      break;
    case "chart":
      preview = (
        <D.GlassChart
          label="Weekly orders"
          data={[
            { label: "Mon", value: 24 },
            { label: "Tue", value: 38 },
            { label: "Wed", value: 31 },
            { label: "Thu", value: 56 },
            { label: "Fri", value: 42 },
            { label: "Sat", value: 64 },
          ]}
        />
      );
      break;
    case "checkbox":
      preview = (
        <div className="g-stack">
          <C.GlassCheckbox
            label="Receive design updates"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <C.GlassCheckbox
            label="Unavailable option"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
          <p className="g-muted" role="status">
            Updates {enabled ? "enabled" : "disabled"}
          </p>
        </div>
      );
      break;
    case "code-block":
      preview = (
        <T.GlassCodeBlock
          code={
            'import { GlassButton } from "./components/GlassButton";\n\nexport function App() {\n  return <GlassButton>Build something</GlassButton>;\n}'
          }
          language="tsx"
        />
      );
      break;
    case "collapsible":
      preview = (
        <T.GlassCollapsible title="Show 3 dependencies">
          <div className="g-stack">
            {["react", "motion", "radix-ui"].map((dep) => (
              <code key={dep}>{dep}</code>
            ))}
          </div>
        </T.GlassCollapsible>
      );
      break;
    case "combobox":
      preview = (
        <div className="g-stack">
          <O.GlassCombobox
            label="Framework"
            options={["React", "Next.js", "Vue", "Svelte", "Angular", "Astro"]}
            value={value}
            onValueChange={setValue}
          />
          <p role="status" className="g-muted">
            Current value: {value || "None"}
          </p>
        </div>
      );
      break;
    case "command":
      preview = <O.GlassCommand label="Quick actions" actions={actions} />;
      break;
    case "context-menu":
      preview = (
        <O.GlassContextMenu actions={actions}>
          Right-click here
          <br />
          <span className="g-muted">
            Or focus this region and press Shift+F10
          </span>
        </O.GlassContextMenu>
      );
      break;
    case "data-table":
      preview = (
        <D.GlassDataTable
          columns={columns}
          rows={rows}
          caption="Sample projects"
          pageSize={4}
        />
      );
      break;
    case "date-picker":
      preview = (
        <D.GlassDatePicker
          label="Launch date"
          value={date}
          onValueChange={setDate}
        />
      );
      break;
    case "dialog":
      preview = (
        <B.GlassDialog trigger="Open dialog" title="Create something beautiful">
          <p className="g-muted">
            Combine the components to build your next interface.
          </p>
          <B.GlassInput
            aria-label="Project title"
            placeholder="Project title"
            style={{ marginTop: 16 }}
          />
        </B.GlassDialog>
      );
      break;
    case "direction":
      preview = (
        <div className="g-stack">
          <C.GlassToggleGroup
            label="Text direction"
            options={["LTR", "RTL"]}
            value={dir.toUpperCase()}
            onValueChange={(v) => setDir(v.toLowerCase() as "ltr" | "rtl")}
          />
          <T.GlassDirection dir={dir}>
            <GlassCard reveal={false}>
              <p>مرحبا بكم في نظام التصميم</p>
              <p className="g-muted">
                {dir === "rtl" ? "Right to left" : "Left to right"} ·
                Direction-aware layout
              </p>
            </GlassCard>
          </T.GlassDirection>
        </div>
      );
      break;
    case "drawer":
      preview = (
        <O.GlassDrawer
          trigger="Open drawer"
          title="Your daily goal"
          description="Choose a realistic target for your next project."
        >
          <div className="g-stack">
            <C.GlassSlider
              label="Components per day"
              min={1}
              max={10}
              value={Math.min(10, number)}
              onValueChange={setNumber}
            />
            <p className="g-muted">
              This bottom panel supports Escape and focus trapping.
            </p>
          </div>
        </O.GlassDrawer>
      );
      break;
    case "dropdown-menu":
      preview = (
        <O.GlassDropdownMenu label="Project actions" actions={actions} />
      );
      break;
    case "empty":
      preview = (
        <T.GlassEmpty
          title="No projects yet"
          description="Your next idea starts with one component."
        >
          <GlassButton
            onClick={() => setResult("A local demo project was created")}
          >
            Create project
          </GlassButton>
        </T.GlassEmpty>
      );
      break;
    case "field":
      preview = (
        <div className="g-stack">
          <C.GlassField
            label="Email"
            hint="We will only use this for project updates."
          >
            <B.GlassInput type="email" placeholder="you@example.com" />
          </C.GlassField>
          <C.GlassField
            label="Workspace name"
            error="Use at least 3 characters."
          >
            <B.GlassInput defaultValue="UI" />
          </C.GlassField>
        </div>
      );
      break;
    case "hover-card":
      preview = (
        <O.GlassHoverCard href="#/development" label="@potato-ui">
          <div className="g-inline">
            <T.GlassAvatar name="Potato UI" />
            <div>
              <strong>Potato UI</strong>
              <p className="g-muted">
                A Liquid Glass component library for React.
              </p>
            </div>
          </div>
        </O.GlassHoverCard>
      );
      break;
    case "input":
      preview = (
        <div className="g-stack">
          <label className="g-stack">
            Email
            <B.GlassInput type="email" placeholder="you@example.com" />
          </label>
          <label className="g-stack">
            Password
            <B.GlassInput
              type="password"
              autoComplete="new-password"
              placeholder="Enter a password"
            />
          </label>
          <label className="g-stack">
            Disabled
            <B.GlassInput placeholder="Unavailable" disabled />
          </label>
        </div>
      );
      break;
    case "input-group":
      preview = (
        <div className="g-stack">
          <C.GlassInputGroup
            aria-label="Website address"
            prefix="https://"
            suffix=".com"
            placeholder="your-brand"
          />
          <C.GlassInputGroup
            aria-label="Search projects"
            prefix={<Search size={16} />}
            suffix="⌘ K"
            placeholder="Search projects…"
          />
        </div>
      );
      break;
    case "input-otp":
      preview = (
        <div className="g-stack">
          <C.GlassInputOTP
            label="Verification code"
            value={otp}
            onValueChange={setOtp}
          />
          <p className="g-muted">
            No code is sent. Paste any six digits to try the input.
          </p>
        </div>
      );
      break;
    case "item":
      preview = (
        <div className="g-stack">
          <T.GlassItem
            title="Design system"
            description="Reusable UI components"
            leading={<T.GlassAvatar name="Design System" />}
            trailing={<B.GlassBadge tone="success">Active</B.GlassBadge>}
          />
          <T.GlassItem
            title="Project documentation"
            description="Updated today"
            leading={<Layers size={22} />}
            trailing={
              <GlassButton
                size="sm"
                variant="ghost"
                onClick={() => setResult("Documentation selected")}
              >
                View
              </GlassButton>
            }
          />
        </div>
      );
      break;
    case "kbd":
      preview = (
        <div className="g-inline">
          <span>Open search</span>
          <T.GlassKbd>⌘</T.GlassKbd>
          <span>+</span>
          <T.GlassKbd>K</T.GlassKbd>
          <span className="g-muted">Presentation only</span>
        </div>
      );
      break;
    case "label":
      preview = (
        <div className="g-stack">
          <C.GlassLabel htmlFor="demo-project-name">Project name</C.GlassLabel>
          <B.GlassInput
            id="demo-project-name"
            placeholder="Click the label to focus me"
          />
        </div>
      );
      break;
    case "marker":
      preview = (
        <p style={{ lineHeight: 2 }}>
          Build a consistent interface with{" "}
          <T.GlassMarker>shared design tokens</T.GlassMarker> and components you
          can reuse.
        </p>
      );
      break;
    case "menubar":
      preview = (
        <O.GlassMenubar
          menus={[
            { label: "File", actions: actions.slice(0, 2) },
            { label: "Edit", actions: actions.slice(1) },
            {
              label: "View",
              actions: [
                { label: "Preview", onSelect: () => setResult("Preview mode") },
                {
                  label: "Source",
                  onSelect: () => setResult("Source view selected"),
                },
              ],
            },
          ]}
        />
      );
      break;
    case "message":
      preview = (
        <div className="g-stack">
          <T.GlassMessage author="user" name="You">
            Can I customize these components?
          </T.GlassMessage>
          <T.GlassMessage author="assistant" name="Potato UI">
            Yes. Copy the source, change the tokens and compose your interface.
          </T.GlassMessage>
        </div>
      );
      break;
    case "message-scroller":
      preview = (
        <T.GlassMessageScroller>
          {Array.from({ length: 6 }, (_, i) => (
            <T.GlassMessage
              key={i}
              author={i % 2 ? "assistant" : "user"}
              name={i % 2 ? "Potato UI" : "You"}
            >
              {
                [
                  "Build a glass interface.",
                  "Start with the foundation components.",
                  "Can I reuse them?",
                  "Yes. Keep the source dependencies.",
                  "What about dark mode?",
                  "The components inherit your theme.",
                ][i]
              }
            </T.GlassMessage>
          ))}
        </T.GlassMessageScroller>
      );
      break;
    case "native-select":
      preview = (
        <label className="g-stack">
          Your role
          <C.GlassNativeSelect defaultValue="designer">
            <option value="designer">Designer</option>
            <option value="developer">Developer</option>
            <option value="manager">Product manager</option>
          </C.GlassNativeSelect>
        </label>
      );
      break;
    case "navigation-menu":
      preview = (
        <O.GlassNavigationMenu
          items={[
            {
              label: "Components",
              href: "#/development",
              description: "Browse the full catalog",
            },
            {
              label: "Button",
              href: "#/development/button",
              description: "Actions and variants",
            },
            {
              label: "Card",
              href: "#/development/card",
              description: "Glass surfaces",
            },
          ]}
        />
      );
      break;
    case "pagination":
      preview = (
        <div className="g-stack">
          <D.GlassPagination
            page={number > 8 ? 1 : number}
            totalPages={8}
            onPageChange={setNumber}
          />
          <p role="status" className="g-muted" style={{ textAlign: "center" }}>
            Page {number > 8 ? 1 : number} of 8
          </p>
        </div>
      );
      break;
    case "popover":
      preview = (
        <O.GlassPopover trigger="Dimensions" title="Card dimensions">
          <div className="g-stack">
            <label>
              Width
              <B.GlassInput defaultValue="320px" />
            </label>
            <label>
              Height
              <B.GlassInput defaultValue="240px" />
            </label>
          </div>
        </O.GlassPopover>
      );
      break;
    case "progress":
      preview = (
        <div className="g-stack">
          <B.GlassProgress label="Project progress" value={number} />
          <C.GlassSlider
            label="Try a value"
            value={number}
            onValueChange={setNumber}
          />
        </div>
      );
      break;
    case "questionnaire":
      preview = (
        <T.GlassQuestionnaire
          question="What are you building?"
          options={["Website", "Dashboard", "Mobile web"]}
          onSubmit={(answer) =>
            setResult(`Answer submitted locally: ${answer}`)
          }
        />
      );
      break;
    case "radio-group":
      preview = (
        <C.GlassRadioGroup
          label="Subscription plan"
          options={["Free", "Pro", "Team"]}
          value={value === "React" ? "Pro" : value}
          onValueChange={setValue}
        />
      );
      break;
    case "resizable":
      preview = (
        <D.GlassResizable
          left={
            <p>
              Sidebar
              <br />
              <span className="g-muted">Drag or use arrow keys</span>
            </p>
          }
          right={<p>Main content</p>}
        />
      );
      break;
    case "scroll-area":
      preview = (
        <T.GlassScrollArea label="Activity stream" height={200}>
          <div className="g-stack">
            {Array.from({ length: 15 }, (_, i) => (
              <React.Fragment key={i}>
                <T.GlassItem
                  title={`Activity ${i + 1}`}
                  description="A sample component update"
                />
                <T.GlassSeparator />
              </React.Fragment>
            ))}
          </div>
        </T.GlassScrollArea>
      );
      break;
    case "select":
      preview = (
        <O.GlassSelectMenu
          label="Framework"
          options={["React", "Next.js", "Vue", "Svelte", "Astro"]}
          value={value}
          onValueChange={setValue}
        />
      );
      break;
    case "separator":
      preview = (
        <div>
          <h3 className="g-label">Workspace settings</h3>
          <p className="g-muted">Manage your design system.</p>
          <T.GlassSeparator />
          <div className="g-inline">
            <span>Profile</span>
            <span>Billing</span>
            <span>Notifications</span>
          </div>
        </div>
      );
      break;
    case "sheet":
      preview = (
        <O.GlassSheet
          trigger="Open sheet"
          title="Edit profile"
          description="Update your name and workspace details."
        >
          <div className="g-stack">
            <C.GlassField label="Name">
              <B.GlassInput defaultValue="Alex Chen" />
            </C.GlassField>
            <C.GlassField label="Workspace">
              <B.GlassInput defaultValue="Potato Studio" />
            </C.GlassField>
            <p className="g-muted">Form values are local to this preview.</p>
          </div>
        </O.GlassSheet>
      );
      break;
    case "sidebar":
      preview = (
        <T.GlassSidebar
          title="Potato Workspace"
          activeHref="#/development/sidebar"
          items={[
            { label: "Overview", href: "#/development" },
            { label: "Components", href: "#/development/sidebar" },
            { label: "Data Table", href: "#/development/data-table" },
            { label: "Settings", href: "#/development/switch" },
          ]}
        />
      );
      break;
    case "skeleton":
      preview = (
        <div className="g-stack" role="status" aria-label="Loading profile">
          <div className="g-inline">
            <T.GlassSkeleton width={48} height={48} rounded />
            <div className="g-stack" style={{ flex: 1 }}>
              <T.GlassSkeleton width="75%" />
              <T.GlassSkeleton width="45%" height={12} />
            </div>
          </div>
          <T.GlassSkeleton height={120} />
          <T.GlassSkeleton width="85%" height={12} />
        </div>
      );
      break;
    case "slider":
      preview = (
        <C.GlassSlider
          label="Opacity"
          value={number}
          onValueChange={setNumber}
        />
      );
      break;
    case "spinner":
      preview = <T.GlassSpinner label="Loading components" />;
      break;
    case "switch":
      preview = (
        <div className="g-stack">
          <B.GlassSwitch
            label={`Notifications ${enabled ? "on" : "off"}`}
            checked={enabled}
            onCheckedChange={setEnabled}
          />
          <B.GlassSwitch
            label="Disabled setting"
            checked={false}
            onCheckedChange={() => {}}
            disabled
          />
        </div>
      );
      break;
    case "table":
      preview = (
        <D.GlassTable
          caption="Sample project statistics"
          columns={columns}
          rows={rows.slice(0, 4)}
        />
      );
      break;
    case "tabs":
      preview = (
        <B.GlassTabs
          items={[
            {
              label: "Design",
              content:
                "Start with clear hierarchy, shared tokens and your own accent color.",
            },
            {
              label: "Development",
              content:
                "Compose typed React components and keep full control of the source.",
            },
            {
              label: "Publish",
              content:
                "Run the build and tests before publishing your interface.",
            },
          ]}
        />
      );
      break;
    case "textarea":
      preview = (
        <div className="g-stack">
          <label className="g-stack">
            Project description
            <B.GlassTextarea
              rows={4}
              placeholder="Tell us about your next project…"
            />
          </label>
          <B.GlassTextarea
            rows={2}
            placeholder="Disabled textarea"
            disabled
            aria-label="Disabled textarea"
          />
        </div>
      );
      break;
    case "toast":
      preview = (
        <O.GlassToast
          trigger="Show toast"
          title="Changes saved"
          description="This is a demo notification. No data was sent to a server."
        />
      );
      break;
    case "toggle":
      preview = (
        <div className="g-stack">
          <C.GlassToggle
            label="Bold text"
            pressed={enabled}
            onPressedChange={setEnabled}
          >
            <strong>B</strong>
          </C.GlassToggle>
          <p style={{ fontWeight: enabled ? 700 : 400 }}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      );
      break;
    case "toggle-group":
      preview = (
        <div className="g-stack">
          <C.GlassToggleGroup
            label="Text alignment"
            options={["Left", "Center", "Right"]}
            value={value === "React" ? "Left" : value}
            onValueChange={setValue}
          />
          <p
            style={{
              textAlign: (value === "React" ? "left" : value.toLowerCase()) as
                "left" | "center" | "right",
            }}
          >
            Design with clarity.
          </p>
        </div>
      );
      break;
    case "tooltip":
      preview = (
        <O.GlassTooltip text="Save this project">
          <button className="g-toggle glass-clear">Hover or focus me</button>
        </O.GlassTooltip>
      );
      break;
    case "trace":
      preview = (
        <T.GlassTrace
          steps={[
            {
              title: "Load source",
              description: "Component modules loaded",
              status: "complete",
            },
            {
              title: "Build preview",
              description: "Preparing the interface",
              status: "running",
            },
            {
              title: "Publish",
              description: "Waiting for the build",
              status: "pending",
            },
          ]}
        />
      );
      break;
    case "typography":
      preview = (
        <T.GlassTypography>
          <h3>Design with clarity.</h3>
          <p>
            Good interfaces make the next action easy to understand. Use a clear
            type scale and give the content room to breathe.
          </p>
          <blockquote>Build once. Refine often.</blockquote>
          <p className="g-muted">Be Vietnam Pro · shared typography tokens</p>
        </T.GlassTypography>
      );
      break;
    default:
      throw new Error(`Missing demo: ${doc.slug}`);
  }
  return (
    <div className="dev-demo-content">
      {preview}
      {result && (
        <p role="status" className="dev-action-result">
          {result}
        </p>
      )}
    </div>
  );
}
