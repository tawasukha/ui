import React from "react"
import { useTheme } from "./theme"
import { Container as ModalContainer } from "./modal-promise/Container"

export function Provider({ children }: React.PropsWithChildren) {
  useTheme()
  return (
    <>
      {children}
      <ModalContainer />
    </>
  )
}
