import axios from "axios";
import Complier from "./complier";
import Game from "./game";
import Log from "./log";
import { reactive, ref } from "vue";

type EventItemType = 'text' | 'end' | 'select' | 'input' | 'next' | 'rand' | 'if' | 'ope' | 'insert' | 'get' | 'stop';
export interface EventItem {
    type: EventItemType
    text: string
    next: string
    select: Array<Select>
    input: Array<Input>
    branch: Array<Branch>
    rand: Array<Rand>
    ope: Array<string>
    insert: string
    get: string
    if: string | Array<string>
}

interface Branch {
    if: string,
    next: string
}

export interface Select {
    if: string,
    text: string,
    next: string
}
export interface Input {
    if: string,
    label: string,
    vari: string
}
export interface Rand {
    weight: string,
    next: string
}

export default class EventQueue {
    game: Game
    jump = ref(true)
    speed = 300
    timer: null | number = null
    queue: Array<EventItem> = reactive([])
    lock: boolean = false
    constructor(game: Game) {
        this.game = game
    }
    push(line: EventItem) {
        this.queue.push(line)
    }
    pushList(list: Array<EventItem>) {
        this.queue.push(...list)
    }
    excute(): boolean {
        if (this.lock) {
            Log.error('事件队列已被锁定，请使用命令或者输入解锁。')
            return false
        }
        while (1) {
            let item = this.queue.shift()
            //没有内容则增加空
            if (!item) {
                this.next('empty')
                this.excute()
                return true
            }
            //判断这个事件本身会不会执行
            if (item.if) {
                const ope = <string | Array<string>>item.if
                let sw = Complier.eval(typeof ope == 'string' ? ope : ope.join("&&"))
                if (!sw) continue
            }
            switch (item.type) {
                //这三种需要锁定游戏进程。
                case 'select':
                    this.select(item.select)
                    this.lock = true
                    return false
                case 'input':
                    this.input(item.input, item.next)
                    this.lock = true
                    return false
                case 'end':
                    this.lock = true
                    return false
                //暂停
                case 'stop':
                    return false
                //这三种不需要轮候
                case 'ope':
                    this.ope(item.ope)
                    if (this.jump.value) { break } else return true
                case 'next':
                    this.next(item.next)
                    if (this.jump.value) { break } else return true
                case 'rand':
                    this.rand(item.rand)
                    if (this.jump.value) { break } else return true
                //插入事件
                case 'insert':
                    this.insert(item.insert)
                    if (this.jump.value) { break } else return true
                //每个文字显示之前要停顿，使用timeouter实现。
                case 'text':
                    this.text(item.text)
                    return true
                case 'get':
                    this.get(item.get)
                    this.lock = true
                    return true
            }
        }
        return false
    }
    isEmpty(): boolean {
        if (this.queue.length < 1) return true
        else return false
    }
    auto() {
        if (this.speed == 0) return
        var _this = this
        this.timer = window.setTimeout(() => {
            if (_this.excute()) {
                _this.auto()
                return
            }
        }, this.speed)
    }
    ope(ope: string | string[]) {
        if (typeof ope == 'string') {
            Complier.eval(ope)
        } else {
            Complier.evalList(ope)
        }
    }
    text(text: string) {
        this.game.appendText(Complier.text(text))
    }
    next(event: string) {
        this.queue.length = 0
        const eventObj = this.game.resource.event[event]
        if (eventObj) {
            this.pushList(eventObj)
        } else {
            Log.error(`缺少事件${event}`)
        }
    }
    select(select: Array<Select>) {
        for (var i in select) {
            select[i].text = Complier.text(select[i].text)
        }
        this.game.appendSelect(select)
    }
    input(input: Array<Input>, next: string) {
        this.game.appendInput(input, next)
    }
    rand(rand: Array<Rand>) {
        let sum = 0
        let list = [0]
        for (var i in rand) {
            let weight = Complier.eval(`${rand[i].weight}`)
            sum += weight
            list.push(sum)
        }
        const randNum = Math.random() * sum
        for (var i in list) {
            if (list[i] > randNum) {
                this.next(rand[parseInt(i) - 1].next)
                return
            }
        }
    }
    insert(insert: string) {
        const d = this.game.resource.event[insert]
        if (d) {
            for (let i = d.length - 1; i >= 0; i--) {
                this.queue.unshift(d[i])
            }
        } else {
            Log.error(`缺少事件${insert}`)
        }
    }
    get(get: string) {
        var _this = this
        let url = get
        if (url[0] == '/')
            url = `mod/${this.game.getGameKey()}/get${get}`
        axios.get(url).then((res) => {
            const longText: string = res.data
            const d = longText.split('\r\n')
            for (let i = d.length - 1; i--; i >= 0) {
                //@ts-ignore
                const item: EventItem = {
                    type: 'text',
                    text: Complier.text(d[i])
                }
                _this.queue.unshift(item)
            }
            _this.lock = false
            _this.excute()
        })
    }
    pause() {
        //@ts-ignore
        this.queue.unshift({ "type": "pause" })
    }
}