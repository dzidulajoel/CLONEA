import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { COLORS } from '../../../constants/color'
import { ANIMATION } from '../../../constants/animation'
import { ArrowLeft02Icon, ArrowLeft05Icon, Cancel01Icon, FilterVerticalIcon } from 'hugeicons-react'
import { Link, useNavigate } from 'react-router-dom'
import Affiche_card from '../../components/Affiche_card'
import CategoryCarousel from '../../components/CategoryCarousel'
function Templates() {

    const filterRef = useRef();
    const [showFilter, setShowFilter] = useState(false);
    const [activeCategory, setActiveCategory] = useState("Tout")
    const navigate = useNavigate();
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (filterRef.current && !filterRef.current.contains(e.target)) {
                setShowFilter(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

const categories = [
  { id: 1, label: "Tout" },
  { id: 2, label: "Événement" },
  { id: 3, label: "Concert" },
  { id: 4, label: "Soirée" },
  { id: 5, label: "Conférence" },
  { id: 6, label: "Formation" },
  { id: 7, label: "Business" },
  { id: 8, label: "Promotion" },
  { id: 9, label: "Vente" },
  { id: 10, label: "Restaurant" },
  { id: 11, label: "Sport" },
  { id: 12, label: "Religieux" },
  { id: 13, label: "Mariage" },
  { id: 14, label: "Anniversaire" },
  { id: 15, label: "Mode" },
  { id: 16, label: "Immobilier" },
  { id: 17, label: "Recrutement" },
  { id: 18, label: "Voyage" },
  { id: 19, label: "Éducation" },
  { id: 20, label: "Santé" }
];

    return (
        <>
            <div ref={filterRef} >
                <motion.div style={{ backgroundColor: COLORS.WHITE }} variants={ANIMATION.item} className='z-1000 flex justify-between items-center fixed top-0 left-0 right-0 w-full px-4 py-2' >
                    <button onClick={() => navigate(-1)} variants={ANIMATION.item} className='flex justify-between items-center gap-2' >
                        <ArrowLeft02Icon stroke={3} size={24} color={COLORS.PURPLE} />
                    </button>
                    <motion.button onClick={() => setShowFilter(!showFilter)} className='cursor-pointer w-10 h-10 rounded-full bg-white flex justify-center items-center'>
                        {
                            showFilter ? <Cancel01Icon stroke={3} size={20} color={COLORS.PURPLE} /> : <FilterVerticalIcon stroke={3} size={20} color={COLORS.GRAY} />
                        }
                    </motion.button>
                </motion.div>

                <motion.div style={{ backgroundColor: COLORS.WHITE }} variants={ANIMATION.item} className='w-full flex flex-col justify-start items-start pt-16'>
                    <h2 className='font-body text-lg font-bold' style={{ color: COLORS.BLACK }}>Parcourez et choisissez un template</h2>
                    <p className='font-body text-sm' style={{ color: COLORS.GRAY }}>Transforme n'importe quel visuel en une affiche personnalisée grâce à l'intelligence attificielle</p>
                </motion.div>

                <div className={` w-full space-y-2 h-auto transition-all duration-300 my-4 ${showFilter ? "max-h-20 w-full opacity-100 mt-4" : "max-h-0 opacity-0"} `}>
                    <div className='w-full flex justify-between items-center gap-4'>

                            <div className='w-full flex justify-start items-center gap-4'>
                                <div className='flex justify-start items-center gap-2' >
                                    <input className="bg-[#703ce4]" type="checkbox" name="gratuit" id="gratuit" className='ml-2' />
                                    <label className='font-body text-sm' htmlFor="gratuit">Gratuit</label>
                                </div>

                                <div className='flex justify-start items-center gap-2' >
                                    <input className="bg-[#703ce4]" type="checkbox" name="premium" id="premium" className='ml-2' />
                                    <label className='font-body text-sm' htmlFor="premium">Premium</label>
                                </div>
                            </div>

                            <button className='w-auto px-4 py-2 rounded-lg text-sm mx-auto' style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }} >Filtrer</button>

                    </div>
                    <div className='flex justify-start items-center'>
                        <CategoryCarousel activeCategory={activeCategory} setActiveCategory={setActiveCategory} categories={categories} />
                    </div>
                </div>

                <motion.div className={`h-auto space-y-5 pb-24`}>
                    <div className='grid grid-cols-1 gap-3'>
                        {data.map((item) => (
                            <div key={item} className="min-w-[160px] flex-shrink-0">
                                <Affiche_card />
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-end items-center '>
                        <button className='w-full px-4 py-2 rounded-lg text-sm' style={{ backgroundColor: COLORS.PURPLE, color: COLORS.WHITE }} >Voir plus</button>
                    </div>
                </motion.div>
            </div>




        </>
    )
}

export default Templates


