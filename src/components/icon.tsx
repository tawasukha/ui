import { cva, type VariantProps } from "../helpers/cva"

export function Icon({
  className,
  ...props
}: Omit<React.SVGProps<SVGSVGElement>, "name"> & { name: React.FC<any>; className?: string }) {
  return <props.name className={className} />
}

const _icon = cva([], {
  variants: {
    mode: {
      base: ["text-base-3 fill-base-5"],
      primary: ["text-primary-3 fill-primary-5"],
      secondary: ["text-secondary-3 fill-secondary-5"],
      success: ["text-success-3 fill-success-5"],
      warning: ["text-warning-3 fill-warning-5"],
      error: ["text-error-3 fill-error-5"],
    },
  },
})

export type ModeProps = Required<{ mode: VariantProps<typeof _icon>["mode"] }>

export function StyledIcon({
  className,
  mode,
  ...rest
}: React.ComponentProps<typeof Icon> & ModeProps) {
  return (
    <Icon
      {...rest}
      className={_icon({
        mode,
        className,
      })}
    />
  )
}
