import { useState, useEffect } from 'react';

export const useFetchData = (fetchFn, initialValue = null) => {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetchFn()
            .then(result => setData(result))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [fetchFn]);

    return { data, loading, error };
};