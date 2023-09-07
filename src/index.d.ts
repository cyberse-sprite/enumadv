import type Game from "./game/game";

export { };

declare global {
    interface Window {
        game: Game
    }
}