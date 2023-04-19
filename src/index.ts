import "./theme.css"
import { dynamic } from "./helpers/dynamic"

export const InputEditor = dynamic(async () => await import("./components/inputEditor").then(o => ({ default: o.InputEditor })))
export const InputSelect = dynamic(async () => await import("./components/inputSelect").then(o => ({ default: o.InputSelect })))
export const InputNumber = dynamic(async () => await import("./components/inputNumber").then(o => ({ default: o.InputNumber })))
export const InputTextArea = dynamic(async () => await import("./components/inputTextArea").then(o => ({ default: o.InputTextArea })))
export const InputCheckbox = dynamic(async () => await import("./components/inputCheckbox").then(o => ({ default: o.InputCheckbox })))
export const InputPassword = dynamic(async () => await import("./components/inputPassword").then(o => ({ default: o.InputPassword })))
export const InputDate = dynamic(async () => await import("./components/inputDate").then(o => ({ default: o.InputDate })))

export * from "./components/alert"
export * from "./components/avatar"
export * from "./components/button";
export * from "./components/card"
export * from "./components/error"
export * from "./components/icon"
export * from "./components/label"
export * from "./components/loader"
export * from "./components/inputText"
export * from "./components/menu"
export * from "./components/navbar"
export * from "./components/pagination"
export * from "./components/provider"
export * from "./components/sidebar"
export * from "./components/table"
export * from "./components/theme"

export * from "./helpers/cva"
export * from "./helpers/dynamic"
export * from "./helpers/useBoolean"
export * from "./helpers/useIsClient"
export * from "./helpers/useEventListener"
export * from "./helpers/useOnClickOutside"
export * from "./helpers/debouncePromise"

export * from "./types"
