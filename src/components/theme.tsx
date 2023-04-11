import { Avatar } from "./avatar"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../helpers/useTheme"
import { useIsClient } from "../helpers/useIsClient"
import { useCallback, useEffect, useState } from "react"

const AnimatedAvatar = motion(Avatar)

type Theme = "dark" | "light" | undefined

export function ThemeToggle() {
  const isClient = useIsClient()
  const [theme, setTheme] = useState<Theme>(undefined)

  const toggleTheme = useCallback(() => {
    setTheme((prev) => prev === "light" ? "dark" : "light")
  }, [])

  useEffect(() => {
    if (isClient) {
      setTheme(document.querySelector("html")?.getAttribute("data-theme") as Theme || undefined)
    }
  }, [isClient])

  useTheme(theme)

  return !theme ? <></> : <button onClick={toggleTheme} className="self-center -mt-2 p-4 bg-base-4 w-8 h-8 rounded-lg flex items-center justify-center">
    <AnimatePresence>
      {theme === "light"
        ? <AnimatedAvatar
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: .75 }}
          exit={{ opacity: 0, scale: 0 }}
          icon="SunIcon" size="sm" className="scale-75" />
        : <AnimatedAvatar initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: .75 }}
          exit={{ opacity: 0, scale: 0 }}
          icon="MoonIcon" size="sm" className="scale-75" />}
    </AnimatePresence>
  </button>
}