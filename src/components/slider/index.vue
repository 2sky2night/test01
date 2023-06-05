<template>
  <div class="slider-container">
    <div  @dragover.stop="handleDarg" ref="sliderOrbit" @click="changeByClick" class="slider-orbit">
      <div @dragover.stop="handleDarg" :style="{width:`${modelValue}%`}" class="slider-strip">
        <div @click.stop="" draggable="true" class="slider-over"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { watch, ref } from 'vue'

const props = defineProps<{
  modelValue: number;
}>()

const emit = defineEmits<{
  'update:modelValue':[value:number]
}>()


const sliderOrbit = ref<HTMLDivElement | null>(null)


// 超过100 重置为100
watch(() => props.modelValue, (v) => {
  if (v >= 100) {
    emit('update:modelValue',100)
  }
})

// 功能1 点击滑块轨道或滑块条 滑块条移动到对应位置 (获取鼠标在轨道的x坐标/轨道的总宽度)
function changeByClick (e: MouseEvent) {
  emit('update:modelValue',(e.offsetX/(sliderOrbit.value as HTMLDivElement).clientWidth)*100)
}

// 功能2 拖动滚动条上的圆圈移动滚动条 （需要开启滚动条可放置拖动元素 圆圈开启拖拽）
function handleDarg(e:DragEvent){
  emit('update:modelValue',(e.offsetX/(sliderOrbit.value as HTMLDivElement).clientWidth)*100)
}

defineOptions({
  name:'slider'
})
</script>

<style scoped lang='scss'>
.slider-container{
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  // 轨道
  .slider-orbit{
    height: 10px;
    width: 100%;
    background-color: #eee;
    // 滑块条
    .slider-strip{
      transition: .3s;
      height: 100%;
      background-color: skyblue;
      position: relative;
      // 滚动条上的小球
      .slider-over{
        width: 15px;
        height: 15px;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
        right: -12px;
        border: 1px solid skyblue;
        border-radius: 50%;
        background-color: #fff;
        box-shadow:0 0 10px #eee;
      } 
    }
  }
}
</style>