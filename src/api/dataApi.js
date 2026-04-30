import api from './axiosConfig';

export const getAll = async () => {
    try {
        const response = await api.get('/character');
        return response.data.results;
    } catch (error) {
        throw new Error('Kunde inte hämta karaktärer: ' + error.message);
    }
};

export const getById = async (id) => {
    try {
        const response = await api.get(`/character/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Kunde inte hämta karaktär: ' + error.message);
    }
};

export const create = async (data) => {
    return { ...data, id: Date.now(), image: '' };
};

export const update = async (id, data) => {
    return { ...data, id };
};

export const deleteCharacter = async (id) => {
    return id;
};