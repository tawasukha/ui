import { cva, type VariantProps } from "cva"

export type CardProps = {
  title: string
  description: string
  className: any
}

const _box = cva(
  [
    "bg-base",
    "rounded-lg",
    "shadow-lg",
    "hover:ring-1",
    "overflow-hidden",
    "sm:max-w-xs",
    "lg:max-w-sm",
    "xl:max-w-md",
  ],
  {
    variants: {
      mode: {
        primary: ["ring-primary-3"],
        secondary: ["ring-secondary-3"],
        success: ["ring-success-3"],
        warning: ["ring-warning-3"],
        error: ["ring-error-3"],
      },
    },
  },
)

const _box_title = cva(["px-6 py-2 font-bold text-xl"], {
  variants: {
    mode: {
      primary: ["bg-primary-1", "text-primary-5"],
      secondary: ["bg-secondary-1", "text-secondary-5"],
      success: ["bg-success-1", "text-success-5"],
      warning: ["bg-warning-1", "text-warning-5"],
      error: ["bg-error-1", "text-error-5"],
    },
  },
})

export const Card = ({
  title,
  description,
  mode,
  className,
}: CardProps & VariantProps<typeof _box>) => {
  return (
    <div className={_box({ mode, className })}>
      <div className={_box_title({ mode })}>
        <h2>{title}</h2>
      </div>
      <p className={"px-6 py-4 text-base text-base-5"}>{description}</p>
    </div>
  )
}
