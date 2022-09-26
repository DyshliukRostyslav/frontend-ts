export interface Filter {
}
export interface FilterGroup {
    logicalOperation: LogicalOperator;
    addItem: (filter: FilterGroup | Filter) => void;
    add: (name: string, filter: FilterGroup | Filter) => void;
    addEqualsFilter: (column: string, value: any) => void;
}
export interface ExistsFilter extends Filter {
    subFilters: FilterGroup;
}
export declare enum LogicalOperator {
    AND = 0,
    OR = 1
}
export declare enum ComparisonType {
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
export declare enum FilterType {
    equals = 0,
    notEquals = 1,
    in = 2,
    notIn = 3,
    gt = 4,
    gte = 5,
    lt = 6,
    lte = 7,
    contains = 8,
    startsWith = 9,
    endsWith = 10
}
export declare enum AggregationType {
    NONE = 0,
    COUNT = 1,
    SUM = 2,
    AVG = 3,
    MIN = 4,
    MAX = 5
}
export declare const createFilterGroup: (logicalOperator?: LogicalOperator) => FilterGroup;
export declare const createEqualsFilter: (column: string, value: any) => Filter;
export declare const createNotEqualsFilter: (column: string, value: any) => Filter;
export declare const createInFilter: (column: string, value: Array<any>) => Filter;
export declare const createNotInFilter: (column: string, value: Array<any>) => Filter;
export declare const createGreaterFilter: (column: string, value: number | Date) => Filter;
export declare const createGreaterOrEqualsFilter: (column: string, value: number | Date) => Filter;
export declare const createLessFilter: (column: string, value: number) => Filter;
export declare const createLessOrEqualsFilter: (column: string, value: number) => Filter;
export declare const createContainsFilter: (column: string, value: string) => Filter;
export declare const createStartsWithFilter: (column: string, value: string) => Filter;
export declare const createEndsWithFilter: (column: string, value: string) => Filter;
export declare const createExistsFilter: (expression: string) => ExistsFilter;
export declare const createNotExistsFilter: (expression: string) => ExistsFilter;
export declare const createIsNullFilter: (column: string) => Filter;
export declare const createIsNotNullFilter: (column: string) => Filter;
