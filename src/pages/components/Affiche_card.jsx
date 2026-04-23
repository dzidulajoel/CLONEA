import React from 'react'
import { COLORS } from '../../constants/color'
import { ANIMATION } from '../../constants/animation'
import { Diamond02Icon, Pen01Icon } from 'hugeicons-react'
import { motion, AnimatePresence } from 'framer-motion'
import affiche from "../../assets/images/af.webp"

function Affiche_card() {
  return (
    <motion.div variants={ANIMATION.item} className='overflow-hidden h-auto w-full  relative '>
      <img src={affiche} className='h-60 w-40 object-contain' alt="affiche" />
      <span className='w-10 h-6 rounded-md absolute left-2 top-2 font-body text-sm flex justify-center items-center' style={{ backgroundColor: COLORS.GREEN }}>Pro</span>
    </motion.div>
  )
}

export default Affiche_card
