import { IncomingMessageHandler } from "../types/handler";
import { fetch2 } from "../utils/fetch";
import { sendMessageToFrame } from "../utils/message";

export const getIDTokenHandler: IncomingMessageHandler<"getIDToken"> = (_message, context) =>
    fetch2(context.config.secureBackendUrl, "/Auth/GetIDToken", "GET")
        .then(idToken => sendMessageToFrame(context.sender === "navigation" ? "nav-container" : "plugin-container", "getIDToken", idToken));
