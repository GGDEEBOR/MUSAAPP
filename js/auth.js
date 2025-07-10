async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error);
    }

    const user = await response.json();
    
    // Actualizar el estado global
    state.isLoggedIn = true;
    state.userId = user.userId;
    state.userName = user.email.split('@')[0];
    state.currentRole = user.role || 'visitor';

    // Actualizar UI
    document.getElementById('userDisplayName').textContent = state.userName;
    document.getElementById('loginControls').style.display = 'none';
    document.getElementById('logoutControls').style.display = 'block';

    // Cerrar modal
    bootstrap.Modal.getInstance(document.getElementById('loginModal')).hide();

    // Recargar vista según el rol
    setActiveRole(state.currentRole);
  } catch (error) {
    alert('Login failed: ' + error.message);
  }
}