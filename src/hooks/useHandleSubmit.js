import { useState } from 'react';

export const useHandleSubmit = (submitFn, onSuccess) => {
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        try {
            await submitFn(data);
            onSuccess();
        } catch (err) {
            setError(err.message);
        }
    };

    return { handleSubmit, error, setError };
};