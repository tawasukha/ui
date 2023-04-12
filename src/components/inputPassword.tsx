import { forwardRef, useMemo } from "react";
import { type InputProps } from "react-html-props";
import { cva, type VariantProps } from "../helpers/cva"
import { useBoolean } from "../helpers/useBoolean";
import { StyledIcon } from "./icon";

function useEye(mode: "base" | "error") {
  const { value, toggle } = useBoolean()
  const eye = useMemo(() => <StyledIcon mode={mode} name={value ? "EyeIcon" : "EyeSlashIcon"} className="h-6 w-6 text-base-5" />, [value, mode])
  return { value, toggle, eye }
}

const _input = cva(["block w-full placeholder-base-3 bg-base rounded-lg border pl-4 pr-10 px-4 pt-3 py-2 focus:outline-none focus:shadow-md"], {
  variants: {
    mode: {
      base: ["border-base-2 text-base-5 focus:shadow-base-1"],
      error: ["border-error-2 text-error-5 focus:shadow-error-1"],
    },
  },
})

export interface InputPasswordProps extends Omit<InputProps, "type">, VariantProps<typeof _input> { }

export const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(function InputPassword({ mode = "base", className, ...props }, ref) {
  const { value, toggle, eye } = useEye(mode)

  return <div className="relative flex items-center">
    <button onClick={toggle} className="absolute right-3 focus:outline-none">
      {eye}
    </button>

    <input ref={ref} type={value ? "text" : "password"} {...props} className={_input({ mode, className })} />
  </div>
})