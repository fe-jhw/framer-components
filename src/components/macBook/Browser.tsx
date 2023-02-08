import { Program } from "../MacBook"
import { motion } from "framer-motion"

export default function Browser({
  program,
  closeBrowser,
}: {
  program: Program
  closeBrowser: (program: Program) => void
}) {
  return (
    <motion.div
      className="macBook-browser"
      drag
      initial={{ y: 500, scale: 0 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ y: 500, scale: 0 }}
    >
      <div className="macBook-browser-header">
        {program.label}
        <div
          className="macBook-browser-closeBtn"
          onClick={() => closeBrowser(program)}
        />
      </div>
      <div className="macBook-browser-content">{program.icon}</div>
    </motion.div>
  )
}
