import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { ArrowLeft02Icon, ArrowLeft05Icon, ArrowRight01Icon, FilterVerticalIcon, HelpCircleIcon, Logout01Icon, Notification01Icon, Pen01Icon, Shield01Icon, StarIcon, Sun01Icon, UserIcon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'
import Card_settings from "../../components/Card_settings"
import Container_link_settings from "../../components/Container_link_settings"
function Settings() {

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
            <motion.div variants={container} initial="hidden" animate="visible" className=' h-screen'>

                <motion.div className='flex justify-between items-center' >
                    <button onClick={() => navigate(-1)} className='flex justify-between items-center gap-2' >
                        <ArrowLeft02Icon stroke={3} size={30} color={COLORS.PURPLE} />
                    </button>
                    <motion.button className='w-10 h-10 rounded-full bg-white flex justify-center items-center '> <Logout01Icon stroke={3} size={24} color={COLORS.RED} /></motion.button>
                </motion.div>

                <div className="flex-1 overflow-y-auto  scrollbar-hide rounded-sm w-full ">
                    { /* Lien to account */}
                    <motion.div className='space-y-4 mt-4 '>

                            <div className='flex justify-between items-center bg-white h-30 rounded-lg px-2' style={{backgroundColor:COLORS.PURPLE}}>
                                <div className='flex justify-center items-center h-auto space-x-2'>
                                    <div className='w-12 h-12 bg-black rounded-full'></div>
                                    <div className='flex flex-col justify-center'>
                                        <h2 className=" text-white font-body text-lg">Johnson Christelle</h2>
                                        <span className="text-white font-body">Bienvenue</span>
                                    </div>
                                </div>
                                <div>
                                    <Pen01Icon size={22} className='text-white' />
                                </div>

                        </div>

                        {/* Lien to General */}
                        <motion.div className='space-y-4'>
                            <motion.h2 className='font-body'>General</motion.h2>

                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={UserIcon} titre="Compte" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>
                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={Sun01Icon} titre="Theme" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>

                            <motion.h2 className="font-body">Alerte</motion.h2>
                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={Shield01Icon} titre="Securite" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>
                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={Notification01Icon} titre="Notification" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>

                            <motion.h2 className="font-body">Support</motion.h2>
                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={HelpCircleIcon} titre="Aide & support" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>
                            <motion.div  className='flex justify-between items-center bg-white h-12 rounded-lg px-2'>
                                <Container_link_settings icon={StarIcon} titre="Avis & Critiques" />
                                <ArrowRight01Icon size={22} className='text-gray-400' />
                            </motion.div>
                        </motion.div>
                    </motion.div>


                </div>

            </motion.div>
        </>
    )
}

export default Settings
