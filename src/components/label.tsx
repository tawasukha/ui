import { type LabelProps } from "react-html-props"
import { forwardRef } from "react"
import { cx } from "cva"

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { className, ...props },
  ref,
) {
  return (
    <div className={cx("relative top-3 inline-flex flex-col text-sm ml-3 text-base-3", className)}>
      <label className="z-[2] px-1" ref={ref} {...props} />
      <span
        className="relative bg-base -top-[10px] px-1 h-[2px] z-[1]"
        dangerouslySetInnerHTML={{ __html: "&nbsp;" }}
      />
    </div>
  )
})
