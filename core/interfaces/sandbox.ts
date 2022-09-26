import { ModuleConfig } from '../ui/models/ui';

export interface Sandbox {
  id: string
  moduleName: string
  subscribe: (event: string, handler?: Function, scope?: any, tags?: Array<string>) => void
  publish: (event: string, data: Object | null, tags: Array<string>) => any
  loadModule: (moduleName: string, config: ModuleConfig) => void
}
