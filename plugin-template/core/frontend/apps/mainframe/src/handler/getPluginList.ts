import { IncomingMessageHandler } from "../types/handler";
import { sendMessageToFrame } from "../utils/message";

export const getPluginListHandler: IncomingMessageHandler<"getPluginList"> = (_message, context) => {
    const plugins = Object.entries(context.config.plugins).map(([name, plugin]) => {
        return {
            id: name,
            name: plugin.info.name,
            description: plugin.info.description,
            teachers: plugin.info.teachers,
            tags: plugin.info.tags,
            startDate: plugin.info.startDate,
            endDate: plugin.info.endDate,
            image: plugin.info.image,
            targetUserGroups: plugin.info.targetUserGroups
        };
    });

    sendMessageToFrame("nav-container", "getPluginList", plugins);
};
