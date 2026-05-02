function ChampionAbilities({ abilities }) {
    const spells = abilities.abilities || [];
    const passive = abilities.passive ? abilities.passive : [];

    return (
        <div className="flex flex-col px-4 mt-6">
            <h2 className="text-3xl font-bold mb-6 italic">ABILITIES</h2>

            <div className="mb-6 bg-slate-900/60 rounded-xl p-4 shadow-lg border border-slate-700">
                <div className="flex gap-4 items-start">
                    <img src={passive.image} alt={passive.name} loading="lazy" className="w-16 h-16 rounded-md border border-slate-600"/>

                    <div>
                        <h3 className="text-lg font-semibold"><span className="text-slate-400 mr-2">PASSIVE</span>{passive.name}</h3>
                        <p className="text-slate-300 text-sm mt-1 leading-relaxed">{passive.description}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spells.map((spell, index) => (
                    <div key={index} className="bg-slate-900/60 rounded-xl p-4 shadow-lg border border-slate-700 hover:border-amber-500 transition">
                        <div className="flex gap-4 items-start">
                            <img src={spell.image} alt={spell.name} loading="lazy" className="w-16 h-16 rounded-md border border-slate-600"/>

                            <div className="flex flex-col">
                                <h3 className="text-lg font-semibold"><span className="text-amber-400 mr-2">{spell.key}</span>{spell.name}</h3>
                                <p className="text-slate-300 text-sm mt-1 leading-relaxed">{spell.description}</p>
                                {spell.cooldown && (<p className="text-xs text-slate-400 mt-2">Cooldown: {spell.cooldown.join(" / ")}s</p>)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChampionAbilities;