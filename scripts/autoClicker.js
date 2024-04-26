console.log('Running auto clicker on :: ', window.location.href);
setTimeout(() => main(0), 250);

async function main(attemptCount) {
  console.log('Attempt number :: ', attemptCount);
  try {
    let isActionTaken = false;
    let screenNametoXPathMap = await getScreenNametoXPathMap();
    for (const [key, value] of screenNametoXPathMap) {
      isActionTaken = isActionTaken || clickUsingXPath(key, value);
    }
    if (!isActionTaken && attemptCount < 5) {
      setTimeout(() => main(attemptCount + 1), 250);
    }
  } catch (error) {
    console.error('Failed to execute script due to :: ', error);
  }
}

function clickUsingXPath(screenName, xPath) {
  let targetElement = document.evaluate(xPath, document, null, 
    XPathResult.FIRST_ORDERED_NODE_TYPE, null)
  .singleNodeValue;

  if (targetElement) {
    targetElement.click();
    console.log(`Successfully clicked using xPath :: ${xPath} on screen :: ${screenName}`);
    return true;
  }

  return false;
}