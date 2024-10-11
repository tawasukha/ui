import React, { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { StyledIcon } from "../components/icon"
import { cx } from "../helpers/cva"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"
import { useIsClient } from "../helpers/useIsClient"

type Theme = "dark" | "light" | undefined

export function ThemeToggle() {
  const stored = window.localStorage.getItem("theme") as "dark" | "light" | undefined
  const [theme, setTheme] = useState<Theme>(stored || "light")

  const isClient = useIsClient()

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem("theme", theme || "light")
      const html = document.querySelector("html")
      if (html) {
        html.setAttribute("data-theme", theme || "light")
      }
    }
  }, [theme])

  return !theme ? (
    <></>
  ) : (
    <button
      onClick={toggleTheme}
      className={cx("self-center -mt-1 p-4 w-8 h-8 rounded-md flex items-center justify-center")}
    >
      <AnimatePresence>
        {theme === "light" && (
          <motion.i
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <StyledIcon
              mode="warning"
              name={SunIcon}
              className="h-6 w-6 rounded-full outline-none hover:ring-2 hover:ring-offset-1 hover:ring-offset-base hover:ring-warning-3"
            />
          </motion.i>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {theme === "dark" && (
          <motion.i
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <StyledIcon
              mode="primary"
              name={MoonIcon}
              className="h-6 w-6 rounded-full outline-none hover:ring-2 hover:ring-offset-1 hover:ring-offset-base hover:ring-primary-3"
            />
          </motion.i>
        )}
      </AnimatePresence>
    </button>
  )
}

export function useTheme() {
  const isDOM = typeof window !== "undefined" && window.document && window.document.documentElement

  React.useEffect(() => {
    if (isDOM) {
      const html = document.querySelector("html")
      if (html) {
        const defaultTheme = html.getAttribute("data-theme") as "dark" | "light" | undefined
        const theme = window.localStorage.getItem("theme") as "dark" | "light" | undefined
        html.setAttribute("data-theme", theme || defaultTheme || "light")
      }
    }
  }, [])
}
