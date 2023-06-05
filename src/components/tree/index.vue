<template>
  <ul class="m-tree-container" :class="{ 'children-container': data.length > 0 }">

    <!--每个节点-->
    <li class="tree-item" v-for="      item       in dataFormat" :key="item.key">
      <!--标题-->
      <div class="tree-title">
        <template v-if="item.children">
          <button class="expend-btn" :class="{ 'is-expend': item.isExpand }" @click="() => handleExpend(item.key)">
            ▶
          </button>
          <span>{{ item.value }}</span>
        </template>
        <template v-else>
          <span style="margin-left: 20px;">{{ item.value }}</span>
        </template>
      </div> 
      <!--子节点-->
      <template v-if="item.children">
        <Transition name="expend">
          <index :data="item.children" v-if="item.isExpand" />
        </Transition>
      </template>
    </li>

  </ul>
</template>

<script lang='ts' setup>
import { reactive } from 'vue';
import type { TreeProps, TreeFormatType } from './types'

const props = defineProps<TreeProps>()

const dataFormat: TreeFormatType[] = reactive(props.data.map(ele => {
  if (ele.children) {
    return { ...ele, isExpand: false }
  } else {
    return { ...ele }
  }
}))

function handleExpend (key: number | string) {
  dataFormat.filter(ele => ele.isExpand !== undefined).some(ele => {
    if (ele.key === key) {
      ele.isExpand = !ele.isExpand
      return true
    }
  })
}



</script>

<style scoped lang='scss'>
.m-tree-container {
  box-sizing: border-box;

  .tree-item {
    .expend-btn {
      background-color: #fff;
      border: none;
      height: 15px;
      width: 15px;
      line-height: 15px;
      margin-right: 5px;
      color: #9c9c9c;
      transition: .3s;

      &.is-expend {
        transform: rotate(90deg);
      }
    }

    .children-container {
      padding-left: 20px;
      transition: .3s;
    }

    .tree-title {
      display: flex;
      padding: 5px;
      align-items: center;

      span {
        padding: 5px;
        flex-grow: 1;
        cursor: pointer;
        transition: .3s;
      }

      span:hover {
        background-color: #eee;
      }
    }
  }
}

.expend-enter-active {
  transform-origin: top center;
  animation: expend .3s 1 ease-in-out;
}

// .expend-leave-active{
//   transform-origin: top center;
//   animation: expend .3s 1 ease-in-out reverse;
// }

@keyframes expend {
  from {
    transform: scaleY(0);
    opacity: 0;
  }

  to {
    transform: scaleY(1);
    opacity: 1;
  }
}
</style>