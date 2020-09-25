const NavbarListener = {
  init({ navbar }) {
    window.onscroll = () => {
      this.initColor(navbar);
    };
  },

  initColor(navbar) {
    if (screen.width > 576) {
      navbar.classList.add('nav-colored');
      if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
        this.collored(navbar);
      } else {
        this.colorless(navbar);
      }
    }
  },

  collored(navbar) {
    navbar.classList.add('nav-colored');
    navbar.classList.remove('nav-transparent');
  },

  colorless(navbar) {
    navbar.classList.add('nav-transparent');
    navbar.classList.remove('nav-colored');
  },
};

export default NavbarListener;
