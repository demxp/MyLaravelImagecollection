/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>2)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){return a(b.target).is(this)?b.handleObj.handler.apply(this,arguments):void 0}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.6",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a(f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.6",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target);d.hasClass("btn")||(d=d.closest(".btn")),b.call(d,"toggle"),a(c.target).is('input[type="radio"]')||a(c.target).is('input[type="checkbox"]')||c.preventDefault()}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));return a>this.$items.length-1||0>a?void 0:this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){return this.sliding?void 0:this.slide("next")},c.prototype.prev=function(){return this.sliding?void 0:this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.6",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.6",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.6",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),c.isInStateTrue()?void 0:(clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide())},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);return this.$element.trigger(g),g.isDefaultPrevented()?void 0:(f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this)},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=d?{top:0,left:0}:b.offset(),g={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},h=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,g,h,f)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;(e||!/destroy|hide/.test(b))&&(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.6",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.6",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");
d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.6",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.6",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return c>e?"top":!1;if("bottom"==this.affixed)return null!=c?e+this.unpin<=f.top?!1:"bottom":a-d>=e+g?!1:"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&c>=e?"top":null!=d&&i+j>=a-d?"bottom":!1},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
function _init(){
  "use strict";
  $.AdminLTE.layout={activate:function(){var a=this;a.fix(),a.fixSidebar(),$(window,".wrapper").resize(function(){a.fix(),a.fixSidebar()})},fix:function(){var a=$(".main-header").outerHeight()+$(".main-footer").outerHeight(),b=$(window).height(),c=$(".sidebar").height();if($("body").hasClass("fixed"))$(".content-wrapper, .right-side").css("min-height",b-$(".main-footer").outerHeight());else{var d;b>=c?($(".content-wrapper, .right-side").css("min-height",b-a),d=b-a):($(".content-wrapper, .right-side").css("min-height",c),d=c);var e=$($.AdminLTE.options.controlSidebarOptions.selector);"undefined"!=typeof e&&e.height()>d&&$(".content-wrapper, .right-side").css("min-height",e.height())}},fixSidebar:function(){return $("body").hasClass("fixed")?("undefined"==typeof $.fn.slimScroll&&window.console&&window.console.error("Error: the fixed layout requires the slimscroll plugin!"),void($.AdminLTE.options.sidebarSlimScroll&&"undefined"!=typeof $.fn.slimScroll&&($(".sidebar").slimScroll({destroy:!0}).height("auto"),$(".sidebar").slimscroll({height:$(window).height()-$(".main-header").height()+"px",color:"rgba(0,0,0,0.2)",size:"3px"})))):void("undefined"!=typeof $.fn.slimScroll&&$(".sidebar").slimScroll({destroy:!0}).height("auto"))}},$.AdminLTE.pushMenu={activate:function(a){var b=$.AdminLTE.options.screenSizes;$(document).on("click",a,function(a){a.preventDefault(),$(window).width()>b.sm-1?$("body").hasClass("sidebar-collapse")?$("body").removeClass("sidebar-collapse").trigger("expanded.pushMenu"):$("body").addClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").hasClass("sidebar-open")?$("body").removeClass("sidebar-open").removeClass("sidebar-collapse").trigger("collapsed.pushMenu"):$("body").addClass("sidebar-open").trigger("expanded.pushMenu")}),$(".content-wrapper").click(function(){$(window).width()<=b.sm-1&&$("body").hasClass("sidebar-open")&&$("body").removeClass("sidebar-open")}),($.AdminLTE.options.sidebarExpandOnHover||$("body").hasClass("fixed")&&$("body").hasClass("sidebar-mini"))&&this.expandOnHover()},expandOnHover:function(){var a=this,b=$.AdminLTE.options.screenSizes.sm-1;$(".main-sidebar").hover(function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-collapse")&&$(window).width()>b&&a.expand()},function(){$("body").hasClass("sidebar-mini")&&$("body").hasClass("sidebar-expanded-on-hover")&&$(window).width()>b&&a.collapse()})},expand:function(){$("body").removeClass("sidebar-collapse").addClass("sidebar-expanded-on-hover")},collapse:function(){$("body").hasClass("sidebar-expanded-on-hover")&&$("body").removeClass("sidebar-expanded-on-hover").addClass("sidebar-collapse")}},$.AdminLTE.tree=function(a){var b=this,c=$.AdminLTE.options.animationSpeed;$(document).off("click",a+" li a").on("click",a+" li a",function(a){var d=$(this),e=d.next();if(e.is(".treeview-menu")&&e.is(":visible")&&!$("body").hasClass("sidebar-collapse"))e.slideUp(c,function(){e.removeClass("menu-open")}),e.parent("li").removeClass("active");else if(e.is(".treeview-menu")&&!e.is(":visible")){var f=d.parents("ul").first(),g=f.find("ul:visible").slideUp(c);g.removeClass("menu-open");var h=d.parent("li");e.slideDown(c,function(){e.addClass("menu-open"),f.find("li.active").removeClass("active"),h.addClass("active"),b.layout.fix()})}e.is(".treeview-menu")&&a.preventDefault()})},$.AdminLTE.controlSidebar={activate:function(){var a=this,b=$.AdminLTE.options.controlSidebarOptions,c=$(b.selector),d=$(b.toggleBtnSelector);d.on("click",function(d){d.preventDefault(),c.hasClass("control-sidebar-open")||$("body").hasClass("control-sidebar-open")?a.close(c,b.slide):a.open(c,b.slide)});var e=$(".control-sidebar-bg");a._fix(e),$("body").hasClass("fixed")?a._fixForFixed(c):$(".content-wrapper, .right-side").height()<c.height()&&a._fixForContent(c)},open:function(a,b){b?a.addClass("control-sidebar-open"):$("body").addClass("control-sidebar-open")},close:function(a,b){b?a.removeClass("control-sidebar-open"):$("body").removeClass("control-sidebar-open")},_fix:function(a){var b=this;if($("body").hasClass("layout-boxed")){if(a.css("position","absolute"),a.height($(".wrapper").height()),b.hasBindedResize)return;$(window).resize(function(){b._fix(a)}),b.hasBindedResize=!0}else a.css({position:"fixed",height:"auto"})},_fixForFixed:function(a){a.css({position:"fixed","max-height":"100%",overflow:"auto","padding-bottom":"50px"})},_fixForContent:function(a){$(".content-wrapper, .right-side").css("min-height",a.height())}},$.AdminLTE.boxWidget={selectors:$.AdminLTE.options.boxWidgetOptions.boxWidgetSelectors,icons:$.AdminLTE.options.boxWidgetOptions.boxWidgetIcons,animationSpeed:$.AdminLTE.options.animationSpeed,activate:function(a){var b=this;a||(a=document),$(a).on("click",b.selectors.collapse,function(a){a.preventDefault(),b.collapse($(this))}),$(a).on("click",b.selectors.remove,function(a){a.preventDefault(),b.remove($(this))})},collapse:function(a){var b=this,c=a.parents(".box").first(),d=c.find("> .box-body, > .box-footer, > form  >.box-body, > form > .box-footer");c.hasClass("collapsed-box")?(a.children(":first").removeClass(b.icons.open).addClass(b.icons.collapse),d.slideDown(b.animationSpeed,function(){c.removeClass("collapsed-box")})):(a.children(":first").removeClass(b.icons.collapse).addClass(b.icons.open),d.slideUp(b.animationSpeed,function(){c.addClass("collapsed-box")}))},remove:function(a){var b=a.parents(".box").first();b.slideUp(this.animationSpeed)}}}if("undefined"==typeof jQuery)throw new Error("AdminLTE requires jQuery");$.AdminLTE={},$.AdminLTE.options={navbarMenuSlimscroll:!0,navbarMenuSlimscrollWidth:"3px",navbarMenuHeight:"200px",animationSpeed:500,sidebarToggleSelector:"[data-toggle='offcanvas']",sidebarPushMenu:!0,sidebarSlimScroll:!0,sidebarExpandOnHover:!1,enableBoxRefresh:!0,enableBSToppltip:!0,BSTooltipSelector:"[data-toggle='tooltip']",enableFastclick:!1,enableControlSidebar:!0,controlSidebarOptions:{toggleBtnSelector:"[data-toggle='control-sidebar']",selector:".control-sidebar",slide:!0},enableBoxWidget:!0,boxWidgetOptions:{boxWidgetIcons:{collapse:"fa-minus",open:"fa-plus",remove:"fa-times"},boxWidgetSelectors:{remove:'[data-widget="remove"]',collapse:'[data-widget="collapse"]'}},directChat:{enable:!0,contactToggleSelector:'[data-widget="chat-pane-toggle"]'},colors:{lightBlue:"#3c8dbc",red:"#f56954",green:"#00a65a",aqua:"#00c0ef",yellow:"#f39c12",blue:"#0073b7",navy:"#001F3F",teal:"#39CCCC",olive:"#3D9970",lime:"#01FF70",orange:"#FF851B",fuchsia:"#F012BE",purple:"#8E24AA",maroon:"#D81B60",black:"#222222",gray:"#d2d6de"},screenSizes:{xs:480,sm:768,md:992,lg:1200}},$(function(){"use strict";$("body").removeClass("hold-transition"),"undefined"!=typeof AdminLTEOptions&&$.extend(!0,$.AdminLTE.options,AdminLTEOptions);var a=$.AdminLTE.options;_init(),$.AdminLTE.layout.activate(),$.AdminLTE.tree(".sidebar"),a.enableControlSidebar&&$.AdminLTE.controlSidebar.activate(),a.navbarMenuSlimscroll&&"undefined"!=typeof $.fn.slimscroll&&$(".navbar .menu").slimscroll({height:a.navbarMenuHeight,alwaysVisible:!1,size:a.navbarMenuSlimscrollWidth}).css("width","100%"),a.sidebarPushMenu&&$.AdminLTE.pushMenu.activate(a.sidebarToggleSelector),a.enableBSToppltip&&$("body").tooltip({selector:a.BSTooltipSelector}),a.enableBoxWidget&&$.AdminLTE.boxWidget.activate(),a.enableFastclick&&"undefined"!=typeof FastClick&&FastClick.attach(document.body),a.directChat.enable&&$(document).on("click",a.directChat.contactToggleSelector,function(){var a=$(this).parents(".direct-chat").first();a.toggleClass("direct-chat-contacts-open")}),$('.btn-group[data-toggle="btn-toggle"]').each(function(){var a=$(this);$(this).find(".btn").on("click",function(b){a.find(".btn.active").removeClass("active"),$(this).addClass("active"),b.preventDefault()})})}),function(a){"use strict";a.fn.boxRefresh=function(b){function c(a){a.append(f),e.onLoadStart.call(a)}function d(a){a.find(f).remove(),e.onLoadDone.call(a)}var e=a.extend({trigger:".refresh-btn",source:"",onLoadStart:function(a){return a},onLoadDone:function(a){return a}},b),f=a('<div class="overlay"><div class="fa fa-refresh fa-spin"></div></div>');return this.each(function(){if(""===e.source)return void(window.console&&window.console.log("Please specify a source first - boxRefresh()"));var b=a(this),f=b.find(e.trigger).first();f.on("click",function(a){a.preventDefault(),c(b),b.find(".box-body").load(e.source,function(){d(b)})})})}}(jQuery),function(a){"use strict";a.fn.activateBox=function(){a.AdminLTE.boxWidget.activate(this)},a.fn.toggleBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.collapse,this);a.AdminLTE.boxWidget.collapse(b)},a.fn.removeBox=function(){var b=a(a.AdminLTE.boxWidget.selectors.remove,this);a.AdminLTE.boxWidget.remove(b)}}(jQuery),function(a){"use strict";a.fn.todolist=function(b){var c=a.extend({onCheck:function(a){return a},onUncheck:function(a){return a}},b);return this.each(function(){"undefined"!=typeof a.fn.iCheck?(a("input",this).on("ifChecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onCheck.call(b)}),a("input",this).on("ifUnchecked",function(){var b=a(this).parents("li").first();b.toggleClass("done"),c.onUncheck.call(b)})):a("input",this).on("change",function(){var b=a(this).parents("li").first();b.toggleClass("done"),a("input",b).is(":checked")?c.onCheck.call(b):c.onUncheck.call(b)})})}}(jQuery);$(function () {
});
/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   4.0.5
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
            typeof define === 'function' && define.amd ? define(factory) :
            (global.ES6Promise = factory());
}(this, (function () {
    'use strict';

    function objectOrFunction(x) {
        return typeof x === 'function' || typeof x === 'object' && x !== null;
    }

    function isFunction(x) {
        return typeof x === 'function';
    }

    var _isArray = undefined;
    if (!Array.isArray) {
        _isArray = function (x) {
            return Object.prototype.toString.call(x) === '[object Array]';
        };
    } else {
        _isArray = Array.isArray;
    }

    var isArray = _isArray;

    var len = 0;
    var vertxNext = undefined;
    var customSchedulerFn = undefined;

    var asap = function asap(callback, arg) {
        queue[len] = callback;
        queue[len + 1] = arg;
        len += 2;
        if (len === 2) {
            // If len is 2, that means that we need to schedule an async flush.
            // If additional callbacks are queued before the queue is flushed, they
            // will be processed by this flush that we are scheduling.
            if (customSchedulerFn) {
                customSchedulerFn(flush);
            } else {
                scheduleFlush();
            }
        }
    };

    function setScheduler(scheduleFn) {
        customSchedulerFn = scheduleFn;
    }

    function setAsap(asapFn) {
        asap = asapFn;
    }

    var browserWindow = typeof window !== 'undefined' ? window : undefined;
    var browserGlobal = browserWindow || {};
    var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
    var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';

// test for web worker but not in IE10
    var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
    function useNextTick() {
        // node version 0.10.x displays a deprecation warning when nextTick is used recursively
        // see https://github.com/cujojs/when/issues/410 for details
        return function () {
            return process.nextTick(flush);
        };
    }

// vertx
    function useVertxTimer() {
        if (typeof vertxNext !== 'undefined') {
            return function () {
                vertxNext(flush);
            };
        }

        return useSetTimeout();
    }

    function useMutationObserver() {
        var iterations = 0;
        var observer = new BrowserMutationObserver(flush);
        var node = document.createTextNode('');
        observer.observe(node, {characterData: true});

        return function () {
            node.data = iterations = ++iterations % 2;
        };
    }

// web worker
    function useMessageChannel() {
        var channel = new MessageChannel();
        channel.port1.onmessage = flush;
        return function () {
            return channel.port2.postMessage(0);
        };
    }

    function useSetTimeout() {
        // Store setTimeout reference so es6-promise will be unaffected by
        // other code modifying setTimeout (like sinon.useFakeTimers())
        var globalSetTimeout = setTimeout;
        return function () {
            return globalSetTimeout(flush, 1);
        };
    }

    var queue = new Array(1000);
    function flush() {
        for (var i = 0; i < len; i += 2) {
            var callback = queue[i];
            var arg = queue[i + 1];

            callback(arg);

            queue[i] = undefined;
            queue[i + 1] = undefined;
        }

        len = 0;
    }

    function attemptVertx() {
        try {
            var r = require;
            var vertx = r('vertx');
            vertxNext = vertx.runOnLoop || vertx.runOnContext;
            return useVertxTimer();
        } catch (e) {
            return useSetTimeout();
        }
    }

    var scheduleFlush = undefined;
// Decide what async method to use to triggering processing of queued callbacks:
    if (isNode) {
        scheduleFlush = useNextTick();
    } else if (BrowserMutationObserver) {
        scheduleFlush = useMutationObserver();
    } else if (isWorker) {
        scheduleFlush = useMessageChannel();
    } else if (browserWindow === undefined && typeof require === 'function') {
        scheduleFlush = attemptVertx();
    } else {
        scheduleFlush = useSetTimeout();
    }

    function then(onFulfillment, onRejection) {
        var _arguments = arguments;

        var parent = this;

        var child = new this.constructor(noop);

        if (child[PROMISE_ID] === undefined) {
            makePromise(child);
        }

        var _state = parent._state;

        if (_state) {
            (function () {
                var callback = _arguments[_state - 1];
                asap(function () {
                    return invokeCallback(_state, child, callback, parent._result);
                });
            })();
        } else {
            subscribe(parent, child, onFulfillment, onRejection);
        }

        return child;
    }

    /**
     `Promise.resolve` returns a promise that will become resolved with the
     passed `value`. It is shorthand for the following:

     ```javascript
     let promise = new Promise(function(resolve, reject){
     resolve(1);
     });

     promise.then(function(value){
     // value === 1
     });
     ```

     Instead of writing the above, your code now simply becomes the following:

     ```javascript
     let promise = Promise.resolve(1);

     promise.then(function(value){
     // value === 1
     });
     ```

     @method resolve
     @static
     @param {Any} value value that the returned promise will be resolved with
     Useful for tooling.
     @return {Promise} a promise that will become fulfilled with the given
     `value`
     */
    function resolve(object) {
        /*jshint validthis:true */
        var Constructor = this;

        if (object && typeof object === 'object' && object.constructor === Constructor) {
            return object;
        }

        var promise = new Constructor(noop);
        _resolve(promise, object);
        return promise;
    }

    var PROMISE_ID = Math.random().toString(36).substring(16);

    function noop() {
    }

    var PENDING = void 0;
    var FULFILLED = 1;
    var REJECTED = 2;

    var GET_THEN_ERROR = new ErrorObject();

    function selfFulfillment() {
        return new TypeError("You cannot resolve a promise with itself");
    }

    function cannotReturnOwn() {
        return new TypeError('A promises callback cannot return that same promise.');
    }

    function getThen(promise) {
        try {
            return promise.then;
        } catch (error) {
            GET_THEN_ERROR.error = error;
            return GET_THEN_ERROR;
        }
    }

    function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
        try {
            then.call(value, fulfillmentHandler, rejectionHandler);
        } catch (e) {
            return e;
        }
    }

    function handleForeignThenable(promise, thenable, then) {
        asap(function (promise) {
            var sealed = false;
            var error = tryThen(then, thenable, function (value) {
                if (sealed) {
                    return;
                }
                sealed = true;
                if (thenable !== value) {
                    _resolve(promise, value);
                } else {
                    fulfill(promise, value);
                }
            }, function (reason) {
                if (sealed) {
                    return;
                }
                sealed = true;

                _reject(promise, reason);
            }, 'Settle: ' + (promise._label || ' unknown promise'));

            if (!sealed && error) {
                sealed = true;
                _reject(promise, error);
            }
        }, promise);
    }

    function handleOwnThenable(promise, thenable) {
        if (thenable._state === FULFILLED) {
            fulfill(promise, thenable._result);
        } else if (thenable._state === REJECTED) {
            _reject(promise, thenable._result);
        } else {
            subscribe(thenable, undefined, function (value) {
                return _resolve(promise, value);
            }, function (reason) {
                return _reject(promise, reason);
            });
        }
    }

    function handleMaybeThenable(promise, maybeThenable, then$$) {
        if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
            handleOwnThenable(promise, maybeThenable);
        } else {
            if (then$$ === GET_THEN_ERROR) {
                _reject(promise, GET_THEN_ERROR.error);
            } else if (then$$ === undefined) {
                fulfill(promise, maybeThenable);
            } else if (isFunction(then$$)) {
                handleForeignThenable(promise, maybeThenable, then$$);
            } else {
                fulfill(promise, maybeThenable);
            }
        }
    }

    function _resolve(promise, value) {
        if (promise === value) {
            _reject(promise, selfFulfillment());
        } else if (objectOrFunction(value)) {
            handleMaybeThenable(promise, value, getThen(value));
        } else {
            fulfill(promise, value);
        }
    }

    function publishRejection(promise) {
        if (promise._onerror) {
            promise._onerror(promise._result);
        }

        publish(promise);
    }

    function fulfill(promise, value) {
        if (promise._state !== PENDING) {
            return;
        }

        promise._result = value;
        promise._state = FULFILLED;

        if (promise._subscribers.length !== 0) {
            asap(publish, promise);
        }
    }

    function _reject(promise, reason) {
        if (promise._state !== PENDING) {
            return;
        }
        promise._state = REJECTED;
        promise._result = reason;

        asap(publishRejection, promise);
    }

    function subscribe(parent, child, onFulfillment, onRejection) {
        var _subscribers = parent._subscribers;
        var length = _subscribers.length;

        parent._onerror = null;

        _subscribers[length] = child;
        _subscribers[length + FULFILLED] = onFulfillment;
        _subscribers[length + REJECTED] = onRejection;

        if (length === 0 && parent._state) {
            asap(publish, parent);
        }
    }

    function publish(promise) {
        var subscribers = promise._subscribers;
        var settled = promise._state;

        if (subscribers.length === 0) {
            return;
        }

        var child = undefined,
                callback = undefined,
                detail = promise._result;

        for (var i = 0; i < subscribers.length; i += 3) {
            child = subscribers[i];
            callback = subscribers[i + settled];

            if (child) {
                invokeCallback(settled, child, callback, detail);
            } else {
                callback(detail);
            }
        }

        promise._subscribers.length = 0;
    }

    function ErrorObject() {
        this.error = null;
    }

    var TRY_CATCH_ERROR = new ErrorObject();

    function tryCatch(callback, detail) {
        try {
            return callback(detail);
        } catch (e) {
            TRY_CATCH_ERROR.error = e;
            return TRY_CATCH_ERROR;
        }
    }

    function invokeCallback(settled, promise, callback, detail) {
        var hasCallback = isFunction(callback),
                value = undefined,
                error = undefined,
                succeeded = undefined,
                failed = undefined;

        if (hasCallback) {
            value = tryCatch(callback, detail);

            if (value === TRY_CATCH_ERROR) {
                failed = true;
                error = value.error;
                value = null;
            } else {
                succeeded = true;
            }

            if (promise === value) {
                _reject(promise, cannotReturnOwn());
                return;
            }
        } else {
            value = detail;
            succeeded = true;
        }

        if (promise._state !== PENDING) {
            // noop
        } else if (hasCallback && succeeded) {
            _resolve(promise, value);
        } else if (failed) {
            _reject(promise, error);
        } else if (settled === FULFILLED) {
            fulfill(promise, value);
        } else if (settled === REJECTED) {
            _reject(promise, value);
        }
    }

    function initializePromise(promise, resolver) {
        try {
            resolver(function resolvePromise(value) {
                _resolve(promise, value);
            }, function rejectPromise(reason) {
                _reject(promise, reason);
            });
        } catch (e) {
            _reject(promise, e);
        }
    }

    var id = 0;
    function nextId() {
        return id++;
    }

    function makePromise(promise) {
        promise[PROMISE_ID] = id++;
        promise._state = undefined;
        promise._result = undefined;
        promise._subscribers = [];
    }

    function Enumerator(Constructor, input) {
        this._instanceConstructor = Constructor;
        this.promise = new Constructor(noop);

        if (!this.promise[PROMISE_ID]) {
            makePromise(this.promise);
        }

        if (isArray(input)) {
            this._input = input;
            this.length = input.length;
            this._remaining = input.length;

            this._result = new Array(this.length);

            if (this.length === 0) {
                fulfill(this.promise, this._result);
            } else {
                this.length = this.length || 0;
                this._enumerate();
                if (this._remaining === 0) {
                    fulfill(this.promise, this._result);
                }
            }
        } else {
            _reject(this.promise, validationError());
        }
    }

    function validationError() {
        return new Error('Array Methods must be provided an Array');
    }
    ;

    Enumerator.prototype._enumerate = function () {
        var length = this.length;
        var _input = this._input;

        for (var i = 0; this._state === PENDING && i < length; i++) {
            this._eachEntry(_input[i], i);
        }
    };

    Enumerator.prototype._eachEntry = function (entry, i) {
        var c = this._instanceConstructor;
        var resolve$$ = c.resolve;

        if (resolve$$ === resolve) {
            var _then = getThen(entry);

            if (_then === then && entry._state !== PENDING) {
                this._settledAt(entry._state, i, entry._result);
            } else if (typeof _then !== 'function') {
                this._remaining--;
                this._result[i] = entry;
            } else if (c === Promise) {
                var promise = new c(noop);
                handleMaybeThenable(promise, entry, _then);
                this._willSettleAt(promise, i);
            } else {
                this._willSettleAt(new c(function (resolve$$) {
                    return resolve$$(entry);
                }), i);
            }
        } else {
            this._willSettleAt(resolve$$(entry), i);
        }
    };

    Enumerator.prototype._settledAt = function (state, i, value) {
        var promise = this.promise;

        if (promise._state === PENDING) {
            this._remaining--;

            if (state === REJECTED) {
                _reject(promise, value);
            } else {
                this._result[i] = value;
            }
        }

        if (this._remaining === 0) {
            fulfill(promise, this._result);
        }
    };

    Enumerator.prototype._willSettleAt = function (promise, i) {
        var enumerator = this;

        subscribe(promise, undefined, function (value) {
            return enumerator._settledAt(FULFILLED, i, value);
        }, function (reason) {
            return enumerator._settledAt(REJECTED, i, reason);
        });
    };

    /**
     `Promise.all` accepts an array of promises, and returns a new promise which
     is fulfilled with an array of fulfillment values for the passed promises, or
     rejected with the reason of the first passed promise to be rejected. It casts all
     elements of the passed iterable to promises as it runs this algorithm.

     Example:

     ```javascript
     let promise1 = resolve(1);
     let promise2 = resolve(2);
     let promise3 = resolve(3);
     let promises = [ promise1, promise2, promise3 ];

     Promise.all(promises).then(function(array){
     // The array here would be [ 1, 2, 3 ];
     });
     ```

     If any of the `promises` given to `all` are rejected, the first promise
     that is rejected will be given as an argument to the returned promises's
     rejection handler. For example:

     Example:

     ```javascript
     let promise1 = resolve(1);
     let promise2 = reject(new Error("2"));
     let promise3 = reject(new Error("3"));
     let promises = [ promise1, promise2, promise3 ];

     Promise.all(promises).then(function(array){
     // Code here never runs because there are rejected promises!
     }, function(error) {
     // error.message === "2"
     });
     ```

     @method all
     @static
     @param {Array} entries array of promises
     @param {String} label optional string for labeling the promise.
     Useful for tooling.
     @return {Promise} promise that is fulfilled when all `promises` have been
     fulfilled, or rejected if any of them become rejected.
     @static
     */
    function all(entries) {
        return new Enumerator(this, entries).promise;
    }

    /**
     `Promise.race` returns a new promise which is settled in the same way as the
     first passed promise to settle.

     Example:

     ```javascript
     let promise1 = new Promise(function(resolve, reject){
     setTimeout(function(){
     resolve('promise 1');
     }, 200);
     });

     let promise2 = new Promise(function(resolve, reject){
     setTimeout(function(){
     resolve('promise 2');
     }, 100);
     });

     Promise.race([promise1, promise2]).then(function(result){
     // result === 'promise 2' because it was resolved before promise1
     // was resolved.
     });
     ```

     `Promise.race` is deterministic in that only the state of the first
     settled promise matters. For example, even if other promises given to the
     `promises` array argument are resolved, but the first settled promise has
     become rejected before the other promises became fulfilled, the returned
     promise will become rejected:

     ```javascript
     let promise1 = new Promise(function(resolve, reject){
     setTimeout(function(){
     resolve('promise 1');
     }, 200);
     });

     let promise2 = new Promise(function(resolve, reject){
     setTimeout(function(){
     reject(new Error('promise 2'));
     }, 100);
     });

     Promise.race([promise1, promise2]).then(function(result){
     // Code here never runs
     }, function(reason){
     // reason.message === 'promise 2' because promise 2 became rejected before
     // promise 1 became fulfilled
     });
     ```

     An example real-world use case is implementing timeouts:

     ```javascript
     Promise.race([ajax('foo.json'), timeout(5000)])
     ```

     @method race
     @static
     @param {Array} promises array of promises to observe
     Useful for tooling.
     @return {Promise} a promise which settles in the same way as the first passed
     promise to settle.
     */
    function race(entries) {
        /*jshint validthis:true */
        var Constructor = this;

        if (!isArray(entries)) {
            return new Constructor(function (_, reject) {
                return reject(new TypeError('You must pass an array to race.'));
            });
        } else {
            return new Constructor(function (resolve, reject) {
                var length = entries.length;
                for (var i = 0; i < length; i++) {
                    Constructor.resolve(entries[i]).then(resolve, reject);
                }
            });
        }
    }

    /**
     `Promise.reject` returns a promise rejected with the passed `reason`.
     It is shorthand for the following:

     ```javascript
     let promise = new Promise(function(resolve, reject){
     reject(new Error('WHOOPS'));
     });

     promise.then(function(value){
     // Code here doesn't run because the promise is rejected!
     }, function(reason){
     // reason.message === 'WHOOPS'
     });
     ```

     Instead of writing the above, your code now simply becomes the following:

     ```javascript
     let promise = Promise.reject(new Error('WHOOPS'));

     promise.then(function(value){
     // Code here doesn't run because the promise is rejected!
     }, function(reason){
     // reason.message === 'WHOOPS'
     });
     ```

     @method reject
     @static
     @param {Any} reason value that the returned promise will be rejected with.
     Useful for tooling.
     @return {Promise} a promise rejected with the given `reason`.
     */
    function reject(reason) {
        /*jshint validthis:true */
        var Constructor = this;
        var promise = new Constructor(noop);
        _reject(promise, reason);
        return promise;
    }

    function needsResolver() {
        throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
    }

    function needsNew() {
        throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
    }

    /**
     Promise objects represent the eventual result of an asynchronous operation. The
     primary way of interacting with a promise is through its `then` method, which
     registers callbacks to receive either a promise's eventual value or the reason
     why the promise cannot be fulfilled.

     Terminology
     -----------

     - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
     - `thenable` is an object or function that defines a `then` method.
     - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
     - `exception` is a value that is thrown using the throw statement.
     - `reason` is a value that indicates why a promise was rejected.
     - `settled` the final resting state of a promise, fulfilled or rejected.

     A promise can be in one of three states: pending, fulfilled, or rejected.

     Promises that are fulfilled have a fulfillment value and are in the fulfilled
     state.  Promises that are rejected have a rejection reason and are in the
     rejected state.  A fulfillment value is never a thenable.

     Promises can also be said to *resolve* a value.  If this value is also a
     promise, then the original promise's settled state will match the value's
     settled state.  So a promise that *resolves* a promise that rejects will
     itself reject, and a promise that *resolves* a promise that fulfills will
     itself fulfill.


     Basic Usage:
     ------------

     ```js
     let promise = new Promise(function(resolve, reject) {
     // on success
     resolve(value);

     // on failure
     reject(reason);
     });

     promise.then(function(value) {
     // on fulfillment
     }, function(reason) {
     // on rejection
     });
     ```

     Advanced Usage:
     ---------------

     Promises shine when abstracting away asynchronous interactions such as
     `XMLHttpRequest`s.

     ```js
     function getJSON(url) {
     return new Promise(function(resolve, reject){
     let xhr = new XMLHttpRequest();

     xhr.open('GET', url);
     xhr.onreadystatechange = handler;
     xhr.responseType = 'json';
     xhr.setRequestHeader('Accept', 'application/json');
     xhr.send();

     function handler() {
     if (this.readyState === this.DONE) {
     if (this.status === 200) {
     resolve(this.response);
     } else {
     reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
     }
     }
     };
     });
     }

     getJSON('/posts.json').then(function(json) {
     // on fulfillment
     }, function(reason) {
     // on rejection
     });
     ```

     Unlike callbacks, promises are great composable primitives.

     ```js
     Promise.all([
     getJSON('/posts'),
     getJSON('/comments')
     ]).then(function(values){
     values[0] // => postsJSON
     values[1] // => commentsJSON

     return values;
     });
     ```

     @class Promise
     @param {function} resolver
     Useful for tooling.
     @constructor
     */
    function Promise(resolver) {
        this[PROMISE_ID] = nextId();
        this._result = this._state = undefined;
        this._subscribers = [];

        if (noop !== resolver) {
            typeof resolver !== 'function' && needsResolver();
            this instanceof Promise ? initializePromise(this, resolver) : needsNew();
        }
    }

    Promise.all = all;
    Promise.race = race;
    Promise.resolve = resolve;
    Promise.reject = reject;
    Promise._setScheduler = setScheduler;
    Promise._setAsap = setAsap;
    Promise._asap = asap;

    Promise.prototype = {
        constructor: Promise,
        /**
         The primary way of interacting with a promise is through its `then` method,
         which registers callbacks to receive either a promise's eventual value or the
         reason why the promise cannot be fulfilled.

         ```js
         findUser().then(function(user){
         // user is available
         }, function(reason){
         // user is unavailable, and you are given the reason why
         });
         ```

         Chaining
         --------

         The return value of `then` is itself a promise.  This second, 'downstream'
         promise is resolved with the return value of the first promise's fulfillment
         or rejection handler, or rejected if the handler throws an exception.

         ```js
         findUser().then(function (user) {
         return user.name;
         }, function (reason) {
         return 'default name';
         }).then(function (userName) {
         // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
         // will be `'default name'`
         });

         findUser().then(function (user) {
         throw new Error('Found user, but still unhappy');
         }, function (reason) {
         throw new Error('`findUser` rejected and we're unhappy');
         }).then(function (value) {
         // never reached
         }, function (reason) {
         // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
         // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
         });
         ```
         If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

         ```js
         findUser().then(function (user) {
         throw new PedagogicalException('Upstream error');
         }).then(function (value) {
         // never reached
         }).then(function (value) {
         // never reached
         }, function (reason) {
         // The `PedgagocialException` is propagated all the way down to here
         });
         ```

         Assimilation
         ------------

         Sometimes the value you want to propagate to a downstream promise can only be
         retrieved asynchronously. This can be achieved by returning a promise in the
         fulfillment or rejection handler. The downstream promise will then be pending
         until the returned promise is settled. This is called *assimilation*.

         ```js
         findUser().then(function (user) {
         return findCommentsByAuthor(user);
         }).then(function (comments) {
         // The user's comments are now available
         });
         ```

         If the assimliated promise rejects, then the downstream promise will also reject.

         ```js
         findUser().then(function (user) {
         return findCommentsByAuthor(user);
         }).then(function (comments) {
         // If `findCommentsByAuthor` fulfills, we'll have the value here
         }, function (reason) {
         // If `findCommentsByAuthor` rejects, we'll have the reason here
         });
         ```

         Simple Example
         --------------

         Synchronous Example

         ```javascript
         let result;

         try {
         result = findResult();
         // success
         } catch(reason) {
         // failure
         }
         ```

         Errback Example

         ```js
         findResult(function(result, err){
         if (err) {
         // failure
         } else {
         // success
         }
         });
         ```

         Promise Example;

         ```javascript
         findResult().then(function(result){
         // success
         }, function(reason){
         // failure
         });
         ```

         Advanced Example
         --------------

         Synchronous Example

         ```javascript
         let author, books;

         try {
         author = findAuthor();
         books  = findBooksByAuthor(author);
         // success
         } catch(reason) {
         // failure
         }
         ```

         Errback Example

         ```js

         function foundBooks(books) {

         }

         function failure(reason) {

         }

         findAuthor(function(author, err){
         if (err) {
         failure(err);
         // failure
         } else {
         try {
         findBoooksByAuthor(author, function(books, err) {
         if (err) {
         failure(err);
         } else {
         try {
         foundBooks(books);
         } catch(reason) {
         failure(reason);
         }
         }
         });
         } catch(error) {
         failure(err);
         }
         // success
         }
         });
         ```

         Promise Example;

         ```javascript
         findAuthor().
         then(findBooksByAuthor).
         then(function(books){
         // found books
         }).catch(function(reason){
         // something went wrong
         });
         ```

         @method then
         @param {Function} onFulfilled
         @param {Function} onRejected
         Useful for tooling.
         @return {Promise}
         */
        then: then,
        /**
         `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
         as the catch block of a try/catch statement.

         ```js
         function findAuthor(){
         throw new Error('couldn't find that author');
         }

         // synchronous
         try {
         findAuthor();
         } catch(reason) {
         // something went wrong
         }

         // async with promises
         findAuthor().catch(function(reason){
         // something went wrong
         });
         ```

         @method catch
         @param {Function} onRejection
         Useful for tooling.
         @return {Promise}
         */
        'catch': function _catch(onRejection) {
            return this.then(null, onRejection);
        }
    };

    function polyfill() {
        var local = undefined;

        if (typeof global !== 'undefined') {
            local = global;
        } else if (typeof self !== 'undefined') {
            local = self;
        } else {
            try {
                local = Function('return this')();
            } catch (e) {
                throw new Error('polyfill failed because global object is unavailable in this environment');
            }
        }

        var P = local.Promise;

        if (P) {
            var promiseToString = null;
            try {
                promiseToString = Object.prototype.toString.call(P.resolve());
            } catch (e) {
                // silently ignored
            }

            if (promiseToString === '[object Promise]' && !P.cast) {
                return;
            }
        }

        local.Promise = Promise;
    }

// Strange compat..
    Promise.polyfill = polyfill;
    Promise.Promise = Promise;

    return Promise;

})));
//# sourceMappingURL=es6-promise.map
/* NicEdit - Micro Inline WYSIWYG
 * Copyright 2007-2008 Brian Kirchoff
 *
 * NicEdit is distributed under the terms of the MIT license
 * For more information visit http://nicedit.com/
 * Do not remove this copyright message
 */

