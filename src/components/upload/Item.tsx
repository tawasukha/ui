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

export function Item({ onRemove, name, link, disabled }: ItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      {!disabled && (
        <button
          type="button"
          className="absolute -mt-1 -ml-1 rounded-full p-1 bg-error-3 z-10"
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
          <Icon name={TrashIcon} className="h-4 w-4 text-white" />
        </button>
      )}
      <a
        href={link}
        target="_blank"
        className="group p-4 relative block w-48 border rounded-lg border-base-2 bg-base-1 h-28 cursor-pointer"
        rel="noreferrer"
      >
        <p className="w-full h-full break-words line-clamp-3">{name}</p>
        {name && (
          <p className="absolute break-words min-w-64 z-30 -top-4 left-6 scale-0 transition-all rounded bg-base-5 text-base-1 p-2 text-xs group-hover:scale-100">
            {name}
          </p>
        )}
      </a>
    </motion.div>
  )
}
