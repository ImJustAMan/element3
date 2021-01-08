import { IConfig, IOptions } from './type'

let id = 0

export default class Node {
  options: IOptions
  config: IConfig
  children: Node[]
  parent: Node
  pathNodes: Node[]
  level: number
  value: string | number
  label: string
  leaf: boolean
  id: number
  disabled: boolean
  constructor(options: IOptions, config: IConfig, parentNode?: Node) {
    this.options = options
    this.config = config
    this.parent = parentNode
    this.pathNodes = this.calcNodes()
    this.level = parentNode ? parentNode.level + 1 : 1

    this.initNode()
  }
  initNode(): void {
    this.value = this.options[this.config.value] as number | string
    this.label = this.options[this.config.label] as string
    this.children = (this.options[this.config.children] as IOptions[])?.map(
      (item) => new Node(item, this.config, this)
    )
    this.leaf = !this.children || this.children.length === 0
    this.id = id++
    this.disabled = this.options[this.config.disabled] as boolean
  }
  getValuePath(): (number | string)[] | string | number {
    return this.config.emitPath
      ? this.pathNodes.map((item) => item.value)
      : this.value
  }
  calcNodes(this: Node): Node[] {
    const nodes = [this]
    let parent = this.parent

    while (parent) {
      nodes.unshift(parent)
      parent = parent.parent
    }

    return nodes
  }
}
