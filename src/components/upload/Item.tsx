import { Icon } from "../icon"
import { TrashIcon } from "@heroicons/react/24/solid"
import { dialog } from "../dialog"
import { motion } from "framer-motion"

type ItemProps = {
  onRemove: (value: string) => void
  name: string
  link: string
  disabled?: boolean
}

export function Item({ onRemove, name, link, disabled = false }: ItemProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {!disabled && (
        <button
          type="button"
          className="absolute -mt-1 -ml-1 rounded-full p-1 bg-error-3 z-10 right-0"
          onClick={async () => {
            const result = await dialog.show({
              type: "warning",
              title: "Confirmation",
              description: "Delete this file ?",
            })
            if (result.ok) {
              onRemove(name)
            }
          }}
        >
          <Icon name={TrashIcon} className="h-3 w-3 text-white" />
        </button>
      )}
      <a
        title={name}
        href={link}
        target="_blank"
        className="group p-2 relative block w-[80px] border rounded-md border-base-2 bg-base-1 h-16 cursor-pointer text-xs"
        rel="noreferrer"
      >
        <p className="w-full h-full break-words line-clamp-3">{name}</p>
      </a>
    </motion.div>
  )
}
