define(["underscore","marionette","./base"],function(e,i,t){var n=i.ItemView.extend({tagName:"li",template:"accordion/item"}),o=i.CompositeView.extend({className:"section",itemView:n,template:"accordion/section",itemViewContainer:".items",ui:{heading:".heading"},isEmpty:function(){return 0===this.collection.length},onCompositeCollectionRendered:function(){this.$el.toggle(!this.isEmpty())}}),l=i.CompositeView.extend({className:"group",template:"accordion/group",itemView:o,itemViewContainer:".sections",itemSectionItems:"items",options:{collapsable:!0,collapsed:!0},ui:{heading:".heading",icon:".heading [data-toggle]",inner:".inner"},events:{"click > .heading":"toggleCollapse"},itemViewOptions:function(e,i){return{model:e,index:i,collection:e[this.itemSectionItems]}},initialize:function(){this.collapsed=this.options.collapsed},onRender:function(){this.options.collapsable?this.collapsed&&this.renderCollapsed():(this.renderExpanded(),this.ui.icon.hide())},isEmpty:function(){if(this.collection.length>0)return!1;for(var e=0;e<this.collection.length;e++)if(this.collection.models[e].items.length>0)return!1;return!0},onCompositeCollectionRendered:function(){if(this.$el.toggle(!this.isEmpty()),this.collection.length>0){var e=this.collection.at(0),i=this.children.findByModel(e);i.ui.heading.toggle(this.collection.length>1||e.id>-1)}},collapse:function(e){this.options.collapsable&&(this.collapsed=!0,this.renderCollapsed(e))},expand:function(e){this.options.collapsable&&(this.collapsed=!1,this.renderExpanded(e))},toggleCollapse:function(e){e.preventDefault(),this.options.collapsable&&(this.collapsed?this.expand({animate:!0}):this.collapse({animate:!0}))},renderState:function(e){this.collapsed&&this.options.collapsable?this.renderCollapsed(e):this.renderExpanded(e)},renderExpanded:function(e){e=e||{},this.$el.removeClass("collapsed"),e.animate?this.ui.inner.collapse("show"):this.ui.inner.addClass("in")},renderCollapsed:function(e){e=e||{},this.$el.addClass("collapsed"),e.animate?this.ui.inner.collapse("hide"):this.ui.inner.removeClass("in")}}),s=i.CollectionView.extend({className:"accordion",itemView:l,emptyView:t.EmptyView,itemGroupSections:"sections",options:{collapsable:!0},itemViewOptions:function(e,i){return{model:e,index:i,collection:e[this.itemGroupSections],collapsable:this.options.collapsable}}});return{Accordion:s,AccordionGroup:l,AccordionSection:o,AccordionItem:n}});
//# sourceMappingURL=accordion.js
//# sourceMappingURL=accordion.js.map