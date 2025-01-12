import { Icon } from "../icon"
import { CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { ProgressBar } from "./ProgressBar"
import { useDropzone, type Accept } from "react-dropzone-esm"
import { useCallback, useState } from "react"
import { uploadFile } from "./util"
import { cx } from "src/helpers"

export type UploaderProps = {
  responseKey?: string
  responseParser?: Function
  accept?: Accept
  maxSize: number
  url?: string
  setFiles: React.Dispatch<React.SetStateAction<string[]>>
  disabled?: boolean
}

export function Uploader({
  disabled,
  accept,
  maxSize,
  url,
  responseParser,
  responseKey = "name",
  setFiles,
}: UploaderProps) {
  const [progress, setProgress] = useState(0)
  const [info, setInfo] = useState("")

  const onDrop = useCallback(
    async (files: File[]) => {
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        setInfo(`${i + 1}/${files.length}`)
        if (url) {
          const resp = await uploadFile(url, file, setProgress)
          const storedFile = responseParser ? responseParser(resp) : resp[responseKey]
          setFiles((files) => [...files, storedFile])
          setProgress(0)
        } else {
          setFiles((files) => [...files, file.name])
        }
      }
    },
    [setFiles],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxSize,
  })

  return (
    <div
      {...getRootProps({
        className: cx(
          "relative flex flex-col p-2 items-center justify-center rounded-md",
          disabled ? "" : "w-16 border border-base-2 h-16 cursor-pointer border-dashed",
        ),
      })}
    >
      {progress === 0 ? (
        disabled ? (
          <span />
        ) : (
          <>
            <input {...getInputProps()} />
            <Icon name={CloudArrowUpIcon} className="h-8 w-8 fill-primary-2 text-base-4 stroke-1" />
          </>
        )
      ) : (
        <>
          <ProgressBar percent={progress} />
          <span className="absolute text-xs right-1 bottom-0.5">{info}</span>
        </>
      )}
    </div>
  )
}