/**
 * Дополняет объект свойствами другого. 
 * bkExtend(d,s) Копирует значения свойств s в объект d
 */
var bkExtend = function(destination, source) {
    for (var prop in source) destination[prop] = source[prop];
    return destination;
};

/**
 *  Предок всех классов.
 * this.construct() - конструктор (пустой)
 * static.extend({}) - наследует новый класс
 */
function bkClass() {}
bkClass.prototype.construct = function() {};
bkClass.extend = function(def) {
    // новый класс - функция вызывающая конструктор
    var classDef = function() {
        if (arguments[0] !== bkClass) {
            return this.construct.apply(this, arguments);
        }
    };
    // прототип - экземпляр класса-предка, но не инициализированный
    var proto = new this(bkClass);
    // в него копируются новые определения
    bkExtend(proto, def);
    // вешается прототип и механизм наследования
    classDef.prototype = proto;
    classDef.extend = this.extend;
    return classDef;
};

/**
 *  Довесок к элементу DOM 
 * Не содержит ссылку на элемент, так как куски "доливаются" в сам объект
 */
var bkElement = bkClass.extend({
    // конструктор
    // elm - html строка, DOM элемент или экземпляр bkElement
    // d - документ, если он отличается от текущего
    // если передана строка - порождается новый элемент, в противном случае делается обёртка
    construct: function(elm, d) {
        if (typeof(elm) == "string") {
            elm = (d || document).createElement(elm);
        }
        elm = $BK(elm);
        return elm;
    },

    // присоединяет себя в конец содержимого другогого элемента
    appendTo: function(elm) {
        elm.appendChild(this);
        return this;
    },

    // вставляет элемент перед собой
    appendBefore: function(elm) {
        elm.parentNode.insertBefore(this, elm);
        return this;
    },

    // добавляет на свое событие type обработчик fn
    addEvent: function(type, fn) {
        bkLib.addEvent(this, type, fn);
        return this;
    },

    // парный setter к this.getContent()
    setContent: function(c) {
        this.innerHTML = c;
        return this;
    },

    // вычисляет координаты Left и Top относительно окна?
    pos: function() {
        var curleft = curtop = 0;
        var o = obj = this;
        if (obj.offsetParent) {
            do {
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            } while (obj = obj.offsetParent);
        }
        var b = (!window.opera) ? parseInt(this.getStyle('border-width') || this.style.border) || 0 : 0;
        return [curleft + b, curtop + b + this.offsetHeight];
    },

    // отключает выделение в себе и вложенных элементах
    noSelect: function() {
        bkLib.noSelect(this);
        return this;
    },

    // ближайший родитель с тегом t 
    parentTag: function(t) {
        var elm = this;
        do {
            if (elm && elm.nodeName && elm.nodeName.toUpperCase() == t) {
                return elm;
            }
            elm = elm.parentNode;
        } while (elm);
        return false;
    },

    // есть ли у элемента класс 'nicEdit-'+cls
    hasClass: function(cls) {
        return this.className.match(new RegExp('(\\s|^)nicEdit-' + cls + '(\\s|$)'));
    },

    // добавляет элементу класс 'nicEdit-'+cls
    addClass: function(cls) {
        if (!this.hasClass(cls)) {
            this.className += " nicEdit-" + cls
        };
        return this;
    },

    // убивает у элемента класс 'nicEdit-'+cls
    removeClass: function(cls) {
        if (this.hasClass(cls)) {
            this.className = this.className.replace(new RegExp('(\\s|^)nicEdit-' + cls + '(\\s|$)'), ' ');
        }
        return this;
    },

    // прописывает стили
    // st - хэшлист со стилем name => value
    setStyle: function(st) {
        var elmStyle = this.style;
        for (var itm in st) {
            switch (itm) {
                case 'float':
                    elmStyle['cssFloat'] = elmStyle['styleFloat'] = st[itm];
                    break;
                case 'opacity':
                    elmStyle.opacity = st[itm];
                    elmStyle.filter = "alpha(opacity=" + Math.round(st[itm] * 100) + ")";
                    break;
                case 'className':
                    this.className = st[itm];
                    break;
                default:
                    //if(document.compatMode || itm != "cursor") { // Nasty Workaround for IE 5.5
                    elmStyle[itm] = st[itm];
                    //}		
            }
        }
        return this;
    },

    // получает значение стиля
    getStyle: function(cssRule, d) {
        var doc = (!d) ? document.defaultView : d;
        if (this.nodeType == 1)
            return (doc && doc.getComputedStyle) ? doc.getComputedStyle(this, null).getPropertyValue(cssRule) : this.currentStyle[bkLib.camelize(cssRule)];
    },

    // удаляет себя из дерева
    remove: function() {
        this.parentNode.removeChild(this);
        return this;
    },

    // просто присваивает себе пачку значенией атрибутов
    setAttributes: function(at) {
        for (var itm in at) {
            this[itm] = at[itm];
        }
        return this;
    }
});

