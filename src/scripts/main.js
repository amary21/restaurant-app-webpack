import loadData from './load-data';
import registerSW from './register-sw';

function main() {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav');
  const navSideBar = document.querySelector('nav ul');
  const bodyMain = document.querySelector('main');
  const bodyHero = document.querySelector('.hero');

  const disableScroll = () => document.body.classList.add('stop-scrolling');
  const enableScroll = () => document.body.classList.remove('stop-scrolling');
  const changeColorNav = () => {
    window.onscroll = () => {
      if (screen.width > 576) {
        nav.classList.add('nav-colored');
        if (document.body.scrollTop >= 200 || document.documentElement.scrollTop >= 200) {
          nav.classList.add('nav-colored');
          nav.classList.remove('nav-transparent');
        } else {
          nav.classList.add('nav-transparent');
          nav.classList.remove('nav-colored');
        }
      }
    };
  };

  document.addEventListener('DOMContentLoaded', () => {
    registerSW();
    changeColorNav();
    loadData();
    menuToggle.addEventListener('click', () => {
      navSideBar.classList.toggle('slide');
      if (navSideBar.className === 'slide') {
        disableScroll();
      } else {
        enableScroll();
      }
    });

    bodyMain.addEventListener('click', () => {
      navSideBar.classList.remove('slide');
      enableScroll();
    });

    bodyHero.addEventListener('click', () => {
      navSideBar.classList.remove('slide');
      enableScroll();
    });

    console.log(process.env.S3_API);
  });
}

export default main;
