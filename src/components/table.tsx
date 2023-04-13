import { forwardRef } from "react"
import { type DivProps } from "react-html-props"
import { cx } from "cva"

export interface TableCellProps extends DivProps { }

export const TableCell = forwardRef<HTMLDivElement, TableCellProps>(function TableCell({ className, ...props }, ref) {
  return <div ref={ref} className={cx("table-cell py-3.5 px-4", className)} {...props} />
})

export interface TableRowProps extends DivProps {
  dark?: boolean
}

export const TableRow = forwardRef<HTMLDivElement, TableRowProps>(function TableCell({ dark, className, ...props }, ref) {
  return <div ref={ref} className={cx("table-row font-normal hover:bg-primary-1 hover:text-primary-5", dark ? "bg-base-1" : "", className)} {...props} />
})

export interface TableBody extends DivProps {
  dark?: boolean
}

export const TableBody = forwardRef<HTMLDivElement, TableBody>(function TableBody({ dark, className, ...props }, ref) {
  return <div ref={ref} className={cx("table-row-group divide-y divide-base-2 text-base-5 text-md", dark ? "bg-base-1" : "bg-base", className)} {...props} />
})

export interface TableHeadProps extends DivProps { }

export const TableHead = forwardRef<HTMLDivElement, TableHeadProps>(function TableBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx("table-header-group bg-primary-2 text-primary-4 text-md text-left", className)} {...props} />
})

export interface TableProps extends DivProps { }

export const Table = forwardRef<HTMLDivElement, TableProps>(function Table({ className, ...props }, ref) {
  return <div ref={ref} className={cx("shadow-lg shadow-offset inline-block min-w-full overflow-x-auto rounded-lg", className)}>
    <div className={"table table-fixed w-full border-collapse"} {...props} />
  </div>
})