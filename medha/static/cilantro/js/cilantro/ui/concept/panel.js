define(["underscore","marionette","./index","./search"],function(e,n,i,t){var o=n.Layout.extend({id:"concept-panel",className:"panel panel-left closed",template:"concept/panel",regions:{search:".search-region",index:".index-region"},regionViews:{search:t.ConceptSearch,index:i.ConceptIndex},onRender:function(){this.$el.panel();var e=new this.regionViews.index({collection:this.collection}),n=new this.regionViews.search({collection:this.collection,handler:function(n,i){e.filter(n,i)}});this.search.show(n),this.index.show(e)},triggerSearch:function(e){this.search.currentView.trigger("search",e)},openPanel:function(e){this.$el.panel("open",e)},closePanel:function(e){this.$el.panel("close",e)},isPanelOpen:function(e){return this.$el.data("panel").isOpen(e)},isPanelClosed:function(e){this.$el.data("panel").isClosed(e)}});return{ConceptPanel:o}});
//# sourceMappingURL=panel.js
//# sourceMappingURL=panel.js.map