export async function fetch2(secureBackendUrl: string, requestPath: string, method: string, body: string | undefined = undefined) {
    const response = await fetch(secureBackendUrl + requestPath, {
        method,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials: "include",
        body
    });

    if (response.ok) {
        const res = await response.text();
        if (res === "") return null;
        return JSON.parse(res);
    }
    const error = await response.json();

    if (typeof error === "string")
        throw new Error(error);

    throw new Error("Es ist ein unbekannter Fehler aufgetreten!");
}
