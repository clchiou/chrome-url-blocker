chrome.runtime.sendMessage(
  {
    url: window.location.href,
  },
  (response) => {
    if (response.block) {
      window.location.href = 'about:blank#url-blocked-by-extension';
    }
  }
);
