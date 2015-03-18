define(["jquery","underscore","marionette","./base","../../models","../../constants","../paginator","../values","../search"],function(e,t,i,a,s,l,n,o,r){var h=s.Page.extend({constructor:function(e,t){(t=t||{}).parse=!0,this.items=new s.Values,s.Page.prototype.constructor.call(this,e,t)},parse:function(e,t){return this.items.reset(e.items||e.values,t),delete e.items,e}}),c=s.Paginator.extend({model:h,initialize:function(e,t){t=t||{},this.field=t.field,this.currentUrl=null,s.Paginator.prototype.initialize.call(this,e,t)},url:function(){var t=this.currentUrl||this.field.links.values;return this.urlParams&&(t=t+"?"+e.param(this.urlParams)),t}}),u=i.ItemView.extend({className:"value-item",template:"controls/search/item",ui:{actions:".actions",addButton:".add-item-button",removeButton:".remove-item-button",label:".value-label"},events:{"click .add-item-button":"addItem","click .remove-item-button":"removeItem"},constructor:function(e){e=e||{},(this.values=e.values)&&(this.listenTo(this.values,"add",this.setState),this.listenTo(this.values,"remove",this.setState),this.listenTo(this.values,"reset",this.setState)),i.ItemView.prototype.constructor.call(this,e)},addItem:function(){var e=t.extend(this.model.toJSON(),{valid:!0});this.values.add(e)},removeItem:function(){this.values.remove(this.model)},setState:function(){this.values.get(this.model)?(this.ui.addButton.hide(),this.ui.removeButton.show()):(this.ui.addButton.show(),this.ui.removeButton.hide())},onRender:function(){this.setState(),""===this.ui.label.html()?this.ui.label.html("(empty)"):"null"===this.ui.label.html()&&this.ui.label.html("(null)")}}),d=n.ListingPage.extend({className:"search-value-list",itemView:u}),m=n.PageRoll.extend({listView:d}),g=a.ControlLayout.extend({className:"field-value-search",template:"controls/search/layout",searchPaginator:c,events:{"click [data-action=clear]":"clearValues","change [name=exclude]":"change"},regions:{search:".search-region",paginator:".paginator-region",browse:".browse-region",values:".values-region"},regionViews:{search:r.Search,paginator:n.Paginator,browse:m,values:o.ValueList},ui:{excludeCheckbox:"[name=exclude]"},initialize:function(){if(!this.collection){this.collection=new s.Values;var e=this;this.collection.url=function(){return e.model.links.values}}this.listenTo(this.collection,"all",this.change),this.valuesPaginator=new this.searchPaginator(null,{field:this.model}),this.valuesPaginator.refresh()},onRender:function(){var e=new this.regionViews.search({model:this.model,placeholder:"Search "+this.model.get("plural_name")+"..."});this.listenTo(e,"search",this.handleSearch);var t=new this.regionViews.browse({collection:this.valuesPaginator,values:this.collection}),i=new this.regionViews.paginator({className:"paginator mini",model:this.valuesPaginator}),a=new this.regionViews.values({collection:this.collection});this.search.show(e),this.browse.show(t),this.paginator.show(i),this.values.show(a)},handleSearch:function(e){this.valuesPaginator.urlParams=e?{query:e}:null,this.valuesPaginator.refresh()},clearValues:function(){this.collection.reset()},getField:function(){return this.model?this.model.id:void 0},getOperator:function(){return this.ui.excludeCheckbox.prop("checked")?"-in":"in"},setOperator:function(e){"-in"===e?this.ui.excludeCheckbox.prop("checked",!0):this.ui.excludeCheckbox.prop("checked",!1)},getValue:function(){return this.collection.toJSON()},setValue:function(e){this.collection.set(e,{merge:!1,silent:!0}),this.collection.trigger("reset")},validate:function(e){var t=this.collection.any(function(e){return e.get("pending")===!0});if(t)return"The entered "+this.model.get("plural_name")+" are being validated.";var i=[];return this.collection.each(function(e){e.get("valid")===!1&&i.push(e.get("label"))}),i.length?"The following "+this.model.get("plural_name")+" are invalid: <pre>"+i.join("\n")+"</pre>":!e||e.value&&e.value.length?void 0:"At least one value must be selected"}});return{SearchControl:g,SearchItem:u,SearchPage:d,SearchPageRoll:m,SearchPaginator:c}});
//# sourceMappingURL=search.js
//# sourceMappingURL=search.js.map