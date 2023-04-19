import React, { useCallback, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useIsClient } from "../helpers/useIsClient"
import { StyledIcon } from "../components/icon"
import { cx } from "cva"
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid"

type Theme = "dark" | "light" | undefined

export function ThemeToggle() {
  const isClient = useIsClient()
  const stored = window.localStorage.getItem("theme") as "dark" | "light" | undefined
  const [theme, setTheme] = useState<Theme>(stored)

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  useEffect(() => {
    if (isClient) {
      setTheme((document.querySelector("html")?.getAttribute("data-theme") as Theme) || undefined)
    }
  }, [isClient])

  useTheme(theme)

  return !theme ? (
    <></>
  ) : (
    <button
      onClick={toggleTheme}
      className={cx("self-center -mt-1 p-4 w-8 h-8 rounded-lg flex items-center justify-center")}
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

export function useTheme(theme?: "light" | "dark") {
  const isDOM = typeof window !== "undefined" && window.document && window.document.documentElement

  React.useEffect(() => {
    if (isDOM && !!theme) {
      const html = document.querySelector("html")
      if (html) {
        html.setAttribute("data-theme", theme)
        window.localStorage.setItem("theme", theme)
        html.classList.add("bg-default")
      }
    }
  }, [theme])
}
