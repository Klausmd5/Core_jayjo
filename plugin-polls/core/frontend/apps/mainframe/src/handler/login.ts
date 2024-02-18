import {sendErrorMessageToLogin, sendSuccessMessageToLogin} from "../app/login";
import { IncomingMessageHandler } from "../types/handler";
import { clearFrameContainer, createPluginFrame } from "../utils/frame";
import {addMessageListenerToFrame} from "../utils/message";
import {createIncomingMessageHandler} from "../app/handler";

export const login: IncomingMessageHandler<"login"> = (message, context) => {
    fetch(context.config.secureBackendUrl + "/Auth/Login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
            "username": message.data.username.trim(),
            "password": message.data.password.trim()
        })
    }).then(response => {
        if (response.status !== 200) {
            throw response.json();
        } else {
            if (message.data.redirect) {
                clearFrameContainer("login-container");
                createPluginFrame(context.config.navigation.url, "nav-container");
                addMessageListenerToFrame("nav-container", createIncomingMessageHandler({
                    config: context.config,
                    sender: "navigation"
                }));
            }
            sendSuccessMessageToLogin();
            return;
        }

    }).catch(e => {
        if(e instanceof Promise) {
            e.then((error: any) => {
                if (typeof error === "string")
                    sendErrorMessageToLogin(error);
                else
                    sendErrorMessageToLogin("Es ist ein unbekannter Fehler aufgetreten!");
            });
            return;
        }
        console.error("Failed to login", e);
        if (e !== null && typeof e === "object" && "message" in e && typeof e.message === "string")
            sendErrorMessageToLogin(e.message);
        else
            sendErrorMessageToLogin("Es ist ein unbekannter Fehler aufgetreten!");
    });
}
