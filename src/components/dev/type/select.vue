<script setup lang="ts">
import OneMoreLine from '../onemoreline.vue'
const props = defineProps({ select: Object });
</script>

<template>
    <div v-for="(option, j) in  props.select" class="card">
        <div class="back">
            <one-more-line :lines="option.if" label="条件"></one-more-line>
        </div>
        <div class="back-down">
            <one-more-line :lines="option.text" label="文本"></one-more-line>
            <one-more-line :lines="option.next" label="转跳"></one-more-line>
        </div>
    </div>
</template>
