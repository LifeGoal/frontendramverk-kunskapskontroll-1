import { Link } from 'react-router-dom';
import { ArrowLongRightIcon } from '@heroicons/react/24/outline';

// const roleColors = {
//     Assassin: 'bg-red-600',
//     Fighter: 'bg-blue-600',
//     Mage: 'bg-purple-600',
//     Marksman: 'bg-green-600',
//     Support: 'bg-yellow-600',
//     Tank: 'bg-gray-600'
// };

function Champion({ champion }) {
    return (
        <Link to={`/list/${champion.id}`} className="relative flex flex-col items-center rounded-t-lg bg-slate-700/50 hover:bg-slate-600/60 transition-all group">
            <div className="relative overflow-hidden rounded-t-lg">
                <img src={champion.skins[0].splash} className='h-96 w-auto object-cover transition-all duration-300 group-hover:brightness-50 group-hover:scale-110' alt={champion.name} />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-semibold">VIEW DETAILS</p>
                    <ArrowLongRightIcon className="w-5 h-5 text-white ml-2" />
                </div>
            </div>
            <div className="h-14 w-full flex items-center p-4 bg-slate-950/80">
                <h2 className="text-xl font-bold italic truncate">{champion.name.toUpperCase()}</h2>
            </div>
        </Link>
    );
};

export default Champion;