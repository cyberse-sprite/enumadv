<script setup lang="ts">
// @ts-nocheck
import EventItem from './dev/eventitem.vue'
import StateItem from './dev/stateitem.vue';
import ActorItem from './dev/actoritem.vue'
import InfoPanel from './dev/info.vue'
import UiPanel from './dev/ui.vue'
let game = globalThis.game
</script>

<template>
    <div class="dev-back">
        <div class="dev-head">
            <el-form :inline="true" style="margin: 20px 20px 0px 20px">
                <el-form-item label="跳过后台命令">
                    <el-switch v-model="game.queue.jump.value"></el-switch>
                </el-form-item>
            </el-form>
        </div>
        <div class="dev-body">
            <el-tabs type="border-card">
                <el-tab-pane label="queue" lazy>
                    <div v-for="(item, index) in game.queue.queue">
                        <event-item :event="item"></event-item>
                    </div>
                </el-tab-pane>
                <el-tab-pane :label="resKey" v-for="(resItem, resKey) in game.resource" lazy>
                    <template v-if="resKey == 'info'">
                        <info-panel :data="resItem"></info-panel>
                    </template>
                    <template v-else-if="resKey == 'ui'">
                        <ui-panel :data="resItem"></ui-panel>
                    </template>
                    <template v-else-if="resKey == 'event'">
                        <el-collapse>
                            <el-collapse-item v-for="(item, index) in resItem" :title="index">
                                <template v-for="(event, i) in item">
                                    <event-item :event="event"></event-item>
                                </template>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                    <template v-else-if="resKey == 'state'">
                        <el-collapse>
                            <el-collapse-item v-for="(item, index) in resItem" :title="index">
                                <state-item :state="item"></state-item>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                    <template v-else-if="resKey == 'actor'">
                        <el-collapse>
                            <el-collapse-item v-for="(item, index) in resItem" :title="index">
                                <actor-item :actor="item"></actor-item>
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                    <template v-else-if="resKey == 'vari'">
                        <div v-for="(item, index) in resItem"
                            :style="{ color: item.color ? item.color : '#fff', padding: '10px', borderBottom: '1px #eee solid' }">
                            {{ index }}
                            <el-tag>{{ item.type }}</el-tag>
                        </div>
                    </template>
                    <template v-else>
                        <el-collapse>
                            <el-collapse-item v-for="(item, index) in resItem" :title="index">
                                {{ item }}
                            </el-collapse-item>
                        </el-collapse>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>
.dev-back {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.dev-head {
    width: 100%;
    border-bottom: 1px #eee solid;
    flex-shrink: 0;
}

.dev-body {
    flex: 1;
    margin: 10px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
</style>