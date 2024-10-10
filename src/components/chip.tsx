import { cva, type VariantProps } from "../helpers/cva"
import { type SpanProps } from "react-html-props"
import { Icon } from "./icon"
import { XMarkIcon } from "@heroicons/react/24/solid"

const _chip = cva(
  [
    "inline-flex items-center tracking-wide capitalize rounded-lg hover:shadow-md hover:shadow-offset",
  ],
  {
    variants: {
      mode: {
        base: ["bg-base-2", "text-base-5", "focus:shadow-base-1"],
        primary: ["bg-primary-2", "text-primary-5", "focus:shadow-primary-1"],
        secondary: ["bg-secondary-2", "text-secondary-5", "focus:shadow-secondary-1"],
        success: ["bg-success-2", "text-success-5", "focus:shadow-success-1"],
        warning: ["bg-warning-2", "text-warning-5", "focus:shadow-warning-1"],
        error: ["bg-error-2", "text-error-5", "focus:shadow-error-1"],
      },
      size: {
        sm: ["px-2 py-1 text-xs"],
        md: ["px-3 py-2 text-md"],
        lg: ["px-4 py-2 text-lg"],
        xl: ["px-4 py-2 text-lg"],
      },
    },
  },
)

const _icon = cva([], {
  variants: {
    size: {
      sm: ["-ml-1 mr-1 h-3 w-3 text-xs"],
      md: ["-ml-1 mr-2 h-4 w-4 text-sm"],
      lg: ["-ml-2 mr-2 h-5 w-5 text-md"],
      xl: ["-ml-2 mr-2 h-5 w-5 text-md"],
    },
  },
})

type Props = VariantProps<typeof _chip>

export type ChipProps = SpanProps &
  Required<{ mode: NonNullable<Props["mode"]>; size: NonNullable<Props["size"]> }>

export function Chip({ mode = "base", size = "sm", className, children, ...props }: ChipProps) {
  return (
    <span className={_chip({ mode, size, className })} {...props}>
      {children}
    </span>
  )
}

export type XChipProps = Omit<ChipProps, "ref"> & {
  onDismiss?: (T?: Record<any, any>) => void
}

export function XChip({ onDismiss, children, className, size = "sm", ...props }: XChipProps) {
  return (
    <Chip className="cursor-pointer" size={size} onClick={onDismiss} {...props}>
      <>
        <Icon name={XMarkIcon} className={_icon({ size })} />
        <span>{children}</span>
      </>
    </Chip>
  )
}
