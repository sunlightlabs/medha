define(["jquery","./utils"],function(t,o){var e={debug:!1,root:"/",main:"#cilantro-main",session:{defaults:{url:null,credentials:null,ping:3e4,data:{}}},url:null,credentials:null,threshold:null,statsModelsList:null,maxFilterDisplayValues:4,styleFilters:!1,distinctCountAutoRefresh:!0,timeouts:{control:1e4},templates:{},controls:{},concepts:{defaults:{},types:{},instances:{}},fields:{defaults:{form:{controls:["search"]}},types:{choice:{form:{controls:["infograph"]}},number:{form:{chart:!0,controls:["number"]}},date:{form:{chart:!0,controls:["date"]}},time:{form:{chart:!0,controls:["date"]}},datetime:{form:{chart:!0,controls:["date"]}}},instances:{}}},n=function(){this.reset.apply(this,arguments)};return n.prototype.reset=function(){var o=[].slice.call(arguments);this.options=t.extend.apply(null,[!0,{},e].concat(o))},n.prototype.get=function(t,e){return o.getDotProp(this.options,t,e)},n.prototype.set=function(t,e){o.setDotProp(this.options,t,e)},n.prototype.unset=function(t){o.setDotProp(this.options,t,void 0)},{Config:n,defaultOptions:e}});
//# sourceMappingURL=config.js
//# sourceMappingURL=config.js.map