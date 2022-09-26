define("el-view-model-generator", [], () => {
  Ext.define("Edenlab.ViewModelGenerator", {
    override: "Terrasoft.ViewModelGenerator",

    generate: function(config, callback, scope) {
      this.callParent([config, function (viewModelClass) {
        let tsScope = Array.isArray(config.hierarchy)
          ? config.hierarchy.filter(x => x.methods?.scope).at(-1)?.methods.scope
          : null;
        if (tsScope) {
          viewModelClass.tsScope = tsScope;
        }

        callback.call(scope, viewModelClass);
      }, this]);
    }
  });
});
