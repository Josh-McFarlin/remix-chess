/* eslint-disable @typescript-eslint/no-var-requires */
import type { GameConfig } from "js-chess-engine";
import jsChessEngine from "js-chess-engine";
import type { Cache } from "flat-cache";
import flatCache from "flat-cache";
import mergeImages from "merge-images";
import { Canvas, Image } from "canvas";
import path from "path";

const piecesToImages = {
  P: require("../assets/chess/w_pawn.png"),
  N: require("../assets/chess/w_knight.png"),
  B: require("../assets/chess/w_bishop.png"),
  R: require("../assets/chess/w_rook.png"),
  Q: require("../assets/chess/w_queen.png"),
  K: require("../assets/chess/w_king.png"),
  p: require("../assets/chess/b_pawn.png"),
  n: require("../assets/chess/b_knight.png"),
  b: require("../assets/chess/b_bishop.png"),
  r: require("../assets/chess/b_rook.png"),
  q: require("../assets/chess/b_queen.png"),
  k: require("../assets/chess/b_king.png"),
};
const lightSquare = require("../assets/chess/square_brown_light.png");
const darkSquare = require("../assets/chess/square_brown_dark.png");
const pendingMove = require("../assets/chess/blue_glow.png");
const possiblePos = require("../assets/chess/green_glow.png");
const errorIcon = require("../assets/chess/exclamation_mark.png");

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
    this.#cache = flatCache.load(gameId, path.resolve("./data"));

    const storedGame = this.#cache.getKey(gameKey);
    if (storedGame != null) {
      this.#game = new jsChessEngine.Game(storedGame);
      this.selectedPiece = this.#cache.getKey(selKey) || null;

      if (this.#game.exportJson().isFinished) {
        this.#game = new jsChessEngine.Game();
        this.selectedPiece = null;
      }
    } else {
      this.#game = new jsChessEngine.Game();
      this.selectedPiece = null;
    }
  }

  select(coordinate: string): GameConfig {
    this.selectedPiece = coordinate !== this.selectedPiece ? coordinate : null;

    const json = this.#game.exportJson();
    this.#cache.setKey(gameKey, json);
    this.#cache.setKey(selKey, this.selectedPiece);
    this.#cache.save(true);

    return json;
  }

  move(to: string): void {
    if (this.selectedPiece == null) {
      throw new Error("Please select a game piece first!");
    }

    try {
      this.#game.move(this.selectedPiece, to);

      this.#game.aiMove(aiLevel);
    } catch (error) {
      console.error(error);
    } finally {
      const json = this.#game.exportJson();
      this.#cache.setKey(gameKey, json);
      this.selectedPiece = null;
      this.#cache.setKey(selKey, null);
      this.#cache.save(true);
    }
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
    } else if (game.state().isFinished) {
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
  try {
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

    if (
      game.selectedPiece != null &&
      Object.prototype.hasOwnProperty.call(
        game.state().moves,
        game.selectedPiece
      ) &&
      game.state().moves[game.selectedPiece].includes(coordinate)
    ) {
      images.push(possiblePos);
    }

    return mergeImages(
      images.map((i) => path.resolve(path.join(__dirname, "..", i))),
      {
        Canvas: Canvas,
        Image: Image,
      }
    );
  } catch (error) {
    console.error(error);

    return mergeImages(
      [path.resolve(path.join(__dirname, "..", errorIcon)), "base64"],
      {
        width: 75,
        height: 75,
        Canvas: Canvas,
        Image: Image,
      }
    );
  }
};
