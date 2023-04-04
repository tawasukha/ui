import React from "react"

export function Provider({ theme, children }: React.PropsWithChildren & { theme: "light" | "dark" }) {

  return (<>
    {children}
  </>)
} 