import { forwardRef, useMemo, useRef } from "react";
import { type AProps, type NavProps } from "react-html-props";
import { cx } from "cva"
import { type ListIcon } from "@tawasukha/icon";
import { useOnClickOutside } from "../helpers/useOnClickOutside";
import { useBoolean } from "../helpers/useBoolean";
import { Icon } from "./icon";
import { AnimatePresence } from "framer-motion";
import { Menu } from "./menu";

export interface NavbarProps extends NavProps {
  left: JSX.Element,
  right: JSX.Element,
}

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(function Navbar({ left, right, className }, ref) {
  return <nav className={cx("container px-6 py-4 flex justify-between", className)}>
    <div className="flex items-center justify-between">
      {left}
    </div>

    <div className="z-20 px-6 py-4">
      {right}
    </div>
  </nav >
})

export interface NavbarMenuProps extends AProps {
  label: string,
  last?: boolean
  icon?: ListIcon
}

export const NavbarMenu = forwardRef<HTMLAnchorElement, NavbarMenuProps>(function DropdownMenu({ className, children, label, icon, href, last = false }, ref) {
  const { value: isOpen, setTrue, setFalse } = useBoolean()
  const refDropdown = useRef(null)
  const props = useMemo(() => {
    return href ? { href } : { onClick: setTrue }
  }, [href])

  useOnClickOutside(refDropdown, setFalse)

  return <div className="relative">
    <a ref={ref} className={cx("flex flex-row my-2 text-base-3 transition-colors",
      "duration-300 transform hover:text-primary-3 mx-4 cursor-pointer", className)}
      {...props}>
      {icon && <Icon className="w-5 h-5 mr-2" name={icon} />}
      {label}
    </a>
    <div ref={refDropdown} className={cx("absolute w-full z-10", last ? "right-[25px]" : "")}>
      <AnimatePresence>
        {isOpen && <Menu className="min-w-[180px] ml-2 w-full" transition={{ duration: 0.2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {children}
        </Menu>})
      </AnimatePresence>
    </div>
  </div >
})