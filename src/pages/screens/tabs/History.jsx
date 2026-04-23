import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { ArrowLeft02Icon, ArrowLeft05Icon, FilterVerticalIcon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'
function History() {

    const container = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    }

    const navigate = useNavigate();
    return (
        <>
            <motion.div variants={container} initial="hidden" animate="visible" className='space-y-6'>

                <motion.div variants={item} className='flex justify-between items-center' >
                    <button onClick={() => navigate(-1)} variants={item} className='flex justify-between items-center gap-2' >
                        <ArrowLeft02Icon stroke={3} size={30} color={COLORS.PURPLE} />
                    </button>
                    <motion.button className='w-10 h-10 rounded-full bg-white flex justify-center items-center '> <FilterVerticalIcon stroke={3} size={24} color={COLORS.GRAY} /></motion.button>
                </motion.div>

                <motion.div variants={item} className='flex flex-col justify-start items-start' >
                    <h2 className='font-body text-lg' style={{ color: COLORS.PURPLE }}>Vos récentes créations</h2>
                    <p className='font-body text-md' style={{ color: COLORS.GRAY }}></p>
                </motion.div>

                <motion.div variants={item} className='grid grid-cols-2 gap-4 h-auto'>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                    <div className='bg-white w-43 h-50 rounded-lg'></div>
                </motion.div>

                <motion.div variants={item} className='w-full pb-20 flex justify-end items-center'>
                    <button className='cursor-pointer bg-[#703ce4] hover:bg-[#00080e] w-auto px-4 py-3 rounded-lg font-body text-white'>Chargez plus</button>
                </motion.div>

            </motion.div>
        </>
    )
}

export default History