/** 
 * Утилитарный класс. 
 */
var bkLib = {
    /** признак, что мы в IE */
    isMSIE: (navigator.appVersion.indexOf("MSIE") != -1),

    /** вешает обработчик события на объект */
    addEvent: function(obj, type, fn) {
        (obj.addEventListener) ? obj.addEventListener(type, fn, false): obj.attachEvent("on" + type, fn);
    },

    /** копирует в новый массив */
    toArray: function(iterable) {
        var length = iterable.length,
            results = new Array(length);
        while (length--) {
            results[length] = iterable[length]
        };
        return results;
    },

    /** убирает возможность выделения с полей ввода */
    noSelect: function(element) {
        if (element.setAttribute && element.nodeName.toLowerCase() != 'input' && element.nodeName.toLowerCase() != 'textarea') {
            element.setAttribute('unselectable', 'on');
        }
        for (var i = 0; i < element.childNodes.length; i++) {
            bkLib.noSelect(element.childNodes[i]);
        }
    },

    /** переводит слова-записанные-через-дефис в словаЗаписанныеПоВерблюжьи */
    camelize: function(s) {
        return s.replace(/\-(.)/g, function(m, l) {
            return l.toUpperCase()
        });
    },
    /** есть ли в массиве такой элемент */
    inArray: function(arr, item) {
        return (bkLib.search(arr, item) != null);
    },
    /** ищет элемент в массиве и возвращает его индекс */
    search: function(arr, itm) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == itm)
                return i;
        }
        return null;
    },
    /** отменяет реакцию на событие и прекращает его распространение */
    cancelEvent: function(e) {
        e = e || window.event;
        if (e.preventDefault && e.stopPropagation) {
            e.preventDefault();
            e.stopPropagation();
        }
        return false;
    },
    /** 
     * Запуск событий после загрузки всего DOM.
     * domLoad - массив кого запускать
     * domLoaded - обработчик, который многократно пихается во все варианты ловли события
     * onDomLoaded(fireThis) - добавляет fireThis в список запуска domLoad
     */
    domLoad: [],
    domLoaded: function() {
        // мы сюда можем попасть не один раз, обрубаем повторные заходы
        if (arguments.callee.done) return;
        arguments.callee.done = true;
        // запускаем всех по очереди
        for (i = 0; i < bkLib.domLoad.length; i++) bkLib.domLoad[i]();
    },
    onDomLoaded: function(fireThis) {
        this.domLoad.push(fireThis);
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", bkLib.domLoaded, null);
        } else if (bkLib.isMSIE) {
            document.write("<style>.nicEdit-main p { margin: 0; }</style><scr" + "ipt id=__ie_onload defer " + ((location.protocol == "https:") ? "src='javascript:void(0)'" : "src=//0") + "><\/scr" + "ipt>");
            $BK("__ie_onload").onreadystatechange = function() {
                if (this.readyState == "complete") {
                    bkLib.domLoaded();
                }
            };
        }
        window.onload = bkLib.domLoaded;
    }
};

