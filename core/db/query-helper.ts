import {
  createContainsFilter,
  createEndsWithFilter,
  createEqualsFilter,
  createFilterGroup,
  createGreaterFilter,
  createGreaterOrEqualsFilter,
  createInFilter,
  createLessFilter,
  createLessOrEqualsFilter,
  createNotEqualsFilter,
  createNotInFilter,
  createStartsWithFilter,
  createExistsFilter,
  createNotExistsFilter,
  createIsNullFilter,
  createIsNotNullFilter,
  FilterGroup,
  LogicalOperator,
  ExistsFilter,
  FilterType,
  AggregationType,
  Filter
} from './types/filters';
import { DeleteQuery, EntitySchemaQuery, InsertQuery, UpdateQuery } from './esq';
import { getEntitySchema, isLookupColumn, isValidColumnPath } from './entity-schema';

export class QueryHelper {
  public static buildInsert(schema: any, query: any): InsertQuery {
    const insertQuery = new InsertQuery({
      rootSchema: schema
    });

    for (let prop in query.data) {
      const value = query.data[prop];
      if (isLookupColumn(prop, schema)) {
        prop = prop.substring(0, prop.length - 2);
      }
      insertQuery.setParameterValue(prop, value);
    }

    return insertQuery;
  }

  public static async buildUpdate(schema: any, query: any): Promise<UpdateQuery> {
    const updateQuery = new UpdateQuery({
      rootSchema: schema
    });

    for (let prop in query.data) {
      const value = query.data[prop];
      if (isLookupColumn(prop, schema)) {
        prop = prop.substring(0, prop.length - 2);
      }
      updateQuery.setParameterValue(prop, value);
    }

    updateQuery.filters = await this.buildFilters(query.where, schema);

    return updateQuery;
  }

  public static async buildDelete(schema: any, query: any): Promise<DeleteQuery> {
    const deleteQuery = new DeleteQuery({
      rootSchema: schema
    });
    deleteQuery.filters = await this.buildFilters(query.where, schema);

    return deleteQuery;
  }

  public static async buildSelect(schema: any, query: any, options: any): Promise<EntitySchemaQuery> {
    const esq = new EntitySchemaQuery(Object.assign({
      rootSchemaName: schema.name
    }, options));

    if (query.skip) {
      esq.isPageable = true;
      esq.rowsOffset = query.skip;
    }
    if (query.take) {
      esq.isPageable = true;
      esq.rowCount = query.take;
    }
    if (query.softDelete) {
      esq.useRecordDeactivation = true;
    }
    if (query.cache) {
      esq.clientESQCacheParameters = {
        cacheItemName: query.cache
      };
    }

    const columns = this.buildColumns(query.select, schema);

    if (!columns.length) {
      esq.allColumns = true;
    }
    columns.forEach(column => esq.addColumn(column.name, column.alias));

    esq.filters = await this.buildFilters(query.where, schema);
    this.buildOrdering(query.orderBy, esq);

    return esq;
  }

  public static async buildAggregate(schema: any, query: any, options: any): Promise<EntitySchemaQuery> {
    const esq = await this.buildSelect(schema, query, options);

    const aggregate = Object.getOwnPropertyNames(query).filter(x => x !== 'where')[0];
    const aggregateValue = query[aggregate];

    const aggregateColumn = Object.getOwnPropertyNames(aggregateValue)[0];

    if (aggregateValue[aggregateColumn] === true) {
      esq.allColumns = false;
      esq.addAggregationSchemaColumn(aggregateColumn, this.mapAggregate(aggregate), 'EsqAggregation');
    }

    return esq;
  }

