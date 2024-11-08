import axios from 'axios';

// URL de votre API (peut-être mieux dans une variable d'environnement)
const API_URL = 'http://localhost:8001/api/albums/';

// Fonction pour récupérer les albums depuis l'API
export const fetchAlbums = async () => {
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Content-Type': 'application/json',  // Assurez-vous que les données sont en JSON
                'Accept': 'application/json'         // On accepte du JSON dans la réponse
            }
        });

        // Vérifier que les données sont présentes dans la réponse
        if (response && response.data) {
            return response.data;  // Retourner les albums
        } else {
            throw new Error('Données non valides reçues');
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des albums : ", error);
        // Lancer une erreur afin de pouvoir la capturer dans le frontend
        throw new Error('Erreur de connexion avec l\'API');
    }
};
