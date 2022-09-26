define("el-detail-module", [], () => {
  Ext.define("Edenlab.configuration.DetailModule", {
    override: "Terrasoft.configuration.DetailModule",

    createViewModel: function (viewModelClass) {
      let viewModel = this.callParent(arguments);
      if (viewModelClass.tsScope) {
        viewModel = Ext.apply(viewModel, viewModelClass.tsScope);
      }

      return viewModel;
    }
  });
});
