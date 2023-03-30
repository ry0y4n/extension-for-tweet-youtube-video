window.addEventListener("load", () => {
    const currentUrl = window.location.href;
    console.log(currentUrl);
    
    let buttonWrapper;
    
    const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    function jsLoaded() {
        if ((buttonWrapper = document.getElementById("top-level-buttons-computed")) != null) {
            clearInterval(jsInitCheckTimer);

            let tweetClipButton = document.createElement("button");
            tweetClipButton.innerHTML = "Share";
            tweetClipButton.classList.add("yt-spec-button-shape-next", "yt-spec-button-shape-next--tonal", "yt-spec-button-shape-next--mono", "yt-spec-button-shape-next--size-m", "yt-spec-button-shape-next--icon-leading")
            tweetClipButton.style.marginRight = "8px"
            buttonWrapper.insertBefore(tweetClipButton, buttonWrapper.firstChild);
            buttonWrapper.addEventListener("click", () => {
                chrome.runtime.sendMessage({message: "from content"});
            })
        }
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log(request);
    });
})
