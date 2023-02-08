import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"

const items = [0, 1, 2, 3]

const NOTHING_OPEN = -1

export default function Accordion() {
  const [openItem, setOpenItem] = useState<number>(NOTHING_OPEN)

  const handleClick = (item: number): void => {
    if (openItem === item) setOpenItem(NOTHING_OPEN)
    else setOpenItem(item)
  }

  return (
    <AnimatePresence>
      {items.map((item) => (
        <Item
          item={item}
          open={item === openItem}
          onClick={() => handleClick(item)}
        />
      ))}
    </AnimatePresence>
  )
}

function ItemHead() {
  return <motion.div />
}

function ItemBody() {}

function Item({
  item,
  open,
  onClick,
}: {
  item: number
  open: boolean
  onClick: () => void
}) {
  return <motion.div onClick={onClick} />
}
