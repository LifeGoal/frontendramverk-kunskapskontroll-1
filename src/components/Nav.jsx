import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <nav className="flex flex-col items-center justify-between p-4 bg-slate-900 text-white border-b border-slate-700">
            <ul className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <Link to="/"><li className="p-2 rounded-xl hover:bg-slate-800">Home</li></Link>
                <Link to="/list"><li className="p-2 rounded-xl hover:bg-slate-800">Character List</li></Link>
                <Link to="/contact"><li className="p-2 rounded-xl hover:bg-slate-800">Contact</li></Link>
            </ul>
        </nav>
    )
}

export default Nav