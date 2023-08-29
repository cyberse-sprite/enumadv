import { reactive } from 'vue'
import axios from 'axios'
//静态
import Log from './log';
import Util from './util';
import Complier from "./complier";
//实例
import Resource from './resource';
import System from './system';
import EventQueue, { type Input, type Select } from './event'
import Save from './save';

interface GameIndexItem {
    name: string
    key: string
}

export default class Game {
    //与面板直接绑定的内容
    view = reactive({
        list: <{ [index: string]: string }>{},
        select: '',
        state: 0,
        texts: <Array<any>>[],
        input: <{ vari: string, val: any }[]>[]//输入数据临时存储区域
    })
    //本地存档  
    save = new Save(this)
    //读取资源
    resource = new Resource()
    //单局数据
    system = new System(this)
    //进程控制
    queue = new EventQueue(this)
    //静态方法钩子
    util = Util
    log = Log
    complier = Complier
    constructor() {
        this.getGameInfo()
    }
    getGameInfo() {
        var _this = this
        axios.get("mod/index.json").then((res) => {
            _this.view.list = res.data
            _this.view.select = Object.keys(_this.view.list)[0]
            _this.resource.loadInfo(this.getGameKey())
            _this.save.load()
        })
    }
    //一些方便操作的
    getGameKey(): string {
        const selectGame = this.view.select
        return selectGame ? selectGame : ""
    }
    //下面是和几个按钮绑定的函数
    start() {
        var _this = this
        this.resource.loadGame(this.getGameKey(), () => {
            _this.queue.next('start')
            _this.view.state = 1
            _this.queue.excute()
        })
    }
    step() {
        this.queue.speed = 0
        this.queue.excute()
    }
    high() {
        this.queue.speed = 100
        this.view.state = 2
        this.queue.auto()
    }
    low() {
        this.queue.speed = 1000
        this.view.state = 3
        this.queue.auto()
    }
    pause() {
        this.queue.pause()
        this.queue.speed = 0
        this.view.state = 1
    }
    //滚动到底部
    scroll() {
        // 获取节点
        let chatHistory = document.getElementById('story')
        if (!chatHistory) {
            //Log.error('没获取到对象')
            return
        }
        if (chatHistory.scrollHeight > chatHistory.clientHeight) {
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }
    }
    //操作故事区域和选择
    appendText(text: string, className: string = 'p-text') {
        this.view.texts.push({ text, type: "text", className })
    }
    appendSelect(select: Array<Select>) {
        this.view.texts.push({ select, type: "select" })
    }
    selectOnClick(event: string, text: string) {
        this.view.texts.pop()
        this.appendText(`选择了${text}`)
        this.queue.lock = false
        this.queue.next(event)
        this.queue.excute()
        if (this.queue.speed > 0) {
            this.queue.auto()
        }
    }
    appendInput(input: Array<Input>, next: string) {
        this.view.input.length = 0
        for (var i in input) {
            const str = `${input[i].vari}`
            this.view.input.push({ vari: str, val: Complier.eval(str) })
        }
        this.view.texts.push({ input, type: "input", next })
    }
    inputOnClick(event: string) {
        for (var i in this.view.input) {
            const input = this.view.input[i]
            Complier.eval(`${input.vari}='${input.val}'`)
        }
        this.queue.lock = false
        this.queue.next(event)
        this.queue.excute()
        if (this.queue.speed > 0) {
            this.queue.auto()
        }
    }
}