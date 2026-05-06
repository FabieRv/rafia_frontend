"use client"

import Container from "../common/Container"
import Logo from "./Logo"

export default function FooterGlow() {
  return (
    <footer className="relative z-10 mt-8 w-full overflow-hidden pt-16 pb-8">
      <div className="pointer-events-none absolute top-0 left-1/2 z-0  -translate-x-1/2 select-none">
        <div className="absolute -top-32 left-1/4 h-72 w-72 rounded-full bg-[#499f68] blur-3xl"></div>
        <div className="absolute right-1/4 -bottom-24 h-80 w-80 rounded-full bg-[#499f68] blur-3xl"></div>
      </div>
      <Container className="py-0!">
        <div className="  mx-auto flex  flex-col items-center gap-8 rounded-2xl px-6 py-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="mb-4 flex items-center gap-2">
              <Logo></Logo>
            </a>
            <p className="text-foreground mb-6 max-w-xs text-center text-sm md:text-left">
              Mvpblocks provides a set of reusable components and utilities to
              help you create beautiful and responsive user interfaces quickly
              and efficiently.
            </p>
            <div className="mt-2 flex gap-3 text-rose-400">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-foreground transition"
              ></a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-foreground transition"
              ></a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:text-foreground transition"
              ></a>
            </div>
          </div>
          <nav className="flex w-full flex-col gap-9 text-center md:w-auto md:flex-row md:justify-end md:text-left">
            <div>
              <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
                Product
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-foreground/70">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Integrations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Updates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
                Company
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-foreground/70">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="mb-3 text-xs font-semibold tracking-widest text-rose-400 uppercase">
                Resources
              </div>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-foreground/70">
                    Docs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Community
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-foreground/70">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </Container>
      <div className="text-foreground relative z-10 mt-10 text-center text-xs">
        <span>&copy; 2025 Mvpblocks. All rights reserved.</span>
      </div>
    </footer>
  )
}
