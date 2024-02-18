import { IncomingMessageHandler } from "../types/handler";
import { clearFrameContainer, createPluginFrame } from "../utils/frame";
import { addMessageListenerToFrame } from "../utils/message";
import { createIncomingMessageHandler } from "../app/handler";

export const loadPluginHandler: IncomingMessageHandler<"loadPlugin"> = (message, context) => {
    if (message.data.id === null) {
        clearFrameContainer("plugin-container");
        return;
    }

    const plugin = context.config.plugins[message.data.id];
    if (plugin === undefined) {
        console.error("Could not find plugin", message.data.id);
        return;
    }

    clearFrameContainer("plugin-container");

    const pluginURL = plugin.url ?? document.location.origin.replace("mainframe", message.data.id + ".plugin");

    createPluginFrame(pluginURL, "plugin-container");
    addMessageListenerToFrame("plugin-container", createIncomingMessageHandler({
        config: context.config,
        sender: "plugin",
        pluginId: message.data.id
    }));
};
