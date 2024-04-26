const INITIAL_CONFIG = 'Olympus Login: //a[@id="signInButton"]\n' +
'First GProfile: //div[@data-item-index="0"]\n' +
'Continue on GLogin: //button[normalize-space()="Continue"]\n' +
'Jenkins Login: //a[normalize-space()="log in"]\n' +
'Confluence Login: //a[normalize-space()="G Suite"]\n' +
'Gateway Login: //button[normalize-space()="Sign in with a Google Account"]\n' + 
'Valhalla Login: //button[normalize-space()="Login"]';

console.log("Background JS is working...")


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message in bg with value :: ', JSON.stringify(message));

  if (message.action === 'INITIAL_CONFIG') {
    sendResponse(INITIAL_CONFIG);
  }
});