import { cva, cx, type VariantProps } from "cva"
import { forwardRef, useState } from "react"
import { type InputProps } from "react-html-props"
import { Menu, MenuItem } from "./menu"
import { useCombobox, type UseComboboxProps } from "downshift"
import { StyledIcon } from "./icon"

const _input = cva(["block w-full placeholder-base-3 bg-base rounded-lg border px-4 pt-3 py-2 focus:outline-none focus:shadow-md"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:shadow-base-1"],
      error: ["border-error-2 text-error-5 focus:shadow-error-1"],
    },
  },
})

export interface InputSelectProps<T> extends Omit<InputProps, "value" | "onChange">, Required<{ mode: NonNullable<VariantProps<typeof _input>["mode"]> }> {
  options: T[]
  keyLabel?: string
  keyValue?: string
  value: UseComboboxProps<T>["selectedItem"],
  onChange: UseComboboxProps<T>["onSelectedItemChange"]
}

export const InputSelect = forwardRef(function InputSelect<T extends object>({ keyLabel = "label", keyValue = "value", mode = "base", className, options, value, onChange }: InputSelectProps<T>, ref: React.ForwardedRef<HTMLInputElement>) {
  const [items, setItems] = useState(options)

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
  } = useCombobox({
    selectedItem: value,
    onSelectedItemChange: onChange,
    onInputValueChange({ inputValue }) {
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
    },
    items,
    itemToString(item) {
      // @ts-expect-error
      return item ? item[keyLabel] : 'Not Found'
    },
  })

  return <>
    <div ref={ref} className={_input({ mode, className: "flex flex-row" })} >
      <input
        placeholder="Select ..."
        className="place-base-3 bg-base focus:outline-none w-full tex-md"
        {...getInputProps()}
      />
      <StyledIcon mode={mode} name="ChevronDownIcon" className={cx("transition ease-out h-6 w-6", isOpen ? "rotate-180" : "")} />
    </div >
    {isOpen && <Menu className="w-full h-40" {...getMenuProps()}>
      {items.length === 0 ? <MenuItem disabled>- Not Found -</MenuItem> : items.map((item, index) => (
        // @ts-expect-error
        <MenuItem key={`${item[keyValue]}${index}`}
          hover={highlightedIndex === index}
          active={selectedItem === item}
          {...getItemProps({ item, index })}
        // @ts-expect-error
        >{item[keyLabel]}</MenuItem>
      ))}
    </Menu>}
  </>
})