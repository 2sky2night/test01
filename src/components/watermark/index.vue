<template>
  <div class="watermark-container">
    <slot name="default"></slot>
    <div v-if="isShow" :style="{ background: `url(${ src })` }" class="watermark"></div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import {WatermarkExposed} from './types'

const props = defineProps<{
  /**
   * 水印的图片地址
   */
  src: string;
}>()

const slots = defineSlots<{
  default: () => void
}>()


const isShow=ref(true)

function closeWatermark () {
  isShow.value=false
}

function openWatermark () {
  isShow.value=true
}


defineExpose<WatermarkExposed>({
  closeWatermark,
  openWatermark
})

defineOptions({
  name: 'watermark'
})
</script>

<style scoped lang='scss'>
.watermark-container {
  position: relative;

  .watermark {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-repeat: repeat;
    pointer-events: none;
  }
}
</style>