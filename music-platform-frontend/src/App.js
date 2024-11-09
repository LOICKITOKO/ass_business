import React, { useEffect, useState } from 'react';
import './App.css';  // Importer le fichier CSS pour styliser l'application
import { fetchAlbums } from './services/api';  // Import de la fonction pour récupérer les albums

function App() {
  const [albums, setAlbums] = useState([]);  // État pour stocker les albums récupérés
  const [loading, setLoading] = useState(true);  // État pour afficher un message de chargement
  const [error, setError] = useState(null);  // État pour gérer les erreurs
  const [menuOpen, setMenuOpen] = useState(false);  // État pour gérer l'ouverture/fermeture du menu
  const [searchQuery, setSearchQuery] = useState('');  // État pour stocker la requête de recherche

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

  // Fonction pour basculer l'état du menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Gestion de la recherche d'albums en fonction de la requête
  const filteredAlbums = albums.filter(album =>
    album.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          id="searchInput"
          placeholder="Recherchez..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setSearchQuery('')}>Rechercher</button>
      </div>

      {/* Bouton Menu Burger */}
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776; {/* Trois barres horizontales */}
      </div>

      {/* Menu Latéral */}
      <div className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>Accueil</li>
          <li>Chansons</li>
          <li>Top Music</li>
          <li>À la Une</li>
          <li>Playlist</li>
          <li>Artistes</li>
          <li>Genres</li>
          <li>Albums</li>
          <li>Paramètres</li>
        </ul>
      </div>

      {/* Affichage des albums filtrés par la recherche */}
      <div className={`album-list ${menuOpen ? 'shift' : ''}`}>
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map(album => (
            <div key={album.id} className="album-card">
              <img src={album.cover_image || 'default_cover.jpg'} alt={album.title} />
              <h3>{album.title}</h3>
              <p>By: {album.artist ? album.artist.name : 'Unknown Artist'}</p>
              <div className="album-songs-count">
                <span>Nombre de chansons : {album.songs ? album.songs.length : 0}</span>
              </div>
              <div className="album-purchases">
                <span>Achats : {album.purchases ? album.purchases : 0}</span>
              </div>
              <div className="buttons">
                <button className="listen-button">Écouter</button>
                <button className="buy-button">Acheter</button>
              </div>
              <div className="song-list">
                {Array.from({ length: album.songs_count }).map((_, index) => (
                  <div key={index} className="song-column">
                    <p>Chanson {index + 1}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>Aucun album trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default App;
