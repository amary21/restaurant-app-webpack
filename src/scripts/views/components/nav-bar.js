class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<nav>
      <button aria-label="drawer navigation menu button" class="menu-toggle">☰</button>
      <a class="logo" href="/">
          <h1>RestoHunt</h1>
      </a>
      <ul>
          <li><a href="/">Home</a></li>
          <li><a href="#/favorite">Favorite</a></li>
          <li><a href="https://github.com/amary21">About Us</a></li>
      </ul>
    </nav>`;
  }
}

customElements.define('nav-bar', NavBar);
