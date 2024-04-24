chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.status && changeInfo.status == "complete") {
    if (tab.url) {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files : [ "scripts/autoLogin.js" ]
      })
      .then(() => console.log("Content Script Injected!!!"));
    }
  }
});
