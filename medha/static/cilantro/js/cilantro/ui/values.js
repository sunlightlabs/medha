define(["jquery","underscore","marionette","loglevel","./base","../core","../models","../constants"],function(e,t,a,i,l,n,s,r){var o=a.ItemView.extend({className:"value-item",template:"values/item"}),c=a.ItemView.extend({className:"value-list",template:"values/list",collectionEvents:{add:"reloadText",remove:"reloadText",reset:"reloadText"},ui:{textarea:"textarea"},initialize:function(){t.bindAll(this,"parseText","reloadText"),this._parseText=t.debounce(this.parseText,r.INPUT_DELAY)},reloadText:function(){this.ui.textarea.val(this.collection.pluck("label").join("\n"))},parseText:function(){var a=[],i=this.ui.textarea.val().split("\n");t.each(i,function(t){if(t=e.trim(t)){var i=this.collection.get(t);i||(i={label:t}),a.push(i)}},this),this.collection.reset(a)},onRender:function(){this.ui.textarea.on("input propertychange",this._parseText)}});return{ValueItem:o,ValueList:c}});
//# sourceMappingURL=values.js
//# sourceMappingURL=values.js.map