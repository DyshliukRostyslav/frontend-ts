define("el-alignable-container", ["AlignableContainer"], function() {
  Ext.define("Edenlab.AlignableContainer", {
    override: "Terrasoft.controls.AlignableContainer",
    
    /**
     * @inheritdoc Terrasoft.controls.AlignableContainer#adjustPosition
     * @override
     */
    adjustPosition: function() {
      let alignToEl = this.getAlignToEl();
      if (alignToEl && !alignToEl.dom) {
        alignToEl = Ext.get(alignToEl.id);
      }
      let wrapEl = this.getWrapEl();
      if (wrapEl && alignToEl) {
        let positionConfig = this.getAlignConfig(wrapEl, alignToEl);
        this.applyAlignConfig(wrapEl, alignToEl, positionConfig);
      }
    }
  });
});
