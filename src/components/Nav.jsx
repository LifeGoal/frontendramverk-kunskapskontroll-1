import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    const [isOpen, setIsOpen] = useState(false);
    const linkClass = ({ isActive }) => `p-2 rounded-md transition-colors ${isActive ? "text-white underline underline-offset-8" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`;

    return (
        <nav className="relative flex items-center py-3 px-6 sm:px-12 bg-neutral-950/60 backdrop-blur-md border-b border-white/5">
            <NavLink to="/" className="opacity-80 hover:opacity-100 transition-opacity z-10"><img src="./logo.webp" alt="Logo" className="h-10 w-auto" /></NavLink>

            <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-8">
                <li><NavLink to="/" end className={linkClass}>Home</NavLink></li>
                <li><NavLink to="/list" className={linkClass}>Champions List</NavLink></li>
                <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
            </ul>

            <button className="md:hidden ml-auto flex flex-col gap-1.5 p-2 z-10" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>

            {isOpen && (
                <ul className="md:hidden absolute top-full left-0 right-0 flex flex-col bg-neutral-950/95 backdrop-blur-md border-b border-white/5 px-6 py-4 gap-2">
                    <li><NavLink to="/" end className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink></li>
                    <li><NavLink to="/list" className={linkClass} onClick={() => setIsOpen(false)}>Champions List</NavLink></li>
                    <li><NavLink to="/contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact</NavLink></li>
                </ul>
            )}
        </nav>
    );
};

export default Nav;