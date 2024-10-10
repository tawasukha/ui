import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { dialog } from "../components/dialog"
import { Button } from "../components/button"

const meta = {
  title: "Tawasukha UI/Dialog",
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<any>

export default meta

export const Promise = {
  render() {
    return (
      <div className="flex flex-row gap-x-2">
        <Button
          mode="primary"
          icon="InformationCircleIcon"
          size={"md"}
          onClick={async () =>
            await dialog.show({
              type: "info",
              title: "Information",
              description: "Hello World",
            })
          }
        >
          Show
        </Button>
        <Button
          mode="primary"
          icon="PencilIcon"
          size={"md"}
          onClick={async () =>
            await dialog.input({
              type: "warning",
              option: "input",
              title: "Search",
              description: "Please type for searh",
            })
          }
        >
          Input
        </Button>
        <Button
          mode="outline-primary"
          icon="PencilIcon"
          size={"md"}
          onClick={async () =>
            await dialog.show({
              type: "success",
              option: "textarea",
              title: "Yeay",
              description: "Please give your comment",
            })
          }
        >
          Textarea
        </Button>
      </div>
    )
  },
}
