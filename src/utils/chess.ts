import type { GameConfig } from "js-chess-engine";
import jsChessEngine from "js-chess-engine";
import type { Cache } from "flat-cache";
import flatCache from "flat-cache";
import mergeImages from "merge-images";
import { Canvas, Image } from "canvas";

const imagePath = "../assets/chess";
const piecesToImages = {
  P: "w_pawn.png",
  N: "w_knight.png",
  B: "w_bishop.png",
  R: "w_rook.png",
  Q: "w_queen.png",
  K: "w_king.png",
  p: "b_pawn.png",
  n: "b_knight.png",
  b: "b_bishop.png",
  r: "b_rook.png",
  q: "b_queen.png",
  k: "b_king.png",
};
const lightSquare = "square_brown_light.png";
const darkSquare = "square_brown_dark.png";
const pendingMove = "blue_glow.png";

const aiLevel = 1;
const gameKey = "GAME";
const selKey = "SELECTED";

class Game {
  readonly gameId: string;
  readonly #cache: Cache;
  readonly #game: jsChessEngine.Game;
  selectedPiece: string | null;

  constructor(gameId: string) {
    this.gameId = gameId;
    this.#cache = flatCache.load(gameId);

    const storedGame = this.#cache.getKey(gameKey);
    if (storedGame != null) {
      this.#game = new jsChessEngine.Game(storedGame);
      this.selectedPiece = this.#cache.getKey(selKey) || null;
    } else {
      this.#game = new jsChessEngine.Game();
      this.selectedPiece = null;
    }
  }

  select(coordinate: string): GameConfig {
    this.selectedPiece = coordinate;

    const json = this.#game.exportJson();
    this.#cache.setKey(gameKey, json);
    this.#cache.setKey(selKey, this.selectedPiece);
    this.#cache.save();

    return json;
  }

  move(to: string): GameConfig {
    if (this.selectedPiece == null) {
      throw new Error("Please select a game piece first!");
    }

    this.#game.move(this.selectedPiece, to);

    this.#game.aiMove(aiLevel);

    const json = this.#game.exportJson();
    this.#cache.setKey(gameKey, json);
    this.selectedPiece = null;
    this.#cache.setKey(selKey, null);
    this.#cache.save();

    return this.#game.exportJson();
  }

  state(): GameConfig {
    return this.#game.exportJson();
  }
}

const loadedGames = new Map<string, Game>();

const createGame = (gameId: string): Game => {
  const game = new Game(gameId);

  loadedGames.set(gameId, game);

  return game;
};

export const loadGame = (gameId: string): Game => {
  if (loadedGames.has(gameId)) {
    const game = loadedGames.get(gameId);

    if (game == null) {
      return createGame(gameId);
    }

    return game;
  } else {
    return createGame(gameId);
  }
};

const isSquareLight = (coordinate: string): boolean => {
  const ascii = coordinate.charCodeAt(0);
  const num = parseInt(coordinate.charAt(1));

  return (ascii + num) % 2 !== 0;
};

export const getGamePiece = async (
  gameId: string,
  coordinate: string
): Promise<string> => {
  if (!gameId || !coordinate) {
    throw new Error("Invalid parameters!");
  }

  const game = loadGame(gameId);

  const images: string[] = [
    isSquareLight(coordinate) ? lightSquare : darkSquare,
  ];

  const { pieces } = game.state();
  if (Object.prototype.hasOwnProperty.call(pieces, coordinate)) {
    images.push(piecesToImages[pieces[coordinate]]);
  }

  if (game.selectedPiece === coordinate) {
    images.push(pendingMove);
  }

  console.log("images", images);

  return mergeImages(
    images.map((i) => imagePath + "/" + i),
    {
      Canvas: Canvas,
      Image: Image,
    }
  );
};
