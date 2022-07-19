import type { OverlayOptions } from "sharp";
import TextToSVG from "text-to-svg";
const textToSVG = TextToSVG.loadSync();

const makeTextSvg = (text: string, fontSize: number): string =>
  textToSVG.getSVG(text, {
    x: 0,
    y: 0,
    fontSize,
    anchor: "left top",
    attributes: {
      fill: "white",
      stroke: "white",
    },
  });

export const makeText = (...textRows: string[]): OverlayOptions[] =>
  textRows.map((text, index) => ({
    input: Buffer.from(makeTextSvg(text, 24)),
    gravity: "northwest",
    left: 8,
    top: (24 + 8) * index + 8,
  }));
