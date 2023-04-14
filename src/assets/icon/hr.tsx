import { type SVGProps } from "react"

export const Hr = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <title>{"horizontal-rule"}</title>
    <path d="M5 13a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2H5Z" />
  </svg>
)
