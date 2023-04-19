import { cx } from "../../../helpers/cva"
import { type DivProps } from "react-html-props"

type IconProps = DivProps & {
  label: string
  active?: boolean
  name: any
}

const buttonClass =
  "fill-base-3 h-8 w-8 text-md flex justify-center items-center shadow shadow-offset rounded-md"

export function Icon({ onClick, label, active = false, ...props }: IconProps) {
  return (
    <div className="group flex" onClick={onClick}>
      <div
        className={cx(
          buttonClass,
          active ? "fill-primary-5 text-primary-5" : "hover:bg-primary-2/30 text-base-3",
        )}
      >
        <props.name className="h-4 w-4" />
      </div>
      <span className="absolute z-30 top-16 scale-0 transition-all rounded bg-base-5 text-base-1 p-2 text-xs group-hover:scale-100">
        {label}
      </span>
    </div>
  )
}
