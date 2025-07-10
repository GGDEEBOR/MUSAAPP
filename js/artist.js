// Render artist's works table
function renderArtistWorks() {
  const table = document.getElementById('artworksTable');
  table.innerHTML = '';
  
  // Mock data - in real app, filter to show only current artist's works
  const artistWorks = artworks.slice(0, 3);
  
  artistWorks.forEach(artwork => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${artwork.title}</td>
      <td><img src="${artwork.imageUrl}" alt="${artwork.title}" height="50"></td>
      <td>${artwork.views}</td>
      <td>${artwork.inquiries}</td>
      <td>${artwork.sales}</td>
      <td>${artwork.aiScore}/100</td>
      <td>
        <button class="btn btn-sm btn-outline-light me-1" onclick="getAIFeedback(${artwork.id})">Get AI Feedback</button>
        <button class="btn btn-sm btn-outline-danger" onclick="deleteArtwork(${artwork.id})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

// Handle artwork upload
function handleArtworkUpload() {
  // Get form values
  const title = document.getElementById('artTitle').value;
  const description = document.getElementById('artDescription').value;
  const category = document.getElementById('artCategory').value;
  const price = document.getElementById('artPrice').value;
  const imageFile = document.getElementById('artImage').files[0];
  const videoFile = document.getElementById('artVideo').files[0];
  
  // Create FormData for file upload
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('price', price);
  formData.append('image', imageFile);
  if (videoFile) formData.append('video', videoFile);
  
  // Show upload in progress
  const uploadBtn = document.querySelector('#artworkUploadForm button[type="submit"]');
  uploadBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Uploading...';
  uploadBtn.disabled = true;
  
  // Call to Media Upload Handler Loop (simulated)
  console.log('Calling Media Upload Handler Loop with:', formData);
  
  // Simulate API call
  setTimeout(() => {
    uploadBtn.innerHTML = 'Upload Artwork';
    uploadBtn.disabled = false;
    
    // Reset form
    document.getElementById('artworkUploadForm').reset();
    
    // Show success message
    alert('Artwork uploaded successfully!');
    
    // Refresh the artist works list
    renderArtistWorks();
  }, 1500);
}

// Get AI feedback for artist's work
function getAIFeedback(artworkId) {
  const artwork = artworks.find(art => art.id == artworkId);
  if (!artwork) return;
  
  // Switch to AI feedback tab
  document.querySelector('#aifeedback-tab').click();
  
  // Show loading state
  document.getElementById('aiScorecard').innerHTML = '<div class="text-center"><div class="spinner-border text-light" role="status"></div><p>Generating AI feedback...</p></div>';
  
  // Call to AI Recommendation Engine Loop (simulated)
  console.log(`Getting AI feedback for artwork: ${artwork.title}`);
  
  // Simulate API call
  setTimeout(() => {
    document.getElementById('aiScorecard').innerHTML = `
      <div class="card bg-dark border-secondary mb-3">
        <div class="card-header d-flex justify-content-between">
          <span>${artwork.title}</span>
          <span class="badge bg-${artwork.aiScore >= 80 ? 'success' : artwork.aiScore >= 70 ? 'warning' : 'danger'}">${artwork.aiScore}/100</span>
        </div>
        <div class="card-body">
          <h5 class="card-title">AI Evaluation</h5>
          <div class="row">
            <div class="col-md-6">
              <h6>Strengths</h6>
              <ul>
                <li>Excellent use of color composition</li>
                <li>Strong emotional impact potential</li>
                <li>Technical execution is precise</li>
              </ul>
            </div>
            <div class="col-md-6">
              <h6>Areas for Improvement</h6>
              <ul>
                <li>Consider more contrast in shadowed areas</li>
                <li>Market appeal could be enhanced with complementary pieces</li>
                <li>Title could be more evocative to attract collectors</li>
              </ul>
            </div>
          </div>
          <h6 class="mt-3">Market Potential</h6>
          <div class="progress">
            <div class="progress-bar bg-success" style="width: ${artwork.aiScore}%">${artwork.aiScore}%</div>
          </div>
          <p class="mt-2">This piece has strong market potential. Based on current trends, similar works are selling in the $${artwork.price * 0.9} to $${artwork.price * 1.2} range.</p>
        </div>
      </div>
    `;
  }, 2000);
}

// Delete artwork
function deleteArtwork(artworkId) {
  if (confirm('Are you sure you want to delete this artwork?')) {
    // Call to deletion API endpoint (simulated)
    console.log(`Deleting artwork: ${artworkId}`);
    
    // Simulate deletion and refresh
    setTimeout(() => {
      alert('Artwork deleted successfully!');
      renderArtistWorks();
    }, 500);
  }
}