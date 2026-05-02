import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="relative flex items-center py-4 px-12 bg-neutral-950/60 border-b border-neutral-800">
            <Link to="/"><img src="./logo.webp" alt="Logo" className="h-14 w-auto"/></Link>
            <ul className="absolute left-1/2 -translate-x-1/2 flex gap-8">
                <Link to="/"><li className="p-2 rounded-xl hover:bg-neutral-800">Home</li></Link>
                <Link to="/list"><li className="p-2 rounded-xl hover:bg-neutral-800">Champions List</li></Link>
                <Link to="/contact"><li className="p-2 rounded-xl hover:bg-neutral-800">Contact</li></Link>
            </ul>
        </nav>
    )
}

export default Nav