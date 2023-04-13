import { cva, type VariantProps } from "../helpers/cva"
import { dynamic } from "../helpers/dynamic"
import { forwardRef } from "react"

const TextArea = dynamic(async () => await import("react-textarea-autosize"))
const _input = cva(["focus:ring-0 block w-full placeholder-base-3 bg-base rounded-lg border px-4 pt-3 py-2 focus:outline-none focus:shadow-md"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:border-base-3 focus:shadow-base-1"],
      error: ["border-error-2 text-error-5 focus:border-error-3 focus:shadow-error-1"],
    },
  },
})

export interface InputTextAreaProps extends React.ComponentProps<typeof TextArea>, VariantProps<typeof _input> { }

export const InputTextArea = forwardRef<HTMLTextAreaElement, InputTextAreaProps>(function InputTextArea({ mode = "base", className, ...props }, ref) {
  return <TextArea ref={ref} {...props} className={_input({ mode, className })} />
})