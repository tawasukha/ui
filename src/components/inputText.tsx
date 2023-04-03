import { InputProps } from "react-html-props";
import { cva, VariantProps } from "cva"

const _input = cva(["block mt-2 w-full placeholder-base-3 bg-base rounded-lg border px-5 py-2.5 focus:outline-none focus:ring"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:ring-base-1"],
      error: ["border-error-2 text-error-5 focus:ring-error-1"]
    }
  }
})

export interface InputTextProps extends Omit<InputProps, "type">, VariantProps<typeof _input> { }

export function InputText({ mode = "base", className, ...props }: InputTextProps) {
  return <input type="text" {...props} className={_input({ mode, className })} />
}