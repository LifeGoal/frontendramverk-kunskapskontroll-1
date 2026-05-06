import SegmentedProgress from "../util/progressbar";
import ChampionAbilities from "./ChampionAbilities";
import ChampionStats from "./ChampionStats";
import { useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import SkinCarousel from "../util/slider";

function ChampionDetails({ champion }) {
    const difficultyLabels = {
        0: "Beginner",
        1: "Beginner",
        2: "Easy",
        3: "Easy",
        4: "Intermediate",
        5: "Intermediate",
        6: "Advanced",
        7: "Advanced",
        8: "Expert",
        9: "Expert",
        10: "Mastery Required"
    };

    const roleColors = {
        Assassin: 'bg-red-600',
        Fighter: 'bg-blue-600',
        Mage: 'bg-purple-600',
        Marksman: 'bg-green-600',
        Support: 'bg-yellow-600',
        Tank: 'bg-gray-600'
    };

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-stretch justify-center text-white w-full py-4">
            <button onClick={() => navigate(-1)} className="flex justify-center items-center w-max h-max px-2 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-400 transition-colors duration-300">
                <ArrowLongLeftIcon className="w-4 h-4 inline mr-2" />
                Back
            </button>
            <div className="relative w-full">
                <img src={champion.skins[0].splash} alt={champion.name} loading="lazy" className="w-full h-auto rounded-t-lg mt-4 brightness-50" />
                <div className="absolute inset-0 flex flex-col p-4 w-1/2 left-20 gap-4 justify-center items-start">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">{champion.title.toUpperCase()}</h2>
                    <h1 className="text-7xl italic font-bold">{champion.name.toUpperCase()}</h1>
                    <p>{champion.blurb}</p>
                    <SegmentedProgress value={Math.round(champion.info.difficulty * 10)} message={`DIFFICULTY: ${difficultyLabels[Math.round(champion.info.difficulty)].toUpperCase()}`} />
                    <div className="flex flex-col gap-2">
                        <p className="text-md font-semibold">ROLES</p>
                        <div className="flex gap-2">
                            {champion.tags.map((tag, index) => (
                                <span key={index} className={`${roleColors[tag] || 'bg-gray-600'} text-xs rounded-lg font-semibold px-2 py-1 rounded text-center`}>• {tag.toUpperCase()}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col bg-slate-950">
                <ChampionAbilities abilities={champion.spells} />
            </div>

            <div className="flex flex-col bg-slate-950">
                <div className="flex justify-between items-center px-4 py-8">
                    <h3 className="text-3xl font-bold italic">{champion.name.toUpperCase()}'S SKINS</h3>
                    <p className="text-sm italic text-gray-400">A TOTAL OF <strong className="text-white">{champion.skins.length}</strong> SKINS AVAILABLE</p>
                </div>
                <SkinCarousel skinsData={champion.skins} />
            </div>

            <div className="flex flex-col bg-slate-950 px-4 py-8 gap-6 rounded-b-lg">
                <h3 className="text-3xl font-bold italic">Stats</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <ChampionStats stats={champion.stats} />
                </div>

                <p className="text-sm italic text-gray-400">* Stats are based on base values and do not include scaling or items.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(champion.info).map(([key, value]) => (
                        <SegmentedProgress key={key} value={Math.round(value * 10)} message={`${key.toUpperCase()}`} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default ChampionDetails;