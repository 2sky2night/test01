<template>
  <Slider v-model="count" />
  <button @click="count++">count++</button>
</template>

<script lang='ts' setup>
import { ref } from 'vue'
import Slider from '@/components/slider/index.vue'
const count = ref(0)
</script>

<style scoped lang='scss'></style>