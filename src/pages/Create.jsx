import { useNavigate } from 'react-router-dom';
import { useHandleSubmit } from '../hooks/useHandleSubmit';
import PageHeader from '../components/PageHeader';
import ChampionForm from '../components/admin/ChampionForm';
import { create } from '../api/dataApi';

function Create() {
    const navigate = useNavigate();
    const { handleSubmit, error } = useHandleSubmit(create, () => navigate('/admin'));

    return (
        <PageHeader label="ADMIN PAGE" title="CREATE A CHAMPION" description="Fill in the details below to create a new champion">
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <ChampionForm onSubmit={handleSubmit} submitLabel="Create Champion" />
        </PageHeader>
    );
};

export default Create;