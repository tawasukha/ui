import { cva, type VariantProps } from "cva"
import { type DivProps } from "react-html-props"
import { forwardRef } from "react"
import { Icon } from "./icon"

const _box = cva(
  [
    "overflow-hidden rounded-full ring ring-base-2 text-base-3 flex justify-center items-center bg-base-1",
  ],
  {
    variants: {
      size: {
        sm: ["w-8 h-8"],
        md: ["w-10 h-10"],
        lg: ["w-12 h-12"],
        xl: ["w-16 h-16"],
      },
    },
  },
)

const _icon = cva(["bg-base-1 text-base-3"], {
  variants: {
    size: {
      sm: ["w-6 h-6"],
      md: ["w-8 h-8"],
      lg: ["w-10 h-10"],
      xl: ["w-14 h-14"],
    },
  },
})

const _text = cva([], {
  variants: {
    size: {
      sm: ["mt-0.5 text-xl"],
      md: ["mt-0.5 text-2xl"],
      lg: ["mt-1 text-3xl"],
      xl: ["mt-1 text-4xl"],
    },
  },
})

const _status = cva(["rounded-full absolute right-0 ring-1 ring-base-2"], {
  variants: {
    mode: {
      primary: ["bg-primary-3"],
      secondary: ["bg-secondary-3"],
      success: ["bg-success-3"],
      warning: ["bg-warning-3"],
      error: ["bg-error-3"],
    },
    size: {
      sm: ["w-2 h-2 bottom-0"],
      md: ["w-2.5 h-2.5 bottom-0"],
      lg: ["w-2.5 h-2.5 bottom-0.5"],
      xl: ["w-3 h-3 bottom-1"],
    },
  },
})

export interface AvatarProps
  extends DivProps,
    Required<{ size: NonNullable<VariantProps<typeof _box>["size"]> }>,
    Omit<VariantProps<typeof _status>, "size"> {
  image?: string
  icon?: React.FC<any>
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(function Avatar(
  { mode, size = "md", image, icon, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className="flex items-center gap-x-6" {...props}>
      <div className="relative">
        <div className={_box({ size })}>
          {image && <img className="object-cover" src={image} />}
          {icon && size && <Icon className={_icon({ size })} name={icon} />}
          {children && <span className={_text({ size })}>{children}</span>}
        </div>
        {mode && <span className={_status({ size, mode })} />}
      </div>
    </div>
  )
})
