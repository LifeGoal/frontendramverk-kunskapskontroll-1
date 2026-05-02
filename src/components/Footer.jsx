import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer>
            <div className="mx-auto text-center bg-neutral-900/60 text-neutral-400 p-4 border-t border-neutral-800">
                <p>&copy; <Link to="https://github.com/LifeGoal" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300">Viktor Lindqvist</Link>. All rights reserved.</p>
                <p>Data sourced from <Link to="https://developer.riotgames.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300">Riot Games API</Link> and put in my own API/database on <Link to="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-300">Supabase</Link>.</p>
            </div>
            <div className="bg-neutral-950/60 p-6">
                <div className="flex justify-center flex flex-col gap-4 text-center w-1/3 mx-auto">
                    <img src="./logo.webp" alt="Logo" className="h-10 w-auto mx-auto"/>
                    <p className='text-neutral-400 text-xs'>™ & © 2026 Riot Games, Inc. League of Legends and all related logos, characters, names and distinctive likenesses thereof are exclusive property of Riot Games, Inc. This website is not endorsed by Riot Games, Inc. This is just for educational purposes.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer