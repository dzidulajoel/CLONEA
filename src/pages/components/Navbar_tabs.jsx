"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {COLORS} from "../../constants/color"

import {
    Home01Icon,
    Search01Icon,
    AiScanIcon,
    Folder01Icon,
    Settings01Icon
} from "hugeicons-react";

const items = [
    { name: "Accueil", icon: Home01Icon, link: "/clonea/app" },
    { name: "Template", icon: Search01Icon, link: "/clonea/app/templates" },
    { name: "", icon: AiScanIcon, link: "/clonea/scan" },
    { name: "Historique", icon: Folder01Icon, link: "/clonea/app/history" },
    { name: "Parametre", icon: Settings01Icon, link: "/clonea/app/settings" },
];

export default function Navbar_tabs() {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeIndex, setActiveIndex] = useState(0);

    // 🔥 Sync active tab avec URL
    useEffect(() => {
        const index = items.findIndex(item =>
            location.pathname.startsWith(item.link)
        );

        if (index !== -1) {
            setActiveIndex(index);
        }
    }, [location.pathname]);

    const handleClick = (item, index) => {
        setActiveIndex(index);
        navigate(item.link);
    };

    return (
        <div className="bg-white w-full flex fixed bottom-0 left-0 z-50">

            {items.map((item, index) => {
                const Icon = item.icon;
                const active = activeIndex === index;

                return (
                    <motion.div
                        key={index}
                        onClick={() => handleClick(item, index)}
                        className="relative flex flex-col items-center justify-center flex-1 p-4 cursor-pointer"
                        initial={false}
                    >
                        <Icon
                            size={22}
                            color={active ? COLORS.PURPLE : COLORS.GRAY}
                        />

                        {item.name !== "" && (
                            <span
                                className="text-xs mt-1 transition-colors duration-300"
                                style={{
                                    color: active ? COLORS.PURPLE : COLORS.GRAY
                                }}
                            >
                                {item.name}
                            </span>
                        )}

                        {active && (
                            <motion.div
                                layoutId="underline"
                                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full"
                                style={{ backgroundColor: COLORS.PURPLE }}
                                transition={{
                                    type: "spring",
                                    stiffness: 500,
                                    damping: 35,
                                }}
                            />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}