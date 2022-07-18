import * as jsChessEngine from "js-chess-engine";
import type { GameJson, GameStats } from "~/types/game";

export default class Game {
  readonly gameId: string;
  readonly stats: GameStats;
  #game: jsChessEngine.Game;
  #selectedPiece: string | null;

  constructor(
    gameId: string,
    gameStats: GameStats = {
      round: 0,
      playerWins: 0,
      aiWins: 0,
      totalMoves: 0,
    }
  ) {
    this.gameId = gameId;
    this.stats = gameStats;
    this.#game = new jsChessEngine.Game();
    this.#selectedPiece = null;
  }

  get selectedPiece(): string | null {
    return this.#selectedPiece;
  }

  get isFinished(): boolean {
    return this.#game.exportJson().isFinished;
  }

  select(coordinate: string): void {
    this.#selectedPiece = coordinate !== this.selectedPiece ? coordinate : null;
  }

  move(to: string): void {
    if (this.#selectedPiece == null) {
      throw new Error("Please select a game piece first!");
    }

    this.#game.move(this.#selectedPiece, to);
    this.#game.aiMove(3);
    this.#selectedPiece = null;
    this.stats.totalMoves += 1;
  }

  restart(): void {
    this.stats.round += 1;
    this.stats.aiWins += 1;
    this.#game = new jsChessEngine.Game();
  }

  toJSON(): GameJson {
    return {
      gameId: this.gameId,
      stats: this.stats,
      game: this.#game.exportJson(),
      selectedPiece: this.selectedPiece,
    };
  }

  static from(json: GameJson): Game {
    const game = new Game(json.gameId, json.stats);
    game.#game = new jsChessEngine.Game(json.game);
    game.#selectedPiece = json.selectedPiece;

    return game;
  }
}
