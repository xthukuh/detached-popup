// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const openButton = document.getElementById('openButton');

  openButton.addEventListener('click', function() {
    let url = urlInput.value.trim();
    if (!url) url = 'https://www.google.com'; // default example
    if (url) {
      // Send a message to the background script
      chrome.runtime.sendMessage({
        action: "openDetachedWindow",
        url,
        width: 1200,
        height: 700,
        left: undefined,
        top: undefined,
        focused: true,
        incognito: false,
      }, function(response) {
        if (response && response.status === "success") {
          console.log("Detached window opened successfully!");
          window.close(); // Close the popup after sending the message
        } else {
          console.error("Failed to open detached window:", response ? response.message : "Unknown error");
        }
      });
    } else {
      alert("Please enter a URL.");
    }
  });
});