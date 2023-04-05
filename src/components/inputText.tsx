import { InputProps } from "react-html-props";
import { cva, VariantProps } from "cva"
import { forwardRef } from "react";

const _input = cva(["block w-full placeholder-base-3 bg-base rounded-lg border px-5 py-2.5 focus:outline-none focus:ring"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:ring-base-1"],
      error: ["border-error-2 text-error-5 focus:ring-error-1"]
    }
  }
})

export interface InputTextProps extends Omit<InputProps, "type">, VariantProps<typeof _input> { }

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(function InputText({ mode = "base", className, ...props }, ref) {
  return <input ref={ref} type="text" {...props} className={_input({ mode, className })} />
})

