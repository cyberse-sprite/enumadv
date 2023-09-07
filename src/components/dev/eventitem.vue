<script setup lang="ts">
//@ts-nocheck
import OneMoreLine from './onemoreline.vue'
import EventSelect from './type/select.vue'
import EventInput from './type/input.vue'
import EventRand from './type/rand.vue'
import { eventFilter, eventColorFilter } from '../../dev/filter'
const props = defineProps({ event: Object });

</script>
<template>
    <div>
        <div class="item-back" :style="{ backgroundColor: eventColorFilter(props.event.type) }">
            <div class="item-tag">
                <el-tag class="item-type" effect="dark">{{ props.event.type }}</el-tag>
            </div>
            <div class="item-info">
                <template v-if="props.event.if">
                    <div class="back">
                        <one-more-line :lines="props.event.if" label="条件"></one-more-line>
                    </div>
                </template>
                <div>
                    <template v-if="props.event.type == 'rand'">
                        <event-rand :rand="props.event.rand"></event-rand>
                    </template>
                    <template v-if="props.event.type == 'select'">
                        <event-select :select="props.event.select"></event-select>
                    </template>
                    <template v-if="props.event.type == 'input'">
                        <event-input :input="props.event.input"></event-input>
                    </template>
                    <template v-if="['text', 'insert', 'get', 'ope'].includes(props.event.type)">
                        <one-more-line :lines="props.event[props.event.type]" :label="eventFilter(props.event.type)">
                        </one-more-line>
                    </template>
                </div>
                <template v-if="props.event.next">
                    <one-more-line :lines="props.event.next" :label="eventFilter(props.event.type)">
                    </one-more-line>
                </template>
            </div>
        </div>
    </div>
</template>
<style scoped>

</style>

