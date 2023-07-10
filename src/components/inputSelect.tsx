import { cva, cx, type VariantProps } from "../helpers/cva"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
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
import { useIsFirstRender } from "src/helpers/useIsFirstRender"

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
  options?: T[]
  loadOptions?: (inputValue?: string) => Promise<T[]>
  milis?: number
  multiple?: boolean
  keyLabel?: string
  keyValue?: string
  value: T | T[]
  onChange: (value?: T | T[] | null) => void
  renderItem?: (item: T) => JSX.Element
}

export function InputSelect<T>({
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
  disabled,
}: InputSelectProps<T>) {
  const loadOptions = useMemo(
    () => (_loadOptions ? debouncePromise(_loadOptions, milis, "Aborted") : undefined),
    [_loadOptions],
  )
  const refInput = useRef<HTMLInputElement | null>(null)
  const [items, setItems] = useState(options || [])
  const isFirstRender = useIsFirstRender()

  // For Multiple Values only
  const [values, setValues] = useState(value ? (Array.isArray(value) ? value : [value]) : undefined)

  // For Multiple Values only
  useEffect(() => {
    if (isFirstRender) {
      const _values = value ? (Array.isArray(value) ? value : [value]) : undefined
      setValues(_values)
    }
  }, [value, setValues])

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
        setValues((values) => (selectedItem ? [selectedItem] : values))
        onChange(selectedItem)
      }
    },
    [multiple, onChange, setValues],
  )

  const selectedItem = useMemo(() => {
    return multiple || Array.isArray(value) ? null : value
  }, [value])

  const displayValue = useMemo(() => {
    const values = value ? (Array.isArray(value) ? value : [value]) : undefined
    return (values || []).map((value, i) => {
      // @ts-expect-error
      const val = value[keyLabel] ? value[keyLabel] : value
      return multiple ? (
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
      ) : (
        <span className="whitespace-nowrap" key={`${val}${i}`}>
          {val}
        </span>
      )
    })
  }, [value, multiple])

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
    if (!isFirstRender && multiple) {
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
        const filteredOptions = (options || [])
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
    <div className="relative" onClick={inputFocus}>
      <div className={_input({ mode, className: _className })}>
        <div
          className={cx("w-full overflow-hidden flex flex-row gap-1", multiple ? "flex-wrap" : "")}
        >
          {multiple ? displayValue : isOpen ? <span></span> : displayValue}
          <input
            placeholder="Select ..."
            className={cx(
              "place-base-3 bg-[transparent!important] focus:outline-none text-md",
              multiple ? "" : isOpen ? "w-[inherit]" : "opacity-0 w-[1px]",
            )}
            {...getInputProps({
              ref: refInput,
              onFocus: () => {
                refInput.current?.select()
              },
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

        {!disabled && (
          <StyledIcon
            mode={mode}
            name={ChevronDownIcon}
            className={cx(
              "absolute right-4 transition ease-out bg-base h-6 w-6",
              isOpen ? "rotate-180" : "",
            )}
          />
        )}
      </div>
      <div {...getMenuProps()} className="absolute w-full z-20">
        <AnimatePresence>
          {isOpen && (
            <Menu
              className="w-full max-h-40"
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
}
