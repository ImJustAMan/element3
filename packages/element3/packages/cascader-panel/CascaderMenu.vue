<template>
  <el-scrollbar
    tag="ul"
    role="menu"
    class="el-cascader-menu"
    :data-level="level"
  >
    <el-cascader-node v-for="node in options" :node="node" :key="node.id">
    </el-cascader-node>
  </el-scrollbar>
</template>

<script>
import { defineComponent } from 'vue'
import ElScrollbar from '../scrollbar'
import { CascaderMenuProps } from './props'
import ElCascaderNode from './CascaderNode'

export default defineComponent({
  components: {
    ElScrollbar,
    ElCascaderNode
  },
  name: 'ElCascaderMenu',
  props: CascaderMenuProps
})
</script>
