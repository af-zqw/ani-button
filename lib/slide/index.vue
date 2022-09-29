<template>
  <button class="__ani-button" :class="{small: size === 'small', large: size === 'large'}" ref="button" @click="restart">
    <div class="icon-wrapper" :class="{'no-margin': !$slots.default}">
      <div
        class="icon"
        :class="{right: placement === 'right', top: placement === 'top', bottom: placement === 'bottom'}"
        ref="icon"
      >
        <SvgIcon
          v-if="!$slots.icon"
          name="icon-arrow-left-full"
          color="#fff"
          :size="iconSize"
        >
        </SvgIcon>
        <slot name="icon"></slot>
      </div>
    </div>
    <slot></slot>

    <div
      class="overlay"
      :class="{right: placement === 'right', top: placement === 'top', bottom: placement === 'bottom'}"
      :style="{backgroundColor: overlayColor}"
      ref="overlay">
    </div>
  </button>
</template>

<script lang="ts">
export default {
  name: 'SlideButton'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import SvgIcon from '../svg-icon/index.vue'

const props = withDefaults(defineProps<{
  placement?: 'left' | 'right' | 'top' | 'bottom'
  overlayColor?: string
  size?: ButtonSize
  iconSize?: number
  speed?: number
}>(), {
  placement: 'left',
  overlayColor: 'rgba(255, 255, 255, 0.7)',
  size: 'default',
  iconSize: 18,
  speed: 1
})
const emits = defineEmits<{
  (e: 'click'): void
  (e: 'complete'): void
}>()

watch(() => props.placement, () => {
  nextTick(() => {
    master.revert()
    ;(master as any) = null
    createTimeLine()
  })
})

let master: gsap.core.Timeline

const button = ref<any>(null)
const icon = ref<any>(null)
const overlay = ref<any>(null)

const restart = () => {
  emits('click')
  if(master.paused()) {
    master.resume()
  }
}

const complete = () => {
  emits('complete')
  master.seek(0)
  master.paused(true)
}

const computedBoundingClientRect = (el: HTMLElement) => {
  return el.getBoundingClientRect()
}

const genPlacementArrowSlideVarsMap = () => {
  const placementArrowSlideVarsMap: Record<'left' | 'right' | 'top' | 'bottom', gsap.TweenVars> = {
    left: {
      left: `-=${computedBoundingClientRect(icon.value).left - computedBoundingClientRect(button.value).left}`,
      duration: 0.4
    },
    right: {
      // getBoundingClientRect 的 right 是指元素的右边框距离屏幕左边的距离
      left: `+=${computedBoundingClientRect(button.value).right - computedBoundingClientRect(icon.value).right}`,
      duration: 0.4
    },
    top: {
      top: `-=${computedBoundingClientRect(icon.value).top - computedBoundingClientRect(button.value).top}`,
      duration: 0.2
    },
    bottom: {
      // getBoundingClientRect 的 bottom 是指元素下边框距离屏幕上边的距离
      top: `+=${computedBoundingClientRect(button.value).bottom - computedBoundingClientRect(icon.value).bottom}`,
      duration: 0.2
    }
  }
  return placementArrowSlideVarsMap
}

const placementArrowHideVarsMap: Record<'left' | 'right' | 'top' | 'bottom', gsap.TweenVars> = {
  left:  { left: '-=100%', scaleX: 0, duration: 0.3 },
  right: { left: '+=100%', scaleX: 0, duration: 0.3 },
  top: { top: '-=100%', scaleY: 0, duration: 0.3 },
  bottom: { top: '+=100%', scaleY: 0, duration: 0.3 }
}

const placementOverlaySlideVarsMap: Record<'left' | 'right' | 'top' | 'bottom', gsap.TweenVars> = {
  left: {
    width: '100%'
  },
  right: {
    width: '100%'
  },
  top: {
    height: '100%'
  },
  bottom: {
    height: '100%'
  }
}

const placementButtonShaowVarsMap: Record<'left' | 'right' | 'top' | 'bottom', gsap.TweenVars> = {
  left: {
    boxShadow: '10px 0px 10px -10px #fff inset',
    duration: 0.2
  },
  right: {
    boxShadow: '-10px 0px 10px -10px #fff inset',
    duration: 0.2
  },
  top: {
    boxShadow: '0px 10px 10px -10px #fff inset',
    duration: 0.2
  },
  bottom: {
    boxShadow: '0px -10px 10px -10px #fff inset',
    duration: 0.2
  }
}

const showButtonShaow = () => {
  const tl = gsap.timeline()
  tl.to(button.value, placementButtonShaowVarsMap[props.placement])
  return tl
}

const arrowSlide = () => {
  const tl = gsap.timeline()
  tl.to(icon.value, {...genPlacementArrowSlideVarsMap()[props.placement], ease: 'none'})
  tl.to(icon.value, {...placementArrowHideVarsMap[props.placement], ease: 'none'})
  return tl
}

const overlaySlide = () => {
  const tl = gsap.timeline()
  tl.to(overlay.value, {...placementOverlaySlideVarsMap[props.placement], duration: 0.8})
  return tl
}

const createTimeLine = () => {
  master = gsap.timeline({
    paused: true
  })
  master.addLabel('arrowSlide')
  master.add(showButtonShaow(), 'arrowSlide')
  master.add(arrowSlide(), 'arrowSlide')
  master.add(overlaySlide(), 'arrowSlide')
  master.timeScale(props.speed)

  master.eventCallback('onComplete', complete)
}

onMounted(() => {
  createTimeLine()
})
</script>

<style scoped>

.icon-wrapper{
  margin-right: 8px;
  position: relative;
  width: 20px;
  height: 20px;
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
.icon.top{
  transform: translate(-50%, -50%) rotate(90deg);
}
.icon.right {
  transform: translate(-50%, -50%) rotate(180deg);
}
.icon.bottom {
  transform: translate(-50%, -50%) rotate(270deg);
}

.overlay{
  position: absolute;
  height: 100%;
  width: 0;
  z-index: 2;
  top: 0;
  right: 0;
  background-color: #fff;
}
.overlay.right{
  left: 0;
  right: unset;
}
.overlay.top{
  width: 100%;
  height: 0;
  bottom: 0;
  top: unset;
}
.overlay.bottom{
  width: 100%;
  height: 0;
  top: 0;
}
</style>