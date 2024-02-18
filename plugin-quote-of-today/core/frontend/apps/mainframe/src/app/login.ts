export function sendSuccessMessageToLogin() {
    const frame = document.getElementById("login-container")?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: "success" }, "*");
}

export function sendErrorMessageToLogin(message: string) {
    const frame = document.getElementById("login-container")?.firstChild as HTMLIFrameElement;
    frame.contentWindow?.postMessage({ method: "error", data: { message } }, "*");
}

export async function checkLoginState(secureBackendUrl: string) {
    try {
        const response = await fetch(secureBackendUrl + "/Auth/IsAuthed", { credentials: "include" });
        if (response.status === 401)
            return false;
        const isAuthed = await response.json();
        return isAuthed === true;
    } catch (e) {
        console.error("Failed to check login state", e);
        return false;
    }
}
