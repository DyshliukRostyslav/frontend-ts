import { Guid } from '../structures/guid';
import { DataValueType } from '../types/data-value-types';
import { AggregationType, FilterGroup } from './types/filters';

export interface QueryConfig {
  rootSchemaName?: string
  rootSchema?: any
  rowCount?: number
  clientESQCacheParameters?: QueryCacheConfig
}

export interface QueryCacheConfig {
  cacheItemName: string
}

export interface EntityQueryColumn {
  orderDirection: number
  orderPosition: number
}

abstract class BaseQuery {
  protected tQuery: any;

  protected constructor(private config: QueryConfig) {}

  public query(): Promise<any> {
    return new Promise(resolve => this.tQuery.execute(resolve, this));
  }
}

abstract class FilterableQuery extends BaseQuery {
  public get filters(): FilterGroup {
    return this.tQuery.filters;
  }
  public set filters(filters: FilterGroup) {
    this.tQuery.filters = filters;
  }

  protected constructor(config: QueryConfig) {
    super(config);
  }
}

export class EntitySchemaQuery extends FilterableQuery {
  public get isPageable(): boolean {
    return this.tQuery.isPageable;
  }
  public set isPageable(value: boolean) {
    this.tQuery.isPageable = value;
  }

  public get useRecordDeactivation(): boolean {
    return this.tQuery.useRecordDeactivation;
  }
  public set useRecordDeactivation(value: boolean) {
    this.tQuery.useRecordDeactivation = value;
  }

  public get rowsOffset(): number {
    return this.tQuery.rowsOffset;
  }
  public set rowsOffset(value: number) {
    this.tQuery.rowsOffset = value;
  }

  public get allColumns(): boolean {
    return this.tQuery.allColumns;
  }
  public set allColumns(value: boolean) {
    this.tQuery.allColumns = value;
  }

  public get rowCount(): number {
    return this.tQuery.rowCount;
  }
  public set rowCount(value: number) {
    this.tQuery.rowCount = value;
  }

  public get clientESQCacheParameters(): QueryCacheConfig {
    return this.tQuery.clientESQCacheParameters;
  }
  public set clientESQCacheParameters(value: QueryCacheConfig) {
    this.tQuery.clientESQCacheParameters = value;
  }

  public constructor(config: QueryConfig) {
    super(config);
    this.tQuery = window.Ext.create('Terrasoft.EntitySchemaQuery', config);
  }

  public enablePrimaryColumnFilter(id: Guid | string): void {
    this.tQuery.enablePrimaryColumnFilter(id);
  }

  public addColumn(column: string, alias?: string): EntityQueryColumn {
    return this.tQuery.addColumn(column, alias);
  }

  public addColumns(columns: Array<string>): void {
    this.tQuery.addColumns(columns);
  }

  public addAggregationSchemaColumn(column: string, type: AggregationType, alias?: string): void {
    this.tQuery.addAggregationSchemaColumn(column, type, alias);
  }

  public async queryFirst() {
    this.rowCount = 1;
    const result = await this.query();
    return result.collection?.first();
  }
}

export class InsertQuery extends BaseQuery {
  constructor(config: QueryConfig) {
    super(config);
    this.tQuery = window.Ext.create('Terrasoft.InsertQuery', config);
  }

  public setParameterValue(column: string, value: any, valueType?: DataValueType) {
    this.tQuery.setParameterValue(column, value, valueType);
  }
}

export class UpdateQuery extends FilterableQuery {
  constructor(config: QueryConfig) {
    super(config);
    this.tQuery = window.Ext.create('Terrasoft.UpdateQuery', config);
  }

  public setParameterValue(column: string, value: any, valueType?: DataValueType) {
    this.tQuery.setParameterValue(column, value, valueType);
  }
}

export class DeleteQuery extends FilterableQuery {
  constructor(config: QueryConfig) {
    super(config);
    this.tQuery = window.Ext.create('Terrasoft.DeleteQuery', config);
  }
}
