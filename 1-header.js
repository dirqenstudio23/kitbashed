class HeaderComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class="js-responsive-nav">
    <div class="responsive-nav">
      <div class="close-responsive-click-area js-close-responsive-nav">
        <div class="close-responsive-button"></div>
      </div>
          <nav class="nav-container" data-hover-hint="nav" data-hover-hint-placement="bottom-start">
                <div class="gallery-title"><a href="/work">Work</a></div>
      <div class="page-title">
        <a href="about.html">About</a>
      </div>
      <div class="page-title">
        <a href="/services">Services</a>
      </div>
          </nav>
    </div>
  </div>
    <header class="site-header js-site-header " data-context="theme.nav" data-hover-hint="nav" data-hover-hint-placement="top-start">
        <nav class="nav-container" data-hover-hint="nav" data-hover-hint-placement="bottom-start">
                <div class="gallery-title"><a href="/work">Work</a></div>
      <div class="page-title">
        <a href="about.html">About</a>
      </div>
      <div class="page-title">
        <a href="/services">Services</a>
      </div>
        </nav>
        <div class="logo-wrap" data-context="theme.logo.header" data-hover-hint="logo" data-hover-hint-placement="bottom-start">
          <div class="logo e2e-site-logo-text logo-image  ">
    <a href="splassh.html" class="image-normal image-link">
      <img src="https://storage.googleapis.com/msgsndr/itKG3eaIJ0EN2gMc8cZd/media/697fcca366e7ca4428b15ff7.gif" alt="Kitbashed Creative">
    </a>
          </div>
        </div>
        <div class="hamburger-click-area js-hamburger">
          <div class="hamburger">
            <i></i>
            <i></i>
            <i></i>
          </div>
        </div>
    </header>
    <div class="header-placeholder"></div>
    `;
  }
}

customElements.define('site-header', HeaderComponent);