define(["underscore","marionette","../base","../core","../../utils/numbers"],function(e,t,i,s,n){var a=function(t,i,s,n){return t?(i||(i=[]),n!==!1&&(n=!0),n&&i.push("<ul>"),t.language?i.push("<li>"+t.language+"</li>"):t.type&&t.children.length&&(s&&i.push("<li><small>"+t.type.toUpperCase()+"</small><ul>"),e.each(t.children,function(e){a(e,i,s,!1)}),s&&i.push("</ul></li>")),n&&i.push("</ul>"),i.join("")):""},l=t.ItemView.extend({className:"context-filter",template:"context/filter",ui:{actions:"[data-target=actions]",loader:"[data-target=loader]",remove:"[data-action=remove]",enable:"[data-action=enable]",description:"[data-target=description]",required:"[data-target=required]"},events:{click:"clickShow","click @ui.remove":"clickRemove","click @ui.enable":"toggleEnabled"},modelEvents:{request:"showLoadView",sync:"hideLoadView",error:"hideLoadView",change:"render"},simpleLanguage:{"in":["is","is"],"-in":["not","is not"],exact:["is","is"],range:["between","is between"],"-range":["not between","is not between"],isnull:["is","is"],gt:[">","is greater"],gte:[">=","is greater than or equal to"],lt:["<","is less"],lte:["<=","is less than or equal to"]},clickShow:function(){s.trigger(s.CONCEPT_FOCUS,this.model.get("concept"))},clickRemove:function(e){e.stopPropagation(),this.model.unapply()},toggleEnabled:function(e){e.stopPropagation(),this.model.toggleEnabled()},renderEnabled:function(){this.$el.removeClass("disabled"),this.ui.enable.attr("title","Disable"),this.ui.enable.prop("checked",!0)},renderDisabled:function(){this.$el.addClass("disabled"),this.ui.enable.attr("title","Enable"),this.ui.enable.prop("checked",!1)},renderState:function(){this.model.get("enabled")!==!1?this.renderEnabled():this.renderDisabled()},parseValue:function(t,i){var n,a=[];if(!e.isArray(t))return"undefined"!=typeof t.label&&(t=t.label),"<span class=filter-value>"+t+"</span>";var l=s.config.get("maxFilterDisplayValues");if("object"==typeof t[0]&&(t=e.pluck(t,"label")),1===t.length)return"<span class=filter-value>"+t[0]+"</span>";if(t.length<l){for(n=0;n<t.length-1;n++)a.push("<span class=filter-value>"+t[n]+",</span>");a.push("-"===i.charAt(0)?"nor":"or"),a.push("<span class=filter-value>"+t[t.length-1]+"</span>")}else{a.push("<span class=filter-value>"+t[0]+",</span>"),a.push("<span class=filter-value>"+t[1]+",</span>");var r=t.length-l;a.push(i.indexOf("-")<0?"...("+r+" more) or":"...("+r+" more) nor"),a.push("<span class=filter-value>"+t[t.length-1]+"</span>")}return a.join(" ")},renderDescription:function(){var t=this.model.toJSON();if(!s.config.get("styleFilters"))return void this.ui.description.html(a(t));var i=t.cleaned_value,l=[],r=t.value,o=t.operator,u="";if("undefined"==typeof i&&(i=r),u=s.data.fields.get(t.field)?s.data.fields.get(t.field).get("name"):t.language.split(this.simpleLanguage[o][1])[0],u=u.replace(/[!?]$/g,""),l.push("<ul><li>"),l.push("<strong>"+u+"</strong>"),"range"===o||"-range"===o){l.push(this.simpleLanguage[o][0]);var d=r[0],h=r[1];e.isNumber(d)&&e.isNumber(h)&&(d=n.toDelimitedNumber(d),h=n.toDelimitedNumber(h)),l.push("<span class=filter-value>"+d+"</span> and <span class=filter-value>"+h+"</span>")}else"in"===o||"-in"===o?(l.push(this.simpleLanguage[o][0]),l.push(this.parseValue(i,o))):(l.push(this.simpleLanguage[o][0]),l.push(this.parseValue(i,o)));l.push("</li></ul>"),this.ui.description.html(l.join(" "))},showLoadView:function(){this.ui.loader.show(),this.ui.description.hide()},hideLoadView:function(){this.ui.loader.hide(),this.ui.description.show()},onRender:function(){this.ui.actions.toggle(!this.model.get("required")),this.ui.enable.toggle(!this.model.get("required")),this.ui.required.toggle(this.model.get("required")===!0),this.ui.required.tooltip({container:"body",placement:"left",delay:500}),this.renderDescription(),this.renderState()}}),r=i.EmptyView.extend({template:"context/empty",ui:{noFiltersResultsMessage:".no-filters-results-workspace",noFiltersQueryMessage:".no-filters-query-workspace"},onRender:function(){this.listenTo(s.router,"route",this.toggleMessage),this.toggleMessage()},onClose:function(){this.stopListening(s.router)},toggleMessage:function(){s.router.isCurrent("results")?(this.ui.noFiltersQueryMessage.hide(),this.ui.noFiltersResultsMessage.show()):s.router.isCurrent("query")&&(this.ui.noFiltersQueryMessage.show(),this.ui.noFiltersResultsMessage.hide())}}),o=t.CollectionView.extend({itemView:l,emptyView:r});return{ContextFilter:l,ContextFilters:o,ContextNoFilters:r,flattenLanguage:a}});
//# sourceMappingURL=filters.js
//# sourceMappingURL=filters.js.map