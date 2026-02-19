
(function () {
  // Sesuaikan path ini dengan lokasi file navbar.html di server Anda
  const NAVBAR_PATH = 'https://dirqenstudio23.github.io/kitbashed/navbar/navbar.html';

  function loadNavbar() {
    const container = document.getElementById('navbar-container');

    if (!container) {
      console.warn('[Navbar Loader] Elemen <div id="navbar-container"> tidak ditemukan di halaman ini.');
      return;
    }

    fetch(NAVBAR_PATH)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Gagal memuat navbar. Status: ' + response.status + '. Pastikan path "' + NAVBAR_PATH + '" sudah benar.');
        }
        return response.text();
      })
      .then(function (html) {
        container.innerHTML = html;

        // Trigger event agar script lain tahu navbar sudah dimuat
        document.dispatchEvent(new Event('navbarLoaded'));
      })
      .catch(function (error) {
        console.error('[Navbar Loader] Error:', error.message);
      });
  }

  // Jalankan setelah DOM siap
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();
