type FrameID = `${"login" | "nav" | "plugin"}-container`;

export function clearFrameContainer(targetDivId: FrameID) {
    const targetDiv = document.getElementById(targetDivId) as HTMLDivElement;
    while (targetDiv.firstChild) {
        targetDiv.removeChild(targetDiv.firstChild);
    }
    targetDiv.style.zIndex = "-1";
}

export function createPluginFrame(url: string, targetDivId: FrameID) {
    const newFrame = document.createElement("iframe");
    newFrame.src = url;
    const targetDiv = document.getElementById(targetDivId)!;
    targetDiv.appendChild(newFrame);
    targetDiv.style.zIndex = "1";
}
