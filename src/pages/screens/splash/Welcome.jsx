import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { AiScanIcon } from 'hugeicons-react'
import { Link } from 'react-router-dom'

function Welcome() {

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
                duration: 0.3,
                ease: [0.25, 1, 0.5, 1]
            }
        }
    }


    return (
        <div className='w-full h-screen flex items-center justify-center' style={{ backgroundColor: COLORS.PURPLE }}>

            <motion.div variants={container} initial="hidden" animate="visible" className='flex flex-col justify-end items-center gap-2 pt-70'>

                <motion.div variants={item}>
                    <AiScanIcon stroke={3} size={60} color={COLORS.WHITE} />
                </motion.div>

                <motion.h1 variants={item} className='text-3xl font-bold font-info' style={{ color: COLORS.WHITE }}> CLONEA</motion.h1>

                <motion.div className="mt-8 w-[90%]">
                    <motion.h1 variants={item} className='text-2xl text-center font-info font-bold uppercase' style={{ color: COLORS.WHITE }}> Réinventez vos visuels avec l'IA</motion.h1>
                    <motion.p variants={item} className='text-md mt-2 text-center font-body text-white/70'>Transformez n'importe quel design en un visuel unique avec vos propres infos, instantanément grâce à l'IA.</motion.p>
                </motion.div>

                <motion.div variants={item} className='w-90 mt-6 flex flex-col gap-2'>
                    <button className='bg-white h-12 rounded-lg font-medium text-lg font-body' style={{ color: COLORS.BLACK }}>Commencer maintenant</button>
                    <Link to="auth/login" className='font-medium text-md text-center font-body' style={{ color: COLORS.WHITE }}>Vous avez déjà un compte ? <span className='underline' style={{color:COLORS.GREEN}}>Connectez-vous</span> </Link>
                </motion.div>

            </motion.div>
        </div>
    )
}

export default Welcome
