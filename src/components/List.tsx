import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const itemVariants = {
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.02,
    },
  }),
  hidden: (i: number) => ({
    opacity: 0,
    x: -5,
    transition: {
      delay: (5 - 1 - i) * 0.02,
    },
  }),
}

export default function List() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  return (
    <div className="window">
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "닫기" : "열기"}
      </button>
      <motion.ul className="list-container">
        {new Array(5).fill("").map((e, i) => (
          <motion.li
            className="list-item"
            custom={i}
            animate={isOpen ? "visible" : "hidden"}
            variants={itemVariants}
          />
        ))}
      </motion.ul>
    </div>
  )
}
