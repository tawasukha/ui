import { LabelProps } from "react-html-props"
import { forwardRef } from "react"
import { cx } from "cva"

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({ className, ...props }, ref) {
  return (
    <label {...props} className={cx("block text-sm ml-1 mb-1 text-base-3", className)} />
  )
})