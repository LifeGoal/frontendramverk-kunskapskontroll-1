import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../api/dataApi';
import ChampionDetails from '../components/champions/ChampionDetails';

function Details() {
    const [champion, setChampion] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    useEffect(() => {
        getById(id)
            .then(data => setChampion(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center text-white mt-8">Laddar...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">Fel: {error}</p>;

    return (
        <section className="flex flex-col items-center">
            <ChampionDetails champion={champion} />
        </section>
    )
};

export default Details;