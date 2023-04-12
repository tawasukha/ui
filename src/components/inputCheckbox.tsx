import { cva, type VariantProps } from "../helpers/cva"
import { useBoolean } from "../helpers/useBoolean"
import { type InputProps } from "react-html-props"
import { AnimatePresence, motion } from "framer-motion"
import { Icon } from "./icon"
import { forwardRef, useEffect } from "react"

const _input = cva(["flex w-[18px] h-[18px] ring-1 rounded"], {
  variants: {
    mode: {
      base: ["bg-base-1 ring-base-3"],
      primary: ["bg-primary-1 ring-primary-3"],
      error: ["bg-error-1 ring-error-3"],
    },
  },
})

interface CheckboxProps extends Omit<InputProps, "onChange">, VariantProps<typeof _input> {
  indeterminate?: boolean
  onChange?: (checked?: boolean) => void
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ mode = "base", className, indeterminate = false, checked = false, onChange }, ref) {
  const { value, toggle } = useBoolean(checked)

  useEffect(() => {
    if (onChange) onChange(value)
  }, [value, onChange])

  return (
    <>
      <input ref={ref} type="checkbox" className="hidden" checked={value} readOnly />
      <label onClick={toggle} className={_input({ mode, className })}>
        <AnimatePresence>
          {value && <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Icon outline name="CheckIcon" className="w-[18px] h-[18px] stroke-[3px]" />
          </motion.i>}
        </AnimatePresence>
        <AnimatePresence>
          {indeterminate && <motion.i
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <Icon name="MinusSmallIcon" className="w-[18px] h-[18px] stroke-[3px]" />
          </motion.i>}
        </AnimatePresence>
      </label>
    </>);
})