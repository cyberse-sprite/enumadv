export default class Log {
    static info(text: any) {
        console.log(text)
    }
    static error(text: any) {
        console.error(text)
    }
    static warn(text: any) {
        console.warn(text);
    }
    static game(text: string, className: string = 'p-info') {
        //@ts-ignore
        globalThis.game.appendText(text, className)
    }

}