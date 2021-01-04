import { mount } from '@vue/test-utils'
import CascaderPanel from '../CascaderPanel'

describe('CascaderPanel', () => {
  it('render only one node', () => {
    const wrapper = mount(CascaderPanel, {
      props: {
        options: [{ value: 'value', label: 'label' }]
      }
    })

    expect(wrapper).toHaveClass('el-cascader-panel')
    expect(
      wrapper.find('.el-cascader-panel .el-cascader-node').exists()
    ).toBeTruthy()
    expect(wrapper.find('.el-cascader-panel .el-cascader-node').text()).toBe(
      'label'
    )
  })
  describe('click', () => {
    it('click for select leaf node', async () => {
      const wrapper = mount(CascaderPanel, {
        props: {
          options: [{ value: 'value', label: 'label' }]
        }
      })
      await wrapper.find('.el-cascader-node').trigger('click')

      expect(wrapper.find('.el-cascader-node').classes()).toContain('is-active')
      expect(wrapper.find('.el-icon-check').exists()).toBeTruthy()
      expect(wrapper.emitted().change).toEqual([[['value']]])
    })
    it('render children and click for expand', async () => {
      const wrapper = mount(CascaderPanel, {
        props: {
          options: [
            {
              value: 'value',
              label: 'label',
              children: [
                {
                  value: 'childValue',
                  label: 'childLabel'
                }
              ]
            }
          ]
        }
      })

      expect(wrapper.findAll('.el-cascader-menu').length).toBe(1)
      await wrapper.find('.el-cascader-node').trigger('click')

      expect(wrapper.find('[data-level = "1"] .el-cascader-node')).toHaveClass(
        'in-active-path'
      )
      expect(wrapper.emitted()['expand-change']).toEqual([[['value']]])
      expect(wrapper.findAll('.el-cascader-menu').length).toBe(2)
    })
    it('click for change expand node', async () => {
      const wrapper = mount(CascaderPanel, {
        props: {
          options: [
            {
              value: 'value1',
              label: 'label1',
              children: [
                {
                  value: 'childValue1',
                  label: 'childLabel1'
                }
              ]
            },
            {
              value: 'value2',
              label: 'label2',
              children: [
                {
                  value: 'childValue2',
                  label: 'childLabel2'
                }
              ]
            }
          ]
        }
      })

      expect(wrapper.findAll('.el-cascader-menu').length).toBe(1)

      await wrapper
        .findAll('[data-level = "1"] .el-cascader-node')[0]
        .trigger('click')
      expect(wrapper.emitted()['expand-change'][0]).toEqual([['value1']])
      expect(wrapper.findAll('.el-cascader-menu').length).toBe(2)

      await wrapper
        .findAll('[data-level = "1"] .el-cascader-node')[1]
        .trigger('click')
      expect(wrapper.emitted()['expand-change'][1]).toEqual([['value2']])
      expect(wrapper.findAll('.el-cascader-menu').length).toBe(2)
    })
  })
})
