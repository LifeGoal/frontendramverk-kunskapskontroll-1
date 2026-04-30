import { useEffect, useState } from 'react'
import { getAll } from '../api/dataApi'
import ItemList from '../components/ItemList.jsx';

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

    if (loading) return <p className="text-center text-white mt-8">Laddar...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">Fel: {error}</p>;

    return (
        <div className="flex bg-slate-900 text-gray-800 items-center justify-center min-h-screen">
            <section className="flex flex-col min-h-screen w-[70%] text-white p-8">
                <h1 className="text-3xl font-bold">Character List</h1>
                <ItemList characters={items} />
            </section>
        </div>
    )
}

export default List