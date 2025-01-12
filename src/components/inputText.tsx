import { type InputProps } from "react-html-props"
import { cva, type VariantProps } from "../helpers/cva"
import { forwardRef } from "react"

const _input = cva(
  [
    "focus:ring-0 block w-full placeholder-base-3 bg-base rounded-md border px-2 pt-2 py-1 focus:outline-none focus:shadow-md disabled:bg-opacity-40",
  ],
  {
    variants: {
      mode: {
        base: [
          "border-base-2 text-base-5 focus:border-base-3 focus:shadow-base-1 disabled:bg-base-2",
        ],
        error: [
          "border-error-2 text-error-5 focus:border-error-3 focus:shadow-error-1 disabled:bg-error-2",
        ],
      },
    },
  },
)

export interface InputTextProps extends Omit<InputProps, "type">, VariantProps<typeof _input> {}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(function InputText(
  { mode = "base", className, ...props },
  ref,
) {
  return <input ref={ref} type="text" {...props} className={_input({ mode, className })} />
})
