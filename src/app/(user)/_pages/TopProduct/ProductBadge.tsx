"use client";

import { motion } from "framer-motion";
import { badgeVariants } from "./animation";

interface ProductBadgeProps {
    text: string;
    color: string;
}

export default function ProductBadge({ text, color }: ProductBadgeProps) {
    return (
        <motion.div className="absolute top-4 left-4 z-10" variants={badgeVariants}>
            <span className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full shadow-md`}>
                {text}
            </span>
        </motion.div>
    );
}