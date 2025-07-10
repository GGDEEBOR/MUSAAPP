const artworks = [
  { id: 1, title: "Sunset Dreams", category: "painting", artist: "Jane Doe", price: 1200, 
    imageUrl: "images/1.png", description: "Beautiful sunset painting with vibrant colors.", 
    views: 124, inquiries: 5, sales: 1, aiScore: 85 },
  { id: 2, title: "2 Pieces frame", category: "photography", artist: "John Smith", price: 850, 
    imageUrl: "images/2.png", description: "Black and white cityscape photography.", 
    views: 87, inquiries: 3, sales: 0, aiScore: 72 },
  { id: 3, title: "Ciudad en llamas", category: "painting", artist: "Emma Wilson", price: 2300, 
    imageUrl: "images/3.png", description: "Modern abstract expression with bold strokes.", 
    views: 215, inquiries: 8, sales: 2, aiScore: 91 },
  { id: 4, title: "Digital Dreamscape", category: "digital", artist: "Alex Chen", price: 750, 
    imageUrl: "images/4.png", description: "AI-generated fantasy landscape.", 
    views: 156, inquiries: 4, sales: 1, aiScore: 78 },
  { id: 5, title: "Bronze Elegance", category: "sculpture", artist: "Michael Brown", price: 4500, 
    imageUrl: "images/5.png", description: "Elegant bronze sculpture of human form.", 
    views: 92, inquiries: 2, sales: 0, aiScore: 88 },
  { id: 6, title: "Nature's Whisper", category: "photography", artist: "Sarah Johnson", price: 950, 
    imageUrl: "images/6.jpg", description: "Macro photography of natural elements.", 
    views: 67, inquiries: 1, sales: 0, aiScore: 75 }
];


// Global state
const state = {
  currentRole: 'visitor',
  isLoggedIn: false,
  userId: null,
  userName: '',
  selectedCategory: 'all',
  scrollPosition: 0
};

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Load saved state from localStorage
  loadSavedState();
  
  // Initial view setup
  setActiveRole(state.currentRole);
  renderArtworkGrid(state.selectedCategory);
  
  // Event listeners for role switcher
  document.getElementById('btnVisitor').addEventListener('click', () => setActiveRole('visitor'));
  document.getElementById('btnCollector').addEventListener('click', () => setActiveRole('collector'));
  document.getElementById('btnArtist').addEventListener('click', () => setActiveRole('artist'));
  
  // Category filter change
  document.getElementById('categoryFilter').addEventListener('change', function() {
    state.selectedCategory = this.value;
    renderArtworkGrid(state.selectedCategory);
    saveState();
  });
  
  // Save scroll position when scrolling
  window.addEventListener('scroll', debounce(function() {
    if (state.currentRole === 'visitor') {
      state.scrollPosition = window.scrollY;
      saveState();
    }
  }, 200));
  
  // Restore scroll position
  if (state.currentRole === 'visitor' && state.scrollPosition > 0) {
    setTimeout(() => {
      window.scrollTo(0, state.scrollPosition);
    }, 100);
  }
});

// Set active role and update UI
function setActiveRole(role) {
  state.currentRole = role;
  saveState();
  
  // Update active button
  document.getElementById('btnVisitor').classList.remove('active');
  document.getElementById('btnCollector').classList.remove('active');
  document.getElementById('btnArtist').classList.remove('active');
  document.getElementById(`btn${role.charAt(0).toUpperCase() + role.slice(1)}`).classList.add('active');
  
  // Show/hide relevant views
  document.getElementById('visitorView').style.display = role === 'visitor' ? 'block' : 'none';
  document.getElementById('collectorView').style.display = role === 'collector' ? 'block' : 'none';
  document.getElementById('artistView').style.display = role === 'artist' ? 'block' : 'none';
  document.getElementById('visitorSidebar').style.display = role === 'visitor' ? 'block' : 'none';
  
  // Adjust column sizes based on sidebar visibility
  document.getElementById('mainContentArea').className = role === 'visitor' ? 'col-md-9' : 'col-md-12';
  
  // Load role-specific data
  if (role === 'visitor') {
    renderArtworkGrid(state.selectedCategory);
    document.getElementById('categoryFilter').value = state.selectedCategory;
  } else if (role === 'collector' && state.isLoggedIn) {
    renderAvailableArt();
    renderPurchasedArt();
    fetchRecommendations();
  } else if (role === 'artist' && state.isLoggedIn) {
    renderArtistWorks();
  }
  
  // Check if login needed
  if ((role === 'collector' || role === 'artist') && !state.isLoggedIn) {
    new bootstrap.Modal(document.getElementById('loginModal')).show();
  }
}

// Save state to localStorage
function saveState() {
  const stateToSave = {
    currentRole: state.currentRole,
    isLoggedIn: state.isLoggedIn,
    userId: state.userId,
    userName: state.userName,
    selectedCategory: state.selectedCategory,
    scrollPosition: state.scrollPosition
  };
  localStorage.setItem('musaGalleryState', JSON.stringify(stateToSave));
}

// Load saved state from localStorage
function loadSavedState() {
  const savedState = localStorage.getItem('musaGalleryState');
  if (savedState) {
    const parsedState = JSON.parse(savedState);
    Object.assign(state, parsedState);
  }
}