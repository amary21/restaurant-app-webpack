import 'regenerator-runtime';
import '@lottiefiles/lottie-player/dist/lottie-player';
import '../styles/style.css';
import '../styles/responsive.css';
import './views/templates/components/nav-bar';
import App from './views/app';

const app = new App({
  button: document.querySelector('.menu-toggle'),
  drawer: document.querySelector('nav ul'),
  content: document.querySelector('main'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
});
