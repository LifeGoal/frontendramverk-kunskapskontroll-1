import Item from './Item';

function ItemList({ characters }) {
    return (
        <ul className="grid grid-cols-5 gap-8 mt-4 w-full">
            {characters.map(character => (
                <Item key={character.id} character={character} />
            ))}
        </ul>
    );
}

export default ItemList;