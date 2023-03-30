async function sendHost(url) {
  //ローカルアプリの起動
  const port = chrome.runtime.connectNative('tweet_youtube_video')

  //ローカルアプリからメッセージ受信
  port.onMessage.addListener((req) => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
    handleMessage(req)
  })

  //アプリから切断されたときの処理
  port.onDisconnect.addListener(() => {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError.message)
    }
    console.log('Disconnected')
  })

  async function handleMessage (req) {
    console.log("req.message : " + req.message);
    if (req.message === 'pong') {
      console.log(req)
    }

    let currentTab = await getCurrentTab();
    chrome.tabs.sendMessage(currentTab.id, {message: `from background`});
    console.log('sent back');
  }

  //ローカルアプリへメッセージ送信
  port.postMessage({message: 'ping', body: 'hello from browser extension', url: url});
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  console.log(request);
  let currentTab = await getCurrentTab();
  console.log(currentTab);
  await sendHost(currentTab.url);
  console.log('downloaded');
})

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (info.title != undefined && info.title != "YouTube") {
    console.log('hoge')
    console.log(info)
    chrome.scripting.executeScript({
      target: {
        tabId: tabId,
        allFrames: true
      },
      files: ["inject.js"]
    });
  }
});
