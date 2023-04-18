import { cx } from "../helpers/cva"
import { forwardRef, useCallback, useMemo } from "react"
import { dynamic } from "../helpers/dynamic"

const Icon = dynamic(async () => await import("./icon").then((o) => ({ default: o.Icon })))

export const DOTS = "..."

const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, idx) => idx + start)
}

export type PaginationParameter = {
  totalCount: number
  pageSize: number
  siblingCount?: number
  currentPage: number
}

export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: PaginationParameter) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize)

    const totalPageNumbers = siblingCount + 5

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2

    const firstPageIndex = 1
    const lastPageIndex = totalPageCount

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = range(1, leftItemCount)

      return [...leftRange, DOTS, totalPageCount]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount)
      return [firstPageIndex, DOTS, ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex)
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex]
    }
  }, [totalCount, pageSize, siblingCount, currentPage])

  return paginationRange || []
}

const pageClassName = "px-3 py-2 text-md text-base-3 bg-base-1 hover:bg-primary-1"
const buttonClassName =
  "flex items-center px-4 py-2 text-md text-base-3 bg-base-1 hover:bg-primary-1 hover:text-primary-3 transition-colors duration-200 border rounded-md gap-x-2"

export type PaginationProps = {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
}

export const Pagination = forwardRef<HTMLDivElement, PaginationProps>(function Pagination(
  { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize },
  ref,
) {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  })

  const lastPage = useMemo(() => paginationRange[paginationRange.length - 1], [paginationRange])

  const onNext = useCallback(() => {
    if (typeof lastPage === "number" && currentPage < lastPage) {
      onPageChange(currentPage + 1)
    }
  }, [currentPage, onPageChange])

  const onPrevious = useCallback(() => {
    if (currentPage !== 1) {
      onPageChange(currentPage - 1)
    }
  }, [currentPage, onPageChange])

  const display = useMemo(() => {
    const first = (currentPage - 1) * pageSize + 1
    const last = currentPage * pageSize

    return `${first}-${last > totalCount ? totalCount : last} of ${totalCount} records`
  }, [currentPage, pageSize, totalCount])

  return (
    <div className="flex items-center justify-between py-4 text-base-3 text-md">
      <div className="flex">
        <span className="hidden md:block">Show : {display}</span>
        <div className="flex flex-col gap-x-2 sm:flex-row md:hidden">
          <span>Show : </span>
          <span>
            {currentPage} / {lastPage}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-x-2">
        {!(currentPage === 0 || paginationRange.length < 2) && (
          <>
            <a
              onClick={onPrevious}
              className={cx(
                buttonClassName,
                currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <Icon name="ChevronLeftIcon" className="w-4 h-4" />
              <span>Prev</span>
            </a>
            <div className="items-center hidden lg:flex gap-x-1 mx-1">
              {paginationRange.map((pageNumber: number | string, i: number) => {
                return pageNumber === DOTS ? (
                  <a key={i} className={cx(pageClassName, "cursor-not-allowed")}>
                    ...
                  </a>
                ) : (
                  <a
                    key={i}
                    className={cx(
                      pageClassName,
                      currentPage === pageNumber
                        ? "text-primary-3 cursor-not-allowed"
                        : "cursor-pointer",
                    )}
                    onClick={() => {
                      if (typeof pageNumber === "number") onPageChange(pageNumber)
                    }}
                  >
                    {pageNumber}
                  </a>
                )
              })}
            </div>
            <a
              onClick={onNext}
              className={cx(
                buttonClassName,
                currentPage === lastPage ? "cursor-not-allowed" : "cursor-pointer",
              )}
            >
              <span>Next</span>
              <Icon name="ChevronRightIcon" className="w-4 h-4" />
            </a>
          </>
        )}
      </div>
    </div>
  )
})
