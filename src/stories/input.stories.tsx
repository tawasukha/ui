import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "../components/label"
import { InputCheckbox } from "../components/inputCheckbox"
import { InputText } from "../components/inputText"
import { InputTextArea } from "../components/inputTextArea"
import { InputPassword } from "../components/inputPassword"
import { InputSelect } from "../components/inputSelect"
import { InputDate } from "../components/inputDate"
import { InputNumber } from "../components/inputNumber"
import { InputEditor } from "../components/inputEditor"
import { InputUpload } from "../components/inputUpload"
import { today } from "./data"
import { useState } from "react"

const meta = {
  title: "Tawasukha UI/Input",
  tags: ["docsPage"],
  argTypes: {},
} satisfies Meta<typeof InputText>

export default meta

export const Text: StoryObj<typeof InputText> = {
  args: {
    mode: "error",
  },
  render(args) {
    return (
      <>
        <Label>Label</Label>
        <InputText {...args} />
      </>
    )
  },
}

export const Password: StoryObj<typeof InputPassword> = {
  args: {
    mode: "error",
  },
  render(args) {
    return (
      <>
        <Label>Label</Label>
        <InputPassword {...args} />
      </>
    )
  },
}

export const Number: StoryObj<typeof InputNumber> = {
  args: {
    mode: "error",
  },
  render(args) {
    return (
      <>
        <Label>Label</Label>
        <InputNumber {...args} />
      </>
    )
  },
}

export const TextArea: StoryObj<typeof InputTextArea> = {
  args: {
    mode: "error",
  },
  render(args) {
    return (
      <>
        <Label>Label</Label>
        <InputTextArea {...args} />
      </>
    )
  },
}

export const Checkbox: StoryObj<typeof InputCheckbox> = {
  args: {
    mode: "error",
    indeterminate: false,
    checked: false,
  },
  render(args) {
    return (
      <>
        <InputCheckbox {...args} />
      </>
    )
  },
}

export const Date: StoryObj<typeof InputDate> = {
  args: {
    mode: "base",
  },
  render(args) {
    const [value, onChange] = useState<any>(today)
    return (
      <>
        <Label>Label</Label>
        <InputDate {...args} value={value} onChange={onChange} />
      </>
    )
  },
}

export const Select: StoryObj<typeof InputSelect> = {
  args: {
    mode: "error",
    keyLabel: "title",
    keyValue: "author",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.title}</span>
        <span className="text-sm">{item.author}</span>
      </div>
    ),
    options: [
      { author: "Harper Lee", title: "To Kill a Mockingbird" },
      { author: "Lev Tolstoy", title: "War and Peace" },
      { author: "Fyodor Dostoyevsy", title: "The Idiot" },
      { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
      { author: "George Orwell", title: "1984" },
      { author: "Jane Austen", title: "Pride and Prejudice" },
      { author: "Marcus Aurelius", title: "Meditations" },
      { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
      { author: "Lev Tolstoy", title: "Anna Karenina" },
      { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
    ],
  },
  render(args) {
    const [value, onChange] = useState<any>("")
    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
        <Label>Label</Label>
        <div className="w-36">
          <InputSelect {...{ value, onChange }} {...args} />
        </div>
      </>
    )
  },
}

export const AsyncSelect: StoryObj<typeof InputSelect> = {
  args: {
    creatable: false,
    mode: "error",
    keyLabel: "name",
    keyValue: "mal_id",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-sm">{item.mal_id}</span>
      </div>
    ),
    loadOptions: async (inputValue) => {
      const response = await fetch(`https://api.jikan.moe/v4/people?q=${inputValue}`)
      const jsonData = await response.json()
      return jsonData.data
    },
  },
  render(args) {
    const [value, onChange] = useState<any>("")
    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
      </>
    )
  },
}

