import React from "react"
import { useTheme } from "./theme"
import { Container as ModalContainer } from "react-modal-promise"

export function Provider({
  theme,
  children,
}: React.PropsWithChildren & { theme: "light" | "dark" }) {
  useTheme(theme)

  return (
    <>
      {children}
      <ModalContainer />
    </>
  )
}
