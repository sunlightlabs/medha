define(["underscore","marionette","../base","./cell"],function(e,t,n,i){var o=t.CollectionView.extend({tagName:"tr",itemView:i.Cell,itemViewOptions:function(t){return e.extend({},this.options,{model:t})}}),r=n.LoadView.extend({align:"left",tagName:"tr"});return{EmptyRow:r,Row:o}});
//# sourceMappingURL=row.js
//# sourceMappingURL=row.js.map