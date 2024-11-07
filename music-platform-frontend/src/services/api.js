import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/',  // Assure-toi que l'URL correspond à ton backend Django
});

export const getAlbums = async () => {
  try {
    const response = await api.get('/api/albums/');
    console.log(response.data);  // Afficher les données dans la console pour vérifier
    return response.data;
  } catch (error) {
    console.error('Error fetching albums', error);
    return [];  // Retourner un tableau vide en cas d'erreur
  }
};
