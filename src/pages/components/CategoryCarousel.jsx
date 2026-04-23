import { useRef, useState } from 'react'
import { motion } from 'framer-motion'



export default function CategoryCarousel({ activeCategory, setActiveCategory, categories }) {
        const constraintsRef = useRef(null)
        const [isDragging, setIsDragging] = useState(false)
        

        return (
                <div className="mt-2 overflow-hidden" ref={constraintsRef}>
                        <motion.div
                                className="flex gap-3 cursor-grab active:cursor-grabbing"
                                drag="x"
                                dragConstraints={constraintsRef}
                                dragElastic={0.1}
                                dragMomentum={true}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={() => setTimeout(() => setIsDragging(false), 50)}
                                style={{ width: 'max-content', paddingBottom: '4px' }}
                        >
                                {categories.map((category) => {
                                        const isActive = activeCategory === category.label
                                        return (
                                                <motion.button
                                                        key={category.id}
                                                        onClick={() => { if (!isDragging) setActiveCategory(category.label) }}
                                                        whileTap={{ scale: 0.95 }}
                                                        className={`font-body px-5 py-2 rounded-lg text-sm whitespace-nowrap transition-all cursor-pointer select-none ${isActive ? "bg-[#703ce4] text-white" : "bg-[#FFFFFF] text-gray-600"
                                                                }`}
                                                >
                                                        {category.label}
                                                </motion.button>
                                        )
                                })}
                        </motion.div>
                </div>
        )
}