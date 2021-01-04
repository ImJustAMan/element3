import { IOptions } from './type'

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
  constructor(options: IOptions, parentNode?: Node) {
    this.options = options
    this.parent = parentNode
    this.pathNodes = this.calcNodes()
    this.level = parentNode ? parentNode.level + 1 : 1

    this.value = options.value
    this.label = options.label
    this.children = (this.options.children || []).map(
      (item) => new Node(item, this)
    )
    this.leaf = !this.children || this.children.length === 0
    this.id = id++
  }
  getValuePath(): IOptions['value'][] {
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
