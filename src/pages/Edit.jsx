import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useFetchData';
import { useHandleSubmit } from '../hooks/useHandleSubmit';
import PageHeader from '../components/PageHeader';
import ChampionForm from '../components/admin/ChampionForm';
import { getById, update } from '../api/dataApi';

function Edit() {
	const { id } = useParams();
	const navigate = useNavigate();
	const fetchFn = useCallback(() => getById(id), [id]);
	const { data: champion, loading, error: fetchError } = useFetchData(fetchFn);
	const { handleSubmit, error } = useHandleSubmit((data) => update(id, data), () => navigate('/admin'));

	if (loading) return <PageHeader label="ADMIN PAGE" title="EDIT A CHAMPION" description="Loading champion data..." />;
	if (fetchError) return <p className="text-center text-red-500 mt-8">Error: {fetchError}</p>;

	return (
		<PageHeader label="ADMIN PAGE" title="EDIT A CHAMPION" description="Fill in the details below to update the champion">
			{error && <p className="text-red-600 text-sm">{error}</p>}
			<ChampionForm initialValues={champion} onSubmit={handleSubmit} submitLabel="Update Champion" />
		</PageHeader>
	);
};

export default Edit;
