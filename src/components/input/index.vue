<template>
  <div class="m-input-container">
    <input :placeholder="placeholder" :class="`m-input ${size}`" :value="modelValue" @input="handleChange" />
    <button v-if="reset&&modelValue" @click="reset" class="m-input-reset-btn">x</button>
  </div>
</template>

<script lang='ts' setup>

const props = withDefaults(defineProps<{
  modelValue: string;
  placeholder?: string;
  size?: 'small' | 'normal' | 'large';
  reset?: boolean;
}>(), {
  placeholder: '请输入内容',
  size: 'normal',
  reset:true
})

const emit = defineEmits<{
  'update:modelValue': [ value: string ]
}>()

function handleChange (e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement).value)
}

function reset () {
  emit('update:modelValue', '')
}

defineOptions({
  name: 'm-input'
})
</script>

<style scoped lang='scss'>
.m-input-container {
  width: 100%;
  display: inline-block;
  position: relative;
  .m-input {
    width: 100%;
    outline: none;
    padding: 5px 10px;
    border: 1px solid #eee;
    background-color: #eee;
    transition: .3s;
  
    &:focus {
      background-color: #fff !important;
      border: 1px solid rgb(80, 176, 214);
    }
    &.small{
      padding: 5px 10px;
      font-size: 12px;
    }
    &.normal{
      padding: 8px 12px;
      font-size: 15px;
    }
    &.large{
      padding: 8px 10px;
      font-size: 18px;
    }
  }
  .m-input-reset-btn{
    opacity: 0;
    position: absolute;
    right: 10px;
    top:50%;
    transform: translateY(-50%);
    background-color: inherit;
    border: none;
    cursor: pointer;
    transition: .3s;
  }
  &:hover .m-input-reset-btn{
    opacity: 1;
  }
  &:hover .m-input{
    background-color: #ddd;
  }
}
</style>