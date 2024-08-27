function performActions() {
    console.log('Stopping spinner...');
    if (typeof stop === 'function') {
        stop(); // Wywołuje funkcję stop() w konsoli
    } else {
        console.log('Function stop() is not defined in the page context.');
    }

    let stopSearching = false;

    function checkAndClickButtonInIframe() {
        if (stopSearching) return;

        const iframes = document.getElementsByTagName('iframe');

        for (let iframe of iframes) {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const button = iframeDocument?.getElementById('button1');

            if (button) {
                button.click();
                console.log("Button with id='button1' found and clicked inside iframe.");
                return;
            }
        }

        console.log("Button with id='button1' not found inside any iframe. Retrying...");
        setTimeout(checkAndClickButtonInIframe, 100);
    }

    checkAndClickButtonInIframe();

    setTimeout(() => {
        stopSearching = true;
        console.log("Stopped searching for the button after 4 seconds.");
    }, 4000);
}

// Uruchom funkcję performActions
performActions();