import { forwardRef, useImperativeHandle, useMemo, useRef } from "react"
import { type AProps, type NavProps } from "react-html-props"
import { cx } from "../helpers/cva"
import { useOnClickOutside } from "../helpers/useOnClickOutside"
import { useBoolean } from "../helpers/useBoolean"
import { Icon } from "./icon"
import { AnimatePresence } from "framer-motion"
import { Menu } from "./menu"

export interface NavbarProps extends NavProps {
  left: JSX.Element
  right: JSX.Element
}

export function Navbar({ left, right, className }: NavbarProps) {
  return (
    <nav className={cx("px-6 py-4 flex justify-between", className)}>
      <div className="flex items-center justify-between">{left}</div>

      <div className="z-20 pl-6 py-4">{right}</div>
    </nav>
  )
}

export interface NavbarMenuProps extends AProps {
  label?: string
  last?: boolean
  icon?: React.FC<any>
  iconOnly?: boolean
}

export type NavbarMenuElement = {
  close: () => void
}

export const NavbarMenu = forwardRef<NavbarMenuElement, NavbarMenuProps>(function NavbarMenu(
  { className, children, label, icon, iconOnly, href, last = false },
  ref,
) {
  const { value: isOpen, setTrue, setFalse } = useBoolean()
  const refDropdown = useRef(null)
  const props = useMemo(() => {
    return href ? { href } : { onClick: setTrue }
  }, [href])

  useOnClickOutside(refDropdown, setFalse)

  useImperativeHandle(ref, () => {
    return {
      close() {
        setFalse()
      },
    }
  })

  return (
    <div className="relative">
      <a
        className={cx(
          "flex flex-row my-2 text-base-4 transition-colors",
          "duration-300 transform hover:text-primary-3 mx-4 items-center cursor-pointer",
          className,
        )}
        {...props}
      >
        {icon && <Icon className={iconOnly ? "w-8 h-8 -mt-1" : "w-5 h-5 mr-2"} name={icon} />}
        {label}
      </a>
      <div ref={refDropdown} className={cx("absolute z-10", last ? "right-0" : "")}>
        <AnimatePresence>
          {isOpen && (
            <Menu
              className="min-w-[180px] ml-2 w-full overflow-hidden"
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0, height: "0" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: "0" }}
            >
              {children}
            </Menu>
          )}
          )
        </AnimatePresence>
      </div>
    </div>
  )
})
