import React from 'react';

function BuyAlbum() {
  return (
    <div>
      <h1>Acheter l'album</h1>
      <p>Cette page redirigera vers PayPal pour le paiement.</p>
      <button onClick={() => window.location.href = 'https://paypal.com'}>
        Payer avec PayPal
      </button>
    </div>
  );
}

export default BuyAlbum;
