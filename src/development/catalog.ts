export type ComponentGroup =
  "Foundation" | "Forms" | "Navigation" | "Overlays" | "Data" | "Content";
export type ComponentDoc = {
  slug: string;
  title: string;
  group: ComponentGroup;
  description: string;
  component: string;
  module: string;
  body: string;
  state?: string;
  extraImports?: string;
  api: string;
  behavior: string;
};
const docs: Omit<ComponentDoc, "slug">[] = [];
function add(
  title: string,
  group: ComponentGroup,
  description: string,
  component: string,
  module: string,
  body: string,
  api: string,
  behavior: string,
  state?: string,
  extraImports?: string,
) {
  docs.push({
    title,
    group,
    description,
    component,
    module,
    body,
    api,
    behavior,
    state,
    extraImports,
  });
}
const basics = "components/GlassUI",
  controls = "components/ui/controls",
  overlays = "components/ui/overlays",
  content = "components/ui/content",
  data = "components/ui/data";
add(
  "Accordion",
  "Content",
  "Mở rộng các nhóm nội dung theo nhu cầu.",
  "GlassAccordion",
  basics,
  '<GlassAccordion items={[{ title: "Can I customize it?", content: "Edit the source and theme tokens." }]} />',
  "items: { title, content }[]",
  "Dùng details/summary gốc; Enter hoặc Space để mở.",
);
add(
  "Alert",
  "Content",
  "Thông tin hỗ trợ trong luồng nội dung.",
  "GlassAlert",
  basics,
  '<GlassAlert title="Ready to build">Your changes have been saved.</GlassAlert>',
  "title: string; children: ReactNode",
  "Thông tin tĩnh; dùng Toast cho thông báo sau thao tác.",
);
add(
  "Alert Dialog",
  "Overlays",
  "Xác nhận thao tác với lựa chọn rõ ràng.",
  "GlassAlertDialog",
  overlays,
  '<GlassAlertDialog trigger="Reset demo" title="Reset this preview?" description="Only local demo state will change." confirmLabel="Reset" onConfirm={() => setResult("Demo reset")} />',
  "trigger, title, description: string; onConfirm: () => void; confirmLabel?: string",
  "Radix AlertDialog: giữ focus trong hộp thoại; Cancel được focus đầu tiên.",
  'const [result, setResult] = useState("No action yet");',
);
add(
  "Aspect Ratio",
  "Foundation",
  "Khung nội dung có tỷ lệ cố định.",
  "GlassAspectRatio",
  content,
  '<GlassAspectRatio ratio={16 / 9}><div style={{ display: "grid", placeItems: "center" }}>16:9 · Liquid Glass</div></GlassAspectRatio>',
  "ratio?: number; children: ReactNode",
  "Dùng CSS aspect-ratio; thay ratio để dùng 1:1, 4:3 hoặc 16:9.",
);
add(
  "Attachment",
  "Content",
  "Tệp đính kèm có thông tin và tải xuống.",
  "GlassAttachment",
  content,
  '<GlassAttachment name="design-notes.txt" meta="Text document · demo" href="data:text/plain,Potato%20UI%20design%20notes" />',
  "name, meta, href: string",
  "Đường dẫn download dùng tệp được phép công khai; demo là tệp văn bản mẫu.",
);
add(
  "Avatar",
  "Foundation",
  "Ảnh đại diện với tên viết tắt dự phòng.",
  "GlassAvatar",
  content,
  '<GlassAvatar name="Alex Chen" size={56} />',
  "name: string; src?: string; size?: number",
  "Ảnh lỗi hiển thị initials; tên được cung cấp cho trình đọc màn hình.",
);
add(
  "Badge",
  "Foundation",
  "Nhãn nhỏ cho trạng thái và metadata.",
  "GlassBadge",
  basics,
  '<GlassBadge tone="accent">New release</GlassBadge>',
  "tone?: neutral | accent | success; children: ReactNode",
  "Kết hợp màu với nhãn văn bản để mô tả trạng thái.",
);
add(
  "Breadcrumb",
  "Navigation",
  "Đường dẫn phân cấp về các trang cha.",
  "GlassBreadcrumb",
  content,
  '<GlassBreadcrumb items={[{ label: "Development", href: "#/development" }, { label: "Components" }, { label: "Breadcrumb" }]} />',
  "items: { label: string; href?: string }[]",
  "Trang cuối có aria-current; dùng đường dẫn thật cho các trang cha.",
);
add(
  "Bubble",
  "Content",
  "Bong bóng nội dung cho hội thoại.",
  "GlassBubble",
  content,
  "<GlassBubble>How can we make this interface better?</GlassBubble>",
  "children: ReactNode",
  "Chỉ là khung nội dung; dùng Message để bổ sung tác giả.",
);
add(
  "Button",
  "Foundation",
  "Nút Liquid Glass đang dùng trong website.",
  "GlassButton",
  "components/GlassButton",
  '<GlassButton variant="primary" size="md">Get started</GlassButton>',
  "variant?: primary | secondary | glass | ghost | outline; size?: sm | md | lg; isLoading?, disabled?, magnetic?: boolean",
  "Có hover, focus, loading và disabled; hỗ trợ iconLeft/iconRight.",
);
add(
  "Button Group",
  "Foundation",
  "Nhóm các hành động liên quan.",
  "GlassButtonGroup",
  controls,
  '<GlassButtonGroup label="Actions"><GlassButton variant="outline">Save</GlassButton><GlassButton variant="outline">Export</GlassButton></GlassButtonGroup>',
  "label: string; children: ReactNode",
  "role=group tạo nhóm có tên; mỗi nút có hành động riêng.",
  undefined,
  "import { GlassButton } from './components/GlassButton';",
);
add(
  "Calendar",
  "Data",
  "Lịch tháng với điều hướng và chọn ngày.",
  "GlassCalendar",
  data,
  "<GlassCalendar value={date} onValueChange={setDate} />",
  "value: YYYY-MM-DD; onValueChange: (value: string) => void; label?: string",
  "Mũi tên di chuyển ngày/tuần; Home/End đến đầu/cuối tuần.",
  'const [date, setDate] = useState("2026-10-17");',
);
add(
  "Card",
  "Foundation",
  "Card hiện có với năm chất liệu kính.",
  "GlassCard",
  "components/GlassCard",
  '<GlassCard level="crystal" interactive padding="md"><h3>Build something beautiful</h3><p>A reusable glass surface.</p></GlassCard>',
  "level?: clear | frosted | crystal | deep | liquid; padding?: none | sm | md | lg; interactive?, tilt?, reveal?: boolean",
  "Dùng trực tiếp GlassCard từ website; giảm chuyển động theo cài đặt thiết bị.",
);
add(
  "Carousel",
  "Data",
  "Duyệt các slide bằng nút điều khiển.",
  "GlassCarousel",
  data,
  '<GlassCarousel slides={[{ title: "Design", description: "Start with a system." }, { title: "Develop", description: "Compose your interface." }, { title: "Publish", description: "Share your work." }]} />',
  "slides: { title, description }[]",
  "Không tự động chạy; thông báo số slide hiện tại, vô hiệu hóa nút ở hai đầu.",
);
add(
  "Chart",
  "Data",
  "Biểu đồ cột cho dữ liệu số không âm.",
  "GlassChart",
  data,
  '<GlassChart label="Weekly orders" data={[{ label: "Mon", value: 24 }, { label: "Tue", value: 38 }, { label: "Wed", value: 31 }, { label: "Thu", value: 56 }, { label: "Fri", value: 42 }]} />',
  "data: { label: string; value: number }[]; label: string",
  "SVG responsive có bảng dữ liệu thay thế; demo chưa tích hợp nguồn dữ liệu thật.",
);
add(
  "Checkbox",
  "Forms",
  "Lựa chọn bật/tắt độc lập trong biểu mẫu.",
  "GlassCheckbox",
  controls,
  '<GlassCheckbox label="Accept design updates" checked={checked} onCheckedChange={setChecked} />',
  "label: string; checked: boolean; onCheckedChange: (boolean) => void; disabled?, name?",
  "Radix Checkbox; Space đổi trạng thái, hỗ trợ name khi dùng trong form.",
  "const [checked, setChecked] = useState(false);",
);
add(
  "Code Block",
  "Content",
  "Khối mã có ngôn ngữ và nút sao chép.",
  "GlassCodeBlock",
  content,
  '<GlassCodeBlock language="tsx" code={"<GlassButton>Build</GlassButton>"} />',
  "code: string; language?: string",
  "Mã hiển thị dạng text an toàn; sao chép bằng Clipboard API.",
);
add(
  "Collapsible",
  "Content",
  "Mở và thu gọn một vùng nội dung.",
  "GlassCollapsible",
  content,
  '<GlassCollapsible title="Show dependencies"><p>React · Tailwind CSS · Motion · Radix UI</p></GlassCollapsible>',
  "title: string; children: ReactNode",
  "details gốc hỗ trợ bàn phím; khác Accordion ở chỗ chỉ có một vùng nội dung.",
);
add(
  "Combobox",
  "Forms",
  "Nhập tìm kiếm và chọn gợi ý.",
  "GlassCombobox",
  overlays,
  '<GlassCombobox label="Framework" options={["React", "Next.js", "Vue", "Svelte"]} value={value} onValueChange={setValue} />',
  "label: string; options: string[]; value: string; onValueChange: (string) => void",
  "Dùng input + datalist gốc; cho phép giá trị tự nhập, popup tùy trình duyệt.",
  'const [value, setValue] = useState("");',
);
add(
  "Command",
  "Navigation",
  "Tìm kiếm và thực thi các lệnh trong danh sách.",
  "GlassCommand",
  overlays,
  '<GlassCommand label="Quick actions" actions={[{ label: "Create project", onSelect: () => setResult("Project created") }, { label: "Open settings", onSelect: () => setResult("Settings selected") }]} />',
  "label: string; actions: { label, onSelect, disabled? }[]",
  "Tìm kiếm văn bản; Tab đến lệnh, Enter để chạy. Đây là danh sách lệnh, chưa có phím tắt toàn ứng dụng.",
  'const [result, setResult] = useState("Choose a command");',
);
add(
  "Context Menu",
  "Overlays",
  "Menu ngữ cảnh khi nhấp chuột phải.",
  "GlassContextMenu",
  overlays,
  '<GlassContextMenu actions={[{ label: "Copy title", onSelect: () => setResult("Title copied in demo") }, { label: "Duplicate", onSelect: () => setResult("Item duplicated") }]}>Right-click or press Shift+F10 here.</GlassContextMenu>',
  "actions: { label, onSelect, disabled? }[]; children: ReactNode",
  "Radix ContextMenu: menu có điều hướng bằng mũi tên và Escape.",
  'const [result, setResult] = useState("No action yet");',
);
add(
  "Data Table",
  "Data",
  "Bảng có lọc, sắp xếp và phân trang.",
  "GlassDataTable",
  data,
  '<GlassDataTable caption="Projects" columns={[{ key: "name", label: "Name" }, { key: "status", label: "Status" }]} rows={[{ name: "Portfolio", status: "Live" }, { name: "Design system", status: "In progress" }]} pageSize={4} />',
  "columns: { key, label }[]; rows: Record<string, string | number>[]; caption: string; pageSize?: number",
  "Lọc mọi cột, click tiêu đề để đổi chiều sắp xếp; phân trang phía client.",
);
add(
  "Date Picker",
  "Forms",
  "Chọn ngày trong popup lịch.",
  "GlassDatePicker",
  data,
  '<GlassDatePicker label="Launch date" value={date} onValueChange={setDate} />',
  "label: string; value: YYYY-MM-DD; onValueChange: (string) => void",
  "Kết hợp Popover + Calendar; Escape để đóng popup.",
  'const [date, setDate] = useState("2026-10-17");',
);
add(
  "Dialog",
  "Overlays",
  "Hộp thoại nội dung trên nền trang.",
  "GlassDialog",
  basics,
  '<GlassDialog trigger="Open dialog" title="Project details"><p>Build with the Liquid Glass system.</p></GlassDialog>',
  "trigger, title: string; children: ReactNode",
  "Dùng dialog/showModal gốc: focus trap, Escape và khôi phục focus.",
);
add(
  "Direction",
  "Foundation",
  "Cấu hình hướng trái-phải hoặc phải-trái.",
  "GlassDirection",
  content,
  '<GlassDirection dir="rtl"><p>مرحبا بكم في نظام التصميم</p><p>Right-to-left layout</p></GlassDirection>',
  "dir: ltr | rtl; children: ReactNode",
  "Truyền direction cho Radix và thuộc tính dir cho DOM.",
);
add(
  "Drawer",
  "Overlays",
  "Panel mở từ cạnh dưới màn hình.",
  "GlassDrawer",
  overlays,
  '<GlassDrawer trigger="Open drawer" title="Daily goal" description="Set a goal for your next project."><p>Start with one reusable component.</p></GlassDrawer>',
  "trigger, title, description: string; children: ReactNode",
  "Dùng Radix Dialog đặt dưới màn hình; đóng bằng Escape/overlay, chưa có kéo để đóng.",
);
add(
  "Dropdown Menu",
  "Overlays",
  "Danh sách thao tác từ một nút mở.",
  "GlassDropdownMenu",
  overlays,
  '<GlassDropdownMenu label="Actions" actions={[{ label: "Edit", onSelect: () => setResult("Edit selected") }, { label: "Archive", onSelect: () => setResult("Archived in demo") }]} />',
  "label: string; actions: { label, onSelect, disabled? }[]",
  "Radix DropdownMenu có typeahead, mũi tên, Enter và Escape.",
  'const [result, setResult] = useState("No action yet");',
);
add(
  "Empty",
  "Content",
  "Trạng thái khi chưa có nội dung.",
  "GlassEmpty",
  content,
  '<GlassEmpty title="No projects yet" description="Create your first project to get started."><GlassButton>Create project</GlassButton></GlassEmpty>',
  "title, description: string; children?: ReactNode",
  "Gợi ý hành động tiếp theo bằng children.",
  undefined,
  "import { GlassButton } from './components/GlassButton';",
);
add(
  "Field",
  "Forms",
  "Nhãn, mô tả và lỗi liên kết với input.",
  "GlassField",
  controls,
  '<GlassField label="Email" hint="We will only use this for project updates."><GlassInput type="email" placeholder="you@example.com" required /></GlassField>',
  "label: string; hint?, error?: string; children: ReactElement",
  "Tự liên kết id, aria-describedby và aria-invalid; validation do ứng dụng cung cấp.",
  undefined,
  "import { GlassInput } from './components/GlassUI';",
);
add(
  "Hover Card",
  "Overlays",
  "Thông tin phụ khi trỏ vào liên kết.",
  "GlassHoverCard",
  overlays,
  '<GlassHoverCard href="#/development" label="@potato-ui"><strong>Potato UI</strong><p>Liquid Glass components for React.</p></GlassHoverCard>',
  "href, label: string; children: ReactNode",
  "Radix HoverCard dành cho nội dung bổ sung; không đặt thông tin thiết yếu chỉ trong hover.",
);
add(
  "Input",
  "Forms",
  "Trường nhập hỗ trợ thuộc tính HTML.",
  "GlassInput",
  basics,
  '<label>Email<GlassInput type="email" placeholder="you@example.com" required /></label>',
  "Native InputHTMLAttributes<HTMLInputElement>",
  "Hỗ trợ required, disabled, aria-invalid, type và autocomplete.",
);
add(
  "Input Group",
  "Forms",
  "Input kèm tiền tố hoặc hậu tố.",
  "GlassInputGroup",
  controls,
  '<GlassInputGroup aria-label="Website address" prefix="https://" suffix=".com" placeholder="your-brand" />',
  "Native input props; prefix?, suffix?: ReactNode",
  "Dùng aria-label hoặc label liên kết; tiền tố không thay thế nhãn.",
);
add(
  "Input OTP",
  "Forms",
  "Nhập mã xác nhận số có thể dán.",
  "GlassInputOTP",
  controls,
  '<GlassInputOTP label="Verification code" value={code} onValueChange={setCode} length={6} />',
  "label: string; value: string; onValueChange: (string) => void; length?: number",
  "Một input gốc với inputMode=numeric và one-time-code; không gửi mã đến server.",
  'const [code, setCode] = useState("");',
);
add(
  "Item",
  "Content",
  "Một dòng nội dung với icon và hành động.",
  "GlassItem",
  content,
  '<GlassItem title="Design system" description="Updated a few minutes ago" leading={<GlassAvatar name="Design System" />} trailing={<span>Active</span>} />',
  "title: string; description?: string; leading?, trailing?: ReactNode",
  "Khối trình bày có thể kết hợp trong danh sách hoặc card.",
  undefined,
  "import { GlassAvatar } from './components/ui/content';",
);
add(
  "Kbd",
  "Foundation",
  "Biểu diễn phím hoặc tổ hợp phím.",
  "GlassKbd",
  content,
  "<span>Press <GlassKbd>⌘</GlassKbd> + <GlassKbd>K</GlassKbd> to search.</span>",
  "children: ReactNode",
  "Phần trình bày dùng thẻ kbd; không tự đăng ký phím tắt.",
);
add(
  "Label",
  "Forms",
  "Nhãn có thể liên kết với form control.",
  "GlassLabel",
  controls,
  '<div><GlassLabel htmlFor="project-name">Project name</GlassLabel><GlassInput id="project-name" placeholder="My next project" /></div>',
  "Native LabelHTMLAttributes<HTMLLabelElement>",
  "htmlFor phải trỏ đến id của input tương ứng.",
  undefined,
  "import { GlassInput } from './components/GlassUI';",
);
add(
  "Marker",
  "Content",
  "Đánh dấu đoạn văn bản đáng chú ý.",
  "GlassMarker",
  content,
  "<p>Build once, <GlassMarker>reuse everywhere</GlassMarker>.</p>",
  "children: ReactNode",
  "Dùng mark ngữ nghĩa, thừa hưởng màu nhấn của theme.",
);
add(
  "Menubar",
  "Navigation",
  "Thanh menu cho giao diện ứng dụng.",
  "GlassMenubar",
  overlays,
  '<GlassMenubar menus={[{ label: "File", actions: [{ label: "New project", onSelect: () => setResult("New project") }] }, { label: "View", actions: [{ label: "Preview", onSelect: () => setResult("Preview selected") }] }]} />',
  "menus: { label, actions: { label, onSelect, disabled? }[] }[]",
  "Radix Menubar hỗ trợ mũi tên trái/phải giữa các menu.",
  'const [result, setResult] = useState("Choose a menu action");',
);
add(
  "Message",
  "Content",
  "Nội dung hội thoại có tác giả.",
  "GlassMessage",
  content,
  '<GlassMessage author="assistant" name="Potato UI">Your component is ready to preview.</GlassMessage>',
  "author: user | assistant; name: string; children: ReactNode",
  "Bố cục thay đổi theo tác giả; có tên rõ ràng cho mỗi message.",
);
add(
  "Message Scroller",
  "Content",
  "Vùng hội thoại cuộn và nút đến tin mới.",
  "GlassMessageScroller",
  content,
  '<GlassMessageScroller label="Project conversation"><GlassMessage author="user" name="You">Build a glass interface.</GlassMessage><GlassMessage author="assistant" name="Potato UI">Start with the foundation components.</GlassMessage></GlassMessageScroller>',
  "label?: string; children: ReactNode",
  "role=log cho danh sách tin; Jump to latest cuộn đến cuối vùng.",
  undefined,
  "import { GlassMessage } from './components/ui/content';",
);
add(
  "Native Select",
  "Forms",
  "Select gốc của trình duyệt.",
  "GlassNativeSelect",
  controls,
  '<label>Role<GlassNativeSelect defaultValue="designer"><option value="designer">Designer</option><option value="developer">Developer</option></GlassNativeSelect></label>',
  "Native SelectHTMLAttributes<HTMLSelectElement>",
  "Dùng popup hệ thống, phù hợp form và thiết bị di động.",
);
add(
  "Navigation Menu",
  "Navigation",
  "Điều hướng tới các tài nguyên.",
  "GlassNavigationMenu",
  overlays,
  '<GlassNavigationMenu items={[{ label: "Components", href: "#/development", description: "Browse the library" }, { label: "Button", href: "#/development/button", description: "Actions and variants" }]} />',
  "items: { label, href, description? }[]",
  "Liên kết thực trong Radix NavigationMenu; không dùng menu hành động thay điều hướng.",
);
add(
  "Pagination",
  "Navigation",
  "Điều hướng giữa các trang dữ liệu.",
  "GlassPagination",
  data,
  "<GlassPagination page={page} totalPages={8} onPageChange={setPage} />",
  "page: number; totalPages: number; onPageChange: (number) => void",
  "Đánh dấu trang hiện tại, vô hiệu hóa nút ở đầu/cuối, thu gọn trang xa.",
  "const [page, setPage] = useState(1);",
);
add(
  "Popover",
  "Overlays",
  "Nội dung và điều khiển trong popup.",
  "GlassPopover",
  overlays,
  '<GlassPopover trigger="Dimensions" title="Card dimensions"><label>Width<GlassInput defaultValue="320px" /></label></GlassPopover>',
  "trigger, title: string; children: ReactNode",
  "Radix Popover có focus và vị trí tự động, Escape/nhấp ngoài để đóng.",
  undefined,
  "import { GlassInput } from './components/GlassUI';",
);
add(
  "Progress",
  "Foundation",
  "Thể hiện tiến trình có tên và giá trị.",
  "GlassProgress",
  basics,
  '<GlassProgress label="Project progress" value={64} />',
  "value: number; label: string",
  "Giới hạn giá trị từ 0–100, dùng progressbar cho công nghệ hỗ trợ.",
);
add(
  "Questionnaire",
  "Forms",
  "Câu hỏi lựa chọn đơn có submit.",
  "GlassQuestionnaire",
  content,
  '<GlassQuestionnaire question="What are you building?" options={["Website", "Dashboard", "Mobile web"]} onSubmit={answer => console.log(answer)} />',
  "question: string; options: string[]; onSubmit: (string) => void",
  "Fieldset + radio gốc; bắt buộc chọn trước submit, kết quả chỉ nằm trong demo.",
);
add(
  "Radio Group",
  "Forms",
  "Một lựa chọn trong các phương án.",
  "GlassRadioGroup",
  controls,
  '<GlassRadioGroup label="Plan" options={["Free", "Pro", "Team"]} value={plan} onValueChange={setPlan} />',
  "label: string; options: string[]; value: string; onValueChange: (string) => void; name?",
  "Radix RadioGroup với điều hướng mũi tên.",
  'const [plan, setPlan] = useState("Pro");',
);
add(
  "Resizable",
  "Foundation",
  "Hai panel có kích thước điều chỉnh.",
  "GlassResizable",
  data,
  "<GlassResizable left={<p>Sidebar</p>} right={<p>Main content</p>} />",
  "left, right: ReactNode; label?: string",
  "Kéo tay nắm hoặc dùng mũi tên/Home/End; giới hạn tỷ lệ 20–80%.",
);
add(
  "Scroll Area",
  "Foundation",
  "Vùng cuộn có chiều cao giới hạn.",
  "GlassScrollArea",
  content,
  '<GlassScrollArea label="Activity" height={160}>{Array.from({ length: 12 }, (_, i) => <p key={i}>Activity item {i + 1}</p>)}</GlassScrollArea>',
  "label: string; height?: number; children: ReactNode",
  "Vùng có thể focus để cuộn bằng bàn phím; thanh cuộn CSS.",
);
add(
  "Select",
  "Forms",
  "Select tùy chỉnh theo hệ Liquid Glass.",
  "GlassSelectMenu",
  overlays,
  '<GlassSelectMenu label="Framework" options={["React", "Next.js", "Vue"]} value={framework} onValueChange={setFramework} />',
  "label: string; options: string[]; value?: string; onValueChange: (string) => void; placeholder?",
  "Radix Select với typeahead, phím mũi tên, Enter và Escape.",
  'const [framework, setFramework] = useState("React");',
);
add(
  "Separator",
  "Foundation",
  "Đường phân chia các nhóm nội dung.",
  "GlassSeparator",
  content,
  "<div><p>Account settings</p><GlassSeparator /><p>Notification preferences</p></div>",
  "No props",
  "Thẻ hr mang ngữ nghĩa phân cách.",
);
add(
  "Sheet",
  "Overlays",
  "Panel mở từ cạnh phải màn hình.",
  "GlassSheet",
  overlays,
  '<GlassSheet trigger="Open sheet" title="Edit profile" description="Update your profile details."><label>Name<GlassInput defaultValue="Alex Chen" /></label></GlassSheet>',
  "trigger, title, description: string; children: ReactNode",
  "Radix Dialog: focus trap, đóng bằng Escape/overlay, khôi phục focus.",
  undefined,
  "import { GlassInput } from './components/GlassUI';",
);
add(
  "Sidebar",
  "Navigation",
  "Thanh điều hướng cho giao diện ứng dụng.",
  "GlassSidebar",
  content,
  '<GlassSidebar title="Workspace" activeHref="#/development/sidebar" items={[{ label: "Overview", href: "#/development" }, { label: "Components", href: "#/development/sidebar" }]} />',
  "title: string; items: { label, href }[]; activeHref: string",
  "aria-current đánh dấu trang đang mở; dùng liên kết thật.",
);
add(
  "Skeleton",
  "Foundation",
  "Khung chờ nội dung đang tải.",
  "GlassSkeleton",
  content,
  '<div role="status" aria-label="Loading profile"><GlassSkeleton width={48} height={48} rounded /><GlassSkeleton width="80%" height={16} /><GlassSkeleton width="60%" height={12} /></div>',
  "width?: number | string; height?: number; rounded?: boolean",
  "Ẩn hình trang trí khỏi trình đọc màn hình; đặt nhãn loading cho nhóm bên ngoài.",
);
add(
  "Slider",
  "Forms",
  "Điều chỉnh một giá trị trong phạm vi.",
  "GlassSlider",
  controls,
  '<GlassSlider label="Opacity" value={value} onValueChange={setValue} min={0} max={100} step={1} />',
  "label: string; value: number; onValueChange: (number) => void; min?, max?, step?, disabled?",
  "Radix Slider hỗ trợ kéo, mũi tên và Home/End.",
  "const [value, setValue] = useState(64);",
);
add(
  "Spinner",
  "Foundation",
  "Chỉ báo tác vụ đang xử lý.",
  "GlassSpinner",
  content,
  '<GlassSpinner label="Loading components" />',
  "label?: string",
  "Có role=status và nhãn văn bản; giảm tốc độ khi người dùng chọn reduced motion.",
);
add(
  "Switch",
  "Forms",
  "Bật/tắt một tùy chọn tức thời.",
  "GlassSwitch",
  basics,
  '<GlassSwitch label="Notifications" checked={enabled} onCheckedChange={setEnabled} />',
  "label: string; checked: boolean; onCheckedChange: (boolean) => void; disabled?",
  "Space đổi trạng thái; aria-checked phản ánh trạng thái hiện tại.",
  "const [enabled, setEnabled] = useState(true);",
);
add(
  "Table",
  "Data",
  "Bảng ngữ nghĩa cho dữ liệu có cấu trúc.",
  "GlassTable",
  data,
  '<GlassTable caption="Invoices" columns={[{ key: "id", label: "Invoice" }, { key: "amount", label: "Amount" }]} rows={[{ id: "INV-001", amount: 240 }, { id: "INV-002", amount: 180 }]} />',
  "columns: { key, label }[]; rows: Record<string, string | number>[]; caption: string",
  "thead, tbody, caption và scope=col; cuộn ngang ở màn hình nhỏ.",
);
add(
  "Tabs",
  "Navigation",
  "Chuyển giữa các vùng nội dung liên quan.",
  "GlassTabs",
  basics,
  '<GlassTabs items={[{ label: "Design", content: "Your design" }, { label: "Code", content: "Your code" }]} />',
  "items: { label: string; content: ReactNode }[]",
  "Roving focus; mũi tên/Home/End đổi tab, liên kết aria-controls/labelledby.",
);
add(
  "Textarea",
  "Forms",
  "Nhập nội dung nhiều dòng.",
  "GlassTextarea",
  basics,
  '<label>Project description<GlassTextarea rows={4} placeholder="Describe your project…" /></label>',
  "Native TextareaHTMLAttributes<HTMLTextAreaElement>",
  "Đặt nhãn rõ ràng; hỗ trợ required, disabled và resize gốc.",
);
add(
  "Toast",
  "Overlays",
  "Thông báo tạm thời sau thao tác.",
  "GlassToast",
  overlays,
  '<GlassToast trigger="Save changes" title="Changes saved" description="This is a demo notification. No data was sent to a server." />',
  "trigger, title, description: string",
  "Radix Toast; tự đóng sau 5 giây, có Dismiss và vuốt sang phải để đóng.",
);
add(
  "Toggle",
  "Forms",
  "Nút bật/tắt một chế độ.",
  "GlassToggle",
  controls,
  '<GlassToggle label="Bold" pressed={pressed} onPressedChange={setPressed}>B</GlassToggle>',
  "label: string; pressed: boolean; onPressedChange: (boolean) => void; children?",
  "Radix Toggle với aria-pressed, Enter/Space đổi trạng thái.",
  "const [pressed, setPressed] = useState(false);",
);
add(
  "Toggle Group",
  "Forms",
  "Nhóm lựa chọn đơn dạng nút.",
  "GlassToggleGroup",
  controls,
  '<GlassToggleGroup label="Alignment" options={["Left", "Center", "Right"]} value={align} onValueChange={setAlign} />',
  "label: string; options: string[]; value: string; onValueChange: (string) => void",
  "Radix ToggleGroup với roving focus; giữ ít nhất một lựa chọn.",
  'const [align, setAlign] = useState("Left");',
);
add(
  "Tooltip",
  "Overlays",
  "Chú giải ngắn cho một điều khiển.",
  "GlassTooltip",
  overlays,
  '<GlassTooltip text="Save this project"><button className="g-toggle glass-clear">Save</button></GlassTooltip>',
  "text: string; children: ReactElement",
  "Radix Tooltip hỗ trợ hover và focus; dùng phần tử có thể focus làm trigger.",
);
add(
  "Trace",
  "Content",
  "Danh sách tiến trình thực thi từng bước.",
  "GlassTrace",
  content,
  '<GlassTrace steps={[{ title: "Load source", description: "Component files loaded", status: "complete" }, { title: "Build preview", description: "Preparing your interface", status: "running" }, { title: "Publish", description: "Waiting for build", status: "pending" }]} />',
  "steps: { title, description, status: complete | running | pending }[]",
  "Hiển thị tiến trình do ứng dụng truyền vào; không giả lập tác vụ nền.",
);
add(
  "Typography",
  "Foundation",
  "Nhịp điệu chữ cho nội dung dài.",
  "GlassTypography",
  content,
  "<GlassTypography><h3>Design with clarity.</h3><p>Good interfaces make the next action easy to understand.</p><blockquote>Build once. Refine often.</blockquote></GlassTypography>",
  "children: ReactNode",
  "Sử dụng heading đúng thứ bậc, paragraph và blockquote ngữ nghĩa.",
);

export const componentDocs: ComponentDoc[] = docs.map((doc) => ({
  ...doc,
  slug: doc.title.toLowerCase().replaceAll(" ", "-"),
}));
export const groups: ComponentGroup[] = [
  "Foundation",
  "Forms",
  "Navigation",
  "Overlays",
  "Data",
  "Content",
];
export function usageCode(doc: ComponentDoc) {
  return `import React${doc.state ? ", { useState }" : ""} from 'react';\nimport { ${doc.component} } from './${doc.module}';\n${doc.extraImports ? `${doc.extraImports}\n` : ""}\nexport function Example() {\n${doc.state ? `  ${doc.state}\n` : ""}  return (\n    ${doc.body}\n  );\n}`;
}
