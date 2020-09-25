import '../templates/components/view-bar';

const Favorite = {
  async render() {
    return `
      <section class="content">
          <div class="explore">
           <resto-list></resto-list>
          </div>
      </section>`;
  },

  async afterRender() {
    const nav = document.querySelector('nav');
    nav.style.backgroundColor = '#005792';
  },
};

export default Favorite;
