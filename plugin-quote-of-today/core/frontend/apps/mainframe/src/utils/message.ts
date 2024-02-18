export function sendMessageToFrame(container: string, method: string, message: unknown, transferableObjects: Transferable[] = []) {
    const frame = document.getElementById(container)?.firstChild as HTMLIFrameElement;
    const postMessage = { method, data: message };
    frame.contentWindow?.postMessage(postMessage, "*", transferableObjects);
    console.debug("Sending message to frame", container, postMessage);
}

export function waitForMessageFromFrame(containerId: string, filter: (message: unknown) => boolean): Promise<unknown> {
    return new Promise(resolve => {
        const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;

        const listener = (event: MessageEvent) => {
            if (event.source !== frame.contentWindow) {
                console.debug("Ignoring message from unknown source", event);
                return;
            }

            if (filter(event.data)) {
                window.removeEventListener("message", listener);
                resolve(event.data);
            }
        };
        window.addEventListener("message", listener);
    });
}

export function addMessageListenerToFrame(containerId: string, callback: (event: MessageEvent) => void | Promise<void>) {
    const frame = document.getElementById(containerId)?.firstChild as HTMLIFrameElement;
    window.addEventListener("message", event => {
        if (event.source !== frame.contentWindow) return;

        const result = callback(event.data);
        if (result === undefined) return;

        result.catch((e: unknown) => console.error("Error while handling message", e));
    });
}
