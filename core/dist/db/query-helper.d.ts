import { DeleteQuery, EntitySchemaQuery, InsertQuery, UpdateQuery } from './esq';
export declare class QueryHelper {
    static buildInsert(schema: any, query: any): InsertQuery;
    static buildUpdate(schema: any, query: any): Promise<UpdateQuery>;
    static buildDelete(schema: any, query: any): Promise<DeleteQuery>;
    static buildSelect(schema: any, query: any, options: any): Promise<EntitySchemaQuery>;
    static buildAggregate(schema: any, query: any, options: any): Promise<EntitySchemaQuery>;
    private static buildColumns;
    private static buildFilters;
    private static buildOrdering;
    private static mapFilter;
    private static mapGroup;
    private static mapOrder;
    private static mapAggregate;
    private static createWhere;
    private static createGroup;
    private static createExists;
    private static createNestedColumnFilter;
    private static reduceNestedColumnPath;
    private static getNestedColumnValue;
}
