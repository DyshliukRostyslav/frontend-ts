export const getRequiredAlwaysRule = () => {
  return {
    ruleType: 0, //BusinessRuleModule.enums.RuleType.BINDPARAMETER
    property: 2, //BusinessRuleModule.enums.Property.REQUIRED
    conditions: [
      {
        leftExpression: {
          type: 0, //BusinessRuleModule.enums.ValueType.CONSTANT
          value: true
        },
        comparisonType: 3, //Terrasoft.ComparisonType.EQUAL
        rightExpression: {
          type: 0, //BusinessRuleModule.enums.ValueType.CONSTANT
          value: true
        }
      }
    ]
  };
}

export const getDisabledAlwaysRule = () => {
  return {
    ruleType: 0, //BusinessRuleModule.enums.RuleType.BINDPARAMETER
    property: 1, //BusinessRuleModule.enums.Property.ENABLED
    conditions: [
      {
        leftExpression: {
          type: 0, //BusinessRuleModule.enums.ValueType.CONSTANT
          value: false
        },
        comparisonType: 3, //Terrasoft.ComparisonType.EQUAL
        rightExpression: {
          type: 0, //BusinessRuleModule.enums.ValueType.CONSTANT
          value: true
        }
      }
    ]
  };
}