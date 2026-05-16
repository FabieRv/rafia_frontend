"use client";

import { motion } from "framer-motion";
import { cartButtonVariants } from "./animation";

interface AddToCartButtonProps {
    onClick?: () => void;
    delay?: number;
}

export default function AddToCartButton({ onClick, delay = 0 }: AddToCartButtonProps) {
    return (
        <motion.button
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200"
            variants={cartButtonVariants}
            whileHover="hover"
            whileTap="tap"
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.5 }}
            viewport={{ once: true }}
            transition={{ delay, type: "spring", stiffness: 300, damping: 15 }}
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
            </svg>
        </motion.button>
    );
}