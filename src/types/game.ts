import type { GameConfig } from "js-chess-engine";

export interface GameStats {
  round: number;
  playerWins: number;
  aiWins: number;
  totalMoves: number;
}

export interface GameJson {
  gameId: string;
  stats: GameStats;
  game: GameConfig;
  selectedPiece: string | null;
}
