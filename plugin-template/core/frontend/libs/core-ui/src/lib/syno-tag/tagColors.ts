const hexColors: string[] = [
  "#FF8A00",
  "#ff2f96",
  "#5919E0",
  "#0F43FF",
  "#02B8F7",
  "#09E0DD",
  "#09D698",
  "#34b907",
  "#107b06",
  "#FF0A49",
  "#91409e",
  "#FF66F4",
  "#ffb700",
];

export const tagColors: Map<string, string> = new Map<string, string>();

/*
Assigns a color to each tag that is passed to it.
The colors-array is iterated and every tag gets one of those colors, if there are more tags than colors the iteration starts from the beginning.
This method needs to be accessible from the outside so tag-colors can be set the first time tags are loaded (currently the home-component takes care of this).
That does however not pose any risks.
*/
export function setTagColors(tags: string[]) {
  for (let i = 0; i < tags.length; i++) {
    tagColors.set(tags[i], hexColors[i % hexColors.length]);
  }
}
