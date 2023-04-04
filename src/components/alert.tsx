import { cva, VariantProps } from "cva"
import { DivProps, } from "react-html-props"
import { type MouseEventHandler } from "react"
import { XMarkIcon } from "@heroicons/react/24/solid"
import { _icon_mode, useIcon } from "./icon"

const _boxicon = cva(["flex items-center justify-center w-12 rounded-l-lg"], {
  variants: {
    mode: {
      base: ["bg-base"],
      primary: ["bg-primary-1"],
      secondary: ["bg-secondary-1"],
      success: ["bg-success-1"],
      warning: ["bg-warning-1"],
      error: ["bg-error-1"],
    }
  }
})

const _title = cva(["font-semibold"], {
  variants: {
    mode: {
      base: ["text-base-5"],
      primary: ["text-primary-5"],
      secondary: ["text-secondary-5"],
      success: ["text-success-5"],
      warning: ["text-warning-5"],
      error: ["text-error-5"],
    }
  },
  defaultVariants: {
    mode: "base"
  }
})


type Props = VariantProps<typeof _boxicon>

export interface AlertProps extends DivProps, Omit<Props, "mode">, Required<{ mode: NonNullable<Props["mode"]> }> {
  title: string;
  children: string;
  onDismiss?: MouseEventHandler<HTMLButtonElement>
}


export function Alert({ mode = "base", title, children, onDismiss }: AlertProps) {
  const Icon = useIcon(mode)

  return <div className="flex max-w-sm bg-base rounded-lg shadow-md shadow-offset">
    {mode !== "base" && <div className={_boxicon({ mode })}>
      {Icon && <Icon className={_icon_mode({ mode, className: "h-10 w-10" })} />}
    </div>}

    <div className="px-4 py-2 -mx-3 flex flex-1 flex-row">
      <div className="flex flex-1 flex-col mx-3">
        <span className={_title({ mode })}>{title}</span>
        <p className="text-sm text-base-5">{children}</p>
      </div>

      {onDismiss && <button className="text-base-5 hover:text-base-4 self-start" onClick={onDismiss}>
        <span className="sr-only">Dismiss</span>
        <XMarkIcon className={_icon_mode({ mode: "base", className: "h-6 w-6" })} />
      </button>}
    </div>
  </div >
}

