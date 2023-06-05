<template>
  <div class="m-input-container">
    <input :placeholder="placeholder" class="m-input" :value="modelValue" @input="handleChange" />
  </div>
</template>

<script lang='ts' setup generic="T">

const props = withDefaults(defineProps<{
  modelValue: T;
  placeholder?: string;
}>(), {
  placeholder:'请输入内容'
})
const emit = defineEmits<{
  'update:modelValue':[value:T]
}>()

function handleChange (e:Event) {
  emit('update:modelValue',(e.target as HTMLInputElement).value)
}


defineOptions({
  name:'m-input'
})
</script>

<style scoped lang='scss'>
.m-input-container{
  display: inline-block;
  .m-input{
    outline: none;
    padding: 5px 10px;
    border: 1px solid #eee;
    background-color: #eee;
    transition: .3s;
    &:focus{
      background-color: #fff;
      border: 1px solid rgb(80, 176, 214); 
    }
  }

}
</style>