import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../components/table"

const meta = {
  title: "Tawasukha UI/Table",
  component: Table,
  tags: ["docsPage"],
  argTypes: {
  },
} satisfies Meta<typeof Table>;

export default meta;

const data = [
  { id: 1, name: "Andy", address: "Orchid Road", city: "Malaka" },
  { id: 2, name: "Mary", address: "Pudu", city: "Kuala Lumpur" },
  { id: 3, name: "Jane", address: "Bassinger Court", city: "Mexico City" },
  { id: 4, name: "Peter", address: "H Belhaven Loop", city: "Tampa" },
  { id: 5, name: "Parker", address: "Great Avenue", city: "San Fransisco" },
]

export const Basic: StoryObj<typeof Table> = {
  args: {
  },
  render(args) {
    return (
      <div className="flex min-h-0 flex-1">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-10">
                No
              </TableCell>
              <TableCell>
                Name
              </TableCell>
              <TableCell>
                Address
              </TableCell>
              <TableCell>
                City
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((d, i) => {
              return <TableRow key={i} dark={i % 2 === 0}>
                <TableCell>{d.id}</TableCell>
                <TableCell>{d.name}</TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>{d.city}</TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table >
      </div>
    )
  },
};