// Возвращает обертку для элемента DOM
// элемент может быть задан по id или передан явно
function $BK(elm) {
    if (typeof(elm) == "string") {
        elm = document.getElementById(elm);
    }
    return (elm && !elm.appendTo) ? bkExtend(elm, bkElement.prototype) : elm;
}

var bkEvent = {
    addEvent: function(evType, evFunc) {
        if (evFunc) {
            this.eventList = this.eventList || {};
            this.eventList[evType] = this.eventList[evType] || [];
            this.eventList[evType].push(evFunc);
        }
        return this;
    },
    fireEvent: function() {
        var args = bkLib.toArray(arguments),
            evType = args.shift();
        if (this.eventList && this.eventList[evType]) {
            for (var i = 0; i < this.eventList[evType].length; i++) {
                this.eventList[evType][i].apply(this, args);
            }
        }
    }
};

/**
 * Зачаток системы локализации текста.
 */
function __(s) {
    return s;
}

/**
 * Формирует замыкание метода.
 * Запоминаются:
 * первый аргумент - он станет this при вызове
 * остальные аргументы - будут первыми аргументами при вызове
 * При вызове замыкания переданные аргументы попадают в конец списка аргументов.
 * Пример:
 * SomeClass.methodA = function () { ... };
 * var closure = SomeClass.methodA.closure(objectD,a1,a2,...);
 * тогда вызов closure(b1,b2,...) эквивалентен objectD.methodA(a1,a2,...,b1,b2,...);
 */
Function.prototype.closure = function() {
    var __method = this,
        args = bkLib.toArray(arguments),
        obj = args.shift();
    return function() {
        if (typeof(bkLib) != 'undefined') {
            return __method.apply(obj, args.concat(bkLib.toArray(arguments)));
        }
    };
}

/**
 * Формирует обработчик события, как замыкание метода.
 * Запоминаются:
 * первый аргумент - он станет this при вызове
 * остальные аргументы - будут последними аргументами при вызове
 * При вызове замыкания ожидается один аргумент - событие, остальные игнорируются
 * В замыкание передается событие, полученный из него целевой элемент и в конце остальные аргументы замыкания.
 * Пример:
 * SomeClass.methodA = function () { ... };
 * var listener = SomeClass.methodA.closureListener(objectD,a1,a2,...);
 * тогда вызов listener(e,b1,b2,...) эквивалентен objectD.methodA(e,target,a1,a2,...);
 */
