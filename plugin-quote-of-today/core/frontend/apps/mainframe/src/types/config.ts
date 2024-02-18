export interface MainframeConfig {
    plugins: Record<string, MainframePlugin>;
    login: { url: string };
    navigation: { url: string };
    secureBackendUrl: string;
}

export interface MainframePlugin {
    url?: string;
    permissions: string[];
    info: MainframePluginInfos;
}

export interface MainframePluginInfos {
    name: string;
    description: string;
    teachers: string[];
    tags: string[];
    startDate: string; // TODO: Change this in the config, as this should really be of type number
    endDate: string;
    image: string;
    targetUserGroups?: Array<"staff" | "teacher" | "student">;
}
