import { cva, type VariantProps } from "../helpers/cva"
import { type InputProps } from "react-html-props"
import { AnimatePresence, motion } from "framer-motion"
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { Icon } from "./icon"
import { CheckIcon } from "@heroicons/react/24/outline"
import { MinusIcon } from "@heroicons/react/24/solid"

const _input = cva(["flex flex-col w-[14px] h-[14px] ring-1 rounded"], {
  variants: {
    mode: {
      base: ["bg-base-1 text-base-5 ring-base-3"],
      primary: ["bg-primary-1 text-primary-5 ring-primary-3"],
      error: ["bg-error-1 text-error-5 ring-error-3"],
    },
  },
})

export interface InputCheckboxProps extends InputProps, VariantProps<typeof _input> {
  indeterminate?: boolean
}

export const InputCheckbox = forwardRef<
  Partial<HTMLInputElement & { click: () => void }>,
  InputCheckboxProps
>(function Checkbox({ mode = "base", className, indeterminate, ...props }, ref) {
  const refCheckbox = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      refCheckbox.current.indeterminate = !props.checked && indeterminate
    }
  }, [refCheckbox, indeterminate, props.checked])

  useImperativeHandle(
    ref,
    () => {
      return {
        click() {
          refCheckbox.current.click()
        },
      }
    },
    [],
  )

  return (
    <>
      <input ref={refCheckbox} type="checkbox" className="hidden" {...props} />
      <label
        onClick={() => {
          refCheckbox?.current.click()
        }}
        className={_input({ mode, className })}
      >
        <AnimatePresence>
          {props.checked && (
            <motion.i
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Icon name={CheckIcon} className=" w-[14px] h-[14px] stroke-[3px]" />
            </motion.i>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {!props.checked && indeterminate && (
            <motion.i
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Icon name={MinusIcon} className="w-[14px] h-[14px] stroke-[3px]" />
            </motion.i>
          )}
        </AnimatePresence>
      </label>
    </>
  )
})
