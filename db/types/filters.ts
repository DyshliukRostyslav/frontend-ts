export interface Filter {

}

export interface FilterGroup {
  logicalOperation: LogicalOperator
  addItem: (filter: FilterGroup | Filter) => void
  add: (name: string, filter: FilterGroup | Filter) => void
  addEqualsFilter: (column: string, value: any) => void
}

export enum LogicalOperator {
  AND = 0,
  OR = 1
}

export const createFilterGroup = (logicalOperator?: LogicalOperator) => {
  const filterGroup = window.Ext.create("Terrasoft.FilterGroup");
  if (logicalOperator) {
    filterGroup.logicalOperation = logicalOperator;
  }
  return filterGroup as FilterGroup;
}

export const createEqualsFilter = (column: string, value: any) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.EQUAL, column, value) as Filter;
}

export const createNotEqualsFilter = (column: string, value: any) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.NOT_EQUAL, column, value) as Filter;
}

export const createInFilter = (column: string, value: Array<any>) => {
  return window.Terrasoft.createColumnInFilterWithParameters(column, value) as Filter;
}

export const createNotInFilter = (column: string, value: Array<any>) => {
  let filter = window.Terrasoft.createColumnInFilterWithParameters(column, value);
  filter.comparisonType = window.Terrasoft.ComparisonType.NOT_EQUAL;
  return filter as Filter;
}

export const createGreaterFilter = (column: string, value: number | Date) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER, column, value) as Filter;
}

export const createGreaterOrEqualsFilter = (column: string, value: number | Date) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER_OR_EQUAL, column, value) as Filter;
}

export const createLessFilter = (column: string, value: number) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER, column, value) as Filter;
}

export const createLessOrEqualsFilter = (column: string, value: number) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.GREATER_OR_EQUAL, column, value) as Filter;
}

export const createContainsFilter = (column: string, value: string) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.CONTAIN, column, value) as Filter;
}

export const createStartsWithFilter = (column: string, value: string) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.START_WITH, column, value) as Filter;
}

export const createEndsWithFilter = (column: string, value: string) => {
  return window.Terrasoft.createColumnFilterWithParameter(
    window.Terrasoft.ComparisonType.END_WITH, column, value) as Filter;
}
