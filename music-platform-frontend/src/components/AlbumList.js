import React, { useEffect, useState } from 'react';
import { getAlbums } from '../services/api';

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const data = await getAlbums();
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  return (
    <div>
      <h2>Albums</h2>
      <ul>
        {albums && albums.length > 0 ? (
          albums.map((album) => (
            <li key={album.id}>
              <h3>{album.title}</h3>
              <img src={`http://localhost:8001${album.cover_image}`} alt={album.title} />
            </li>
          ))
        ) : (
          <p>Aucun album disponible.</p>
        )}
      </ul>
    </div>
  );
};

export default AlbumList;
