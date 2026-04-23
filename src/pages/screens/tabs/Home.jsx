import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { ANIMATION } from '../../../constants/animation'
import { AiScanIcon, FileImportIcon, Notification01Icon, Pen01Icon } from 'hugeicons-react'

import { Link } from 'react-router-dom'
import Affiche_card from '../../components/Affiche_card'

function Home() {



        const trackRef = useRef();
        const containerRef = useRef();
        const [dragWidth, setDragWidth] = useState(0);

        useEffect(() => {
                const scrollWidth = trackRef.current.scrollWidth;
                const offsetWidth = containerRef.current.offsetWidth;
                setDragWidth(scrollWidth - offsetWidth);
        }, []);

        const data = [1, 2, 3, 4, 5];

        return (
                <>

                        <motion.div style={{ backgroundColor: COLORS.WHITE }} className='flex justify-between items-center fixed top-0 left-0 right-0 w-full px-4 py-2' >
                                <motion.div variants={ANIMATION.item} className='flex justify-between items-center gap-2' >
                                        <AiScanIcon stroke={3} size={30} color={COLORS.PURPLE} />
                                        <h2 className='font-body text-lg' style={{ color: COLORS.PURPLE }}>Clonea</h2>
                                </motion.div>
                                <motion.button variants={ANIMATION.item} className='w-10 h-10 rounded-full bg-white flex justify-center items-center '> <Notification01Icon stroke={3} size={20} color={COLORS.GRAY} /></motion.button>
                        </motion.div>

                        <motion.div variants={ANIMATION.item} className='flex flex-col justify-start gap-3 items-start pt-16' >
                                <h2 className='font-body text-2xl font-bold' style={{ color: COLORS.PURPLE }}>Creé des affiches en quelques secondes</h2>
                                <p className='font-body text-sm' style={{ color: COLORS.GRAY }}>Transforme n'importe quel visuel en une affiche personnalisée grâce à l'intelligence attificielke</p>
                        </motion.div>

                        <motion.div variants={ANIMATION.item} className='space-y-2'>
                                <div variants={ANIMATION.item} className='mt-4 rounded-lg h-10' style={{ backgroundColor: COLORS.BLACK }} >
                                        <div className=' rounded-tl-lg rounded-bl-lg h-full w-[70%]' style={{ backgroundColor: COLORS.PURPLE }} ></div>
                                </div>
                                <div>
                                        <h2 className='font-body text-md font-bold' style={{ color: COLORS.BLACK }}>Il te reste 3 générations gratuires</h2>
                                        <p className='font-body text-md' style={{ color: COLORS.GRAY }}>Continuer sans limite avec l'abonnement <span className='underline' style={{ color: COLORS.PURPLE }}  >Clonea</span></p>
                                </div>
                        </motion.div>

                        <motion.div for="files" variants={ANIMATION.item} className='space-y-2 bg-white w-full shd h-40 rounded-lg'>
                                <label htmlFor="files" className='w-full h-full flex flex-col justify-center items-center gap-4 cursor-pointer'>
                                        <FileImportIcon stroke={3} size={30} color={COLORS.PURPLE} />
                                        <span className='font-body text-md' style={{ color: COLORS.GRAY }} >Importer une affiche </span>
                                </label>
                                <input type="file" name="" id="files" className='hidden' />
                        </motion.div>

                        <motion.div variants={ANIMATION.item} className='space-y-2'>
                                <div className='flex justify-between items-center '>
                                        <h2 className='font-body text-md font-bold' style={{ color: COLORS.BLACK }}>Créations récentes</h2>
                                        <Link to="" className='font-body text-sm underline' style={{ color: COLORS.GRAY }}>Voir plus</Link>
                                </div>
                                <div ref={containerRef} className="overflow-hidden w-full pb-20">
                                        <motion.div ref={trackRef} className="flex gap-3" drag="x" dragConstraints={{ left: -dragWidth, right: 0 }}>
                                                {data.map((item) => (
                                                        <div key={item} className="min-w-[150px] flex-shrink-0">
                                                                <Affiche_card />
                                                        </div>
                                                ))}
                                        </motion.div>
                                </div>
                        </motion.div>

                </>
        )
}

export default Home
