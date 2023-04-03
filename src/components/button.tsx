
import { cva, VariantProps } from "cva"
import { Icon } from "./icon"
import { ButtonProps as HtmlButtonProps } from "react-html-props"

const _button = cva(["flex items-center tracking-wide capitalize transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring hover:opacity-90"], {
  variants: {
    mode: {
      base: ["bg-base-3", "focus:ring-base-4", "text-white"],
      primary: ["bg-primary-3", "focus:ring-primary-4", "text-white"],
      secondary: ["bg-secondary-3", "focus:ring-secondary-4", "text-white"],
      success: ["bg-success-3", "focus:ring-success-4", "text-white"],
      warning: ["bg-warning-3", "focus:ring-warning-4", "text-white"],
      error: ["bg-error-3", "focus:ring-error-4", "text-white"],

      "outline-base": ["bg-base-2", "text-base-5", "ring-1", "ring-base-5", "focus:ring-base-4"],
      "outline-primary": ["bg-primary-2", "text-primary-5", "ring-1", "ring-primary-5", "focus:ring-primary-4"],
      "outline-secondary": ["bg-secondary-2", "text-secondary-5", "ring-1", "ring-secondary-5", "focus:ring-secondary-4"],
      "outline-success": ["bg-success-2", "text-success-5", "ring-1", "ring-success-5", "focus:ring-success-4"],
      "outline-warning": ["bg-warning-2", "text-warning-5", "ring-1", "ring-warning-5", "focus:ring-warning-4"],
      "outline-error": ["bg-error-2", "text-error-5", "ring-1", "ring-error-5", "focus:ring-error-4"],

    },
    size: {
      sm: ["pl-1 pr-2 py-1 text-sm"],
      md: ["pl-2 pr-3 py-2 text-md"],
      lg: ["pl-3 pr-4 py-2 text-lg"],
      xl: ["pl-3 pr-4 py-2 text-lg"]
    }
  }
})

const _icon = cva(["ml-1"], {
  variants: {
    mode: {
      base: [],
      primary: [],
      secondary: [],
      success: [],
      warning: [],
      error: [],
      "outline-base": [],
      "outline-primary": [],
      "outline-secondary": [],
      "outline-success": [],
      "outline-warning": [],
      "outline-error": []

    },
    size: {
      sm: ["w-4 h-4"],
      md: ["w-5 h-5"],
      lg: ["w-6 h-6"],
      xl: ["w-6 h-6"],
    }

  }
})

type Props = VariantProps<typeof _button>
type ModeProps = Required<{ mode: NonNullable<Props["mode"]> }>
type SizeProps = Required<{ size: NonNullable<Props["size"]> }>

export interface ButtonProps extends HtmlButtonProps, ModeProps, SizeProps {
  icon: string
  iconClassName?: string
}

export function Button({ icon, iconClassName, mode, size, className, children }: ButtonProps) {
  return <button className={_button({ mode, size, className })}>
    <Icon name={icon} className={_icon({ size, mode, className: iconClassName })} />
    <span className="ml-1">{children}</span>
  </button>
}