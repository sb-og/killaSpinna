chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: performActions
    });
});

function performActions() {
    console.log('Stopping spinner...');
    stop(); // Wywołuje funkcję stop() w konsoli

    // Flaga do zatrzymania wyszukiwania po 4 sekundach
    let stopSearching = false;

    // Funkcja do kliknięcia przycisku wewnątrz dowolnego iframe
    function checkAndClickButtonInIframe() {
        if (stopSearching) return; // Zatrzymujemy wyszukiwanie, jeśli minęło 4 sekundy

        const iframes = document.getElementsByTagName('iframe');

        for (let iframe of iframes) {
            const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
            const button = iframeDocument?.getElementById('button1');

            if (button) {
                button.click();
                console.log("Button with id='button1' found and clicked inside iframe.");
                return; // Kończymy działanie skryptu po znalezieniu i kliknięciu przycisku
            }
        }

        console.log("Button with id='button1' not found inside any iframe. Retrying...");
        // Jeśli przycisk jeszcze się nie pojawił, sprawdzaj co 500 ms
        setTimeout(checkAndClickButtonInIframe, 100);
    }

    // Wywołanie sprawdzania po 1 sekundzie
    setTimeout(checkAndClickButtonInIframe);

    // Zatrzymujemy wyszukiwanie po 4 sekundach
    setTimeout(() => {
        stopSearching = true;
        console.log("Stopped searching for the button after 4 seconds.");
    }, 4000);
}