// Show artwork preview modal for visitors
function showArtworkPreview(artwork) {
  document.getElementById('artworkPreviewTitle').textContent = artwork.title;
  document.getElementById('artworkPreviewImage').src = artwork.imageUrl;
  new bootstrap.Modal(document.getElementById('artworkPreviewModal')).show();
}

// Show artwork detail modal for collectors
function showArtworkDetail(artwork) {
  document.getElementById('artworkDetailTitle').textContent = artwork.title;
  document.getElementById('artworkDetailImage').src = artwork.imageUrl;
  document.getElementById('artworkDetailDescription').textContent = artwork.description;
  document.getElementById('artworkDetailArtist').textContent = artwork.artist;
  document.getElementById('artworkDetailPrice').textContent = artwork.price;
  
  // Store artwork ID for purchase and chat
  document.getElementById('buyNowBtn').dataset.artworkId = artwork.id;
  document.getElementById('showNegotiationBtn').dataset.artworkId = artwork.id;
  document.getElementById('show360TourBtn').dataset.artworkId = artwork.id;
  
  // Hide negotiation chat section by default
  document.getElementById('negotiationChatSection').classList.add('d-none');
  
  new bootstrap.Modal(document.getElementById('artworkDetailModal')).show();
}

// Handle Buy Now button click
function handleBuyNow() {
  const artworkId = document.getElementById('buyNowBtn').dataset.artworkId;
  const artwork = artworks.find(art => art.id == artworkId);
  
  if (!artwork) return;
  
  // Show loading state
  const buyBtn = document.getElementById('buyNowBtn');
  buyBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...';
  buyBtn.disabled = true;
  
  // Call to Stripe Checkout Session Creator Loop (simulated)
  console.log(`Creating Stripe checkout session for artwork: ${artwork.title}`);
  
  // Simulate API call
  setTimeout(() => {
    buyBtn.innerHTML = 'Buy Now';
    buyBtn.disabled = false;
    
    // Simulated checkout URL
    const checkoutUrl = `https://checkout.stripe.com/c/pay/cs_test_${Math.random().toString(36).substring(7)}`;
    
    // Open Stripe checkout in new window
    window.open(checkoutUrl, '_blank');
  }, 1000);
}

// Toggle negotiation chat
function toggleNegotiationChat() {
  const chatSection = document.getElementById('negotiationChatSection');
  chatSection.classList.toggle('d-none');
  
  if (!chatSection.classList.contains('d-none')) {
    const artworkId = document.getElementById('showNegotiationBtn').dataset.artworkId;
    loadChatHistory(artworkId);
  }
}

// Load chat history
function loadChatHistory(artworkId) {
  const chatWindow = document.getElementById('chatWindow');
  chatWindow.innerHTML = '<div class="text-center"><div class="spinner-border spinner-border-sm text-secondary" role="status"></div></div>';
  
  // Call to Negotiation Pool Chat Loop (simulated)
  console.log(`Loading chat history for artwork: ${artworkId}`);
  
  // Simulate API call
  setTimeout(() => {
    chatWindow.innerHTML = `
      <div class="chat-message text-end mb-2">
        <small class="text-muted">You - 2 days ago</small>
        <div class="bg-primary text-white p-2 rounded">I'm interested in this piece. Would you consider $${artworks.find(art => art.id == artworkId).price * 0.9}?</div>
      </div>
      <div class="chat-message mb-2">
        <small class="text-muted">Artist - 1 day ago</small>
        <div class="bg-secondary p-2 rounded">Thank you for your interest! I can offer a 5% discount.</div>
      </div>
    `;
  }, 800);
}

// Send chat message
function sendChatMessage() {
  const messageInput = document.getElementById('chatMessage');
  const message = messageInput.value.trim();
  
  if (!message) return;
  
  const chatWindow = document.getElementById('chatWindow');
  const artworkId = document.getElementById('showNegotiationBtn').dataset.artworkId;
  
  // Clear input
  messageInput.value = '';
  
  // Add message to chat window
  const messageElement = document.createElement('div');
  messageElement.className = 'chat-message text-end mb-2';
  messageElement.innerHTML = `
    <small class="text-muted">You - Just now</small>
    <div class="bg-primary text-white p-2 rounded">${message}</div>
  `;
  chatWindow.appendChild(messageElement);
  
  // Scroll to bottom
  chatWindow.scrollTop = chatWindow.scrollHeight;
  
  // Call to Negotiation Pool Chat Loop (simulated)
  console.log(`Sending message to artwork chat ${artworkId}: ${message}`);
  
  // Simulate API response
  setTimeout(() => {
    const responseElement = document.createElement('div');
    responseElement.className = 'chat-message mb-2';
    responseElement.innerHTML = `
      <small class="text-muted">Artist - Just now</small>
      <div class="bg-secondary p-2 rounded">Thank you for your message. I'll get back to you soon.</div>
    `;
    chatWindow.appendChild(responseElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 1000);
}

// Show 360° tour
function show360Tour() {
  const artworkId = document.getElementById('show360TourBtn').dataset.artworkId;
  alert(`Opening 360° tour for artwork #${artworkId} in a new window`);
  // This would actually open an iframe or new window with the 360° tour
}

// Add event listeners for modals
document.getElementById('buyNowBtn').addEventListener('click', handleBuyNow);
document.getElementById('showNegotiationBtn').addEventListener('click', toggleNegotiationChat);
document.getElementById('sendMessageBtn').addEventListener('click', sendChatMessage);
document.getElementById('show360TourBtn').addEventListener('click', show360Tour);
document.getElementById('artworkUploadForm').addEventListener('submit', function(e) {
  e.preventDefault();
  handleArtworkUpload();
});