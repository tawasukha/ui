import { cx, cva, type VariantProps } from "../helpers/cva"
import { type EditorContentProps } from "@tiptap/react"
import { type DivProps } from "react-html-props"
import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Link as ExtLink } from "@tiptap/extension-link"
import { Table as ExtTable } from "@tiptap/extension-table"
import { TableRow as ExtRow } from "@tiptap/extension-table-row"
import { TableHeader as ExtHeader } from "@tiptap/extension-table-header"
import { TableCell as ExtCell } from "@tiptap/extension-table-cell"
import { useCallback, useEffect, useRef, useState } from "react"
import { dynamic } from "../helpers/dynamic"

const Link = dynamic(async () => await import("../icons/link").then((o) => ({ default: o.Link })))

const Unlink = dynamic(
  async () => await import("../icons/unlink").then((o) => ({ default: o.Unlink })),
)
const Bold = dynamic(async () => await import("../icons/bold").then((o) => ({ default: o.Bold })))
const Italic = dynamic(
  async () => await import("../icons/italic").then((o) => ({ default: o.Italic })),
)
const Strike = dynamic(
  async () => await import("../icons/strike").then((o) => ({ default: o.Strike })),
)
const Ol = dynamic(async () => await import("../icons/ol").then((o) => ({ default: o.Ol })))
const Quote = dynamic(
  async () => await import("../icons/quote").then((o) => ({ default: o.Quote })),
)
const Hr = dynamic(async () => await import("../icons/hr").then((o) => ({ default: o.Hr })))
const Ul = dynamic(async () => await import("../icons/ul").then((o) => ({ default: o.Ul })))
const Undo = dynamic(async () => await import("../icons/undo").then((o) => ({ default: o.Undo })))
const Redo = dynamic(async () => await import("../icons/redo").then((o) => ({ default: o.Redo })))
const Code = dynamic(async () => await import("../icons/code").then((o) => ({ default: o.Code })))
const Paragraph = dynamic(
  async () => await import("../icons/paragraph").then((o) => ({ default: o.Paragraph })),
)
const Table = dynamic(
  async () => await import("../icons/table").then((o) => ({ default: o.Table })),
)
const AddRowBefore = dynamic(
  async () => await import("../icons/add_row_before").then((o) => ({ default: o.AddRowBefore })),
)
const AddRowAfter = dynamic(
  async () => await import("../icons/add_row_after").then((o) => ({ default: o.AddRowAfter })),
)
const AddColBefore = dynamic(
  async () => await import("../icons/add_col_before").then((o) => ({ default: o.AddColBefore })),
)
const AddColAfter = dynamic(
  async () => await import("../icons/add_col_after").then((o) => ({ default: o.AddColAfter })),
)
const DeleteCol = dynamic(
  async () => await import("../icons/delete_col").then((o) => ({ default: o.DeleteCol })),
)
const DeleteRow = dynamic(
  async () => await import("../icons/delete_row").then((o) => ({ default: o.DeleteRow })),
)
const DeleteTable = dynamic(
  async () => await import("../icons/delete_table").then((o) => ({ default: o.DeleteTable })),
)

const _input = cva(
  [
    "focus:ring-0 block w-full placeholder-base-3 bg-base rounded-lg border focus:outline-none focus:shadow-md",
  ],
  {
    variants: {
      mode: {
        base: ["border-base-2 text-base-5 focus:border-base-3 focus:shadow-base-1"],
        error: ["border-error-2 text-error-5 focus:border-error-3 focus:shadow-error-1"],
      },
    },
  },
)

const buttonClass =
  "fill-base-3 h-8 w-8 text-md flex justify-center items-center shadow shadow-offset rounded-md"

type IconProps = DivProps & {
  label: string
  active?: boolean
  name: any
}

function Icon({ onClick, label, active = false, ...props }: IconProps) {
  return (
    <div className="group flex" onClick={onClick}>
      <div
        className={cx(
          buttonClass,
          active ? "fill-primary-5 text-primary-5" : "hover:bg-primary-2/30 text-base-3",
        )}
      >
        <props.name className="h-4 w-4" />
      </div>
      <span className="absolute z-30 top-16 scale-0 transition-all rounded bg-base-5 text-base-1 p-2 text-xs group-hover:scale-100">
        {label}
      </span>
    </div>
  )
}

function Iconbar({ editor }: EditorContentProps) {
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

function TableMenu({ editor }: EditorContentProps) {
  return !editor ? (
    <></>
  ) : (
    <BubbleMenu
      className="bg-base p-2 shadow-md"
      editor={editor}
      shouldShow={({ editor }) => {
        return editor.isActive("table")
      }}
      tippyOptions={{ duration: 100 }}
    >
      <Icon
        label="add_row_before"
        name={AddRowBefore}
        onClick={() => editor.chain().focus().addRowBefore().run()}
      />
      <Icon
        label="add_row_after"
        name={AddRowAfter}
        onClick={() => editor.chain().focus().addRowAfter().run()}
      />
      <Icon
        label="delete_row"
        name={DeleteRow}
        onClick={() => editor.chain().focus().deleteRow().run()}
      />
      <Icon
        label="add_col_before"
        name={AddColBefore}
        onClick={() => editor.chain().focus().addColumnBefore().run()}
      />
      <Icon
        label="add_col_after"
        name={AddColAfter}
        onClick={() => editor.chain().focus().addColumnAfter().run()}
      />
      <Icon
        label="delete_col"
        name={DeleteCol}
        onClick={() => editor.chain().focus().deleteColumn().run()}
      />
      <Icon
        label="delete_table"
        name={DeleteTable}
        onClick={() => editor.chain().focus().deleteTable().run()}
      />
    </BubbleMenu>
  )
}

export interface InputEditorProps extends VariantProps<typeof _input> {
  onChange?: (body: string) => void
  className?: string
  content: string
  disabled?: boolean
}

export function InputEditor({
  mode = "base",
  className,
  onChange,
  content,
  disabled = false,
}: InputEditorProps) {
  const ref = useRef<any>()
  const [hasContent, renderContent] = useState(content === undefined)
  const editor = useEditor({
    extensions: [
      StarterKit,
      ExtTable.configure({
        resizable: true,
      }),
      ExtHeader,
      ExtRow,
      ExtCell,
      ExtLink.configure({
        openOnClick: false,
      }),
    ],
    editable: !disabled,
    editorProps: {
      attributes: {
        style: "max-width:fit-content",
        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",
      },
    },
    content,
    parseOptions: {
      preserveWhitespace: "full",
    },
    onUpdate({ editor }) {
      if (onChange) {
        onChange(editor.getHTML())
      }
    },
  })

  useEffect(() => {
    ref.current = setTimeout(() => {
      if (editor && hasContent) {
        editor.commands.setContent(content)
        renderContent(false)
      }
    }, 300)
    return () => {
      clearTimeout(ref.current)
    }
  }, [content, editor, hasContent])

  const focus = useCallback(() => {
    editor?.commands.focus()
  }, [editor])

  return (
    <div className={_input({ mode, className })} onClick={focus}>
      {!disabled && <Iconbar editor={editor} />}
      <div className="min-h-[200px] overflow-auto">
        {editor && <TableMenu editor={editor} />}
        <div className="px-4 pt-3 py-2 text-base-5">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
