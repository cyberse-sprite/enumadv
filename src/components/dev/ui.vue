<script setup lang="ts">
//@ts-nocheck
import OneMoreLine from './onemoreline.vue'
const props = defineProps({ data: Object })
</script>

<template>
    <div>
        <el-form label-width="80px" label-position="left">
            <el-form-item label="view">
                <div style="display: flex;flex-direction: column;width: 100%;">
                    <div class="back">top</div>
                    <div class="back-down" style="flex-direction: column;">
                        <div class="card" v-for="(item, index) in props.data.view.top">
                            <p v-for="(item2, index2) in item">
                                <one-more-line :label="`${index2}`" :lines="`${item2}`"></one-more-line>
                            </p>
                        </div>
                    </div>
                    <div class="back">side</div>
                    <div class="back-down" style="flex-direction: column;">
                        <div class="card" v-for="(item, index) in props.data.view.side">
                            <p v-for="(item2, index2) in item">
                                <one-more-line :label="`${index2}`" :lines="`${item2}`"></one-more-line>
                            </p>
                        </div>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="button">
                <div style="flex-direction: column; width: 100%;">
                    <div v-for="(item, index) in props.data.button" class="card">
                        <one-more-line label="条件" :lines="item.if"></one-more-line>
                        <one-more-line label="文本" :lines="item.text"></one-more-line>
                        <one-more-line label="操作" :lines="item.ope"></one-more-line>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>