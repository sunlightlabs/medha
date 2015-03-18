define(["underscore","backbone","loglevel","../utils"],function(t,s,e,n){var i=s.Model.extend({constructor:function(e,i){i=t.defaults({parse:!0},i),this.links={},s.Model.prototype.constructor.call(this,e,i),this.collection&&this.on("change",function(){this.collection&&t.extend(this.links,n.getLinksFromTemplates(this,this.collection.linkTemplates))},this)},url:function(){return this.isNew()?s.Model.prototype.url.call(this):this.links.self},_parseLinks:function(t,s){t.links=n.getLinks(s)},parse:function(e,i){return this.collection&&t.extend(this.links,n.getLinksFromTemplates(e,this.collection.linkTemplates)),e&&e._links&&t.each(e._links,function(t,s){this.links[s]=t.href},this),s.Model.prototype.parse.call(this,e,i)},sync:function(t,e,n){var i=n.success,o=this;return n.success=function(t,s,n){o._parseLinks(e,n),i&&i(t,s,n)},s.Model.prototype.sync.call(this,t,e,n)}}),o=i.extend({constructor:function(t,s){if(i.prototype.constructor.call(this,t,s),this.parent={},!(this.parent=t.parent))throw new Error("parent model required");this.listenTo(this.parent,"request",this.onParentRequest),this.listenTo(this.parent,"sync",this.onParentSync)},onParentRequest:function(){this.xhr&&(this.xhr.abort(),this.xhr=null)},onParentReset:function(){this.xhr=this.fetch()},onParentSync:function(){this.xhr=this.fetch()},url:function(){if(!this.parent.id&&this.parent.collection)return this.parent.collection.links.self;if(this.parent.links.stats)return this.parent.links.stats;throw new Error("Stat supported model has no stats URL defined.")},manualFetch:function(){return this.xhr=this.fetch(),this.xhr}}),r=i.extend({statModel:o,constructor:function(t,s){if(!this.statModel)throw new Error("statModel must be defined");this.stats=new this.statModel({parent:this}),i.prototype.constructor.call(this,t,s),this.collection&&this.stats.listenTo(this.collection,"reset",this.stats.onParentReset)}}),l=s.Collection.extend({model:i,constructor:function(e,n){n=t.defaults({parse:!0},n),this.links={},s.Collection.prototype.constructor.call(this,e,n)},_parseLinks:function(t,s){t.links=n.getLinks(s),t.linkTemplates=n.getLinkTemplates(s)},sync:function(t,e,n){var i=n.success,o=this;return n.success=function(t,s,n){o._parseLinks(e,n),i&&i(t,s,n)},s.Collection.prototype.sync.call(this,t,e,n)}}),c=l.extend({initialize:function(){this.session=this.add({session:!0})},reset:function(t,e){e=e||{},t=t||[];for(var n,i,o=0;o<t.length;o++)if(n=t[o],n instanceof s.Model?n.get("session")===!0&&(i=n.toJSON()):n&&n.session===!0&&(i=n),i){this.session.set(i,e),t.splice(o,1);break}return t.push(this.session),l.prototype.reset.call(this,t,e)},get:function(t){var e=!1;return t instanceof s.Model&&(e=t.get("session")),("session"===t||"object"==typeof t&&t.session)&&(e=!0),e?this.findWhere({session:!0}):l.prototype.get.call(this,t)},getSession:function(){return this.session}});return{Model:i,StatModel:o,StatsSupportedModel:r,Collection:l,SessionCollection:c}});
//# sourceMappingURL=base.js
//# sourceMappingURL=base.js.map