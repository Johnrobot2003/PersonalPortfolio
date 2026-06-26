'use client';

import { useState } from "react";

const links = [

  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact",  href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState();

  return (
    <nav className="bg-[#1a1a1a] border-b border-white/10 px-6 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between h-14">

        
        <a href="#" className="text-[15px] font-bold text-white tracking-tight">
          Johnro
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-7">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className="relative text-sm text-white/60 hover:text-white transition-colors
                           after:absolute after:bottom-0 after:left-0 after:h-px after:w-0
                           after:bg-white after:transition-all hover:after:w-full"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Animated burger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          className="md:hidden flex flex-col gap-[5px] items-end p-1"
        >
          <span
            className={`block h-px bg-white transition-all duration-300 ease-in-out
                        ${isOpen ? "w-5 translate-y-[6.5px] rotate-45" : "w-5"}`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ease-in-out
                        ${isOpen ? "w-5 opacity-0 scale-x-0" : "w-3"}`}
          />
          <span
            className={`block h-px bg-white transition-all duration-300 ease-in-out
                        ${isOpen ? "w-5 -translate-y-[6.5px] -rotate-45" : "w-5"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out max-w-5xl mx-auto
                    ${isOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <ul className="border-t border-white/10 py-1">
          {links.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                onClick={() => setIsOpen(false)}
                className="block text-sm text-white/60 hover:text-white hover:pl-2
                           transition-all py-3 border-b border-white/5 last:border-none"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}