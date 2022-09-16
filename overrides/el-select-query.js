define("el-select-query", [], () => {
  Ext.define("Edenlab.SelectQuery", {
    override: "Terrasoft.SelectQuery",

    async queryAsync() {
      return new Promise(resolve => this.execute(response => resolve(response), this));
    },

    async queryFirstAsync() {
      const result = await this.queryAsync();
      return result.collection?.first();
    },

    async queryCountAsync() {
      const result = await this.queryAsync();
      return result.collection?.getCount() ?? 0;
    }
  });
})
