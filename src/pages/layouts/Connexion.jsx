import React from 'react'
import { COLORS } from '../../constants/color'
import { Outlet } from 'react-router-dom'

function Connexion() {
    return (
        <>
            <section className='w-full h-screen' style={{backgroundColor:COLORS.WHITE}}>
                <Outlet/>
            </section>
        </>
    )
}

export default Connexion
