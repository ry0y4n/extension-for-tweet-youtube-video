let buttonWrapper;

let jsInitCheckTimer = setInterval(jsLoaded, 1000);
function jsLoaded() {
    if ((buttonWrapper = document.getElementById("top-level-buttons-computed")) != null) {
        clearInterval(jsInitCheckTimer);

        addExtensionHTML();
    }
}

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
