define(["underscore","./base"],function(e,t){var n=function(e){if(!e)return"Untitled";var t;return t="/"===e.charAt(e.length-1)?e.substr(0,e.length-1).split("/"):e.split("/"),t.length>0?t[t.length-1].toUpperCase():"Untitled "+e},r=t.Model.extend({idAttribute:"type"}),i=t.Collection.extend({model:r,parse:function(){var t=[];return e.each(this.links,function(e,r){"self"!==r&&t.push({type:r,uri:e,title:n(e)})}),t}});return{ExporterModel:r,ExporterCollection:i}});
//# sourceMappingURL=exporter.js
//# sourceMappingURL=exporter.js.map