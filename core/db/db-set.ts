import EntityMapperService from "../services/entity-mapper-service";
import { QueryHelper } from "./query-helper";
import { getEntitySchema } from "./entity-schema";

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
    const schema = await this.getEntitySchema();
    const insertQuery = QueryHelper.buildInsert(schema, query);

    await insertQuery.query();
  }

  public async update(query: Update<TEntity, TWhere>) {
    const schema = await this.getEntitySchema();
    const updateQuery = await QueryHelper.buildUpdate(schema, query);

    await updateQuery.query();
  }

  public async delete(query: Delete<TWhere>) {
    const schema = await this.getEntitySchema();
    const deleteQuery = await QueryHelper.buildDelete(schema, query);

    await deleteQuery.query();
  }

  public async find(query: Select<TSelect, TWhere, TOrder>): Promise<TEntity> {
    const schema = await this.getEntitySchema();
    const esq = await QueryHelper.buildSelect(schema, query, {
      rowCount: 1
    });

    let result = await esq.queryFirst();
    return EntityMapperService.map<TEntity>(result?.values);
  }

  public async findMany(query: Select<TSelect, TWhere, TOrder>): Promise<Array<TEntity>> {
    const schema = await this.getEntitySchema();
    const esq = await QueryHelper.buildSelect(schema, query, {});

    let result = await esq.query();
    return result.collection.collection.items.map(x => EntityMapperService.map<TEntity>(x.values));
  }

  public async aggregate(query: Aggregate<TSelect, TWhere>): Promise<number> {
    const schema = await this.getEntitySchema();
    const esq = await QueryHelper.buildAggregate(schema, query, {});

    let result = await esq.queryFirst();
    return result.$EsqAggregation ?? 0;
  }

  private async getEntitySchema(): Promise<any> {
    return this.schema ?? (this.schema = await getEntitySchema(this.schemaName));
  }
}

export class DynamicDbSet extends DbSet<any, Insert<any>, any, any, any> {
  constructor(schemaName: string) {
    super(schemaName)
  }
}
