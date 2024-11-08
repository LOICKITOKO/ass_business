import React, { useEffect, useState } from 'react';
import './App.css';  // Importer le fichier CSS pour styliser l'application

import { fetchAlbums } from './services/api';  // Import de la fonction pour récupérer les albums

function App() {
  const [albums, setAlbums] = useState([]);  // État pour stocker les albums récupérés
  const [loading, setLoading] = useState(true);  // État pour afficher un message de chargement
  const [error, setError] = useState(null);  // État pour gérer les erreurs

  // Utilisation de useEffect pour récupérer les albums une fois que le composant est monté
  useEffect(() => {
    fetchAlbums()
      .then(data => {
        setAlbums(data);  // Mettre à jour l'état avec les albums récupérés
        setLoading(false);  // Mettre à jour l'état pour indiquer que le chargement est terminé
      })
      .catch(err => {
        setError(`Erreur : ${err.message}`);  // Gérer les erreurs
        setLoading(false);  // Mettre à jour l'état pour indiquer que le chargement est terminé
      });
  }, []);

  // Si l'API est en cours de chargement
  if (loading) {
    return <p>Chargement des albums...</p>;
  }

  // Si une erreur survient
  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <h1>AS-BUSINESS</h1>
      <h2>Albums</h2>

      {/* Affichage des albums récupérés */}
      {albums.length > 0 ? (
        <div className="album-list">
          {albums.map(album => (
            <div key={album.id} className="album-card">
              {/* Affichage de la couverture de l'album */}
              <img src={album.cover_image || 'default_cover.jpg'} alt={album.title} />

              <h3>{album.title}</h3>
              <p>By: {album.artist ? album.artist.name : 'Unknown Artist'}</p>
              <p>{album.songs_count} Songs</p>
              <p>{album.purchase_count} Purchases</p>

              {/* Boutons "Écouter" et "Acheter" */}
              <div className="buttons">
                <button className="listen-button">Écouter</button>
                <button className="buy-button">Acheter</button>
              </div>

              {/* Affichage des petites colonnes représentant les chansons */}
              <div className="song-list">
                {Array.from({ length: album.songs_count }).map((_, index) => (
                  <div key={index} className="song-column">
                    <p>Chanson {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun album trouvé.</p>
      )}
    </div>
  );
}

export default App;
