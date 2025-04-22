document.getElementById('startVoice').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.tabs.sendMessage(tab.id, { command: "start-voice" }, (response) => {
    if (response?.filename) {
      document.getElementById('filename').value = response.filename;
    } else {
      alert("Voice recognition failed: " + (response?.error || "Unknown error"));
    }
  });
});

document.getElementById('takeShot').addEventListener('click', () => {
  const filename = document.getElementById('filename').value || "screenshot";
  const captureMode = document.getElementById('captureMode').value;

  if (captureMode === 'visible') {
    chrome.tabs.captureVisibleTab(null, { format: "png" }, function(dataUrl) {
      downloadImage(dataUrl, filename + ".png");
    });
  } else {
    chrome.desktopCapture.chooseDesktopMedia([captureMode], streamId => {
      if (!streamId) return alert("Permission denied or cancelled.");
      alert("Advanced capturing via desktop stream is not fully implemented here. Requires additional native code.");
    });
  }
});

function downloadImage(dataUrl, filename) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}