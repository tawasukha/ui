import { cva, VariantProps } from "cva"
import { StyledIcon, Icon } from "./icon"
import { DivProps } from "react-html-props"
import { type MouseEventHandler } from "react"

const _boxicon = cva(["flex items-center justify-center w-12"], {
    variants: {
        mode: {
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
            primary: ["text-primary-5"],
            secondary: ["text-secondary-5"],
            success: ["text-success-5"],
            warning: ["text-warning-5"],
            error: ["text-error-5"],
        }
    }
})


export interface AlertProps extends DivProps, VariantProps<typeof _boxicon> {
    title: string;
    children: string;
    onDismiss?: MouseEventHandler<HTMLButtonElement>
}

const iconName = {
    primary: "InformationCircleIcon",
    secondary: "InformationCircleIcon",
    success: "CheckCircleIcon",
    warning: "ExclamationCircleIcon",
    error: "XCircleIcon"
}


export function Alert({ mode, title, children, onDismiss }: AlertProps) {
    return <div className="flex max-w-sm bg-default-1 rounded-lg shadow-md">
        {mode && <div className={_boxicon({ mode })}>
            <StyledIcon mode={mode} name={iconName[mode]} className="h-10 w-10" />
        </div>}

        <div className="px-4 py-2 -mx-3 flex flex-1 flex-row">
            <div className="flex flex-1 flex-col mx-3">
                <span className={_title({ mode })}>{title}</span>
                <p className="text-sm text-default-5">{children}</p>
            </div>

            {onDismiss && <button className="text-default-5 hover:text-default-4 self-start" onClick={onDismiss}>
                <span className="sr-only">Dismiss</span>
                <Icon name="XMarkIcon" className="h-6 w-6" />
            </button>}
        </div>
    </div >
}

