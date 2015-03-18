define(["jquery"],function(e){var t=function(e,t){t=t||{};var n=e.outerWidth(),s=e.children(".panel-toggle");return t.full!==!1&&s[0]?n-s.outerWidth():n},n=function(t,n){this.element=e(t),this.options=e.extend({side:"left",closed:!1},n),this.opened=!0,this.side="right"===this.options.side||this.element.hasClass("panel-right")?"right":"left",this.element.addClass("panel-"+this.side),(this.options.closed===!0||this.element.hasClass("closed"))&&(this.opened=!1,this.element.addClass("closed").hide());var s=this;return this.element.on("click",".panel-toggle",function(){s.toggle()}),this};n.prototype={constructor:n,open:function(e){if(!this.opened){e=e||{},this.opened=!0;var n={},s={};n[this.side]=-t(this.element,e),s[this.side]=0,this.element.css(n).show().stop(),e.animate!==!1?this.element.animate(s,300):this.element.css(s),this.element.removeClass("closed")}},close:function(e){if(this.opened){e=e||{},this.opened=!1;var n={},s=t(this.element,e);n[this.side]=-s,this.element.stop(),e.animate!==!1?this.element.animate(n,300):this.element.css(n),this.element.addClass("closed")}},toggle:function(){this.opened?this.close():this.open()},isOpen:function(){return this.opened},isClosed:function(){return!this.opened}},e.fn.panel=function(t,s){"object"==typeof t&&(s=t),this.each(function(){var i=e(this),o=i.data("panel");o||(o=new n(this,s),i.data("panel",o)),"string"==typeof t&&o[t](s)})},e.fn.panel.Constructor=n,e(function(){e(".panel").panel(),e("[data-toggle*=panel]").each(function(){var t=e(this);t.on("click",function(){var n;n=t.data("target")?e(t.data("target")):t.parent(),n.panel("toggle")})})})});
//# sourceMappingURL=jquery-panels.js
//# sourceMappingURL=jquery-panels.js.map