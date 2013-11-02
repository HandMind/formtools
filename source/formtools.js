(function($){
	$.formtools = {
		i18n: {
			ru: {
				"notice_input_one": "Необходимо заполнить поле: ",
				"notice_input": "Необходимо заполнить поля: "
			},
			en: {
				"notice_input_one": "Please fill in the following field: ",
				"notice_input": "Please fill in the following fields: "
			}
		}
	};
	var Formtools = function(el, options){
		var base = this;
		
		function _l(key) {
			return $.formtools.i18n[options.locale][key];
		}
		
		base.$el = $(el);
		base.el = el;
		
		base.supported = function(o, p) {
			var q = document.createElement(o);
			return (p in q);
		};
		
		base.validateField = function(e, toggleClass) {
			e = (e instanceof jQuery) ? e : $(e);
			var valid = (function(){
				switch (base.getElementType(e)) {
					case "select":
						return (e.val() != null);
					case "radio":
						e = base.$el.find("input[type=radio][name='" + e.attr("name") + "'][required]");
						return (base.$el.find("input[type=radio][name='" + e.attr("name") + "']:checked").length !== 0);
					case "checkbox":
						return e[0].checked;
					default:
					case "input":
						return ((e.val() !== "") && (e.val() !== e.attr("placeholder")));
				}
				return false;
			})();
			base.showRequiredLabel(e, valid, toggleClass);
			return valid;
		};
		
		base.getElementType = function(e) {
			e = (e instanceof jQuery) ? e : $(e);
			return (e[0].tagName === "INPUT") ? e.attr("type") : e[0].tagName.toLowerCase();
		};
		
		base.createRequiredLabel = function(e, isLast) {
			$(options.noticeContainer).find(".notice-group").removeClass(options.hiddenClass);
			var 
				fieldName = (function() {
					var n;
					if ((n = e.data("field-name")) !== undefined)
						return n;
					if ((n = e.attr("placeholder")) !== undefined)
						return n; 
					return ($("label[for='" + e.attr("id") + "']").text());
				})(),
				id = e.attr("id"),
				type = base.getElementType(e),
				label = $(document.createElement("LABEL"));
			if (id === undefined)
				e.attr("id", (id = "formtools-" + Math.random().toString(36).substring(7)));
			if ((type === "checkbox") || (type === "radio"))
				label.click(function(e) {
					e.preventDefault();
				});
			label.attr({
					"for": id
				})
				.html(fieldName)
				.appendTo($(options.noticeContainer).find(".notice-container"))
				.wrap('<span class="notice-field" data-for="' + id + '"/>')
				.after('<span class="comma"></span>&thinsp;');
		};
		
		base.showRequiredLabel = function(e, valid, toggleClass) {
			var id = e.attr("id");
			if (toggleClass || (typeof toggleClass === "undefined")) {
				if (typeof options.fieldContainer === "undefined")
					e.toggleClass(options.invalidClass, !valid);
				else
					e.parent(options.fieldContainer).toggleClass(options.invalidClass, !valid);
			}
			base.$el.find("span.notice-field[data-for='" + id + "']").toggle(!valid);
			base.fillRequiredLabel();
		};
		
		base.fillRequiredLabel = function() {
			var
				c;
			if ((c = base.$el.find("span.notice-field:visible").length) > 0)
				options.noticeContainer.find(".notice-label").show().html(
					_l((c === 1) ? "notice_input_one" : "notice_input")
				);
			else
				options.noticeContainer.find(".notice-label").hide();
			options.noticeContainer.find(".comma").text(",");
			options.noticeContainer.find(".comma:visible").last().text(".");
		};
		
		base.init = function() {
			var 
				fields = base.$el.find("input, textarea, checkbox, select"),
				required = base.$el.find("input[required], textarea[required], checkbox[required], select[required]");
			
			// placeholder
			if (!base.supported("textarea", "placeholder"))
			fields.each(function() {
				if ($(this).attr("placeholder"))
					base.placeholder(this);
			});
			// required
			options.noticeContainer.append('<span class="' + options.hiddenClass + ' notice-group"><span class="notice-label"></span><span class="notice-container"></span></span>');
			required.each(function() {
				var $this = $(this);
				if (options.displayNotice)
					base.createRequiredLabel($this);
				if ($this.attr("type") === "radio")
					base.required(base.$el.find("input[type='radio'][name='" + $this.attr("name") + "']"));
				else
					base.required(this);
			});
			base.fillRequiredLabel();
			// validation
			base.$el.find("input[type=submit]").click({eventSource: "click"},base.formSubmitHandler);
			base.$el.submit({eventSource: "submit"},base.formSubmitHandler);
			window.polyfills = {
				placeholder: !base.supported("textarea", "placeholder"),
				required: true
			};
		};
		
		base.formSubmitHandler = function(event) {
			var valid = true;
			base.$el.find("input[required], textarea[required], checkbox[required], select[required]").each(function(key, e) {
				if (!base.validateField(e)) {
					$(e).focus();
					valid = false;
					return false;
				}
			});
			base.$el.trigger("beforesubmit.formtools", {
				valid: valid,
				eventSource: event.data.eventSource,
				event: event
			});
			if (!valid)
				event.preventDefault();
		};
		
		base.placeholder = function(e){
			e = $(e);
			var
				placeholder = e.attr("placeholder"),
				val = e.val();
			if ((val === "") || (val === placeholder))
				e
					.val(placeholder)
					.addClass(options.placeholderClass);
			e
				.on("blur", function() {
					var e = $(this);
					if (e.val() === "") {
						e.val(e.attr("placeholder"));
						e.addClass(options.placeholderClass);
					}
				})
				.on("focus", function() {
					var e = $(this);
					e.removeClass(options.placeholderClass);
					if (e.val() === e.attr("placeholder"))
						e.val("");
				});
		};
		
		base.required = function(e){
			base.validateField($(e), false);
			$(e).on("blur keyup change", function() {
				base.validateField($(this));
			});
		};
		
		// Run initializer
		base.init();
	};
	
	$.fn.formtools = function(options){
		var o = {
			placeholderClass: "placeholder",
			invalidClass: "invalid",
			hiddenClass: "hidden",
			fieldContainer: undefined,
			locale: "en",
			displayNotice: false,
			noticeContainer: undefined
		};
		$.extend(o, options);
		o.fieldContainer = (o.fieldContainer) ? this.find(o.fieldContainer) : undefined;
		return this.each(function(){
			var 
				l = $(this).data("locale"),
				formOptions = {
					noticeContainer: $(this).find(o.noticeContainer),
					locale: (typeof l === "string" ? l : o.locale)
				};
			if (formOptions.noticeContainer.length === 0)
				formOptions.displayNotice = false;
			(new Formtools(this, $.extend({}, o, formOptions)));
		});
	};
})(jQuery);