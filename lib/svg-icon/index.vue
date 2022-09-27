<template>
  <svg class="svg-icon" aria-hidden="true" :style="{color, fontSize: size + 'px'}" :fill="color">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  color?: string
  size?: number
}
const props = withDefaults(defineProps<Props>(), {
  color: '#333',
  size: 16
})

const iconName = computed(() => {
  return `#${props.name}`
})

defineExpose()
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}  
</style>