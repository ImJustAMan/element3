export interface IOptions {
  [key: string]: string | number | IOptions[]
}

export interface IConfig {
  value?: string
  label?: string
  children?: string
}
