import type { Meta, StoryObj } from "@storybook/react"
import { Table, TableBody, TableCell, TableHead, TableRow } from "../components/table"
import { data } from "./data"
import { useMemo, useState } from "react"
import { Pagination } from "../components/pagination"

const meta = {
  title: "Tawasukha UI/Table",
  component: Table,
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof Table>

export default meta

const PageSize = 10

export const Basic: StoryObj<typeof Table> = {
  args: {},
  render(args) {
    const [currentPage, setCurrentPage] = useState(1)

    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize
      const lastPageIndex = firstPageIndex + PageSize
      return data.slice(firstPageIndex, lastPageIndex)
    }, [currentPage])

    return (
      <div className="flex min-h-0 flex-1 flex-col">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentTableData.map((d, i) => {
              return (
                <TableRow key={i} dark={i % 2 === 0}>
                  <TableCell>{d.id}</TableCell>
                  <TableCell>{d.first_name}</TableCell>
                  <TableCell>{d.last_name}</TableCell>
                  <TableCell>{d.email}</TableCell>
                  <TableCell>{d.phone}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page: number) => {
            setCurrentPage(page)
          }}
        />
      </div>
    )
  },
}
