const screenNametoXPathMap = new Map([
  ['Olympus Login', '//a[@id="signInButton"]'],
  ['First GProfile', '//div[@data-item-index="0"]'],
  ['Continue on GLogin', '//button[normalize-space()="Continue"]'],
  ['Jenkins Login', '//a[normalize-space()="log in"]'],
  ['Confluence Login', '//a[normalize-space()="G Suite"]'],
  ['Gateway Login', '//button[normalize-space()="Sign in with a Google Account"]'],
  ['Valhalla Login', '//button[normalize-space()="Login"]']
]);


console.log('Running auto login on :: ', window.location.href);
setTimeout(() => main(0), 150);

function main(attemptCount) {
  console.log('Attempt number :: ', attemptCount);
  try {
    let isActionTaken = false;
    for (const [key, value] of screenNametoXPathMap) {
      isActionTaken = isActionTaken || clickUsingXPath(key, value);
    }
    if (!isActionTaken && attemptCount < 5) {
      setTimeout(() => main(attemptCount + 1), 300);
    }
  } catch (error) {
    console.error('Failed to execute script due to :: ', error);
  }
}

function clickUsingXPath(screenName, xpath) {
  let targetElement = document.evaluate(xpath, document, null, 
    XPathResult.FIRST_ORDERED_NODE_TYPE, null)
  .singleNodeValue;

  if (targetElement) {
    targetElement.click();
    console.log(`Successfully clicked using xpath :: ${xpath} on screen :: ${screenName}`);
    return true;
  }
  return false;
}