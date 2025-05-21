// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.getElementById('urlInput');
  const openButton = document.getElementById('openButton');

  // Set a default URL (optional)
  urlInput.value = "https://rxoffice.site"; // Or any other default

  openButton.addEventListener('click', function() {
    const url = urlInput.value.trim();
    if (url) {
      // Send a message to the background script
      chrome.runtime.sendMessage({
        action: "openDetachedWindow",
        url,
        width: 1200,
        height: 800,
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