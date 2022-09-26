define("el-client-unit-schema", [], () => {
  Ext.define("Edenlab.manager.ClientUnitSchema", {
    override: "Terrasoft.manager.ClientUnitSchema",

    areAllSchemaBusinessRulesValid: function () {
      return true;
    }
  });
});
