async function sendHost(url, tabId, title) {
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
    console.log("Tweet Finished");
    chrome.tabs.sendMessage(tabId, {message: `Tweet Finished`});
  }

  //ローカルアプリへメッセージ送信
  port.postMessage({message: 'ping', body: 'hello from browser extension', url: url, title: title});
  chrome.tabs.sendMessage(tabId, {message: `Tweet Start`});
  console.log("Tweet Start");
}

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  await sendHost(sender.tab.url, sender.tab.id, sender.tab.title);
})

chrome.tabs.onUpdated.addListener(async (tabId, info, tab) => {
  if (tab?.url?.indexOf("https://www.youtube.com/watch?") == -1) return;
  if (info.title != undefined && info.title != "YouTube") {
    console.log(info)
    chrome.scripting.executeScript({
      target: {
        tabId: tabId,
        allFrames: false
      },
      files: ["inject.js"]
    });
  }
});
