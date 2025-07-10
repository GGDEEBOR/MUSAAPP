// Render available art for collectors
function renderAvailableArt() {
  const grid = document.getElementById('availableArtGrid');
  grid.innerHTML = '';
  
  artworks.forEach(artwork => {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 mb-4';
    col.innerHTML = `
      <div class="card artwork-card" data-id="${artwork.id}">
        <img src="${artwork.imageUrl}" class="card-img-top artwork-img" alt="${artwork.title}">
        <div class="card-body">
          <h5 class="card-title">${artwork.title}</h5>
          <p class="card-text">$${artwork.price}</p>
          <p class="card-text text-muted">By ${artwork.artist}</p>
        </div>
      </div>
    `;
    col.querySelector('.card').addEventListener('click', () => showArtworkDetail(artwork));
    grid.appendChild(col);
  });
}

// Render purchased art for collectors
function renderPurchasedArt() {
  const grid = document.getElementById('purchasedArtGrid');
  grid.innerHTML = '<div class="alert alert-info">You haven\'t purchased any artworks yet.</div>';
  // This would be populated with real purchase data from an API
}

// Fetch AI recommendations
function fetchRecommendations() {
  const carousel = document.getElementById('recommendationCarousel');
  carousel.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';
  
  // Simulate API call to AI Recommendation Engine Loop
  setTimeout(() => {
    carousel.innerHTML = '';
    
    // Sample recommendations (would come from API)
    const recommendations = artworks.slice(0, 4);
    
    recommendations.forEach(artwork => {
      const card = document.createElement('div');
      card.className = 'card artwork-card';
      card.innerHTML = `
        <img src="${artwork.imageUrl}" class="card-img-top artwork-img" alt="${artwork.title}">
        <div class="card-body">
          <h5 class="card-title">${artwork.title}</h5>
          <p class="card-text">$${artwork.price}</p>
          <button class="btn btn-sm gold-btn view-details-btn" data-id="${artwork.id}">View Details</button>
        </div>
      `;
      card.querySelector('.view-details-btn').addEventListener('click', () => showArtworkDetail(artwork));
      carousel.appendChild(card);
    });
  }, 1000);
}