import { type ULProps, type LIProps } from "react-html-props"
import { cx } from "cva"
import { forwardRef } from "react"

type MenuItemProps = LIProps & {
  disabled?: boolean
  hover?: boolean
  active?: boolean
}

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(function MenuItem({ disabled, active, hover, className, ...props }, ref) {
  return <li ref={ref} className={cx("text-md w-full px-4 py-1.5", disabled ? "cursor-not-allowed text-gray-400" : "hover:bg-base-2 cursor-pointer", hover ? "bg-base-2" : "bg-base", active ? "text-primary-5 bg-base-2" : "text-base-5", className)} {...props} />
})

export const Menu = forwardRef<HTMLUListElement, ULProps>(function Menu({ className, ...props }, ref) {
  return <ul ref={ref} className={cx("relative mt-1 flex flex-col overflow-x-hidden overflow-y-scroll w-full bg-base rounded-lg shadow-offset shadow-md", className)} {...props} />
})