  private static buildColumns(select: any, schema: any): Array<QueryColumn> {
    const columns: Array<QueryColumn> = [];
    if (select) {
      function parseColumns(innerSelect: any, columnPath: string) {
        Object.getOwnPropertyNames(innerSelect).forEach(column => {
          const selectValue = innerSelect[column];

          if (selectValue === true) {
            if (isLookupColumn(column, schema)) {
              column = `${column.substring(0, column.length - 2)}.Id`;
            }
            columns.push({
              name: columnPath ? columnPath + column : column
            });
          } else if (typeof selectValue === 'object') {
            if (selectValue.alias) {
              const alias = selectValue?.alias;
              columns.push({
                name: columnPath ? columnPath + column : column,
                alias: alias
              });
            }

            parseColumns(selectValue, `${columnPath + column}.`);
          }
        });
      }

      parseColumns(select, '');
    }

    return columns;
  }

  private static async buildFilters(where: any, schema: any): Promise<FilterGroup> {
    const filterGroup = createFilterGroup();

    await this.createWhere(where, filterGroup, schema);

    return filterGroup;
  }

  private static buildOrdering(orderBy: any, query: any): void {
    let orderPosition = 0;
    if (orderBy) {
      function parseColumns(innerOrder: any, columnPath: string) {
        Object.getOwnPropertyNames(innerOrder).forEach((prop, i) => {
          const value = innerOrder[prop];

          if (typeof value === 'string') {
            const column = query.columns.contains(columnPath + prop)
              ? query.columns.get(columnPath + prop)
              : query.addColumn(columnPath + prop);

            QueryHelper.mapOrder(value, column);
            column.orderPosition = orderPosition + i;
            orderPosition++;
          } else if (typeof value === 'object') {
            parseColumns(value, `${columnPath + prop}.`);
          }
        });
      }

      parseColumns(orderBy, '');
    }
  }

  private static mapFilter(filter: string, column: string, value: any): Filter | null {
    switch (filter) {
      case 'equals': return value === null
        ? createIsNullFilter(column)
        : createEqualsFilter(column, value);
      case 'notEquals': return value === null
        ? createIsNotNullFilter(column)
        : createNotEqualsFilter(column, value);
      case 'in': return createInFilter(column, value);
      case 'notIn': return createNotInFilter(column, value);
      case 'gt': return createGreaterFilter(column, value);
      case 'gte': return createGreaterOrEqualsFilter(column, value);
      case 'lt': return createLessFilter(column, value);
      case 'lte': return createLessOrEqualsFilter(column, value);
      case 'contains': return createContainsFilter(column, value);
      case 'startsWith': return createStartsWithFilter(column, value);
      case 'endsWith': return createEndsWithFilter(column, value);
      default:
        return null;
    }
  }

  private static mapGroup(group: string): FilterGroup {
    const filterGroup = createFilterGroup();
    switch (group) {
      case 'OR':
        filterGroup.logicalOperation = LogicalOperator.OR;
        break;
      case 'AND':
        filterGroup.logicalOperation = LogicalOperator.AND;
        break;
    }
    return filterGroup;
  }

  private static mapOrder(order: string, column: any): void {
    switch (order) {
      case 'asc':
        column.orderDirection = window.Terrasoft.OrderDirection.ASC;
        break;
      case 'desc':
        column.orderDirection = window.Terrasoft.OrderDirection.DESC;
        break;
    }
  }

  private static mapAggregate(aggregate: string): AggregationType {
    switch (aggregate) {
      case 'count': return AggregationType.COUNT;
      case 'sum': return AggregationType.SUM;
      case 'avg': return AggregationType.AVG;
      case 'min': return AggregationType.MIN;
      case 'max': return AggregationType.MAX;
    }

    return AggregationType.NONE;
  }

