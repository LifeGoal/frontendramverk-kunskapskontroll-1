import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAll } from '../api/dataApi'
import AdminChampionList from '../components/admin/AdminChampionList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function AdminList() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        getAll()
            .then(data => setItems(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return (
        <div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
            <p className="text-center text-black text-lg">ADMIN PAGE</p>
            <h1 className="text-6xl text-slate-900 italic font-extrabold">EDIT CHAMPIONS</h1>
            <p className="text-center text-black">Loading data from API...</p>
        </div>
    );

    if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

    return (
        <div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
            <p className="text-center text-black text-sm sm:text-base lg:text-lg">ADMIN PAGE</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">EDIT CHAMPIONS</h1>
            <button className="flex flex-row items-center bg-slate-800 hover:bg-slate-950 text-white font-semibold px-5 py-3 rounded-lg transition duration-200 mt-4" onClick={() => navigate('/create')}>
                <PlusCircleIcon className="w-5 h-5 inline mr-2" />
                Create a champion
            </button>
            <AdminChampionList champions={items} />
        </div>
    )
};

export default AdminList;