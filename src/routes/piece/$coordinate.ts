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
      "Cache-Control": "private, no-cache, no-store, must-revalidate",
      Expires: "-1",
      Pragma: "no-cache",
    },
  });
};
