import { type ULProps, type LIProps } from "react-html-props"
import { cx } from "cva"
import { forwardRef } from "react"
import { motion } from "framer-motion"
import { Icon } from "../components/icon"

export type MenuItemProps = LIProps & {
  icon?: any
  disabled?: boolean
  hover?: boolean
  active?: boolean
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(function MenuItem(
  { icon, disabled, active, hover, className, children, ...props },
  ref,
) {
  return (
    <li
      ref={ref}
      className={cx(
        "flex flex-row text-md w-full px-4 py-1.5 items-center",
        disabled ? "cursor-not-allowed text-gray-400" : "hover:bg-base-2 cursor-pointer",
        hover ? "bg-base-2" : "bg-base",
        active ? "text-primary-4 bg-base-2" : "text-base-4",
        className,
      )}
      {...props}
    >
      {icon && <Icon name={icon} className="w-4 h-4 mr-2" />}
      {children}
    </li>
  )
})

const _Menu = forwardRef<HTMLUListElement, ULProps>(function Menu({ className, ...props }, ref) {
  return (
    <ul
      ref={ref}
      className={cx(
        "relative mt-1 flex flex-col overflow-x-hidden w-full bg-base rounded-lg shadow-offset shadow-md",
        className,
      )}
      {...props}
    />
  )
})

export const Menu = motion.create(_Menu)
