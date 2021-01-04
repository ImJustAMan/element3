import { IConfig, IOptions } from './type'

let id = 0

export default class Node {
  options: IOptions
  children: Node[]
  parent: Node
  pathNodes: Node[]
  level: number
  value: string | number
  label: string
  leaf: boolean
  id: number
  constructor(options: IOptions, config: IConfig, parentNode?: Node) {
    this.options = options
    this.parent = parentNode
    this.pathNodes = this.calcNodes()
    this.level = parentNode ? parentNode.level + 1 : 1

    this.value = options[config.value] as number | string
    this.label = options[config.label] as string
    this.children = (this.options[config.children] as IOptions[])?.map(
      (item) => new Node(item, config, this)
    )
    this.leaf = !this.children || this.children.length === 0
    this.id = id++
  }
  getValuePath(): (number | string)[] {
    return this.pathNodes.map((item) => item.value)
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
