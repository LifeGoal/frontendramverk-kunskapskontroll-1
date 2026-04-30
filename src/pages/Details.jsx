import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getById } from '../api/dataApi';
import CharacterDetails from '../components/CharacterDetails';

function Details() {
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getById(id)
            .then(data => setCharacter(data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <p className="text-center text-white mt-8">Laddar...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">Fel: {error}</p>;

    return (
        <div className="flex bg-slate-900 text-gray-800 items-center justify-center min-h-screen">
            <section className="flex flex-col min-h-screen w-[70%] text-white p-8">
                <button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-slate-700 rounded hover:bg-slate-600">Tillbaka</button>
                <CharacterDetails character={character} />
            </section>
        </div>
    )
}

export default Details;