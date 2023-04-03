import { LabelProps } from "react-html-props"
import { cx } from "cva"

export function Label(props: LabelProps) {
  <label htmlFor={props.htmlFor} className={cx("block text-sm text-default-3", props.className)}>{props.children}</label>
}