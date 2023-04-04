import React from "react"
import type { Meta, StoryObj } from "@storybook/react";
import { InputText } from "../src/components/inputText";
import { InputTextArea } from "../src/components/inputTextArea";
import { InputPassword } from "../src/components/inputPassword";

const meta = {
  title: "Tawasukha UI/Input",
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof InputText>;

export default meta;

export const Text: StoryObj<typeof InputText> = {
  args: {
    mode: "error",
  },
  render(args) { return <InputText {...args} /> }
};

export const Password: StoryObj<typeof InputPassword> = {
  args: {
    mode: "error",
  },
  render(args) { return <InputPassword {...args} /> }
};

export const TextArea: StoryObj<typeof InputTextArea> = {
  args: {
    mode: "error",
  },
  render(args) { return <InputTextArea {...args} /> }
};
