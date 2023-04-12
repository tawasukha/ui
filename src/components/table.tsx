import { forwardRef } from "react"
import { type TDProps, type THeadProps, type TRProps, type THProps, type TBodyProps, type TableProps as RawTableProps } from "react-html-props"
import { cx } from "cva"

export interface TableCellProps extends TDProps, THProps { }

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ className, ...props }, ref) {
  return <td ref={ref} className={cx("py-3.5 px-4", className)} {...props} />
})

export const TableHeaderCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell({ className, ...props }, ref) {
  return <th ref={ref} className={cx("py-3.5 px-4", className)} {...props} />
})

export interface TableRowProps extends TRProps {
  dark?: boolean
}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableCell({ dark, className, ...props }, ref) {
  return <tr ref={ref} className={cx("font-normal hover:bg-primary-1", dark ? "bg-base-1" : "", className)} {...props} />
})

export interface TableBody extends TBodyProps {
  dark?: boolean
}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBody>(function TableBody({ dark, className, ...props }, ref) {
  return <tbody ref={ref} className={cx("bg-base divide-y divide-base-2 text-base-5 text-md", dark ? "bg-base-1" : "", className)} {...props} />
})

export interface TableHeadProps extends THeadProps { }

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(function TableBody({ className, ...props }, ref) {
  return <thead ref={ref} className={cx("bg-primary-2 text-primary-4 text-md text-left", className)} {...props} />
})

export interface TableProps extends RawTableProps { }

export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ className, ...props }, ref) {
  return <table className={cx("min-w-full divide-y divide-base-2 shadow-md shadow-offset rounded-lg", className)} {...props} />
})