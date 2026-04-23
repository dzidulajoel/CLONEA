import React from 'react'
import { COLORS } from '../../constants/color'
import { ANIMATION } from '../../constants/animation'
import { Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft02Icon } from 'hugeicons-react'

function Stack() {
    const navigate = useNavigate();
    return (
        <>
            <section className='w-full h-screen px-4 relative' style={{ backgroundColor: COLORS.WHITE }}>
                <motion.div variants={ANIMATION.container} initial="hidden" animate="visible" className='space-y-4 h-full relative '>
                    <motion.div style={{ backgroundColor: COLORS.WHITE }} variants={ANIMATION.item} className='z-1000 flex justify-between items-center fixed top-0 left-0 right-0 w-full px-4 py-2' >
                        <button onClick={() => navigate(-1)} variants={ANIMATION.item} className='flex justify-between items-center gap-2' >
                            <ArrowLeft02Icon stroke={3} size={24} color={COLORS.PURPLE} />
                        </button>
                    </motion.div>
                    <Outlet />
                </motion.div>
            </section>
        </>
    )
}

export default Stack
