import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

interface tabItem {
  icon: string
  label: string
}

const tabItems: tabItem[] = [
  { icon: "🍅", label: "Tomato" },
  { icon: "🥬", label: "Lettuce" },
  { icon: "🧀", label: "Cheese" },
  // { icon: "🥕", label: "Carrot" },
  // { icon: "🍌", label: "Banana" },
  // { icon: "🫐", label: "Blueberries" },
  // { icon: "🥂", label: "Champers?" },
]

export default function Tab() {
  const [selected, setSelected] = useState<tabItem>(tabItems[0])
  return (
    <div className="window">
      <nav>
        <ul className="tab-list">
          {tabItems.map((item) => (
            <motion.li
              key={item.label}
              className={item.label === selected.label ? "selected" : ""}
              onClick={() => setSelected(item)}
            >
              {`${item.icon} ${item.label}`}
              {item.label === selected.label ? (
                <motion.div className="underline" layoutId="underline" />
              ) : null}
            </motion.li>
          ))}
        </ul>
      </nav>
      <AnimatePresence mode="wait">
        <motion.div
          key={selected.label}
          className="tab-content"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {selected.icon}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
