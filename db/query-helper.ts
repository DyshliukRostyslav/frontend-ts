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
  FilterGroup,
  LogicalOperator
} from "./types/filters";

export class QueryHelper {
  public static buildInsert(schema: any, query: any) {
    const insertQuery = window.Ext.create("Terrasoft.InsertQuery", {
      rootSchema: schema
    });

    Object.getOwnPropertyNames(query.data).forEach(prop => {
      let value = query.data[prop];
      insertQuery.setParameterValue(prop, value);
    });

    return insertQuery;
  }

  public static buildUpdate(schema: any, query: any) {
    const updateQuery = window.Ext.create("Terrasoft.UpdateQuery", {
      rootSchema: schema
    });

    Object.getOwnPropertyNames(query.data).forEach(prop => {
      let value = query.data[prop];
      updateQuery.setParameterValue(prop, value);
    });
    updateQuery.filters = this.buildFilters(query.where);

    return updateQuery;
  }

  public static buildDelete(schema: any, query: any) {
    const deleteQuery = window.Ext.create("Terrasoft.DeleteQuery", {
      rootSchema: schema
    });
    deleteQuery.filters = this.buildFilters(query.where);

    return deleteQuery;
  }

  public static buildSelect(schemaName: string, query: any, options: any) {
    const esq = window.Ext.create(
      "Terrasoft.EntitySchemaQuery",
      Object.assign({
        rootSchemaName: schemaName
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

    const columns = this.buildColumns(query.select);

    if (!columns.length) {
      esq.allColumns = true;
    }
    columns.forEach(column => esq.addColumn(column.name, column.alias));

    esq.filters = this.buildFilters(query.where);
    this.buildOrdering(query.orderBy, esq);

    return esq;
  }

  public static buildAggregate(schemaName: string, query: any, options: any) {
    const esq = this.buildSelect(schemaName, query, options);

    let aggregate = Object.getOwnPropertyNames(query).filter(x => x !== "where")[0];
    let aggregateValue = query[aggregate];

    let aggregateColumn = Object.getOwnPropertyNames(aggregateValue)[0];

    if (aggregateValue[aggregateColumn] === true) {
      esq.allColumns = false;
      esq.addAggregationSchemaColumn(aggregateColumn, this.mapAggregate(aggregate), "EsqAggregation");
    }

    return esq;
  }

  private static buildColumns(select: any): Array<QueryColumn> {
    const columns: Array<QueryColumn> = [];
    if (select) {
      function parseColumns(innerSelect: any, columnPath: string) {
        Object.getOwnPropertyNames(innerSelect).forEach((column) => {
          let selectValue = innerSelect[column];

          if (selectValue === true) {
            if (column !== "Id" && column.endsWith("Id")) {
              column = column.substring(0, column.length - 2) + ".Id";
            }
            columns.push({
              name: !!columnPath ? columnPath + column : column
            });
          } else if (typeof selectValue === 'object') {
            if (selectValue.alias) {
              let alias = selectValue?.alias;
              columns.push({
                name: !!columnPath ? columnPath + column : column,
                alias: alias
              });
            }

            parseColumns(selectValue.select, columnPath + column + ".");
          }
        });
      }

      parseColumns(select, "");
    }

    return columns;
  }

  private static buildFilters(where: any) {
    const filterGroup = createFilterGroup();

    this.createWhere(where, filterGroup);

    return filterGroup;
  }

  private static buildOrdering(orderBy: any, query: any) {
    let orderPosition = 0;
    if (orderBy) {
      function parseColumns(innerOrder: any, columnPath: string) {
        Object.getOwnPropertyNames(innerOrder).forEach((prop, i) => {
          let value = innerOrder[prop];

          if (typeof value === 'string') {
            const column = query.columns.contains(columnPath + prop)
              ? query.columns.get(columnPath + prop)
              : query.addColumn(columnPath + prop);

            QueryHelper.mapOrder(value, column);
            column.orderPosition = orderPosition + i;
            orderPosition++;
          } else if (typeof value === 'object') {
            parseColumns(value, columnPath + prop + ".");
          }
        });
      }

      parseColumns(orderBy, "");
    }
  }

  private static mapFilter(filter: string, column: string, value: any): any {
    switch (filter) {
      case 'equals': return createEqualsFilter(column, value);
      case 'notEquals': return createNotEqualsFilter(column, value);
      case 'in': return createInFilter(column, value);
      case 'notIn': return createNotInFilter(column, value);
      case 'gt': return createGreaterFilter(column, value);
      case 'gte': return createGreaterOrEqualsFilter(column, value);
      case 'lt': return createLessFilter(column, value);
      case 'lte': return createLessOrEqualsFilter(column, value);
      case 'contains': return createContainsFilter(column, value);
      case 'startsWith': return createStartsWithFilter(column, value);
      case 'endsWith': return createEndsWithFilter(column, value);
    }
  }

  private static mapGroup(group: string) {
    const filterGroup = createFilterGroup();
    switch (group) {
      case "OR":
        filterGroup.logicalOperation = LogicalOperator.OR;
      case "AND":
        filterGroup.logicalOperation = LogicalOperator.AND;
    }
    return filterGroup;
  }

  private static mapOrder(order: string, column: any) {
    switch (order) {
      case "asc":
        return column.orderDirection = window.Terrasoft.OrderDirection.ASC;
      case "desc":
        return column.orderDirection = window.Terrasoft.OrderDirection.DESC;
    }
  }

  private static mapAggregate(aggregate: string) {
    switch (aggregate) {
      case "count": return window.Terrasoft.AggregationType.COUNT;
      case "sum": return window.Terrasoft.AggregationType.SUM;
      case "avg": return window.Terrasoft.AggregationType.AVG;
      case "min": return window.Terrasoft.AggregationType.MIN;
      case "max": return window.Terrasoft.AggregationType.MAX;
    }
  }

  private static createWhere(where: any, filterGroup: FilterGroup) {
    if (where) {
      Object.getOwnPropertyNames(where).forEach((column) => {
        let columnValue = where[column];
        if (Array.isArray(columnValue)) {
          filterGroup.addItem(this.createGroup(column, columnValue));
        } else if (typeof columnValue === 'object') {
          let filter = Object.getOwnPropertyNames(columnValue)[0];
          filterGroup.addItem(this.mapFilter(filter, column, columnValue[filter]));
        } else {
          filterGroup.addEqualsFilter(column, columnValue);
        }
      });
    }
  }

  private static createGroup(group: string, groupWhere: Array<any>) {
    let filterGroup = this.mapGroup(group);

    groupWhere.forEach(where => {
      const innerGroup = createFilterGroup();
      this.createWhere(where, innerGroup);
      filterGroup.addItem(innerGroup);
    });

    return filterGroup;
  }
}
