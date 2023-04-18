import { forwardRef } from "react"
import { type DivProps } from "react-html-props"
import { useBoolean } from "../helpers/useBoolean"
import { AnimatePresence, motion } from "framer-motion"
import { type ListIcon } from "@tawasukha/icon"
import { Icon } from "./icon"
import { cx } from "cva"

export interface SidebarProps extends DivProps {
  isOpen?: boolean
}

export const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(function Sidebar(
  { className, children, isOpen = true },
  ref,
) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          transition={{ delay: 0.15 }}
          initial={{ opacity: 0, translateX: "-100%" }}
          animate={{ opacity: 1, translateX: "0%" }}
          exit={{ opacity: 0, translateX: "-100%" }}
          ref={ref}
          className={cx("flex flex-1 overflow-hidden", className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export interface SidebarMenuProps extends DivProps {
  icon: ListIcon
  label: string
  link?: string
}

export const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(function SidebarMenu(
  { className, icon, label, children, link },
  ref,
) {
  const { value: isOpen, toggle } = useBoolean()

  return (
    <div ref={ref} className="relative">
      <a
        href={link}
        className={cx(
          "flex flex-row py-3 px-4 border-base-2 border-b transition-colors",
          "duration-300 transform cursor-pointer items-center",
          isOpen && !!children
            ? "text-base bg-primary-3 hover:opacity-90"
            : "text-primary-3 bg-primary-1 hover:text-primary-5",
          className,
        )}
        onClick={toggle}
      >
        {icon && <Icon className={"w-5 h-5 mr-2"} name={icon} />}
        {label}
      </a>
      <div className={cx("relative")}>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="w-full"
              transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
              initial={{ opacity: 0, height: "0" }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: "0" }}
            >
              {children}
            </motion.ul>
          )}
          )
        </AnimatePresence>
      </div>
    </div>
  )
})
