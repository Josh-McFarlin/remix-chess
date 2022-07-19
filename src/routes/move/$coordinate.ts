/**
 * The API route to handle a move
 */
import type { LoaderFunction } from "@remix-run/node";
import { gameRoom } from "~/utils/GameRoom";
import { redirect } from "@remix-run/node";
import { isFromGithub } from "~/utils/http";

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const isGithub = isFromGithub(request);
  const gameId = isGithub
    ? "GENERAL"
    : request.headers.get("Fly-Client-IP") || "GENERAL";
  const redirectUrl = isGithub ? "https://github.com/Josh-McFarlin" : "/";

  const { coordinate } = params;

  if (!gameId || !coordinate) {
    return new Response("Please provide all parameters!", {
      status: 500,
    });
  }

  try {
    const selectedCoord = coordinate.toUpperCase();
    const game = gameRoom.getGame(gameId);

    if (game.isFinished) {
      game.restart();
    } else {
      if (game.selectedPiece === selectedCoord) {
        game.deselect();
      } else if (
        game.selectedPiece == null ||
        !game.moves.includes(selectedCoord)
      ) {
        game.select(selectedCoord);
      } else {
        game.move(selectedCoord);
      }
    }

    gameRoom.saveGame(game);

    return redirect(redirectUrl);
  } catch (error) {
    console.error(error);

    return redirect(redirectUrl);
  }
};
