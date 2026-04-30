import React from 'react'

function Home() {
    return (
        <div className="flex bg-slate-900 text-gray-800 items-center justify-center min-h-screen">
            <section className="flex flex-col min-h-screen w-[70%] text-white p-8">
                <h1 className="text-3xl font-bold">Välkommen till hemskärmen!</h1>
                <p className="mt-2 text-lg">Detta är en enkel app byggd med React och Axios.</p>
            </section>
        </div>
    )
}

export default Home