import { HandlerMap, IncomingMessage, MainframeContext, MessageMap } from "../types/handler";
import { getIDTokenHandler } from "../handler/getIDToken";
import { getPluginListHandler } from "../handler/getPluginList";
import { loadPluginHandler } from "../handler/loadPlugin";
import { containerHandler } from "../handler/container";
import { getPublicKeyHandler } from "../handler/getPublicKey";
import { sendRequest } from "../handler/sendRequest";
import { isAnyIncomingMessage } from "../types/handler.guards";
import {logout} from "../handler/logout";
import {saveToken} from "../handler/saveToken";
import { login } from "../handler/login";

const handler: Partial<HandlerMap> = {
    "getIDToken": {
        handler: getIDTokenHandler,
        isAllowed: context => context.sender === "navigation" || context.sender === "plugin"
    },
    "getPluginList": {
        handler: getPluginListHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "loadPlugin": {
        handler: loadPluginHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "container": {
        handler: containerHandler,
        isAllowed: context => context.sender === "navigation"
    },
    "getPublicKey": {
        handler: getPublicKeyHandler,
        isAllowed: context => context.sender === "auth" || context.sender === "navigation"
    },
    "sendRequest": {
        handler: sendRequest,
        // TODO: fix security issue
        isAllowed: (context, _message) => context.sender === "plugin"
    },
    "logout": {
        handler: logout,
        isAllowed: context => context.sender === "navigation"
    },
    "saveToken": {
        handler: saveToken,
        isAllowed: context => context.sender === "auth" || context.sender === "navigation"
    },
    "login": {
        handler: login,
        isAllowed: context => context.sender === "auth" || context.sender === "navigation"
    }
};

export const handleIncomingMessage = <Method extends keyof MessageMap>(message: IncomingMessage<Method>, context: MainframeContext) => {
    const handlerDefinition = handler[message.method] as HandlerMap[Method];

    if (handlerDefinition.isAllowed(context, message)) {
        console.debug("Handling message", message);
        handlerDefinition.handler(message, context);
    } else {
        console.error("Message not allowed!", message);
    }
};

export const createIncomingMessageHandler = (context: MainframeContext) => (message: unknown) => {
    if (!isAnyIncomingMessage(message)) {
        console.warn("Ignoring invalid message", message);
        return;
    }

    handleIncomingMessage(message, context);
};
