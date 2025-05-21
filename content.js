// content.js

// Attach a click listener to the entire document
document.addEventListener('click', function (event) {
  // Check if the clicked element (or its parent) is an anchor tag
  let targetElement = event.target;
  while (targetElement && targetElement.tagName !== 'A') {
    targetElement = targetElement.parentElement;
  }

  if (targetElement && targetElement.href) {
    const href = targetElement.href;
    const scheme = "detach://";
    if (href.startsWith(scheme)) {
      
      // Stop the browser from navigating to the 'detach://' URL
      event.preventDefault();
      event.stopPropagation?.();
      event.stopImmediatePropagation?.();

      // Extract the actual URL from after 'detach://'
      // It's crucial to decode it as it will be URL-encoded in the href
      const url = decodeURIComponent(href.substring(scheme.length));
      if (url) {
        const options = {};
        let opts = targetElement.dataset.options;
        if (opts && 'string' === typeof opts && !!(opts = opts.trim())) {
          for (const part of opts.split(',')) {
            let [key, val] = part.trim().split('=');
            if (['width', 'height', 'top', 'left'].includes(key) && Number.isInteger(val = Number(val)) && val > 0) options[key] = val;
            if (['focused', 'incognito'].includes(key) && ['true', 'false'].includes(val)) options[key] = val === 'true';
          }
        }
        console.log("Intercepted 'detach://' link. Opening:", {url, options});

        // Send the URL to the background script (default config)
        chrome.runtime.sendMessage({
          action: "openDetachedWindow",
          url,
          ...options
        }, function (response) {
          if (response && response.status === "success") {
            console.log("Detached window opened by extension.");
          } else {
            console.error("Failed to open detached window:", response ? response.message : "Unknown error");
          }
        });
      } else {
        console.warn("Invalid URL in 'detach://' link:", encodedUrlToOpen);
      }
    }
  }
});