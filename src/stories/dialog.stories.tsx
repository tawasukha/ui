import React from "react"
import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, dialog } from "../components/dialog";
import { Button } from "../components/button";

const meta = {
  title: "Tawasukha UI/Dialog",
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof Dialog>;

export default meta;

export const Base: StoryObj<typeof Dialog> = {
  args: {
    type: "error",
    title: "Title",
    visible: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ac nunc est. Maecenas sit amet enim a turpis ornare commodo. Proin bibendum nec lorem id sagittis. Donec varius quam non quam dignissim, in volutpat felis tempor. Suspendisse vel neque nec felis sodales gravida eget ac dolor. Sed augue nunc, pellentesque non felis non, mollis ultricies metus. Morbi viverra, diam ut eleifend ornare, diam eros tincidunt lacus, eu vestibulum ex nibh ac velit. Quisque nec odio nisl.",
  },
  render(args) { return <Dialog {...args} /> },
};

export const Promise = {
  render() {
    return <div className="flex flex-row gap-x-2">
      <Button mode="primary" icon="InformationCircleIcon" size={"md"} onClick={async () => await dialog.show({
        type: "info",
        title: "Information",
        description: "Hello World",
      })}>Show</Button>
      <Button mode="primary" icon="PencilIcon" size={"md"} onClick={async () => await dialog.input({
        type: "warning",
        option: "input",
        title: "Search",
        description: "Please type for searh",
      })}>Input</Button>
      <Button mode="outline-primary" icon="PencilIcon" size={"md"} onClick={async () => await dialog.show({
        type: "success",
        option: "textarea",
        title: "Yeay",
        description: "Please give your comment",
      })}>Textarea</Button>
    </div>

  },
}