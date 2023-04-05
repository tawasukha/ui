import { cva, VariantProps } from "cva"
import { dynamic } from "../helpers/dynamic"
import { forwardRef } from "react"

const TextArea = dynamic(() => import("react-textarea-autosize"))
const _input = cva(["block w-full placeholder-base-3 bg-base rounded-lg border px-5 py-2.5 focus:outline-none focus:ring"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:ring-base-1"],
      error: ["border-error-2 text-error-5 focus:ring-error-1"]
    }
  }
})

export interface InputTextAreaProps extends React.ComponentProps<typeof TextArea>, VariantProps<typeof _input> { }

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(function InputTextArea({ mode = "base", className, ...props }, ref) {
  return <TextArea ref={ref} {...props} className={_input({ mode, className })} />
})