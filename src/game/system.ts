import type Game from "./game"
import Actor, { BaseModel } from "./actor"
import Complier from "./complier";
import type { Rand } from "./event";
import Log from "./log";

export default class System extends BaseModel {
    game: Game
    actors: { [index: string]: Actor } = {}
    player: string = ''
    constructor(game: Game) {
        super()
        this.game = game
    }
    toJSON() {
        return {
            varis: this.varis,
            stats: this.stats,
            actors: this.actors,
            player: this.player
        }
    }
    //操作队伍
    addActor(abstract: string[] = [], key: string = '') {
        let actor: Actor = new Actor()
        if (abstract.length > 0) {
            let actors = []
            for (let k in abstract) {
                actors.push(this.game.resource.actor[abstract[k]])
            }
            Object.assign(actor, ...actors)
            for (var i in actor.varis) {
                actor.varis[i] = Complier.eval(`${actor.varis[i]}`)
            }
            for (var i in actor.stats) {
                actor.stats[i] = Complier.eval(`${actor.stats[i]}`)
            }
            actor.key = <string>abstract.pop()
        }
        if (key == 'auto') {
            //@ts-ignore
            actor.key = `${this.actors.keys().length}`
        } else if (key !== '') {
            actor.key = key
        }
        if (this.actors[actor.key]) {
            Log.error(`已经存在一个索引${actor.key}相同的角色,该角色添加失败`)
        } else {
            actor.init()
            this.actors[actor.key] = actor
        }
    }
    removeActor(key: string) {
        if (this.actors[key]) {
            delete this.actors[key]
        }
    }
    //设置玩家
    getPlayerKey() {
        return this.player
    }
    setPlayerKey(key: string = 'player') {
        this.player = key
    }
    //根据状态得到参与随机的事件组
    getRandByStates() {
        let states: { [index: string]: number }
        if (this.player != '') {
            states = Object.assign({}, this.stats, this.actors[this.player].stats)
        } else if (this.player == '') {
            states = this.stats
        } else {
            return []
        }
        let result = <{ [index: string]: number }>{}
        for (var stateKey in states) {
            if (!(states[stateKey] > 0)) { continue }
            if (!this.game.resource.state[stateKey]) {
                Log.warn(`没有${stateKey}的相关信息`)
                continue
            }
            if (!this.game.resource.state[stateKey].events) {
                Log.warn(`没有${stateKey}的事件`)
                continue
            }
            //@ts-ignore
            const list = this.game.resource.state[stateKey].events
            for (var eventKey in list) {
                if (result[eventKey]) {
                    result[eventKey] += Complier.eval(list[eventKey])
                } else {
                    result[eventKey] = Complier.eval(list[eventKey])
                }
            }
        }
        let rands = <Array<Rand>>[]
        for (var key in result) {
            if (result[key] < 0) continue
            rands.push({
                weight: result[key].toString(),
                next: key,
            })
        }
        return rands
    }
}