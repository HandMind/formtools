!function(a){a.formtools={i18n:{ru:{notice_input_one:"Необходимо заполнить поле: ",notice_input:"Необходимо заполнить поля: "},en:{notice_input_one:"Please fill in the following field: ",notice_input:"Please fill in the following fields: "}}};var b=function(b,c){function d(b){return a.formtools.i18n[c.locale][b]}var e=this;e.$el=a(b),e.el=b,e.supported=function(a,b){var c=document.createElement(a);return b in c},e.validateField=function(b,c){b=b instanceof jQuery?b:a(b);var d=function(){switch(e.getElementType(b)){case"select":return null!=b.val();case"radio":return b=e.$el.find("input[type=radio][name='"+b.attr("name")+"'][required]"),0!==e.$el.find("input[type=radio][name='"+b.attr("name")+"']:checked").length;case"checkbox":return b[0].checked;default:case"input":return""!==b.val()&&b.val()!==b.attr("placeholder")}return!1}();return e.showRequiredLabel(b,d,c),d},e.getElementType=function(b){return b=b instanceof jQuery?b:a(b),"INPUT"===b[0].tagName?b.attr("type"):b[0].tagName.toLowerCase()},e.createRequiredLabel=function(b){a(c.noticeContainer).find(".notice-group").removeClass(c.hiddenClass);var d=function(){var c;return void 0!==(c=b.data("field-name"))?c:void 0!==(c=b.attr("placeholder"))?c:a("label[for='"+b.attr("id")+"']").text()}(),f=b.attr("id"),g=e.getElementType(b),h=a(document.createElement("LABEL"));void 0===f&&b.attr("id",f="formtools-"+Math.random().toString(36).substring(7)),("checkbox"===g||"radio"===g)&&h.click(function(a){a.preventDefault()}),h.attr({"for":f}).html(d).appendTo(a(c.noticeContainer).find(".notice-container")).wrap('<span class="notice-field" data-for="'+f+'"/>').after('<span class="comma"></span>&thinsp;')},e.showRequiredLabel=function(a,b,d){var f=a.attr("id");(d||"undefined"==typeof d)&&("undefined"==typeof c.fieldContainer?a.toggleClass(c.invalidClass,!b):a.parent(c.fieldContainer).toggleClass(c.invalidClass,!b)),e.$el.find("span.notice-field[data-for='"+f+"']").toggle(!b),e.fillRequiredLabel()},e.fillRequiredLabel=function(){var a;(a=e.$el.find("span.notice-field:visible").length)>0?c.noticeContainer.find(".notice-label").show().html(d(1===a?"notice_input_one":"notice_input")):c.noticeContainer.find(".notice-label").hide(),c.noticeContainer.find(".comma").text(","),c.noticeContainer.find(".comma:visible").last().text(".")},e.init=function(){var b=e.$el.find("input, textarea, checkbox, select"),d=e.$el.find("input[required], textarea[required], checkbox[required], select[required]");e.supported("textarea","placeholder")||b.each(function(){a(this).attr("placeholder")&&e.placeholder(this)}),c.noticeContainer.append('<span class="'+c.hiddenClass+' notice-group"><span class="notice-label"></span><span class="notice-container"></span></span>'),d.each(function(){var b=a(this);c.displayNotice&&e.createRequiredLabel(b),"radio"===b.attr("type")?e.required(e.$el.find("input[type='radio'][name='"+b.attr("name")+"']")):e.required(this)}),e.fillRequiredLabel(),e.$el.find("input[type=submit]").click({eventSource:"click"},e.formSubmitHandler),e.$el.submit({eventSource:"submit"},e.formSubmitHandler),window.polyfills={placeholder:!e.supported("textarea","placeholder"),required:!0}},e.formSubmitHandler=function(b){var c=!0;e.$el.find("input[required], textarea[required], checkbox[required], select[required]").each(function(b,d){return e.validateField(d)?void 0:(a(d).focus(),c=!1,!1)}),e.$el.trigger("beforesubmit.formtools",{valid:c,eventSource:b.data.eventSource,event:b}),c||b.preventDefault()},e.placeholder=function(b){b=a(b);var d=b.attr("placeholder"),e=b.val();(""===e||e===d)&&b.val(d).addClass(c.placeholderClass),b.on("blur",function(){var b=a(this);""===b.val()&&(b.val(b.attr("placeholder")),b.addClass(c.placeholderClass))}).on("focus",function(){var b=a(this);b.removeClass(c.placeholderClass),b.val()===b.attr("placeholder")&&b.val("")})},e.required=function(b){e.validateField(a(b),!1),a(b).on("blur keyup change",function(){e.validateField(a(this))})},e.init()};a.fn.formtools=function(c){var d={placeholderClass:"placeholder",invalidClass:"invalid",hiddenClass:"hidden",fieldContainer:void 0,locale:"en",displayNotice:!1,noticeContainer:void 0};return a.extend(d,c),d.fieldContainer=d.fieldContainer?this.find(d.fieldContainer):void 0,this.each(function(){var c=a(this).data("locale"),e={noticeContainer:a(this).find(d.noticeContainer),locale:"string"==typeof c?c:d.locale};0===e.noticeContainer.length&&(e.displayNotice=!1),new b(this,a.extend({},d,e))})}}(jQuery);