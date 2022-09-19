import {Guid} from "../../structures/guid";

export interface SetOptions {
  silent?: boolean;
  preventValidation?: boolean;
  skipValidation?: boolean;
}

export interface ValidationResult {
  invalidMessage: string;
}

export interface ModuleConfig {
  id?: string
  renderTo?: string
  keepAlive?: boolean
  reload?: boolean
}

export interface Lookup {
  value: Guid | string
  displayValue: string
}

export type NullableLookup = Lookup | null;

export interface SaveConfig {
  isSilent: boolean,
  callback: () => void,
  scope: any
}

export enum CardState {
  VIEW = 'view',
  ADD = 'add',
  EDIT = 'edit',
  COPY = 'copy'
}

