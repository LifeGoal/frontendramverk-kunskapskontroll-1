import { useCallback } from 'react';
import { useFetchData } from '../hooks/useFetchData';
import { getAll } from '../api/dataApi'
import PageHeader from '../components/PageHeader';
import ChampionList from '../components/list/ChampionList';

function List() {
    const fetchFn = useCallback(() => getAll(), []);
    const { data: items, loading, error } = useFetchData(fetchFn, []);

    if (loading) return <PageHeader label="CHOOSE YOUR" title="CHAMPION" description="Loading data from API..." />
    if (error) return <p className="text-center text-red-500 mt-8">Error: {error}</p>;

    return (
        <PageHeader label="CHOOSE YOUR" title="CHAMPION" description="With more than 170 champions, you'll find the perfect match for your playstyle. Master one, or master them all.">
            <ChampionList champions={items} />
        </PageHeader>
    );
};

export default List;