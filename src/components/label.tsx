import { type LabelProps } from "react-html-props"
import { cx } from "../helpers/cva"

export function Label({ className, ...props }: LabelProps) {
  return (
    <div className={cx("relative top-3 inline-flex flex-col text-sm ml-3 text-base-3", className)}>
      <label className="z-[2] px-1" {...props} />
      <span
        className="relative bg-base -top-[10px] px-1 h-[2px] z-[1]"
        dangerouslySetInnerHTML={{ __html: "&nbsp;" }}
      />
    </div>
  )
}
