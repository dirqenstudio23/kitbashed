document.addEventListener('DOMContentLoaded', function() {
  fetch('https://dirqenstudio23.github.io/kitbashed/footer/footer-info.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-info').innerHTML = html;
    })
    .catch(err => console.error('Gagal load navbar:', err));
});
