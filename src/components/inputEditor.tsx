import { cva, type VariantProps } from "../helpers/cva"
import { useEditor, EditorContent, type PureEditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { Link as ExtLink } from "@tiptap/extension-link"
import { Table as ExtTable } from "@tiptap/extension-table"
import { TableRow as ExtRow } from "@tiptap/extension-table-row"
import { TableHeader as ExtHeader } from "@tiptap/extension-table-header"
import { TableCell as ExtCell } from "@tiptap/extension-table-cell"
import { forwardRef, useCallback, useEffect, useRef, useState } from "react"
import { dynamic } from "../helpers/dynamic"

const Iconbar = dynamic(async () => await import("./editor/iconbar"))
const TableMenu = dynamic(async () => await import("./editor/tablemenu"))

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

export interface InputEditorProps extends VariantProps<typeof _input> {
  onChange?: (body: string) => void
  className?: string
  content: string
  disabled?: boolean
}

export const InputEditor = forwardRef<PureEditorContent, InputEditorProps>(function InputEditor(
  { mode = "base", className, onChange, content, disabled = false },
  ref,
) {
  const refTimeout = useRef<NodeJS.Timeout>()
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
    refTimeout.current = setTimeout(() => {
      if (editor && hasContent) {
        editor.commands.setContent(content)
        renderContent(false)
      }
    }, 300)
    return () => {
      clearTimeout(refTimeout.current)
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
          {/**@ts-ignore*/}
          <EditorContent ref={ref} editor={editor} disabled={disabled} />
        </div>
      </div>
    </div>
  )
})
