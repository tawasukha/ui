import { type SVGProps } from "react"

export const Ul = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <title>{"list-bullets"}</title>
    <circle cx={2.5} cy={3.998} r={2.5} />
    <path d="M8.5 5H23a1 1 0 0 0 0-2H8.5a1 1 0 0 0 0 2Z" />
    <circle cx={2.5} cy={11.998} r={2.5} />
    <path d="M23 11H8.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2Z" />
    <circle cx={2.5} cy={19.998} r={2.5} />
    <path d="M23 19H8.5a1 1 0 0 0 0 2H23a1 1 0 0 0 0-2Z" />
  </svg>
)
