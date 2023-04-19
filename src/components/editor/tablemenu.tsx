import { type EditorContentProps } from "@tiptap/react"

import { AddRowBefore } from "./icon/add_row_before"
import { AddRowAfter } from "./icon/add_row_after"
import { AddColBefore } from "./icon/add_col_before"
import { AddColAfter } from "./icon/add_col_after"
import { DeleteCol } from "./icon/delete_col"
import { DeleteRow } from "./icon/delete_row"
import { DeleteTable } from "./icon/delete_table"

import { BubbleMenu } from "@tiptap/react"
import { Icon } from "./icon"

export default function TableMenu({ editor }: EditorContentProps) {
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
