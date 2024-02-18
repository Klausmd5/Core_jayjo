import { MainframeConfig } from "./config";

export type MessageMap = {
    "getIDToken": undefined;
    "getPluginList": undefined;
    "loadPlugin": { id: string | null };
    "container": { x: number; y: number; width: number; height: number };
    "getPublicKey": undefined;
    "sendRequest": { requestId: number, method: "GET" | "POST" | "PUT" | "DELETE", path: string, payload: string | null };
    "login": { username: string; password: string, redirect: boolean };
    "logout": undefined;
    "saveToken": { token: string };
};

export interface IncomingMessage<Method extends keyof MessageMap> {
    method: Method;
    data: MessageMap[Method];
}

type SenderProperty = { sender: "navigation" | "auth" } | { sender: "plugin", pluginId: string };

export type MainframeContext = {
    config: MainframeConfig;
} & SenderProperty;

export type IncomingMessageHandler<Method extends keyof MessageMap> = (message: IncomingMessage<Method>, context: MainframeContext) => void;

export interface HandlerDefinition<Method extends keyof MessageMap> {
    handler: IncomingMessageHandler<Method>;
    isAllowed: (context: MainframeContext, message: IncomingMessage<Method>) => boolean;
}

export type HandlerMap = {
    [Method in keyof MessageMap]: HandlerDefinition<Method>;
}
