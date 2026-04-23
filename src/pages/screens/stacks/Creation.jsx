import React, { useState } from 'react'
import { COLORS } from '../../../constants/color'
import { ANIMATION } from '../../../constants/animation'
import { motion, AnimatePresence } from 'framer-motion'
import AFFICHE from '../../../assets/images/af.webp'
import { Cancel01Icon, Mic02Icon } from 'hugeicons-react'
function Creation() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className='w-full h-full pb-8 overflow-y-auto no-scrollbar' >

                <motion.div style={{ backgroundColor: COLORS.WHITE }} variants={ANIMATION.item} className='w-full flex flex-col justify-start items-start pt-16'>
                    <h2 className='font-body text-lg font-bold' style={{ color: COLORS.BLACK }}>Personnalise ton affiche grâce à l'IA</h2>
                    <p className='font-body text-sm' style={{ color: COLORS.GRAY }}>Modifie les informations et adapte ce design à ton besoin.</p>
                </motion.div>

                <motion.div variants={ANIMATION.item} className='mt-4'>
                    <img src={AFFICHE} alt="Affiche" className='w-full h-full object-cover' />
                </motion.div>

                <motion.div variants={ANIMATION.item} className='mt-4'>

                    {
                        open ?
                            <div className='relative mt-12'>
                                <button onClick={() => setOpen(!open)} className='absolute top-[-40px] right-0 w-10 h-8 rounded-md bg-[#9CA3AF] flex justify-center items-center'>
                                    <Cancel01Icon stroke={3} size={20} color={COLORS.WHITE} />
                                </button>
                                <p className='font-body text-sm' style={{ color: COLORS.GRAY }}>Ici, tu pourras personnaliser ton affiche en modifiant les informations et en adaptant le design à tes besoins. N'hésite pas à explorer les différentes options pour créer une affiche qui te ressemble !</p>
                            </div> :
                            <button onClick={() => setOpen(!open)} className='w-full px-4 py-2 h-10 cursor-pointer rounded-md text-sm transition-all duration-300 hover:bg-black text-white bg-[#703ce4]'>Personnaliser</button>
                    }

                </motion.div>

                <AnimatePresence>
                    {open && (
                        <>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-4  rounded-lg relative">
                                <h2 className='font-body text-md font-bold' style={{ color: COLORS.PURPLE }}> Décris ce que tu veux créer</h2>
                                <textarea value={prompt} placeholder="Ex: affiche concert afro, fond sombre, DJ, 12 juin..." className="w-full h-34 p-3 bg-white rounded-md border-none outline-none resize-none text-sm"/>
                                <button className='absolute right-3 bottom-18 bg-[#703ce4] hover:bg-black text-white p-2 rounded-md'><Mic02Icon stroke={3} size={20} color={COLORS.WHITE} /></button>
                                <button className="w-full mt-3 h-10 rounded-md text-sm text-white bg-[#703ce4] hover:bg-black transition-all duration-300"> Analyser</button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </div>

        </>
    )
}

export default Creation
