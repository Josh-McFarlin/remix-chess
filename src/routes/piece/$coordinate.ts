/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "@remix-run/node";
import { gameRoom } from "~/utils/GameRoom";
import type Game from "~/utils/Game";
import { isFromGithub } from "~/utils/http";
import fs from "fs";
import path from "path";

const isSquareLight = (coordinate: string): boolean => {
  const ascii = coordinate.charCodeAt(0);
  const num = parseInt(coordinate.charAt(1));

  return (ascii + num) % 2 !== 0;
};

const getGamePiece = (game: Game, coordinate: string): string => {
  let key = "";

  if (isSquareLight(coordinate)) {
    key += "light";
  } else {
    key += "dark";
  }

  const { pieces, moves, check } = game.toJSON().game;

  let piece = null;
  if (Object.prototype.hasOwnProperty.call(pieces, coordinate)) {
    piece = pieces[coordinate];
    const fixedPiece =
      piece === piece.toUpperCase() ? piece + piece : piece.toUpperCase();
    key += "_" + fixedPiece;
  }

  if (game.selectedPiece === coordinate) {
    key += "_selected";
  } else if (check && piece === "K") {
    key += "_error";
  }

  if (
    game.selectedPiece != null &&
    Object.prototype.hasOwnProperty.call(moves, game.selectedPiece) &&
    moves[game.selectedPiece].includes(coordinate)
  ) {
    key += "_destination";
  }

  return key + ".jpg";
};

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const isGithub = isFromGithub(request);
  const gameId = isGithub
    ? "GENERAL"
    : request.headers.get("Fly-Client-IP") || "GENERAL";
  const { coordinate } = params;

  if (!gameId || !coordinate) {
    return new Response("Please provide all parameters!", {
      status: 500,
    });
  }

  try {
    const currentCoord = coordinate.toUpperCase();
    const game = gameRoom.getGame(gameId);

    const piece = getGamePiece(game, currentCoord);
    const img = fs.readFileSync(path.join("public", "chess", piece));

    return new Response(img, {
      status: 200,
      headers: {
        "Content-Type": "image/jpeg",
        "Content-Length": img.length.toString(),
        "Cache-Control": "no-cache, no-store",
        Expires: "-1",
        "Last-Modified": "Mon, 01 Jan 2999 00:00:00 GMT",
        Etag: Date.now().toString(),
        Pragma: "no-cache",
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed", {
      status: 500,
    });
  }
};
