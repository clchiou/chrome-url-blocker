chrome.runtime.onInstalled.addListener(() => {
  // Initialize patterns.
  chrome.storage.sync.set({patterns: []});
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = request.url;
  chrome.storage.sync.get(
    {
      patterns: [],
    },
    (items) => {
      if (!items.patterns.some((pattern) => {
        let block = true;
        if (typeof pattern !== 'string') {
          block = (pattern.action || 'block') === 'block';
          pattern = pattern.pattern;
        }
        if (new RegExp(pattern).test(url)) {
          sendResponse({block});
          return true;
        } else {
          return false;
        }
      })) {
        sendResponse({block: false});
      }
    }
  );
  // Returning true makes sendResponse asynchronous (i.e., connection is
  // kept after onMessage handler returns).
  return true;
});
