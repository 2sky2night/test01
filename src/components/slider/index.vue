<template>
  <div :class="{vertical}" class="slider-container">
    <!--轨道-->
    <div ref="sliderOrbit" @click="changeByClick" class="slider-orbit">
      <!--滑块-->
      <div :style="{ width: `${ modelValue }%` }" class="slider-strip">
        <!--指示器-->
        <div @click.stop="" @mousedown="hanldeMouseDown" class="slider-over"></div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { watch, ref } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: number;
  /**
   * 垂直放置？默认水平
   */
  vertical?: boolean;
}>(), {
  vertical:false
})

const emit = defineEmits<{
  'update:modelValue': [ value: number ]
}>()


const sliderOrbit = ref<HTMLDivElement | null>(null)


// 超过100 重置为100
watch(() => props.modelValue, (v) => {
  if (v >= 100) {
    emit('update:modelValue', 100)
  } else if(v<0){
    emit('update:modelValue',0)
  }
})

// 功能1 点击滑块轨道或滑块条 滑块条移动到对应位置 (获取鼠标在轨道的x坐标/轨道的总宽度)
function changeByClick (e: MouseEvent) {
  emit('update:modelValue', (e.offsetX / (sliderOrbit.value as HTMLDivElement).clientWidth) * 100)
}

// 功能2 拖动指示器移动滚动条 (通过鼠标事件实现)
function hanldeMouseDown (e: MouseEvent) {
  const element = (e.target as HTMLDivElement);
  // 按下时绑定移动的处理函数
  element.addEventListener("mousemove", handleMouseMove);
  // 松手时解除移动的处理函数
  element.addEventListener("mouseup", () => {
    element.removeEventListener("mousemove", handleMouseMove);
  })
  // 当移出指示器也需要解除移动的处理函数
  element.addEventListener("mouseleave", () => {
    element.removeEventListener("mousemove", handleMouseMove);
  })
}

// 在点击指示器并不松手拖动时的处理函数
function handleMouseMove (e: MouseEvent) {
  // 轨道
  const sliderOrbitElement = sliderOrbit.value as HTMLDivElement
  // 滑块上的指示器
  const element = e.target as HTMLDivElement
  // 若当前鼠标在指示器的x坐标小于一半就向左移动滑块
  // 根据鼠标在指示器的坐标+指示器的x偏移量来移动滑块
  let data = ((element.offsetLeft + e.offsetX) / sliderOrbitElement.clientWidth) * 100
  emit('update:modelValue', data)
}

defineOptions({
  name: 'slider'
})
</script>

<style scoped lang='scss'>
.slider-container {
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  &.vertical{
    transform: rotate(-90deg);
  }
  // 轨道
  .slider-orbit {
    height: 5px;
    width: 100%;
    cursor: pointer;
    background-color: #eee;

    // 滑块条
    .slider-strip {
      transition: .2s;
      cursor: pointer;
      height: 100%;
      background-color: skyblue;
      position: relative;

      // 滚动条上的小球
      .slider-over {
        width: 10px;
        height: 10px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -12px;
        border: 2px solid skyblue;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        box-shadow: 0 0 10px #ddd;
      }
    }
  }
}
</style>