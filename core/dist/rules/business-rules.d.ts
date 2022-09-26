import { ComparisonType } from '../db/types/filters';
export declare enum BusinessRuleType {
    DISABLED = -1,
    BINDPARAMETER = 0,
    FILTRATION = 1,
    AUTOCOMPLETE = 2,
    POPULATE_ATTRIBUTE = 3
}
export declare enum BusinessRuleProperty {
    VISIBLE = 0,
    ENABLED = 1,
    REQUIRED = 2,
    READONLY = 3
}
export declare enum BusinessRuleValueType {
    CONSTANT = 0,
    ATTRIBUTE = 1,
    SYSSETTING = 2,
    SYSVALUE = 3,
    CARDSTATE = 4,
    PARAMETER = 5,
    FORMULA = 6
}
export interface BusinessRule {
    ruleType: BusinessRuleType;
    property?: BusinessRuleProperty;
    conditions?: Array<BusinessRuleCondition>;
    autocomplete?: boolean;
    attribute?: string;
}
export interface BusinessRuleCondition {
    leftExpression?: BusinessRuleConditionExpression;
    comparisonType?: ComparisonType;
    rightExpression?: BusinessRuleConditionExpression;
}
export interface BusinessRuleConditionExpression {
    type?: BusinessRuleValueType;
    value?: any;
}
export declare const getRequiredAlwaysRule: () => BusinessRule;
export declare const getDisabledAlwaysRule: () => BusinessRule;
export declare const getFiltrationRule: (filterableEntityColumnName: string, compareToColumnName: string, options?: BusinessRule) => BusinessRule;
