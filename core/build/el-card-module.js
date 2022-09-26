define("el-card-module", [], () => {
  Ext.define("Edenlab.configuration.CardModule", {
    override: "Terrasoft.configuration.CardModule",

    createViewModel: function (viewModelClass) {
      let viewModel = this.callParent(arguments);
      if (viewModelClass.tsScope) {
        viewModel = Ext.apply(viewModel, viewModelClass.tsScope);
      }

      return viewModel;
    }
  });
});
