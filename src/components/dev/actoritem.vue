<script lang="ts" setup>
const props = defineProps({ actor: Object })
</script>

<template>
    <div>
        <div v-for="(event, i) in props.actor" class="item-back">
            <div class="item-tag">
                <el-tag :type="parseInt(event) < 0 ? 'danger' : 'success'">{{ i }}</el-tag>
            </div>
            <div class="item-info">
                <p v-for="item, index in event">
                    <el-tag>{{ index }}</el-tag>
                    {{ item }}
                </p>
            </div>
        </div>
    </div>
</template>