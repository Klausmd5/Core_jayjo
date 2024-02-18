import {IncomingMessageHandler} from "../types/handler";
import {fetch2} from "../utils/fetch";
import {clearFrameContainer, createPluginFrame} from "../utils/frame";
import {addMessageListenerToFrame} from "../utils/message";
import {createIncomingMessageHandler} from "../app/handler";

export const saveToken: IncomingMessageHandler<"saveToken"> = (message, context) => {
       if(message.data.token === null) return;
       fetch2(context.config.secureBackendUrl, "/Pw/SetEduvidualToken", "POST", JSON.stringify(message.data.token))
           .then(_ => {
               clearFrameContainer("login-container");
               createPluginFrame(context.config.navigation.url, "nav-container");
               addMessageListenerToFrame("nav-container", createIncomingMessageHandler({
                   config: context.config,
                   sender: "navigation"
               }));
           })
           .catch(e => console.log(e));
}
