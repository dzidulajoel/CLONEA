import React from 'react'
import { COLORS } from '../../constants/color'
import { ANIMATION } from '../../constants/animation'
import { Outlet } from 'react-router-dom'
import Navbar_tabs from '../components/Navbar_tabs'
import { motion, AnimatePresence } from 'framer-motion'

function Tabs() {
    return (
        <>
            <section className='w-full h-full px-4 relative' style={{ backgroundColor: COLORS.WHITE }}>
            <motion.div variants={ANIMATION.container} initial="hidden" animate="visible" className='space-y-4 h-full relative '>
                <Outlet /> 
            </motion.div>
                <div>
                    <Navbar_tabs/>
                </div>
            </section>
        </>
    )
}

export default Tabs
