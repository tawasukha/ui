import React from "react"
import { useTheme } from "../helpers/useTheme"
import { Container as ModalContainer } from 'react-modal-promise';

export function Provider({ theme, children }: React.PropsWithChildren & { theme: "light" | "dark" }) {

  useTheme(theme)

  return (
    <>
      {children}
      <ModalContainer />
    </>
  )
} 