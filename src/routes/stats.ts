/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "@remix-run/node";
import { gameRoom } from "~/utils/GameRoom";

import sharp from "sharp";

import { isFromGithub } from "~/utils/http";
import { makeText } from "~/utils/image";

export const loader: LoaderFunction = async ({
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const isGithub = isFromGithub(request);
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
        width: 280,
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
        "Content-Type": "image/jpeg",
        "Content-Length": statsImage.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Expires: "-1",
        "Last-Modified": "Mon, 01 Jan 2999 00:00:00 GMT",
        Etag: Date.now().toString(),
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
