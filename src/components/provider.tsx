import "@fontsource/abeezee"
import React from "react"

export function Provider({ theme, children }: React.PropsWithChildren & { theme: "light" | "dark" }) {
    React.useEffect(() => {
        const html = document.querySelector("html")
        if (html) {
            html.setAttribute("data-theme", theme)
            html.classList.add("bg-default")
        }
    }, [theme])

    return (<>
        {children}
    </>)
} 