import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrashIcon, PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { deleteChampion } from '../../api/dataApi';

function AdminChampionList({ champions: initialChampions }) {
    const [items, setItems] = useState(initialChampions);
    const [notification, setNotification] = useState(null);
    const navigate = useNavigate();

    const deleteHandler = async (id) => {
        try {
            const response = await deleteChampion(id);
            if (response) {
                setItems(items.filter(item => item.id !== id));
                setNotification({ icon: <CheckCircleIcon className="w-5 h-5 inline mr-2" />, message: 'Champion "' + id + '" deleted.', type: 'success' });
            } else {
                setNotification({ icon: <CheckCircleIcon className="w-5 h-5 inline mr-2" />, message: 'Could not delete champion...', type: 'error' });
            }
        } catch (err) {
            setNotification({ icon: <CheckCircleIcon className="w-5 h-5 inline mr-2" />, message: 'Error occurred while deleting champion.', type: 'error' });
        }

        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <>
            {notification && (
                <div className={`fixed top-4 right-4 z-50 flex items-center gap-2 max-w-[calc(100vw-2rem)] sm:max-w-sm px-4 py-3 rounded ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white shadow-lg`}>
                    {notification.icon}{notification.message}
                </div>
            )}

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-8">
                {items.sort((a, b) => a.name.localeCompare(b.name, "sv")).map(champion => (
                    <div key={champion.id} className="flex flex-row items-center gap-4 bg-slate-800 rounded-xl py-2 px-4 border border-slate-700">
                        <img src={champion.image} alt={champion.name} loading="lazy" className="w-14 h-14 rounded-full self-start flex-shrink-0" />
                        <h1 className="text-sm sm:text-base lg:text-xl italic font-bold truncate">{champion.name.toUpperCase()}</h1>
                        <div className="flex flex-row gap-2 ml-auto">
                            <button className="bg-amber-500 hover:bg-amber-600 text-white p-2 rounded-full transition duration-200" onClick={() => navigate(`/edit/${champion.id}`)}><PencilSquareIcon className="w-5 h-5" /></button>
                            <button className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition duration-200" onClick={() => deleteHandler(champion.id)}><TrashIcon className="w-5 h-5" /></button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default AdminChampionList;