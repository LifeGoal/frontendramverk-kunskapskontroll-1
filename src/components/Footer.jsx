import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="border-t border-white/5">
            <div className="bg-neutral-950/80 text-center text-neutral-500 text-sm py-4 px-4">
                <p>&copy; <Link to="https://github.com/LifeGoal" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 hover:underline transition-colors">Viktor Lindqvist</Link>. All rights reserved.</p>
                <p className="mt-1">Data sourced from the <Link to="https://developer.riotgames.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 hover:underline transition-colors">Riot Games API</Link>, stored via <Link to="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300 hover:underline transition-colors">Supabase</Link>.</p>
            </div>
            <div className="bg-neutral-950/60 py-8">
                <div className="flex flex-col items-center gap-4 text-center w-full max-w-md mx-auto px-4">
                    <img src="./logo.webp" alt="Logo" className="h-10 w-auto opacity-80" />
                    <p className="text-neutral-500 text-xs leading-relaxed">League of Legends characters, names, and all related assets are the property of Riot Games, Inc. This site is not affiliated with or endorsed by Riot Games. All content is used for educational purposes only.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer