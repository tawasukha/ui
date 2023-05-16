import { Icon } from "../icon"
import { CloudArrowUpIcon } from "@heroicons/react/24/solid"
import { ProgressBar } from "./ProgressBar"
import { useDropzone, type Accept } from "react-dropzone"
import { useCallback, useState } from "react"
import { uploadFile } from "./util"

export type UploaderProps = {
  responseKey?: string
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
          if (!responseKey) {
            throw new Error("Response Key not found")
          }
          const resp = await uploadFile(url, file, setProgress)
          setFiles((files) => [...files, resp[responseKey]])
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
        className:
          "relative flex flex-col p-4 w-48 items-center justify-center border rounded-lg border-base-3 h-28 cursor-pointer",
      })}
    >
      {progress === 0 ? (
        disabled ? (
          <span />
        ) : (
          <>
            <input {...getInputProps()} />
            <Icon name={CloudArrowUpIcon} className="h-20 w-20 text-primary-5" />
            <span className="text-center">Click to upload or drag and drop</span>
          </>
        )
      ) : (
        <>
          <ProgressBar percent={progress} />
          <span className="absolute text-sm right-1 bottom-0.5">{info}</span>
        </>
      )}
    </div>
  )
}
