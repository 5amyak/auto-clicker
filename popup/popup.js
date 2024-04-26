const CONFIG_KEY = 'userConfig';

document.addEventListener('DOMContentLoaded', () => {
  console.log('POPUP JS is Working...');

  if (localStorage.getItem(CONFIG_KEY) === null) {
    chrome.runtime.sendMessage({ action: 'INITIAL_CONFIG' }, (response) => {
      saveConfig(response, false);
      initPopupForm();
    });
  } else {
    initPopupForm();
  }
});

let initPopupForm = () => {
  const textArea = document.getElementById('configTextarea');
  textArea.value = localStorage.getItem(CONFIG_KEY);

  const saveButton = document.getElementById('saveConfig');
  saveButton.addEventListener('click', () => saveConfig(textArea.value));
}

let saveConfig = (config, isUpdate = true) => {
  localStorage.setItem(CONFIG_KEY, config);
  
  console.log("Local storage saved with value :: ", localStorage);
  if (isUpdate) sendConfig();
}

let sendConfig = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const activeTab = tabs[0];
    const message = {
      action: "UPDATE_CONFIG",
      data: localStorage.getItem(CONFIG_KEY)
    };
    chrome.tabs.sendMessage(activeTab.id, message);
  });
}