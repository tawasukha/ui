import React, { type MouseEventHandler } from "react"
import { type ModeProps } from "./icon"
import { Button } from "./button"
import { AnimatePresence, motion } from "framer-motion"
import { StyledIcon } from "./icon"
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid"

type Mode = Exclude<NonNullable<ModeProps["mode"]>, "secondary">
type MouseEvent = MouseEventHandler<HTMLButtonElement | HTMLDivElement>

type ListIcon = {
  [k in Exclude<Mode, "base">]: React.FC<any>
}

type ModalType = Exclude<keyof ListIcon, "primary"> | "info" | "default"

export function type2Mode(modalType: ModalType) {
  return modalType === "default" ? "base" : modalType === "info" ? "primary" : modalType
}

export type ModalFooterProps = {
  mode: Mode
  option?: "input" | "textarea"
  captionOK?: string
  captionCancel?: string
  onClickOK: MouseEvent
  onClickCancel?: MouseEvent
}

export function ModalFooter({
  mode,
  option,
  captionOK,
  captionCancel,
  onClickOK,
  onClickCancel,
}: ModalFooterProps) {
  const textOK = React.useMemo(() => captionOK || (mode === "warning" ? "Yes" : "OK"), [])
  const textCancel = React.useMemo(
    () => captionCancel || (mode === "warning" ? "No" : "Cancel"),
    [],
  )

  return (
    <div className="flex justify-end mt-4 gap-x-2">
      <Button
        onClick={onClickOK}
        mode={"primary"}
        size={"md"}
        className="min-w-[80px] justify-center"
      >
        {textOK}
      </Button>
      {(mode === "warning" || !!option) && (
        <Button
          onClick={onClickCancel}
          mode={"transparent"}
          size={"md"}
          className="min-w-[80px] justify-center"
        >
          {textCancel}
        </Button>
      )}
    </div>
  )
}

type BackDropProps = {
  onClickBackDrop: MouseEvent
}

function BackDrop({ onClickBackDrop }: BackDropProps) {
  return (
    <motion.div
      className="absolute left-0 top-0 w-full h-full backdrop-blur z-30"
      onClick={onClickBackDrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}

export interface ModalProps
  extends Omit<ModalFooterProps, "mode">,
    BackDropProps,
    Required<{ type: ModalType }> {
  visible?: boolean
  title: string
  description: string
  children?: React.ReactNode
}

export function Modal({
  visible = false,
  type,
  title,
  description,
  children,
  captionCancel,
  captionOK,
  onClickOK,
  onClickCancel,
  onClickBackDrop,
}: ModalProps) {
  const mode = React.useMemo(() => type2Mode(type), [type])
  const iconName = React.useMemo(() => {
    const listIcon: ListIcon = {
      primary: InformationCircleIcon,
      warning: ExclamationCircleIcon,
      error: XCircleIcon,
      success: CheckCircleIcon,
    }

    return mode === "base" ? null : listIcon[mode]
  }, [mode])

  return (
    <AnimatePresence>
      {visible && (
        <>
          <BackDrop {...{ onClickBackDrop }} />
          <motion.div
            transition={{ delay: 0.15 }}
            initial={{ opacity: 0, translateY: "300%", translateX: "-50%" }}
            animate={{ opacity: 1, translateY: "0%", translateX: "-50%" }}
            exit={{ opacity: 0, translateY: "300%", translateX: "-50%" }}
            className={
              "fixed flex left-1/2 top-10 flex-col w-full max-w-md lg:max-w-xl px-8 py-4 mt-16 bg-base rounded-lg shadow-lg shadow-offset z-40"
            }
          >
            {iconName && (
              <div className="flex justify-center -mt-16 md:justify-end">
                <StyledIcon
                  name={iconName}
                  className="w-20 h-20 rounded-full ring ring-base-1 bg-base"
                  mode={mode}
                />
              </div>
            )}

            <h2 className="mt-2 text-xl font-semibold text-base-5">{title}</h2>
            <p
              className="mt-4 text-sm text-base-5 max-h-60 overflow-y-auto pr-1"
              dangerouslySetInnerHTML={{ __html: description }}
            />
            {children || (
              <ModalFooter {...{ mode, captionCancel, captionOK, onClickOK, onClickCancel }} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
