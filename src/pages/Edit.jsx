import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ChampionForm from '../components/admin/ChampionForm';
import { getById, update } from '../api/dataApi';

function Edit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [champion, setChampion] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		getById(id)
			.then(data => setChampion(data))
			.catch(err => setError(err.message))
			.finally(() => setLoading(false));
	}, [id]);

	const handleSubmit = async (championData) => {
		try {
			await update(id, championData);
			navigate('/admin');
		} catch (err) {
			setError(err.message);
		}
	};

	if (loading) {
		return (
			<div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
				<p className="text-center text-black text-sm sm:text-base lg:text-lg">ADMIN PAGE</p>
				<h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">EDIT A CHAMPION</h1>
				<p className="text-center text-black">Loading champion data...</p>
			</div>
		);
	}

	if (error) {
		return <p className="text-center text-red-500 mt-8">Error: {error}</p>;
	}

	return (
		<div className='flex flex-col items-center gap-4 bg-white p-4 sm:p-8 lg:p-16'>
			<p className="text-center text-black text-sm sm:text-base lg:text-lg">ADMIN PAGE</p>
			<h1 className="text-3xl sm:text-5xl lg:text-6xl text-slate-900 italic font-extrabold">EDIT A CHAMPION</h1>
            <p className="text-center text-black">Fill in the details below to update the champion</p>
			<ChampionForm initialValues={champion} onSubmit={handleSubmit} submitLabel="Update Champion" />
		</div>
	);
}

export default Edit;
