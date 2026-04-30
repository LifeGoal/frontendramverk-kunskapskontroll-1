function CharacterDetails({ character }) {
    return (
        <div>
            <img src={character.image} alt={character.name} className="rounded-lg mb-4" />
            <h1 className="text-2xl font-bold mb-2">{character.name}</h1>
            <p><strong>Status:</strong> {character.status}</p>
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
        </div>
    )
}

export default CharacterDetails