let promptEvent;
const btn = document.querySelector('#pwa-install-button');

window.addEventListener('beforeinstallprompt', event => {
  promptEvent = event;
  btn.style.display = 'block';
  console.log('beforeinstallprompt caught');
});

btn.addEventListener('click', () => {
  if (promptEvent) {
    promptEvent.prompt();
    promptEvent.userChoice.then(result => {
      if (result.outcome === 'accepted') {
        console.log('user accepted add to homescreen');
      } else {
        console.log('user dismissed the add to homescreen');
      }
      promptEvent = undefined;
    });
  }
});
