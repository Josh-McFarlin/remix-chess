import Game from "~/utils/Game";
import flatCache from "flat-cache";
import path from "path";
import fs from "fs";
import os from "os";

let cachePath = path.resolve("/data");
if (!fs.existsSync(cachePath)) {
  cachePath = path.join(os.tmpdir(), "chess");
}

const cache = flatCache.load("CHESS", cachePath);
const loadedGames = new Map<string, Game>();

class GameRoom {
  getGame(gameId: string): Game {
    let game: Game | undefined = loadedGames.get(gameId);

    const saveStr: string | null = cache.getKey(gameId);
    if (game == null && saveStr != null) {
      game = Game.from(JSON.parse(saveStr));
    }

    if (game == null) {
      game = new Game(gameId);
    }

    if (game.isFinished) {
      game.restart();
    }

    loadedGames.set(gameId, game);
    return game;
  }

  saveGame(game: Game): void {
    loadedGames.set(game.gameId, game);
    cache.setKey(game.gameId, JSON.stringify(game));
    cache.save(true);
  }
}

export const gameRoom = new GameRoom();
