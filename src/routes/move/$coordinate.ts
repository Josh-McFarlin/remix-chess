/**
 * The API route to handle a move
 */
import type { LoaderFunction } from "remix";
import { loadGame } from "~/utils/chess";
import { redirect } from "remix";

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const gameId =
    request.headers.get("referer") === "https://remix-chess.fly.dev/"
      ? request.headers.get("Fly-Client-IP") || "GENERAL"
      : "GENERAL";
  const redirectUrl =
    request.headers.get("referer") === "https://remix-chess.fly.dev/"
      ? "https://remix-chess.fly.dev/"
      : "https://github.com/Josh-McFarlin";
  const { coordinate } = params;

  if (!gameId || !coordinate) {
    return new Response("Please provide all parameters!", {
      status: 500,
    });
  }

  try {
    const upperCoord = coordinate.toUpperCase();

    const game = loadGame(gameId);

    if (game.selectedPiece == null || game.selectedPiece === upperCoord) {
      game.select(upperCoord);
    } else {
      game.move(upperCoord);
    }

    return redirect(redirectUrl);
  } catch (error) {
    console.error(error);

    return redirect(redirectUrl);
  }
};
