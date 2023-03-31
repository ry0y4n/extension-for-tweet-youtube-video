let buttonWrapper;

window.addEventListener("popstate", () => {
    waitDynamicLoad();    
})

function waitDynamicLoad() {
    let timerId;
    function jsLoaded() {
        if ((buttonWrapper = document.getElementById("top-level-buttons-computed")) != null) {
            clearInterval(timerId);
    
            if (document.getElementById("extensionArea") == null) {
                addExtensionHTML();
            }
        }
    }
    timerId = setInterval(jsLoaded, 1000);
}

waitDynamicLoad();

function addExtensionHTML() {
    let tweetClipButton = document.createElement("div");
    tweetClipButton.setAttribute("id", "extensionArea");
    tweetClipButton.classList.add("yt-spec-button-shape-next", "yt-spec-button-shape-next--tonal", "yt-spec-button-shape-next--mono", "yt-spec-button-shape-next--size-m", "yt-spec-button-shape-next--icon-leading");
    tweetClipButton.innerHTML = "Tweet Video";
    tweetClipButton.style.marginRight = "8px";
    buttonWrapper.insertBefore(tweetClipButton, buttonWrapper.firstChild);

    tweetClipButton.addEventListener("click", () => {
        chrome.runtime.sendMessage({message: "from content(injected)"});
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
});
