import { Guid } from '../structures/guid';
import { DataValueType } from '../types/data-value-types';
import { AggregationType, FilterGroup } from './types/filters';
export interface QueryConfig {
    rootSchemaName?: string;
    rootSchema?: any;
    rowCount?: number;
    clientESQCacheParameters?: QueryCacheConfig;
}
export interface QueryCacheConfig {
    cacheItemName: string;
}
export interface EntityQueryColumn {
    orderDirection: number;
    orderPosition: number;
}
declare abstract class BaseQuery {
    private config;
    protected tQuery: any;
    protected constructor(config: QueryConfig);
    query(): Promise<any>;
}
declare abstract class FilterableQuery extends BaseQuery {
    get filters(): FilterGroup;
    set filters(filters: FilterGroup);
    protected constructor(config: QueryConfig);
}
export declare class EntitySchemaQuery extends FilterableQuery {
    get isPageable(): boolean;
    set isPageable(value: boolean);
    get useRecordDeactivation(): boolean;
    set useRecordDeactivation(value: boolean);
    get rowsOffset(): number;
    set rowsOffset(value: number);
    get allColumns(): boolean;
    set allColumns(value: boolean);
    get rowCount(): number;
    set rowCount(value: number);
    get clientESQCacheParameters(): QueryCacheConfig;
    set clientESQCacheParameters(value: QueryCacheConfig);
    constructor(config: QueryConfig);
    enablePrimaryColumnFilter(id: Guid | string): void;
    addColumn(column: string, alias?: string): EntityQueryColumn;
    addColumns(columns: Array<string>): void;
    addAggregationSchemaColumn(column: string, type: AggregationType, alias?: string): void;
    queryFirst(): Promise<any>;
}
export declare class InsertQuery extends BaseQuery {
    constructor(config: QueryConfig);
    setParameterValue(column: string, value: any, valueType?: DataValueType): void;
}
export declare class UpdateQuery extends FilterableQuery {
    constructor(config: QueryConfig);
    setParameterValue(column: string, value: any, valueType?: DataValueType): void;
}
export declare class DeleteQuery extends FilterableQuery {
    constructor(config: QueryConfig);
}
export {};
