import { useMemo, useRef, useEffect, useCallback, forwardRef } from "react"
import { useDatePicker } from "@rehookify/datepicker"
import { type InputProps } from "react-html-props"
import { cva, cx, type VariantProps } from "../helpers/cva"
import { useBoolean } from "../helpers/useBoolean"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { useOnClickOutside } from "src/helpers/useOnClickOutside"
import { Icon, StyledIcon } from "./icon"
import {
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid"

const _input = cva(
  [
    "w-full placeholder-base-3 bg-base rounded-md border pl-2 pr-4 pt-2 py-1",
    "flex flex-row gap-1 overflow-hidden flex-wrap focus:outline-none focus:shadow-md",
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

export interface InputDateProps
  extends Omit<InputProps, "value" | "onChange">,
    VariantProps<typeof _input> {
  value: Date | undefined
  onChange: (date: Date | null) => void
}

export const InputDate = forwardRef<HTMLInputElement, InputDateProps>(function InputDate(
  { mode = "base", className, value, onChange, disabled },
  ref,
) {
  const { value: isOpen, setTrue, setFalse } = useBoolean()
  const refDropdown = useRef(null)
  const onDatesChange = useCallback(
    (dates: Date[]) => {
      onChange(dates ? dates[0] : null)
    },
    [onChange],
  )
  const selectedDates = useMemo(() => (value ? [value] : undefined), [value])

  useOnClickOutside(refDropdown, setFalse)

  const {
    data: { calendars, weekDays },
    propGetters: { dayButton, nextMonthButton, previousMonthButton },
  } = useDatePicker({
    selectedDates,
    onDatesChange,
    dates: { toggle: true, mode: "single" },
  })

  const { month, year, days } = calendars[0]

  const selectedDate = useMemo(
    () =>
      selectedDates && selectedDates.length !== 0 ? format(selectedDates[0], "dd MMM yyyy") : "",
    [selectedDates],
  )

  useEffect(() => {
    setFalse()
  }, [selectedDates])

  const _className = useMemo(() => {
    return cx(
      {
        base: disabled ? "bg-opacity-40 bg-base-2" : isOpen ? "border-base-3 shadow-base-1" : "",
        error: disabled
          ? "bg-opacity-40 bg-error-2"
          : isOpen
            ? "border-error-3 shadow-error-1"
            : "",
      }[mode],
      className,
    )
  }, [mode, isOpen, className, disabled])

  return (
    <div className="relative">
      <div
        className={_input({ mode, className: _className })}
        onClick={disabled ? undefined : setTrue}
      >
        <input
          ref={ref}
          className="outline-none focus:ring-0 bg-transparent"
          type="text"
          value={selectedDate}
          readOnly
        />
        {!disabled && (
          <StyledIcon
            mode={mode}
            name={CalendarDaysIcon}
            className={"absolute right-2 mt-0.5 h-4 w-4 opacity-50"}
          />
        )}
      </div>
      <div ref={refDropdown} className="absolute z-20 w-56">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col flex-1 bg-base shadow-md shadow-offset mt-2 rounded-md"
            >
              <div className="flex flex-row justify-between gap gap-x-2 bg-base-2 rounded-t-lg text-xs font-semibold text-base-4">
                <div className="flex flex-1">
                  <button type="button" className="p-2" {...previousMonthButton()}>
                    <Icon name={ChevronLeftIcon} className="h-4 w-4" />
                  </button>
                  <span className="w-20 py-2">{month}</span>
                  <button type="button" className="p-2" {...nextMonthButton()}>
                    <Icon name={ChevronRightIcon} className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex">
                  <button type="button" className="p-2" {...previousMonthButton({ step: 12 })}>
                    <Icon name={ChevronUpIcon} className="h-4 w-4" />
                  </button>
                  <span className="py-2">{year}</span>
                  <button type="button" className="p-2" {...nextMonthButton({ step: 12 })}>
                    <Icon name={ChevronDownIcon} className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <ul className="grid grid-cols-7 gap-y-2 items-center h-6 p-1 pt-1 pb-2 bg-base-2">
                {weekDays.map((day, i) => {
                  return (
                    <li
                      className={cx(
                        "text-xs font-semibold text-center",
                        i === 0 ? "text-error-4" : "text-base-4",
                      )}
                      key={`${month}-${day}`}
                    >
                      {day}
                    </li>
                  )
                })}
              </ul>
              <ul className="grid grid-cols-7 gap-y-1 items-center p-1">
                {days.map((day, i) => {
                  const sun = [0, 7, 14, 21, 28, 35]
                  return (
                    <li
                      className={cx(
                        "flex justify-center items-center hover:bg-base-2 rounded text-xs",
                        sun.includes(i) ? "text-error-4" : "text-base-4",
                      )}
                      key={`${month}-${day.inCurrentMonth}-${day.day}`}
                    >
                      <button type="button" className="h-6 w-6" {...dayButton(day)}>
                        {day.day}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})
