<template>
  <button class="__ani-button" :class="{small: size === 'small', large: size === 'large'}" ref="button" @click="reverse">
    <div class="icon-wrapper" :class="{'no-margin': !$slots.default}">
      <div
        class="icon"
        :style="_value ? style.hide : style.show"
        :ref="el => { if(_value) { endIcon = el  } else { startIcon = el } }"
      > 
        <SvgIcon
          v-if="!$slots.startIcon"
          name="icon-bukaixinxingxing2"
          color="#999"
          :size="iconSize"
        >
        </SvgIcon>
        <slot name="startIcon"></slot>
      </div>
      <div class="panel" ref="panel"></div>
      <div
        class="icon"
        :style="_value ? style.show : style.hide"
        :ref="el => { if(_value) { startIcon = el  } else { endIcon = el } }"
      >
        <SvgIcon
          v-if="!$slots.endIcon"
          name="icon-kaixinxingxing"
          color="#ffca04"
          :size="iconSize"
        >
        </SvgIcon>
        <slot name="endIcon"></slot>
      </div>
    </div>
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'FavoriteButton'
}
</script>

<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import gsap from 'gsap'
import SvgIcon from '../svg-icon/index.vue'

const props = withDefaults(defineProps<{
  initValue?: boolean
  size?: ButtonSize
  iconSize?: number
  speed?: number
}>(), {
  initValue: false,
  size: 'default',
  iconSize: 18,
  speed: 1
})
const emits = defineEmits<{
  (e: 'click'): void
  (e: 'complete'): void
}>()

let active = false
let callback: (() => void) | null = null

const _value = ref(props.initValue)


watch(() => props.initValue, (val) => {
  callback = () => {
    _value.value = val
    nextTick(() => {
      ;(master as any) = null
      createTimeLine()
      gsap.set(startIcon.value, {
        scale: 1
      })
      gsap.set(endIcon.value, {
        scale: 0
      })
    })
  }
  if(!active) {
    callback()
    callback = null
  }
})

const style = ref<{
  show: Record<string, string>,
  hide: Record<string, string>
}>({
  show: {
  },
  hide: {
    transform: 'translate(-50%, -50%) scale(0)'
  }
})

let master: gsap.core.Timeline

const button = ref<any>(null)
const startIcon = ref<any>(null)
const panel = ref<any>(null)
const endIcon = ref<any>(null)

const reverse = () => {
  active = true
  emits('click')
  if(master.paused()) {
    master.resume()
  } else {
    !master.isActive() && master.reversed(!master.reversed())
  }
}

const complete = () => {
  master.add(buttonShake())
  emits('complete')
  callback && callback()
  active = false
}

const buttonShake = () => {
  const tl = gsap.timeline()
  tl.to(button.value, {
    y: '-=6',
    duration: 0.1
  }).to(button.value, {
    y: '+=12',
    duration: 0.2
  }).to(button.value, {
    y: '-=6',
    duration: 0.1
  })
  return tl
}

const startStarJump = () => {
  const tl = gsap.timeline()
  tl.to(startIcon.value, {
    rotate: 360,
    y: '-=40',
    duration: 0.4
  })
  tl.to(startIcon.value, {
    rotate: 0,
    y: '+=40',
    duration: 0.4
  })
  tl.to(startIcon.value, {
    scale: 0,
    duration: 0.2
  }, 0.6)
  return tl
}

const showPanel = () => {
  const tl = gsap.timeline()
  tl.to(panel.value, {
    scale: 1,
    duration: 0.4
  })
  return tl
}

const endStarJump = () => {
  const tl = gsap.timeline()
  tl.to(endIcon.value, {
    scale: 1,
    duration: 0.2
  })
  master.addLabel('hidedPanel')
  tl.to(endIcon.value, {
    rotate: 360,
    y: '-=40',
    duration: 0.4
  }, 0)
  tl.to(endIcon.value, {
    rotate: 0,
    y: '+=40',
    duration: 0.4
  })
  return tl
}

const hidedPanel = () => {
  const tl = gsap.timeline()
  tl.to(panel.value, {
    scale: 0,
    duration: 0.4
  })
  return tl
}

const createTimeLine = () => {
  master = gsap.timeline({
    paused: true
  })
  master.addLabel('showPanel')
  master.add(startStarJump(), 'showPanel')
  master.add(showPanel(), 'showPanel')
  master.add(endStarJump())
  master.add(hidedPanel(), 'hidedPanel')

  master.eventCallback('onComplete', complete)
  master.eventCallback('onReverseComplete', complete)
  master.timeScale(props.speed)
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
.panel{
  position: absolute;
  bottom: 4px;
  left: -1px;
  width: 20px;
  height: 12px;
  background: #0b0b0b;
  border-radius: 60%;
  transform: scale(0);
  z-index: 1;
}

.icon{
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 2;
  height: 100%;
  display: flex;
  align-items: center;
}
</style>