import type Actor from "./actor"
import type { EventItem } from "./event"
import { reactive } from "vue"
import axios from 'axios'
import Log from "./log"

interface InfoResource {
    resource?: { [index: string]: string[] }
}

interface VariResource {
    cate: string
    type: string
    color: string
    intro: string
}

interface StateResource {
    cate: string
    color: string
    intro: string
    events: { [index: string]: string }
    effect: { [index: string]: string }
}

export default class Resource {
    info: InfoResource = reactive({})
    ui = reactive({})
    vari: { [index: string]: VariResource } = reactive({})
    state: { [index: string]: StateResource } = reactive({})
    event: { [index: string]: Array<EventItem> } = reactive({})
    actor: { [index: string]: Actor } = reactive({})
    loadInfo(gameKey: string, fun?: () => void) {
        var _this = this
        axios.get(`mod/${gameKey}/info.json`).then((res) => {
            Object.assign(_this.info, res.data)
            if (fun) fun()
            Log.info("游戏信息载入完成")
        })
    }
    loadGame(gameKey: string, fun?: () => void) {
        if (!this.info.resource) {
            Log.warn('游戏信息文件未指定资源文件列表，将按照默认规则载入文件资源。')
            this.info.resource = {
                event: ["event"],
                actor: ["actor"],
                state: ["state"],
                vari: ["vari"]
            }
        }
        var _this = this
        const load = (type: string, name: string) => {
            return `mod/${gameKey}/${type}/${name}.json`
        }
        let sendAry = [axios.get(`mod/${gameKey}/ui.json`)];

        //@ts-ignore
        var infos = [{ field: 'ui' }]
        for (let field in this.info.resource) {
            for (var i in this.info.resource[field]) {
                infos.push({ field: field })
                sendAry.push(axios.get(load(field, this.info.resource[field][i])))
            }
        }
        axios.all(sendAry).then(result => {
            for (var i in result) {
                //@ts-ignore
                Object.assign(_this[infos[i].field], result[i].data)
            }
            if (fun) fun()
            Log.info("全部游戏资源载入完成")
        })
    }
}