import type { Meta, StoryObj } from "@storybook/react";
import { Navbar, NavbarMenu } from "../components/navbar";
import { MenuItem } from "../components/menu";
import logo from "../assets/forte.png"
const meta = {
  title: "Tawasukha UI/Navbar",
  component: Navbar,
  tags: ["docsPage"],
  argTypes: {
  },
} satisfies Meta<typeof Navbar>;

export default meta;

export const Basic: StoryObj<typeof Navbar> = {
  args: {
    className: "bg-base shadow-md shadow-offset",
    left: <a href="#">
      <img className="w-auto h-6 sm:h-7" src={logo} />
    </a>,
    right: <div className="flex flex-row">
      <a className="my-2 text-base-3 transition-colors duration-300 transform hover:text-primary-3 mx-4" href="#">Home</a>
      <a className="my-2 text-base-3 transition-colors duration-300 transform hover:text-primary-3 mx-4" href="#">Shop</a>
      <a className="my-2 text-base-3 transition-colors duration-300 transform hover:text-primary-3 mx-4" href="#">Contact</a>
      <a className="my-2 text-base-3 transition-colors duration-300 transform hover:text-primary-3 mx-4" href="#">About</a>
    </div>,
  },
  render(args) {
    return <Navbar {...args} />
  },
};

export const Menu: StoryObj<typeof Navbar> = {
  args: {
    className: "bg-base shadow-md shadow-offset",
    left: <a href="#" className="flex flex-row">
      <img className="h-10 w-10 mr-4" src={logo} />
      <span className="text-md text-base-3 text-2xl">Tawasukha UI</span>
    </a>,
    right: <div className="flex flex-row">
      <NavbarMenu icon="HomeIcon" label="Home" href="#" />
      <NavbarMenu icon="MusicalNoteIcon" label="Menu 1">
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
      </NavbarMenu>
      <NavbarMenu icon="NewspaperIcon" label="Menu 2">
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
      </NavbarMenu>
      <NavbarMenu icon="InboxIcon" label="Menu 3" last>
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
        <MenuItem icon="AcademicCapIcon">Academic</MenuItem>
        <MenuItem icon="AdjustmentsHorizontalIcon">Adjustment</MenuItem>
        <MenuItem icon="ArchiveBoxIcon">Archive</MenuItem>
        <MenuItem icon="Battery0Icon">Battery</MenuItem>
      </NavbarMenu>
    </div>,
  },
  render(args) {
    return <Navbar {...args} />
  },
};

