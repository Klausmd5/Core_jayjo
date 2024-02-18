import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";

export const sendRequest: IncomingMessageHandler<"sendRequest"> = (message, context) => {
    fetch(context.config.secureBackendUrl + message.data.path, {
        method: message.data.method,
        body: message.data.payload ?? undefined,
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(response => sendMessageToFrame("plugin-container", "sendRequest", {
            response,
            error: false,
            requestId: message.data.requestId
        }))
        .catch(error => sendMessageToFrame("plugin-container", "sendRequest", {
            response: error,
            error: true,
            requestId: message.data.requestId
        }));
};
