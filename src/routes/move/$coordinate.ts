/**
 * The API route to handle a move
 */
import type { LoaderFunction } from "remix";
import { loadGame } from "~/utils/chess";

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
    const state =
      game.selectedPiece == null
        ? game.select(upperCoord)
        : game.move(upperCoord);
    const stateStr = JSON.stringify(state, null, 2);

    return new Response(stateStr, {
      status: 200,
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed!", {
      status: 500,
    });
  }
};
