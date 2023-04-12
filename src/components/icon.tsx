import { cva, type VariantProps } from "cva"
import { loadIcon, type ListIcon } from "@tawasukha/icon"
import React from "react";

export function Icon({ name, className, outline = false }: React.SVGProps<SVGSVGElement> & { outline?: boolean, name: ListIcon, className?: string }) {
  const HeroIcon = loadIcon(name, outline ? "outline" : "solid")
  return <HeroIcon className={className} />;
};

const _icon = cva([], {
  variants: {
    mode: {
      base: ["text-base-3 fill-base-5 stroke-base-3"],
      primary: ["text-primary-3 fill-primary-5 stroke-primary-3"],
      secondary: ["text-secondary-3 fill-secondary-5 stroke-secondary-3"],
      success: ["text-success-3 fill-success-5 stroke-success-3"],
      warning: ["text-warning-3 fill-warning-5 stroke-warning-3"],
      error: ["text-error-3 fill-error-5 stroke-error-3"],
    },
  },
})

export type ModeProps = Required<{ mode: VariantProps<typeof _icon>["mode"] }>

export function StyledIcon({ className, mode, ...rest }: React.ComponentProps<typeof Icon> & ModeProps) {
  return <Icon {...rest} className={_icon({
    mode, className,
  })} />
}

