import React from "react"
import { useTheme } from "./theme"
import { Container as ModalContainer } from "react-modal-promise"

export function Provider({ children }: React.PropsWithChildren) {
  useTheme()

  return (
    <>
      {children}
      <ModalContainer />
    </>
  )
}
