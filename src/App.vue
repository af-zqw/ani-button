<template>
  <div class="app">
    <FavoriteButton
      :initValue="state.favoriteValue"
      :speed="1"
      @click="handleClick"
      size="default"
    >
      {{state.favoriteValue ? '收藏成功' : '未收藏'}}
    </FavoriteButton>

    <button @click="state.favoriteValue = !state.favoriteValue">测试更改数据</button>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';


const state = reactive({
  favoriteValue: true
})

const handleClick = () => {
  state.favoriteValue = !state.favoriteValue
}
</script>

<style scoped>
.app {
  margin-top: 100px;
}
</style>