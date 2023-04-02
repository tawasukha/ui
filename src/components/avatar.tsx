import { cva, VariantProps } from "cva"
import { Icon } from "./icon"
import { DivProps } from "react-html-props"

const _box = cva(["overflow-hidden rounded-full ring ring-base-3 text-base-3 flex justify-center items-center bg-base-2"], {
    variants: {
        size: {
            sm: ["w-8 h-8"],
            md: ["w-10 h-10"],
            lg: ["w-12 h-12"],
            xl: ["w-16 h-16"],
        }
    }
})

const _icon = cva(["bg-base-2 text-base-3"], {
    variants: {
        size: {
            sm: ["w-6 h-6"],
            md: ["w-8 h-8"],
            lg: ["w-10 h-10"],
            xl: ["w-14 h-14"],
        }
    }
})

const _text = cva([], {
    variants: {
        size: {
            sm: ["text-xl"],
            md: ["text-2xl"],
            lg: ["text-3xl"],
            xl: ["text-4xl"],
        }
    }
})


const _status = cva(["rounded-full absolute right-0 ring-1 ring-base-2 bottom-0"], {
    variants: {
        mode: {
            primary: ["bg-primary-3"],
            secondary: ["bg-secondary-3"],
            success: ["bg-success-3"],
            warning: ["bg-warning-3"],
            error: ["bg-error-3"],
        },
        size: {
            sm: ["w-2 h-2"],
            md: ["w-2.5 h-2.5"],
            lg: ["w-2.5 h-2.5"],
            xl: ["w-3 h-3"],
        }
    }
})


export interface AvatarProps extends DivProps, VariantProps<typeof _box>, VariantProps<typeof _status> {
    image?: string
    icon?: string
}




export function Avatar({ mode, size = "md", image, icon, children }: AvatarProps) {
    return <div className="flex items-center gap-x-6">
        <div className="relative">
            <div className={_box({ size })} >
                {image && <img className="object-cover" src={image} />}
                {icon && size && <Icon className={_icon({ size })} name={icon} />}
                {children && <span className={_text({ size })}>{children}</span>}
            </div>
            {mode && <span className={_status({ size, mode })} />}
        </div>
    </div >
}

