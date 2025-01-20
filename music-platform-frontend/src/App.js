import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchAlbums } from './services/api';

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
  const [activeAlbum, setActiveAlbum] = useState(null); // Album actif pour la lecture
  const [newImage, setNewImage] = useState(null); // Nouvelle image importée

  // Nouveaux états pour la gestion du formulaire "Add Album"
  const [isAddAlbum, setIsAddAlbum] = useState(false); // Affichage du formulaire "Add Album"
  const [artistName, setArtistName] = useState(''); // Nom de l'artiste
  const [songName, setSongName] = useState(''); // Nom de la chanson
  const [songPrice, setSongPrice] = useState(''); // Prix de la chanson
  const [coverImage, setCoverImage] = useState(null); // Image de couverture
  const [selectedSongs, setSelectedSongs] = useState([]);

  useEffect(() => {
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Mise à jour de la recherche
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      console.log('Connexion réussie');
      setErrorMessage('');
    } else {
      setErrorMessage('Email ou mot de passe incorrect');
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas.');
      return;
    }

    const existingUser = false; // Simuler qu'il n'existe pas
    if (existingUser) {
      setErrorMessage("L'utilisateur existe déjà.");
    } else {
      console.log('Inscription réussie');
      setErrorMessage('');
    }
  };

  const handleListen = (album) => {
    setActiveAlbum(album); // Passe à la vue d'écoute avec cet album
  };

  const handleBack = () => {
    setActiveAlbum(null); // Retourne à la liste des albums
  };

  const handleAddAlbumToggle = () => {
    setIsAddAlbum(!isAddAlbum); // Bascule entre afficher ou masquer le formulaire d'ajout
  };

  const handleAddAlbum = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire
    const newAlbum = {
      id: Date.now(),
      title: songName,
      cover_image: coverImage,
      artist: { name: artistName },
      songs: selectedSongs.map((file) => ({
      title: file.name,
      price: songPrice || '0',
      fileUrl: URL.createObjectURL(file),
    })), // Ajout des chansons sélectionnées
  };

    setAlbums([...albums, newAlbum]); // Ajoute l'album à la liste
    setArtistName('');
    setSongName('');
    setSongPrice('');
    setCoverImage(null);
    setSelectedSongs([]); // Réinitialise la liste des chansons
    setIsAddAlbum(false); // Cache le formulaire après ajout
    alert('Album ajouté avec succès !'); // Affiche un message de confirmation
  };

  const filteredAlbums = albums.filter(
    (album) =>
      album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      album.artist?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFileSelection = (e) => {
	  const files = Array.from(e.target.files); // Récupère les fichiers sélectionnés
	  setSelectedSongs([...selectedSongs, ...files]); // Ajoute les fichiers à la liste existante
  };

  if (loading) {
    return <p>Chargement des albums...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (activeAlbum) {
    return (
      <div className="album-player">
        <button onClick={handleBack} className="back-button">
          ⬅ Retour
        </button>
        <div className="player-content">
          <img
            src={activeAlbum.cover_image || 'default_cover.jpg'}
            alt={activeAlbum.title}
            className="album-cover"
          />
          <h1>{activeAlbum.title}</h1>
          <p>Artiste : {activeAlbum.artist ? activeAlbum.artist.name : 'Inconnu'}</p>
          <audio controls autoPlay>
            <source
              src={activeAlbum.preview || 'default_audio.mp3'}
              type="audio/mp3"
            />
            Votre navigateur ne supporte pas la lecture audio.
          </audio>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="main-header">
        <div className="header-content">
          <h1>AS-BUSINESS</h1>
          <h3>Transforme Ta Passion en Rêve</h3>
        </div>
        <div className="header-intro">
          <img
            className="header-avatar"
            src="https://via.placeholder.com/150"
            alt="Avatar"
          />
          <h2>Bienvenue / Welcome!</h2>
          <hr />
        </div>
      </header>

      <div className="header-actions">
        <div className="menu-toggle" onClick={toggleMenu}>
          &#9776;
        </div>

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

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Rechercher un album..."
          className="search-input"
        />
        <button onClick={() => setSearchQuery('')} className="clear-button">
          Effacer
        </button>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

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

      <button onClick={handleAddAlbumToggle} className="auth-button">
        Add Album
      </button>

      {isAddAlbum && (
        <div className="add-album-form">
          <h2>Ajouter un Album</h2>
          <form onSubmit={handleAddAlbum}>
            <input
              type="text"
              placeholder="Nom de l'artiste"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nom de la chanson"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Prix de la chanson"
              value={songPrice}
              onChange={(e) => setSongPrice(e.target.value)}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverImage(URL.createObjectURL(e.target.files[0]))}
              required
            />
	    <div>
	      <label htmlFor="songFiles">Ajouter des chansons :</label>
	      <input
                type="file"
                id="songFiles"
                accept="audio/*"
                multiple
                onChange={handleFileSelection}
	      />
	      <ul>
	      {selectedSongs.map((file, index) => (
		      <li key={index}>{file.name}</li>
	      ))}
	      </ul>
	      </div>
            <button type="submit">Ajouter</button>
          </form>
        </div>
      )}

      <div className="album-list">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map((album) => (
            <div key={album.id} className="album-card">
              <img
                src={album.cover_image || 'default_cover.jpg'}
                alt={album.title}
              />
              <h3>{album.title}</h3>
              <p>
                By: {album.artist ? album.artist.name : 'Unknown Artist'}
              </p>
              <div className="album-songs-count">
                <span>
                  Nombre de chansons : {album.songs ? album.songs.length : 0}
                </span>
              </div>
              <div className="album-purchases">
                <span>Achats : {album.purchases ? album.purchases : 0}</span>
              </div>
              <div className="buttons">
                <button
                  className="listen-button"
                  onClick={() => handleListen(album)}
                >
                  Écouter
                </button>
                <button className="buy-button">Acheter</button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun album trouvé.</p>
        )}
      </div>

      <footer className="footer">
        <div className="footer-section">
          <h4>Nous contacter</h4>
          <ul>
            <li>
              <a href="#contact">Contact</a>
            </li>
            <li>
              <a href="#support">Support</a>
            </li>
            <li>
              <a href="#email">Email</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Guide</h4>
          <ul>
            <li>
              <a href="#faq">FAQ</a>
            </li>
            <li>
              <a href="#help">Aide</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Confidentialités</h4>
          <ul>
            <li>
              <a href="#privacy">Politique de confidentialité</a>
            </li>
            <li>
              <a href="#terms">Conditions d'utilisation</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Informations légales</h4>
          <ul>
            <li>
              <a href="#legal">Mentions légales</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default App;
