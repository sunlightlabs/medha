define(["marionette"],function(e){var i=e.View.extend({tagName:"td",initialize:function(){this.listenTo(this.model.index,"change:visible",this.toggleVisible)},render:function(){return this.toggleVisible(),this.$el.html(this.model.get("value")),this},toggleVisible:function(){this.$el.toggle(this.model.index.get("visible"))}});return{Cell:i}});
//# sourceMappingURL=cell.js
//# sourceMappingURL=cell.js.map