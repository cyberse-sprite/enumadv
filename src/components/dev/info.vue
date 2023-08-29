<script setup lang="ts">
import OneMoreLine from './onemoreline.vue'
const props = defineProps({ data: Object })
</script>

<template>
    <div>
        <el-form label-width="80px" label-position="left">
            <el-form-item v-for="(item, index) in props.data" :label="index">
                <template v-if="index == 'records'">
                    <div style="width: 100%;">
                        <template v-for="(item2, index2) in item">
                            <div class="card">
                                <one-more-line label="名称" :lines="item2.name"></one-more-line>
                                <one-more-line label="提示" :lines="item2.hide"></one-more-line>
                                <one-more-line label="介绍" :lines="item2.intro"></one-more-line>
                            </div>
                        </template>
                    </div>
                </template>
                <template v-else-if="index == 'resource'">
                    <div>
                        <template v-for="(item2, index2) in item">
                            <p style="margin-bottom: 10px;">
                                <el-space wrap>
                                    <el-tag effect="dark" style="width: 54px;">{{ index2 }}</el-tag>
                                    <el-tag v-for="item3 in item2">{{ item3 }}.json</el-tag>
                                </el-space>
                            </p>
                        </template>
                    </div>
                </template>
                <template v-else>
                    {{ item }}
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>