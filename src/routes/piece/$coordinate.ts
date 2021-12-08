/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "remix";
import { getGamePiece } from "~/utils/chess";

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

    const piece = await getGamePiece(gameId, upperCoord);
    const img = Buffer.from(piece, "base64");

    return new Response(img, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": img.length.toString(),
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed!", {
      status: 500,
    });
  }
};
