import { IncomingMessage, MessageMap } from "./handler";

export function isAnyIncomingMessage(data: unknown): data is IncomingMessage<keyof MessageMap> {
    if (typeof data !== "object" || data === null)
        return false;

    if (!("method" in data) || typeof data.method !== "string")
        return false;

    // TODO: move data guards to the HandlerDefinition interface
    switch (data.method) {
        case "getIDToken":
            return !("data" in data);
        case "getPluginList":
            return !("data" in data);
        case "loadPlugin":
            return "data" in data
                && typeof data.data === "object"
                && data.data !== null
                && "id" in data.data
                && (typeof data.data.id === "string" || data.data.id === null);
        case "container":
            return "data" in data
                && typeof data.data === "object"
                && data.data !== null
                && "x" in data.data
                && typeof data.data.x === "number"
                && "y" in data.data
                && typeof data.data.y === "number"
                && "width" in data.data
                && typeof data.data.width === "number"
                && "height" in data.data
                && typeof data.data.height === "number";
        case "getPublicKey":
            return !("data" in data);
        case "login":
            return "data" in data
                && typeof data.data === "object"
                && data.data !== null
                && "username" in data.data
                && typeof data.data.username === "string"
                && "password" in data.data
                && typeof data.data.password === "string"
                && "redirect" in data.data
                && typeof data.data.redirect === "boolean";
        case "logout":
            return !("data" in data);
        case "sendRequest":
            return "data" in data
                && typeof data.data === "object"
                && data.data !== null
                && "requestId" in data.data
                && typeof data.data.requestId === "number"
                && "method" in data.data
                && typeof data.data.method === "string"
                && ["GET", "POST", "PUT", "DELETE"].includes(data.data.method)
                && "path" in data.data
                && typeof data.data.path === "string"
                && "payload" in data.data
                && (typeof data.data.payload === "string" || data.data.payload === null);
        case "saveToken":
            return "data" in data
                && typeof data.data === "object"
                && data.data !== null
                && "token" in data.data
                && typeof data.data.token === "string";
        default:
            return false;
    }
    return false;
}
