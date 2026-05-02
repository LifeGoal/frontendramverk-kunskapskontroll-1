import api from './axiosConfig';

export const getAll = async () => {
    try {
        const response = await api.get('/champions');
        return response.data;
    } catch (error) {
        throw new Error('Kunde inte hämta karaktärer. Error: ' + error.message);
    }
};

export const getById = async (id) => {
    try {
        const response = await api.get(`/champions?select=*&id=eq.${id}&limit=1`);
        return response.data[0];
    } catch (error) {
        throw new Error('Kunde inte hämta karaktär. Error: ' + error.message);
    }
};

export const create = async (data) => {
    return { ...data, id: Date.now(), image: '' };
};

export const update = async (id, data) => {
    return { ...data, id };
};

export const deleteChampion = async (id) => {
    return id;
};