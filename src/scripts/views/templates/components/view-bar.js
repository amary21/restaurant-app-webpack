class ViewBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `<div class="hero">
        <div class="hero__effect">
            <div class="hero__inner">
                <h2 class="hero__title">Restaurant Hunter</h2>
                <h3 class="hero__tagline">Bosan makan malam itu-itu aja? Yuk cari restoran untuk menikmati makan malam anda</h3>
            </div>
        </div>
        </div>`;
  }
}

customElements.define('view-bar', ViewBar);
