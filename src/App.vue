<script setup lang="ts">
import { ref } from 'vue'
import Minput from '@/components/input/index.vue'

const name = ref('')

</script>

<template>
  <div>
    <Minput v-model="name" />
    {{ name }}
  </div>
</template>

<style scoped></style>
