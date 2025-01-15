import React from 'react';

const AlbumCard = ({ album }) => {

  // Fonction pour gérer le clic sur le bouton "Acheter"
  const handleBuyClick = (albumId) => {
    // Rediriger l'utilisateur vers la page de paiement PayPal avec l'ID de l'album
    // Remplace "YOUR_PAYPAL_URL" par l'URL correcte pour le paiement
    window.location.href = `https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=YOUR_PAYPAL_EMAIL&item_name=Album+${albumId}&amount=10.00&currency_code=USD`; 
  };

  return (
    <div className="album-card">
      <img src={album.coverImage} alt={album.name} />
      <h3>{album.name}</h3>
      <p>{album.artist}</p>
      <button onClick={() => handleBuyClick(album.id)} className="buy-button">
        Acheter
      </button>
    </div>
  );
};

export default AlbumCard;
