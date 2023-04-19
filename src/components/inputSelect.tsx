import { cva, cx, type VariantProps } from "../helpers/cva"
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { type InputProps } from "react-html-props"
import { Menu, MenuItem } from "./menu"
import {
  useCombobox,
  type UseComboboxState,
  type UseComboboxStateChangeOptions,
  type UseComboboxStateChange,
} from "downshift"
import { StyledIcon } from "./icon"
import { Chip, XChip } from "./chip"
import { AnimatePresence } from "framer-motion"
import { debouncePromise } from "../helpers/debouncePromise"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

const _input = cva(
  [
    "w-full placeholder-base-3 bg-base rounded-lg border pl-4 pr-8 pt-3 py-2",
    "focus:outline-none flex flex-row focus:shadow-md",
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

export interface InputSelectProps<T>
  extends Omit<InputProps, "value" | "onChange">,
    VariantProps<typeof _input> {
  creatable?: boolean
  options: T[]
  loadOptions?: (inputValue?: string) => Promise<T[]>
  milis?: number
  multiple?: boolean
  keyLabel?: string
  keyValue?: string
  value: T | T[]
  onChange: (value?: T | T[] | null) => void
  renderItem?: (item: T) => JSX.Element
}

export const InputSelect = forwardRef(function InputSelect<T extends object>(
  {
    creatable = false,
    multiple = false,
    keyLabel = "label",
    keyValue = "value",
    renderItem,
    milis = 300,
    mode = "base",
    className,
    options,
    value,
    onChange = () => {},
    loadOptions: _loadOptions,
  }: InputSelectProps<T>,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const loadOptions = useMemo(
    () => (_loadOptions ? debouncePromise(_loadOptions, milis, "Aborted") : undefined),
    [_loadOptions],
  )
  const refInput = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState(options || [])
  const [values, setValues] = useState(
    value ? (multiple ? (Array.isArray(value) ? value : [value]) : undefined) : undefined,
  )

  const onDismiss = useCallback(
    (item: T) => {
      setValues((values) => {
        return !values
          ? undefined
          : values.filter((value) => JSON.stringify(value) !== JSON.stringify(item))
      })
    },
    [values, setValues],
  )

  const onSelectedItemChange = useCallback(
    ({ selectedItem }: UseComboboxStateChange<T>) => {
      if (multiple) {
        setValues((values) => (selectedItem ? (values || []).concat(selectedItem) : values))
        // @ts-expect-error
        refInput.current.blur()
        // @ts-expect-error
        refInput.current.focus()
      } else {
        onChange(selectedItem)
      }
    },
    [multiple, onChange, setValues],
  )

  const selectedItem = useMemo(() => {
    return multiple || Array.isArray(value) ? null : value
  }, [value])

  const multipleValue = useMemo(() => {
    return !multiple
      ? undefined
      : (values || []).map((value, i) => {
          // @ts-expect-error
          const val = value[keyLabel] ? value[keyLabel] : value
          return (
            <XChip
              key={`${val}${i}`}
              {...{
                size: "sm",
                mode: "base",
                onDismiss: () => {
                  onDismiss(value)
                },
              }}
            >
              {val}
            </XChip>
          )
        })
  }, [values, multiple])

  const stateReducer = useCallback(
    (state: UseComboboxState<T>, actionAndChanges: UseComboboxStateChangeOptions<T>) => {
      const { type, changes } = actionAndChanges
      // returning an uppercased version of the item string.
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.InputBlur:
          return multiple
            ? {
                ...changes,
                ...(changes.selectedItem && {
                  inputValue: "",
                }),
              }
            : changes
        default:
          return changes
      }
    },
    [],
  )

  useEffect(() => {
    if (multiple) {
      onChange(values)
    }
  }, [multiple, values])

  useEffect(() => {
    setItems(
      (options || []).filter((opt) => {
        return !(values || []).some(
          // @ts-expect-error
          (val) => val[keyValue] === opt[keyValue] && val[keyLabel] === opt[keyLabel],
        )
      }),
    )
  }, [options, values])

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
    async onInputValueChange({ inputValue }) {
      if (loadOptions) {
        let asyncOptions: T[] = []
        try {
          asyncOptions = await loadOptions(inputValue)
        } catch (err) {}
        setItems(asyncOptions)
      } else {
        const filteredOptions = options
          .filter((opt) => {
            return !(values || []).some(
              // @ts-expect-error
              (val) => val[keyValue] === opt[keyValue] && val[keyLabel] === opt[keyLabel],
            )
          })
          .filter((opt) => {
            const lowered = inputValue?.toLowerCase()
            return (
              !inputValue ||
              // @ts-expect-error
              opt[keyLabel].toLowerCase().includes(lowered) ||
              // @ts-expect-error
              opt[keyValue].toLowerCase().includes(lowered)
            )
          })

        if (creatable && !!inputValue) {
          filteredOptions.push({
            [keyValue]: inputValue,
            [keyLabel]: inputValue,
            __new__: true,
          } as T)
        }

        setItems(filteredOptions)
      }
    },
    items,
    itemToString(item) {
      // @ts-expect-error
      return item ? item[keyLabel] : ""
    },
    stateReducer,
  })

  const inputFocus = useCallback(() => {
    if (refInput.current) {
      refInput.current.focus()
    }
  }, [])

  return (
    <div className="relative" onClick={inputFocus}>
      <div ref={ref} className={_input({ mode, className })}>
        <div className="w-full overflow-hidden flex flex-row gap-1 flex-wrap">
          {multipleValue}
          <input
            placeholder="Select ..."
            className="place-base-3 bg-base focus:outline-none text-md"
            {...getInputProps({
              ref: refInput,
              onKeyDown: (e) => {
                if (e.key === "Backspace" && multiple && values && (values || []).length > 0) {
                  // @ts-expect-error
                  if (e.target.value === "") {
                    onDismiss(values[values.length - 1])
                  }
                }
              },
            })}
          />
        </div>

        <StyledIcon
          mode={mode}
          name={ChevronDownIcon}
          className={cx(
            "absolute right-4 transition ease-out bg-base h-6 w-6",
            isOpen ? "rotate-180" : "",
          )}
        />
      </div>
      <div {...getMenuProps()} className="absolute w-full z-10">
        <AnimatePresence>
          {isOpen && (
            <Menu
              className="w-full h-40"
              transition={{ duration: 0.2 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {items.length === 0 ? (
                <MenuItem disabled>
                  {loadOptions ? "Type for search ..." : "- Not Found -"}
                </MenuItem>
              ) : (
                items.map((item, index) => (
                  <MenuItem
                    key={
                      // @ts-expect-error
                      `${item[keyValue]}${index}`
                    }
                    hover={highlightedIndex === index}
                    active={selected === item}
                    {...getItemProps({ item, index })}
                  >
                    {renderItem ? (
                      renderItem(item)
                    ) : (
                      // @ts-expect-error
                      <span className="flex flex-1">{item[keyLabel]}</span>
                    )}
                    {
                      // @ts-expect-error
                      item.__new__ && (
                        <Chip mode="error" size="sm" className="self-center">
                          New
                        </Chip>
                      )
                    }
                  </MenuItem>
                ))
              )}
            </Menu>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
})
