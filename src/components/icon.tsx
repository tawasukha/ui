import { cva, VariantProps } from "cva"
import { useMemo } from "react";
import { InformationCircleIcon, CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

export const _icon_mode = cva([], {
  variants: {
    mode: {
      base: ["text-base-5"],
      primary: ["text-primary-5"],
      secondary: ["text-secondary-5"],
      success: ["text-success-5"],
      warning: ["text-warning-5"],
      error: ["text-error-5"],
    }
  }
})

export type IconModeProps = Required<{ mode: VariantProps<typeof _icon_mode>["mode"] }>

export type IconProps = React.ComponentProps<typeof InformationCircleIcon>

export function useIcon(name: NonNullable<IconModeProps["mode"]>) {
  return useMemo(() => {
    switch (name) {
      case "primary":
        return InformationCircleIcon
      case "secondary":
        return InformationCircleIcon
      case "success":
        return CheckCircleIcon
      case "warning":
        return ExclamationCircleIcon
      case "error":
        return XCircleIcon
      default:
        return null
    }
  }, [name])
}



