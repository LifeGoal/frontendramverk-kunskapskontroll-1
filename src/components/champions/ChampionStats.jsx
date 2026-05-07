import React from "react";

const statImages = {
    hp: "/stat-icons/hp.svg",
    mp: "/stat-icons/mp.svg",
    crit: "/stat-icons/crit.svg",
    armor: "/stat-icons/armor.svg",
    hpregen: "/stat-icons/hpregen.svg",
    mpregen: "/stat-icons/mpregen.svg",
    movespeed: "/stat-icons/movespeed.svg",
    hpperlevel: "/stat-icons/hpperlevel.svg",
    mpperlevel: "/stat-icons/mpperlevel.svg",
    spellblock: "/stat-icons/spellblock.svg",
    attackrange: "/stat-icons/attackrange.svg",
    attackspeed: "/stat-icons/attackspeed.svg",
    attackdamage: "/stat-icons/attackdamage.svg",
    critperlevel: "/stat-icons/critperlevel.svg",
    armorperlevel: "/stat-icons/armorperlevel.svg",
    hpregenperlevel: "/stat-icons/hpregenperlevel.svg",
    mpregenperlevel: "/stat-icons/mpregenperlevel.svg",
    spellblockperlevel: "/stat-icons/spellblockperlevel.svg",
    attackspeedperlevel: "/stat-icons/attackspeedperlevel.svg",
    attackdamageperlevel: "/stat-icons/attackdamageperlevel.svg"
};

const statLabels = {
    hp: "Health Points",
    mp: "Mana Points",
    crit: "Critical Strike Chance",
    armor: "Armor",
    hpregen: "Health Regeneration",
    mpregen: "Mana Regeneration",
    movespeed: "Movement Speed",
    hpperlevel: "Health Points per Level",
    mpperlevel: "Mana Points per Level",
    spellblock: "Magic Resist",
    attackrange: "Attack Range",
    attackspeed: "Attack Speed",
    attackdamage: "Attack Damage",
    critperlevel: "Critical Strike Chance per Level",
    armorperlevel: "Armor per Level",
    hpregenperlevel: "Health Regeneration per Level",
    mpregenperlevel: "Mana Regeneration per Level",
    spellblockperlevel: "Magic Resist per Level",
    attackspeedperlevel: "Attack Speed per Level",
    attackdamageperlevel: "Attack Damage per Level"
};

function ChampionStats({ stats }) {
    return (
        Object.entries(stats).map(([key, value]) => (
            <div key={key} className="flex flex-row items-center gap-4 bg-slate-900/60 rounded-xl py-2 px-4 shadow-lg border border-slate-700">
                <img src={statImages[key.toLowerCase()]} alt={key} loading="lazy" className="w-8 h-8 flex-shrink-0" />
                <span className="text-sm font-semibold text-amber-400 flex-1">{statLabels[key.toLowerCase()] || key.toUpperCase()}</span>
                <span className="text-sm text-slate-300 font-bold">{value}</span>
            </div>
        ))
    );
};

export default ChampionStats;