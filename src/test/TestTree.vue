<template>
  <div>
    <Tree :data="data" />
  </div>
</template>

<script lang='ts' setup>
import Tree from '@/components/tree/index.vue'
import type { TreeType } from '@/components/tree/types';

const data: TreeType[] = [
  {
    key: 1,
    value: '001-收藏',
    children: [
      {
        key: 2,
        value: '001-01-收藏的美食'
      },
      {
        key: 3,
        value: '001-02-收藏的衣物',
        children: [
          {
            key: 4,
            value: '001-02-1-收藏的裤子'
          }, {
            key: 5,
            value: '001-02-2-收藏的衣服'
          },
        ]
      }
    ]
  },
  {
    key: 6,
    value: '002-黑名单',
    children: [
      {
        key: 7,
        value: '002-01-拉黑的用户'
      },
      {
        key: 8,
        value: '002-02-拉黑的商家',
        children: [
          {
            key: 9,
            value: '002-02-1-vip商家',
            children: [
              {
                key: 10,
                value: '天天开心'
              }
            ]
          },
          {
            key: 11,
            value: '002-02-1-普通商家',
            children: [
              {
                key: 12,
                value: '芙蓉兴盛'
              }
            ]
          }
        ]
      }
    ]
  }
]

</script>

<style scoped lang='scss'>
div {
  box-sizing: border-box;
  padding: 10px 20px;
}
</style>