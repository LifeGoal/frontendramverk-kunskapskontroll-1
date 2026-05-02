import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="relative flex items-center py-3 px-12 bg-neutral-950/60 backdrop-blur-md border-b border-white/5">
            <NavLink to="/" className="opacity-80 hover:opacity-100 transition-opacity"><img src="./logo.webp" alt="Logo" className="h-10 w-auto" /></NavLink>

            <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8">
                <li><NavLink to="/" end className={({ isActive }) => `p-2 rounded-md transition-colors ${isActive ? "text-white underline underline-offset-8" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>Home</NavLink></li>
                <li><NavLink to="/list" className={({ isActive }) => `p-2 rounded-md transition-colors ${isActive ? "text-white underline underline-offset-8" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>Champions List</NavLink></li>
                <li><NavLink to="/contact" className={({ isActive }) => `p-2 rounded-md transition-colors ${isActive ? "text-white underline underline-offset-8" : "text-neutral-400 hover:text-white hover:bg-neutral-800"}`}>Contact</NavLink></li>
            </ul>

            {/* This is maybe for the future to implement a profile section with admin capabilities. I might not have time for that until friday, so I'll leave it for now. */}
            <div className="ml-auto" />
        </nav>
    )
}

export default Nav