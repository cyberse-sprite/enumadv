<script setup lang="ts" defer=true>
import { ref } from 'vue'
import Game from '../src/game/game'
import DevVue from '../src/components/dev.vue'
import GameVue from '../src/components/game.vue'
import { Operation } from '@element-plus/icons-vue'

var game = new Game
//@ts-ignore
globalThis.game = game

const devsw = ref(false)

</script>

<template>
  <div class="affix">
    <el-button type="primary" :icon="Operation" circle @click="devsw = !devsw" size="large" />
  </div>
  <div class="container">
    <div class="core">
      <game-vue></game-vue>
    </div>
    <div class="dev" v-if="devsw">
      <dev-vue></dev-vue>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  margin: auto;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.core {
  flex: 1;
  display: flex;
  flex-direction: column;
  max-width: 800px;
  min-width: 0;
  flex-shrink: 0;
}

.dev {
  flex: 1;
  min-width: 0;
  flex-shrink: 0;
}

.affix {
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
