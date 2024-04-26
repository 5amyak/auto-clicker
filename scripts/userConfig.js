const CONFIG_KEY = 'userConfig';

function setScreenNametoXPathMap(userConfig) {
  chrome.storage.local.set({ [CONFIG_KEY]: userConfig }, () => {
    console.log("Updated userConfig with values :: \n", userConfig);
  });
}

async function getScreenNametoXPathMap() {
  let localStorage = await chrome.storage.local.get(CONFIG_KEY);
  let userConfig = localStorage[CONFIG_KEY];
  if (userConfig == null) {
    userConfig = await chrome.runtime.sendMessage({ action: 'INITIAL_CONFIG' });
    setScreenNametoXPathMap(userConfig);
  }

  let screenNametoXPathMap = new Map();
  const lines = userConfig.split("\n");
  for (const line of lines) {
    const items = line.split(":");
    if (items.length != 2) {
      console.error("Invalid line found :: ", line);
      continue;
    }

    const screenName = items[0].trim();
    const xPath = items[1].trim();
    screenNametoXPathMap.set(screenName, xPath);
  }

  return screenNametoXPathMap;
}

// Listen for messages
chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log(`Received msg with action :: ${JSON.stringify(msg.action)}`);

  if (msg.action === 'UPDATE_CONFIG') {
    setScreenNametoXPathMap(msg.data);
    main(1);
  }
});