import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChampionForm from '../components/admin/ChampionForm';
import { create } from '../api/dataApi';

function Create() {
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (championData) => {
        try {
            await create(championData);
            navigate('/admin');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
            <p className="text-center text-black text-sm sm:text-base lg:text-lg">ADMIN PAGE</p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">CREATE A CHAMPION</h1>
            <p className="text-center text-black">Fill in the details below to create a new champion</p>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <ChampionForm onSubmit={handleSubmit} submitLabel="Create Champion" />
        </div>
    )
};

export default Create;