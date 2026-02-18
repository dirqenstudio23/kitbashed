document.addEventListener('DOMContentLoaded', function() {
  fetch('/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Gagal load navbar:', err));
});
