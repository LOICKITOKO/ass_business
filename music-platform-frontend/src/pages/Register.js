import React, { useState } from 'react';

function Register() {
  const [isArtist, setIsArtist] = useState(false);

  return (
    <div>
      <h1>Inscription</h1>
      <button onClick={() => setIsArtist(false)}>Fan</button>
      <button onClick={() => setIsArtist(true)}>Artiste</button>

      {isArtist ? (
        <form>
          <h2>Formulaire Artiste</h2>
          <input type="text" placeholder="Nom d'artiste" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mot de passe" required />
          <button type="submit">S'inscrire</button>
        </form>
      ) : (
        <form>
          <h2>Formulaire Fan</h2>
          <input type="text" placeholder="Nom" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Mot de passe" required />
          <button type="submit">S'inscrire</button>
        </form>
      )}
    </div>
  );
}

export default Register;
