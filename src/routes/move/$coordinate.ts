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
  const gameId = request.headers.get("x-forwarded-for") || "GENERAL";
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

    const redirectUrl = request.headers.get("referer") || "/";

    return redirect(redirectUrl);
  } catch (error) {
    console.error(error);

    return new Response("Failed!", {
      status: 500,
    });
  }
};
