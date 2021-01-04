<template>
  <div class="el-cascader-panel is-bordered">
    <el-cascader-menu
      v-for="(menu, index) in menus"
      :key="menu.id"
      :options="menu"
      :level="index + 1"
    >
    </el-cascader-menu>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted, toRefs, provide } from 'vue'
import { CascaderPanelProps } from './props'
import ElCascaderMenu from './CascaderMenu'
import Node from './Node.ts'
import { useEmitter } from '../../src/use/emitter'

export default defineComponent({
  components: {
    ElCascaderMenu
  },
  name: 'ElCascaderPanel',
  props: CascaderPanelProps,
  setup(props, { emit }) {
    const { on } = useEmitter()
    const { options } = toRefs(props)
    const selectNodeValue = ref([])
    const menus = ref([options.value.map((item) => new Node(item))])
    provide('selectNodeValue', selectNodeValue)

    onMounted(() => {
      on('change', (value) => {
        emit('change', value)
        selectNodeValue.value = value
      })
      on('expand-change', (item) => {
        menus.value = menus.value.splice(0, item.level)
        menus.value.push(item.children)
        emit('expand-change', item.getValuePath())
        selectNodeValue.value = item.getValuePath()
      })
    })
    return {
      menus
    }
  }
})
</script>
