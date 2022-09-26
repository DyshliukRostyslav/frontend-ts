export interface Filter {

}

export interface FilterGroup {
  logicalOperation: LogicalOperator
  addItem: (filter: FilterGroup | Filter) => void
  add: (name: string, filter: FilterGroup | Filter) => void
  addEqualsFilter: (column: string, value: any) => void
}

export interface ExistsFilter extends Filter {
  subFilters: FilterGroup
}

export enum LogicalOperator {
  AND = 0,
  OR = 1
}

export enum ComparisonType {
  BETWEEN = 0,
  IS_NULL = 1,
  IS_NOT_NULL = 2,
  EQUAL = 3,
  NOT_EQUAL = 4,
  LESS = 5,
  LESS_OR_EQUAL = 6,
  GREATER = 7,
  GREATER_OR_EQUAL = 8,
  START_WITH = 9,
  NOT_START_WITH = 10,
  CONTAIN = 11,
  NOT_CONTAIN = 12,
  END_WITH = 13,
  NOT_END_WITH = 14,
  EXISTS = 15,
  NOT_EXISTS = 16
}

export enum FilterType {
  equals,
  notEquals,
  in,
  notIn,
  gt,
  gte,
  lt,
  lte,
  contains,
  startsWith,
  endsWith
}

export enum AggregationType {
  NONE = 0,
  COUNT = 1,
  SUM = 2,
  AVG = 3,
  MIN = 4,
  MAX = 5
}

export const createFilterGroup = (logicalOperator?: LogicalOperator): FilterGroup => {
  const filterGroup = window.Ext.create('Terrasoft.FilterGroup');
  if (logicalOperator) {
    filterGroup.logicalOperation = logicalOperator;
  }
  return filterGroup as FilterGroup;
};

export const createEqualsFilter =
  (column: string, value: any): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.EQUAL, column, value) as Filter;

export const createNotEqualsFilter =
  (column: string, value: any): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.NOT_EQUAL, column, value) as Filter;

export const createInFilter =
  (
    column: string,
    value: Array<any>
  ): Filter => window.Terrasoft.createColumnInFilterWithParameters(column, value) as Filter;

export const createNotInFilter = (column: string, value: Array<any>): Filter => {
  const filter = window.Terrasoft.createColumnInFilterWithParameters(column, value);
  filter.comparisonType = window.Terrasoft.ComparisonType.NOT_EQUAL;
  return filter as Filter;
};

export const createGreaterFilter =
  (column: string, value: number | Date): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER, column, value) as Filter;

export const createGreaterOrEqualsFilter =
  (column: string, value: number | Date): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER_OR_EQUAL, column, value) as Filter;

export const createLessFilter =
  (column: string, value: number): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.LESS, column, value) as Filter;

export const createLessOrEqualsFilter =
  (column: string, value: number): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.LESS_OR_EQUAL, column, value) as Filter;

export const createContainsFilter =
  (column: string, value: string): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.CONTAIN, column, value) as Filter;

export const createStartsWithFilter =
  (column: string, value: string): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.START_WITH, column, value) as Filter;

export const createEndsWithFilter =
  (column: string, value: string): Filter => window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.END_WITH, column, value) as Filter;

export const createExistsFilter =
  (expression: string): ExistsFilter => window.Terrasoft.createExistsFilter(expression) as ExistsFilter;

export const createNotExistsFilter =
  (expression: string): ExistsFilter => window.Terrasoft.createNotExistsFilter(expression) as ExistsFilter;

export const createIsNullFilter =
  (column: string): Filter => window.Terrasoft.createColumnIsNullFilter(column) as Filter;

export const createIsNotNullFilter =
  (column: string): Filter => window.Terrasoft.createColumnIsNotNullFilter(column) as Filter;
