const registerSW = () => {
  function registerServiceWorker() {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('./sw.js')
        .then(() => {
          console.log('Pendaftaran ServiceWorker berhasil');
        })
        .catch(() => {
          console.log('Pendaftaran ServiceWorker gagal');
        });
    });
  }

  if ('serviceWorker' in navigator) {
    registerServiceWorker();
  } else {
    console.log('ServiceWorker belum didukung browser ini.');
  }
};

export default registerSW;
