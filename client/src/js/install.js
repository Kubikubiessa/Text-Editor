const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// event handler to the `beforeinstallprompt` event ✅
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('hit')
    console.log("event" + event)
    event.preventDefault();
    //storing triggered events 
    window.deferredPrompt =event;
    
    butInstall.classList.toggle('hidden', false);
});

//click event handler on the `butInstall` element ✅
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    //install prompt prompted ✅
    promptEvent.prompt();

    //resetting deferredPrompt to null after being used/downloaded ✅
    window.deferredPrompt = null;
    //button is hidden again
    butInstall.classList.toggle('hidden', true);
});

// handler for the `appinstalled` event ✅
window.addEventListener('appinstalled', (event) => {
    console.log('install hit')
    window.deferredPrompt = null;
});
