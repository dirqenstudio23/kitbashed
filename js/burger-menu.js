
  document.addEventListener('click', function(e) {
    if (e.target.closest('.js-hamburger')) {
      document.body.classList.toggle('show-responsive-nav');
    }
    if (e.target.closest('.js-close-responsive-nav')) {
      document.body.classList.remove('show-responsive-nav');
    }
  });
