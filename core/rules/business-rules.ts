import { ComparisonType } from '../db/types/filters';

export enum BusinessRuleType {
  DISABLED = - 1,
  BINDPARAMETER = 0,
  FILTRATION = 1,
  AUTOCOMPLETE = 2,
  POPULATE_ATTRIBUTE = 3
}

export enum BusinessRuleProperty {
  VISIBLE = 0,
  ENABLED = 1,
  REQUIRED = 2,
  READONLY = 3
}

export enum BusinessRuleValueType {
  CONSTANT = 0,
  ATTRIBUTE = 1,
  SYSSETTING = 2,
  SYSVALUE = 3,
  CARDSTATE = 4,
  PARAMETER = 5,
  FORMULA = 6
}

export interface BusinessRule {
  ruleType: BusinessRuleType
  property?: BusinessRuleProperty
  conditions?: Array<BusinessRuleCondition>
  autocomplete?: boolean
  attribute?: string
}

export interface BusinessRuleCondition {
  leftExpression?: BusinessRuleConditionExpression
  comparisonType?: ComparisonType
  rightExpression?: BusinessRuleConditionExpression
}

export interface BusinessRuleConditionExpression {
  type?: BusinessRuleValueType
  value?: any
}

export const getRequiredAlwaysRule = (): BusinessRule => ({
  ruleType: BusinessRuleType.BINDPARAMETER,
  property: BusinessRuleProperty.REQUIRED,
  conditions: [
    {
      leftExpression: {
        type: BusinessRuleValueType.CONSTANT,
        value: true
      },
      comparisonType: ComparisonType.EQUAL,
      rightExpression: {
        type: BusinessRuleValueType.CONSTANT,
        value: true
      }
    }
  ]
});

export const getDisabledAlwaysRule = (): BusinessRule => ({
  ruleType: BusinessRuleType.BINDPARAMETER,
  property: BusinessRuleProperty.ENABLED,
  conditions: [
    {
      leftExpression: {
        type: BusinessRuleValueType.CONSTANT,
        value: false
      },
      comparisonType: ComparisonType.EQUAL,
      rightExpression: {
        type: BusinessRuleValueType.CONSTANT,
        value: true
      }
    }
  ]
});

export const getFiltrationRule =
  (
    filterableEntityColumnName: string,
    compareToColumnName: string,
    options?: BusinessRule
  ): BusinessRule => Object.assign({
    ruleType: BusinessRuleType.FILTRATION,
    autocomplete: true,
    autoClean: true,
    baseAttributePatch: filterableEntityColumnName,
    comparisonType: ComparisonType.EQUAL,
    type: BusinessRuleValueType.ATTRIBUTE,
    attribute: compareToColumnName
  }, options || {});
