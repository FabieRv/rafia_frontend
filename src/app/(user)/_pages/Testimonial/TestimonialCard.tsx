"use client";

import { motion } from "framer-motion";
import { cardVariants, avatarVariants } from "./animations";
import QuoteIcon from "./QuoteIcon";

interface TestimonialCardProps {
    name: string;
    role: string;
    avatar: string;
    quote: string;
    rating: number;
    index: number;
}

export default function TestimonialCard({
    name,
    role,
    avatar,
    quote,
    rating,
    index,
}: TestimonialCardProps) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -6 }}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-500 overflow-hidden p-8"
        >
            <QuoteIcon />

            <div className="relative z-10 flex gap-1 mb-5">
                {[1, 2, 3, 4, 5].map((s) => (
                    <motion.svg
                        key={s}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-5 h-5 ${s <= rating ? "text-amber-400" : "text-gray-200"}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                            delay: 0.4 + index * 0.1 + s * 0.04,
                            type: "spring",
                            stiffness: 300,
                        }}
                    >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </motion.svg>
                ))}
            </div>

            <motion.p
                className="relative z-10 text-gray-600 leading-relaxed text-base mb-6"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
                &ldquo;{quote}&rdquo;
            </motion.p>

            <div className="relative z-10 flex items-center gap-4">
                <motion.div
                    className="relative"
                    variants={avatarVariants}
                >
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-indigo-100 ring-offset-2">
                        <img
                            src={avatar}
                            alt={name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white" />
                </motion.div>

                <div>
                    <h4 className="font-title text-gray-900 font-semibold text-sm">
                        {name}
                    </h4>
                    <p className="text-gray-400 text-xs mt-0.5">{role}</p>
                </div>
            </div>
            
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-indigo-50 to-transparent rounded-tl-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
    );
}