define(["underscore","../search"],function(e,n){var r=n.Search.extend({className:"concept-search search",options:function(){return e.extend({},n.Search.prototype.options,{placeholder:"Search by name, description, or data..."})},initialize:function(){if(this._request=null,!this.options.handler)throw new Error("no search handler defined")},search:function(e){this._request&&this._request.abort();var n=this.options.handler;e?this._request=this.collection.search(e,function(r){n(e,r)}):n(null,[])}});return{ConceptSearch:r}});
//# sourceMappingURL=search.js
//# sourceMappingURL=search.js.map