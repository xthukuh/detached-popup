// popup.js

document.addEventListener('DOMContentLoaded', function() {
  const input = document.getElementById('input');
  const open = document.getElementById('open');
  open.addEventListener('click', function() {
    let url = input.value.trim();
    if (!url) url = 'https://example.com'; // default
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