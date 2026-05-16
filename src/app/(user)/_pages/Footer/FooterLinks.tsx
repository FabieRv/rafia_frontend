"use client";

import { motion } from "framer-motion";
import { itemVariants, linkVariants } from "./animations";

interface LinkGroup {
    title: string;
    links: { label: string; href: string }[];
}

const linkGroups: LinkGroup[] = [
    {
        title: "Produit",
        links: [
            { label: "Fonctionnalités", href: "#" },
            { label: "Tarifs", href: "#" },
            { label: "Intégrations", href: "#" },
            { label: "Mises à jour", href: "#" },
        ],
    },
    {
        title: "Entreprise",
        links: [
            { label: "À propos", href: "#" },
            { label: "Carrières", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Contact", href: "#" },
        ],
    },
    {
        title: "Ressources",
        links: [
            { label: "Documentation", href: "#" },
            { label: "Communauté", href: "#" },
            { label: "Support", href: "#" },
            { label: "Sécurité", href: "#" },
        ],
    },
];

export default function FooterLinks() {
    return (
        <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
            {linkGroups.map((group, groupIdx) => (
                <motion.div key={group.title} variants={itemVariants}>
                    <div className="mb-4 text-xs font-semibold tracking-widest text-secondary uppercase">
                        {group.title}
                    </div>
                    <ul className="space-y-3">
                        {group.links.map((link, linkIdx) => (
                            <li key={linkIdx}>
                                <motion.a
                                    href={link.href}
                                    className="text-white/40 text-sm hover:text-white transition-colors duration-300 inline-flex items-center gap-1"
                                    variants={linkVariants}
                                    whileHover="hover"
                                    initial="rest"
                                >
                                    <span>{link.label}</span>
                                </motion.a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            ))}
        </nav>
    );
}