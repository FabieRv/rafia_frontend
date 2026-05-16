"use client";

import { motion } from "framer-motion";
import { itemVariants } from "./animations";

const legalLinks = [
    { label: "Confidentialité", href: "#" },
    { label: "Conditions", href: "#" },
    { label: "Cookies", href: "#" },
];

export default function FooterBottom() {
    return (
        <motion.div
            variants={itemVariants}
            className="relative z-10 mt-12 pt-8 border-t border-white/10"
        >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-white/30 text-xs">
                    &copy; {new Date().getFullYear()} Mvpblocks. Tous droits réservés.
                </span>
                <div className="flex items-center gap-6">
                    {legalLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-white/30 text-xs hover:text-white/60 transition-colors duration-300"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}