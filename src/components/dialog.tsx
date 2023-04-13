import React, { type MouseEventHandler } from "react"
import { StyledIcon, type ModeProps } from "./icon"
import { Button } from "./button"
import { InputText } from "./inputText"
import { InputTextArea } from "./inputTextArea"
import { type ListIcon as Icons } from "@tawasukha/icon"
import { AnimatePresence, motion } from "framer-motion"
import { create } from "react-modal-promise"

type Mode = Exclude<NonNullable<ModeProps["mode"]>, "secondary">
type MouseEvent = MouseEventHandler<HTMLButtonElement | HTMLDivElement>

type ListIcon = {
  [k in Exclude<Mode, "base">]: Icons
}

type DialogType = Exclude<keyof ListIcon, "primary"> | "info" | "default"

function type2Mode(dialogType: DialogType) {
  return dialogType === "default" ? "base" : dialogType === "info" ? "primary" : dialogType
}
const listIcon: ListIcon = {
  primary: "InformationCircleIcon",
  warning: "ExclamationCircleIcon",
  error: "XCircleIcon",
  success: "CheckCircleIcon",
}

type FooterProps = {
  mode: Mode
  option?: "input" | "textarea"
  captionOK?: string
  captionCancel?: string
  onClickOK: MouseEvent
  onClickCancel?: MouseEvent
}

function DialogFooter({ mode, option, captionOK, captionCancel, onClickOK, onClickCancel }: FooterProps) {
  const textOK = React.useMemo(() => captionOK || (mode === "warning" ? "Yes" : "OK"), [])
  const textCancel = React.useMemo(() => captionCancel || (mode === "warning" ? "No" : "Cancel"), [])

  return <div className="flex justify-end mt-4 gap-x-2">
    <Button onClick={onClickOK} mode={"primary"} size={"md"} className="min-w-[80px] justify-center">{textOK}</Button>
    {(mode === "warning" || !!option) && <Button onClick={onClickCancel} mode={"transparent"} size={"md"} className="min-w-[80px] justify-center">{textCancel}</Button>}
  </div>
}

type BackDropProps = {
  onClickBackDrop: MouseEvent
}

function BackDrop({ onClickBackDrop }: BackDropProps) {
  return <motion.div className="absolute left-0 top-0 w-full h-full backdrop-blur z-30" onClick={onClickBackDrop}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  />
}

interface DialogProps extends Omit<FooterProps, "mode">, BackDropProps, Required<{ type: DialogType }> {
  visible?: boolean,
  title: string
  description: string,
  children?: React.ReactNode
}

export function Dialog({ visible = false, type, title, description, children, captionCancel, captionOK, onClickOK, onClickCancel, onClickBackDrop }: DialogProps) {
  const mode = React.useMemo(() => type2Mode(type), [type])
  const iconName = React.useMemo(() => mode === "base" ? null : listIcon[mode], [mode])

  return (
    <AnimatePresence>
      {visible && <>
        <BackDrop {...{ onClickBackDrop }} />
        <motion.div
          transition={{ delay: .15 }}
          initial={{ opacity: 0, translateY: "300%", translateX: "-50%" }}
          animate={{ opacity: 1, translateY: "0%", translateX: "-50%" }}
          exit={{ opacity: 0, translateY: "300%", translateX: "-50%" }}
          className={"fixed flex left-1/2 top-10 flex-col w-full max-w-md px-8 py-4 mt-16 bg-base rounded-lg shadow-lg shadow-offset z-40"}>
          {iconName && <div className="flex justify-center -mt-16 md:justify-end">
            <StyledIcon name={iconName} className="w-20 h-20 rounded-full ring ring-base-1 bg-base" mode={mode} />
          </div>}

          <h2 className="mt-2 text-xl font-semibold text-base-5">{title}</h2>
          <p className="mt-4 text-sm text-base-5 max-h-60 overflow-y-scroll pr-1">{description}</p>
          {children || <DialogFooter {...{ mode, captionCancel, captionOK, onClickOK, onClickCancel }} />}
        </motion.div>
      </>}
    </AnimatePresence>
  )
}

interface DialogPromiseProps extends Omit<DialogProps, "visible" | "onClickOK" | "onClickCancel" | "onClickBackDrop"> {
  isOpen: boolean
  option?: "textarea" | "input"
  allowBlank?: boolean
  allowClose?: boolean
  onResolve: (args: React.KeyboardEvent<HTMLInputElement> | Record<string, string | boolean>) => void
  onReject: (args: React.KeyboardEvent<HTMLInputElement> | Record<string, string | boolean>) => void
}

function useDialogInput({ option, onResolve, allowBlank }: Pick<DialogPromiseProps, "option" | "onResolve" | "allowBlank">) {
  const refInput = React.useRef<HTMLInputElement & HTMLTextAreaElement>(null)
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    React.useCallback(
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
    return !option ? null : option === "input" ? <InputText className="mt-2" ref={refInput} onKeyDown={onKeyDown} /> : <InputTextArea className="mt-2" ref={refInput} minRows={3} />
  }, [])

  return { Input, refInput }
}

export function DialogPromise({ isOpen: visible, option, type, allowBlank, allowClose, onResolve, onReject, title, description, captionOK, captionCancel }: DialogPromiseProps) {
  const mode = React.useMemo(() => type2Mode(type), [type])
  const { refInput, Input } = useDialogInput({ option, onResolve, allowBlank })

  const onClickOK = React.useCallback((value: any) => {
    if (refInput.current) {
      value = refInput.current.value
      if (allowBlank) {
        onResolve(value ? { ok: true, value } : { ok: true })
      } else {
        if (value) {
          onResolve({ ok: true, value })
        }
      }
    } else {
      onResolve({ ok: true, value })
    }
  }, [onResolve])

  const onClickCancel = React.useCallback(() => {
    onReject({ ok: false })
  }, [onReject])

  const onClickBackDrop = React.useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    allowClose ? onClickCancel() : () => { };
  }, [onClickCancel])

  return <Dialog  {...{ visible, type, onClickCancel, onClickOK, onClickBackDrop, title, description }}>
    {Input}
    {(!allowBlank && !!option) && <span className="text-xs text-error-5">* Mandatory</span>}
    <DialogFooter {...{ mode, option, captionCancel, captionOK, onClickOK, onClickCancel }} />
  </Dialog>
}

// @ts-expect-error
const _dialog = create(DialogPromise)

type Props = Omit<DialogPromiseProps, "onResolve" | "onReject" | "isOpen">

export const dialog = {
  show: async (props: Props) => {
    try {
      return await _dialog({ ...props })
    } catch (e) {
      return { ok: false }
    }
  },
  input: async (props: Props) => {
    try {
      return await _dialog({ ...props, option: "input" } as Props)
    } catch (e) {
      return { ok: false }
    }
  },
  textarea: async (props: Props) => {
    try {
      return await _dialog({ ...props, option: "textarea" } as Props)
    } catch (e) {
      return { ok: false }
    }
  },
}