  private static async createWhere(where: any, filterGroup: FilterGroup, schema: any): Promise<void> {
    if (!where) {
      return;
    }

    for (let column in where) {
      const columnValue = where[column];
      if (isLookupColumn(column, schema)) {
        column = column.substring(0, column.length - 2);
      }
      if (columnValue === null) {
        filterGroup.addItem(createIsNullFilter(column));
      } else if (Array.isArray(columnValue)) {
        filterGroup.addItem(await this.createGroup(column, columnValue, schema));
      } else if (column.startsWith('$')) {
        filterGroup.addItem(await this.createExists(column.substring(1), columnValue, schema));
      } else if (typeof columnValue === 'object') {
        const filter = Object.getOwnPropertyNames(columnValue)[0];
        const mapperFilter = this.mapFilter(filter, column, columnValue[filter]);
        filterGroup.addItem(mapperFilter ?? await this.createNestedColumnFilter(column, columnValue, schema));
      } else {
        filterGroup.addEqualsFilter(column, columnValue);
      }
    }
  }

  private static async createGroup(group: string, groupWhere: Array<any>, schema: any): Promise<FilterGroup> {
    const filterGroup = this.mapGroup(group);

    for (const where of groupWhere) {
      const innerGroup = createFilterGroup();
      await this.createWhere(where, innerGroup, schema);
      filterGroup.addItem(innerGroup);
    }

    return filterGroup;
  }

  private static async createExists(relatedTable: string, columnValue: any, schema: any): Promise<ExistsFilter> {
    const existenceValue = columnValue.exists ?? columnValue.notExists;
    const filterMethod = columnValue.exists
      ? createExistsFilter
      : createNotExistsFilter;

    const relatedSchema = await getEntitySchema(relatedTable);

    const expressionElements = [
      relatedTable,
      isLookupColumn(existenceValue.on, relatedSchema)
        ? existenceValue.on.substring(0, existenceValue.on.length - 2)
        : existenceValue.on,
      isLookupColumn(existenceValue.equals, schema)
        ? existenceValue.equals.substring(0, existenceValue.equals.length - 2)
        : existenceValue.equals
    ];
    const existsFilter = filterMethod(`[${expressionElements.filter(Boolean).join(':')}].Id`) as ExistsFilter;
    await this.createWhere(existenceValue.where, existsFilter.subFilters, relatedSchema);
    return existsFilter;
  }

  private static async createNestedColumnFilter(column: string, columnValue: any, schema: any): Promise<any> {
    let columnPath = this.reduceNestedColumnPath(columnValue, column);
    const value = this.getNestedColumnValue(columnPath, { [column]: columnValue });
    if (columnPath.endsWith('Id')) {
      const lookupColumnPath = columnPath.substring(0, columnPath.length - 2);
      const isExistsLookupColumnPath = await isValidColumnPath(schema.uId, lookupColumnPath);
      if (isExistsLookupColumnPath) {
        columnPath = lookupColumnPath;
      }
    }
    const where = { [columnPath]: value };
    const filterGroup = createFilterGroup();
    await this.createWhere(where, filterGroup, schema);
    return filterGroup;
  }

  private static reduceNestedColumnPath(columnValue: any, columnPath: string): string {
    if (columnValue === null) {
      return columnPath;
    }
    const nestedProperty = Object.getOwnPropertyNames(columnValue)[0];
    if (typeof columnValue[nestedProperty] === 'object' &&
      columnValue[nestedProperty] !== null && !(columnValue[nestedProperty] instanceof Date)) {
      const property = Object.getOwnPropertyNames(columnValue[nestedProperty])[0];
      return [
        columnPath,
        nestedProperty,
        FilterType[property] ? null : property
      ].filter(Boolean).join('.');
    } else if (columnValue[nestedProperty] === null || columnValue[nestedProperty] instanceof Date) {
      return [
        columnPath,
        nestedProperty
      ].filter(Boolean).join('.');
    }

    return this.reduceNestedColumnPath(columnValue[nestedProperty], nestedProperty);
  }

  private static getNestedColumnValue(columnPath: string, nestedObject: any): any {
    let result = nestedObject;
    for (const path of columnPath.split('.')) {
      result = result[path];
    }
    return result;
  }
}
