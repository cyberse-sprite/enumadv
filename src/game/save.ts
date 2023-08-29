import { reactive } from "vue"
import type Game from "./game"

export default class Save {
    game: Game
    local = 'enumadv'
    data = reactive({
        records: <{ [index: string]: boolean }>{}
    })
    constructor(game: Game) {
        this.game = game
    }
    getLocalName() {
        return `${this.local}-${this.game.getGameKey()}`
    }
    load() {
        const data = localStorage.getItem(this.getLocalName())
        if (data) {
            this.data = JSON.parse(data)
        }
    }
    save() {
        localStorage.setItem(this.getLocalName(), JSON.stringify(this.data))
    }
    //成就
    setRecord(index: string) {
        this.data.records[index] = true
        this.save()
    }
}