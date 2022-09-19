import { ModuleConfig } from "@el-sdk/ui/models/ui"

export interface Sandbox {
  id: string
  moduleName: string
  subscribe: (event: string, handler: Function, scope: any, tags: Array<string>) => void
  publish: (event: string, data: Object, tags: Array<string>) => any
  loadModule: (moduleName: string, config: ModuleConfig) => void
}