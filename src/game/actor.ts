import Complier from "./complier"
import { reactive } from "vue";

interface Buff {
    vari: string,
    stat: string,
    order: number,
    ope: string,
    count: number
}

export class BaseModel {
    handle: boolean = false
    varis: { [index: string]: any } = reactive({})
    stats: { [index: string]: number } = reactive({})
    buffs: { [index: string]: Buff[] } = reactive({})
    getVari(vari: string) {
        return this.varis[vari] ? this.varis[vari] : 0
    }
    setVari(vari: string, value: string = '0') {
        this.varis[vari] = Complier.eval(value)
    }
    addVari(vari: string, value: string = '1') {
        if (this.varis[vari]) {
            const res = Complier.eval(value)
            if (typeof res == 'number')
                this.varis[vari] = parseInt(this.varis[vari]) + Complier.eval(value)
            else
                this.varis[vari] += Complier.eval(value)
        } else {
            this.varis[vari] = Complier.eval(value)
        }
    }
    getStat(stat: string) {
        return this.stats[stat] ? this.stats[stat] : 0
    }
    setStat(stat: string, value: string = '1') {
        this.stats[stat] = Complier.eval(value)
    }
    addStat(stat: string, value: string = '1') {
        if (this.stats[stat]) {
            this.stats[stat] += Complier.eval(value)
        } else {
            this.stats[stat] = Complier.eval(value)
        }
    }
    removeStat(stat: string) {
        delete this.stats[stat]
    }
}

interface Ship {
    call: string,
    val: number
}

export default class Actor extends BaseModel {
    key = ""
    color = "#a00"
    alias: null | string = null
    name = reactive({ first: "", last: "", style: 0 })
    ships: { [index: string]: Ship } = reactive({})
    init() {
        this.alias = this.getName()
    }
    getName(): string {
        if (this.name.style == 0) {
            return this.name.last + this.name.first
        } else if (this.name.style == 1) {
            return this.name.first + '·' + this.name.last
        }
        return this.name.first
    }
    setName(first: string, last: string, style: number) {
        this.name = {
            first: first,
            last: last,
            style: style
        }
        this.alias = this.getName()
    }
    getShipVal(target: string) {
        if (this.ships[target]) {
            if (this.ships[target].val) {
                return this.ships[target].val
            }
        }
        return 0
    }
    setShipVal(target: string, val: string = '0') {
        if (!this.ships[target]) {
            this.ships[target] = {
                val: 0,
                call: ""
            }
        }
        this.ships[target].val = Complier.eval(val)
    }
    addShipVal(target: string, val: string = '1') {
        if (!this.ships[target]) {
            this.ships[target] = {
                val: 0,
                call: ""
            }
        }
        if (this.ships[target].val) {
            this.ships[target].val += Complier.eval(val)
        } else {
            this.ships[target].val = Complier.eval(val)
        }
    }
    getShipCall(target: string) {
        if (this.ships[target]) {
            if (this.ships[target].call) {
                return this.ships[target].call
            }
        }
        return this.getName()
    }
    setShipCall(target: string, val: string = '') {
        if (!this.ships[target]) {
            this.ships[target] = {
                val: 0,
                call: ""
            }
        }
        this.ships[target].call = val
    }

}