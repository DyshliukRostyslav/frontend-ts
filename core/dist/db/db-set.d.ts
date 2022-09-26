export declare class DbSet<TEntity, TInsert, TSelect, TWhere, TOrder> {
    private schemaName;
    private schema;
    constructor(schemaName: string);
    create(query: TInsert): Promise<void>;
    update(query: Update<TEntity, TWhere>): Promise<void>;
    delete(query: Delete<TWhere>): Promise<void>;
    find(query: Select<TSelect, TWhere, TOrder>): Promise<TEntity>;
    findMany(query: Select<TSelect, TWhere, TOrder>): Promise<Array<TEntity>>;
    aggregate(query: Aggregate<TSelect, TWhere>): Promise<number>;
    private getEntitySchema;
}
export declare class DynamicDbSet extends DbSet<any, Insert<any>, any, any, any> {
    constructor(schemaName: string);
}
