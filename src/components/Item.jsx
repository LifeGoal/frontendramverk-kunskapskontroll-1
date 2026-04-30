import { Link } from 'react-router-dom';

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
        <li className="flex items-center p-2 border rounded-lg">
            <img src={character.image} alt={character.name} width={50} />
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
            <span>– {character.status} {character.species}</span>
        </li>
    );
}

export default Item;