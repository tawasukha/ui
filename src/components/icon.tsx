import { cva, VariantProps } from "cva"
import { loadIcon, ListIcon } from "@tawasukha/icon"
import React from "react";

export function Icon({ name, className, outline = false }: React.SVGProps<SVGSVGElement> & { outline?: boolean, name: ListIcon }) {
  const HeroIcon = loadIcon(name, outline ? "outline" : "solid")
  return <HeroIcon className={className} />;
};

const _icon = cva([], {
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

export type ModeProps = Required<{ mode: VariantProps<typeof _icon>["mode"] }>

export function StyledIcon({ className, mode, ...rest }: React.ComponentProps<typeof Icon> & ModeProps) {
  return <Icon {...rest} className={_icon({
    mode, className
  })} />
}