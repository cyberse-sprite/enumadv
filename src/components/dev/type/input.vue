<script setup lang="ts">
import OneMoreLine from '../onemoreline.vue'
const props = defineProps({ input: Object, next: String });
</script>

<template>
    <div v-for="(option, j) in  props.input" class="card">
        <div class="back">
            <one-more-line :lines="option.if" label="条件"></one-more-line>
        </div>
        <div class="back-down">
            <one-more-line :lines="option.label" label="标签"></one-more-line>
            <one-more-line :lines="option.vari" label="变量"></one-more-line>
        </div>
    </div>
</template>