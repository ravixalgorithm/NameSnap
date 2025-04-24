chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.command === "start-voice") {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      sendResponse({ filename: text.replace(/\s+/g, "-") });
    };

    recognition.onerror = (event) => {
      sendResponse({ error: event.error });
    };

    return true; // Async response
  }
});
