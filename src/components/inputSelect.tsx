import { cva, cx, type VariantProps } from "cva"
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { type InputProps } from "react-html-props"
import { Menu, MenuItem } from "./menu"
import { useCombobox, type UseComboboxStateChange } from "downshift"
import { StyledIcon } from "./icon"
import { XChip } from "./chip"
import { AnimatePresence, motion } from "framer-motion"

const MotionMenu = motion(Menu)

const _input = cva(["w-full placeholder-base-3 bg-base rounded-lg border pl-4 pr-8 pt-3 py-2",
  "flex flex-row gap-1 overflow-hidden flex-wrap focus:outline-none focus:shadow-md"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:shadow-base-1"],
      error: ["border-error-2 text-error-5 focus:shadow-error-1"],
    },
  },
})


export interface InputSelectProps<T> extends Omit<InputProps, "value" | "onChange">,
  Required<{ mode: NonNullable<VariantProps<typeof _input>["mode"]> }> {
  options: T[]
  loadOptions?: (inputValue?: string) => T[]
  multiple?: boolean
  keyLabel?: string
  keyValue?: string
  value: T | T[],
  onChange: (value?: T | T[] | null) => void
  renderItem?: (item: T) => JSX.Element
}

export const InputSelect = forwardRef(function InputSelect<T extends object>({
  multiple = false, keyLabel = "label", keyValue = "value", renderItem,
  mode = "base", className, options, value, onChange = () => { }, loadOptions,
}: InputSelectProps<T>, ref: React.ForwardedRef<HTMLInputElement>) {
  const refInput = useRef(null)
  const [items, setItems] = useState(options)
  const [values, setValues] = useState(value ? (multiple ? Array.isArray(value) ? value : [value] : undefined) : undefined)

  const onDismiss = useCallback((item: T) => {
    setValues((values) => {
      return !values ? undefined : values.filter((value) => (JSON.stringify(value) !== JSON.stringify(item)))
    })
  }, [values])

  const onSelectedItemChange = useCallback(({ selectedItem }: UseComboboxStateChange<T>) => {
    if (multiple) {
      setValues((values) => selectedItem ? (values || []).concat(selectedItem) : values)
      if (refInput.current) {
        console.log(refInput.current)
        refInput.current.value = ""
      }
    } else {
      onChange(selectedItem)
    }
  }, [multiple, onChange, setValues])

  const selectedItem = useMemo(() => {
    return multiple || Array.isArray(value) ? null : value
  }, [value])

  const multipleValue = useMemo(() => {
    return !multiple ? undefined : (values || []).map((value, i) => {
      // @ts-expect-error
      const val = value[keyLabel] ? value[keyLabel] : value
      return <XChip key={`${val}${i}`} {...{
        size: "sm",
        mode: "base",
        onDismiss,
      }}>{val}</XChip>
    })
  }, [values, multiple])

  useEffect(() => {
    if (multiple) {
      onChange(values)
    }
  }, [multiple])

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem: selected,
  } = useCombobox({
    selectedItem,
    onSelectedItemChange,
    onInputValueChange({ inputValue }) {
      if (loadOptions) {
        setItems(loadOptions(inputValue))
      } else {
        setItems(options.filter((opt) => {
          const lowered = inputValue?.toLowerCase()
          return (
            !inputValue ||
            // @ts-expect-error
            opt[keyLabel].toLowerCase().includes(lowered) ||
            // @ts-expect-error
            opt[keyValue].toLowerCase().includes(lowered)
          )
        }))
      }
    },
    items,
    itemToString(item) {
      // @ts-expect-error
      return item ? item[keyLabel] : ''
    },
  })


  return <div className="relative">
    <div ref={ref} className={_input({ mode, className })}>
      {multipleValue}
      <input
        ref={refInput}
        placeholder="Select ..."
        className="place-base-3 bg-base focus:outline-none w-full tex-md"
        {...getInputProps()}
      />
      <StyledIcon mode={mode} name="ChevronDownIcon" className={cx("absolute right-8 transition ease-out h-6 w-6", isOpen ? "rotate-180" : "")} />
    </div >
    <div {...getMenuProps()} className="absolute w-full z-10">
      <AnimatePresence>
        {isOpen && <MotionMenu className="w-full h-40" transition={{ duration: 0.2 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          {items.length === 0 ? <MenuItem disabled>- Not Found -</MenuItem> : items.map((item, index) => (
            // @ts-expect-error
            <MenuItem key={`${item[keyValue]}${index}`}
              hover={highlightedIndex === index}
              active={selected === item}
              {...getItemProps({ item, index })}
            // @ts-expect-error
            >{renderItem ? renderItem(item) : item[keyLabel]}</MenuItem>
          ))}
        </MotionMenu>}
      </AnimatePresence>
    </div>
  </div>
})