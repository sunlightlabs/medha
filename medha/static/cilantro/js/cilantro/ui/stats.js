define(["jquery","underscore","marionette"],function(t,e,o){var i=o.ItemView.extend({tagName:"tr",template:"stats/count-item",templateHelpers:function(){var t=this.model.get("verbose_name");return this.model.get("count")>1&&(t=this.model.get("verbose_name_plural")),{displayName:t}}}),s=o.CompositeView.extend({template:"stats/count-list",itemView:i,itemViewContainer:"tbody",ui:{statsTable:"table",loader:".loading-message"},events:{"click thead th":"handleSort"},collectionEvents:{sort:"_renderChildren",request:"showLoader",reset:"onCollectionReset"},onCollectionReset:function(){if(this.hideLoader(),null!==this.options.statsModelsList){var t=this,o=e.filter(this.collection.models,function(e){var o=e.get("app_name")+"."+e.get("model_name");return-1!==t.options.statsModelsList.indexOf(o)});this.collection.reset(o,{silent:!0})}},hideLoader:function(){this.ui.loader.hide(),this.ui.statsTable.show()},showLoader:function(){this.ui.loader.show(),this.ui.statsTable.hide()},handleSort:function(e){this.collection.length&&this.applySort(t(e.target).data("sort"))},applySort:function(t){var e="asc";this.collection._sortAttr===t&&(e="asc"===this.collection._sortDir?"desc":"asc"),this.$("[data-sort="+this.collection._sortAttr+"]").removeClass(this.collection._sortDir),this.$("[data-sort="+t+"]").addClass(e),this.collection._sortAttr=t,this.collection._sortDir=e;var o=function(t){return t};this.collection.comparator=function(i,s){var n=o(i.get(t)),l=o(s.get(t));return l>n?"asc"===e?-1:1:n>l?"asc"===e?1:-1:0},this.collection.sort()},onRender:function(){this.collection&&this.collection.length>0&&this.hideLoader()}});return{CountList:s}});
//# sourceMappingURL=stats.js
//# sourceMappingURL=stats.js.map