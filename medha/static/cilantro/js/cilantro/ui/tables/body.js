define(["underscore","marionette","./row"],function(e,t,o){var i=t.CollectionView.extend({tagName:"tbody",itemView:o.Row,itemViewOptions:function(t){return e.defaults({collection:t.data},this.options)}});return{Body:i}});
//# sourceMappingURL=body.js
//# sourceMappingURL=body.js.map