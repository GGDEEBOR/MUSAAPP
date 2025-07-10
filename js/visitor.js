// Render artwork grid for visitors
function renderArtworkGrid(category) {
  const grid = document.getElementById('artworkGrid');
  grid.innerHTML = '';
  
  const filteredArtworks = category === 'all' 
    ? artworks 
    : artworks.filter(art => art.category === category);
  
  filteredArtworks.forEach(artwork => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.innerHTML = `
      <div class="card artwork-card" data-id="${artwork.id}">
        <img src="${artwork.imageUrl}" class="card-img-top artwork-img" alt="${artwork.title}">
        <div class="card-body">
          <h5 class="card-title">${artwork.title}</h5>
        </div>
      </div>
    `;
    col.querySelector('.card').addEventListener('click', () => showArtworkPreview(artwork));
    grid.appendChild(col);
  });
}