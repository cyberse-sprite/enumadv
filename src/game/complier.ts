import Log from "./log";

export default class Complier {
    static game = 'globalThis.game'
    static filter: { [index: string]: string } = {
        GAME: `${this.game}`,
        GLOBAL: `${this.game}`,
        RECORD: `${this.game}`,
        OPTION: `${this.game}`,
        SYS: `${this.game}.system`,
        ACTORS: `${this.game}.system`,
        ACTOR: `${this.game}.system.actors`,
        PLAYER: `${this.game}.system.actors[${this.game}.system.player]`,
        UTIL: `${this.game}.util`,
        QUEUE: `${this.game}.queue`,
        RES: `${this.game}.resource`,
        SAVE: `${this.game}.save`,
    }
    static join() {
        var keys = [];
        for (var key in this.filter) {
            keys.push(key)
        };
        return `(${keys.join('|')})`
    }
    static joinStr = this.join()
    static eval(content: string | number) {
        if (typeof content == 'string') {
            if (content.length > 0) {
                if (content == "#p") {
                    content = 'PLAYER.getName()'
                } else if (content[0] == "#") {
                    content = `SYS.actors['${content.substring(1)}'].getName()`
                }
                content = `${content}`
                const str = content.replace(new RegExp(this.joinStr, 'g'), (m) => { return this.filter[m] })
                return eval(str)
            }
        } else {
            return content
        }
        return undefined
    }
    static evalList(content: string[]) {
        for (let i in content) {
            this.eval(content[i])
        }
    }
    static text(content: string) {
        try {
            const str = content.replace(new RegExp('\\${(.*?)}', 'g'), (m: any) => { const e = m.replace(new RegExp('\\$|{|}', 'g'), ''); return this.eval(e) })
            return str
        } catch (err: any) {
            console.error(content, err.message)
            return ""
        }
    }
}