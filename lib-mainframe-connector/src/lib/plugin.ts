export interface Plugin {
    // name of plugin - example: "Religion_abmelden"
    name: string,

    // teachers of plugin - example for Religion_abmelden: ["Mairinger", "Mörixbauer"]
    teachers: string[],

    // additional description of plugin - example for Religion_abmelden: "Religionsabmeldung der Schüler in der ersten Schulwoche"
    description: string | null,

    // tags for this plugin - example for Religion_abmelden: ["Erste Schulwoche", "Religion"]
    tags: string[],

    // startDate for plugin - example for Religion_abmelden: "1662789600" (Datum des ersten Schultags als UnixTimeStamp mit Sekunden)
    startDate: string | null,

    // endDate for plugin - example for Religion_abmelden: "1663221600" (Datum des ersten Freitags im Schuljahr als UnixTimeStamp mit Sekunden)
    endDate: string | null,

    // imageLink for plugin - emaple for Religion_abmelden: https://www.soulsaver.de/wp-content/uploads/2022/05/Soulsaver-Bildgroesse-26.jpg
    image: string | null,

    // whether the user added this course to their favourites
    isFavourite: boolean;
}
