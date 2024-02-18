import { IncomingMessageHandler } from "../types/handler";

export const containerHandler: IncomingMessageHandler<"container"> = (message) => {
    console.debug("Setting container size", message);
    document.getElementById("plugin-container")!.style.left = message.data.x + "px";
    document.getElementById("plugin-container")!.style.top = message.data.y + "px";
    document.getElementById("plugin-container")!.style.width = message.data.width + "px";
    document.getElementById("plugin-container")!.style.height = message.data.height + "px";
};
