import "./theme.css"
import { dynamic } from "./helpers/dynamic"
export * from "./components"
export * from "./helpers"
export * from "./types"

export const InputEditor = dynamic(async () => await import("./components/inputEditor").then(o => ({ default: o.InputEditor })))
export const InputSelect = dynamic(async () => await import("./components/inputSelect").then(o => ({ default: o.InputSelect })))
export const InputNumber = dynamic(async () => await import("./components/inputNumber").then(o => ({ default: o.InputNumber })))
export const InputCheckbox = dynamic(async () => await import("./components/inputCheckbox").then(o => ({ default: o.InputCheckbox })))
export const InputPassword = dynamic(async () => await import("./components/inputPassword").then(o => ({ default: o.InputPassword })))
export const InputDate = dynamic(async () => await import("./components/inputDate").then(o => ({ default: o.InputDate })))


