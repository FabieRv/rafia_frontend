import { Variants } from "framer-motion";

export const footerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6, staggerChildren: 0.12 },
    },
};

export const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const linkVariants: Variants = {
    rest: { x: 0 },
    hover: { x: 4, transition: { duration: 0.2 } },
};

export const socialVariants: Variants = {
    rest: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: -5, transition: { type: "spring", stiffness: 400, damping: 15 } },
    tap: { scale: 0.9 },
};

export const glowVariants: Variants = {
    animate: {
        scale: [1, 1.15, 1],
        opacity: [0.3, 0.5, 0.3],
        transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
    },
};