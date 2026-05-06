import api from './axiosConfig';

export const getAll = async () => {
    try {
        const response = await api.get('/champions');
        return response.data;
    } catch (error) {
        throw new Error('Could not fetch champions. Error: ' + error.message);
    }
};

export const getById = async (id) => {
    try {
        const response = await api.get(`/champions?select=*&id=eq.${id}&limit=1`);
        return response.data[0];
    } catch (error) {
        throw new Error('Could not fetch champion. Error: ' + error.message);
    }
};

export const create = async (data) => {
    try {
        const response = await api.post('/champions', data, {
            headers: {
                Prefer: 'return=representation',
            },
        });

        return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
        const status = error?.response?.status;

        if (status === 409) {
            throw new Error('A champion with this name already exists. Please use a different name.');
        }

        const apiMessage = error?.response?.data?.message || error?.response?.data?.details;
        throw new Error(`Could not create champion. Error: ${apiMessage || error.message}`);
    }
};

export const update = async (id, data) => {
    try {
        const response = await api.patch(`/champions?id=eq.${id}`, data, {
            headers: {
                Prefer: 'return=representation',
            },
        });

        return Array.isArray(response.data) ? response.data[0] : response.data;
    } catch (error) {
        throw new Error('Could not update champion. Error: ' + error.message);
    }
};

export const deleteChampion = async (id) => {
    try {
        await api.delete(`/champions?id=eq.${id}`);
        console.log(`Deleted champion with id: ${id}`);
        return true;
    } catch (error) {
        console.error('Error deleting champion:', error.message);
        return false;
    }
};