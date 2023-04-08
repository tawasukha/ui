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
    renderItem: (item: any) => <div className="flex flex-col">
      <span>{item.title}</span>
      <span className="text-sm">{item.author}</span>
    </div>,
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
      <Label>Label</Label>
      <InputSelect {...args} />
    </>
  },
};

export const AsyncSelect: StoryObj<typeof InputSelect> = {
  args: {
    mode: "error",
    keyLabel: "name",
    keyValue: "mal_id",
    renderItem: (item: any) => <div className="flex flex-col">
      <span>{item.name}</span>
      <span className="text-sm">{item.mal_id}</span>
    </div>,
    loadOptions: async (inputValue) => {
      const response = await fetch(`https://api.jikan.moe/v4/people?q=${inputValue}`)
      const jsonData = await response.json();
      return jsonData.data
    },
  },
  render(args) {
    return <>
      <Label>Label</Label>
      <InputSelect {...args} />
      <Label>Label</Label>
      <InputSelect {...args} />
    </>
  },
};

export const MultiSelect: StoryObj<typeof InputSelect> = {
  args: {
    creatable: true,
    mode: "base",
    multiple: true,
    keyLabel: "title",
    keyValue: "author",
    /*
    renderItem: (item: any) => <div className="flex flex-col">
      <span>{item.title}</span>
      <span className="text-sm">{item.author}</span>
    </div>,
    */
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

export const MultiAsyncSelect: StoryObj<typeof InputSelect> = {
  args: {
    mode: "error",
    multiple: true,
    keyLabel: "name",
    keyValue: "mal_id",
    renderItem: (item: any) => <div className="flex flex-col">
      <span>{item.name}</span>
      <span className="text-sm">{item.mal_id}</span>
    </div>,
    loadOptions: async (inputValue) => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/people?q=${inputValue}`)
        const jsonData = await response.json();
        return jsonData.data
      } catch (err) {
        return []
      }
    },
  },
  render(args) {
    return <>
      <Label>Label</Label>
      <InputSelect {...args} />
      <Label>Label</Label>
      <InputSelect {...args} />
    </>
  },
};
