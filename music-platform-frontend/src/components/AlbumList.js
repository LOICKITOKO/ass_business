import React, { useEffect, useState } from 'react';
import { getAlbums } from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]); // Initialiser albums comme un tableau vide

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getAlbums();
      setAlbums(data); // Mettre à jour l'état avec les albums récupérés
    };
    fetchAlbums();
  }, []);

  // Vérifier si albums est un tableau avant de l'itérer
  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {Array.isArray(albums) && albums.length > 0 ? (
          albums.map((album) => (
            <li key={album.id}>
              <h3>{album.title}</h3>
              <img
                src={`http://localhost:8000${album.cover_image}`}
                alt={album.title}
              />
            </li>
          ))
        ) : (
          <p>No albums available.</p>
        )}
      </ul>
    </div>
  );
};

export default AlbumList;
