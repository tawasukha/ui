import { type InputProps } from "react-html-props"
import { cva, type VariantProps } from "../helpers/cva"

const _input = cva(
  [
    "focus:ring-0 block w-full placeholder-base-3 bg-base rounded-lg border px-4 pt-3 py-2 focus:outline-none focus:shadow-md disabled:bg-opacity-40",
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

export const InputText = function InputText({
  mode = "base",
  className,
  ...props
}: InputTextProps) {
  return <input type="text" {...props} className={_input({ mode, className })} />
}
