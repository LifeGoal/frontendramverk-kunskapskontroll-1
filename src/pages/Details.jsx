import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../api/dataApi';
import ChampionDetails from '../components/champions/ChampionDetails';
import { ArrowLongLeftIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Details() {
    const [champion, setChampion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getById(id)
            .then(data => setChampion(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center text-white mt-8">Loading...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
    if (!champion) return (
        <section className="flex flex-col items-center">
            <div className="flex flex-col items-stretch justify-center text-white w-full py-4">
                <button onClick={() => navigate(-1)} className="flex justify-center items-center w-max h-max px-2 py-2 rounded-lg hover:bg-slate-800 hover:text-slate-400 transition-colors duration-300">
                    <ArrowLongLeftIcon className="w-4 h-4 inline mr-2" />
                    Back
                </button>
                <p className="text-center text-red-500 mt-8">The champion could not be found. This might be due to a typo in the URL or the champion may have been removed.</p>
            </div>
        </section>
    );

    return (
        <section className="flex flex-col items-center">
            <ChampionDetails champion={champion} />
        </section>
    )
};

export default Details;