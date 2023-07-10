import React from "react"
import { InputText } from "./inputText"
import { InputTextArea } from "./inputTextArea"
import { create } from "./modal-promise"
import { type ModalProps, Modal, ModalFooter, type2Mode } from "./modal"

interface DialogPromiseProps
  extends Omit<ModalProps, "visible" | "onClickOK" | "onClickCancel" | "onClickBackDrop"> {
  isOpen: boolean
  option?: "textarea" | "input"
  allowBlank?: boolean
  allowClose?: boolean
  onResolve: (
    args: React.KeyboardEvent<HTMLInputElement> | Record<string, string | boolean>,
  ) => void
  onReject: (args: React.KeyboardEvent<HTMLInputElement> | Record<string, string | boolean>) => void
}

function useDialogInput({
  option,
  onResolve,
  allowBlank,
}: Pick<DialogPromiseProps, "option" | "onResolve" | "allowBlank">) {
  const refInput = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = React.useCallback(
    (event) => {
      if (event.key === "Enter") {
        const value = refInput.current?.value || ""
        if (!(value === "" && !allowBlank)) {
          onResolve({ ok: true, value })
        }
      }
    },
    [onResolve],
  )

  const Input = React.useMemo(() => {
    return !option ? null : option === "input" ? (
      <InputText className="mt-2" ref={refInput} onKeyDown={onKeyDown} />
    ) : (
      <InputTextArea className="mt-2" ref={refInput} minRows={3} />
    )
  }, [])

  return { Input, refInput }
}

export function DialogPromise({
  isOpen: visible,
  option,
  type,
  allowBlank,
  allowClose,
  onResolve,
  onReject,
  title,
  description,
  captionOK,
  captionCancel,
}: DialogPromiseProps) {
  const mode = React.useMemo(() => type2Mode(type), [type])
  const { refInput, Input } = useDialogInput({ option, onResolve, allowBlank })

  const onClickOK = React.useCallback(() => {
    if (refInput.current) {
      const value = refInput.current.value
      if (allowBlank) {
        onResolve(value ? { ok: true, value } : { ok: true })
      } else {
        if (value) {
          onResolve({ ok: true, value })
        }
      }
    } else {
      onResolve({ ok: true, value: "" })
    }
  }, [onResolve])

  const onClickCancel = React.useCallback(() => {
    onReject({ ok: false })
  }, [onReject])

  const onClickBackDrop = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    allowClose ? onClickCancel() : () => {}
  }, [onClickCancel])

  return (
    <Modal {...{ visible, type, onClickCancel, onClickOK, onClickBackDrop, title, description }}>
      {Input}
      {!allowBlank && !!option && <span className="text-xs text-error-5">* Mandatory</span>}
      <ModalFooter {...{ mode, option, captionCancel, captionOK, onClickOK, onClickCancel }} />
    </Modal>
  )
}

// @ts-expect-error
const _dialog = create(DialogPromise)

export type DialogProps = Omit<DialogPromiseProps, "onResolve" | "onReject" | "isOpen">

export const dialog = {
  show: async (props: DialogProps) => {
    try {
      return await _dialog({ ...props })
    } catch (e) {
      return { ok: false }
    }
  },
  input: async (props: DialogProps) => {
    try {
      return await _dialog({ ...props, option: "input" } as DialogProps)
    } catch (e) {
      return { ok: false }
    }
  },
  textarea: async (props: DialogProps) => {
    try {
      return await _dialog({ ...props, option: "textarea" } as DialogProps)
    } catch (e) {
      return { ok: false }
    }
  },
}
