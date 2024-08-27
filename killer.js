chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: stopSpinner
    });
});

function stopSpinner() {
    console.log('Stopping spinner...');
    stop(); // Wysyła polecenie `stop()` w konsoli przeglądarki
}
