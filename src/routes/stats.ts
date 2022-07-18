/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "@remix-run/node";
import { gameRoom } from "~/utils/GameRoom";
import type { OverlayOptions } from "sharp";
import sharp from "sharp";
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

const makeText = (...textRows: string[]): OverlayOptions[] =>
  textRows.map((text, index) => ({
    input: Buffer.from(makeTextSvg(text, 24)),
    gravity: "northwest",
    left: 8,
    top: (24 + 8) * index + 8,
  }));

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const isGithub =
    request.headers.get("referer") != null &&
    request.headers.get("referer")!.includes("github.com");
  const gameId = isGithub
    ? "GENERAL"
    : request.headers.get("Fly-Client-IP") || "GENERAL";

  if (!gameId) {
    return new Response("Please provide all parameters!", {
      status: 500,
    });
  }

  try {
    const game = gameRoom.getGame(gameId);

    const statsImage = await sharp({
      create: {
        width: 260,
        height: 168,
        channels: 4,
        background: { r: 124, g: 76, b: 62, alpha: 1 },
      },
    })
      .composite(
        makeText(
          `Game Stats:`,
          `Round: ${game.stats.round}`,
          `AI Wins: ${game.stats.aiWins}`,
          `Player Wins: ${game.stats.playerWins}`,
          `Total Moves: ${game.stats.totalMoves}`
        )
      )
      .jpeg({
        force: true,
        mozjpeg: true,
      })
      .toBuffer();

    return new Response(statsImage, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": statsImage.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Expires: "-1",
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response(error.message || error, {
      status: 500,
    });
  }
};
