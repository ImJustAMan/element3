<template>
  <li
    role="menuitem"
    :class="{
      'el-cascader-node': true,
      'is-active': showCheckedIcon,
      'in-active-path': !node.leaf && selectNodeValue.includes(node.value),
      'is-disabled': node.disabled
    }"
    :key="node.value"
    @click="handleClick"
  >
    <i
      v-if="showCheckedIcon"
      class="el-icon-check el-cascader-node__prefix"
    ></i>
    <span class="el-cascader-node__label">
      {{ node.label }}
    </span>
  </li>
</template>

<script>
import { computed, defineComponent, inject, toRefs } from 'vue'
import { CascaderNodeProps } from './props'
import { useEmitter } from '../../src/use/emitter'

export default defineComponent({
  name: 'ElCascaderNode',
  props: CascaderNodeProps,
  setup(props) {
    const { node } = toRefs(props)
    const { dispatch } = useEmitter()
    const selectNodeValue = inject('selectNodeValue', [])
    const showCheckedIcon = computed(
      () =>
        node.value.leaf &&
        node.value.value ===
          selectNodeValue.value[selectNodeValue.value.length - 1]
    )

    const handleClick = () => {
      if (node.value.disabled) return
      if (node.value.leaf) {
        dispatch('change', node.value.getValuePath())
      } else {
        dispatch('expand-change', node.value)
      }
    }

    return {
      selectNodeValue,
      showCheckedIcon,
      handleClick
    }
  }
})
</script>
