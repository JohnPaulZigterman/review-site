document.getElementById('logout').addEventListener('click', function() {
    logout();
});
const logout = async () => {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      alert('logged out!');
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };