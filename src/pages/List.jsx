import { useEffect, useState } from 'react'
import { getAll } from '../api/dataApi'
import ChampionList from '../components/list/ChampionList';

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
        <div className='flex flex-col items-center gap-4 bg-white p-16'>
            <p className="text-center text-black text-lg">CHOOSE YOUR</p>
            <h1 className="text-6xl text-slate-900 italic font-extrabold">CHAMPION</h1>
            <p className="text-center text-black">Loading data from API...</p>
        </div>
    );

    if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

    return (
        <div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
            <p className="text-center text-black text-sm sm:text-base lg:text-lg">CHOOSE YOUR</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">CHAMPION</h1>
            <p className="text-center text-black text-sm sm:text-base max-w-xl">With more than 170 champions, you'll find the perfect match for your playstyle. Master one, or master them all.</p>
            <ChampionList champions={items} />
        </div>
    )
};

export default List;