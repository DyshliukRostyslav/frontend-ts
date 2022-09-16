define("el-view-model-generator", [], () => {
  Ext.define("Edenlab.ViewModelGenerator", {
    override: "Terrasoft.ViewModelGenerator",

    generate: function (config, callback, scope) {
      this.callParent([config, function (viewModelClass) {
        let tsScope = config.schema?.methods?.scope;
        if (tsScope) {
          viewModelClass.tsScope = tsScope;
        }

        callback.call(scope, viewModelClass);
      }, this]);
    }
  });
});
