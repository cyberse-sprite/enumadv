<script lang="ts" setup>
import { onUpdated } from 'vue'
import VariItems from './game/varis.vue'
//@ts-ignore
var game = globalThis.game
onUpdated(() => {
    game.scroll()
})

</script>

<template>
    <div v-if="game.view.state == 0" class="start">
        <select id="select" class="select" v-model="game.view.select" @change="game.getGameInfo">
            <option :value="index" v-for="(item, index) in game.view.list">{{ item }}</option>
        </select>
        <div class="title">游戏简介</div>
        <div class="record">
            {{ game.resource.info.intro }}
        </div>
        <img v-if="game.resource.info.image" :src="game.resource.info.image" alt="缩略图">
        <div class="records">
            <div class="title">成就一览</div>
            <div class="record" v-for="(item) in game.resource.info.records">
                <p>
                    <span v-if="game.save.data.records[item.name]">【已达成】</span>
                    {{ game.save.data.records[item.name] ? item.name : '???' }}
                </p>
                <p>{{ game.save.data.records[item.name] ? item.intro : item.hide }}</p>
            </div>
        </div>
    </div>
    <div v-if="game.view.state != 0" id="game" class="game">
        <div id="system" class="system">
            <template v-for="(items) in game.resource.ui.view.top">
                <vari-items v-if="game.complier.eval(items.if)" :object="items.target" :show-value="items.showValue"
                    :show-zero="items.showZero" :label="items.label" :res="items.res" :type="items.type" :val="items.val"
                    horizontal></vari-items>
            </template>
        </div>
        <div class="main">
            <div id="side" class="side">
                <template v-for="(items) in game.resource.ui.view.side">
                    <vari-items v-if="game.complier.eval(items.if)" :object="items.target" :show-value="items.showValue"
                        :show-zero="items.showZero" :label="items.label" :res="items.res" :type="items.type"
                        :val="items.val"></vari-items>
                </template>
            </div>
            <div id="story" class="story">
                <template v-for="(item) in game.view.texts">
                    <p v-if="item.type == 'text'" v-html='item.text'></p>
                    <template v-if="item.type == 'select'">
                        <template v-for="(select) in item.select">
                            <button v-if="game.complier.eval(`${select.if}`)"
                                @click="game.selectOnClick(select.next, select.text)" class="select-button">
                                {{ select.text }}
                            </button>
                        </template>
                    </template>
                    <template v-if="item.type == 'input'">
                        <template v-for="(input, index2) in item.input">
                            <p v-if="game.complier.eval(`${input.if}`)">
                                {{ input.label }}
                                <input type="text" v-model="game.view.input[index2].val" />
                            </p>
                        </template>
                        <button @click="game.inputOnClick(item.next)">确定</button>
                    </template>
                </template>
            </div>
        </div>
    </div>
    <div id="button" class="button">
        <button v-if="game.view.state == 0" class="button-item" @click="game.start">开始</button>
        <template v-for="item in game.resource.ui.button">
            <button v-if="game.complier.eval(`${item.if}`)" class="button-item"
                @click="game.complier.eval(`${item.ope}`)">{{ item.text }}</button>
        </template>
    </div>
</template>

<style scoped>
.game {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.start {
    flex-grow: 1;
    overflow-y: auto;
}

.button {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    margin-top: 10px;
}

.button-item {
    flex: 1;
    padding: 12px;
}

.system {
    padding: 10px;
    border: 1px #ddd solid;
    margin-bottom: 10px;
}

.main {
    display: flex;
    flex: 1;
    overflow: hidden;
}

.side {
    overflow-y: auto;
    padding: 10px;
    flex: 1;
    border: 1px #ddd solid;
    margin-right: 10px;
}

.story {
    flex: 3;
    border: 1px #ddd solid;
    overflow-y: auto;
    padding: 10px;
}

.select {
    width: 100%;
    padding: 12px;
    font-size: 15px;
    text-align: center;
}

.select-button {
    padding: 6px 18px;
    margin-right: 10px;
}

.record {
    border: 1px #ddd solid;
    margin: 10px 0px;
    padding: 10px;
}

.title {
    margin: 10px 10px;
    padding-left: 10px;
    border-left: 3px #aaa solid;
}
</style>