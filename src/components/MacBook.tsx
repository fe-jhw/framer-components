import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import Browser from "./macBook/Browser"
import Footer from "./macBook/Footer"

export interface Program {
  icon: string
  label: string
}

const programs: Program[] = [
  { icon: "🍅", label: "Naver" },
  { icon: "🥬", label: "Kakao" },
  { icon: "🧀", label: "Coupang" },
  { icon: "🥕", label: "Line" },
  { icon: "🍌", label: "Toss" },
  { icon: "🫐", label: "Baemin" },
  { icon: "🥂", label: "Danggeun" },
]

export default function MacBook() {
  const [openPrograms, setOpenPrograms] = useState<Program[]>([])

  const closeBrowser = (program: Program): void => {
    setOpenPrograms(openPrograms.filter((e) => e.label !== program.label))
  }

  const openProgram = (program: Program): void => {
    if (openPrograms.find((e: Program) => e.label === program.label)) {
      return
    }
    setOpenPrograms([...openPrograms, program])
  }

  return (
    <>
      <AnimatePresence>
        {openPrograms.map((program) => (
          <Browser
            key={program.label}
            program={program}
            closeBrowser={closeBrowser}
          />
        ))}
      </AnimatePresence>
      <Footer
        openProgram={openProgram}
        programs={programs}
        openPrograms={openPrograms}
      />
    </>
  )
}