Function.prototype.closureListener = function() {
    var __method = this,
        args = bkLib.toArray(arguments),
        object = args.shift();
    return function(e) {
        e = e || window.event;
        if (e.target) {
            var target = e.target;
        } else {
            var target = e.srcElement
        };
        return __method.apply(object, [e, target].concat(args));
    };
}

/**
 * Настройки по умолчанию.
 */
var nicEditorConfig = bkClass.extend({
    /** стандартный набор кнопок */
    buttons: {
        'bold': {
            name: __('Click to Bold'),
            command: 'Bold',
            tags: ['B', 'STRONG'],
            css: {
                'font-weight': 'bold'
            },
            key: 'b'
        },
        'italic': {
            name: __('Click to Italic'),
            command: 'Italic',
            tags: ['EM', 'I'],
            css: {
                'font-style': 'italic'
            },
            key: 'i'
        },
        'underline': {
            name: __('Click to Underline'),
            command: 'Underline',
            tags: ['U'],
            css: {
                'text-decoration': 'underline'
            },
            key: 'u'
        },
        'left': {
            name: __('Left Align'),
            command: 'justifyleft',
            noActive: true
        },
        'center': {
            name: __('Center Align'),
            command: 'justifycenter',
            noActive: true
        },
        'right': {
            name: __('Right Align'),
            command: 'justifyright',
            noActive: true
        },
        'justify': {
            name: __('Justify Align'),
            command: 'justifyfull',
            noActive: true
        },
        'ol': {
            name: __('Insert Ordered List'),
            command: 'insertorderedlist',
            tags: ['OL']
        },
        'ul': {
            name: __('Insert Unordered List'),
            command: 'insertunorderedlist',
            tags: ['UL']
        },
        'subscript': {
            name: __('Click to Subscript'),
            command: 'subscript',
            tags: ['SUB']
        },
        'superscript': {
            name: __('Click to Superscript'),
            command: 'superscript',
            tags: ['SUP']
        },
        'strikethrough': {
            name: __('Click to Strike Through'),
            command: 'strikeThrough',
            css: {
                'text-decoration': 'line-through'
            }
        },
        'removeformat': {
            name: __('Remove Formatting'),
            command: 'removeformat',
            noActive: true
        },
        'indent': {
            name: __('Indent Text'),
            command: 'indent',
            noActive: true
        },
        'outdent': {
            name: __('Remove Indent'),
            command: 'outdent',
            noActive: true
        },
        'hr': {
            name: __('Horizontal Rule'),
            command: 'insertHorizontalRule',
            noActive: true
        }
    },
    /** 
     * Порядок кнопок.
     * Указаны даже несуществующие кнопки - они игнорируются.
     */
    buttonList: ['save', 'bold', 'italic', 'underline', 'left', 'center', 'right', 'justify', 'ol', 'ul', 'fontSize', 'fontFamily', 'fontFormat', 'indent', 'outdent', 'image', 'upload', 'link', 'unlink', 'forecolor', 'bgcolor'],
    /** путь к картинке с иконками */
    iconsPath: '../nicEditorIcons.gif',
    /** Номера иконок в картинке */
    iconList: {
        "xhtml": 1,
        "bgcolor": 2,
        "forecolor": 3,
        "bold": 4,
        "center": 5,
        "hr": 6,
        "indent": 7,
        "italic": 8,
        "justify": 9,
        "left": 10,
        "ol": 11,
        "outdent": 12,
        "removeformat": 13,
        "right": 14,
        "save": 15,
        "strikethrough": 16,
        "subscript": 17,
        "superscript": 18,
        "ul": 19,
        "underline": 20,
        "image": 21,
        "link": 22,
        "unlink": 23,
        "close": 24,
        "arrow": 25,
        "player": 22
    }

});

/**
 * Глобальный объект для регистрации различных плагинов и настроек редакторов.
 * Потенциально - единая точка входа.
 */
var nicEditors = {
    /** Все доступные плагины */
    nicPlugins: [],
    /** Все настройки редакторов (не экземпляры!) */
    editors: [],

    /**
     * Добавляет регистрацию плагина.
     * plugin - функция-фабрика plugin(nicEditor,options)
     * options - объект настроек {name: value, ...}
     */
    registerPlugin: function(plugin, options) {
        this.nicPlugins.push({
            p: plugin,
            o: options
        });
    },

    /**
     * Подменяет на странице все <textarea> на редакторы.
     */
    allTextAreas: function(nicOptions) {
        var textareas = document.getElementsByTagName("textarea");
        if (textareas.length == 0) return;

        var editor = new nicEditor(nicOptions);
        nicEditors.editors.push(editor);
        for (var i = 0; i < textareas.length; i++) {
            editor.panelInstance(textareas[i]);
        }
    },

    /**
     * Ищет редактор по DOM элементу или по его id.
     */
    findEditor: function(element) {
        var editors = nicEditors.editors;
        for (var i = 0; i < editors.length; i++) {
            var editor = editors[i];
            var instance = editor.instanceById(element);
            if (instance) {
                return editor;
            }
        }
    }
};

/**
 * Настройки редактора и его экземпляры.
 * this.options - объкект настроек
 * this.loadedPlugins - экземпляры плагинов
 * this.nicInstances - экземпляры редакторов
 * this.nicPanel - панель инструментов (единственная?)
 * this.selectedInstance - текущий редактор
 * this.lastSelectedInstance - редактор, бывший текущим до этого
 */
var nicEditor = bkClass.extend({
    /**
     * Конструктор редактора.
     * @param editorOptions - объект с настройками
     */
    construct: function(editorOptions) {
        this.options = new nicEditorConfig();
        bkExtend(this.options, editorOptions);
        this.nicInstances = new Array();
        this.loadedPlugins = new Array();

        // создает экземпляры всех зарегистрированных плагинов
        var plugins = nicEditors.nicPlugins;
        for (var i = 0; i < plugins.length; i++) {
            this.loadedPlugins.push(new plugins[i].p(this, plugins[i].o));
        }

        // регистрирует себя в глобальном объекте
        nicEditors.editors.push(this);

        // вешается обработчик потери форкуса
        bkLib.addEvent(document.body, 'mousedown', this.selectCheck.closureListener(this));
    },

    /**
     * Создает и добавляет новый экземпляр редактора с панелью инструсентов.
     * @param element - для какого элемента создаем
     * @param options - настройки
     * @return this
     */
    panelInstance: function(element, options) {
        // пытаемся прибить предшественника
        element = this.checkReplace($BK(element));
        // создаем блок для панельки
        var panelElm = new bkElement('DIV').setStyle({
            // width: (parseInt(element.getStyle('width')) || element.clientWidth) + 'px'
        }).appendBefore(element);
        // вешаем туда панельку
        this.setPanel(panelElm);
        // теперь создаем редактор
        return this.addInstance(element, options);
    },

    /**
     * Проверяет, не был ли на этот же элемент зарегистрирован другой редактор.
     * Если был, то убивает предшественика.
     * @param element - для какого элемента ищем
     * @return element
     */
    checkReplace: function(element) {
        var editor = nicEditors.findEditor(element);
        if (editor) {
            editor.removeInstance(element);
            editor.removePanel();
        }
        return element;
    },

    /**
     * Создает и добавляет новый экземпляр редактора.
     * @param element - для какого элемента создаем
     * @param options - настройки
     * @return this
     */
    addInstance: function(element, options) {
        // пытаемся прибить предшественника
        element = this.checkReplace($BK(element));
        // создаем экземпляр
        if (element.contentEditable || !!window.opera) {
            var newInstance = new nicEditorInstance(element, options, this);
        } else {
            var newInstance = new nicEditorIFrameInstance(element, options, this);
        }
        // добавляем в список
        this.nicInstances.push(newInstance);
        return this;
    },

    /**
     * Убивает экземпляр редактора по элементу.
     * @param element - для какого элемента ищем
     */
    removeInstance: function(element) {
        element = $BK(element);
        var instances = this.nicInstances;
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].e == element) {
                instances[i].remove();
                this.nicInstances.splice(i, 1);
            }
        }
    },

    /**
     * Убивает панельку.
     */
    removePanel: function() {
        if (this.nicPanel) {
            this.nicPanel.remove();
            this.nicPanel = null;
        }
    },

    /**
     * Ишет экземпляр по элементу.
     * @param element - для какого элемента ищем
     * @return nicEditorInstance | undefined
     */
    instanceById: function(e) {
        e = $BK(e);
        var instances = this.nicInstances;
        for (var i = 0; i < instances.length; i++) {
            if (instances[i].e == e) {
                return instances[i];
            }
        }
    },

    /**
     * Создает панель инструментов.
     * Параметр - это не тот же самый элемент, что у редактора.
     * После создания запускает в редакторе событие 'panel' с параметром - созданной панелью.
     * @param element - в каком элементе создаем
     * @return this
     */
    setPanel: function(element) {
        this.nicPanel = new nicEditorPanel($BK(element), this.options, this);
        this.fireEvent('panel', this.nicPanel);
        return this;
    },

    /**
     * Передает команду текущему редактору.
     */
    nicCommand: function(cmd, args) {
        if (this.selectedInstance) {
            this.selectedInstance.nicCommand(cmd, args);
        }
    },

    getIcon: function(iconName, options) {
        var icon = this.options.iconList[iconName];
        var file = (options.iconFiles) ? options.iconFiles[iconName] : '';
        return {
            backgroundImage: "url('" + ((icon) ? this.options.iconsPath : file) + "')",
            backgroundPosition: ((icon) ? ((icon - 1) * -18) : 0) + 'px 0px'
        };
    },

    /**
     * Обработчик события.
     * Ищет от места события до корня дерева узел с подстрокой 'nicEdit' в классах.
     * Если находит, то ничего не делает.
     * Если не находит, то симулирует событие потери фокуса для текущего редактора.
     */
    selectCheck: function(event, target) {
        var found = false;
        do {
            if (target.className && target.className.indexOf('nicEdit') != -1) {
                return false;
            }
        } while (target = target.parentNode);
        this.fireEvent('blur', this.selectedInstance, target);
        this.lastSelectedInstance = this.selectedInstance;
        this.selectedInstance = null;
        return false;
    }

});
nicEditor = nicEditor.extend(bkEvent);


