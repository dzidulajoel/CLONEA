import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { ArrowLeft02Icon, ArrowLeft05Icon, FilterVerticalIcon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'
import { ANIMATION } from '../../../constants/animation'
function History() {

    const navigate = useNavigate();
    return (
        <>

            <motion.div style={{ backgroundColor: COLORS.WHITE }} variants={ANIMATION.item} className='z-1000 flex justify-between items-center fixed top-0 left-0 right-0 w-full px-4 py-2' >
                <button onClick={() => navigate(-1)} variants={ANIMATION.item} className='flex justify-between items-center gap-2' >
                    <ArrowLeft02Icon stroke={3} size={30} color={COLORS.PURPLE} />
                </button>
                <motion.button className='w-10 h-10 rounded-full bg-white flex justify-center items-center '> <FilterVerticalIcon stroke={3} size={24} color={COLORS.GRAY} /></motion.button>
            </motion.div>

            <motion.div variants={ANIMATION.item} className='w-full flex flex-col justify-start items-start pt-16' >
                <h2 className='font-body text-lg' style={{ color: COLORS.PURPLE }}>Vos récentes créations</h2>
                <p className='font-body text-md' style={{ color: COLORS.GRAY }}></p>
            </motion.div>

            <motion.div variants={ANIMATION.item} className='grid grid-cols-2 gap-4 h-auto'>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
                <div className='bg-white w-43 h-50 rounded-lg'></div>
            </motion.div>

            <motion.div variants={ANIMATION.item} className='w-full pb-20 flex justify-end items-center'>
                <button className='w-full px-4 py-2 rounded-lg text-sm' style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }} >Voir plus</button>            
            </motion.div>
        </>
    )
}

export default History
