import { Variants } from "framer-motion";

export const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
        },
    },
};

export const headerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};

export const quoteVariants: Variants = {
    hidden: { opacity: 0, scale: 0, rotate: -30 },
    visible: {
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: "spring", stiffness: 200, damping: 15, delay: 0.2 },
    },
};

export const avatarVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20, delay: 0.3 },
    },
};

export const decorLineVariants: Variants = {
    hidden: { width: 0 },
    visible: {
        width: 80,
        transition: { duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
};