var nicEditorInstance = bkClass.extend({
    isSelected: false,

    construct: function(e, options, nicEditor) {
        this.ne = nicEditor;
        this.elm = this.e = e;
        this.options = options || {};

        newX = parseInt(e.getStyle('width')) || e.clientWidth;
        newY = parseInt(e.getStyle('height')) || e.clientHeight;
        this.initialHeight = newY - 8;

        var isTextarea = (e.nodeName.toLowerCase() == "textarea");
        if (isTextarea || this.options.hasPanel) {
            var ie7s = (bkLib.isMSIE && !((typeof document.body.style.maxHeight != "undefined") && document.compatMode == "CSS1Compat"))
            var s = {
                width: newX + 'px',
                border: '1px solid #ccc',
                borderTop: 0,
                overflowY: 'auto',
                overflowX: 'hidden'
            };
            s[(ie7s) ? 'height' : 'maxHeight'] = (this.ne.options.maxHeight) ? this.ne.options.maxHeight + 'px' : null;
            this.editorContain = new bkElement('DIV').setStyle(s).appendBefore(e);
            var editorElm = new bkElement('DIV').setStyle({
                width: (newX - 8) + 'px',
                margin: '4px',
                minHeight: newY + 'px'
            }).addClass('main').appendTo(this.editorContain);

            e.setStyle({
                display: 'none'
            });

            editorElm.innerHTML = e.innerHTML;
            if (isTextarea) {
                editorElm.setContent(e.value);
                this.copyElm = e;
                var f = e.parentTag('FORM');
                if (f) {
                    bkLib.addEvent(f, 'submit', this.saveContent.closure(this));
                }
            }
            editorElm.setStyle((ie7s) ? {
                height: newY + 'px'
            } : {
                overflow: 'hidden'
            });
            this.elm = editorElm;
        }
        this.ne.addEvent('blur', this.blur.closure(this));

        this.init();
        this.blur();
    },

    init: function() {
        this.elm.setAttribute('contentEditable', 'true');
        if (this.getContent() == "") {
            this.setContent('<br />');
        }
        this.instanceDoc = document.defaultView;
        this.elm.addEvent('mousedown', this.selected.closureListener(this)).addEvent('keypress', this.keyDown.closureListener(this)).addEvent('focus', this.selected.closure(this)).addEvent('blur', this.blur.closure(this)).addEvent('keyup', this.selected.closure(this));
        this.ne.fireEvent('add', this);
    },

    remove: function() {
        this.saveContent();
        if (this.copyElm || this.options.hasPanel) {
            this.editorContain.remove();
            this.e.setStyle({
                'display': 'block'
            });
            this.ne.removePanel();
        }
        this.disable();
        this.ne.fireEvent('remove', this);
    },

    disable: function() {
        this.elm.setAttribute('contentEditable', 'false');
    },

    getSel: function() {
        return (window.getSelection) ? window.getSelection() : document.selection;
    },

    getRng: function() {
        var s = this.getSel();
        if (!s || s.rangeCount === 0) {
            return;
        }
        return (s.rangeCount > 0) ? s.getRangeAt(0) : s.createRange();
    },

    selRng: function(rng, s) {
        if (window.getSelection) {
            s.removeAllRanges();
            s.addRange(rng);
        } else {
            rng.select();
        }
    },

    selElm: function() {
        var r = this.getRng();
        if (!r) {
            return;
        }
        if (r.startContainer) {
            var contain = r.startContainer;
            if (r.cloneContents().childNodes.length == 1) {
                for (var i = 0; i < contain.childNodes.length; i++) {
                    var rng = contain.childNodes[i].ownerDocument.createRange();
                    rng.selectNode(contain.childNodes[i]);
                    if (r.compareBoundaryPoints(Range.START_TO_START, rng) != 1 &&
                        r.compareBoundaryPoints(Range.END_TO_END, rng) != -1) {
                        return $BK(contain.childNodes[i]);
                    }
                }
            }
            return $BK(contain);
        } else {
            return $BK((this.getSel().type == "Control") ? r.item(0) : r.parentElement());
        }
    },

    saveRng: function() {
        this.savedRange = this.getRng();
        this.savedSel = this.getSel();
    },

    restoreRng: function() {
        if (this.savedRange) {
            this.selRng(this.savedRange, this.savedSel);
        }
    },

    keyDown: function(e, t) {
        if (e.ctrlKey) {
            this.ne.fireEvent('key', this, e);
        }
    },

    selected: function(e, t) {
        if (!t && !(t = this.selElm)) {
            t = this.selElm();
        }
        if (!e.ctrlKey) {
            var selInstance = this.ne.selectedInstance;
            if (selInstance != this) {
                if (selInstance) {
                    this.ne.fireEvent('blur', selInstance, t);
                }
                this.ne.selectedInstance = this;
                this.ne.fireEvent('focus', selInstance, t);
            }
            this.ne.fireEvent('selected', selInstance, t);
            this.isFocused = true;
            this.elm.addClass('selected');
        }
        return false;
    },

    blur: function() {
        this.isFocused = false;
        this.elm.removeClass('selected');
    },

    saveContent: function() {
        if (this.copyElm || this.options.hasPanel) {
            this.ne.fireEvent('save', this);
            (this.copyElm) ? this.copyElm.value = this.getContent(): this.e.innerHTML = this.getContent();
        }
    },

    getElm: function() {
        return this.elm;
    },

    getContent: function() {
        this.content = this.getElm().innerHTML;
        this.ne.fireEvent('get', this);
        return this.content;
    },

    setContent: function(e) {
        this.content = e;
        this.ne.fireEvent('set', this);
        this.elm.innerHTML = this.content;
    },

    nicCommand: function(cmd, args) {
        // см. https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
        document.execCommand(cmd, false, args);
    }
});

var nicEditorIFrameInstance = nicEditorInstance.extend({
    savedStyles: [],

    init: function() {
        var c = this.elm.innerHTML.replace(/^\s+|\s+$/g, '');
        this.elm.innerHTML = '';
        (!c) ? c = "<br />": c;
        this.initialContent = c;

        this.elmFrame = new bkElement('iframe').setAttributes({
            'src': 'javascript:;',
            'frameBorder': 0,
            'allowTransparency': 'true',
            'scrolling': 'no'
        }).setStyle({
            height: '100px',
            width: '100%'
        }).addClass('frame').appendTo(this.elm);

        if (this.copyElm) {
            this.elmFrame.setStyle({
                width: (this.elm.offsetWidth - 4) + 'px'
            });
        }

        var styleList = ['font-size', 'font-family', 'font-weight', 'color'];
        for (itm in styleList) {
            this.savedStyles[bkLib.camelize(itm)] = this.elm.getStyle(itm);
        }

        setTimeout(this.initFrame.closure(this), 50);
    },

    disable: function() {
        this.elm.innerHTML = this.getContent();
    },

    initFrame: function() {
        var fd = $BK(this.elmFrame.contentWindow.document);
        fd.designMode = "on";
        fd.open();
        var css = this.ne.options.externalCSS;
        fd.write('<html><head>' + ((css) ? '<link href="' + css + '" rel="stylesheet" type="text/css" />' : '') + '</head><body id="nicEditContent" style="margin: 0 !important; background-color: transparent !important;">' + this.initialContent + '</body></html>');
        fd.close();
        this.frameDoc = fd;

        this.frameWin = $BK(this.elmFrame.contentWindow);
        this.frameContent = $BK(this.frameWin.document.body).setStyle(this.savedStyles);
        this.instanceDoc = this.frameWin.document.defaultView;

        this.heightUpdate();
        this.frameDoc.addEvent('mousedown', this.selected.closureListener(this)).addEvent('keyup', this.heightUpdate.closureListener(this)).addEvent('keydown', this.keyDown.closureListener(this)).addEvent('keyup', this.selected.closure(this));
        this.ne.fireEvent('add', this);
    },

    getElm: function() {
        return this.frameContent;
    },

    setContent: function(c) {
        this.content = c;
        this.ne.fireEvent('set', this);
        this.frameContent.innerHTML = this.content;
        this.heightUpdate();
    },

    getSel: function() {
        return (this.frameWin) ? this.frameWin.getSelection() : this.frameDoc.selection;
    },

    heightUpdate: function() {
        this.elmFrame.style.height = Math.max(this.frameContent.offsetHeight, this.initialHeight) + 'px';
    },

    nicCommand: function(cmd, args) {
        this.frameDoc.execCommand(cmd, false, args);
        setTimeout(this.heightUpdate.closure(this), 100);
    }


});
var nicEditorPanel = bkClass.extend({
    construct: function(e, editorOptions, nicEditor) {
        this.elm = e;
        this.options = editorOptions;
        this.ne = nicEditor;
        this.panelButtons = new Array();
        this.buttonList = bkExtend([], this.ne.options.buttonList);

        this.panelContain = new bkElement('DIV').setStyle({
            overflow: 'hidden',
            width: '100%',
            border: '1px solid #cccccc',
            backgroundColor: '#efefef'
        }).addClass('panelContain');
        this.panelElm = new bkElement('DIV').setStyle({
            margin: '2px',
            marginTop: '0px',
            zoom: 1,
            overflow: 'hidden'
        }).addClass('panel').appendTo(this.panelContain);
        this.panelContain.appendTo(e);

        var opt = this.ne.options;
        var buttons = opt.buttons;
        for (button in buttons) {
            this.addButton(button, opt, true);
        }
        this.reorder();
        e.noSelect();
    },

    addButton: function(buttonName, options, noOrder) {
        var button = options.buttons[buttonName];
        var type = (button['type']) ? eval('(typeof(' + button['type'] + ') == "undefined") ? null : ' + button['type'] + ';') : nicEditorButton;
        var hasButton = bkLib.inArray(this.buttonList, buttonName);
        if (type && (hasButton || this.ne.options.fullPanel)) {
            this.panelButtons.push(new type(this.panelElm, buttonName, options, this.ne));
            if (!hasButton) {
                this.buttonList.push(buttonName);
            }
        }
    },

    findButton: function(itm) {
        for (var i = 0; i < this.panelButtons.length; i++) {
            if (this.panelButtons[i].name == itm)
                return this.panelButtons[i];
        }
    },

    reorder: function() {
        var bl = this.buttonList;
        for (var i = 0; i < bl.length; i++) {
            var button = this.findButton(bl[i]);
            if (button) {
                this.panelElm.appendChild(button.margin);
            }
        }
    },

    remove: function() {
        this.elm.remove();
    }
});
var nicEditorButton = bkClass.extend({

    construct: function(e, buttonName, options, nicEditor) {
        this.options = options.buttons[buttonName];
        this.name = buttonName;
        this.ne = nicEditor;
        this.elm = e;

        this.margin = new bkElement('DIV').setStyle({
            'float': 'left',
            marginTop: '2px'
        }).appendTo(e);
        this.contain = new bkElement('DIV').setStyle({
            width: '20px',
            height: '20px'
        }).addClass('buttonContain').appendTo(this.margin);
        this.border = new bkElement('DIV').setStyle({
            backgroundColor: '#efefef',
            border: '1px solid #efefef'
        }).appendTo(this.contain);
        this.button = new bkElement('DIV').setStyle({
            width: '18px',
            height: '18px',
            overflow: 'hidden',
            zoom: 1,
            cursor: 'pointer'
        }).addClass('button').setStyle(this.ne.getIcon(buttonName, options)).appendTo(this.border);
        this.button
            .addEvent('mouseover', this.hoverOn.closure(this))
            .addEvent('mouseout', this.hoverOff.closure(this))
            .addEvent('mousedown', this.mouseClick.closure(this))
            .noSelect();

        if (!window.opera) {
            this.button.onmousedown = this.button.onclick = bkLib.cancelEvent;
        }

        nicEditor
            .addEvent('selected', this.enable.closure(this))
            .addEvent('blur', this.disable.closure(this))
            .addEvent('key', this.key.closure(this));

        this.disable();
        this.init();
    },

    init: function() {},

    hide: function() {
        this.contain.setStyle({
            display: 'none'
        });
    },

    updateState: function() {
        if (this.isDisabled) {
            this.setBg();
        } else if (this.isHover) {
            this.setBg('hover');
        } else if (this.isActive) {
            this.setBg('active');
        } else {
            this.setBg();
        }
    },

    setBg: function(state) {
        switch (state) {
            case 'hover':
                var stateStyle = {
                    border: '1px solid #666',
                    backgroundColor: '#ddd'
                };
                break;
            case 'active':
                var stateStyle = {
                    border: '1px solid #666',
                    backgroundColor: '#ccc'
                };
                break;
            default:
                var stateStyle = {
                    border: '1px solid #efefef',
                    backgroundColor: '#efefef'
                };
        }
        this.border.setStyle(stateStyle).addClass('button-' + state);
    },

    checkNodes: function(e) {
        var elm = e;
        do {
            if (this.options.tags && bkLib.inArray(this.options.tags, elm.nodeName)) {
                this.activate();
                return true;
            }
        } while (elm = elm.parentNode && elm.className != "nicEdit");
        elm = $BK(e);
        while (elm.nodeType == 3) {
            elm = $BK(elm.parentNode);
        }
        if (this.options.css) {
            for (itm in this.options.css) {
                if (elm.getStyle(itm, this.ne.selectedInstance.instanceDoc) == this.options.css[itm]) {
                    this.activate();
                    return true;
                }
            }
        }
        this.deactivate();
        return false;
    },

    activate: function() {
        if (!this.isDisabled) {
            this.isActive = true;
            this.updateState();
            this.ne.fireEvent('buttonActivate', this);
        }
    },

    deactivate: function() {
        this.isActive = false;
        this.updateState();
        if (!this.isDisabled) {
            this.ne.fireEvent('buttonDeactivate', this);
        }
    },

    enable: function(ins, t) {
        this.isDisabled = false;
        this.contain.setStyle({
            'opacity': 1
        }).addClass('buttonEnabled');
        this.updateState();
        this.checkNodes(t);
    },

    disable: function(ins, t) {
        this.isDisabled = true;
        this.contain.setStyle({
            'opacity': 0.6
        }).removeClass('buttonEnabled');
        this.updateState();
    },

    toggleActive: function() {
        (this.isActive) ? this.deactivate(): this.activate();
    },

    hoverOn: function() {
        if (!this.isDisabled) {
            this.isHover = true;
            this.updateState();
            this.ne.fireEvent("buttonOver", this);
        }
    },

    hoverOff: function() {
        this.isHover = false;
        this.updateState();
        this.ne.fireEvent("buttonOut", this);
    },

    mouseClick: function() {
        if (this.options.command) {
            this.ne.nicCommand(this.options.command, this.options.commandArgs);
            if (!this.options.noActive) {
                this.toggleActive();
            }
        }
        this.ne.fireEvent("buttonClick", this);
    },

    key: function(nicInstance, e) {
        if (this.options.key && e.ctrlKey && String.fromCharCode(e.keyCode || e.charCode).toLowerCase() == this.options.key) {
            this.mouseClick();
            if (e.preventDefault) e.preventDefault();
        }
    }

});


