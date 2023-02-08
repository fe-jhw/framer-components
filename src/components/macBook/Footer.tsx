import { Program } from "../MacBook"
import { motion } from "framer-motion"

export default function Footer({
  openProgram,
  programs,
  openPrograms,
}: {
  openProgram: (program: Program) => void
  programs: Program[]
  openPrograms: Program[]
}) {
  const isOpened = (program: Program, openPrograms: Program[]): boolean => {
    if (openPrograms.find((e) => e.label === program.label)) return false
    return true
  }
  return (
    <div className="macBook-footer">
      {programs.map((program) => (
        <motion.div
          whileHover={{ scale: 1.2, cursor: "pointer" }}
          whileTap={{ scale: 1 }}
          className={`macBook-footer-icon${
            isOpened(program, openPrograms) ? "" : " opened"
          }`}
          onClick={() => openProgram(program)}
        >
          {program.icon}
        </motion.div>
      ))}
    </div>
  )
}
