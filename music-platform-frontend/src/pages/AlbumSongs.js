import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchAlbumSongs } from './services/api'; // Ajoutez une API pour récupérer les chansons

function AlbumSongs() {
  const { albumId } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlbumSongs(albumId)
      .then(data => {
        setSongs(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [albumId]);

  if (loading) return <p>Chargement des chansons...</p>;

  return (
    <div>
      <h1>Liste des chansons</h1>
      {songs.length > 0 ? (
        songs.map(song => (
          <div key={song.id}>
            <h3>{song.title}</h3>
            <p>Durée : {song.duration}</p>
          </div>
        ))
      ) : (
        <p>Aucune chanson trouvée.</p>
      )}
    </div>
  );
}

export default AlbumSongs;
