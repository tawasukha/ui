import { useMemo } from "react";
import { InputProps } from "react-html-props";
import { cva, VariantProps } from "cva"
import { useBoolean } from "../helpers/useBoolean";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid"
import { _icon_mode } from "./icon";


function useEye(mode: "base" | "error") {
  const { value, toggle } = useBoolean()
  const Icon = useMemo(() => value ? EyeIcon : EyeSlashIcon, [value])
  const eye = useMemo(() => <Icon className={_icon_mode({ mode, className: "h-6 w-6" })} />, [value, mode])
  return { value, toggle, eye }
}

const _input = cva(["block w-full placeholder-base-3 bg-base rounded-lg border pl-5 pr-11 py-2.5 focus:outline-none focus:ring"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:ring-base-1"],
      error: ["border-error-2 text-error-5 focus:ring-error-1"]
    }
  }
})

export interface InputTextProps extends Omit<InputProps, "type">, Required<{ mode: NonNullable<VariantProps<typeof _input>["mode"]> }> { }

export function InputPassword({ mode = "base", className, ...props }: InputTextProps) {
  const { value, toggle, eye } = useEye(mode)

  return <div className="relative flex items-center mt-2">
    <button onClick={toggle} className="absolute right-3 focus:outline-none">
      {eye}
    </button>

    <input type={value ? "text" : "password"} {...props} className={_input({ mode, className })} />
  </div>
}