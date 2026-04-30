import { Link } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

// Note to self: This is what the API returns for each character. Use this for reference.
// {
//     "id": 1,
//     "name": "Rick Sanchez",
//     "status": "Alive",       // "Alive", "Dead", "unknown"
//     "species": "Human",
//     "gender": "Male",
//     "origin": { "name": "Earth (C-137)" },
//     "location": { "name": "Citadel of Ricks" },
//     "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg"
// }

function Item({ character }) {
    return (
        <Link to={`/characters/${character.id}`} className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-slate-800 transition-colors">
            <img src={character.image} className='rounded-lg' alt={character.name} />
            <div className='flex items-center w-full justify-center gap-2'>
                <span className={`px-2 py-1 rounded-lg text-xs font-bold ${character.status === 'Alive' ? 'bg-green-500 text-white' : character.status === 'Dead' ? 'bg-red-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {character.status === 'unknown' ? 'Unknown' : character.status}
                </span>
                <h2 className="text-lg font-bold truncate">{character.name}</h2>
            </div>
            <div className="flex items-center w-full justify-center gap-2">
                <ExclamationCircleIcon className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-400">{character.origin.name === 'unknown' ? 'Unknown' : character.origin.name}</span>
            </div>
        </Link>
    );
}

export default Item;