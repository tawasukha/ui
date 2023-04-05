import React from "react"
import { useTheme } from "../helpers/useTheme"
import { AnimatePresence } from "framer-motion"
import { Container as ModalContainer } from 'react-modal-promise';

export function Provider({ theme, children }: React.PropsWithChildren & { theme: "light" | "dark" }) {

  useTheme(theme)

  return (<AnimatePresence>
    {children}
    <ModalContainer />
  </AnimatePresence>)
} 