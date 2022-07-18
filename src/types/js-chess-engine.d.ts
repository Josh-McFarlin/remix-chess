declare module "js-chess-engine" {
  /**
   * {"H7":"H5"}
   */
  export type Move = Record<string, string>;

  export type WhitePiece = "P" | "N" | "B" | "R" | "Q" | "K";
  export type BlackPiece = "p" | "n" | "b" | "r" | "q" | "k";
  export type Piece = WhitePiece | BlackPiece;

  export type GameConfig = {
    turn: "white" | "black";
    pieces: Record<string, Piece>;
    moves: Record<string, string[]>;
    isFinished: boolean;
    check: boolean;
    checkMate: boolean;
    castling: {
      whiteLong: boolean;
      whiteShort: boolean;
      blackLong: boolean;
      blackShort: boolean;
    };
    enPassant: string;
    halfMove: number;
    fullMove: number;
  };

  export class Game {
    /**
     * Create a new game, init players and in-game situation.
     * @param configuration Is a chess board configuration. Default value is a configuration for new game.
     */
    constructor(configuration?: GameConfig | string);

    /**
     * Perform a move on a chessboard and recalculates in-game situation. Returns played move
     * @param from Location on a chessboard where move starts (like A1,B3,...)
     * @param to Location on a chessboard where move ends (like A1,B3,...)
     */
    move(from: string, to: string): Move;

    /**
     * Return possible moves for playing player.
     * @param from Location on a chessboard where move starts (like A1,B3,...)
     */
    moves(from: string): Move[];

    /**
     * New chess piece is added to provided location. Piece on provided location is replaced.
     * @param location Location on a chessboard (like A1,B3,...).
     * @param piece A chess piece you need add (pieces syntax is same as FEN notation).
     */
    setPiece(location: string, piece: string): void;

    /**
     * Remove piece on provided location.
     * @param location Location on a chessboard (like A1,B3,...).
     */
    removePiece(location: string): void;

    /**
     * Calculates and perform next move by computer player. game.move(from, to) is called internally. Returns played move
     * @param level Computer player skill from 0 to 3. Read more about computer AI. Default 2.
     */
    aiMove(level?: number): Move;

    /**
     * Returns all played moves in array with chess board configuration like [{from:'A2',to:'A3',configuration:{...}},{from:'A7',to:'A6',configuration:{...}}].
     * @param reversed When false, last move is the last element in returned array. When true, last move is first. Default false.
     */
    getHistory(reversed?: boolean): Move[];

    /**
     * Print a chessboard to console standard output.
     */
    printToConsole(): void;

    /**
     * Return in-game situation represented by JSON configuration.
     */
    exportJson(): GameConfig;

    /**
     * Return in-game situation represented by FEN.
     */
    exportFEN(): string;
  }
}
