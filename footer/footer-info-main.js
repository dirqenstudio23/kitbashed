document.addEventListener('DOMContentLoaded', function() {
  fetch('https://dirqenstudio23.github.io/kitbashed/footer/footer-info-main.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('footer-info-main').innerHTML = html;
    })
    .catch(err => console.error('Gagal load navbar:', err));
});
