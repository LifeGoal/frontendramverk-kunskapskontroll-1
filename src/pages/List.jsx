import { useEffect, useState } from 'react'
import { getAll } from '../api/dataApi'
import ItemList from '../components/list/ItemList';

function List() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        setLoading(true);
        getAll()
            .then(data => setItems(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className='flex flex-col items-center gap-4'>
            <h1 className="text-3xl font-bold">Champions List</h1>
            <div className='flex flex-col items-center gap-4 mt-8'>
                <p className="text-center text-white">Loading data from API...</p>
            </div>
        </div>
    );
    if (error) return <p className="text-center text-red-500 mt-8">Fel: {error}</p>;

    return (
        <div className='flex flex-col items-center gap-4'>
            <h1 className="text-3xl font-bold">Champions List</h1>
            <p className="text-center text-gray-400">Press on any champion card to see their details.</p>
            <ItemList champions={items} />
        </div>
    )
}

export default List