export const CreatableSelect: StoryObj<typeof InputSelect> = {
  args: {
    creatable: true,
    mode: "error",
    keyLabel: "title",
    keyValue: "author",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.title}</span>
        <span className="text-sm">{item.author}</span>
      </div>
    ),
    options: [
      { author: "Harper Lee", title: "To Kill a Mockingbird" },
      { author: "Lev Tolstoy", title: "War and Peace" },
      { author: "Fyodor Dostoyevsy", title: "The Idiot" },
      { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
      { author: "George Orwell", title: "1984" },
      { author: "Jane Austen", title: "Pride and Prejudice" },
      { author: "Marcus Aurelius", title: "Meditations" },
      { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
      { author: "Lev Tolstoy", title: "Anna Karenina" },
      { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
    ],
  },
  render(args) {
    const [value, onChange] = useState<any>("")

    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
      </>
    )
  },
}

export const MultiSelect: StoryObj<typeof InputSelect> = {
  args: {
    mode: "base",
    multiple: true,
    keyLabel: "title",
    keyValue: "author",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.title}</span>
        <span className="text-sm">{item.author}</span>
      </div>
    ),
    options: [
      { author: "Harper Lee", title: "To Kill a Mockingbird" },
      { author: "Lev Tolstoy", title: "War and Peace" },
      { author: "Fyodor Dostoyevsy", title: "The Idiot" },
      { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
      { author: "George Orwell", title: "1984" },
      { author: "Jane Austen", title: "Pride and Prejudice" },
      { author: "Marcus Aurelius", title: "Meditations" },
      { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
      { author: "Lev Tolstoy", title: "Anna Karenina" },
      { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
    ],
  },
  render(args) {
    const [value, onChange] = useState<any>("")

    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
      </>
    )
  },
}

export const MultiCreatableSelect: StoryObj<typeof InputSelect> = {
  args: {
    mode: "base",
    creatable: true,
    multiple: true,
    keyLabel: "title",
    keyValue: "author",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.title}</span>
        <span className="text-sm">{item.author}</span>
      </div>
    ),
    options: [
      { author: "Harper Lee", title: "To Kill a Mockingbird" },
      { author: "Lev Tolstoy", title: "War and Peace" },
      { author: "Fyodor Dostoyevsy", title: "The Idiot" },
      { author: "Oscar Wilde", title: "A Picture of Dorian Gray" },
      { author: "George Orwell", title: "1984" },
      { author: "Jane Austen", title: "Pride and Prejudice" },
      { author: "Marcus Aurelius", title: "Meditations" },
      { author: "Fyodor Dostoevsky", title: "The Brothers Karamazov" },
      { author: "Lev Tolstoy", title: "Anna Karenina" },
      { author: "Fyodor Dostoevsky", title: "Crime and Punishment" },
    ],
  },
  render(args) {
    const [value, onChange] = useState<any>("")

    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
      </>
    )
  },
}

export const MultiAsyncSelect: StoryObj<typeof InputSelect> = {
  args: {
    mode: "error",
    multiple: true,
    keyLabel: "name",
    keyValue: "mal_id",
    renderItem: (item: any) => (
      <div className="flex flex-col">
        <span>{item.name}</span>
        <span className="text-sm">{item.mal_id}</span>
      </div>
    ),
    loadOptions: async (inputValue) => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/people?q=${inputValue}`)
        const jsonData = await response.json()
        return jsonData.data
      } catch (err) {
        return []
      }
    },
  },
  render(args) {
    const [value, onChange] = useState<any>("")

    return (
      <>
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
        <Label>Label</Label>
        <InputSelect {...{ value, onChange }} {...args} />
      </>
    )
  },
}

export const Editor: StoryObj<typeof InputEditor> = {
  args: {},
  render() {
    return <InputEditor content={""} onChange={() => {}} />
  },
}

export const Upload: StoryObj<typeof InputUpload> = {
  args: {},
  render() {
    /* WITH URL
    const urlUpload = "https://fake_domain.com/api/upload"
    const urlDelete = "https://fake_domain.com/api/delete"
    const onDelete = async (link: string) => {
      const name = link.split("/").pop()
      await fetch(urlDelete + name, { method: "DELETE" })
    }
    return <InputUpload url={urlUpload} onDelete={onDelete} responseKey="url"/>
    */
    return <InputUpload />
  },
}
