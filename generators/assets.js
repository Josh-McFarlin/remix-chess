/* eslint-disable @typescript-eslint/no-var-requires */
const sharp = require("sharp");
const path = require("path");

const squares = {
  light: "./assets/chess/square_brown_light.png",
  dark: "./assets/chess/square_brown_dark.png",
};

const pieces = {
  P: "./assets/chess/w_pawn.png",
  N: "./assets/chess/w_knight.png",
  B: "./assets/chess/w_bishop.png",
  R: "./assets/chess/w_rook.png",
  Q: "./assets/chess/w_queen.png",
  K: "./assets/chess/w_king.png",
  p: "./assets/chess/b_pawn.png",
  n: "./assets/chess/b_knight.png",
  b: "./assets/chess/b_bishop.png",
  r: "./assets/chess/b_rook.png",
  q: "./assets/chess/b_queen.png",
  k: "./assets/chess/b_king.png",
};

const actions = {
  selected: "./assets/chess/blue_glow.png",
  destination: "./assets/chess/green_glow.png",
  error: "./assets/chess/exclamation_mark.png",
};

async function mergeImages(name, background, images = []) {
  await sharp(path.resolve(path.join(__dirname, background)))
    .composite(
      images.map((image) => ({
        input: path.resolve(path.join(__dirname, image)),
        gravity: "center",
      }))
    )
    .jpeg({
      force: true,
      mozjpeg: true,
    })
    .resize({
      width: 50,
      height: 50,
      fit: "cover",
      position: "center",
    })
    .toFile(
      path.resolve(path.join(__dirname, "..", "public", "chess", name + ".jpg"))
    );
}

(async () => {
  for (const [squareKey, squarePath] of Object.entries(squares)) {
    await mergeImages(squareKey, squarePath);

    for (const [actionKey, actionPath] of Object.entries(actions)) {
      await mergeImages(`${squareKey}_${actionKey}`, squarePath, [actionPath]);
    }

    for (const [pieceKey, piecePath] of Object.entries(pieces)) {
      const fixedPieceKey =
        pieceKey === pieceKey.toUpperCase()
          ? pieceKey + pieceKey
          : pieceKey.toUpperCase();

      await mergeImages(`${squareKey}_${fixedPieceKey}`, squarePath, [
        piecePath,
      ]);

      for (const [actionKey, actionPath] of Object.entries(actions)) {
        await mergeImages(
          `${squareKey}_${fixedPieceKey}_${actionKey}`,
          squarePath,
          [piecePath, actionPath]
        );
      }
    }
  }
})();
