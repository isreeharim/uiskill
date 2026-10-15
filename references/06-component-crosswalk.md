# Universal Component Crosswalk: 25 UI Elements Across 12 Libraries

This reference maps common user interface elements across all 12 libraries, including exact component names, import paths, and implementation strategies.

---

## Component Mapping Matrix

| UI Component | shadcn/ui | MUI (Material) | Mantine | Ant Design | HeroUI | Base UI | DaisyUI | Reshaped |
|---|---|---|---|---|---|---|---|---|
| **Button** | `Button` | `Button` | `Button` | `Button` | `Button` | `Button` | `.btn` | `Button` |
| **Modal / Dialog** | `Dialog` | `Dialog` | `Modal` | `Modal` | `Modal` | `Dialog` | `.modal` | `Modal` |
| **Drawer / Sheet** | `Sheet` | `Drawer` | `Drawer` | `Drawer` | `Drawer` | `Drawer` (Preview)| `.drawer` | `Sheet` |
| **Dropdown Menu** | `DropdownMenu` | `Menu` | `Menu` | `Dropdown` | `Dropdown` | `Menu` | `.dropdown` | `DropdownMenu`|
| **Popover** | `Popover` | `Popover` | `Popover` | `Popover` | `Popover` | `Popover` | `.popover` (CSS) | `Popover` |
| **Tooltip** | `Tooltip` | `Tooltip` | `Tooltip` | `Tooltip` | `Tooltip` | `Tooltip` | `.tooltip` | `Tooltip` |
| **Accordion** | `Accordion` | `Accordion` | `Accordion` | `Collapse` | `Accordion` | `Accordion` | `.collapse` | `Accordion` |
| **Tabs** | `Tabs` | `Tabs` | `Tabs` | `Tabs` | `Tabs` | `Tabs` | `.tabs` | `Tabs` |
| **Data Table** | `Table` + TanStack| `DataGrid` / `Table` | `Table` | `Table` | `Table` | `Table` | `.table` | `Table` |
| **Input / Text Field**| `Input` | `TextField` | `TextInput` | `Input` | `Input` | `Input` | `.input` | `TextField` |
| **Checkbox** | `Checkbox` | `Checkbox` | `Checkbox` | `Checkbox` | `Checkbox` | `Checkbox` | `.checkbox` | `Checkbox` |
| **Radio Group** | `RadioGroup` | `RadioGroup` | `Radio.Group` | `Radio.Group`| `RadioGroup` | `RadioGroup`| `.radio` | `RadioGroup` |
| **Switch / Toggle** | `Switch` | `Switch` | `Switch` | `Switch` | `Switch` | `Switch` | `.toggle` | `Switch` |
| **Slider** | `Slider` | `Slider` | `Slider` | `Slider` | `Slider` | `Slider` | `.range` | `Slider` |
| **Select / Combobox** | `Select` | `Select` | `Select` | `Select` | `Select` | `Select` | `.select` | `Select` |
| **Autocomplete** | `Command` | `Autocomplete` | `Autocomplete` | `AutoComplete`| `Autocomplete`| Custom | Custom | Custom |
| **Avatar** | `Avatar` | `Avatar` | `Avatar` | `Avatar` | `Avatar` | Custom | `.avatar` | `Avatar` |
| **Badge** | `Badge` | `Badge` / `Chip`| `Badge` | `Badge` / `Tag`| `Chip` / `Badge`| Custom | `.badge` | `Badge` |
| **Card** | `Card` | `Card` | `Card` / `Paper`| `Card` | `Card` | Custom | `.card` | `Card` |
| **Toast** | `Sonner` / `Toast`| `Snackbar` | `notifications` | `message` / `notification` | `Toast` | Custom | `.toast` | Custom |
| **Command Palette** | `Command` (cmdk)| Custom | `Spotlight` | Custom | Custom | Custom | Custom | Custom |
| **Progress** | `Progress` | `LinearProgress`| `Progress` | `Progress` | `Progress` | `Progress` | `.progress` | `ProgressBar` |
| **Skeleton** | `Skeleton` | `Skeleton` | `Skeleton` | `Skeleton` | `Skeleton` | Custom | `.skeleton` | Custom |
| **Breadcrumbs** | `Breadcrumb` | `Breadcrumbs` | `Breadcrumbs` | `Breadcrumb` | `Breadcrumbs` | Custom | `.breadcrumbs` | `Breadcrumbs` |
| **Date Picker** | Calendar / Popover| `DatePicker` (X)| `DatePicker` | `DatePicker` | `DatePicker` | Custom | Native HTML | Custom |

---

## SaaS & Creative Kits Mapping (Untitled UI, AlignUI, Tailark, 21st.dev)

| Feature / Widget | Untitled UI (React) | AlignUI | Tailark | 21st.dev |
|---|---|---|---|---|
| **Metrics / Stat Card** | `MetricCard` with Sparklines | `StatCard` compound | `MetricBlock` | Animated Spotlight / CountUp |
| **Faceted Filter Bar** | `FilterBar` + Pills | `TagFilter` + Dropdowns | Filter Blocks | Interactive Morphing Filters |
| **Bento Grid** | Feature Matrix Grid | Grid Blocks | Bento Showcase | Aceternity / Magic Bento Grid |
| **Landing Hero** | Marketing Headers | Page Headers | Dusk / Veil Hero Blocks | Hero with Shader / Particles |
| **Pricing Matrix** | B2B Tier Table | Pricing Card | Dusk Pricing Comparison | 3D Interactive Pricing Card |
| **Auth / Login** | Enterprise SSO Screen | Compound Auth Card | Split Screen Auth Block | Floating Glow Auth Modal |
| **Figma Sync** | World-class Tokens | Remix Icon + Tokens | Built on shadcn Tokens | Vibe-coded / Copy-paste TSX |

---

## 3. Migration Recipes: Cross-Library Code Conversion

### Converting MUI Button to shadcn/ui
```tsx
// BEFORE (MUI):
import Button from "@mui/material/Button"
<Button variant="contained" color="primary" onClick={handleClick}>
  Submit
</Button>

// AFTER (shadcn/ui):
import { Button } from "@/components/ui/button"
<Button variant="default" onClick={handleClick}>
  Submit
</Button>
```

### Converting Ant Design Modal to Base UI / shadcn/ui
```tsx
// BEFORE (Ant Design):
import { Modal } from "antd"
<Modal title="Confirm Action" open={isOpen} onOk={handleOk} onCancel={handleCancel}>
  Are you sure you want to proceed?
</Modal>

// AFTER (shadcn/ui):
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

<Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm Action</DialogTitle>
    </DialogHeader>
    <p>Are you sure you want to proceed?</p>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
      <Button onClick={handleOk}>Proceed</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
