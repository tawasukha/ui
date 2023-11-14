import { cva, type VariantProps } from "../helpers/cva"
import { type DivProps } from "react-html-props"
import { Item } from "./upload/Item"
import { Uploader, type UploaderProps } from "./upload/Uploader"
import { useCallback, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"
import { useIsFirstRender } from "../helpers/useIsFirstRender"

const _input = cva(["flex flex-wrap gap-2 w-full bg-base rounded-lg border p-2 border-dashed"], {
  variants: {
    mode: {
      base: [
        "border-base-2 text-base-5 focus:border-base-3 focus:shadow-base-1 disabled:bg-base-2",
      ],
      error: [
        "border-error-2 text-error-5 focus:border-error-3 focus:shadow-error-1 disabled:bg-error-2",
      ],
    },
  },
})

export interface InputUploadProps
  extends Pick<DivProps, "className" | "style">,
    Omit<UploaderProps, "maxSize" | "setFiles">,
    VariantProps<typeof _input> {
  onDelete?: (value: string) => Promise<Response>
  value?: string[]
  maxSize?: number
  onChange?: (value: string[]) => void
}

export function InputUpload({
  mode = "base",
  url,
  onDelete,
  className,
  value,
  onChange,
  style,
  accept,
  responseKey,
  maxSize = 20 * 1024 * 1024,
  disabled,
}: InputUploadProps) {
  const isFirstRender = useIsFirstRender()
  const [files, setFiles] = useState<string[]>(value ? (Array.isArray(value) ? value : []) : [])

  const onRemove = useCallback(
    async (file: string) => {
      if (onDelete) {
        await onDelete(file)
      }

      const updated = files.filter((v) => !v.includes(file))

      setFiles(updated)
    },
    [files, setFiles],
  )

  useEffect(() => {
    const _values = value ? (Array.isArray(value) ? value : []) : []
    if (files.length == 0 && _values.length !== 0) {
      setFiles(_values)
    }
  }, [files, value, setFiles])

  useEffect(() => {
    if (onChange) onChange(files)
  }, [files])

  return (
    <div style={style} className={_input({ mode, className })}>
      <Uploader {...{ url, accept, maxSize, setFiles, responseKey, disabled }} />
      <AnimatePresence>
        {files.map((file) => {
          const url = new URL(file)
          const name = url.searchParams.get("name") || (file || "").split("/").pop() || "Untitled"
          return (
            <Item
              disabled={disabled}
              key={name}
              onRemove={async () => {
                await onRemove(file)
              }}
              name={name}
              link={file}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}
