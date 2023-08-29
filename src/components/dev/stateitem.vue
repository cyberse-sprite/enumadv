<script lang="ts" setup>
const props = defineProps({ state: Object })
</script>

<template>
    <div>
        <div v-for="(event, i) in props.state.events">
            <el-tag :type="parseInt(event) < 0 ? 'danger' : 'success'">{{ i }}</el-tag>
            {{ event }}
        </div>
    </div>
</template>