var nicPlugin = bkClass.extend({

    construct: function(nicEditor, options) {
        this.options = options;
        this.ne = nicEditor;
        this.ne.addEvent('panel', this.loadPanel.closure(this));

        this.init();
    },

    loadPanel: function(np) {
        var buttons = this.options.buttons;
        for (var button in buttons) {
            np.addButton(button, this.options);
        }
        np.reorder();
    },

    init: function() {}
});




/* START CONFIG */
var nicPaneOptions = {};
/* END CONFIG */

var nicEditorPane = bkClass.extend({
    construct: function(elm, nicEditor, options, openButton) {
        this.ne = nicEditor;
        this.elm = elm;
        this.pos = elm.pos();

        this.contain = new bkElement('div').setStyle({
            zIndex: '99999',
            overflow: 'hidden',
            position: 'absolute',
            left: this.pos[0] + 'px',
            top: this.pos[1] + 'px'
        })
        this.pane = new bkElement('div').setStyle({
            fontSize: '12px',
            border: '1px solid #ccc',
            'overflow': 'hidden',
            padding: '4px',
            textAlign: 'left',
            backgroundColor: '#ffffc9'
        }).addClass('pane').setStyle(options).appendTo(this.contain);

        if (openButton && !openButton.options.noClose) {
            this.close = new bkElement('div').setStyle({
                'float': 'right',
                height: '16px',
                width: '16px',
                cursor: 'pointer'
            }).setStyle(this.ne.getIcon('close', nicPaneOptions)).addEvent('mousedown', openButton.removePane.closure(this)).appendTo(this.pane);
        }

        this.contain.noSelect().appendTo(document.body);

        this.position();
        this.init();
    },

    init: function() {},

    position: function() {
        if (this.ne.nicPanel) {
            var panelElm = this.ne.nicPanel.elm;
            var panelPos = panelElm.pos();
            var newLeft = panelPos[0] + parseInt(panelElm.getStyle('width')) - (parseInt(this.pane.getStyle('width')) + 8);
            if (newLeft < this.pos[0]) {
                this.contain.setStyle({
                    left: newLeft + 'px'
                });
            }
        }
    },

    toggle: function() {
        this.isVisible = !this.isVisible;
        this.contain.setStyle({
            display: ((this.isVisible) ? 'block' : 'none')
        });
    },

    remove: function() {
        if (this.contain) {
            this.contain.remove();
            this.contain = null;
        }
    },

    append: function(c) {
        c.appendTo(this.pane);
    },

    setContent: function(c) {
        this.pane.setContent(c);
    }

});



var nicEditorAdvancedButton = nicEditorButton.extend({

    init: function() {
        this.ne.addEvent('selected', this.removePane.closure(this)).addEvent('blur', this.removePane.closure(this));
    },

    mouseClick: function() {
        if (!this.isDisabled) {
            if (this.pane && this.pane.pane) {
                this.removePane();
            } else {
                this.pane = new nicEditorPane(this.contain, this.ne, {
                    width: (this.width || '270px'),
                    backgroundColor: '#fff'
                }, this);
                this.addPane();
                this.ne.selectedInstance.saveRng();
            }
        }
    },

    addForm: function(f, elm) {
        this.form = new bkElement('form').addEvent('submit', this.submit.closureListener(this));
        this.pane.append(this.form);
        this.inputs = {};

        for (itm in f) {
            var field = f[itm];
            var val = '';
            if (elm) {
                val = elm.getAttribute(itm);
            }
            if (!val) {
                val = field['value'] || '';
            }
            var type = f[itm].type;

            if (type == 'title') {
                new bkElement('div').setContent(field.txt).setStyle({
                    fontSize: '14px',
                    fontWeight: 'bold',
                    padding: '0px',
                    margin: '2px 0'
                }).appendTo(this.form);
            } else {
                var contain = new bkElement('div').setStyle({
                    overflow: 'hidden',
                    clear: 'both'
                }).appendTo(this.form);
                if (field.txt) {
                    new bkElement('label').setAttributes({
                        'for': itm
                    }).setContent(field.txt).setStyle({
                        margin: '2px 4px',
                        fontSize: '13px',
                        width: '50px',
                        lineHeight: '20px',
                        textAlign: 'right',
                        'float': 'left'
                    }).appendTo(contain);
                }

                switch (type) {
                    case 'text':
                        this.inputs[itm] = new bkElement('input').setAttributes({
                            id: itm,
                            'value': val,
                            'type': 'text'
                        }).setStyle({
                            margin: '2px 0',
                            fontSize: '13px',
                            'float': 'left',
                            height: '20px',
                            border: '1px solid #ccc',
                            overflow: 'hidden'
                        }).setStyle(field.style).appendTo(contain);
                        break;
                    case 'select':
                        this.inputs[itm] = new bkElement('select').setAttributes({
                            id: itm
                        }).setStyle({
                            border: '1px solid #ccc',
                            'float': 'left',
                            margin: '2px 0'
                        }).appendTo(contain);
                        for (opt in field.options) {
                            var o = new bkElement('option').setAttributes({
                                value: opt,
                                selected: (opt == val) ? 'selected' : ''
                            }).setContent(field.options[opt]).appendTo(this.inputs[itm]);
                        }
                        break;
                    case 'content':
                        this.inputs[itm] = new bkElement('textarea').setAttributes({
                            id: itm
                        }).setStyle({
                            border: '1px solid #ccc',
                            'float': 'left'
                        }).setStyle(field.style).appendTo(contain);
                        this.inputs[itm].value = val;
                }
            }
        }
        new bkElement('input').setAttributes({
            'type': 'submit'
        }).setStyle({
            backgroundColor: '#efefef',
            border: '1px solid #ccc',
            margin: '3px 0',
            'float': 'left',
            'clear': 'both'
        }).appendTo(this.form);
        this.form.onsubmit = bkLib.cancelEvent;
    },

    submit: function() {},

    findElm: function(tag, attr, val) {
        var list = this.ne.selectedInstance.getElm().getElementsByTagName(tag);
        for (var i = 0; i < list.length; i++) {
            if (list[i].getAttribute(attr) == val) {
                return $BK(list[i]);
            }
        }
    },

    removePane: function() {
        if (this.pane) {
            this.pane.remove();
            this.pane = null;
            this.ne.selectedInstance.restoreRng();
        }
    }
});


var nicButtonTips = bkClass.extend({
    construct: function(nicEditor) {
        this.ne = nicEditor;
        nicEditor.addEvent('buttonOver', this.show.closure(this)).addEvent('buttonOut', this.hide.closure(this));

    },

    show: function(button) {
        this.timer = setTimeout(this.create.closure(this, button), 400);
    },

    create: function(button) {
        this.timer = null;
        if (!this.pane) {
            this.pane = new nicEditorPane(button.button, this.ne, {
                fontSize: '12px',
                marginTop: '5px'
            });
            this.pane.setContent(button.options.name);
        }
    },

    hide: function(button) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        if (this.pane) {
            this.pane = this.pane.remove();
        }
    }
});
nicEditors.registerPlugin(nicButtonTips);



/* START CONFIG */
var nicSelectOptions = {
    buttons: {
        'fontSize': {
            name: __('Select Font Size'),
            type: 'nicEditorFontSizeSelect',
            command: 'fontsize'
        },
        'fontFamily': {
            name: __('Select Font Family'),
            type: 'nicEditorFontFamilySelect',
            command: 'fontname'
        },
        'fontFormat': {
            name: __('Select Font Format'),
            type: 'nicEditorFontFormatSelect',
            command: 'formatBlock'
        }
    }
};
/* END CONFIG */
var nicEditorSelect = bkClass.extend({

    construct: function(e, buttonName, options, nicEditor) {
        this.options = options.buttons[buttonName];
        this.elm = e;
        this.ne = nicEditor;
        this.name = buttonName;
        this.selOptions = new Array();

        this.margin = new bkElement('div').setStyle({
            'float': 'left',
            margin: '2px 1px 0 1px'
        }).appendTo(this.elm);
        this.contain = new bkElement('div').setStyle({
            width: '90px',
            height: '20px',
            cursor: 'pointer',
            overflow: 'hidden'
        }).addClass('selectContain').addEvent('click', this.toggle.closure(this)).appendTo(this.margin);
        this.items = new bkElement('div').setStyle({
            overflow: 'hidden',
            zoom: 1,
            border: '1px solid #ccc',
            paddingLeft: '3px',
            backgroundColor: '#fff'
        }).appendTo(this.contain);
        this.control = new bkElement('div').setStyle({
            overflow: 'hidden',
            'float': 'right',
            height: '18px',
            width: '16px'
        }).addClass('selectControl').setStyle(this.ne.getIcon('arrow', options)).appendTo(this.items);
        this.txt = new bkElement('div').setStyle({
            overflow: 'hidden',
            'float': 'left',
            width: '66px',
            height: '14px',
            marginTop: '1px',
            fontFamily: 'sans-serif',
            textAlign: 'center',
            fontSize: '12px'
        }).addClass('selectTxt').appendTo(this.items);

        if (!window.opera) {
            this.contain.onmousedown = this.control.onmousedown = this.txt.onmousedown = bkLib.cancelEvent;
        }

        this.margin.noSelect();

        this.ne.addEvent('selected', this.enable.closure(this)).addEvent('blur', this.disable.closure(this));

        this.disable();
        this.init();
    },

    disable: function() {
        this.isDisabled = true;
        this.close();
        this.contain.setStyle({
            opacity: 0.6
        });
    },

    enable: function(t) {
        this.isDisabled = false;
        this.close();
        this.contain.setStyle({
            opacity: 1
        });
    },

    setDisplay: function(txt) {
        this.txt.setContent(txt);
    },

    toggle: function() {
        if (!this.isDisabled) {
            (this.pane) ? this.close(): this.open();
        }
    },

    open: function() {
        this.pane = new nicEditorPane(this.items, this.ne, {
            width: '88px',
            padding: '0px',
            borderTop: 0,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            borderBottom: '0px',
            backgroundColor: '#fff'
        });

        for (var i = 0; i < this.selOptions.length; i++) {
            var opt = this.selOptions[i];
            var itmContain = new bkElement('div').setStyle({
                overflow: 'hidden',
                borderBottom: '1px solid #ccc',
                width: '88px',
                textAlign: 'left',
                overflow: 'hidden',
                cursor: 'pointer'
            });
            var itm = new bkElement('div').setStyle({
                padding: '0px 4px'
            }).setContent(opt[1]).appendTo(itmContain).noSelect();
            itm.addEvent('click', this.update.closure(this, opt[0])).addEvent('mouseover', this.over.closure(this, itm)).addEvent('mouseout', this.out.closure(this, itm)).setAttributes('id', opt[0]);
            this.pane.append(itmContain);
            if (!window.opera) {
                itm.onmousedown = bkLib.cancelEvent;
            }
        }
    },

    close: function() {
        if (this.pane) {
            this.pane = this.pane.remove();
        }
    },

    over: function(opt) {
        opt.setStyle({
            backgroundColor: '#ccc'
        });
    },

    out: function(opt) {
        opt.setStyle({
            backgroundColor: '#fff'
        });
    },


    add: function(k, v) {
        this.selOptions.push(new Array(k, v));
    },

    update: function(elm) {
        this.ne.nicCommand(this.options.command, elm);
        this.close();
    }
});

