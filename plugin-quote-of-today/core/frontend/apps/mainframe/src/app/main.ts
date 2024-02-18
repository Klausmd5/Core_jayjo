import { checkLoginState } from "./login";
import { createPluginFrame } from "../utils/frame";
import { loadMainframeConfig } from "./config";
import { addMessageListenerToFrame } from "../utils/message";
import { createIncomingMessageHandler } from "./handler";


main().catch(e => console.error(e));

// TODO: implement loading spinner
export async function main() {
    const config = await loadMainframeConfig();
    const isAuthed = await checkLoginState(config.secureBackendUrl);

    if (!isAuthed) {
        createPluginFrame(config.login.url, "login-container");

        addMessageListenerToFrame("login-container", createIncomingMessageHandler({
            config,
            sender: "auth"
        }));
    }
    else {
        createPluginFrame(config.navigation.url, "nav-container");
        addMessageListenerToFrame("nav-container", createIncomingMessageHandler({
            config,
            sender: "navigation"
        }));
    }
}
