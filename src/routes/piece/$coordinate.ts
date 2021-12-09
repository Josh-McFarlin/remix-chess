/**
 * The API route to serve the image asset
 */
import type { LoaderFunction } from "remix";
import { getGamePiece } from "~/utils/chess";

export const loader: LoaderFunction = async ({
  params,
  request,
}): Promise<Response> => {
  // GitHub disables this functionality, so serve GENERAL game on GitHub
  const gameId =
    request.headers.get("referer") === "https://remix-chess.fly.dev/"
      ? request.headers.get("Fly-Client-IP") || "GENERAL"
      : "GENERAL";
  const { coordinate } = params;

  const upperCoord = (coordinate || "").toUpperCase();

  const piece = await getGamePiece(gameId, upperCoord);

  const img = Buffer.from(
    piece.replace(/^data:image\/\w+;base64,/, ""),
    "base64"
  );

  return new Response(img, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Length": img.length.toString(),
      "Cache-Control": "max-age=5",
    },
  });
};
