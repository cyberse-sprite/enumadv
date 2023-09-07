<script setup lang="ts" defer=true>

import Game from '../src/game/game'
import GameVue from '../src/components/game.vue'

var game = new Game
globalThis.game = game

</script>

<template>
  <div class="container">
    <div class="core">
      <game-vue></game-vue>
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
