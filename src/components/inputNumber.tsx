import { NumericFormat, type NumericFormatProps } from "react-number-format"
import { cva, type VariantProps } from "../helpers/cva"
import { forwardRef, useMemo } from "react"

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

const numberParser = (value?: number | null | string | { floatValue: number }) => {
  return value
    ? typeof value === "string"
      ? +value
      : typeof value === "object"
      ? value.floatValue
      : value
    : 0
}

export interface InputNumberProps
  extends Omit<NumericFormatProps, "onChange" | "onValueChange">,
    VariantProps<typeof _input> {
  decimal?: boolean | number
  onChange?: (value: number | undefined) => void
}

export const InputNumber = forwardRef<HTMLInputElement,InputNumberProps>(function InputNumber({
  mode = "base",
  className,
  onChange,
  value: _value,
  decimal,
  ...props
},ref) {
  const value = useMemo(() => numberParser(_value), [_value])
  const decimalScale = useMemo(
    () => (decimal ? (typeof decimal === "boolean" ? 2 : decimal) : 0),
    [decimal],
  )

  return (
    <NumericFormat
      getInputRef={ref}
      className={_input({ mode, className })}
      thousandSeparator
      decimalScale={decimalScale}
      onValueChange={(value) => {
        if (onChange) {
          onChange(value.floatValue)
        }
      }}
      value={value}
      {...props}
    />
  )
})
