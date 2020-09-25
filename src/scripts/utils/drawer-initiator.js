const DrawerInitiator = {
  init({
    button, drawer, content,
  }) {
    button.addEventListener('click', (event) => {
      this.toggleDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this.closeDrawer(event, drawer);
    });
  },

  toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('slide');
    if (drawer.className === 'slide') {
      this.disableScroll();
    } else {
      this.enableScroll();
    }
  },

  closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('slide');
    this.enableScroll();
  },

  disableScroll() {
    document.body.classList.add('stop-scrolling');
  },

  enableScroll() {
    document.body.classList.remove('stop-scrolling');
  },
};

export default DrawerInitiator;
