import React from "react"
import { type DivProps } from "react-html-props"
import { cx } from "../helpers"

export type SectionProps = DivProps & {
  title: string
  right?: React.ReactNode
  titleClassName?: string
  bodyClassName?: string
}

export function Section({
  children,
  title,
  titleClassName,
  bodyClassName,
  right,
  className,
}: SectionProps) {
  return (
    <div className={cx("rounded-lg shadow", className)}>
      <div
        className={cx(
          "flex w-full flex-row bg-primary-2 text-primary-4 text-md py-3.5 px-4 bg-opacity-40 rounded-t-lg sticky top-0 z-10 backdrop-blur-md",
          titleClassName,
        )}
      >
        <h3 className="flex flex-grow">{title}</h3>
        {right}
      </div>
      <div className={cx("px-4 space-y-2 pb-4", bodyClassName)}>{children}</div>
    </div>
  )
}
