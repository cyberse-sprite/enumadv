<script setup lang="ts">
//@ts-ignore
const game = globalThis.game

const props = defineProps({
    horizontal: Boolean,
    object: String,
    label: String,
    showValue: Boolean,
    showZero: Boolean,
    val: String,
    type: String,
    res: String
})

const getColor = (key: string) => {
    if (props.res) {
        const target = game.complier.eval(props.res)[key]
        // console.log(key, target)
        if (target) {
            const color = target.color
            if (color) {
                return color
            }
        }
    }
    return '#000'
}

const getAlias = (key: string | number) => {
    if (props.res) {
        const target = game.complier.eval(props.res)[key]
        // console.log(key, target)
        if (target) {
            const alias = target.alias
            if (alias) {
                return game.complier.text(alias)
            }
        }
    }
    return key
}

</script>

<template>
    <template v-if="props.horizontal">
        <span v-if="props.label" class="title-h">{{ props.label }}</span>
        <template v-if="props.type == 'single'">
            <span class="system-span">
                {{ game.complier.eval(props.object) }}
            </span>
        </template>
        <template v-else>
            <span v-for="(value, key) in game.complier.eval(props.object)" class="system-span">
                <template v-if="props.showZero || (!props.showZero && value != 0)">
                    {{ getAlias(key) }}
                    <template v-if="props.showValue">
                        {{ value }}
                    </template>
                </template>
            </span>
        </template>
    </template>
    <template v-else>
        <div class="bottom-space">
            <div v-if="props.label" class="title">{{ props.label }}</div>
            <template v-if="props.type == 'single'">
                <p>
                    {{ game.complier.eval(props.object) }}
                </p>
            </template>
            <template v-else>
                <p v-for="(value, key) in  game.complier.eval(props.object) " :style="{ color: getColor(`${key}`) }">
                    <template
                        v-if="props.showZero || (!props.showZero && (props.val ? (value[props.val] != 0) : (value != 0)))">
                        {{ getAlias(key) }}
                        <template v-if="props.showValue">
                            {{ props.val ? value[props.val] : value }}
                        </template>
                    </template>
                </p>
            </template>
        </div>
    </template>
</template>

<style scoped>
.bottom-space {
    margin-bottom: 10px;
}

.system-span {
    margin-right: 10px;
}

.title {
    font-weight: bolder;
    border-bottom: 1px #ddd solid;
}

.title-h {
    font-weight: bolder;
    margin-right: 10px;
    padding-right: 10px;
    border-right: 1px #ddd solid;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 1px #ddd solid;
}
</style>