import Item from './Item';

function ItemList({ characters }) {
    return (
        <ul className="grid grid-cols-4 gap-4 mt-4 w-full">
            {characters.map(character => (
                <Item key={character.id} character={character} />
            ))}
        </ul>
    );
}

export default ItemList;