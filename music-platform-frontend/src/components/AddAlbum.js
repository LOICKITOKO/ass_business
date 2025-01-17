import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddAlbum() {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [price, setPrice] = useState('');
  const [songCount, setSongCount] = useState('');
  const [cover, setCover] = useState(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCover(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (title && artist && price && songCount && cover) {
      const newAlbum = {
        id: Date.now(),
        title,
        artist: { name: artist },
        price,
        songs: Array.from({ length: parseInt(songCount) }, (_, i) => ({
          title: `Chanson ${i + 1}`,
        })),
        cover_image: cover,
      };
      console.log('Nouvel album ajouté :', newAlbum);
      alert('Album enregistré avec succès!');
      navigate('/');
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  };

  return (
    <div className="add-album">
      <h2>Ajouter un Nouvel Album</h2>
      <input
        type="text"
        placeholder="Titre de l'album"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom de l'artiste"
        value={artist}
        onChange={(e) => setArtist(e.target.value)}
      />
      <input
        type="number"
        placeholder="Prix de l'album"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="number"
        placeholder="Nombre de chansons"
        value={songCount}
        onChange={(e) => setSongCount(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {cover && <img src={cover} alt="Album Cover" className="cover-preview" />}
      <button onClick={handleSave}>Enregistrer l'Album</button>
    </div>
  );
}

export default AddAlbum;
