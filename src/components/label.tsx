import { type LabelProps } from "react-html-props"
import { forwardRef } from "react"
import { cx } from "cva"

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label({ className, ...props }, ref) {
  return (
    <div className={cx("relative top-3 inline-flex flex-col text-sm ml-3 text-base-3", className)}>
      <label className="z-[2] px-1" ref={ref} {...props} />
      <span className="relative bg-base -top-[10px] px-1 h-[2px] z-[1]" dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
    </div>
  )
})

/*
    <div className={cx("relative z-[2] inline-flex top-3 flex-col text-sm ml-3 text-base-3", className)}>
      <label className="relative z-[2] top-4 px-1" ref={ref} {...props} />
      <span className="relative top-1 bg-base text-xs px-1" dangerouslySetInnerHTML={{ __html: "&nbsp;" }} />
    </div >
*/