var nicEditorFontSizeSelect = nicEditorSelect.extend({
    sel: {
        1: '1&nbsp;(8pt)',
        2: '2&nbsp;(10pt)',
        3: '3&nbsp;(12pt)',
        4: '4&nbsp;(14pt)',
        5: '5&nbsp;(18pt)',
        6: '6&nbsp;(24pt)'
    },
    init: function() {
        this.setDisplay('Font&nbsp;Size...');
        for (itm in this.sel) {
            this.add(itm, '<font size="' + itm + '">' + this.sel[itm] + '</font>');
        }
    }
});

var nicEditorFontFamilySelect = nicEditorSelect.extend({
    sel: {
        'arial': 'Arial',
        'comic sans ms': 'Comic Sans',
        'courier new': 'Courier New',
        'georgia': 'Georgia',
        'helvetica': 'Helvetica',
        'impact': 'Impact',
        'times new roman': 'Times',
        'trebuchet ms': 'Trebuchet',
        'verdana': 'Verdana'
    },

    init: function() {
        this.setDisplay('Font&nbsp;Family...');
        for (itm in this.sel) {
            this.add(itm, '<font face="' + itm + '">' + this.sel[itm] + '</font>');
        }
    }
});

var nicEditorFontFormatSelect = nicEditorSelect.extend({
    sel: {
        'p': 'Paragraph',
        'pre': 'Pre',
        'h6': 'Heading&nbsp;6',
        'h5': 'Heading&nbsp;5',
        'h4': 'Heading&nbsp;4',
        'h3': 'Heading&nbsp;3',
        'h2': 'Heading&nbsp;2',
        'h1': 'Heading&nbsp;1'
    },

    init: function() {
        this.setDisplay('Font&nbsp;Format...');
        for (itm in this.sel) {
            var tag = itm.toUpperCase();
            this.add('<' + tag + '>', '<' + itm + ' style="padding: 0px; margin: 0px;">' + this.sel[itm] + '</' + tag + '>');
        }
    }
});

nicEditors.registerPlugin(nicPlugin, nicSelectOptions);



/* START CONFIG */
var nicLinkOptions = {
    buttons: {
        'link': {
            name: 'Add Link',
            type: 'nicLinkButton',
            tags: ['A']
        },
        'unlink': {
            name: 'Remove Link',
            command: 'unlink',
            noActive: true
        }
    }
};
/* END CONFIG */

var nicLinkButton = nicEditorAdvancedButton.extend({
    addPane: function() {
        this.ln = this.ne.selectedInstance.selElm().parentTag('A');
        this.addForm({
            '': {
                type: 'title',
                txt: 'Add/Edit Link'
            },
            'href': {
                type: 'text',
                txt: 'URL',
                value: 'http://',
                style: {
                    width: '150px'
                }
            },
            'title': {
                type: 'text',
                txt: 'Title'
            },
            'target': {
                type: 'select',
                txt: 'Open In',
                options: {
                    '': 'Current Window',
                    '_blank': 'New Window'
                },
                style: {
                    width: '100px'
                }
            }
        }, this.ln);
    },

    submit: function(e) {
        var url = this.inputs['href'].value;
        if (url == "http://" || url == "") {
            alert("You must enter a URL to Create a Link");
            return false;
        }
        this.removePane();

        if (!this.ln) {
            var tmp = 'javascript:nicTemp();';
            this.ne.nicCommand("createlink", tmp);
            this.ln = this.findElm('A', 'href', tmp);
        }
        if (this.ln) {
            this.ln.setAttributes({
                href: this.inputs['href'].value,
                title: this.inputs['title'].value,
                target: this.inputs['target'].options[this.inputs['target'].selectedIndex].value
            });
        }
    }
});

nicEditors.registerPlugin(nicPlugin, nicLinkOptions);



/* START CONFIG */
var nicColorOptions = {
    buttons: {
        'forecolor': {
            name: __('Change Text Color'),
            type: 'nicEditorColorButton',
            noClose: true
        },
        'bgcolor': {
            name: __('Change Background Color'),
            type: 'nicEditorBgColorButton',
            noClose: true
        }
    }
};
/* END CONFIG */

var nicEditorColorButton = nicEditorAdvancedButton.extend({
    addPane: function() {
        var colorList = {
            0: '00',
            1: '33',
            2: '66',
            3: '99',
            4: 'CC',
            5: 'FF'
        };
        var colorItems = new bkElement('DIV').setStyle({
            width: '270px'
        });

        for (var r in colorList) {
            for (var b in colorList) {
                for (var g in colorList) {
                    var colorCode = '#' + colorList[r] + colorList[g] + colorList[b];

                    var colorSquare = new bkElement('DIV').setStyle({
                        'cursor': 'pointer',
                        'height': '15px',
                        'float': 'left'
                    }).appendTo(colorItems);
                    var colorBorder = new bkElement('DIV').setStyle({
                        border: '2px solid ' + colorCode
                    }).appendTo(colorSquare);
                    var colorInner = new bkElement('DIV').setStyle({
                        backgroundColor: colorCode,
                        overflow: 'hidden',
                        width: '11px',
                        height: '11px'
                    }).addEvent('click', this.colorSelect.closure(this, colorCode)).addEvent('mouseover', this.on.closure(this, colorBorder)).addEvent('mouseout', this.off.closure(this, colorBorder, colorCode)).appendTo(colorBorder);

                    if (!window.opera) {
                        colorSquare.onmousedown = colorInner.onmousedown = bkLib.cancelEvent;
                    }

                }
            }
        }
        this.pane.append(colorItems.noSelect());
    },

    colorSelect: function(c) {
        this.ne.nicCommand('foreColor', c);
        this.removePane();
    },

    on: function(colorBorder) {
        colorBorder.setStyle({
            border: '2px solid #000'
        });
    },

    off: function(colorBorder, colorCode) {
        colorBorder.setStyle({
            border: '2px solid ' + colorCode
        });
    }
});

var nicEditorBgColorButton = nicEditorColorButton.extend({
    colorSelect: function(c) {
        this.ne.nicCommand('hiliteColor', c);
        this.removePane();
    }
});

nicEditors.registerPlugin(nicPlugin, nicColorOptions);



/* START CONFIG */
var nicImageOptions = {
    buttons: {
        'image': {
            name: 'Add Image',
            type: 'nicImageButton',
            tags: ['IMG']
        }
    }

};
/* END CONFIG */

var nicImageButton = nicEditorAdvancedButton.extend({
    addPane: function() {
        this.im = this.ne.selectedInstance.selElm().parentTag('IMG');
        this.addForm({
            '': {
                type: 'title',
                txt: 'Add/Edit Image'
            },
            'src': {
                type: 'text',
                txt: 'URL',
                'value': 'http://',
                style: {
                    width: '150px'
                }
            },
            'alt': {
                type: 'text',
                txt: 'Alt Text',
                style: {
                    width: '100px'
                }
            },
            'align': {
                type: 'select',
                txt: 'Align',
                options: {
                    none: 'Default',
                    'left': 'Left',
                    'right': 'Right'
                }
            }
        }, this.im);
    },

    submit: function(e) {
        var src = this.inputs['src'].value;
        if (src == "" || src == "http://") {
            alert("You must enter a Image URL to insert");
            return false;
        }
        this.removePane();

        if (!this.im) {
            var tmp = 'javascript:nicImTemp();';
            this.ne.nicCommand("insertImage", tmp);
            this.im = this.findElm('IMG', 'src', tmp);
        }
        if (this.im) {
            this.im.setAttributes({
                src: this.inputs['src'].value,
                alt: this.inputs['alt'].value,
                align: this.inputs['align'].value
            });
        }
    }
});

nicEditors.registerPlugin(nicPlugin, nicImageOptions);


/* Плагин редактирования как HTML кода.
 * Добавляет кнопку из которой выпадает окошко с дополнительным полем редактирования.
 */
var nicCodeButton = nicEditorAdvancedButton.extend({
    // ширина диалога
    width: '350px',
    // заполняем панель
    addPane: function() {
        // это форма
        this.addForm({
            '': {
                // заголовок
                type: 'title',
                txt: 'Edit HTML'
            },
            'code': {
                // поле ввода
                type: 'content',
                // содержимое текущего редактора
                'value': this.ne.selectedInstance.getContent(),
                // ширина чуть меньше диалога
                style: {
                    width: '340px',
                    height: '200px'
                }
            }
        });
    },
    // по сохранению просто возвращаем текст в редактор
    submit: function(e) {
        var code = this.inputs['code'].value;
        this.ne.selectedInstance.setContent(code);
        this.removePane();
    }
});
nicEditors.registerPlugin(nicPlugin, {
    buttons: {
        'xhtml': {
            name: 'Edit HTML',
            type: 'nicCodeButton'
        }
    }

});

/**
 * Плагин вставки шаблонов подстановки.
 */
var placeholderSelect = nicEditorSelect.extend({
    placeholders: {
        address: {
            name: 'Разделитель поста',
            insert: '--readmore--',
        }
    },

    init: function() {
        this.setDisplay('Подстановки');
        var placeholders = this.placeholders;
        for (var key in placeholders) {
            var item = placeholders[key];
            this.add(item.insert, item.name);
        }
    }
});
nicEditors.registerPlugin(nicPlugin, {
    buttons: {
        'placeholder': {
            type: 'placeholderSelect',
            command: 'insertHTML',
        }
    }

});

/* START CONFIG */
var nicPlayerOptions = {
    buttons: {
        'player': {
            name: 'Add Player',
            type: 'nicPlayerButton'
        }
    }

};
/* END CONFIG */

var nicPlayerButton = nicEditorAdvancedButton.extend({
    addPane: function() {
        this.im = this.ne.selectedInstance.selElm().parentTag('IMG');
        this.addForm({
            'src': {
                type: 'text',
                txt: 'URL',
                'value': 'http://',
                style: {
                    width: '150px'
                }
            },
            'elemId': {
                type: 'text',
                txt: 'Element ID',
                'value': 'audio-player',
                style: {
                    width: '150px'
                }
            }
        }, this.im);
    },

    submit: function(e) {
        var src = this.inputs['src'].value;
        var elemid = this.inputs['elemId'].value;
        if (src == "" || src == "http://") {
            alert("You must enter a Audio URL to insert");
            return false;
        }
        if (elemid == "") {
            alert("You must enter a Element ID");
            return false;
        }
        this.removePane();

        if (!this.im) {
            var tmp = '[audio-player,"'+src+'","'+elemid+'"]';
            this.ne.nicCommand("insertText", tmp);
            //this.im = this.findElm('IMG', 'src', tmp);
        }
        // if (this.im) {
        //     this.im.setAttributes({
        //         src: this.inputs['src'].value,
        //         alt: this.inputs['alt'].value,
        //         align: this.inputs['align'].value
        //     });
        // }
    }
});

nicEditors.registerPlugin(nicPlugin, nicPlayerOptions);
