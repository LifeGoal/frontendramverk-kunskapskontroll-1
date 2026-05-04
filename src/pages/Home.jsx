import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

const whatYouCanDoCards = [
    { title: 'BROWSE', desc: 'Explore the full roster of champions sorted from A to Z.' },
    { title: 'ABILITIES', desc: 'View all champions passive, Q, W, E and R with full descriptions.' },
    { title: 'SKINS', desc: 'Browse all available skins for every champion in a visual carousel (chromas excluded).' },
    { title: 'CHANGE', desc: 'Easily add, remove or change champions. Have there been an update? Now you can update the info yourself!' }
];

function Home() {
    return (
        <div className='flex flex-col'>
            <section className='relative flex flex-col items-center justify-center text-center px-6 py-24 sm:py-36 overflow-hidden bg-slate-950/60'>
                <p className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 text-lg font-semibold mb-4'>LEAGUE OF LIBRARIES</p>
                <h1 className='text-5xl sm:text-7xl font-extrabold text-white mb-6'>FIND YOUR <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600'>CHAMPION</span></h1>
                <p className='text-slate-400 max-w-md sm:text-lg mb-10'>Explore the full roster of champions, their abilities, skins, and stats from the game <strong>League of Legends</strong>.</p>
                <Link to="/list" className='flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-slate-900 font-bold px-6 py-3 rounded-lg transition-colors duration-200'>Browse Champions <ArrowLongRightIcon className='w-5 h-5' /></Link>
            </section>

            <section className='bg-slate-200 px-6 py-16 sm:py-24'>
                <div className='max-w-4xl mx-auto flex flex-col items-center gap-10'>
                    <h2 className='text-3xl sm:text-4xl font-extrabold italic text-slate-900 text-center'>WHAT IS THIS?</h2>
                    <p className='text-slate-600 text-lg text-center max-w-2xl'>This is a web application designed to provide comprehensive information about champions in League of Legends, but also allows users to contribute and update champion data.</p>
                </div>
            </section>


            <section className="bg-slate-50 px-6 py-16 sm:py-24">
                <div className="max-w-4xl mx-auto flex flex-col items-center gap-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold italic text-slate-900 text-center">WHAT YOU CAN DO</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        {whatYouCanDoCards.map(({ title, desc }) => (
                            <div key={title} className="flex flex-col gap-2 border border-slate-200 rounded-xl p-6">
                                <h3 className="text-xl font-bold italic text-slate-900">{title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;