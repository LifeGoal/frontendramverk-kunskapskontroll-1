import { Link } from 'react-router-dom';

const roleColors = {
    Assassin: 'bg-red-600',
    Fighter: 'bg-blue-600',
    Mage: 'bg-purple-600',
    Marksman: 'bg-green-600',
    Support: 'bg-yellow-600',
    Tank: 'bg-gray-600'
};

function Item({ champion }) {
    return (
        <Link to={`/list/${champion.id}`} className="flex flex-col items-center gap-2 p-4 border border-slate-600 rounded-lg bg-slate-800/50 hover:bg-slate-600 transition-colors">
            <img src={champion.image} className='rounded-lg' alt={champion.name} />
            <div className='flex flex-col items-center w-full justify-center'>
                <div className="w-full flex justify-center">
                    <h2 className="text-lg font-bold truncate">{champion.name}</h2>
                    <p className="text-xs text-gray-400 ml-2">#{champion.key}</p>
                </div>
                <p className="text-sm text-gray-400">{champion.title}</p>
            </div>
            {champion.tags && champion.tags.length > 0 && (
                <div className="flex gap-1">
                    {champion.tags.map((tag, index) => (
                        <span key={index} className={`${roleColors[tag] || 'bg-gray-600'} text-xs rounded-lg px-2 py-1 rounded text-center`}>• {tag}</span>
                    ))}
                </div>
            )}
            <p className="text-sm text-gray-300 mt-1">{champion.skins.length} skin combinations.</p>
        </Link>
    );
}

export default Item