import { type LabelProps } from "react-html-props"
import { cx } from "../helpers/cva"

export function Label({ className, ...props }: LabelProps) {
  return (
    <div className={cx("relative top-1 inline-flex flex-col text-sm ml-1 text-base-3", className)}>
      <label className="z-[2] px-1" {...props} />
    </div>
  )
}
