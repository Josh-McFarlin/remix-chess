/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { gameRoom } from "~/utils/GameRoom";
import type Game from "~/utils/Game";

const isSquareLight = (coordinate: string): boolean => {
  const ascii = coordinate.charCodeAt(0);
  const num = parseInt(coordinate.charAt(1));

  return (ascii + num) % 2 !== 0;
};

const getGamePiece = (game: Game, coordinate: string): string => {
  let key = "/chess/";

  if (isSquareLight(coordinate)) {
    key += "light";
  } else {
    key += "dark";
  }

  const { pieces, moves } = game.toJSON().game;

  if (Object.prototype.hasOwnProperty.call(pieces, coordinate)) {
    const piece = pieces[coordinate];
    const fixedPiece =
      piece === piece.toUpperCase() ? piece + piece : piece.toUpperCase();
    key += "_" + fixedPiece;
  }

  if (game.selectedPiece === coordinate) {
    key += "_" + "selected";
  }

  if (
    game.selectedPiece != null &&
    Object.prototype.hasOwnProperty.call(moves, game.selectedPiece) &&
    moves[game.selectedPiece].includes(coordinate)
  ) {
    key += "_" + "destination";
  }

  return key + ".jpg";
};

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const isGithub =
    request.headers.get("referer") != null &&
    request.headers.get("referer")!.includes("github.com");
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

    return redirect(getGamePiece(game, currentCoord), {
      status: 302,
      headers: {
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
        Expires: "-1",
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
