/**
 * 树的数据结构
 */
export interface TreeType {
  key: number | string;
  value:string;
  children?:TreeType[]
}

/**
 * 组件的自定义属性
 */
export interface TreeProps {
  data:TreeType[]
}

/**
 * 格式化后的树的数据结构（对于有孩子的父组件需要添加isExpend属性表示是否展开）
 */
export interface TreeFormatType extends TreeType {
  isExpand?:boolean
}