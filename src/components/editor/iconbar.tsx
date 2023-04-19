import { Link } from "./icon/link"
import { Unlink } from "./icon/unlink"
import { Bold } from "./icon/bold"
import { Italic } from "./icon/italic"
import { Strike } from "./icon/strike"
import { Ol } from "./icon/ol"
import { Quote } from "./icon/quote"
import { Hr } from "./icon/hr"
import { Ul } from "./icon/ul"
import { Undo } from "./icon/undo"
import { Redo } from "./icon/redo"
import { Code } from "./icon/code"
import { Paragraph } from "./icon/paragraph"
import { Table } from "./icon/table"
import { useCallback } from "react"
import { type EditorContentProps } from "@tiptap/react"
import { Icon } from "./icon"

export default function Iconbar({ editor }: EditorContentProps) {
  const setLink = useCallback(() => {
    if (!editor) return

    const previousUrl = editor.getAttributes("link").href
    const url = window.prompt("Please fill URL", previousUrl)

    if (url === null) {
      return
    }

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run()
  }, [editor])

  return (
    <div className="flex flex-row gap-1 overflow-x-hidden flex-wrap p-2 shadow shadow-offset">
      <Icon
        label="bold"
        name={Bold}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        active={editor?.isActive("bold") || false}
      />
      {false && (
        <Icon
          label="italic"
          name={Italic}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          active={editor?.isActive("italic") || false}
        />
      )}
      <Icon
        label="strike"
        name={Strike}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        active={editor?.isActive("strike") || false}
      />
      <Icon
        label="code"
        name={Code}
        onClick={() => editor?.chain().focus().toggleCode().run()}
        active={editor?.isActive("code") || false}
      />
      <Icon
        label="paragraph"
        name={Paragraph}
        onClick={() => editor?.chain().focus().setParagraph().run()}
        active={editor?.isActive("paragraph") || false}
      />

      <Icon
        label="h1"
        name={() => <span className="text-md">H1</span>}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        active={editor?.isActive("heading", { level: 1 }) || false}
      />
      <Icon
        label="h2"
        name={() => <span className="text-md">H2</span>}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor?.isActive("heading", { level: 2 }) || false}
      />
      <Icon
        label="h3"
        name={() => <span className="text-md">H3</span>}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor?.isActive("heading", { level: 3 }) || false}
      />
      <Icon
        label="h4"
        name={() => <span className="text-md">H4</span>}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor?.isActive("heading", { level: 4 }) || false}
      />
      <Icon
        label="h5"
        name={() => <span className="text-md">H5</span>}
        onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
        active={editor?.isActive("heading", { level: 5 }) || false}
      />
      <Icon label="link" name={Link} onClick={setLink} active={editor?.isActive("link") || false} />
      <Icon
        label="unlink"
        name={Unlink}
        onClick={() => editor?.chain().focus().unsetLink().run()}
        active={editor?.isActive("unlink") || false}
      />
      <Icon
        label="bullet list"
        name={Ul}
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        active={editor?.isActive("bulletList") || false}
      />
      <Icon
        label="ordered list"
        name={Ol}
        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        active={editor?.isActive("orderedList") || false}
      />
      <Icon
        label="code block"
        name={Code}
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        active={editor?.isActive("codeBlock") || false}
      />
      <Icon
        label="blockquote"
        name={Quote}
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        active={editor?.isActive("blockquote") || false}
      />
      <Icon
        label="horizontal rule"
        name={Hr}
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
      />
      <Icon label="undo" name={Undo} onClick={() => editor?.chain().focus().undo().run()} />
      <Icon label="redo" name={Redo} onClick={() => editor?.chain().focus().redo().run()} />
      <Icon
        label="table"
        name={Table}
        onClick={() => {
          editor?.commands.insertTable({
            rows: 3,
            cols: 3,
            withHeaderRow: false,
          })
        }}
      />
    </div>
  )
}
