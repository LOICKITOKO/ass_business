import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8001/',  // URL de ton backend Django
});

export const getAlbums = async () => {
  try {
    const response = await api.get('/api/albums/');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des albums', error);
    return [];
  }
};
