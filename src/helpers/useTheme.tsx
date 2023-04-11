import React from "react"

export function useTheme(theme?: "light" | "dark") {
  const isDOM =
    typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement

  React.useEffect(() => {
    if (isDOM && !!theme) {
      const html = document.querySelector("html")
      if (html) {
        html.setAttribute("data-theme", theme)
        html.classList.add("bg-default")
      }
    }
  }, [theme])
}
