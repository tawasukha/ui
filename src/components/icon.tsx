import { cva, VariantProps } from "cva"
import { dynamic } from "helpers/dynamic"
import React from "react";

export function Icon({ name, className, outline = false }: React.SVGProps<SVGSVGElement> & { outline?: boolean, name: string }) {
  const HeroIcon = outline
    //@ts-expect-error
    ? dynamic(() => import("@heroicons/react/24/outline").then((mod) => ({ default: mod[name] })))
    //@ts-expect-error
    : dynamic(() => import("@heroicons/react/24/solid").then((mod) => ({ default: mod[name] })));
  return <HeroIcon className={className} aria-hidden={true} />;
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

type ModeProps = Required<{ mode: VariantProps<typeof _icon>["mode"] }>

export function StyledIcon({ className, mode, ...rest }: React.ComponentProps<typeof Icon> & ModeProps) {
  return <Icon {...rest} className={_icon({
    mode, className
  })} />
}