

document.addEventListener('DOMContentLoaded', function () {
  fetch('https://dirqenstudio23.github.io/kitbashed/navbar/navbar.html')
    .then(res => res.text())
    .then(html => {
      document.getElementById('navbar-placeholder').innerHTML = html;

      const overlay = document.createElement('div');
      overlay.className = 'kb-nav-overlay';
      document.body.appendChild(overlay);

      const hamburger = document.querySelector('.js-hamburger');
      const closeBtn = document.querySelector('.js-close-responsive-nav');

      function openNav() {
        document.body.classList.add('kb-nav-open');
      }

      function closeNav() {
        document.body.classList.remove('kb-nav-open');
      }

      hamburger?.addEventListener('click', openNav);
      closeBtn?.addEventListener('click', closeNav);
      overlay.addEventListener('click', closeNav);
    })
    .catch(err => console.error('Gagal load navbar:', err));
});
