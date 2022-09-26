define("el-section-module", [], () => {
  Ext.define("Edenlab.configuration.SectionModule", {
    override: "Terrasoft.configuration.SectionModule",

    createViewModel: function (viewModelClass) {
      let viewModel = this.callParent(arguments);
      if (viewModelClass.tsScope) {
        viewModel = Ext.apply(viewModel, viewModelClass.tsScope);
      }

      return viewModel;
    }
  });
});
