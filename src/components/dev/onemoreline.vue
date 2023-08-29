<script setup lang="ts">
const props = defineProps({ lines: [Object, String, Number], label: String });
</script>
<template>
    <div class="item">
        <div>
            <div class="tag">
                <el-tag effect="dark">
                    {{ props.label }}
                </el-tag>
            </div>
        </div>
        <div>
            <template v-if="['string', 'number'].includes(typeof props.lines)">
                <div>
                    {{ props.lines }}
                </div>
            </template>
            <template v-if="(typeof props.lines) == 'object'">
                <div v-for="(line, i) in props.lines">
                    {{ line }}
                </div>
            </template>
        </div>
    </div>
</template>
<style scoped>
.item {
    display: flex;
    width: 100%;
}
</style>