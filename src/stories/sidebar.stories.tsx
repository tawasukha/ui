import type { Meta, StoryObj } from "@storybook/react"
import { Sidebar, SidebarMenu } from "../components/sidebar"
import { MenuItem } from "../components/menu"
import {
  AcademicCapIcon,
  AdjustmentsHorizontalIcon,
  ArchiveBoxIcon,
  Battery0Icon,
  HomeIcon,
  InboxIcon,
  MusicalNoteIcon,
  NewspaperIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid"

const meta = {
  title: "Tawasukha UI/Sidebar",
  component: Sidebar,
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof Sidebar>

export default meta

export const Basic: StoryObj<typeof Sidebar> = {
  args: {
    className: "bg-base shadow-md shadow-offset h-full w-80",
  },
  render(args) {
    return <Sidebar {...args} />
  },
}

export const Menu: StoryObj<typeof Sidebar> = {
  args: {
    className: "bg-base shadow-md shadow-offset flex-col",
    children: (
      <div className="w-full overflow-y-auto">
        <SidebarMenu icon={HomeIcon} label="Home" />
        <SidebarMenu icon={MusicalNoteIcon} label="Menu 1">
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
        </SidebarMenu>
        <SidebarMenu icon={NewspaperIcon} label="Menu 2">
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
        </SidebarMenu>
        <SidebarMenu icon={InboxIcon} label="Menu 3">
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
        </SidebarMenu>
        <SidebarMenu icon={UserCircleIcon} label="User">
          <div className="px-4 py-2 bg-base-2 text-base-5 text-sm font-semibold opacity-80">
            Logged User
          </div>
          <MenuItem icon={AcademicCapIcon}>Academic</MenuItem>
          <MenuItem icon={AdjustmentsHorizontalIcon}>Adjustment</MenuItem>
          <MenuItem icon={ArchiveBoxIcon}>Archive</MenuItem>
          <MenuItem icon={Battery0Icon}>Battery</MenuItem>
        </SidebarMenu>
      </div>
    ),
  },
  render(args) {
    return <Sidebar {...args} />
  },
}
