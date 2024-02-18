import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";

export const getPublicKeyHandler: IncomingMessageHandler<"getPublicKey"> = (_message, context) => {
    fetch(context.config.secureBackendUrl + "/Auth/GetPublicKey", { credentials: "include" })
        .then(response => response.arrayBuffer())
        .then(publicKey => sendMessageToFrame(context.sender == "auth" ? "login-container" : "nav-container", "getPublicKey", publicKey, [publicKey]));
};
