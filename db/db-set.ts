import { requireAsync } from "../require";
import EntityMapperService from "services/entity-mapper-service";
import { QueryHelper } from "./query-helper";

export class DbSet<
  TEntity,
  TInsert,
  TSelect,
  TWhere,
  TOrder> {
  private schema: any;

  constructor(private schemaName: string) {
    this.schema = window.Terrasoft[this.schemaName];
  }

  public async create(query: TInsert) {
    let schema = this.schema ?? await requireAsync([this.schemaName]);
    const insertQuery = QueryHelper.buildInsert(schema, query);

    await insertQuery.executeAsync();
  }

  public async update(query: Update<TEntity, TWhere>) {
    let schema = this.schema ?? await requireAsync([this.schemaName]);
    const updateQuery = QueryHelper.buildUpdate(schema, query);

    await updateQuery.executeAsync();
  }

  public async delete(query: Delete<TWhere>) {
    let schema = this.schema ?? await requireAsync([this.schemaName]);
    const deleteQuery = QueryHelper.buildDelete(schema, query);

    await deleteQuery.executeAsync();
  }

  public async find(query: Select<TSelect, TWhere, TOrder>): Promise<TEntity> {
    const esq = QueryHelper.buildSelect(this.schemaName, query, {
      rowCount: 1
    });

    let result = await esq.queryFirstAsync();
    return EntityMapperService.map<TEntity>(result.values);
  }

  public async findMany(query: Select<TSelect, TWhere, TOrder>): Promise<Array<TEntity>> {
    const esq = QueryHelper.buildSelect(this.schemaName, query, {});

    let result = await esq.queryAsync();
    return result.collection.collection.items.map(x => EntityMapperService.map<TEntity>(x.values));
  }

  public async aggregate(query: Aggregate<TSelect, TWhere>): Promise<number> {
    const esq = QueryHelper.buildAggregate(this.schemaName, query, {});

    let result = await esq.queryFirstAsync();
    return result.$EsqAggregation ?? 0;
  }
}

export class DynamicDbSet extends DbSet<any, Insert<any>, any, any, any> {
  constructor(schemaName: string) {
    super(schemaName)
  }
}
