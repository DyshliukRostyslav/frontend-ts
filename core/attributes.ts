import { Bindable } from './types/bindable';
import { DataValueType } from './types/data-value-types';

export enum ViewModelColumnType {
  ENTITY_COLUMN = 0,
  CALCULATED_COLUMN = 1,
  VIRTUAL_COLUMN = 2,
  RESOURCE_COLUMN = 3
}

export interface Attributes extends Record<string, Attribute> {

}

export interface Attribute {
  dataValueType?: DataValueType
  type?: ViewModelColumnType
  lookupListConfig?: LookupListConfig
  onChange?: string
  caption?: string | Bindable
  value?: any
  dependencies?: Array<AttributeDependency>
  isLookup?: boolean
  referenceSchemaName?: string
}

export interface LookupListConfig {
  columns?: Array<string>
  filter?: Function
}

export interface AttributeDependency {
  methodName?: string
  columns?: Array<string>
}
