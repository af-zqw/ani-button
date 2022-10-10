<template>
  <button class="__ani-button" :class="{small: size === 'small', large: size === 'large'}" ref="button">
    <div class="icon-wrapper" :class="{'no-margin': !$slots.default}">
      <div class="icon" v-if="loading">
        <SvgIcon name="icon-ai30" :size="18" color="#999"></SvgIcon>
      </div>
      <div class="icon">
        <SvgIcon name="icon-tubiao_tijiao" :size="iconSize" color="#fff"></SvgIcon>
      </div>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'SubmitButton'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import SvgIcon from '../svg-icon/index.vue'

const props = withDefaults(defineProps<{
  loading?: boolean
  size?: ButtonSize
  iconSize?: number
  speed?: number
}>(), {
  loading: false,
  size: 'default',
  iconSize: 16,
  speed: 1
})
const emits = defineEmits<{
  (e: 'click'): void
  (e: 'complete'): void
}>()

let master: gsap.core.Timeline

const button = ref<any>(null)
</script>

<style scoped>
.icon-wrapper{
  margin-right: 8px;
  position: relative;
  width: 20px;
  height: 20px;
}
.icon-wrapper{
  margin-right: 8px;
  position: relative;
  width: 20px;
  height: 20px;
}
.icon-wrapper.no-margin{
  margin-right: 0;
}
.icon-wrapper.no-margin{
  margin-right: 0;
}
.icon{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 1;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>