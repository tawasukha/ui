import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../components/label";
import { InputText } from "../components/inputText";
import { InputTextArea } from "../components/inputTextArea";
import { InputPassword } from "../components/inputPassword";
import { InputSelect } from "../components/inputSelect";

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
  render(args) {
    return <>
      <Label>Label</Label>
      <InputText {...args} />
    </>

  },
};

export const Password: StoryObj<typeof InputPassword> = {
  args: {
    mode: "error",
  },
  render(args) {
    return <>
      <Label>Label</Label>
      <InputPassword {...args} />
    </>
  },
};

export const TextArea: StoryObj<typeof InputTextArea> = {
  args: {
    mode: "error",
  },
  render(args) {
    return <>
      <Label>Label</Label>
      <InputTextArea {...args} />
    </>
  },
};

export const Select: StoryObj<typeof InputSelect> = {
  args: {
    mode: "error",
    keyLabel: "title",
    keyValue: "author",
    options: [{ author: 'Harper Lee', title: 'To Kill a Mockingbird' },
    { author: 'Lev Tolstoy', title: 'War and Peace' },
    { author: 'Fyodor Dostoyevsy', title: 'The Idiot' },
    { author: 'Oscar Wilde', title: 'A Picture of Dorian Gray' },
    { author: 'George Orwell', title: '1984' },
    { author: 'Jane Austen', title: 'Pride and Prejudice' },
    { author: 'Marcus Aurelius', title: 'Meditations' },
    { author: 'Fyodor Dostoevsky', title: 'The Brothers Karamazov' },
    { author: 'Lev Tolstoy', title: 'Anna Karenina' },
    { author: 'Fyodor Dostoevsky', title: 'Crime and Punishment' }],
  },
  render(args) {
    return <>
      <Label>Label</Label>
      <InputSelect {...args} />
    </>
  },
};
