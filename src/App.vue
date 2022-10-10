<template>
  <div class="app">
    <div>
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

    <div>
      <SlideButton :placement="state.slidePlacement">打开</SlideButton>
      <button @click="changeSlidePlacement">测试更改数据</button>
    </div>

    <div>
      <SubmitButton>提交</SubmitButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const state = reactive({
  favoriteValue: true,
  slidePlacement: 'bottom'
})

const handleClick = () => {
  state.favoriteValue = !state.favoriteValue
}

const changeSlidePlacement = () => {
  const placements = ['left', 'right', 'top', 'bottom']
  state.slidePlacement = placements[Math.floor(Math.random() * 4)]
}
</script>

<style scoped>
.app {
  margin-top: 100px;
}
div{
  margin-bottom: 20px;
}
button{
  margin-right: 20px;
}
</style>