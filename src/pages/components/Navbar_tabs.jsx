"use client"

import { useState } from "react"
import * as motion from "motion/react-client"
import { AiScanIcon, Folder01Icon, Home01Icon, Search01Icon, Settings01Icon } from "hugeicons-react"
import { COLORS } from "../../constants/color"


/* ✅ 1️⃣ Déclare items ici */
const items = [
        { name: "Accueil", icon: Home01Icon },
        { name: "Template", icon: Search01Icon },
        { name: "", icon: AiScanIcon },
        { name: "Historique", icon: Folder01Icon },
        { name: "Parametre", icon: Settings01Icon },
]

export default function Navbar_tabs() {
        /* ✅ 2️⃣ State ici */
        const [activeIndex, setActiveIndex] = useState(0)

        return (
                <div className="bg-white w-full flex fixed bottom-0 left-0">
                        {items.map((item, index) => {
                                const Icon = item.icon
                                const active = activeIndex === index

                                return (
                                        <motion.div key={index} onClick={() => setActiveIndex(index)} className="relative flex flex-col items-center justify-center flex-1 p-4 cursor-pointer" initial={false}>
                                                <item.icon className={`transition-colors duration-300 ${active ? "blue" : "text-gray-400"}`} size={22} color={COLORS.PURPLE} />
                                                <span className={`text-xs mt-1 transition-colors duration-300 `} style={{color : active ? COLORS.PURPLE : COLORS.GRAY}}> {item.name}</span>

                                                {active && (<motion.div layoutId="underline" className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 bg-blue rounded-full" transition={{ type: "spring", stiffness: 500, damping: 35, }} />)}
                                        </motion.div>
                                )
                        })}
                </div>
        )
}