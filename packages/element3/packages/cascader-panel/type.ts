export interface IOptions {
  [key: string]: string | number | boolean | IOptions[]
}

export interface IConfig {
  value: string
  label: string
  children: string
  disabled: string
  emitPath: boolean
}
