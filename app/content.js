let buttonWrapper;

let jsInitCheckTimer = setInterval(jsLoaded, 1000);
function jsLoaded() {
    if ((buttonWrapper = document.getElementById("top-level-buttons-computed")) != null) {
        console.log(buttonWrapper)
        clearInterval(jsInitCheckTimer);

        addExtensionHTML();

        tweetClipButton.addEventListener("click", () => {
            console.log("clicked")
            chrome.runtime.sendMessage({message: "from content(injected)"});
        });
    }
}

function addExtensionHTML() {
    let tweetClipButton = document.createElement("button");
    tweetClipButton.classList.add("yt-spec-button-shape-next", "yt-spec-button-shape-next--tonal", "yt-spec-button-shape-next--mono", "yt-spec-button-shape-next--size-m", "yt-spec-button-shape-next--icon-leading");
    tweetClipButton.innerHTML = "Share";
    tweetClipButton.style.marginRight = "10px";

    let startTimeInput = document.createElement("input");
    startTimeInput.setAttribute("type", "number");
    startTimeInput.style.width = "50px";
    startTimeInput.style.height = "20px";

    let interim = document.createElement("label");
    interim.innerHTML = ":"

    let endTimeInput = document.createElement("input");
    endTimeInput.setAttribute("type", "number");
    endTimeInput.style.width = "50px";
    endTimeInput.style.height = "20px";

    let sheets = document.styleSheets;
    let sheet = sheets[sheets.length - 1];

    sheet.insertRule(
        `
            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
        `,
        sheet.cssRules.length
    );

    sheet.insertRule(
        `
            input[type="number"] {
                border: 2px solid #4A4A4A;
                border-radius: 20px;
                text-align: center;
                caret-color: #4A4A4A;
            }
        `,
        sheet.cssRules.length
    );

    sheet.insertRule(
        `
            input[type="number"]:focus {
                outline: 2px solid #4A4A4A;
            }
        `,
        sheet.cssRules.length
    );

    let extensionDiv = document.createElement("div");
    extensionDiv.classList.add("yt-spec-button-shape-next", "yt-spec-button-shape-next--tonal", "yt-spec-button-shape-next--mono", "yt-spec-button-shape-next--size-m", "yt-spec-button-shape-next--icon-leading");
    extensionDiv.style.marginRight = "8px";
    extensionDiv.style.paddingLeft = "0px";
    buttonWrapper.insertBefore(extensionDiv, buttonWrapper.firstChild);
    extensionDiv.appendChild(tweetClipButton);
    extensionDiv.appendChild(startTimeInput);
    extensionDiv.appendChild(interim);
    extensionDiv.appendChild(endTimeInput);

    tweetClipButton.addEventListener("click", () => {
        console.log("clicked")
        chrome.runtime.sendMessage({message: "from content(injected)"});
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
});
