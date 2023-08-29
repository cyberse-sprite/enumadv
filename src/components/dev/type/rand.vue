<script setup lang="ts">
import OneMoreLine from '../onemoreline.vue'
const props = defineProps({ rand: Object });
</script>

<template>
    <div v-for="(option, j) in  props.rand" class="card">
        <div class="back">
            <one-more-line :lines="option.weight" label="权重"></one-more-line>
        </div>
        <div class="back-down">
            <one-more-line :lines="option.next" label="转跳"></one-more-line>
        </div>
    </div>
</template>