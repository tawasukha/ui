import { motion } from "framer-motion"
export function Loader() {
  return <div className="fixed flex left-1/2 -ml-20 -mt-8 translateY-[-50%] top-1/2 flex-row justify-around w-36">
    <motion.span animate={{
      scale: [0.5, 1, 0.5],
      transition: {
        ease: "linear", duration: 1, repeat: Infinity,
      },
    }} className="h-6 w-6 rounded-full bg-base-3" />
    <motion.span animate={{
      scale: [0.7, 1.5, 0.7],
      transition: {
        ease: "linear", duration: 1, repeat: Infinity,
      },
    }}
      className="h-6 w-6 rounded-full bg-base-3" />
    <motion.span animate={{
      scale: [0.7, 1.5, 0.7],
      transition: {
        ease: "linear", duration: 1, repeat: Infinity,
      },
    }}
      className="h-6 w-6 rounded-full bg-base-3" />
    <motion.span animate={{
      scale: [0.5, 1, 0.5],
      transition: {
        ease: "linear", duration: 1, repeat: Infinity,
      },
    }} className="h-6 w-6 rounded-full bg-base-3" />
  </div>
}