import { NumericFormat, type NumericFormatProps } from "react-number-format"
import { cva, type VariantProps } from "../helpers/cva"
import { useMemo } from "react"

const _input = cva(
  [
    "focus:ring-0 block w-full placeholder-base-3 bg-base rounded-lg border px-4 pt-3 py-2 focus:outline-none focus:shadow-md",
  ],
  {
    variants: {
      mode: {
        base: ["border-base-2 text-base-5 focus:border-base-3 focus:shadow-base-1"],
        error: ["border-error-2 text-error-5 focus:border-error-3 focus:shadow-error-1"],
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
  onChange?: NumericFormatProps["onValueChange"]
}

export function InputNumber({
  mode = "base",
  className,
  onChange,
  value: _value,
  decimal,
  ...props
}: InputNumberProps) {
  const value = useMemo(() => numberParser(_value), [_value])
  const decimalScale = useMemo(
    () => (decimal ? (typeof decimal === "boolean" ? 2 : decimal) : 0),
    [decimal],
  )

  return (
    <NumericFormat
      className={_input({ mode, className })}
      thousandSeparator
      decimalScale={decimalScale}
      onValueChange={onChange}
      value={value}
      {...props}
    />
  )
}
