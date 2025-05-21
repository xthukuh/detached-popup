// background.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action === "openDetachedWindow") {
      const { 
        url,
        width=1200,
        height=700,
        left,
        top,
        focused=true,
        incognito=false,
      } = request;
      let w = Number(width), h = Number(height);
      w = Number.isInteger(w) && w > 0 ? w : 1200;
      h = Number.isInteger(h) && h > 0 ? h : 700;
      // Chrome's window creation API for "app mode"
      // The 'type: "popup"' and 'focused: true' are standard for a new window.
      // The key for hiding the address bar is that for 'type: "popup"',
      // Chrome automatically removes the address bar for security reasons (to prevent spoofing)
      // and when a PWA is installed, it uses a similar mechanism.
      // This is generally the equivalent of the --app flag for programmatic creation.

      chrome.windows.create({
        url,
        type: "panel", // Crucial for a minimalist window.
        width: w,
        height: h,
        left,
        top,
        focused,
        incognito,
      }, function(newWindow) {
        if (chrome.runtime.lastError) {
          console.error("Error creating window:", chrome.runtime.lastError.message);
          sendResponse({status: "error", message: chrome.runtime.lastError.message});
        } else {
          console.log("Window created with ID:", newWindow?.id);
          sendResponse({status: "success", windowId: newWindow?.id});
        }
      });

      // Indicate that sendResponse will be called asynchronously
      return true;
    }
  }
);