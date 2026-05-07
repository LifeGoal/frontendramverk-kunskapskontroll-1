import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom'
import { useFetchData } from '../hooks/useFetchData';
import { getAll } from '../api/dataApi'
import PageHeader from '../components/PageHeader';
import AdminChampionList from '../components/admin/AdminChampionList';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function AdminList() {
    const fetchFn = useCallback(() => getAll(), []);
    const { data: items, loading, error } = useFetchData(fetchFn, []);
    const navigate = useNavigate();

    if (loading) return <PageHeader label="ADMIN PAGE" title="EDIT CHAMPIONS" description="Loading data from API..." />
    if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

    return (
        <PageHeader label="ADMIN PAGE" title="EDIT CHAMPIONS">
            <button className="flex flex-row items-center bg-slate-800 hover:bg-slate-950 text-white font-semibold px-5 py-3 rounded-lg transition duration-200 mt-4" onClick={() => navigate('/create')}>
                <PlusCircleIcon className="w-5 h-5 inline mr-2" />
                Create a champion
            </button>
            <AdminChampionList champions={items} />
        </PageHeader>
    );
};

export default AdminList;