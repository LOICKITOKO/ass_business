import React from 'react';
import './App.css';
import AlbumList from './components/AlbumList';  // Import du composant AlbumList

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Platform</h1>  {/* Titre principal de la plateforme */}
      </header>
      <main>
        <AlbumList />  {/* Affichage de la liste des albums */}
      </main>
    </div>
  );
}

export default App;
