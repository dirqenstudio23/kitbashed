
(function () {

  const NAVBAR_PATH = 'https://dirqenstudio23.github.io/kitbashed/navbar/navbar-cart.html';

  function loadNavbar() {
    const container = document.getElementById('navbar-container-cart');

    if (!container) {
      console.warn('[Navbar Loader] Elemen <div id="navbar-container"> can not find in this page.');
      return;
    }

    fetch(NAVBAR_PATH)
      .then(function (response) {
        if (!response.ok) {
          throw new Error('Failed. Status: ' + response.status + '. ensure path "' + NAVBAR_PATH + '" correct.');
        }
        return response.text();
      })
      .then(function (html) {
        container.innerHTML = html;


        document.dispatchEvent(new Event('navbarLoaded'));
      })
      .catch(function (error) {
        console.error('[Navbar Loader] Error:', error.message);
      });
  }


  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNavbar);
  } else {
    loadNavbar();
  }
})();
