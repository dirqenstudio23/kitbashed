document.addEventListener('DOMContentLoaded', function() {
  fetch('https://dirqenstudio23.github.io/kitbashed/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;
    })
    .catch(err => console.error('Gagal load navbar:', err));
});
