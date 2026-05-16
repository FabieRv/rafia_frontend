"use client";

import { motion } from "framer-motion";
import { itemVariants } from "./animations";
import SocialIcons from "./SocialIcons";
import Logo from "@/components/ui/Logo";

export default function FooterBrand() {
    return (
        <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
            <a href="#" className="mb-4 flex items-center gap-2">
                <Logo />
            </a>
            <p className="text-white/50 max-w-xs text-center text-sm leading-relaxed md:text-left mb-6">
                Mvpblocks provides a set of reusable components and utilities to
                help you create beautiful and responsive user interfaces quickly
                and efficiently.
            </p>
            <SocialIcons />
        </motion.div>
    );
}