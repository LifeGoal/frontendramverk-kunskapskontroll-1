import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-900 text-gray-400 p-4 border-t border-slate-700">
            <div className="container mx-auto">
                <p>&copy; <Link to="https://github.com/LifeGoal" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Viktor Lindqvist</Link>. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer