import type { Meta, StoryObj } from "@storybook/react";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "../components/table"
import { Checkbox as InputCheckbox } from "../components/inputCheckbox";

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
      <Table>
        <TableHead>
          <TableRow>

            <TableHeaderCell>
              No
            </TableHeaderCell>
            <TableHeaderCell>
              Name
            </TableHeaderCell>
            <TableHeaderCell>
              Address
            </TableHeaderCell>
            <TableHeaderCell>
              City
            </TableHeaderCell>
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
    )
  },
};

export const Checkbox: StoryObj<typeof Table> = {
  args: {
  },
  render(args) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>
              <InputCheckbox mode="primary" />
            </TableHeaderCell>
            <TableHeaderCell>
              No
            </TableHeaderCell>
            <TableHeaderCell>
              Name
            </TableHeaderCell>
            <TableHeaderCell>
              Address
            </TableHeaderCell>
            <TableHeaderCell>
              City
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((d, i) => {
            return <TableRow key={i} dark={i % 2 === 0}>
              <TableCell><InputCheckbox /></TableCell>
              <TableCell>{d.id}</TableCell>
              <TableCell>{d.name}</TableCell>
              <TableCell>{d.address}</TableCell>
              <TableCell>{d.city}</TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table >
    )
  },
};

