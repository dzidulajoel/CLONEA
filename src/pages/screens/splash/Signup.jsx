import { AiScanIcon } from 'hugeicons-react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import GOOGLE from "../../../assets/icons/google.svg"
import FACEBOOK from "../../../assets/icons/facebook.svg"
import { Link } from 'react-router-dom'
function Signup() {

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
        <>
            <motion.div variants={container} initial="hidden" animate="visible" className='w-full h-full flex gap-6 flex-col justify-center items-center'>

                <motion.div className='flex justify-center items-center' variants={item}>
                    <AiScanIcon stroke={3} size={60} color={COLORS.PURPLE} />
                </motion.div>

                <motion.div className='flex flex-col justify-center items-center gap-1' variants={item}>
                    <motion.h1 variants={item} className='text-xl font-bold font-info' style={{ color: COLORS.PURPLE }}> Inscription</motion.h1>
                    <motion.p variants={item} className='text-md text-gray-600 font-info'>Bienvenue sur notre application</motion.p>
                </motion.div>

                <motion.div variants={item} className='w-[90%] flex flex-col gap-4 hidden'>
                    <input type="text" placeholder='Nom' className='w-full h-12 rounded-lg bg-white px-4' />
                    <input type="text" placeholder='Prenom' className='w-full h-12 rounded-lg bg-white px-4' />
                    <motion.div variants={item} className='w-full flex flex-col gap-2'>
                        <button className='mt-8 h-12 rounded-lg font-medium text-md font-body text-white' style={{ backgroundColor: COLORS.PURPLE }}>Suivant  </button>
                        <Link to="auth/signup" className='text-center text-gray-600 font-body'>Vous avez pas de compte ? <span className='underline' style={{ color: COLORS.PURPLE }}>Connectez-vous</span> </Link>
                    </motion.div>
                </motion.div>

                <motion.div variants={item} className='w-[90%] flex flex-col gap-4 hidden'>
                    <input type="email" placeholder='Email' className='w-full h-12 rounded-lg bg-white px-4' />
                    <input type="text" placeholder='Domaine' className='w-full h-12 rounded-lg bg-white px-4' />
                    <motion.div variants={item} className='w-full flex flex-col gap-2'>
                        <button className='mt-8 h-12 rounded-lg font-medium text-md font-body text-white' style={{ backgroundColor: COLORS.PURPLE }}>Suivant  </button>
                        <Link to="auth/signup" className='text-center text-gray-600 font-body'>Vous avez pas de compte ? <span className='underline' style={{ color: COLORS.PURPLE }}>Connectez-vous</span> </Link>
                    </motion.div>
                </motion.div>

                <motion.div variants={item} className='w-[90%] flex flex-col gap-4'>
                    <input type="password" placeholder='Mot de passe' className='w-full h-12 rounded-lg bg-white px-4' />
                    <input type="password" placeholder='Confirmation mot de passe' className='w-full h-12 rounded-lg bg-white px-4' />
                    <ul className='w-full flex flex-col gap1/2' >
                        <li className='font-body text-sm text-gray-400'>Minimun 8 carateres</li>
                        <li className='font-body text-sm text-gray-400'>Majuscule - miniscule [ A-Z / a-z ]</li>
                        <li className='font-body text-sm text-gray-400'>chiffre - carateres speciaux [ 0 -9 / !#$%&@]</li>
                    </ul>
                    <motion.div variants={item} className='w-full flex flex-col gap-2'>
                        <button className='mt-8 h-12 rounded-lg font-medium text-md font-body text-white' style={{ backgroundColor: COLORS.PURPLE }}>S'inscrire  </button>
                        <Link to="auth/signup" className='text-center text-gray-600 font-body'>Vous avez pas de compte ? <span className='underline' style={{ color: COLORS.PURPLE }}>Connectez-vous</span> </Link>
                    </motion.div>
                </motion.div>
                <motion.div variants={item} className='w-[90%] flex justify-center items-center gap-8 mt-8'>
                    <button className='w-14 h-14 rounded-lg bg-white flex justify-center items-center'><img className='w-8' src={GOOGLE} alt="google" /></button>
                    <button className='w-14 h-14 rounded-lg bg-white flex justify-center items-center'><img className='w-8 text-blue-500' src={FACEBOOK} alt="facebook" /></button>
                </motion.div>
            </motion.div>
        </>
    )
}

export default Signup
