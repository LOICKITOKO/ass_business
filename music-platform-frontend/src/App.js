import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchAlbums } from './services/api';
import logo1 from './images/logo1.png';

function App() {
  const [albums, setAlbums] = useState([]); // Albums chargés
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur
  const [menuOpen, setMenuOpen] = useState(false); // Menu burger

  const [searchQuery, setSearchQuery] = useState(''); // Requête de recherche

  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Récupère les albums au montage du composant
    fetchAlbums()
      .then((data) => {
        setAlbums(data); // Stocke les albums dans l'état
        setLoading(false);
      })
      .catch((err) => {
        setError(`Erreur : ${err.message}`); // En cas d'erreur
        setLoading(false);
      });
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen); // Toggle pour le menu burger
  };

  // Fonction pour gérer la recherche
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Mise à jour de la recherche
  };

  // Fonction pour la connexion
  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Connexion réussie');
      setErrorMessage('');
    } else {
      setErrorMessage('Email ou mot de passe incorrect');
    }
  };

  // Fonction pour l'inscription
  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }
    const existingUser = false; // Simuler qu'il n'existe pas
    if (existingUser) {
      setErrorMessage('L\'utilisateur existe déjà.');
    } else {
      console.log('Inscription réussie');
      setErrorMessage('');
    }
  };

  // Filtrer les albums en fonction de la requête de recherche
  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) || // Recherche par titre
      album.artist?.name.toLowerCase().includes(searchQuery.toLowerCase()) // Recherche par artiste
  );

  // Afficher l'état de chargement ou d'erreur
  if (loading) {
    return <p>Chargement des albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="App">
      <div className="logo-container">
        <img src={logo1} alt="Logo" className="logo" />
      </div>

      {/* Connexion / Inscription */}
      <div className="auth-buttons">
        {!isLogin && !isSignUp ? (
          <div>
            <button
              className="auth-button auth-button-login"
              onClick={() => setIsLogin(true)}
            >
              Connexion
            </button>
            <button
              className="auth-button auth-button-signup"
              onClick={() => setIsSignUp(true)}
            >
              Inscription
            </button>
          </div>
        ) : (
          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {isSignUp && (
              <input
                type="text"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {isSignUp && (
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            )}
            <button type="submit">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </button>
          </form>
        )}
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Menu Burger */}
      <div className="menu-toggle" onClick={toggleMenu}>
        &#9776;
      </div>

      {/* Sidebar */}
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

      {/* Champ de recherche */}
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Rechercher un album..."
        className="search-input"
      />
	   {/* Bouton pour effacer la recherche */}
  <button
    onClick={() => setSearchQuery('')}  // Réinitialise la recherche
    className="clear-button"
  >
    Effacer {/* bouton effacer*/}
  </button>

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

	 {/* Footer */}
      <footer className="footer">
        <div className="footer-section">
          <h4>Nous contacter</h4>
          <ul>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#support">Support</a></li>
            <li><a href="#email">Email</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Guide</h4>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#help">Aide</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Confidentialités</h4>
          <ul>
            <li><a href="#privacy">Politique de confidentialité</a></li>
            <li><a href="#terms">Conditions d'utilisation</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Informations légales</h4>
          <ul>
            <li><a href="#legal">Mentions légales</a></li>
          </ul>
        </div>
      </footer>

      <div className="right-copy">
        <p className="copyright">&copy; 2024 AS-BUSINESS. Tous droits réservés.</p>
      </div>
    </div>
  );
}

export default App;
