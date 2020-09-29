import 'regenerator-runtime';
import '../styles/style.css';
import '../styles/responsive.css';
import './views/components/nav-bar';
import registerSW from './utils/register-sw';
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
  registerSW();
});
