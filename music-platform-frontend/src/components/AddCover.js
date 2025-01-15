import React, { useState } from 'react';

function AddCover() {
  const [cover, setCover] = useState(null);

  const handleFileChange = (e) => {
    setCover(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('cover', cover);

    // Exemple d'appel API
    fetch('/api/upload-cover', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => console.log('Cover uploadé :', data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Ajouter une couverture</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AddCover;
