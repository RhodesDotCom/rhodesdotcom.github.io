const SUPABASE_URL = "https://pcmztpqkwpfdtwrameqk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbXp0cHFrd3BmZHR3cmFtZXFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyNzIzNjYsImV4cCI6MjA2ODg0ODM2Nn0.lcfkzc3knDburRZ71NDDNlLlP6d4HOrKHtLYRgHVeTY";

(function () {
  const token = sessionStorage.getItem('auth');
  if (!token) {
    location.replace('/login');
    return;
  }

  fetch(SUPABASE_URL + '/functions/v1/checkAuth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ token }),
  })
    .then(r => r.json())
    .then(data => {
      if (data.valid) {
        document.body.style.display = 'block';
      } else {
        location.replace('/login');
      }
    })
    .catch(() => location.replace('/login'));
})();
