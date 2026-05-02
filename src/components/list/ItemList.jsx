import Item from './Item';

function ItemList({ champions }) {
    return (
        <ul className="grid grid-cols-5 gap-8 mt-4 w-full">
            {champions.sort((a, b) => a.name.localeCompare(b.name, "sv")).map(champion => (
                <Item key={champion.id} champion={champion} />
            ))}
        </ul>
    );
}

export default ItemList;