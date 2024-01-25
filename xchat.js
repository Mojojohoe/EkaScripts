/*! JChat - v1.0.0 - 2022-07-01 */
var mint_version = "v0.0.4";
/*╔═════════ Mint Injection - v0.0.4 - 2023-01-17 ════════════════════════════════════════════════*\
░ ║ This file is specifically used for the Mint Eta extension.
░ ║ It is a copy of the original with some modifications.
░ ║ (This is cleaner than force-redefining every function after it has executed at least once)
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/

/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Mint-specific comments look like this. 
░ ║ Let's load in emoji support.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
let emojiSupport = document.createElement("script");
emojiSupport.type = "text/javascript";
emojiSupport.src =
  "https://cdnjs.cloudflare.com/ajax/libs/emoji-js/3.8.0/emoji.min.js";
document.head.appendChild(emojiSupport);

let pickerSupport = document.createElement("script");
pickerSupport.type = "text/javascript";
pickerSupport.src =
  "https://cdn.jsdelivr.net/npm/emoji-mart@latest/dist/browser.js";
document.head.appendChild(pickerSupport);
/*!
 * Bootstrap v3.1.1 (http://getbootstrap.com)
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === "undefined") {
  throw new Error("Bootstrap's JavaScript requires jQuery");
}

/* ========================================================================
 * Bootstrap: transition.js v3.1.1
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement("bootstrap");

    var transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      OTransition: "oTransitionEnd otransitionend",
      transition: "transitionend"
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {
          end: transEndEventNames[name]
        };
      }
    }

    return false; // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false,
      $el = this;
    $(this).one($.support.transition.end, function () {
      called = true;
    });
    var callback = function () {
      if (!called) $($el).trigger($.support.transition.end);
    };
    setTimeout(callback, duration);
    return this;
  };

  $(function () {
    $.support.transition = transitionEnd();
  });
})(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.1.1
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]';
  var Alert = function (el) {
    $(el).on("click", dismiss, this.close);
  };

  Alert.prototype.close = function (e) {
    var $this = $(this);
    var selector = $this.attr("data-target");

    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); // strip for ie7
    }

    var $parent = $(selector);

    if (e) e.preventDefault();

    if (!$parent.length) {
      $parent = $this.hasClass("alert") ? $this : $this.parent();
    }

    $parent.trigger((e = $.Event("close.bs.alert")));

    if (e.isDefaultPrevented()) return;

    $parent.removeClass("in");

    function removeElement() {
      $parent.trigger("closed.bs.alert").remove();
    }

    $.support.transition && $parent.hasClass("fade")
      ? $parent
          .one($.support.transition.end, removeElement)
          .emulateTransitionEnd(150)
      : removeElement();
  };

  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert;

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.alert");

      if (!data) $this.data("bs.alert", (data = new Alert(this)));
      if (typeof option == "string") data[option].call($this);
    });
  };

  $.fn.alert.Constructor = Alert;

  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };

  // ALERT DATA-API
  // ==============

  $(document).on("click.bs.alert.data-api", dismiss, Alert.prototype.close);
})(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.1.1
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Button.DEFAULTS, options);
    this.isLoading = false;
  };

  Button.DEFAULTS = {
    loadingText: "loading..."
  };

  Button.prototype.setState = function (state) {
    var d = "disabled";
    var $el = this.$element;
    var val = $el.is("input") ? "val" : "html";
    var data = $el.data();

    state = state + "Text";

    if (!data.resetText) $el.data("resetText", $el[val]());

    $el[val](data[state] || this.options[state]);

    // push to event loop to allow forms to submit
    setTimeout(
      $.proxy(function () {
        if (state == "loadingText") {
          this.isLoading = true;
          $el.addClass(d).attr(d, d);
        } else if (this.isLoading) {
          this.isLoading = false;
          $el.removeClass(d).removeAttr(d);
        }
      }, this),
      0
    );
  };

  Button.prototype.toggle = function () {
    var changed = true;
    var $parent = this.$element.closest('[data-toggle="buttons"]');

    if ($parent.length) {
      var $input = this.$element.find("input");
      if ($input.prop("type") == "radio") {
        if ($input.prop("checked") && this.$element.hasClass("active"))
          changed = false;
        else $parent.find(".active").removeClass("active");
      }
      if (changed)
        $input
          .prop("checked", !this.$element.hasClass("active"))
          .trigger("change");
    }

    if (changed) this.$element.toggleClass("active");
  };

  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button;

  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.button");
      var options = typeof option == "object" && option;

      if (!data) $this.data("bs.button", (data = new Button(this, options)));

      if (option == "toggle") data.toggle();
      else if (option) data.setState(option);
    });
  };

  $.fn.button.Constructor = Button;

  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };

  // BUTTON DATA-API
  // ===============

  $(document).on(
    "click.bs.button.data-api",
    "[data-toggle^=button]",
    function (e) {
      var $btn = $(e.target);
      if (!$btn.hasClass("btn")) $btn = $btn.closest(".btn");
      $btn.button("toggle");
      e.preventDefault();
    }
  );
})(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.1.1
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find(".carousel-indicators");
    this.options = options;
    this.paused = this.sliding = this.interval = this.$active = this.$items = null;

    this.options.pause == "hover" &&
      this.$element
        .on("mouseenter", $.proxy(this.pause, this))
        .on("mouseleave", $.proxy(this.cycle, this));
  };

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: "hover",
    wrap: true
  };

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false);

    this.interval && clearInterval(this.interval);

    this.options.interval &&
      !this.paused &&
      (this.interval = setInterval(
        $.proxy(this.next, this),
        this.options.interval
      ));

    return this;
  };

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find(".item.active");
    this.$items = this.$active.parent().children();

    return this.$items.index(this.$active);
  };

  Carousel.prototype.to = function (pos) {
    var that = this;
    var activeIndex = this.getActiveIndex();

    if (pos > this.$items.length - 1 || pos < 0) return;

    if (this.sliding)
      return this.$element.one("slid.bs.carousel", function () {
        that.to(pos);
      });
    if (activeIndex == pos) return this.pause().cycle();

    return this.slide(pos > activeIndex ? "next" : "prev", $(this.$items[pos]));
  };

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true);

    if (this.$element.find(".next, .prev").length && $.support.transition) {
      this.$element.trigger($.support.transition.end);
      this.cycle(true);
    }

    this.interval = clearInterval(this.interval);

    return this;
  };

  Carousel.prototype.next = function () {
    if (this.sliding) return;
    return this.slide("next");
  };

  Carousel.prototype.prev = function () {
    if (this.sliding) return;
    return this.slide("prev");
  };

  Carousel.prototype.slide = function (type, next) {
    var $active = this.$element.find(".item.active");
    var $next = next || $active[type]();
    var isCycling = this.interval;
    var direction = type == "next" ? "left" : "right";
    var fallback = type == "next" ? "first" : "last";
    var that = this;

    if (!$next.length) {
      if (!this.options.wrap) return;
      $next = this.$element.find(".item")[fallback]();
    }

    if ($next.hasClass("active")) return (this.sliding = false);

    var e = $.Event("slide.bs.carousel", {
      relatedTarget: $next[0],
      direction: direction
    });
    this.$element.trigger(e);
    if (e.isDefaultPrevented()) return;

    this.sliding = true;

    isCycling && this.pause();

    if (this.$indicators.length) {
      this.$indicators.find(".active").removeClass("active");
      this.$element.one("slid.bs.carousel", function () {
        var $nextIndicator = $(
          that.$indicators.children()[that.getActiveIndex()]
        );
        $nextIndicator && $nextIndicator.addClass("active");
      });
    }

    if ($.support.transition && this.$element.hasClass("slide")) {
      $next.addClass(type);
      $next[0].offsetWidth; // force reflow
      $active.addClass(direction);
      $next.addClass(direction);
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(" ")).addClass("active");
          $active.removeClass(["active", direction].join(" "));
          that.sliding = false;
          setTimeout(function () {
            that.$element.trigger("slid.bs.carousel");
          }, 0);
        })
        .emulateTransitionEnd(
          $active.css("transition-duration").slice(0, -1) * 1000
        );
    } else {
      $active.removeClass("active");
      $next.addClass("active");
      this.sliding = false;
      this.$element.trigger("slid.bs.carousel");
    }

    isCycling && this.cycle();

    return this;
  };

  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel;

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.carousel");
      var options = $.extend(
        {},
        Carousel.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );
      var action = typeof option == "string" ? option : options.slide;

      if (!data)
        $this.data("bs.carousel", (data = new Carousel(this, options)));
      if (typeof option == "number") data.to(option);
      else if (action) data[action]();
      else if (options.interval) data.pause().cycle();
    });
  };

  $.fn.carousel.Constructor = Carousel;

  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };

  // CAROUSEL DATA-API
  // =================

  $(document).on(
    "click.bs.carousel.data-api",
    "[data-slide], [data-slide-to]",
    function (e) {
      var $this = $(this),
        href;
      var $target = $(
        $this.attr("data-target") ||
          ((href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, ""))
      ); //strip for ie7
      var options = $.extend({}, $target.data(), $this.data());
      var slideIndex = $this.attr("data-slide-to");
      if (slideIndex) options.interval = false;

      $target.carousel(options);

      if ((slideIndex = $this.attr("data-slide-to"))) {
        $target.data("bs.carousel").to(slideIndex);
      }

      e.preventDefault();
    }
  );

  $(window).on("load", function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this);
      $carousel.carousel($carousel.data());
    });
  });
})(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.1.1
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Collapse.DEFAULTS, options);
    this.transitioning = null;

    if (this.options.parent) this.$parent = $(this.options.parent);
    if (this.options.toggle) this.toggle();
  };

  Collapse.DEFAULTS = {
    toggle: true
  };

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass("width");
    return hasWidth ? "width" : "height";
  };

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass("in")) return;

    var startEvent = $.Event("show.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var actives = this.$parent && this.$parent.find("> .panel > .in");

    if (actives && actives.length) {
      var hasData = actives.data("bs.collapse");
      if (hasData && hasData.transitioning) return;
      actives.collapse("hide");
      hasData || actives.data("bs.collapse", null);
    }

    var dimension = this.dimension();

    this.$element.removeClass("collapse").addClass("collapsing")[dimension](0);

    this.transitioning = 1;

    var complete = function () {
      this.$element
        .removeClass("collapsing")
        .addClass("collapse in")
        [dimension]("auto");
      this.transitioning = 0;
      this.$element.trigger("shown.bs.collapse");
    };

    if (!$.support.transition) return complete.call(this);

    var scrollSize = $.camelCase(["scroll", dimension].join("-"));

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize]);
  };

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass("in")) return;

    var startEvent = $.Event("hide.bs.collapse");
    this.$element.trigger(startEvent);
    if (startEvent.isDefaultPrevented()) return;

    var dimension = this.dimension();

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight;

    this.$element
      .addClass("collapsing")
      .removeClass("collapse")
      .removeClass("in");

    this.transitioning = 1;

    var complete = function () {
      this.transitioning = 0;
      this.$element
        .trigger("hidden.bs.collapse")
        .removeClass("collapsing")
        .addClass("collapse");
    };

    if (!$.support.transition) return complete.call(this);

    this.$element[dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350);
  };

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass("in") ? "hide" : "show"]();
  };

  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse;

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.collapse");
      var options = $.extend(
        {},
        Collapse.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );

      if (!data && options.toggle && option == "show") option = !option;
      if (!data)
        $this.data("bs.collapse", (data = new Collapse(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.collapse.Constructor = Collapse;

  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };

  // COLLAPSE DATA-API
  // =================

  $(document).on(
    "click.bs.collapse.data-api",
    "[data-toggle=collapse]",
    function (e) {
      var $this = $(this),
        href;
      var target =
        $this.attr("data-target") ||
        e.preventDefault() ||
        ((href = $this.attr("href")) && href.replace(/.*(?=#[^\s]+$)/, "")); //strip for ie7
      var $target = $(target);
      var data = $target.data("bs.collapse");
      var option = data ? "toggle" : $this.data();
      var parent = $this.attr("data-parent");
      var $parent = parent && $(parent);

      if (!data || !data.transitioning) {
        if ($parent)
          $parent
            .find('[data-toggle=collapse][data-parent="' + parent + '"]')
            .not($this)
            .addClass("collapsed");
        $this[$target.hasClass("in") ? "addClass" : "removeClass"]("collapsed");
      }

      $target.collapse(option);
    }
  );
})(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.1.1
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = ".dropdown-backdrop";
  var toggle = "[data-toggle=dropdown]";
  var Dropdown = function (element) {
    $(element).on("click.bs.dropdown", this.toggle);
  };

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this);

    if ($this.is(".disabled, :disabled")) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");

    clearMenus();

    if (!isActive) {
      if (
        "ontouchstart" in document.documentElement &&
        !$parent.closest(".navbar-nav").length
      ) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>')
          .insertAfter($(this))
          .on("click", clearMenus);
      }

      var relatedTarget = {
        relatedTarget: this
      };
      $parent.trigger((e = $.Event("show.bs.dropdown", relatedTarget)));

      if (e.isDefaultPrevented()) return;

      $parent.toggleClass("open").trigger("shown.bs.dropdown", relatedTarget);

      $this.focus();
    }

    return false;
  };

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return;

    var $this = $(this);

    e.preventDefault();
    e.stopPropagation();

    if ($this.is(".disabled, :disabled")) return;

    var $parent = getParent($this);
    var isActive = $parent.hasClass("open");

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus();
      return $this.click();
    }

    var desc = " li:not(.divider):visible a";
    var $items = $parent.find("[role=menu]" + desc + ", [role=listbox]" + desc);

    if (!$items.length) return;

    var index = $items.index($items.filter(":focus"));

    if (e.keyCode == 38 && index > 0) index--; // up
    if (e.keyCode == 40 && index < $items.length - 1) index++; // down
    if (!~index) index = 0;

    $items.eq(index).focus();
  };

  function clearMenus(e) {
    $(backdrop).remove();
    $(toggle).each(function () {
      var $parent = getParent($(this));
      var relatedTarget = {
        relatedTarget: this
      };
      if (!$parent.hasClass("open")) return;
      $parent.trigger((e = $.Event("hide.bs.dropdown", relatedTarget)));
      if (e.isDefaultPrevented()) return;
      $parent.removeClass("open").trigger("hidden.bs.dropdown", relatedTarget);
    });
  }

  function getParent($this) {
    var selector = $this.attr("data-target");

    if (!selector) {
      selector = $this.attr("href");
      selector =
        selector &&
        /#[A-Za-z]/.test(selector) &&
        selector.replace(/.*(?=#[^\s]*$)/, ""); //strip for ie7
    }

    var $parent = selector && $(selector);

    return $parent && $parent.length ? $parent : $this.parent();
  }

  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown;

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.dropdown");

      if (!data) $this.data("bs.dropdown", (data = new Dropdown(this)));
      if (typeof option == "string") data[option].call($this);
    });
  };

  $.fn.dropdown.Constructor = Dropdown;

  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };

  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on("click.bs.dropdown.data-api", clearMenus)
    .on("click.bs.dropdown.data-api", ".dropdown form", function (e) {
      e.stopPropagation();
    })
    .on("click.bs.dropdown.data-api", toggle, Dropdown.prototype.toggle)
    .on(
      "keydown.bs.dropdown.data-api",
      toggle + ", [role=menu], [role=listbox]",
      Dropdown.prototype.keydown
    );
})(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.1.1
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options;
    this.$element = $(element);
    this.$backdrop = this.isShown = null;

    if (this.options.remote) {
      this.$element.find(".modal-content").load(
        this.options.remote,
        $.proxy(function () {
          this.$element.trigger("loaded.bs.modal");
        }, this)
      );
    }
  };

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  };

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? "show" : "hide"](_relatedTarget);
  };

  Modal.prototype.show = function (_relatedTarget) {
    var that = this;
    var e = $.Event("show.bs.modal", {
      relatedTarget: _relatedTarget
    });

    this.$element.trigger(e);

    if (this.isShown || e.isDefaultPrevented()) return;

    this.isShown = true;

    this.escape();

    this.$element.on(
      "click.dismiss.bs.modal",
      '[data-dismiss="modal"]',
      $.proxy(this.hide, this)
    );

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass("fade");

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body); // don't move modals dom position
      }

      that.$element.show().scrollTop(0);

      if (transition) {
        that.$element[0].offsetWidth; // force reflow
      }

      that.$element.addClass("in").attr("aria-hidden", false);

      that.enforceFocus();

      var e = $.Event("shown.bs.modal", {
        relatedTarget: _relatedTarget
      });

      transition
        ? that.$element
            .find(".modal-dialog") // wait for modal to slide in
            .one($.support.transition.end, function () {
              that.$element.focus().trigger(e);
            })
            .emulateTransitionEnd(300)
        : that.$element.focus().trigger(e);
    });
  };

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault();

    e = $.Event("hide.bs.modal");

    this.$element.trigger(e);

    if (!this.isShown || e.isDefaultPrevented()) return;

    this.isShown = false;

    this.escape();

    $(document).off("focusin.bs.modal");

    this.$element
      .removeClass("in")
      .attr("aria-hidden", true)
      .off("click.dismiss.bs.modal");

    $.support.transition && this.$element.hasClass("fade")
      ? this.$element
          .one($.support.transition.end, $.proxy(this.hideModal, this))
          .emulateTransitionEnd(300)
      : this.hideModal();
  };

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off("focusin.bs.modal") // guard against infinite focus loop
      .on(
        "focusin.bs.modal",
        $.proxy(function (e) {
          if (
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length
          ) {
            this.$element.focus();
          }
        }, this)
      );
  };

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on(
        "keyup.dismiss.bs.modal",
        $.proxy(function (e) {
          e.which == 27 && this.hide();
        }, this)
      );
    } else if (!this.isShown) {
      this.$element.off("keyup.dismiss.bs.modal");
    }
  };

  Modal.prototype.hideModal = function () {
    var that = this;
    this.$element.hide();
    this.backdrop(function () {
      that.removeBackdrop();
      that.$element.trigger("hidden.bs.modal");
    });
  };

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove();
    this.$backdrop = null;
  };

  Modal.prototype.backdrop = function (callback) {
    var animate = this.$element.hasClass("fade") ? "fade" : "";

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate;

      this.$backdrop = $(
        '<div class="modal-backdrop ' + animate + '" />'
      ).appendTo(document.body);

      this.$element.on(
        "click.dismiss.bs.modal",
        $.proxy(function (e) {
          if (e.target !== e.currentTarget) return;
          this.options.backdrop == "static"
            ? this.$element[0].focus.call(this.$element[0])
            : this.hide.call(this);
        }, this)
      );

      if (doAnimate) this.$backdrop[0].offsetWidth; // force reflow

      this.$backdrop.addClass("in");

      if (!callback) return;

      doAnimate
        ? this.$backdrop
            .one($.support.transition.end, callback)
            .emulateTransitionEnd(150)
        : callback();
    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass("in");

      $.support.transition && this.$element.hasClass("fade")
        ? this.$backdrop
            .one($.support.transition.end, callback)
            .emulateTransitionEnd(150)
        : callback();
    } else if (callback) {
      callback();
    }
  };

  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal;

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.modal");
      var options = $.extend(
        {},
        Modal.DEFAULTS,
        $this.data(),
        typeof option == "object" && option
      );

      if (!data) $this.data("bs.modal", (data = new Modal(this, options)));
      if (typeof option == "string") data[option](_relatedTarget);
      else if (options.show) data.show(_relatedTarget);
    });
  };

  $.fn.modal.Constructor = Modal;

  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };

  // MODAL DATA-API
  // ==============

  $(document).on(
    "click.bs.modal.data-api",
    '[data-toggle="modal"]',
    function (e) {
      var $this = $(this);
      var href = $this.attr("href");
      var $target = $(
        $this.attr("data-target") ||
          (href && href.replace(/.*(?=#[^\s]+$)/, ""))
      ); //strip for ie7
      var option = $target.data("bs.modal")
        ? "toggle"
        : $.extend(
            {
              remote: !/#/.test(href) && href
            },
            $target.data(),
            $this.data()
          );

      if ($this.is("a")) e.preventDefault();

      $target.modal(option, this).one("hide", function () {
        $this.is(":visible") && $this.focus();
      });
    }
  );

  $(document)
    .on("show.bs.modal", ".modal", function () {
      $(document.body).addClass("modal-open");
    })
    .on("hidden.bs.modal", ".modal", function () {
      $(document.body).removeClass("modal-open");
    });
})(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.1.1
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null;

    this.init("tooltip", element, options);
  };

  Tooltip.DEFAULTS = {
    animation: true,
    placement: "top",
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: false,
    container: false
  };

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled = true;
    this.type = type;
    this.$element = $(element);
    this.options = this.getOptions(options);

    var triggers = this.options.trigger.split(" ");

    for (var i = triggers.length; i--; ) {
      var trigger = triggers[i];

      if (trigger == "click") {
        this.$element.on(
          "click." + this.type,
          this.options.selector,
          $.proxy(this.toggle, this)
        );
      } else if (trigger != "manual") {
        var eventIn = trigger == "hover" ? "mouseenter" : "focusin";
        var eventOut = trigger == "hover" ? "mouseleave" : "focusout";

        this.$element.on(
          eventIn + "." + this.type,
          this.options.selector,
          $.proxy(this.enter, this)
        );
        this.$element.on(
          eventOut + "." + this.type,
          this.options.selector,
          $.proxy(this.leave, this)
        );
      }
    }

    this.options.selector
      ? (this._options = $.extend({}, this.options, {
          trigger: "manual",
          selector: ""
        }))
      : this.fixTitle();
  };

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS;
  };

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options);

    if (options.delay && typeof options.delay == "number") {
      options.delay = {
        show: options.delay,
        hide: options.delay
      };
    }

    return options;
  };

  Tooltip.prototype.getDelegateOptions = function () {
    var options = {};
    var defaults = this.getDefaults();

    this._options &&
      $.each(this._options, function (key, value) {
        if (defaults[key] != value) options[key] = value;
      });

    return options;
  };

  Tooltip.prototype.enter = function (obj) {
    var self =
      obj instanceof this.constructor
        ? obj
        : $(obj.currentTarget)
            [this.type](this.getDelegateOptions())
            .data("bs." + this.type);

    clearTimeout(self.timeout);

    self.hoverState = "in";

    if (!self.options.delay || !self.options.delay.show) return self.show();

    self.timeout = setTimeout(function () {
      if (self.hoverState == "in") self.show();
    }, self.options.delay.show);
  };

  Tooltip.prototype.leave = function (obj) {
    var self =
      obj instanceof this.constructor
        ? obj
        : $(obj.currentTarget)
            [this.type](this.getDelegateOptions())
            .data("bs." + this.type);

    clearTimeout(self.timeout);

    self.hoverState = "out";

    if (!self.options.delay || !self.options.delay.hide) return self.hide();

    self.timeout = setTimeout(function () {
      if (self.hoverState == "out") self.hide();
    }, self.options.delay.hide);
  };

  Tooltip.prototype.show = function () {
    var e = $.Event("show.bs." + this.type);

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e);

      if (e.isDefaultPrevented()) return;
      var that = this;

      var $tip = this.tip();

      this.setContent();

      if (this.options.animation) $tip.addClass("fade");

      var placement =
        typeof this.options.placement == "function"
          ? this.options.placement.call(this, $tip[0], this.$element[0])
          : this.options.placement;

      var autoToken = /\s?auto?\s?/i;
      var autoPlace = autoToken.test(placement);
      if (autoPlace) placement = placement.replace(autoToken, "") || "top";

      $tip
        .detach()
        .css({
          top: 0,
          left: 0,
          display: "block"
        })
        .addClass(placement);

      this.options.container
        ? $tip.appendTo(this.options.container)
        : $tip.insertAfter(this.$element);

      var pos = this.getPosition();
      var actualWidth = $tip[0].offsetWidth;
      var actualHeight = $tip[0].offsetHeight;

      if (autoPlace) {
        var $parent = this.$element.parent();

        var orgPlacement = placement;
        var docScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        var parentWidth =
          this.options.container == "body"
            ? window.innerWidth
            : $parent.outerWidth();
        var parentHeight =
          this.options.container == "body"
            ? window.innerHeight
            : $parent.outerHeight();
        var parentLeft =
          this.options.container == "body" ? 0 : $parent.offset().left;

        placement =
          placement == "bottom" &&
          pos.top + pos.height + actualHeight - docScroll > parentHeight
            ? "top"
            : placement == "top" && pos.top - docScroll - actualHeight < 0
            ? "bottom"
            : placement == "right" && pos.right + actualWidth > parentWidth
            ? "left"
            : placement == "left" && pos.left - actualWidth < parentLeft
            ? "right"
            : placement;

        $tip.removeClass(orgPlacement).addClass(placement);
      }

      var calculatedOffset = this.getCalculatedOffset(
        placement,
        pos,
        actualWidth,
        actualHeight
      );

      this.applyPlacement(calculatedOffset, placement);
      this.hoverState = null;

      var complete = function () {
        that.$element.trigger("shown.bs." + that.type);
      };

      $.support.transition && this.$tip.hasClass("fade")
        ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150)
        : complete();
    }
  };

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var replace;
    var $tip = this.tip();
    var width = $tip[0].offsetWidth;
    var height = $tip[0].offsetHeight;

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css("margin-top"), 10);
    var marginLeft = parseInt($tip.css("margin-left"), 10);

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop)) marginTop = 0;
    if (isNaN(marginLeft)) marginLeft = 0;

    offset.top = offset.top + marginTop;
    offset.left = offset.left + marginLeft;

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset(
      $tip[0],
      $.extend(
        {
          using: function (props) {
            $tip.css({
              top: Math.round(props.top),
              left: Math.round(props.left)
            });
          }
        },
        offset
      ),
      0
    );

    $tip.addClass("in");

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth = $tip[0].offsetWidth;
    var actualHeight = $tip[0].offsetHeight;

    if (placement == "top" && actualHeight != height) {
      replace = true;
      offset.top = offset.top + height - actualHeight;
    }

    if (/bottom|top/.test(placement)) {
      var delta = 0;

      if (offset.left < 0) {
        delta = offset.left * -2;
        offset.left = 0;

        $tip.offset(offset);

        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight;
      }

      this.replaceArrow(delta - width + actualWidth, actualWidth, "left");
    } else {
      this.replaceArrow(actualHeight - height, actualHeight, "top");
    }

    if (replace) $tip.offset(offset);
  };

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + "%" : "");
  };

  Tooltip.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();

    $tip.find(".tooltip-inner")[this.options.html ? "html" : "text"](title);
    $tip.removeClass("fade in top bottom left right");
  };

  Tooltip.prototype.hide = function () {
    var that = this;
    var $tip = this.tip();
    var e = $.Event("hide.bs." + this.type);

    function complete() {
      if (that.hoverState != "in") $tip.detach();
      that.$element.trigger("hidden.bs." + that.type);
    }

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    $tip.removeClass("in");

    $.support.transition && this.$tip.hasClass("fade")
      ? $tip.one($.support.transition.end, complete).emulateTransitionEnd(150)
      : complete();

    this.hoverState = null;

    return this;
  };

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element;
    if ($e.attr("title") || typeof $e.attr("data-original-title") != "string") {
      $e.attr("data-original-title", $e.attr("title") || "").attr("title", "");
    }
  };

  Tooltip.prototype.hasContent = function () {
    return this.getTitle();
  };

  Tooltip.prototype.getPosition = function () {
    var el = this.$element[0];
    return $.extend(
      {},
      typeof el.getBoundingClientRect == "function"
        ? el.getBoundingClientRect()
        : {
            width: el.offsetWidth,
            height: el.offsetHeight
          },
      this.$element.offset()
    );
  };

  Tooltip.prototype.getCalculatedOffset = function (
    placement,
    pos,
    actualWidth,
    actualHeight
  ) {
    return placement == "bottom"
      ? {
          top: pos.top + pos.height,
          left: pos.left + pos.width / 2 - actualWidth / 2
        }
      : placement == "top"
      ? {
          top: pos.top - actualHeight,
          left: pos.left + pos.width / 2 - actualWidth / 2
        }
      : placement == "left"
      ? {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left - actualWidth
        }
      : /* placement == 'right' */
        {
          top: pos.top + pos.height / 2 - actualHeight / 2,
          left: pos.left + pos.width
        };
  };

  Tooltip.prototype.getTitle = function () {
    var title;
    var $e = this.$element;
    var o = this.options;

    title =
      $e.attr("data-original-title") ||
      (typeof o.title == "function" ? o.title.call($e[0]) : o.title);

    return title;
  };

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template));
  };

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow"));
  };

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide();
      this.$element = null;
      this.options = null;
    }
  };

  Tooltip.prototype.enable = function () {
    this.enabled = true;
  };

  Tooltip.prototype.disable = function () {
    this.enabled = false;
  };

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled;
  };

  Tooltip.prototype.toggle = function (e) {
    var self = e
      ? $(e.currentTarget)
          [this.type](this.getDelegateOptions())
          .data("bs." + this.type)
      : this;
    self.tip().hasClass("in") ? self.leave(self) : self.enter(self);
  };

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout);
    this.hide()
      .$element.off("." + this.type)
      .removeData("bs." + this.type);
  };

  // TOOLTIP PLUGIN DEFINITION
  // =========================

  var old = $.fn.tooltip;

  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tooltip");
      var options = typeof option == "object" && option;

      if (!data && option == "destroy") return;
      if (!data) $this.data("bs.tooltip", (data = new Tooltip(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.tooltip.Constructor = Tooltip;

  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
})(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.1.1
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init("popover", element, options);
  };

  if (!$.fn.tooltip) throw new Error("Popover requires tooltip.js");

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template:
      '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });

  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype);

  Popover.prototype.constructor = Popover;

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS;
  };

  Popover.prototype.setContent = function () {
    var $tip = this.tip();
    var title = this.getTitle();
    var content = this.getContent();

    $tip.find(".popover-title")[this.options.html ? "html" : "text"](title);
    $tip
      .find(".popover-content") // we use append for html objects to maintain js events
      [
        this.options.html
          ? typeof content == "string"
            ? "html"
            : "append"
          : "text"
      ](content);

    $tip.removeClass("fade top bottom left right in");

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find(".popover-title").html()) $tip.find(".popover-title").hide();
  };

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent();
  };

  Popover.prototype.getContent = function () {
    var $e = this.$element;
    var o = this.options;

    return (
      $e.attr("data-content") ||
      (typeof o.content == "function" ? o.content.call($e[0]) : o.content)
    );
  };

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find(".arrow"));
  };

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template);
    return this.$tip;
  };

  // POPOVER PLUGIN DEFINITION
  // =========================

  var old = $.fn.popover;

  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.popover");
      var options = typeof option == "object" && option;

      if (!data && option == "destroy") return;
      if (!data) $this.data("bs.popover", (data = new Popover(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.popover.Constructor = Popover;

  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
})(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.1.1
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var href;
    var process = $.proxy(this.process, this);

    this.$element = $(element).is("body") ? $(window) : $(element);
    this.$body = $("body");
    this.$scrollElement = this.$element.on(
      "scroll.bs.scroll-spy.data-api",
      process
    );
    this.options = $.extend({}, ScrollSpy.DEFAULTS, options);
    this.selector =
      (this.options.target ||
        ((href = $(element).attr("href")) &&
          href.replace(/.*(?=#[^\s]+$)/, "")) || //strip for ie7
        "") + " .nav li > a";
    this.offsets = $([]);
    this.targets = $([]);
    this.activeTarget = null;

    this.refresh();
    this.process();
  }

  ScrollSpy.DEFAULTS = {
    offset: 10
  };

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = this.$element[0] == window ? "offset" : "position";

    this.offsets = $([]);
    this.targets = $([]);

    var self = this;
    var $targets = this.$body
      .find(this.selector)
      .map(function () {
        var $el = $(this);
        var href = $el.data("target") || $el.attr("href");
        var $href = /^#./.test(href) && $(href);

        return (
          ($href &&
            $href.length &&
            $href.is(":visible") && [
              [
                $href[offsetMethod]().top +
                  (!$.isWindow(self.$scrollElement.get(0)) &&
                    self.$scrollElement.scrollTop()),
                href
              ]
            ]) ||
          null
        );
      })
      .sort(function (a, b) {
        return a[0] - b[0];
      })
      .each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
  };

  ScrollSpy.prototype.process = function () {
    var scrollTop = this.$scrollElement.scrollTop() + this.options.offset;
    var scrollHeight =
      this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight;
    var maxScroll = scrollHeight - this.$scrollElement.height();
    var offsets = this.offsets;
    var targets = this.targets;
    var activeTarget = this.activeTarget;
    var i;

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets.last()[0]) && this.activate(i);
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i);
    }

    for (i = offsets.length; i--; ) {
      activeTarget != targets[i] &&
        scrollTop >= offsets[i] &&
        (!offsets[i + 1] || scrollTop <= offsets[i + 1]) &&
        this.activate(targets[i]);
    }
  };

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target;

    $(this.selector)
      .parentsUntil(this.options.target, ".active")
      .removeClass("active");

    var selector =
      this.selector +
      '[data-target="' +
      target +
      '"],' +
      this.selector +
      '[href="' +
      target +
      '"]';

    var active = $(selector).parents("li").addClass("active");

    if (active.parent(".dropdown-menu").length) {
      active = active.closest("li.dropdown").addClass("active");
    }

    active.trigger("activate.bs.scrollspy");
  };

  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  var old = $.fn.scrollspy;

  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.scrollspy");
      var options = typeof option == "object" && option;

      if (!data)
        $this.data("bs.scrollspy", (data = new ScrollSpy(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.scrollspy.Constructor = ScrollSpy;

  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };

  // SCROLLSPY DATA-API
  // ==================

  $(window).on("load", function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      $spy.scrollspy($spy.data());
    });
  });
})(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.1.1
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element);
  };

  Tab.prototype.show = function () {
    var $this = this.element;
    var $ul = $this.closest("ul:not(.dropdown-menu)");
    var selector = $this.data("target");

    if (!selector) {
      selector = $this.attr("href");
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ""); //strip for ie7
    }

    if ($this.parent("li").hasClass("active")) return;

    var previous = $ul.find(".active:last a")[0];
    var e = $.Event("show.bs.tab", {
      relatedTarget: previous
    });

    $this.trigger(e);

    if (e.isDefaultPrevented()) return;

    var $target = $(selector);

    this.activate($this.parent("li"), $ul);
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: "shown.bs.tab",
        relatedTarget: previous
      });
    });
  };

  Tab.prototype.activate = function (element, container, callback) {
    var $active = container.find("> .active");
    var transition =
      callback && $.support.transition && $active.hasClass("fade");

    function next() {
      $active
        .removeClass("active")
        .find("> .dropdown-menu > .active")
        .removeClass("active");

      element.addClass("active");

      if (transition) {
        element[0].offsetWidth; // reflow for transition
        element.addClass("in");
      } else {
        element.removeClass("fade");
      }

      if (element.parent(".dropdown-menu")) {
        element.closest("li.dropdown").addClass("active");
      }

      callback && callback();
    }

    transition
      ? $active.one($.support.transition.end, next).emulateTransitionEnd(150)
      : next();

    $active.removeClass("in");
  };

  // TAB PLUGIN DEFINITION
  // =====================

  var old = $.fn.tab;

  $.fn.tab = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.tab");

      if (!data) $this.data("bs.tab", (data = new Tab(this)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.tab.Constructor = Tab;

  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };

  // TAB DATA-API
  // ============

  $(document).on(
    "click.bs.tab.data-api",
    '[data-toggle="tab"], [data-toggle="pill"]',
    function (e) {
      e.preventDefault();
      $(this).tab("show");
    }
  );
})(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.1.1
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

+(function ($) {
  "use strict";

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options);
    this.$window = $(window)
      .on("scroll.bs.affix.data-api", $.proxy(this.checkPosition, this))
      .on(
        "click.bs.affix.data-api",
        $.proxy(this.checkPositionWithEventLoop, this)
      );

    this.$element = $(element);
    this.affixed = this.unpin = this.pinnedOffset = null;

    this.checkPosition();
  };

  Affix.RESET = "affix affix-top affix-bottom";

  Affix.DEFAULTS = {
    offset: 0
  };

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset;
    this.$element.removeClass(Affix.RESET).addClass("affix");
    var scrollTop = this.$window.scrollTop();
    var position = this.$element.offset();
    return (this.pinnedOffset = position.top - scrollTop);
  };

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1);
  };

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(":visible")) return;

    var scrollHeight = $(document).height();
    var scrollTop = this.$window.scrollTop();
    var position = this.$element.offset();
    var offset = this.options.offset;
    var offsetTop = offset.top;
    var offsetBottom = offset.bottom;

    if (this.affixed == "top") position.top += scrollTop;

    if (typeof offset != "object") offsetBottom = offsetTop = offset;
    if (typeof offsetTop == "function") offsetTop = offset.top(this.$element);
    if (typeof offsetBottom == "function")
      offsetBottom = offset.bottom(this.$element);

    var affix =
      this.unpin != null && scrollTop + this.unpin <= position.top
        ? false
        : offsetBottom != null &&
          position.top + this.$element.height() >= scrollHeight - offsetBottom
        ? "bottom"
        : offsetTop != null && scrollTop <= offsetTop
        ? "top"
        : false;

    if (this.affixed === affix) return;
    if (this.unpin) this.$element.css("top", "");

    var affixType = "affix" + (affix ? "-" + affix : "");
    var e = $.Event(affixType + ".bs.affix");

    this.$element.trigger(e);

    if (e.isDefaultPrevented()) return;

    this.affixed = affix;
    this.unpin = affix == "bottom" ? this.getPinnedOffset() : null;

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace("affix", "affixed")));

    if (affix == "bottom") {
      this.$element.offset({
        top: scrollHeight - offsetBottom - this.$element.height()
      });
    }
  };

  // AFFIX PLUGIN DEFINITION
  // =======================

  var old = $.fn.affix;

  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("bs.affix");
      var options = typeof option == "object" && option;

      if (!data) $this.data("bs.affix", (data = new Affix(this, options)));
      if (typeof option == "string") data[option]();
    });
  };

  $.fn.affix.Constructor = Affix;

  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };

  // AFFIX DATA-API
  // ==============

  $(window).on("load", function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this);
      var data = $spy.data();

      data.offset = data.offset || {};

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom;
      if (data.offsetTop) data.offset.top = data.offsetTop;

      $spy.affix(data);
    });
  });
})(jQuery);

/* =============================================================
 * bootstrap3-typeahead.js v3.0.3
 * https://github.com/bassjobsen/Bootstrap-3-Typeahead
 * =============================================================
 * Original written by @mdo and @fat
 * =============================================================
 * Copyright 2014 Bass Jobsen @bassjobsen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */

!(function ($) {
  "use strict";
  // jshint laxcomma: true

  /* TYPEAHEAD PUBLIC CLASS DEFINITION
   * ================================= */

  var Typeahead = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.typeahead.defaults, options);
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.select = this.options.select || this.select;
    this.autoSelect =
      typeof this.options.autoSelect == "boolean"
        ? this.options.autoSelect
        : true;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.updater = this.options.updater || this.updater;
    this.source = this.options.source;
    this.delay =
      typeof this.options.delay == "number" ? this.options.delay : 250;
    this.$menu = $(this.options.menu);
    this.shown = false;
    this.listen();
    this.showHintOnFocus =
      typeof this.options.showHintOnFocus == "boolean"
        ? this.options.showHintOnFocus
        : false;
  };

  Typeahead.prototype = {
    constructor: Typeahead,

    select: function () {
      var val = this.$menu.find(".active").data("value");
      if (this.autoSelect || val) {
        this.$element.val(this.updater(val)).change();
      }
      return this.hide();
    },

    updater: function (item) {
      return item;
    },

    setSource: function (source) {
      this.source = source;
    },

    show: function () {
      var pos = $.extend({}, this.$element.position(), {
          height: this.$element[0].offsetHeight
        }),
        scrollHeight;

      scrollHeight =
        typeof this.options.scrollHeight == "function"
          ? this.options.scrollHeight.call()
          : this.options.scrollHeight;

      this.$menu
        .insertAfter(this.$element)
        .css({
          top: pos.top + pos.height + scrollHeight,
          left: pos.left
        })
        .show();

      this.shown = true;
      return this;
    },

    hide: function () {
      this.$menu.hide();
      this.shown = false;
      return this;
    },

    lookup: function (query) {
      var items;
      if (typeof query != "undefined" && query !== null) {
        this.query = query;
      } else {
        this.query = this.$element.val() || "";
      }

      if (this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this;
      }

      var worker = $.proxy(function () {
        items = $.isFunction(this.source)
          ? this.source(this.query, $.proxy(this.process, this))
          : this.source;
        if (items) {
          this.process(items);
        }
      }, this);

      clearTimeout(this.lookupWorker);
      this.lookupWorker = setTimeout(worker, this.delay);
    },

    process: function (items) {
      var that = this;

      items = $.grep(items, function (item) {
        return that.matcher(item);
      });

      items = this.sorter(items);

      if (!items.length) {
        return this.shown ? this.hide() : this;
      }

      if (this.options.items == "all") {
        return this.render(items).show();
      } else {
        return this.render(items.slice(0, this.options.items)).show();
      }
    },

    matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase());
    },

    sorter: function (items) {
      var beginswith = [],
        caseSensitive = [],
        caseInsensitive = [],
        item;

      while ((item = items.shift())) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase()))
          beginswith.push(item);
        else if (~item.indexOf(this.query)) caseSensitive.push(item);
        else caseInsensitive.push(item);
      }

      return beginswith.concat(caseSensitive, caseInsensitive);
    },

    highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
      return item.replace(
        new RegExp("(" + query + ")", "ig"),
        function ($1, match) {
          return "<strong>" + match + "</strong>";
        }
      );
    },

    render: function (items) {
      var that = this;

      items = $(items).map(function (i, item) {
        i = $(that.options.item).data("value", item);
        i.find("a").html(that.highlighter(item));
        return i[0];
      });

      if (this.autoSelect) {
        items.first().addClass("active");
      }
      this.$menu.html(items);
      return this;
    },

    next: function (event) {
      var active = this.$menu.find(".active").removeClass("active"),
        next = active.next();

      if (!next.length) {
        next = $(this.$menu.find("li")[0]);
      }

      next.addClass("active");
    },

    prev: function (event) {
      var active = this.$menu.find(".active").removeClass("active"),
        prev = active.prev();

      if (!prev.length) {
        prev = this.$menu.find("li").last();
      }

      prev.addClass("active");
    },

    listen: function () {
      this.$element
        .on("focus", $.proxy(this.focus, this))
        .on("blur", $.proxy(this.blur, this))
        .on("keypress", $.proxy(this.keypress, this))
        .on("keyup", $.proxy(this.keyup, this));

      if (this.eventSupported("keydown")) {
        this.$element.on("keydown", $.proxy(this.keydown, this));
      }

      this.$menu
        .on("click", $.proxy(this.click, this))
        .on("mouseenter", "li", $.proxy(this.mouseenter, this))
        .on("mouseleave", "li", $.proxy(this.mouseleave, this));
    },
    destroy: function () {
      this.$element.data("typeahead", null);
      this.$element.off("focus").off("blur").off("keypress").off("keyup");

      if (this.eventSupported("keydown")) {
        this.$element.off("keydown");
      }

      this.$menu.remove();
    },
    eventSupported: function (eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, "return;");
        isSupported = typeof this.$element[eventName] === "function";
      }
      return isSupported;
    },

    move: function (e) {
      if (!this.shown) return;

      switch (e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault();
          break;

        case 38: // up arrow
          e.preventDefault();
          this.prev();
          break;

        case 40: // down arrow
          e.preventDefault();
          this.next();
          break;
      }

      e.stopPropagation();
    },

    keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [40, 38, 9, 13, 27]);
      if (!this.shown && e.keyCode == 40) {
        this.lookup("");
      } else {
        this.move(e);
      }
    },

    keypress: function (e) {
      if (this.suppressKeyPressRepeat) return;
      this.move(e);
    },

    keyup: function (e) {
      switch (e.keyCode) {
        case 40: // down arrow
        case 38: // up arrow
        case 16: // shift
        case 17: // ctrl
        case 18: // alt
          break;

        case 9: // tab
        case 13: // enter
          if (!this.shown) return;
          this.select();
          break;

        case 27: // escape
          if (!this.shown) return;
          this.hide();
          break;
        default:
          this.lookup();
      }

      e.stopPropagation();
      e.preventDefault();
    },

    focus: function (e) {
      if (!this.focused) {
        this.focused = true;
        if (
          (this.options.minLength === 0 && !this.$element.val()) ||
          this.options.showHintOnFocus
        ) {
          this.lookup();
        }
      }
    },

    blur: function (e) {
      this.focused = false;
      if (!this.mousedover && this.shown) this.hide();
    },

    click: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.select();
      this.$element.focus();
    },

    mouseenter: function (e) {
      this.mousedover = true;
      this.$menu.find(".active").removeClass("active");
      $(e.currentTarget).addClass("active");
    },

    mouseleave: function (e) {
      this.mousedover = false;
      if (!this.focused && this.shown) this.hide();
    }
  };

  /* TYPEAHEAD PLUGIN DEFINITION
   * =========================== */

  var old = $.fn.typeahead;

  $.fn.typeahead = function (option) {
    var arg = arguments;
    return this.each(function () {
      var $this = $(this),
        data = $this.data("typeahead"),
        options = typeof option == "object" && option;
      if (!data) $this.data("typeahead", (data = new Typeahead(this, options)));
      if (typeof option == "string") {
        if (arg.length > 1) {
          data[option].apply(data, Array.prototype.slice.call(arg, 1));
        } else {
          data[option]();
        }
      }
    });
  };

  $.fn.typeahead.defaults = {
    source: [],
    items: 8,
    menu: '<ul class="typeahead dropdown-menu"></ul>',
    item: '<li><a href="#"></a></li>',
    minLength: 1,
    scrollHeight: 0,
    autoSelect: true
  };

  $.fn.typeahead.Constructor = Typeahead;

  /* TYPEAHEAD NO CONFLICT
   * =================== */

  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old;
    return this;
  };

  /* TYPEAHEAD DATA-API
   * ================== */

  $(document).on(
    "focus.typeahead.data-api",
    '[data-provide="typeahead"]',
    function (e) {
      var $this = $(this);
      if ($this.data("typeahead")) return;
      $this.typeahead($this.data());
    }
  );
})(window.jQuery);

!(function (e) {
  var t = (function () {
    return (
      !1 === e.support.boxModel &&
      e.support.objectAll &&
      e.support.leadingWhitespace
    );
  })();
  (e.jGrowl = function (t, i) {
    0 == e("#jGrowl").size() &&
      e('<div id="jGrowl"></div>')
        .addClass(i && i.position ? i.position : e.jGrowl.defaults.position)
        .appendTo("body"),
      e("#jGrowl").jGrowl(t, i);
  }),
    (e.fn.jGrowl = function (t, i) {
      if (e.isFunction(this.each)) {
        var o = arguments;
        return this.each(function () {
          void 0 == e(this).data("jGrowl.instance") &&
            (e(this).data(
              "jGrowl.instance",
              e.extend(new e.fn.jGrowl(), {
                notifications: [],
                element: null,
                interval: null
              })
            ),
            e(this).data("jGrowl.instance").startup(this)),
            e.isFunction(e(this).data("jGrowl.instance")[t])
              ? e(this)
                  .data("jGrowl.instance")
                  [t].apply(
                    e(this).data("jGrowl.instance"),
                    e.makeArray(o).slice(1)
                  )
              : e(this).data("jGrowl.instance").create(t, i);
        });
      }
    }),
    e.extend(e.fn.jGrowl.prototype, {
      defaults: {
        pool: 0,
        header: "",
        group: "",
        sticky: !1,
        position: "top-right",
        glue: "after",
        theme: "default",
        themeState: "highlight",
        corners: "10px",
        check: 250,
        life: 3e3,
        closeDuration: "normal",
        openDuration: "normal",
        easing: "swing",
        closer: !0,
        closeTemplate: "&times;",
        closerTemplate: "<div>[ close all ]</div>",
        log: function () {},
        beforeOpen: function () {},
        afterOpen: function () {},
        open: function () {},
        beforeClose: function () {},
        close: function () {},
        animateOpen: {
          opacity: "show"
        },
        animateClose: {
          opacity: "hide"
        }
      },
      notifications: [],
      element: null,
      interval: null,
      create: function (t, i) {
        var i = e.extend({}, this.defaults, i);
        "undefined" != typeof i.speed &&
          ((i.openDuration = i.speed), (i.closeDuration = i.speed)),
          this.notifications.push({
            message: t,
            options: i
          }),
          i.log.apply(this.element, [this.element, t, i]);
      },
      render: function (t) {
        var i = this,
          o = t.message,
          n = t.options;
        n.themeState = "" == n.themeState ? "" : "ui-state-" + n.themeState;
        var t = e("<div/>")
          .addClass(
            "jGrowl-notification " +
              n.themeState +
              " ui-corner-all" +
              (void 0 != n.group && "" != n.group ? " " + n.group : "")
          )
          .append(e("<div/>").addClass("jGrowl-close").html(n.closeTemplate))
          .append(e("<div/>").addClass("jGrowl-header").html(n.header))
          .append(e("<div/>").addClass("jGrowl-message").html(o))
          .data("jGrowl", n)
          .addClass(n.theme)
          .children("div.jGrowl-close")
          .bind("click.jGrowl", function () {
            e(this).parent().trigger("jGrowl.beforeClose");
          })
          .parent();
        e(t)
          .bind("mouseover.jGrowl", function () {
            e("div.jGrowl-notification", i.element).data("jGrowl.pause", !0);
          })
          .bind("mouseout.jGrowl", function () {
            e("div.jGrowl-notification", i.element).data("jGrowl.pause", !1);
          })
          .bind("jGrowl.beforeOpen", function () {
            n.beforeOpen.apply(t, [t, o, n, i.element]) !== !1 &&
              e(this).trigger("jGrowl.open");
          })
          .bind("jGrowl.open", function () {
            n.open.apply(t, [t, o, n, i.element]) !== !1 &&
              ("after" == n.glue
                ? e("div.jGrowl-notification:last", i.element).after(t)
                : e("div.jGrowl-notification:first", i.element).before(t),
              e(this).animate(
                n.animateOpen,
                n.openDuration,
                n.easing,
                function () {
                  e.support.opacity === !1 &&
                    this.style.removeAttribute("filter"),
                    null !== e(this).data("jGrowl") &&
                      (e(this).data("jGrowl").created = new Date()),
                    e(this).trigger("jGrowl.afterOpen");
                }
              ));
          })
          .bind("jGrowl.afterOpen", function () {
            n.afterOpen.apply(t, [t, o, n, i.element]);
          })
          .bind("jGrowl.beforeClose", function () {
            n.beforeClose.apply(t, [t, o, n, i.element]) !== !1 &&
              e(this).trigger("jGrowl.close");
          })
          .bind("jGrowl.close", function () {
            e(this).data("jGrowl.pause", !0),
              e(this).animate(
                n.animateClose,
                n.closeDuration,
                n.easing,
                function () {
                  e.isFunction(n.close)
                    ? n.close.apply(t, [t, o, n, i.element]) !== !1 &&
                      e(this).remove()
                    : e(this).remove();
                }
              );
          })
          .trigger("jGrowl.beforeOpen"),
          "" != n.corners && void 0 != e.fn.corner && e(t).corner(n.corners),
          e("div.jGrowl-notification:parent", i.element).size() > 1 &&
            0 == e("div.jGrowl-closer", i.element).size() &&
            this.defaults.closer !== !1 &&
            e(this.defaults.closerTemplate)
              .addClass(
                "jGrowl-closer " + this.defaults.themeState + " ui-corner-all"
              )
              .addClass(this.defaults.theme)
              .appendTo(i.element)
              .animate(
                this.defaults.animateOpen,
                this.defaults.speed,
                this.defaults.easing
              )
              .bind("click.jGrowl", function () {
                e(this).siblings().trigger("jGrowl.beforeClose"),
                  e.isFunction(i.defaults.closer) &&
                    i.defaults.closer.apply(e(this).parent()[0], [
                      e(this).parent()[0]
                    ]);
              });
      },
      update: function () {
        e(this.element)
          .find("div.jGrowl-notification:parent")
          .each(function () {
            void 0 != e(this).data("jGrowl") &&
              void 0 !== e(this).data("jGrowl").created &&
              e(this).data("jGrowl").created.getTime() +
                parseInt(e(this).data("jGrowl").life) <
                new Date().getTime() &&
              e(this).data("jGrowl").sticky !== !0 &&
              (void 0 == e(this).data("jGrowl.pause") ||
                e(this).data("jGrowl.pause") !== !0) &&
              e(this).trigger("jGrowl.beforeClose");
          }),
          this.notifications.length > 0 &&
            (0 == this.defaults.pool ||
              e(this.element).find("div.jGrowl-notification:parent").size() <
                this.defaults.pool) &&
            this.render(this.notifications.shift()),
          e(this.element).find("div.jGrowl-notification:parent").size() < 2 &&
            e(this.element)
              .find("div.jGrowl-closer")
              .animate(
                this.defaults.animateClose,
                this.defaults.speed,
                this.defaults.easing,
                function () {
                  e(this).remove();
                }
              );
      },
      startup: function (i) {
        (this.element = e(i)
          .addClass("jGrowl")
          .append('<div class="jGrowl-notification"></div>')),
          (this.interval = setInterval(function () {
            e(i).data("jGrowl.instance").update();
          }, parseInt(this.defaults.check))),
          t && e(this.element).addClass("ie6");
      },
      shutdown: function () {
        e(this.element)
          .removeClass("jGrowl")
          .find("div.jGrowl-notification")
          .trigger("jGrowl.close")
          .parent()
          .empty(),
          clearInterval(this.interval);
      },
      close: function () {
        e(this.element)
          .find("div.jGrowl-notification")
          .each(function () {
            e(this).trigger("jGrowl.beforeClose");
          });
      }
    }),
    (e.jGrowl.defaults = e.fn.jGrowl.prototype.defaults);
})(jQuery);
//
/*!
 * jQuery contextMenu - Plugin for simple contextMenu handling
 *
 * Version: 1.6.5
 *
 * Authors: Rodney Rehm, Addy Osmani (patches for FF)
 * Web: http://medialize.github.com/jQuery-contextMenu/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function ($, undefined) {
  // TODO: -
  // ARIA stuff: menuitem, menuitemcheckbox und menuitemradio
  // create <menu> structure if $.support[htmlCommand || htmlMenuitem] and !opt.disableNative

  // determine html5 compatibility
  $.support.htmlMenuitem = "HTMLMenuItemElement" in window;
  $.support.htmlCommand = "HTMLCommandElement" in window;
  $.support.eventSelectstart = "onselectstart" in document.documentElement;
  /* // should the need arise, test for css user-select
    $.support.cssUserSelect = (function(){
        var t = false,
            e = document.createElement('div');
        
        $.each('Moz|Webkit|Khtml|O|ms|Icab|'.split('|'), function(i, prefix) {
            var propCC = prefix + (prefix ? 'U' : 'u') + 'serSelect',
                prop = (prefix ? ('-' + prefix.toLowerCase() + '-') : '') + 'user-select';
                
            e.style.cssText = prop + ': text;';
            if (e.style[propCC] == 'text') {
                t = true;
                return false;
            }
            
            return true;
        });
        
        return t;
    })();
    */

  if (!$.ui || !$.ui.widget) {
    // duck punch $.cleanData like jQueryUI does to get that remove event
    // https://github.com/jquery/jquery-ui/blob/master/ui/jquery.ui.widget.js#L16-24
    var _cleanData = $.cleanData;
    $.cleanData = function (elems) {
      for (var i = 0, elem; (elem = elems[i]) != null; i++) {
        try {
          $(elem).triggerHandler("remove");
          // http://bugs.jquery.com/ticket/8235
        } catch (e) {}
      }
      _cleanData(elems);
    };
  }

  var // currently active contextMenu trigger
    $currentTrigger = null,
    // is contextMenu initialized with at least one menu?
    initialized = false,
    // window handle
    $win = $(window),
    // number of registered menus
    counter = 0,
    // mapping selector to namespace
    namespaces = {},
    // mapping namespace to options
    menus = {},
    // custom command type handlers
    types = {},
    // default values
    defaults = {
      // selector of contextMenu trigger
      selector: null,
      // where to append the menu to
      appendTo: null,
      // method to trigger context menu ["right", "left", "hover"]
      trigger: "right",
      // hide menu when mouse leaves trigger / menu elements
      autoHide: false,
      // ms to wait before showing a hover-triggered context menu
      delay: 200,
      // flag denoting if a second trigger should simply move (true) or rebuild (false) an open menu
      // as long as the trigger happened on one of the trigger-element's child nodes
      reposition: true,
      // determine position to show menu at
      determinePosition: function ($menu) {
        // position to the lower middle of the trigger element
        if ($.ui && $.ui.position) {
          // .position() is provided as a jQuery UI utility
          // (...and it won't work on hidden elements)
          $menu
            .css("display", "block")
            .position({
              my: "center top",
              at: "center bottom",
              of: this,
              offset: "0 5",
              collision: "fit"
            })
            .css("display", "none");
        } else {
          // determine contextMenu position
          var offset = this.offset();
          offset.top += this.outerHeight();
          offset.left += this.outerWidth() / 2 - $menu.outerWidth() / 2;
          $menu.css(offset);
        }
      },
      // position menu
      position: function (opt, x, y) {
        var $this = this,
          offset;
        // determine contextMenu position
        if (!x && !y) {
          opt.determinePosition.call(this, opt.$menu);
          return;
        } else if (x === "maintain" && y === "maintain") {
          // x and y must not be changed (after re-show on command click)
          offset = opt.$menu.position();
        } else {
          // x and y are given (by mouse event)
          offset = {
            top: y,
            left: x
          };
        }

        // correct offset if viewport demands it
        var bottom = $win.scrollTop() + $win.height(),
          right = $win.scrollLeft() + $win.width(),
          height = opt.$menu.height(),
          width = opt.$menu.width();

        if (offset.top + height > bottom) {
          offset.top -= height;
        }

        if (offset.left + width > right) {
          offset.left -= width;
        }

        opt.$menu.css(offset);
      },
      // position the sub-menu
      positionSubmenu: function ($menu) {
        if ($.ui && $.ui.position) {
          // .position() is provided as a jQuery UI utility
          // (...and it won't work on hidden elements)
          $menu
            .css("display", "block")
            .position({
              my: "left top",
              at: "right top",
              of: this,
              collision: "flipfit fit"
            })
            .css("display", "");
        } else {
          // determine contextMenu position
          var offset = {
            top: 0,
            left: this.outerWidth()
          };
          $menu.css(offset);
        }
      },
      // offset to add to zIndex
      zIndex: 1,
      // show hide animation settings
      animation: {
        duration: 50,
        show: "slideDown",
        hide: "slideUp"
      },
      // events
      events: {
        show: $.noop,
        hide: $.noop
      },
      // default callback
      callback: null,
      // list of contextMenu items
      items: {}
    },
    // mouse position for hover activation
    hoveract = {
      timer: null,
      pageX: null,
      pageY: null
    },
    // determine zIndex
    zindex = function ($t) {
      var zin = 0,
        $tt = $t;

      while (true) {
        zin = Math.max(zin, parseInt($tt.css("z-index"), 10) || 0);
        $tt = $tt.parent();
        if (
          !$tt ||
          !$tt.length ||
          "html body".indexOf($tt.prop("nodeName").toLowerCase()) > -1
        ) {
          break;
        }
      }

      return zin;
    },
    // event handlers
    handle = {
      // abort anything
      abortevent: function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
      },

      // contextmenu show dispatcher
      contextmenu: function (e) {
        var $this = $(this);

        // disable actual context-menu
        e.preventDefault();
        e.stopImmediatePropagation();

        // abort native-triggered events unless we're triggering on right click
        if (e.data.trigger != "right" && e.originalEvent) {
          return;
        }

        // abort event if menu is visible for this trigger
        if ($this.hasClass("context-menu-active")) {
          return;
        }

        if (!$this.hasClass("context-menu-disabled")) {
          // theoretically need to fire a show event at <menu>
          // http://www.whatwg.org/specs/web-apps/current-work/multipage/interactive-elements.html#context-menus
          // var evt = jQuery.Event("show", { data: data, pageX: e.pageX, pageY: e.pageY, relatedTarget: this });
          // e.data.$menu.trigger(evt);

          $currentTrigger = $this;
          if (e.data.build) {
            var built = e.data.build($currentTrigger, e);
            // abort if build() returned false
            if (built === false) {
              return;
            }

            // dynamically build menu on invocation
            e.data = $.extend(true, {}, defaults, e.data, built || {});

            // abort if there are no items to display
            if (!e.data.items || $.isEmptyObject(e.data.items)) {
              // Note: jQuery captures and ignores errors from event handlers
              if (window.console) {
                (console.error || console.log)(
                  "No items specified to show in contextMenu"
                );
              }

              throw new Error("No Items sepcified");
            }

            // backreference for custom command type creation
            e.data.$trigger = $currentTrigger;

            op.create(e.data);
          }
          // show menu
          op.show.call($this, e.data, e.pageX, e.pageY);
        }
      },
      // contextMenu left-click trigger
      click: function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        $(this).trigger(
          $.Event("contextmenu", {
            data: e.data,
            pageX: e.pageX,
            pageY: e.pageY
          })
        );
      },
      // contextMenu right-click trigger
      mousedown: function (e) {
        // register mouse down
        var $this = $(this);

        // hide any previous menus
        if (
          $currentTrigger &&
          $currentTrigger.length &&
          !$currentTrigger.is($this)
        ) {
          $currentTrigger.data("contextMenu").$menu.trigger("contextmenu:hide");
        }

        // activate on right click
        if (e.button == 2) {
          $currentTrigger = $this.data("contextMenuActive", true);
        }
      },
      // contextMenu right-click trigger
      mouseup: function (e) {
        // show menu
        var $this = $(this);
        if (
          $this.data("contextMenuActive") &&
          $currentTrigger &&
          $currentTrigger.length &&
          $currentTrigger.is($this) &&
          !$this.hasClass("context-menu-disabled")
        ) {
          e.preventDefault();
          e.stopImmediatePropagation();
          $currentTrigger = $this;
          $this.trigger(
            $.Event("contextmenu", {
              data: e.data,
              pageX: e.pageX,
              pageY: e.pageY
            })
          );
        }

        $this.removeData("contextMenuActive");
      },
      // contextMenu hover trigger
      mouseenter: function (e) {
        var $this = $(this),
          $related = $(e.relatedTarget),
          $document = $(document);

        // abort if we're coming from a menu
        if (
          $related.is(".context-menu-list") ||
          $related.closest(".context-menu-list").length
        ) {
          return;
        }

        // abort if a menu is shown
        if ($currentTrigger && $currentTrigger.length) {
          return;
        }

        hoveract.pageX = e.pageX;
        hoveract.pageY = e.pageY;
        hoveract.data = e.data;
        $document.on("mousemove.contextMenuShow", handle.mousemove);
        hoveract.timer = setTimeout(function () {
          hoveract.timer = null;
          $document.off("mousemove.contextMenuShow");
          $currentTrigger = $this;
          $this.trigger(
            $.Event("contextmenu", {
              data: hoveract.data,
              pageX: hoveract.pageX,
              pageY: hoveract.pageY
            })
          );
        }, e.data.delay);
      },
      // contextMenu hover trigger
      mousemove: function (e) {
        hoveract.pageX = e.pageX;
        hoveract.pageY = e.pageY;
      },
      // contextMenu hover trigger
      mouseleave: function (e) {
        // abort if we're leaving for a menu
        var $related = $(e.relatedTarget);
        if (
          $related.is(".context-menu-list") ||
          $related.closest(".context-menu-list").length
        ) {
          return;
        }

        try {
          clearTimeout(hoveract.timer);
        } catch (e) {}

        hoveract.timer = null;
      },

      // click on layer to hide contextMenu
      layerClick: function (e) {
        var $this = $(this),
          root = $this.data("contextMenuRoot"),
          mouseup = false,
          button = e.button,
          x = e.pageX,
          y = e.pageY,
          target,
          offset,
          selectors;

        e.preventDefault();
        e.stopImmediatePropagation();

        setTimeout(function () {
          var $window, hideshow, possibleTarget;
          var triggerAction =
            (root.trigger == "left" && button === 0) ||
            (root.trigger == "right" && button === 2);

          // find the element that would've been clicked, wasn't the layer in the way
          if (document.elementFromPoint) {
            root.$layer.hide();
            target = document.elementFromPoint(
              x - $win.scrollLeft(),
              y - $win.scrollTop()
            );
            root.$layer.show();
          }

          if (root.reposition && triggerAction) {
            if (document.elementFromPoint) {
              if (
                root.$trigger.is(target) ||
                root.$trigger.has(target).length
              ) {
                root.position.call(root.$trigger, root, x, y);
                return;
              }
            } else {
              offset = root.$trigger.offset();
              $window = $(window);
              // while this looks kinda awful, it's the best way to avoid
              // unnecessarily calculating any positions
              offset.top += $window.scrollTop();
              if (offset.top <= e.pageY) {
                offset.left += $window.scrollLeft();
                if (offset.left <= e.pageX) {
                  offset.bottom = offset.top + root.$trigger.outerHeight();
                  if (offset.bottom >= e.pageY) {
                    offset.right = offset.left + root.$trigger.outerWidth();
                    if (offset.right >= e.pageX) {
                      // reposition
                      root.position.call(root.$trigger, root, x, y);
                      return;
                    }
                  }
                }
              }
            }
          }

          if (target && triggerAction) {
            root.$trigger.one("contextmenu:hidden", function () {
              $(target).contextMenu({
                x: x,
                y: y
              });
            });
          }

          root.$menu.trigger("contextmenu:hide");
        }, 50);
      },
      // key handled :hover
      keyStop: function (e, opt) {
        if (!opt.isInput) {
          e.preventDefault();
        }

        e.stopPropagation();
      },
      key: function (e) {
        var opt = $currentTrigger.data("contextMenu") || {};

        switch (e.keyCode) {
          case 9:
          case 38: // up
            handle.keyStop(e, opt);
            // if keyCode is [38 (up)] or [9 (tab) with shift]
            if (opt.isInput) {
              if (e.keyCode == 9 && e.shiftKey) {
                e.preventDefault();
                opt.$selected &&
                  opt.$selected.find("input, textarea, select").blur();
                opt.$menu.trigger("prevcommand");
                return;
              } else if (
                e.keyCode == 38 &&
                opt.$selected.find("input, textarea, select").prop("type") ==
                  "checkbox"
              ) {
                // checkboxes don't capture this key
                e.preventDefault();
                return;
              }
            } else if (e.keyCode != 9 || e.shiftKey) {
              opt.$menu.trigger("prevcommand");
              return;
            }
          // omitting break;

          // case 9: // tab - reached through omitted break;
          case 40: // down
            handle.keyStop(e, opt);
            if (opt.isInput) {
              if (e.keyCode == 9) {
                e.preventDefault();
                opt.$selected &&
                  opt.$selected.find("input, textarea, select").blur();
                opt.$menu.trigger("nextcommand");
                return;
              } else if (
                e.keyCode == 40 &&
                opt.$selected.find("input, textarea, select").prop("type") ==
                  "checkbox"
              ) {
                // checkboxes don't capture this key
                e.preventDefault();
                return;
              }
            } else {
              opt.$menu.trigger("nextcommand");
              return;
            }
            break;

          case 37: // left
            handle.keyStop(e, opt);
            if (opt.isInput || !opt.$selected || !opt.$selected.length) {
              break;
            }

            if (!opt.$selected.parent().hasClass("context-menu-root")) {
              var $parent = opt.$selected.parent().parent();
              opt.$selected.trigger("contextmenu:blur");
              opt.$selected = $parent;
              return;
            }
            break;

          case 39: // right
            handle.keyStop(e, opt);
            if (opt.isInput || !opt.$selected || !opt.$selected.length) {
              break;
            }

            var itemdata = opt.$selected.data("contextMenu") || {};
            if (
              itemdata.$menu &&
              opt.$selected.hasClass("context-menu-submenu")
            ) {
              opt.$selected = null;
              itemdata.$selected = null;
              itemdata.$menu.trigger("nextcommand");
              return;
            }
            break;

          case 35: // end
          case 36: // home
            if (
              opt.$selected &&
              opt.$selected.find("input, textarea, select").length
            ) {
              return;
            } else {
              ((opt.$selected && opt.$selected.parent()) || opt.$menu)
                .children(":not(.disabled, .not-selectable)")
                [e.keyCode == 36 ? "first" : "last"]()
                .trigger("contextmenu:focus");
              e.preventDefault();
              return;
            }
            break;

          case 13: // enter
            handle.keyStop(e, opt);
            if (opt.isInput) {
              if (opt.$selected && !opt.$selected.is("textarea, select")) {
                e.preventDefault();
                return;
              }
              break;
            }
            opt.$selected && opt.$selected.trigger("mouseup");
            return;

          case 32: // space
          case 33: // page up
          case 34: // page down
            // prevent browser from scrolling down while menu is visible
            handle.keyStop(e, opt);
            return;

          case 27: // esc
            handle.keyStop(e, opt);
            opt.$menu.trigger("contextmenu:hide");
            return;

          default:
            // 0-9, a-z
            var k = String.fromCharCode(e.keyCode).toUpperCase();
            if (opt.accesskeys[k]) {
              // according to the specs accesskeys must be invoked immediately
              opt.accesskeys[k].$node.trigger(
                opt.accesskeys[k].$menu ? "contextmenu:focus" : "mouseup"
              );
              return;
            }
            break;
        }
        // pass event to selected item,
        // stop propagation to avoid endless recursion
        e.stopPropagation();
        opt.$selected && opt.$selected.trigger(e);
      },

      // select previous possible command in menu
      prevItem: function (e) {
        e.stopPropagation();
        var opt = $(this).data("contextMenu") || {};

        // obtain currently selected menu
        if (opt.$selected) {
          var $s = opt.$selected;
          opt = opt.$selected.parent().data("contextMenu") || {};
          opt.$selected = $s;
        }

        var $children = opt.$menu.children(),
          $prev =
            !opt.$selected || !opt.$selected.prev().length
              ? $children.last()
              : opt.$selected.prev(),
          $round = $prev;

        // skip disabled
        while ($prev.hasClass("disabled") || $prev.hasClass("not-selectable")) {
          if ($prev.prev().length) {
            $prev = $prev.prev();
          } else {
            $prev = $children.last();
          }
          if ($prev.is($round)) {
            // break endless loop
            return;
          }
        }

        // leave current
        if (opt.$selected) {
          handle.itemMouseleave.call(opt.$selected.get(0), e);
        }

        // activate next
        handle.itemMouseenter.call($prev.get(0), e);

        // focus input
        var $input = $prev.find("input, textarea, select");
        if ($input.length) {
          $input.focus();
        }
      },
      // select next possible command in menu
      nextItem: function (e) {
        e.stopPropagation();
        var opt = $(this).data("contextMenu") || {};

        // obtain currently selected menu
        if (opt.$selected) {
          var $s = opt.$selected;
          opt = opt.$selected.parent().data("contextMenu") || {};
          opt.$selected = $s;
        }

        var $children = opt.$menu.children(),
          $next =
            !opt.$selected || !opt.$selected.next().length
              ? $children.first()
              : opt.$selected.next(),
          $round = $next;

        // skip disabled
        while ($next.hasClass("disabled") || $next.hasClass("not-selectable")) {
          if ($next.next().length) {
            $next = $next.next();
          } else {
            $next = $children.first();
          }
          if ($next.is($round)) {
            // break endless loop
            return;
          }
        }

        // leave current
        if (opt.$selected) {
          handle.itemMouseleave.call(opt.$selected.get(0), e);
        }

        // activate next
        handle.itemMouseenter.call($next.get(0), e);

        // focus input
        var $input = $next.find("input, textarea, select");
        if ($input.length) {
          $input.focus();
        }
      },

      // flag that we're inside an input so the key handler can act accordingly
      focusInput: function (e) {
        var $this = $(this).closest(".context-menu-item"),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        root.$selected = opt.$selected = $this;
        root.isInput = opt.isInput = true;
      },
      // flag that we're inside an input so the key handler can act accordingly
      blurInput: function (e) {
        var $this = $(this).closest(".context-menu-item"),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        root.isInput = opt.isInput = false;
      },

      // :hover on menu
      menuMouseenter: function (e) {
        var root = $(this).data().contextMenuRoot;
        root.hovering = true;
      },
      // :hover on menu
      menuMouseleave: function (e) {
        var root = $(this).data().contextMenuRoot;
        if (root.$layer && root.$layer.is(e.relatedTarget)) {
          root.hovering = false;
        }
      },

      // :hover done manually so key handling is possible
      itemMouseenter: function (e) {
        var $this = $(this),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        root.hovering = true;

        // abort if we're re-entering
        if (e && root.$layer && root.$layer.is(e.relatedTarget)) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }

        // make sure only one item is selected
        (opt.$menu ? opt : root).$menu
          .children(".hover")
          .trigger("contextmenu:blur");

        if ($this.hasClass("disabled") || $this.hasClass("not-selectable")) {
          opt.$selected = null;
          return;
        }

        $this.trigger("contextmenu:focus");
      },
      // :hover done manually so key handling is possible
      itemMouseleave: function (e) {
        var $this = $(this),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        if (root !== opt && root.$layer && root.$layer.is(e.relatedTarget)) {
          root.$selected && root.$selected.trigger("contextmenu:blur");
          e.preventDefault();
          e.stopImmediatePropagation();
          root.$selected = opt.$selected = opt.$node;
          return;
        }

        $this.trigger("contextmenu:blur");
      },
      // contextMenu item click
      itemClick: function (e) {
        var $this = $(this),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot,
          key = data.contextMenuKey,
          callback;

        // abort if the key is unknown or disabled or is a menu
        if (
          !opt.items[key] ||
          $this.is(
            ".disabled, .context-menu-submenu, .context-menu-separator, .not-selectable"
          )
        ) {
          return;
        }

        e.preventDefault();
        e.stopImmediatePropagation();

        if (
          $.isFunction(root.callbacks[key]) &&
          Object.prototype.hasOwnProperty.call(root.callbacks, key)
        ) {
          // item-specific callback
          callback = root.callbacks[key];
        } else if ($.isFunction(root.callback)) {
          // default callback
          callback = root.callback;
        } else {
          // no callback, no action
          return;
        }

        // hide menu if callback doesn't stop that
        if (callback.call(root.$trigger, key, root) !== false) {
          root.$menu.trigger("contextmenu:hide");
        } else if (root.$menu.parent().length) {
          op.update.call(root.$trigger, root);
        }
      },
      // ignore click events on input elements
      inputClick: function (e) {
        e.stopImmediatePropagation();
      },

      // hide <menu>
      hideMenu: function (e, data) {
        var root = $(this).data("contextMenuRoot");
        op.hide.call(root.$trigger, root, data && data.force);
      },
      // focus <command>
      focusItem: function (e) {
        e.stopPropagation();
        var $this = $(this),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        $this.addClass("hover").siblings(".hover").trigger("contextmenu:blur");

        // remember selected
        opt.$selected = root.$selected = $this;

        // position sub-menu - do after show so dumb $.ui.position can keep up
        if (opt.$node) {
          root.positionSubmenu.call(opt.$node, opt.$menu);
        }
      },
      // blur <command>
      blurItem: function (e) {
        e.stopPropagation();
        var $this = $(this),
          data = $this.data(),
          opt = data.contextMenu,
          root = data.contextMenuRoot;

        $this.removeClass("hover");
        opt.$selected = null;
      }
    },
    // operations
    op = {
      show: function (opt, x, y) {
        var $trigger = $(this),
          offset,
          css = {};

        // hide any open menus
        $("#context-menu-layer").trigger("mousedown");

        // backreference for callbacks
        opt.$trigger = $trigger;

        // show event
        if (opt.events.show.call($trigger, opt) === false) {
          $currentTrigger = null;
          return;
        }

        // create or update context menu
        op.update.call($trigger, opt);

        // position menu
        opt.position.call($trigger, opt, x, y);

        // make sure we're in front
        if (opt.zIndex) {
          css.zIndex = zindex($trigger) + opt.zIndex;
        }

        // add layer
        op.layer.call(opt.$menu, opt, css.zIndex);

        // adjust sub-menu zIndexes
        opt.$menu.find("ul").css("zIndex", css.zIndex + 1);

        // position and show context menu
        opt.$menu
          .css(css)
          [opt.animation.show](opt.animation.duration, function () {
            $trigger.trigger("contextmenu:visible");
          });
        // make options available and set state
        $trigger.data("contextMenu", opt).addClass("context-menu-active");

        // register key handler
        $(document)
          .off("keydown.contextMenu")
          .on("keydown.contextMenu", handle.key);
        // register autoHide handler
        if (opt.autoHide) {
          // mouse position handler
          $(document).on("mousemove.contextMenuAutoHide", function (e) {
            // need to capture the offset on mousemove,
            // since the page might've been scrolled since activation
            var pos = $trigger.offset();
            pos.right = pos.left + $trigger.outerWidth();
            pos.bottom = pos.top + $trigger.outerHeight();

            if (
              opt.$layer &&
              !opt.hovering &&
              (!(e.pageX >= pos.left && e.pageX <= pos.right) ||
                !(e.pageY >= pos.top && e.pageY <= pos.bottom))
            ) {
              // if mouse in menu...
              opt.$menu.trigger("contextmenu:hide");
            }
          });
        }
      },
      hide: function (opt, force) {
        var $trigger = $(this);
        if (!opt) {
          opt = $trigger.data("contextMenu") || {};
        }

        // hide event
        if (
          !force &&
          opt.events &&
          opt.events.hide.call($trigger, opt) === false
        ) {
          return;
        }

        // remove options and revert state
        $trigger.removeData("contextMenu").removeClass("context-menu-active");

        if (opt.$layer) {
          // keep layer for a bit so the contextmenu event can be aborted properly by opera
          setTimeout(
            (function ($layer) {
              return function () {
                $layer.remove();
              };
            })(opt.$layer),
            10
          );

          try {
            delete opt.$layer;
          } catch (e) {
            opt.$layer = null;
          }
        }

        // remove handle
        $currentTrigger = null;
        // remove selected
        opt.$menu.find(".hover").trigger("contextmenu:blur");
        opt.$selected = null;
        // unregister key and mouse handlers
        //$(document).off('.contextMenuAutoHide keydown.contextMenu'); // http://bugs.jquery.com/ticket/10705
        $(document).off(".contextMenuAutoHide").off("keydown.contextMenu");
        // hide menu
        opt.$menu &&
          opt.$menu[opt.animation.hide](opt.animation.duration, function () {
            // tear down dynamically built menu after animation is completed.
            if (opt.build) {
              opt.$menu.remove();
              $.each(opt, function (key, value) {
                switch (key) {
                  case "ns":
                  case "selector":
                  case "build":
                  case "trigger":
                    return true;

                  default:
                    opt[key] = undefined;
                    try {
                      delete opt[key];
                    } catch (e) {}
                    return true;
                }
              });
            }

            setTimeout(function () {
              $trigger.trigger("contextmenu:hidden");
            }, 10);
          });
      },
      create: function (opt, root) {
        if (root === undefined) {
          root = opt;
        }
        // create contextMenu
        opt.$menu = $('<ul class="context-menu-list"></ul>')
          .addClass(opt.className || "")
          .data({
            contextMenu: opt,
            contextMenuRoot: root
          });

        $.each(["callbacks", "commands", "inputs"], function (i, k) {
          opt[k] = {};
          if (!root[k]) {
            root[k] = {};
          }
        });

        root.accesskeys || (root.accesskeys = {});

        // create contextMenu items
        $.each(opt.items, function (key, item) {
          var $t = $('<li class="context-menu-item"></li>').addClass(
              item.className || ""
            ),
            $label = null,
            $input = null;

          // iOS needs to see a click-event bound to an element to actually
          // have the TouchEvents infrastructure trigger the click event
          $t.on("click", $.noop);

          item.$node = $t.data({
            contextMenu: opt,
            contextMenuRoot: root,
            contextMenuKey: key
          });

          // register accesskey
          // NOTE: the accesskey attribute should be applicable to any element, but Safari5 and Chrome13 still can't do that
          if (item.accesskey) {
            var aks = splitAccesskey(item.accesskey);
            for (var i = 0, ak; (ak = aks[i]); i++) {
              if (!root.accesskeys[ak]) {
                root.accesskeys[ak] = item;
                item._name = item.name.replace(
                  new RegExp("(" + ak + ")", "i"),
                  '<span class="context-menu-accesskey">$1</span>'
                );
                break;
              }
            }
          }

          if (typeof item == "string") {
            $t.addClass("context-menu-separator not-selectable");
          } else if (item.type && types[item.type]) {
            // run custom type handler
            types[item.type].call($t, item, opt, root);
            // register commands
            $.each([opt, root], function (i, k) {
              k.commands[key] = item;
              if ($.isFunction(item.callback)) {
                k.callbacks[key] = item.callback;
              }
            });
          } else {
            // add label for input
            if (item.type == "html") {
              $t.addClass("context-menu-html not-selectable");
            } else if (item.type) {
              $label = $("<label></label>").appendTo($t);
              $("<span></span>")
                .html(item._name || item.name)
                .appendTo($label);
              $t.addClass("context-menu-input");
              opt.hasTypes = true;
              $.each([opt, root], function (i, k) {
                k.commands[key] = item;
                k.inputs[key] = item;
              });
            } else if (item.items) {
              item.type = "sub";
            }

            switch (item.type) {
              case "text":
                $input = $('<input type="text" value="1" name="" value="">')
                  .attr("name", "context-menu-input-" + key)
                  .val(item.value || "")
                  .appendTo($label);
                break;

              case "textarea":
                $input = $('<textarea name=""></textarea>')
                  .attr("name", "context-menu-input-" + key)
                  .val(item.value || "")
                  .appendTo($label);

                if (item.height) {
                  $input.height(item.height);
                }
                break;

              case "checkbox":
                $input = $('<input type="checkbox" value="1" name="" value="">')
                  .attr("name", "context-menu-input-" + key)
                  .val(item.value || "")
                  .prop("checked", !!item.selected)
                  .prependTo($label);
                break;

              case "radio":
                $input = $('<input type="radio" value="1" name="" value="">')
                  .attr("name", "context-menu-input-" + item.radio)
                  .val(item.value || "")
                  .prop("checked", !!item.selected)
                  .prependTo($label);
                break;

              case "select":
                $input = $('<select name="">')
                  .attr("name", "context-menu-input-" + key)
                  .appendTo($label);
                if (item.options) {
                  $.each(item.options, function (value, text) {
                    $("<option></option>")
                      .val(value)
                      .text(text)
                      .appendTo($input);
                  });
                  $input.val(item.selected);
                }
                break;

              case "sub":
                // FIXME: shouldn't this .html() be a .text()?
                $("<span></span>")
                  .html(item._name || item.name)
                  .appendTo($t);
                item.appendTo = item.$node;
                op.create(item, root);
                $t.data("contextMenu", item).addClass("context-menu-submenu");
                item.callback = null;
                break;

              case "html":
                $(item.html).appendTo($t);
                break;

              default:
                $.each([opt, root], function (i, k) {
                  k.commands[key] = item;
                  if ($.isFunction(item.callback)) {
                    k.callbacks[key] = item.callback;
                  }
                });
                // FIXME: shouldn't this .html() be a .text()?
                $("<span></span>")
                  .html(item._name || item.name || "")
                  .appendTo($t);
                break;
            }

            // disable key listener in <input>
            if (item.type && item.type != "sub" && item.type != "html") {
              $input
                .on("focus", handle.focusInput)
                .on("blur", handle.blurInput);

              if (item.events) {
                $input.on(item.events, opt);
              }
            }

            // add icons
            if (item.icon) {
              $t.addClass("icon icon-" + item.icon);
            }
          }

          // cache contained elements
          item.$input = $input;
          item.$label = $label;

          // attach item to menu
          $t.appendTo(opt.$menu);

          // Disable text selection
          if (!opt.hasTypes && $.support.eventSelectstart) {
            // browsers support user-select: none,
            // IE has a special event for text-selection
            // browsers supporting neither will not be preventing text-selection
            $t.on("selectstart.disableTextSelect", handle.abortevent);
          }
        });
        // attach contextMenu to <body> (to bypass any possible overflow:hidden issues on parents of the trigger element)
        if (!opt.$node) {
          opt.$menu.css("display", "none").addClass("context-menu-root");
        }
        opt.$menu.appendTo(opt.appendTo || document.body);
      },
      resize: function ($menu, nested) {
        // determine widths of submenus, as CSS won't grow them automatically
        // position:absolute within position:absolute; min-width:100; max-width:200; results in width: 100;
        // kinda sucks hard...

        // determine width of absolutely positioned element
        $menu.css({
          position: "absolute",
          display: "block"
        });
        // don't apply yet, because that would break nested elements' widths
        // add a pixel to circumvent word-break issue in IE9 - #80
        $menu.data("width", Math.ceil($menu.width()) + 1);
        // reset styles so they allow nested elements to grow/shrink naturally
        $menu.css({
          position: "static",
          minWidth: "0px",
          maxWidth: "100000px"
        });
        // identify width of nested menus
        $menu.find("> li > ul").each(function () {
          op.resize($(this), true);
        });
        // reset and apply changes in the end because nested
        // elements' widths wouldn't be calculatable otherwise
        if (!nested) {
          $menu
            .find("ul")
            .addBack()
            .css({
              position: "",
              display: "",
              minWidth: "",
              maxWidth: ""
            })
            .width(function () {
              return $(this).data("width");
            });
        }
      },
      update: function (opt, root) {
        var $trigger = this;
        if (root === undefined) {
          root = opt;
          op.resize(opt.$menu);
        }
        // re-check disabled for each item
        opt.$menu.children().each(function () {
          var $item = $(this),
            key = $item.data("contextMenuKey"),
            item = opt.items[key],
            disabled =
              ($.isFunction(item.disabled) &&
                item.disabled.call($trigger, key, root)) ||
              item.disabled === true;

          // dis- / enable item
          $item[disabled ? "addClass" : "removeClass"]("disabled");

          if (item.type) {
            // dis- / enable input elements
            $item.find("input, select, textarea").prop("disabled", disabled);

            // update input states
            switch (item.type) {
              case "text":
              case "textarea":
                item.$input.val(item.value || "");
                break;

              case "checkbox":
              case "radio":
                item.$input
                  .val(item.value || "")
                  .prop("checked", !!item.selected);
                break;

              case "select":
                item.$input.val(item.selected || "");
                break;
            }
          }

          if (item.$menu) {
            // update sub-menu
            op.update.call($trigger, item, root);
          }
        });
      },
      layer: function (opt, zIndex) {
        // add transparent layer for click area
        // filter and background for Internet Explorer, Issue #23
        var $layer = (opt.$layer = $(
          '<div id="context-menu-layer" style="position:fixed; z-index:' +
            zIndex +
            '; top:0; left:0; opacity: 0; filter: alpha(opacity=0); background-color: #000;"></div>'
        )
          .css({
            height: $win.height(),
            width: $win.width(),
            display: "block"
          })
          .data("contextMenuRoot", opt)
          .insertBefore(this)
          .on("contextmenu", handle.abortevent)
          .on("mousedown", handle.layerClick));

        // IE6 doesn't know position:fixed;
        if (!$.support.fixedPosition) {
          $layer.css({
            position: "absolute",
            height: $(document).height()
          });
        }

        return $layer;
      }
    };

  // split accesskey according to http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#assigned-access-key
  function splitAccesskey(val) {
    var t = val.split(/\s+/),
      keys = [];

    for (var i = 0, k; (k = t[i]); i++) {
      k = k[0].toUpperCase(); // first character only
      // theoretically non-accessible characters should be ignored, but different systems, different keyboard layouts, ... screw it.
      // a map to look up already used access keys would be nice
      keys.push(k);
    }

    return keys;
  }

  // handle contextMenu triggers
  $.fn.contextMenu = function (operation) {
    if (operation === undefined) {
      this.first().trigger("contextmenu");
    } else if (operation.x && operation.y) {
      this.first().trigger(
        $.Event("contextmenu", {
          pageX: operation.x,
          pageY: operation.y
        })
      );
    } else if (operation === "hide") {
      var $menu = this.data("contextMenu").$menu;
      $menu && $menu.trigger("contextmenu:hide");
    } else if (operation === "destroy") {
      $.contextMenu("destroy", {
        context: this
      });
    } else if ($.isPlainObject(operation)) {
      operation.context = this;
      $.contextMenu("create", operation);
    } else if (operation) {
      this.removeClass("context-menu-disabled");
    } else if (!operation) {
      this.addClass("context-menu-disabled");
    }

    return this;
  };

  // manage contextMenu instances
  $.contextMenu = function (operation, options) {
    if (typeof operation != "string") {
      options = operation;
      operation = "create";
    }

    if (typeof options == "string") {
      options = {
        selector: options
      };
    } else if (options === undefined) {
      options = {};
    }

    // merge with default options
    var o = $.extend(true, {}, defaults, options || {});
    var $document = $(document);
    var $context = $document;
    var _hasContext = false;

    if (!o.context || !o.context.length) {
      o.context = document;
    } else {
      // you never know what they throw at you...
      $context = $(o.context).first();
      o.context = $context.get(0);
      _hasContext = o.context !== document;
    }

    switch (operation) {
      case "create":
        // no selector no joy
        if (!o.selector) {
          throw new Error("No selector specified");
        }
        // make sure internal classes are not bound to
        if (o.selector.match(/.context-menu-(list|item|input)($|\s)/)) {
          throw new Error(
            'Cannot bind to selector "' +
              o.selector +
              '" as it contains a reserved className'
          );
        }
        if (!o.build && (!o.items || $.isEmptyObject(o.items))) {
          throw new Error("No Items sepcified");
        }
        counter++;
        o.ns = ".contextMenu" + counter;
        if (!_hasContext) {
          namespaces[o.selector] = o.ns;
        }
        menus[o.ns] = o;

        // default to right click
        if (!o.trigger) {
          o.trigger = "right";
        }

        if (!initialized) {
          // make sure item click is registered first
          $document
            .on(
              {
                "contextmenu:hide.contextMenu": handle.hideMenu,
                "prevcommand.contextMenu": handle.prevItem,
                "nextcommand.contextMenu": handle.nextItem,
                "contextmenu.contextMenu": handle.abortevent,
                "mouseenter.contextMenu": handle.menuMouseenter,
                "mouseleave.contextMenu": handle.menuMouseleave
              },
              ".context-menu-list"
            )
            .on("mouseup.contextMenu", ".context-menu-input", handle.inputClick)
            .on(
              {
                "mouseup.contextMenu": handle.itemClick,
                "contextmenu:focus.contextMenu": handle.focusItem,
                "contextmenu:blur.contextMenu": handle.blurItem,
                "contextmenu.contextMenu": handle.abortevent,
                "mouseenter.contextMenu": handle.itemMouseenter,
                "mouseleave.contextMenu": handle.itemMouseleave
              },
              ".context-menu-item"
            );

          initialized = true;
        }

        // engage native contextmenu event
        $context.on("contextmenu" + o.ns, o.selector, o, handle.contextmenu);

        if (_hasContext) {
          // add remove hook, just in case
          $context.on("remove" + o.ns, function () {
            $(this).contextMenu("destroy");
          });
        }

        switch (o.trigger) {
          case "hover":
            $context
              .on("mouseenter" + o.ns, o.selector, o, handle.mouseenter)
              .on("mouseleave" + o.ns, o.selector, o, handle.mouseleave);
            break;

          case "left":
            $context.on("click" + o.ns, o.selector, o, handle.click);
            break;
          /*
                        default:
                            // http://www.quirksmode.org/dom/events/contextmenu.html
                            $document
                                .on('mousedown' + o.ns, o.selector, o, handle.mousedown)
                                .on('mouseup' + o.ns, o.selector, o, handle.mouseup);
                            break;
                        */
        }

        // create menu
        if (!o.build) {
          op.create(o);
        }
        break;

      case "destroy":
        var $visibleMenu;
        if (_hasContext) {
          // get proper options
          var context = o.context;
          $.each(menus, function (ns, o) {
            if (o.context !== context) {
              return true;
            }

            $visibleMenu = $(".context-menu-list").filter(":visible");
            if (
              $visibleMenu.length &&
              $visibleMenu
                .data()
                .contextMenuRoot.$trigger.is($(o.context).find(o.selector))
            ) {
              $visibleMenu.trigger("contextmenu:hide", {
                force: true
              });
            }

            try {
              if (menus[o.ns].$menu) {
                menus[o.ns].$menu.remove();
              }

              delete menus[o.ns];
            } catch (e) {
              menus[o.ns] = null;
            }

            $(o.context).off(o.ns);

            return true;
          });
        } else if (!o.selector) {
          $document.off(".contextMenu .contextMenuAutoHide");
          $.each(menus, function (ns, o) {
            $(o.context).off(o.ns);
          });

          namespaces = {};
          menus = {};
          counter = 0;
          initialized = false;

          $("#context-menu-layer, .context-menu-list").remove();
        } else if (namespaces[o.selector]) {
          $visibleMenu = $(".context-menu-list").filter(":visible");
          if (
            $visibleMenu.length &&
            $visibleMenu.data().contextMenuRoot.$trigger.is(o.selector)
          ) {
            $visibleMenu.trigger("contextmenu:hide", {
              force: true
            });
          }

          try {
            if (menus[namespaces[o.selector]].$menu) {
              menus[namespaces[o.selector]].$menu.remove();
            }

            delete menus[namespaces[o.selector]];
          } catch (e) {
            menus[namespaces[o.selector]] = null;
          }

          $document.off(namespaces[o.selector]);
        }
        break;

      case "html5":
        // if <command> or <menuitem> are not handled by the browser,
        // or options was a bool true,
        // initialize $.contextMenu for them
        if (
          (!$.support.htmlCommand && !$.support.htmlMenuitem) ||
          (typeof options == "boolean" && options)
        ) {
          $('menu[type="context"]')
            .each(function () {
              if (this.id) {
                $.contextMenu({
                  selector: "[contextmenu=" + this.id + "]",
                  items: $.contextMenu.fromMenu(this)
                });
              }
            })
            .css("display", "none");
        }
        break;

      default:
        throw new Error('Unknown operation "' + operation + '"');
    }

    return this;
  };

  // import values into <input> commands
  $.contextMenu.setInputValues = function (opt, data) {
    if (data === undefined) {
      data = {};
    }

    $.each(opt.inputs, function (key, item) {
      switch (item.type) {
        case "text":
        case "textarea":
          item.value = data[key] || "";
          break;

        case "checkbox":
          item.selected = data[key] ? true : false;
          break;

        case "radio":
          item.selected = (data[item.radio] || "") == item.value ? true : false;
          break;

        case "select":
          item.selected = data[key] || "";
          break;
      }
    });
  };

  // export values from <input> commands
  $.contextMenu.getInputValues = function (opt, data) {
    if (data === undefined) {
      data = {};
    }

    $.each(opt.inputs, function (key, item) {
      switch (item.type) {
        case "text":
        case "textarea":
        case "select":
          data[key] = item.$input.val();
          break;

        case "checkbox":
          data[key] = item.$input.prop("checked");
          break;

        case "radio":
          if (item.$input.prop("checked")) {
            data[item.radio] = item.value;
          }
          break;
      }
    });

    return data;
  };

  // find <label for="xyz">
  function inputLabel(node) {
    return (node.id && $('label[for="' + node.id + '"]').val()) || node.name;
  }

  // convert <menu> to items object
  function menuChildren(items, $children, counter) {
    if (!counter) {
      counter = 0;
    }

    $children.each(function () {
      var $node = $(this),
        node = this,
        nodeName = this.nodeName.toLowerCase(),
        label,
        item;

      // extract <label><input>
      if (nodeName == "label" && $node.find("input, textarea, select").length) {
        label = $node.text();
        $node = $node.children().first();
        node = $node.get(0);
        nodeName = node.nodeName.toLowerCase();
      }

      /*
       * <menu> accepts flow-content as children. that means <embed>, <canvas> and such are valid menu items.
       * Not being the sadistic kind, $.contextMenu only accepts:
       * <command>, <menuitem>, <hr>, <span>, <p> <input [text, radio, checkbox]>, <textarea>, <select> and of course <menu>.
       * Everything else will be imported as an html node, which is not interfaced with contextMenu.
       */

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#concept-command
      switch (nodeName) {
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/interactive-elements.html#the-menu-element
        case "menu":
          item = {
            name: $node.attr("label"),
            items: {}
          };
          counter = menuChildren(item.items, $node.children(), counter);
          break;

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-a-element-to-define-a-command
        case "a":
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-button-element-to-define-a-command
        case "button":
          item = {
            name: $node.text(),
            disabled: !!$node.attr("disabled"),
            callback: (function () {
              return function () {
                $node.click();
              };
            })()
          };
          break;

        // http://www.whatwg.org/specs/web-apps/current-work/multipage/commands.html#using-the-command-element-to-define-a-command

        case "menuitem":
        case "command":
          switch ($node.attr("type")) {
            case undefined:
            case "command":
            case "menuitem":
              item = {
                name: $node.attr("label"),
                disabled: !!$node.attr("disabled"),
                callback: (function () {
                  return function () {
                    $node.click();
                  };
                })()
              };
              break;

            case "checkbox":
              item = {
                type: "checkbox",
                disabled: !!$node.attr("disabled"),
                name: $node.attr("label"),
                selected: !!$node.attr("checked")
              };
              break;

            case "radio":
              item = {
                type: "radio",
                disabled: !!$node.attr("disabled"),
                name: $node.attr("label"),
                radio: $node.attr("radiogroup"),
                value: $node.attr("id"),
                selected: !!$node.attr("checked")
              };
              break;

            default:
              item = undefined;
          }
          break;

        case "hr":
          item = "-------";
          break;

        case "input":
          switch ($node.attr("type")) {
            case "text":
              item = {
                type: "text",
                name: label || inputLabel(node),
                disabled: !!$node.attr("disabled"),
                value: $node.val()
              };
              break;

            case "checkbox":
              item = {
                type: "checkbox",
                name: label || inputLabel(node),
                disabled: !!$node.attr("disabled"),
                selected: !!$node.attr("checked")
              };
              break;

            case "radio":
              item = {
                type: "radio",
                name: label || inputLabel(node),
                disabled: !!$node.attr("disabled"),
                radio: !!$node.attr("name"),
                value: $node.val(),
                selected: !!$node.attr("checked")
              };
              break;

            default:
              item = undefined;
              break;
          }
          break;

        case "select":
          item = {
            type: "select",
            name: label || inputLabel(node),
            disabled: !!$node.attr("disabled"),
            selected: $node.val(),
            options: {}
          };
          $node.children().each(function () {
            item.options[this.value] = $(this).text();
          });
          break;

        case "textarea":
          item = {
            type: "textarea",
            name: label || inputLabel(node),
            disabled: !!$node.attr("disabled"),
            value: $node.val()
          };
          break;

        case "label":
          break;

        default:
          item = {
            type: "html",
            html: $node.clone(true)
          };
          break;
      }

      if (item) {
        counter++;
        items["key" + counter] = item;
      }
    });

    return counter;
  }

  // convert html5 menu
  $.contextMenu.fromMenu = function (element) {
    var $this = $(element),
      items = {};

    menuChildren(items, $this.children());

    return items;
  };

  // make defaults accessible
  $.contextMenu.defaults = defaults;
  $.contextMenu.types = types;
  // export internal functions - undocumented, for hacking only!
  $.contextMenu.handle = handle;
  $.contextMenu.op = op;
  $.contextMenu.menus = menus;
})(jQuery);

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
})(this, function (mustache) {
  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;

  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  var nonSpaceRe = /\S/;

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray =
    Array.isArray ||
    function (object) {
      return Object_toString.call(object) === "[object Array]";
    };

  function isFunction(object) {
    return typeof object === "function";
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error("Invalid tags: " + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices,
   * respectively, of the token in the original template.
   *
   * Tokens that are the root node of a subtree contain two more elements: 1) an
   * array of tokens in the subtree and 2) the index in the original template at
   * which the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || "";

    if (typeof tags === "string") {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = []; // Stack to hold section tokens
    var tokens = []; // Buffer to hold the tokens
    var spaces = []; // Indices of whitespace tokens on the current line
    var hasTag = false; // Is there a {{tag}} on the current line?
    var nonSpace = false; // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(["text", chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === "\n") {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || "name";
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === "=") {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === "{") {
        value = scanner.scanUntil(
          new RegExp("\\s*" + escapeRegExp("}" + tags[1]))
        );
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = "&";
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error("Unclosed tag at " + scanner.pos);
      }

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === "#" || type === "^") {
        sections.push(token);
      } else if (type === "/") {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error(
            'Unclosed section "' + openSection[1] + '" at ' + start
          );
        }
      } else if (type === "name" || type === "{" || type === "&") {
        nonSpace = true;
      } else if (type === "=") {
        // Set the tags for the next time around.
        tagRes = escapeTags((tags = value.split(spaceRe)));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error(
        'Unclosed section "' + openSection[1] + '" at ' + scanner.pos
      );
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === "text" && lastToken && lastToken[0] === "text") {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case "#":
        case "^":
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case "/":
          section = sections.pop();
          section[5] = token[2];
          collector =
            sections.length > 0
              ? sections[sections.length - 1][4]
              : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re),
      match;

    switch (index) {
      case -1:
        match = this.tail;
        this.tail = "";
        break;
      case 0:
        match = "";
        break;
      default:
        match = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = {
      ".": this.view
    };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf(".") > 0) {
          value = context.view;

          var names = name.split("."),
            i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    var cache = this.cache;
    var tokens = cache[template];

    if (tokens == null) {
      tokens = cache[template] = parseTemplate(template, tags);
    }

    return tokens;
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = view instanceof Context ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (
    tokens,
    context,
    partials,
    originalTemplate
  ) {
    var buffer = "";

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;

    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
        case "#":
          value = context.lookup(token[1]);
          if (!value) continue;

          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += this.renderTokens(
                token[4],
                context.push(value[j]),
                partials,
                originalTemplate
              );
            }
          } else if (typeof value === "object" || typeof value === "string") {
            buffer += this.renderTokens(
              token[4],
              context.push(value),
              partials,
              originalTemplate
            );
          } else if (isFunction(value)) {
            if (typeof originalTemplate !== "string") {
              throw new Error(
                "Cannot use higher-order sections without the original template"
              );
            }

            // Extract the portion of the original template that the section contains.
            value = value.call(
              context.view,
              originalTemplate.slice(token[3], token[5]),
              subRender
            );

            if (value != null) buffer += value;
          } else {
            buffer += this.renderTokens(
              token[4],
              context,
              partials,
              originalTemplate
            );
          }

          break;
        case "^":
          value = context.lookup(token[1]);

          // Use JavaScript's definition of falsy. Include empty arrays.
          // See https://github.com/janl/mustache.js/issues/186
          if (!value || (isArray(value) && value.length === 0)) {
            buffer += this.renderTokens(
              token[4],
              context,
              partials,
              originalTemplate
            );
          }

          break;
        case ">":
          if (!partials) continue;
          value = isFunction(partials)
            ? partials(token[1])
            : partials[token[1]];
          if (value != null)
            buffer += this.renderTokens(
              this.parse(value),
              context,
              partials,
              value
            );
          break;
        case "&":
          value = context.lookup(token[1]);
          if (value != null) buffer += value;
          break;
        case "name":
          value = context.lookup(token[1]);
          if (value != null) buffer += mustache.escape(value);
          break;
        case "text":
          buffer += token[1];
          break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.1";
  mustache.tags = ["{{", "}}"];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
});

/*
 * jQuery Form Plugin; v20140218
 * http://jquery.malsup.com/form/
 * Copyright (c) 2014 M. Alsup; Dual licensed: MIT/GPL
 * https://github.com/malsup/form#copyright-and-license
 */
!(function (a) {
  "use strict";
  "function" == typeof define && define.amd
    ? define(["jquery"], a)
    : a("undefined" != typeof jQuery ? jQuery : window.Zepto);
})(function (a) {
  "use strict";

  function b(b) {
    var c = b.data;
    b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c));
  }

  function c(b) {
    var c = b.target,
      d = a(c);
    if (!d.is("[type=submit],[type=image]")) {
      var e = d.closest("[type=submit]");
      if (0 === e.length) return;
      c = e[0];
    }
    var f = this;
    if (((f.clk = c), "image" == c.type))
      if (void 0 !== b.offsetX) (f.clk_x = b.offsetX), (f.clk_y = b.offsetY);
      else if ("function" == typeof a.fn.offset) {
        var g = d.offset();
        (f.clk_x = b.pageX - g.left), (f.clk_y = b.pageY - g.top);
      } else
        (f.clk_x = b.pageX - c.offsetLeft), (f.clk_y = b.pageY - c.offsetTop);
    setTimeout(function () {
      f.clk = f.clk_x = f.clk_y = null;
    }, 100);
  }

  function d() {
    if (a.fn.ajaxSubmit.debug) {
      var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
      window.console && window.console.log
        ? window.console.log(b)
        : window.opera && window.opera.postError && window.opera.postError(b);
    }
  }
  var e = {};
  (e.fileapi = void 0 !== a("<input type='file'/>").get(0).files),
    (e.formdata = void 0 !== window.FormData);
  var f = !!a.fn.prop;
  (a.fn.attr2 = function () {
    if (!f) return this.attr.apply(this, arguments);
    var a = this.prop.apply(this, arguments);
    return (a && a.jquery) || "string" == typeof a
      ? a
      : this.attr.apply(this, arguments);
  }),
    (a.fn.ajaxSubmit = function (b) {
      function c(c) {
        var d,
          e,
          f = a.param(c, b.traditional).split("&"),
          g = f.length,
          h = [];
        for (d = 0; g > d; d++)
          (f[d] = f[d].replace(/\+/g, " ")),
            (e = f[d].split("=")),
            h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
        return h;
      }

      function g(d) {
        for (var e = new FormData(), f = 0; f < d.length; f++)
          e.append(d[f].name, d[f].value);
        if (b.extraData) {
          var g = c(b.extraData);
          for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1]);
        }
        b.data = null;
        var h = a.extend(!0, {}, a.ajaxSettings, b, {
          contentType: !1,
          processData: !1,
          cache: !1,
          type: i || "POST"
        });
        b.uploadProgress &&
          (h.xhr = function () {
            var c = a.ajaxSettings.xhr();
            return (
              c.upload &&
                c.upload.addEventListener(
                  "progress",
                  function (a) {
                    var c = 0,
                      d = a.loaded || a.position,
                      e = a.total;
                    a.lengthComputable && (c = Math.ceil((d / e) * 100)),
                      b.uploadProgress(a, d, e, c);
                  },
                  !1
                ),
              c
            );
          }),
          (h.data = null);
        var j = h.beforeSend;
        return (
          (h.beforeSend = function (a, c) {
            (c.data = b.formData ? b.formData : e), j && j.call(this, a, c);
          }),
          a.ajax(h)
        );
      }

      function h(c) {
        function e(a) {
          var b = null;
          try {
            a.contentWindow && (b = a.contentWindow.document);
          } catch (c) {
            d("cannot get iframe.contentWindow document: " + c);
          }
          if (b) return b;
          try {
            b = a.contentDocument ? a.contentDocument : a.document;
          } catch (c) {
            d("cannot get iframe.contentDocument: " + c), (b = a.document);
          }
          return b;
        }

        function g() {
          function b() {
            try {
              var a = e(r).readyState;
              d("state = " + a),
                a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50);
            } catch (c) {
              d("Server abort: ", c, " (", c.name, ")"),
                h(A),
                w && clearTimeout(w),
                (w = void 0);
            }
          }
          var c = l.attr2("target"),
            f = l.attr2("action"),
            g = "multipart/form-data",
            j = l.attr("enctype") || l.attr("encoding") || g;
          x.setAttribute("target", o),
            (!i || /post/i.test(i)) && x.setAttribute("method", "POST"),
            f != m.url && x.setAttribute("action", m.url),
            m.skipEncodingOverride ||
              (i && !/post/i.test(i)) ||
              l.attr({
                encoding: "multipart/form-data",
                enctype: "multipart/form-data"
              }),
            m.timeout &&
              (w = setTimeout(function () {
                (v = !0), h(z);
              }, m.timeout));
          var k = [];
          try {
            if (m.extraData)
              for (var n in m.extraData)
                m.extraData.hasOwnProperty(n) &&
                  (a.isPlainObject(m.extraData[n]) &&
                  m.extraData[n].hasOwnProperty("name") &&
                  m.extraData[n].hasOwnProperty("value")
                    ? k.push(
                        a(
                          '<input type="hidden" name="' +
                            m.extraData[n].name +
                            '">'
                        )
                          .val(m.extraData[n].value)
                          .appendTo(x)[0]
                      )
                    : k.push(
                        a('<input type="hidden" name="' + n + '">')
                          .val(m.extraData[n])
                          .appendTo(x)[0]
                      ));
            m.iframeTarget || q.appendTo("body"),
              r.attachEvent
                ? r.attachEvent("onload", h)
                : r.addEventListener("load", h, !1),
              setTimeout(b, 15);
            try {
              x.submit();
            } catch (p) {
              var s = document.createElement("form").submit;
              s.apply(x);
            }
          } finally {
            x.setAttribute("action", f),
              x.setAttribute("enctype", j),
              c ? x.setAttribute("target", c) : l.removeAttr("target"),
              a(k).remove();
          }
        }

        function h(b) {
          if (!s.aborted && !F) {
            if (
              ((E = e(r)),
              E || (d("cannot access response document"), (b = A)),
              b === z && s)
            )
              return s.abort("timeout"), y.reject(s, "timeout"), void 0;
            if (b == A && s)
              return (
                s.abort("server abort"),
                y.reject(s, "error", "server abort"),
                void 0
              );
            if ((E && E.location.href != m.iframeSrc) || v) {
              r.detachEvent
                ? r.detachEvent("onload", h)
                : r.removeEventListener("load", h, !1);
              var c,
                f = "success";
              try {
                if (v) throw "timeout";
                var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                if (
                  (d("isXml=" + g),
                  !g &&
                    window.opera &&
                    (null === E.body || !E.body.innerHTML) &&
                    --G)
                )
                  return (
                    d("requeing onLoad callback, DOM not available"),
                    setTimeout(h, 250),
                    void 0
                  );
                var i = E.body ? E.body : E.documentElement;
                (s.responseText = i ? i.innerHTML : null),
                  (s.responseXML = E.XMLDocument ? E.XMLDocument : E),
                  g && (m.dataType = "xml"),
                  (s.getResponseHeader = function (a) {
                    var b = {
                      "content-type": m.dataType
                    };
                    return b[a.toLowerCase()];
                  }),
                  i &&
                    ((s.status = Number(i.getAttribute("status")) || s.status),
                    (s.statusText =
                      i.getAttribute("statusText") || s.statusText));
                var j = (m.dataType || "").toLowerCase(),
                  k = /(json|script|text)/.test(j);
                if (k || m.textarea) {
                  var l = E.getElementsByTagName("textarea")[0];
                  if (l)
                    (s.responseText = l.value),
                      (s.status = Number(l.getAttribute("status")) || s.status),
                      (s.statusText =
                        l.getAttribute("statusText") || s.statusText);
                  else if (k) {
                    var o = E.getElementsByTagName("pre")[0],
                      p = E.getElementsByTagName("body")[0];
                    o
                      ? (s.responseText = o.textContent
                          ? o.textContent
                          : o.innerText)
                      : p &&
                        (s.responseText = p.textContent
                          ? p.textContent
                          : p.innerText);
                  }
                } else
                  "xml" == j &&
                    !s.responseXML &&
                    s.responseText &&
                    (s.responseXML = H(s.responseText));
                try {
                  D = J(s, j, m);
                } catch (t) {
                  (f = "parsererror"), (s.error = c = t || f);
                }
              } catch (t) {
                d("error caught: ", t), (f = "error"), (s.error = c = t || f);
              }
              s.aborted && (d("upload aborted"), (f = null)),
                s.status &&
                  (f =
                    (s.status >= 200 && s.status < 300) || 304 === s.status
                      ? "success"
                      : "error"),
                "success" === f
                  ? (m.success && m.success.call(m.context, D, "success", s),
                    y.resolve(s.responseText, "success", s),
                    n && a.event.trigger("ajaxSuccess", [s, m]))
                  : f &&
                    (void 0 === c && (c = s.statusText),
                    m.error && m.error.call(m.context, s, f, c),
                    y.reject(s, "error", c),
                    n && a.event.trigger("ajaxError", [s, m, c])),
                n && a.event.trigger("ajaxComplete", [s, m]),
                n && !--a.active && a.event.trigger("ajaxStop"),
                m.complete && m.complete.call(m.context, s, f),
                (F = !0),
                m.timeout && clearTimeout(w),
                setTimeout(function () {
                  m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(),
                    (s.responseXML = null);
                }, 100);
            }
          }
        }
        var j,
          k,
          m,
          n,
          o,
          q,
          r,
          s,
          t,
          u,
          v,
          w,
          x = l[0],
          y = a.Deferred();
        if (
          ((y.abort = function (a) {
            s.abort(a);
          }),
          c)
        )
          for (k = 0; k < p.length; k++)
            (j = a(p[k])),
              f ? j.prop("disabled", !1) : j.removeAttr("disabled");
        if (
          ((m = a.extend(!0, {}, a.ajaxSettings, b)),
          (m.context = m.context || m),
          (o = "jqFormIO" + new Date().getTime()),
          m.iframeTarget
            ? ((q = a(m.iframeTarget)),
              (u = q.attr2("name")),
              u ? (o = u) : q.attr2("name", o))
            : ((q = a('<iframe name="' + o + '" src="' + m.iframeSrc + '" />')),
              q.css({
                position: "absolute",
                top: "-1000px",
                left: "-1000px"
              })),
          (r = q[0]),
          (s = {
            aborted: 0,
            responseText: null,
            responseXML: null,
            status: 0,
            statusText: "n/a",
            getAllResponseHeaders: function () {},
            getResponseHeader: function () {},
            setRequestHeader: function () {},
            abort: function (b) {
              var c = "timeout" === b ? "timeout" : "aborted";
              d("aborting upload... " + c), (this.aborted = 1);
              try {
                r.contentWindow.document.execCommand &&
                  r.contentWindow.document.execCommand("Stop");
              } catch (e) {}
              q.attr("src", m.iframeSrc),
                (s.error = c),
                m.error && m.error.call(m.context, s, c, b),
                n && a.event.trigger("ajaxError", [s, m, c]),
                m.complete && m.complete.call(m.context, s, c);
            }
          }),
          (n = m.global),
          n && 0 === a.active++ && a.event.trigger("ajaxStart"),
          n && a.event.trigger("ajaxSend", [s, m]),
          m.beforeSend && m.beforeSend.call(m.context, s, m) === !1)
        )
          return m.global && a.active--, y.reject(), y;
        if (s.aborted) return y.reject(), y;
        (t = x.clk),
          t &&
            ((u = t.name),
            u &&
              !t.disabled &&
              ((m.extraData = m.extraData || {}),
              (m.extraData[u] = t.value),
              "image" == t.type &&
                ((m.extraData[u + ".x"] = x.clk_x),
                (m.extraData[u + ".y"] = x.clk_y))));
        var z = 1,
          A = 2,
          B = a("meta[name=csrf-token]").attr("content"),
          C = a("meta[name=csrf-param]").attr("content");
        C && B && ((m.extraData = m.extraData || {}), (m.extraData[C] = B)),
          m.forceSync ? g() : setTimeout(g, 10);
        var D,
          E,
          F,
          G = 50,
          H =
            a.parseXML ||
            function (a, b) {
              return (
                window.ActiveXObject
                  ? ((b = new ActiveXObject("Microsoft.XMLDOM")),
                    (b.async = "false"),
                    b.loadXML(a))
                  : (b = new DOMParser().parseFromString(a, "text/xml")),
                b &&
                b.documentElement &&
                "parsererror" != b.documentElement.nodeName
                  ? b
                  : null
              );
            },
          I =
            a.parseJSON ||
            function (a) {
              return window.eval("(" + a + ")");
            },
          J = function (b, c, d) {
            var e = b.getResponseHeader("content-type") || "",
              f = "xml" === c || (!c && e.indexOf("xml") >= 0),
              g = f ? b.responseXML : b.responseText;
            return (
              f &&
                "parsererror" === g.documentElement.nodeName &&
                a.error &&
                a.error("parsererror"),
              d && d.dataFilter && (g = d.dataFilter(g, c)),
              "string" == typeof g &&
                ("json" === c || (!c && e.indexOf("json") >= 0)
                  ? (g = I(g))
                  : ("script" === c || (!c && e.indexOf("javascript") >= 0)) &&
                    a.globalEval(g)),
              g
            );
          };
        return y;
      }
      if (!this.length)
        return (
          d("ajaxSubmit: skipping submit process - no element selected"), this
        );
      var i,
        j,
        k,
        l = this;
      "function" == typeof b
        ? (b = {
            success: b
          })
        : void 0 === b && (b = {}),
        (i = b.type || this.attr2("method")),
        (j = b.url || this.attr2("action")),
        (k = "string" == typeof j ? a.trim(j) : ""),
        (k = k || window.location.href || ""),
        k && (k = (k.match(/^([^#]+)/) || [])[1]),
        (b = a.extend(
          !0,
          {
            url: k,
            success: a.ajaxSettings.success,
            type: i || a.ajaxSettings.type,
            iframeSrc: /^https/i.test(window.location.href || "")
              ? "javascript:false"
              : "about:blank"
          },
          b
        ));
      var m = {};
      if ((this.trigger("form-pre-serialize", [this, b, m]), m.veto))
        return (
          d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
        );
      if (b.beforeSerialize && b.beforeSerialize(this, b) === !1)
        return (
          d("ajaxSubmit: submit aborted via beforeSerialize callback"), this
        );
      var n = b.traditional;
      void 0 === n && (n = a.ajaxSettings.traditional);
      var o,
        p = [],
        q = this.formToArray(b.semantic, p);
      if (
        (b.data && ((b.extraData = b.data), (o = a.param(b.data, n))),
        b.beforeSubmit && b.beforeSubmit(q, this, b) === !1)
      )
        return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
      if ((this.trigger("form-submit-validate", [q, this, b, m]), m.veto))
        return (
          d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this
        );
      var r = a.param(q, n);
      o && (r = r ? r + "&" + o : o),
        "GET" == b.type.toUpperCase()
          ? ((b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + r),
            (b.data = null))
          : (b.data = r);
      var s = [];
      if (
        (b.resetForm &&
          s.push(function () {
            l.resetForm();
          }),
        b.clearForm &&
          s.push(function () {
            l.clearForm(b.includeHidden);
          }),
        !b.dataType && b.target)
      ) {
        var t = b.success || function () {};
        s.push(function (c) {
          var d = b.replaceTarget ? "replaceWith" : "html";
          a(b.target)[d](c).each(t, arguments);
        });
      } else b.success && s.push(b.success);
      if (
        ((b.success = function (a, c, d) {
          for (var e = b.context || this, f = 0, g = s.length; g > f; f++)
            s[f].apply(e, [a, c, d || l, l]);
        }),
        b.error)
      ) {
        var u = b.error;
        b.error = function (a, c, d) {
          var e = b.context || this;
          u.apply(e, [a, c, d, l]);
        };
      }
      if (b.complete) {
        var v = b.complete;
        b.complete = function (a, c) {
          var d = b.context || this;
          v.apply(d, [a, c, l]);
        };
      }
      var w = a("input[type=file]:enabled", this).filter(function () {
          return "" !== a(this).val();
        }),
        x = w.length > 0,
        y = "multipart/form-data",
        z = l.attr("enctype") == y || l.attr("encoding") == y,
        A = e.fileapi && e.formdata;
      d("fileAPI :" + A);
      var B,
        C = (x || z) && !A;
      b.iframe !== !1 && (b.iframe || C)
        ? b.closeKeepAlive
          ? a.get(b.closeKeepAlive, function () {
              B = h(q);
            })
          : (B = h(q))
        : (B = (x || z) && A ? g(q) : a.ajax(b)),
        l.removeData("jqxhr").data("jqxhr", B);
      for (var D = 0; D < p.length; D++) p[D] = null;
      return this.trigger("form-submit-notify", [this, b]), this;
    }),
    (a.fn.ajaxForm = function (e) {
      if (
        ((e = e || {}),
        (e.delegation = e.delegation && a.isFunction(a.fn.on)),
        !e.delegation && 0 === this.length)
      ) {
        var f = {
          s: this.selector,
          c: this.context
        };
        return !a.isReady && f.s
          ? (d("DOM not ready, queuing ajaxForm"),
            a(function () {
              a(f.s, f.c).ajaxForm(e);
            }),
            this)
          : (d(
              "terminating; zero elements found by selector" +
                (a.isReady ? "" : " (DOM not ready)")
            ),
            this);
      }
      return e.delegation
        ? (a(document)
            .off("submit.form-plugin", this.selector, b)
            .off("click.form-plugin", this.selector, c)
            .on("submit.form-plugin", this.selector, e, b)
            .on("click.form-plugin", this.selector, e, c),
          this)
        : this.ajaxFormUnbind()
            .bind("submit.form-plugin", e, b)
            .bind("click.form-plugin", e, c);
    }),
    (a.fn.ajaxFormUnbind = function () {
      return this.unbind("submit.form-plugin click.form-plugin");
    }),
    (a.fn.formToArray = function (b, c) {
      var d = [];
      if (0 === this.length) return d;
      var f,
        g = this[0],
        h = this.attr("id"),
        i = b ? g.getElementsByTagName("*") : g.elements;
      if (
        (i && !/MSIE 8/.test(navigator.userAgent) && (i = a(i).get()),
        h &&
          ((f = a(":input[form=" + h + "]").get()),
          f.length && (i = (i || []).concat(f))),
        !i || !i.length)
      )
        return d;
      var j, k, l, m, n, o, p;
      for (j = 0, o = i.length; o > j; j++)
        if (((n = i[j]), (l = n.name), l && !n.disabled))
          if (b && g.clk && "image" == n.type)
            g.clk == n &&
              (d.push({
                name: l,
                value: a(n).val(),
                type: n.type
              }),
              d.push(
                {
                  name: l + ".x",
                  value: g.clk_x
                },
                {
                  name: l + ".y",
                  value: g.clk_y
                }
              ));
          else if (((m = a.fieldValue(n, !0)), m && m.constructor == Array))
            for (c && c.push(n), k = 0, p = m.length; p > k; k++)
              d.push({
                name: l,
                value: m[k]
              });
          else if (e.fileapi && "file" == n.type) {
            c && c.push(n);
            var q = n.files;
            if (q.length)
              for (k = 0; k < q.length; k++)
                d.push({
                  name: l,
                  value: q[k],
                  type: n.type
                });
            else
              d.push({
                name: l,
                value: "",
                type: n.type
              });
          } else
            null !== m &&
              "undefined" != typeof m &&
              (c && c.push(n),
              d.push({
                name: l,
                value: m,
                type: n.type,
                required: n.required
              }));
      if (!b && g.clk) {
        var r = a(g.clk),
          s = r[0];
        (l = s.name),
          l &&
            !s.disabled &&
            "image" == s.type &&
            (d.push({
              name: l,
              value: r.val()
            }),
            d.push(
              {
                name: l + ".x",
                value: g.clk_x
              },
              {
                name: l + ".y",
                value: g.clk_y
              }
            ));
      }
      return d;
    }),
    (a.fn.formSerialize = function (b) {
      return a.param(this.formToArray(b));
    }),
    (a.fn.fieldSerialize = function (b) {
      var c = [];
      return (
        this.each(function () {
          var d = this.name;
          if (d) {
            var e = a.fieldValue(this, b);
            if (e && e.constructor == Array)
              for (var f = 0, g = e.length; g > f; f++)
                c.push({
                  name: d,
                  value: e[f]
                });
            else
              null !== e &&
                "undefined" != typeof e &&
                c.push({
                  name: this.name,
                  value: e
                });
          }
        }),
        a.param(c)
      );
    }),
    (a.fn.fieldValue = function (b) {
      for (var c = [], d = 0, e = this.length; e > d; d++) {
        var f = this[d],
          g = a.fieldValue(f, b);
        null === g ||
          "undefined" == typeof g ||
          (g.constructor == Array && !g.length) ||
          (g.constructor == Array ? a.merge(c, g) : c.push(g));
      }
      return c;
    }),
    (a.fieldValue = function (b, c) {
      var d = b.name,
        e = b.type,
        f = b.tagName.toLowerCase();
      if (
        (void 0 === c && (c = !0),
        c &&
          (!d ||
            b.disabled ||
            "reset" == e ||
            "button" == e ||
            (("checkbox" == e || "radio" == e) && !b.checked) ||
            (("submit" == e || "image" == e) && b.form && b.form.clk != b) ||
            ("select" == f && -1 == b.selectedIndex)))
      )
        return null;
      if ("select" == f) {
        var g = b.selectedIndex;
        if (0 > g) return null;
        for (
          var h = [],
            i = b.options,
            j = "select-one" == e,
            k = j ? g + 1 : i.length,
            l = j ? g : 0;
          k > l;
          l++
        ) {
          var m = i[l];
          if (m.selected) {
            var n = m.value;
            if (
              (n ||
                (n =
                  m.attributes &&
                  m.attributes.value &&
                  !m.attributes.value.specified
                    ? m.text
                    : m.value),
              j)
            )
              return n;
            h.push(n);
          }
        }
        return h;
      }
      return a(b).val();
    }),
    (a.fn.clearForm = function (b) {
      return this.each(function () {
        a("input,select,textarea", this).clearFields(b);
      });
    }),
    (a.fn.clearFields = a.fn.clearInputs = function (b) {
      var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
      return this.each(function () {
        var d = this.type,
          e = this.tagName.toLowerCase();
        c.test(d) || "textarea" == e
          ? (this.value = "")
          : "checkbox" == d || "radio" == d
          ? (this.checked = !1)
          : "select" == e
          ? (this.selectedIndex = -1)
          : "file" == d
          ? /MSIE/.test(navigator.userAgent)
            ? a(this).replaceWith(a(this).clone(!0))
            : a(this).val("")
          : b &&
            ((b === !0 && /hidden/.test(d)) ||
              ("string" == typeof b && a(this).is(b))) &&
            (this.value = "");
      });
    }),
    (a.fn.resetForm = function () {
      return this.each(function () {
        ("function" == typeof this.reset ||
          ("object" == typeof this.reset && !this.reset.nodeType)) &&
          this.reset();
      });
    }),
    (a.fn.enable = function (a) {
      return (
        void 0 === a && (a = !0),
        this.each(function () {
          this.disabled = !a;
        })
      );
    }),
    (a.fn.selected = function (b) {
      return (
        void 0 === b && (b = !0),
        this.each(function () {
          var c = this.type;
          if ("checkbox" == c || "radio" == c) this.checked = b;
          else if ("option" == this.tagName.toLowerCase()) {
            var d = a(this).parent("select");
            b &&
              d[0] &&
              "select-one" == d[0].type &&
              d.find("option").selected(!1),
              (this.selected = b);
          }
        })
      );
    }),
    (a.fn.ajaxSubmit.debug = !1);
});
/*
 *
 * Copyright (c) 2010 C. F., Wong (<a href="http://cloudgen.w0ng.hk">Cloudgen Examplet Store</a>)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * Modified to not use $.browser by Ryalth
 *
 */
(function ($, len, createRange, duplicate) {
  $.fn.caret = function (options, opt2) {
    var start,
      end,
      t = this[0],
      oldBrowser = window.getSelection ? false : true;
    if (
      typeof options === "object" &&
      typeof options.start === "number" &&
      typeof options.end === "number"
    ) {
      start = options.start;
      end = options.end;
    } else if (typeof options === "number" && typeof opt2 === "number") {
      start = options;
      end = opt2;
    } else if (typeof options === "string") {
      if ((start = t.value.indexOf(options)) > -1) end = start + options[len];
      else start = null;
    } else if (Object.prototype.toString.call(options) === "[object RegExp]") {
      var re = options.exec(t.value);
      if (re != null) {
        start = re.index;
        end = start + re[0][len];
      }
    }
    if (typeof start != "undefined") {
      if (oldBrowser) {
        var selRange = this[0].createTextRange();
        selRange.collapse(true);
        selRange.moveStart("character", start);
        selRange.moveEnd("character", end - start);
        selRange.select();
      } else {
        this[0].selectionStart = start;
        this[0].selectionEnd = end;
      }
      this[0].focus();
      return this;
    } else {
      // Modification as suggested by Андрей Юткин
      if (oldBrowser) {
        var selection = document.selection;
        if (this[0].tagName.toLowerCase() != "textarea") {
          var val = this.val(),
            range = selection[createRange]()[duplicate]();
          range.moveEnd("character", val[len]);
          var s = range.text == "" ? val[len] : val.lastIndexOf(range.text);
          range = selection[createRange]()[duplicate]();
          range.moveStart("character", -val[len]);
          var e = range.text[len];
        } else {
          var range = selection[createRange](),
            stored_range = range[duplicate]();
          stored_range.moveToElementText(this[0]);
          stored_range.setEndPoint("EndToEnd", range);
          var s = stored_range.text[len] - range.text[len],
            e = s + range.text[len];
        }
        // End of Modification
      } else {
        var s = t.selectionStart,
          e = t.selectionEnd;
      }
      var te = t.value.substring(s, e);
      return {
        start: s,
        end: e,
        text: te,
        replace: function (st) {
          return (
            t.value.substring(0, s) + st + t.value.substring(e, t.value[len])
          );
        }
      };
    }
  };
})(jQuery, "length", "createRange", "duplicate");
/*
 * jQuery autoResize (textarea auto-resizer)
 * @copyright James Padolsey http://james.padolsey.com
 * @version 1.04
 */

(function ($) {
  $.fn.autoResize = function (options) {
    // Just some abstracted details,
    // to make plugin users happy:
    var settings = $.extend(
      {
        onResize: function () {},
        animate: true,
        animateDuration: 150,
        animateCallback: function () {},
        extraSpace: 20,
        limit: 1000
      },
      options
    );

    // Only textarea's auto-resize:
    this.filter("textarea").each(function () {
      // Get rid of scrollbars and disable WebKit resizing:
      var textarea = $(this).css({
          resize: "none",
          "overflow-y": "hidden"
        }),
        // Cache original height, for use later:
        origHeight = textarea.height(),
        // Need clone of textarea, hidden off screen:
        clone = (function () {
          // Properties which may effect space taken up by chracters:
          var props = [
              "height",
              "width",
              "lineHeight",
              "textDecoration",
              "letterSpacing"
            ],
            propOb = {};

          // Create object of styles to apply:
          $.each(props, function (i, prop) {
            propOb[prop] = textarea.css(prop);
          });

          // Clone the actual textarea removing unique properties
          // and insert before original textarea:
          return textarea
            .clone()
            .removeAttr("id")
            .removeAttr("name")
            .css({
              position: "absolute",
              top: 0,
              left: -9999
            })
            .css(propOb)
            .attr("tabIndex", "-1")
            .insertBefore(textarea);
        })(),
        lastScrollTop = null,
        updateSize = function () {
          // Prepare the clone:
          clone
            .height(0)
            .val($(this).val())
            .css("width", textarea.css("width"))
            .scrollTop(10000);

          // Find the height of text:
          var scrollTop =
              Math.max(clone.scrollTop(), origHeight) + settings.extraSpace,
            toChange = $(this).add(clone);

          // Don't do anything if scrollTip hasen't changed:
          if (lastScrollTop === scrollTop) {
            return;
          }
          lastScrollTop = scrollTop;

          // Check for limit:
          if (scrollTop >= settings.limit) {
            $(this).css("overflow-y", "");
            return;
          }

          // Either animate or directly apply height:
          settings.animate && textarea.css("display") === "block"
            ? toChange.stop().animate(
                {
                  height: scrollTop
                },
                settings.animateDuration,
                settings.animateCallback
              )
            : toChange.height(scrollTop);

          // Fire off callback:
          settings.onResize.call(this);
        };

      // Bind namespaced handlers to appropriate events:
      textarea
        .unbind(".dynSiz")
        .bind("keyup.dynSiz", updateSize)
        .bind("keydown.dynSiz", updateSize)
        .bind("change.dynSiz", updateSize);
    });

    // Chain:
    return this;
  };
})(jQuery);
/*!
 * swiped-events.js - v1.1.4
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
!(function (t, e) {
  "use strict";
  "function" != typeof t.CustomEvent &&
    ((t.CustomEvent = function (t, n) {
      n = n || {
        bubbles: !1,
        cancelable: !1,
        detail: void 0
      };
      var a = e.createEvent("CustomEvent");
      return a.initCustomEvent(t, n.bubbles, n.cancelable, n.detail), a;
    }),
    (t.CustomEvent.prototype = t.Event.prototype)),
    e.addEventListener(
      "touchstart",
      function (t) {
        if ("true" === t.target.getAttribute("data-swipe-ignore")) return;
        (s = t.target),
          (r = Date.now()),
          (n = t.touches[0].clientX),
          (a = t.touches[0].clientY),
          (u = 0),
          (i = 0);
      },
      !1
    ),
    e.addEventListener(
      "touchmove",
      function (t) {
        if (!n || !a) return;
        var e = t.touches[0].clientX,
          r = t.touches[0].clientY;
        (u = n - e), (i = a - r);
      },
      !1
    ),
    e.addEventListener(
      "touchend",
      function (t) {
        if (s !== t.target) return;
        var e = parseInt(l(s, "data-swipe-threshold", "20"), 10),
          o = parseInt(l(s, "data-swipe-timeout", "500"), 10),
          c = Date.now() - r,
          d = "",
          p = t.changedTouches || t.touches || [];
        Math.abs(u) > Math.abs(i)
          ? Math.abs(u) > e &&
            c < o &&
            (d = u > 0 ? "swiped-left" : "swiped-right")
          : Math.abs(i) > e &&
            c < o &&
            (d = i > 0 ? "swiped-up" : "swiped-down");
        if ("" !== d) {
          var b = {
            dir: d.replace(/swiped-/, ""),
            xStart: parseInt(n, 10),
            xEnd: parseInt((p[0] || {}).clientX || -1, 10),
            yStart: parseInt(a, 10),
            yEnd: parseInt((p[0] || {}).clientY || -1, 10)
          };
          s.dispatchEvent(
            new CustomEvent("swiped", {
              bubbles: !0,
              cancelable: !0,
              detail: b
            })
          ),
            s.dispatchEvent(
              new CustomEvent(d, {
                bubbles: !0,
                cancelable: !0,
                detail: b
              })
            );
        }
        (n = null), (a = null), (r = null);
      },
      !1
    );
  var n = null,
    a = null,
    u = null,
    i = null,
    r = null,
    s = null;

  function l(t, n, a) {
    for (; t && t !== e.documentElement; ) {
      var u = t.getAttribute(n);
      if (u) return u;
      t = t.parentNode;
    }
    return a;
  }
})(window, document);
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function standardAjaxInfo(dataset, options) {
  var flan = $.extend(
    true,
    {
      url: "info.srv",
      type: "get",
      data: {
        dataset: dataset
      }
    },
    options
  );
  return wrapXhrForStandard($.ajax(flan));
}

/** Performs an ajax action, returns a Promise.
 * This rejects if the ajax fails OR if the returned JSON has an
 * error code set
 * This method adds on its own standard fail handler (TODO, make better!, Want to do lazily!)
 *
 * @param {object} options As passed to $.ajax()
 * @param {string} url URL to post to (optional).
 * @returns {Promise} Wrapped promise from $.ajax()
 */
function standardAjaxPost(options, url) {
  $("body").addClass("busy");
  var flan = {
    url: url,
    type: "post",
    data: $.extend(
      true,
      {
        csrf: $("input[name=csrf]").val()
      },
      options
    )
  };
  return wrapXhrForStandard($.ajax(flan))
    .fail(function (error, message) {
      $.jGrowl(error + (message === error ? "" : "\n" + message), {
        sticky: true,
        header: options.data.action + " Failed With Error"
      });
    })
    .always(function () {
      $("body").removeClass("busy");
    });
}

function wrapXhrForStandard(xhr) {
  var jqDeferred = jQuery.Deferred();
  xhr
    .done(function (data) {
      if (data && data.error) {
        jqDeferred.reject(data.error, data.message);
      } else {
        jqDeferred.resolve((data && data.result) || data);
      }
    })
    .fail(function (jqXHR, textStatus, ex) {
      jqDeferred.reject("AJAX_ERROR", textStatus);
    })
    .progress(jqDeferred.notify);
  return jqDeferred.promise();
}

/**
 * Submits a form using jQuery forms plugin but returns a Promise.
 * @param {String|Element} form Selector or element of form to submit.
 * @param {Object} options Options as would be passed to $.ajaxSubmit()
 * @returns {Promise} Promise to be resolved on completion, supports upload progress.
 */
function ajaxSubmitPromise(form, options) {
  var jqDeferred = jQuery.Deferred();
  var opts = $.extend(
    {
      error: jqDeferred.reject,
      success: jqDeferred.resolve,
      uploadProgress: jqDeferred.notify
    },
    options
  );
  $(form).ajaxSubmit(opts);
  return jqDeferred.promise();
}

/**
 * Autocomplete data source function for use with bootstrap-3-typeahead.
 * Loads character names.
 */
function charNameSource(query, process) {
  $.getJSON("info.srv", {
    dataset: "charnames",
    q: query
  }).then(function (data) {
    process(data.result);
  });
}

/**
 * Autocomplete data source function for use with bootstrap-3-typeahead.
 * Loads account names.
 * Note: Secrecy is not security, so its fine if they know this exists.
 */
function accountNameSource(query, process) {
  $.getJSON("info.srv", {
    dataset: "accountnames",
    q: query
  }).then(function (data) {
    process(data.result);
  });
}

// Shim for console.log to prevent crashing of debugging code
if (!("console" in window)) {
  window.console = {
    log: function () {}
  };
}

// Handle AJAX Submit of standard forms.
$(document).on("submit", "form[data-returnto]", function (event) {
  event.preventDefault();
  var $form = $(this);
  var returnTo = $form.data("returnto");
  $form.ajaxSubmit({
    success: function (data) {
      if (data && data.error) {
        alert(
          data.error + (data.message === data.error ? "" : "\n" + data.message)
        );
        // If error indicates which fields are bad, add error state
        if (data.fields)
          $.each(data.fields, function () {
            var $el = $($form.get(0).elements[this]);
            $el.closest(".form-group").addClass("has-error");
          });
      } else if (returnTo === "none") {
        // Don't navigate, but clear out the errors since none failed.
        $form.find(".has-error").removeClass(".has-error");
      } else if (returnTo === "reload") {
        window.location.reload();
      } else {
        window.location = returnTo;
      }
    }
  });
});

/**
 * Rate limits a function call; converts it into a version that will executes
 * the actual function only once {wait} ms after the last time it is called.
 * @param {type} func
 * @param {type} wait
 * @returns {Function}
 */
function debounce(func, wait) {
  return function () {
    var that = this,
      args = [].slice(arguments);
    clearTimeout(func._throttleTimeout);
    func._throttleTimeout = setTimeout(function () {
      func.apply(that, args);
    }, wait);
  };
}

// TODO - Automatic closing of dialog boxes when form submit success
// TODO - Automcatic clearing of dialog box forms when Cancel is pressed (but not auto-dismiss)
// TODO - Better handling of form submission errors - highlight bad fields?

//
// Setup some chat-wide useful things
//
$(document).ready(function () {
  // Text boxes that auto-complete a single character name.
  $(".auto-charname-single").typeahead({
    source: charNameSource
  });

  // Text boxes that auto-complete a single account name.
  $(".auto-accountname-single").typeahead({
    source: accountNameSource
  });

  // Driver code to make button-dropdown based inputs go. (Note, this doesn't support new elements)
  $(".dropdown-menu.combo")
    .on("click", "a", function (evt) {
      var $this = $(this);
      var value = $this.attr("href").substr(1);
      $this
        .parents(".dropdown-menu")
        .parent()
        .children("input")
        .val(value)
        .end()
        .find(".btn-select-current")
        .html($this.html());
      evt.preventDefault();
    })
    .each(function () {
      // Initialize the display with initial value (if any)
      var $this = $(this);
      var $selected = $this.find(
        "a[href='#" + $this.prevAll("input").val() + "']"
      );
      if ($selected.length === 1) {
        $this.parent().find(".btn-select-current").html($selected.html());
      }
    });
});

/** JQuery TabCompletion Plugin
 * Enable "readline" style tab completion on both text inputs and textarea controls.
 * Support custom completion-list function, or use an array.  Maybe internal support
 * for ajax, but eh, just do your completion function people.
 * @author Ryalth
 */
(function ($) {
  var defaultOptions = {
    open: null,
    error: null,
    events: {}
  };

  function CompletionState(domElement, options) {
    this.el = domElement;
    this.getMatches = options.matchFunction;
  }

  CompletionState.prototype = {
    el: null,
    tabInProgress: false,
    tabBase: null,
    afterBase: "",
    lastHitIdx: -1,
    lastSpace: -1,
    matches: null
  };

  CompletionState.prototype.reset = function reset() {
    this.tabInProgress = false;
    this.tabBase = null;
    this.afterBase = "";
    this.matches = null;
    this.lastHitIdx = -1;
    this.lastSpace = -1;
  };

  /**
   * complete.  For now we only support matching at the end of the input string.
   * @param arg1
   */
  CompletionState.prototype.complete = function complete() {
    var text = this.el.value;
    if (!this.tabInProgress) {
      var caret = $(this.el).caret();

      // Find the last space to determine the last word
      var lastWord;
      this.lastSpace = text.lastIndexOf(" ", caret.end - 1);
      //console.debug(caret, text, this.lastSpace);

      if (text.length < 1) {
        return; // Text is empty, nothing to match
      } else if (this.lastSpace < 0) {
        lastWord = text.substring(0, caret.end); // No space, only one word; so last word is all.
      } else if (
        this.lastSpace >= caret.end - 1 ||
        ++this.lastSpace >= text.length
      ) {
        return; // Text ends with a space, so last word is empty. no match.
      } else {
        lastWord = text.substring(this.lastSpace, caret.end || text.length); // Take everything after space.
      }

      this.tabBase = lastWord.toLowerCase();
      this.tabInProgress = true;

      // Save what was after our word, if anything, for replacement time
      if (caret.end < text.length) {
        this.afterBase = text.substring(caret.end, text.length);
      }
    }

    if (!this.matches) {
      var matchList = this.getMatches(text, this.tabBase);

      // Handle no matches
      if (!matchList || matchList.length == 0) {
        // Todo call the no-match callback.
        this.reset();
        return;
      } else {
        this.matches = matchList;
        this.lastHitIdx = -1; // Set before the first result.
      }
    }

    // Increment to next result
    if (++this.lastHitIdx >= this.matches.length) this.lastHitIdx = 0;
    var replacement = this.matches[this.lastHitIdx];

    // Perform the replacement
    if (this.lastSpace >= 1) {
      this.el.value =
        text.substring(0, this.lastSpace) + replacement + this.afterBase;
      $(this.el).caret(
        replacement.length + this.lastSpace,
        replacement.length + this.lastSpace
      );
    } else {
      this.el.value = replacement + this.afterBase;
      $(this.el).caret(replacement.length, replacement.length);
    }
  };

  var methods = {
    init: function (options) {
      // Apply the init function to
      return this.each(function () {
        var $this = $(this);
        var state = $this.data("tabcomplete");
        if (state) return; // Already initialized.

        state = new CompletionState(this, options);
        $this.data("tabcomplete", state);

        $this.bind("keydown", function (evt) {
          var keyCode = evt.which;
          if (keyCode == 9) {
            // Tab was pressed.  Handle completion and don't tab out of the box.
            state.complete();
            evt.preventDefault();
            return false;
          } else {
            state.reset();
            return true;
          }
        });
      });
    }
  };

  $.fn.tabcomplete = function tabcomplete(methodName) {
    // Adapted from jQuery site, looks reasonable, lets use it.
    if (typeof methodName === "object" || !methodName) {
      // Handle case of no args or passing options to init.
      return methods.init.apply(this, arguments);
    } else if (methods[methodName]) {
      // Handle case of calling one of our methods TODO - None exist yet!
      return methods[methodName].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else {
      return $.error("Method " + method + " does not exist on jQuery.tooltip");
    }
  };
})(jQuery);

/**
 * Chat Pane jQuery plugin, which handles the appending and auto-scrolling in a much nicer way.
 */

(function ($) {
  var ChatPane = function (element, options) {
    this.$chatPane = $(element);
    this.options = $.extend({}, ChatPane.DEFAULT_OPTIONS, options);

    // Get refrences to it!
    if (this.options.pauseButton) {
      this.$pauseButton = $(this.options.pauseButton);

      // We add event listeners manually to avoid having to double-find. (Could be done if needed tho)
      var thisChatPane = this;
      this.$pauseButton.on("click.rya.chatpane", function () {
        thisChatPane.toggle();
      });
      this.$chatPane.on("scroll.rya.chatpane", function () {
        thisChatPane.toggle(
          this.scrollTop + $(this).height() - this.scrollHeight < -40
        );
      });
    } else {
      this.$pauseButton = $(); // To avoid nulls
    }
  };

  ChatPane.DEFAULT_OPTIONS = {
    pauseScrolling: false
  };

  ChatPane.prototype.append = function appendToChatPane($msg) {
    this.$chatPane.append($msg);
    this.scroll();
  };

  ChatPane.prototype.scroll = function scrollToBottom() {
    if (!this.pauseScrolling) {
      this.$chatPane.scrollTop(this.$chatPane.get(0).scrollHeight);
    }
  };

  ChatPane.prototype.toggle = function toggleAutoScroll(newValue) {
    if (typeof newValue == "undefined") newValue = !this.pauseScrolling;
    if (this.pauseScrolling === newValue) return; // Already the same

    this.pauseScrolling = !!newValue;

    if (this.pauseScrolling) {
      this.$pauseButton.val(">").addClass("paused");
    } else {
      this.$pauseButton.val("| |").removeClass("paused");
      this.scroll();
    }
  };

  ChatPane.prototype.setbg = function setBackgroundImage(url) {
    this.$chatPane.css({
      backgroundImage: url
        ? 'linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.9)), url("' +
          url +
          '")'
        : ""
    });
  };

  function Plugin(command) {
    var cmdargs = Array.prototype.slice.call(arguments, 1);
    return this.each(function () {
      var $this = $(this);
      var data = $this.data("rya.chatpane");
      if (!data)
        $this.data("rya.chatpane", (data = new ChatPane(this, $this.data())));
      if (typeof command == "string") data[command].apply(data, cmdargs);
    });
  }

  $.fn.chatpane = Plugin;

  // TODO - Someday do real data API. For now just the easy way.

  $(document).ready(function () {
    $("#chat-pane").chatpane();
  });
})(jQuery);

/* global wrapXhrForStandard */

var COMMAND_HANDLERS = {
  invite: function handleInvite(evt) {
    standardAjaxAction({
      data: {
        action: "inviteToGroupChat",
        groupId: evt.$msgTargetCtl.val(),
        charName: evt.args[0]
      }
    })
      .fail(function (error, message) {
        $.jGrowl(error + "\n" + message, {
          sticky: true,
          header: "Error Inviting To Group"
        });
      })
      .done(function () {
        evt.$bodyCtl.val("");
      });
    return false;
  },

  look: function handleLook(evt) {
    if (!evt.args[0]) {
      return "Usage: /look CharacterName"; // Argument required
    }
    evt.$bodyCtl.val("");
    openCharacterProfile(evt.args[0]);
    return false;
  },

  room: function handleLook(evt) {
    if (!evt.args[0]) {
      return "Usage: /room RoomId"; // Argument required
    }
    standardAjaxAction({
      data: {
        action: "changeRoom",
        roomId: evt.args[0]
      }
    });
    evt.$bodyCtl.val("");
    return false;
  },

  pub: function handlePub(evt) {
    if (!evt.args[0] || !evt.args[1]) {
      return "Usage: /pub CharacterName Message";
    }
    wrapXhrForStandard(
      $.post("pubAction.srv", {
        action: "sendPub",
        fromCharName: me.name,
        toCharName: evt.args[0],
        subject: "QuickPub",
        body: evt.args.slice(1).join(" ")
      })
    ).done(function () {
      evt.$bodyCtl.val("");
    });
    return false;
  },

  broadcast: function handleBroadcast(evt) {
    if (!evt.args[0]) {
      return "Usage: /broadcast Message"; // Argument required
    }
    wrapXhrForStandard(
      $.post("modAction.srv", {
        action: "sendBroadcast",
        body: evt.args.join(" ")
      })
    ).done(function () {
      evt.$bodyCtl.val("");
    });
    return false;
  },

  who: function handleWho(evt) {
    if (!evt.args[0]) {
      return "Usage: /who CharacterName";
    }
    wrapXhrForStandard(
      $.get("info.srv", {
        dataset: "charinfo",
        charName: evt.args[0]
      })
    ).done(function (charData) {
      $.jGrowl(charData.accountName, {
        header: "Account of " + charData.charName
      });
      evt.$bodyCtl.val("");
    });
    return false;
  },

  list: function handleList(evt) {
    if (!evt.args[0]) {
      return "Usage: /list AccountName";
    }
    return handleListAndOnline(evt, false);
  },

  online: function handleList(evt) {
    if (!evt.args[0]) {
      return "Usage: /online AccountName";
    }
    return handleListAndOnline(evt, true);
  }
};

/**
 * Handle shared code between /list and /online, which are both quite similar.
 * @param {type} evt
 * @param {type} onlineOnly
 * @returns {Boolean}
 */
function handleListAndOnline(evt, onlineOnly) {
  wrapXhrForStandard(
    $.get("adminInfo.srv", {
      dataset: "getCharactersByAccount",
      accountName: evt.args[0],
      onlineOnly: onlineOnly ? "true" : "false"
    })
  ).done(function (charList) {
    var $ul = $("<ul class='list-unstyled'>");
    $.each(charList, function () {
      $("<li>")
        .append(
          $("<a target='_blank'>")
            .text(this.charName)
            .attr("href", "../../profile/" + this.charName)
        )
        .appendTo($ul);
    });
    $.jGrowl($ul, {
      header: (onlineOnly ? "Online " : "") + "Characters of " + evt.args[0]
    });
    evt.$bodyCtl.val("");
  });
  return false;
}

var MAIN_CHAT_COMMANDS = {
  "chatcommand.look": COMMAND_HANDLERS.look,
  "chatcommand.room": COMMAND_HANDLERS.room,
  "chatcommand.pub": COMMAND_HANDLERS.pub,
  "chatcommand.broadcast": COMMAND_HANDLERS.broadcast
};

var HOVER_CHAT_COMMANDS = {
  "chatcommand.look": COMMAND_HANDLERS.look,
  "chatcommand.invite": COMMAND_HANDLERS.invite,
  "chatcommand.pub": COMMAND_HANDLERS.pub
};
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* global Mustache, tabCompleteMatch, TITLE_ALERT */

(function ($) {
  //
  // Hover Box System
  //

  // Tab Global variables
  var tabLabelTemplate, tabContentTemplate;
  var mainWindow, addTabTab, activeWindow;
  var $tabContainer, $contentContainer;
  var wWindows;

  /**
   * Easy reference to a hoverbox. Created lazily.
   * @param {type} leash ChatTarget id string.
   * @returns {HoverBoxSystem}
   */
  function HoverBoxSystem(leash) {
    if (typeof leash === "object") {
      return wWindows[leash.leash] || new HoverBox(leash);
    } else {
      return (
        wWindows[leash] ||
        new HoverBox({
          leash: leash
        })
      );
    }
  }
  window.HoverBoxSystem = HoverBoxSystem;

  /**
   * Static method to send message to hoverbox system.
   *
   * @param {type} $msg ChatMessage jQuery object.
   */
  HoverBoxSystem.routeToPane = function routeToPane($msg) {
    var convoHandle = $msg.attr("leash");
    var wWin = wWindows[convoHandle] || mainWindow;
    wWin.appendToChatPane($msg);
  };

  HoverBoxSystem._serializeOpenTabs = function _serializeOpenTabs() {
    var result = [];
    for (var leash in wWindows) {
      if (leash === "!main") continue;
      else
        result.push({
          leash: leash,
          type: wWindows[leash].type,
          title: wWindows[leash].title
        });
    }
    return result;
  };

  HoverBoxSystem.saveOpenTabs = function saveOpenTabs(prefix) {
    if ("sessionStorage" in window) {
      sessionStorage.setItem(
        prefix + ".savedHoverBoxes",
        JSON.stringify(HoverBoxSystem._serializeOpenTabs())
      );
    }
  };

  HoverBoxSystem.loadSavedTabs = function loadSavedTabs(prefix) {
    if ("sessionStorage" in window) {
      try {
        var tabDataJSON = sessionStorage.getItem(prefix + ".savedHoverBoxes");
        if (tabDataJSON) {
          $.each($.parseJSON(tabDataJSON), function () {
            HoverBoxSystem(this).create();
          });
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  function HoverBox(options) {
    $.extend(this, options);
  }

  HoverBox.prototype.exists = function exists() {
    return wWindows[this.leash] === this;
  };

  HoverBox.prototype.active = function active() {
    return this.$tab ? this.$tab.hasClass("active") : false;
  };

  HoverBox.prototype.create = function createChatTab(options) {
    if (!this.exists()) {
      $.extend(this, options);
      this.title = this.title || this.leash;
      this.safeLeash = this.leash.replace(":", "");
      this.groupchat = !!(this.type === "groupchat");
      this.whisper = !this.groupchat;

      this.$tab = $($.parseHTML(Mustache.render(tabLabelTemplate, this)));
      this.$tab.data("hbox", this);
      this.$tabContent = $(
        $.parseHTML(Mustache.render(tabContentTemplate, this))
      );
      this.$chatPane = this.$tabContent.children(".hb-chat-pane");

      // Put it in the appropriate spot
      $tabContainer.append(this.$tab);
      $contentContainer.append(this.$tabContent);

      var e = $.Event("created.hbox", {});
      this.$tab.trigger(e);
      if (!e.isDefaultPrevented()) {
        // Scoop messages from main chat pane into here
        mainWindow.$chatPane
          .children("[leash='" + this.leash + "']")
          .appendTo(this.$chatPane);
        this.$chatPane.chatpane("scroll");
        this.$tabContent.find(".sender-body").tabcomplete({
          matchFunction: tabCompleteMatch
        });
      }

      wWindows[this.leash] = this;
      layoutEntirePage();
    }
    return this;
  };

  /** Append a message to this hoverbox's chat pane. */
  HoverBox.prototype.appendToChatPane = function appendToChatPane($msg) {
    this.$chatPane.append($msg);
    this.$chatPane.chatpane("scroll");

    if (!this.$tab.hasClass("active")) {
      this.$tab.addClass("flash");
    }

    if (
      window.isFocused === false &&
      this !== mainWindow &&
      document.title.substr(0, TITLE_ALERT.length) !== TITLE_ALERT
    ) {
      document.title = TITLE_ALERT + document.title;
    }

    return this;
  };

  HoverBox.prototype.show = function show(options) {
    this.$tab.children("[data-toggle=tab]").tab("show");
    return this;
  };

  /** Destroy this tab. */
  HoverBox.prototype.close = function closeTab() {
    var e = $.Event("closing.hbox", {});
    this.$tab.trigger(e);
    if (!e.isDefaultPrevented()) {
      mergeMessagesIntoChat(
        mainWindow.$chatPane,
        this.$chatPane.children(".chatmsg").remove().toArray()
      );
    }

    // Close the tab
    var $cleanup = $([this.$tab.get(0), this.$tabContent.get(0)]);
    if (this.$tab.hasClass("active")) {
      $("#main-tab")
        .one("shown.bs.tab", function () {
          $cleanup.remove();
        })
        .tab("show");
    } else {
      $cleanup.remove();
    }
    delete wWindows[this.leash];
    layoutEntirePage();
    return this;
  };

  window.initChatTabs = function initChatTabs() {
    // Load templates
    tabLabelTemplate = $("#hb-tab-template").html().trim();
    tabContentTemplate = $("#hb-panel-template").html().trim();

    // Containers
    $tabContainer = $("#tabs-pane");
    $contentContainer = $("#hover-box");

    // Data for the two special tabs.
    mainWindow = {
      leash: "*",
      $tab: $("#main-tab"),
      $chatPane: $("#chat-pane"),
      $tabContent: $("#main-tab-placeholder"),
      appendToChatPane: function ($msg) {
        appendToChatPane(mainWindow.$chatPane, $msg);
      }
    };
    wWindows = {
      "!main": mainWindow
    };

    //
    //  Tab Events
    //

    // TODO - Check if .proper-hide is necessary
    var $collapser = $("#hover-box");

    $("#tabs-pane")
      .on("show.bs.tab.hbox", "#main-tab", function (event) {
        $collapser.slideUp(150);
      })
      .on("shown.bs.tab.hbox", function (event) {
        if (event.target.id !== "main-tab") {
          if (!$collapser.get(0).style.height)
            $collapser.height($("#chat-pane").height() / 2); // Default height to half
          $collapser.slideDown(300);
          // Scroll the chat window all the way down, becuase scroll-while-hidden does not work.
          $(event.target).parent().data("hbox").$chatPane.chatpane("scroll");
        }
      })
      .on("shown.bs.tab.hbox", function (event) {
        // Do the actual stuff about what happens when a new tab is activated!
        var $tab = $(event.target);
        $tab.parent("li").removeClass("flash");
        if (event.target.id === "main-tab") $("#main-sender-body").focus();
        else $($tab.attr("href")).find("[name=body]").focus();
      })
      .on("click.hbox", "[role=tab]:not(#main-tab)", function (event) {
        $($(this).parent().hasClass("active") ? "#main-tab" : this).tab("show");
        event.preventDefault();
        event.stopPropagation();
      })
      .on("click.hbox", ".close", function (event) {
        var tab = $(this).closest("li").data("hbox");
        tab && tab.close();
        event.preventDefault();
        event.stopPropagation();
      });
  };
})(jQuery);

/* global sounds, Mustache, TITLE_ALERT */

// Global variable
//var lastMsgId, me, ses, sounds;

/**
 * Handle message incoming from server.
 * @param {type} i Unused
 * @param {type} msg Message from server.
 * @returns {undefined}
 */
function handleMessage(i, msg) {
  lastMsgId = Math.max(lastMsgId, parseInt(msg.id));

  switch (msg.type) {
    case "ROOM_CHAT":
    case "WHISPER_CHAT":
    case "GROUP_CHAT":
      handleChatMessage(msg);
      break;
    case "DEL_MESSAGE":
      handleDeleteMessage(msg);
      break;
    case "CHANGE_ROOM":
      handleChangeRoom(msg);
      break;
    case "USERLIST_UPDATE":
      handleUserlistUpdate(msg);
      break;
    case "USERLIST_REMOVE":
      handleUserlistRemove(msg);
      break;
    case "LAST_EVENT_ID":
      lastMsgId = parseInt(msg.id);
      break;
    case "GROUPCHAT_JOINED":
      handleGroupchatJoined(msg);
      break;
    case "GROUPCHAT_LEFT":
      handleGroupchatLeft(msg);
      break;
    case "PRAGMA":
      handlePragma(msg);
      break;
    default:
      // TODO
      // $chatPane.append($("<p>Unhandled " + msg.type + " message</p>").attr("title", JSON.stringify(msg, null, " ")));
      break;
  }
}
function handleChatMessage(msg) {
  if (ses.ignored[msg.from.id]) return; // Bail out early if we're ignoring them.

  var $msg = renderChatMessage(msg);

  // Open hoverboxes automatically if settings say to do so.
  if (me.settings.autoHoverWhispers && msg.type === "WHISPER_CHAT") {
    if (msg.fromMe) {
      HoverBoxSystem({
        leash: msg.to.name,
        type: "whisper",
        title: msg.to.name
      }).create();
    } else {
      HoverBoxSystem({
        leash: msg.from.name,
        type: "whisper",
        title: msg.from.name
      }).create();
    }
  } else if (me.settings.autoHoverGroups && msg.type === "GROUP_CHAT") {
    HoverBoxSystem({
      leash: msg.toLeash,
      type: "groupchat",
      title: msg.to.name
    }).create();
  }

  HoverBoxSystem.routeToPane($msg);

  // Play sound if necessary
  if (msg.fromMe === false && msg.type === "WHISPER_CHAT") {
    if (me.settings.enableSound && sounds.whisper) sounds.whisper.play();
  } else if ($msg.hasClass("highlight")) {
    if (me.settings.enableSound && sounds.highlighted)
      sounds.highlighted.play();
  } else if ($msg.hasClass("nameding")) {
    if (me.settings.enableSound && sounds.nameding) sounds.nameding.play();
  } else if (msg.fromMe === false) {
    if (me.settings.enableSound && sounds.received) sounds.received.play();
  }

  // Add the title alert if window is not focused.
  if (
    window.isFocused === false &&
    ($msg.hasClass("highlight") || $msg.hasClass("nameding")) &&
    document.title.substr(0, TITLE_ALERT.length) !== TITLE_ALERT
  ) {
    document.title = TITLE_ALERT + document.title;
  }
}
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ The rendering of messages has been heavily modified to hack in the eyecon contextual menu
░ ║ along with replies, reply button rendering, and the moving of the delete button. 
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
function renderChatMessage(msg) {
  msg.fromMe = msg.from.id === me.charId;
  msg.toMe = msg.to.id === me.charId;
  msg.classes = msg.classes || [];
  /*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Here we create template elements for the eyecon contextual menu (info)
░ ║ Mustache seems to explode if we try to inject html, so we're using match.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  var msgUserStatus = document.querySelector(
    '#ulist-itself > tbody > tr[data-cid="' +
      msg.from.id +
      '"] > td:first-child > span'
  );
  msgUserStatus = msgUserStatus
    ? msgUserStatus.outerHTML
    : '<span class="icon status-online" title></span>';
  var msgReply = '<span class="reply" title="Reply">⟲</span>';
  var msgDelete = '<span class="msg-delete" title="Delete">✕</span>';
  if (ses.ignored[msg.from.id]) {
    return $(); // Ignore mesages from ignored people.
  }
  if (ses.highlighted[msg.from.id]) {
    msg.classes.push("highlight");
  }

  // Name highlighting / ding
  if (msg.fromMe === false && msg.body.match(me.nameRegex)) {
    msg.body = msg.body.replace(me.nameRegex, "<b>$&</b>");
    msg.classes.push("nameding");
  }
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Mint adds the zero-width empty space character to all messages. This is where we detect that.
░ ║ This is how we can pass data across instances within the chat functionality.
░ ║ Knowing a user is using Mint is useful as users can decide whether to use a mint-rendered feature.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  if (msg.body.includes("\u200B")) {
    msg.infoClass = "mint";
  }
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ We add obscure characters to later replace for the status, reply, and delete contextuals.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  msg.info = "◙S⟲R";
  if (msg.classes.includes("deletable")) {
    msg.info += "𝕏x";
  }
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Render shorthands to emoji
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  var emoji = new EmojiConvertor();
  emoji.replace_mode = "unified";
  msg.body = emoji.replace_colons(msg.body);

/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ We detect the reply structure and build the anchor button.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  if (msg.body.includes("⟲")) {
    var regex = /⟲\s*([^:]+)\s*:(msg\d+)║/;
    var match = msg.body.match(regex);

    if (match) {
      var name = match[1];
      var messageId = match[2];

      // Create a reply button
      var replyButton =
        '<button type="button" class="btn btn-default anchor" data-go="' +
        messageId +
        '" title="Replying to ' +
        name +
        '">⤼ ' +
        name +
        "</button>";

      // Insert the button into the message
      msg.body = replyButton + msg.body;

      // Remove the original text string from the message
      msg.body = msg.body.replace(
        new RegExp("⟲\\s*" + name + "\\s*:" + messageId + "║"),
        ""
      );
    }
  }
  /*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Add line breaks. We only replace one instance.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/	
 const minWordCount = 10; // Adjust this value based on your requirement
if (msg.body.split(/\s+/).length >= minWordCount) {
  msg.body = msg.body.replace(/\|\|\|/, "<br><br>").replace(/\|\|\|/, "<br><br>").replace(/\|\|\|/, "<br><br>");
} else {
  msg.body = msg.body.replace(/\|\|\|/, " ").replace(/\|\|\|/, " ").replace(/\|\|\|/, " ");
}
  var tmplName = "msg-" + msg.type + (msg.fromMe ? "-from-me" : "-to-me");
  var template = $("#" + tmplName).html();
  var rendered = Mustache.render(template, msg);
  var $msg = $($.parseHTML(rendered)).data("msg", msg);

  // For whispers, the leash of the chat pane is the name, not leashId
  var tabId = msg.toLeash || "";
  if (tabId.substr(0, 10) === "CHARACTER:") {
    tabId = msg.fromMe ? msg.to.name : msg.from.name; // Handle whisper special case
  }
  $msg.attr("leash", tabId);
  /*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ After the mustache has been rendered we hack in our contextuals
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  $msg.html($msg.html().replace("◙S", msgUserStatus));
  $msg.html($msg.html().replace("⟲R", msgReply));
  $msg.html($msg.html().replace("𝕏x", msgDelete));
  /*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Then we use a dirty method to ensure the reply buttons always work.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
  $(document).off("click", ".anchor");
  $(document).on("click", ".anchor", function () {
    mint_goReply($(this).data("go"));
  });

  return $msg;
}
function mint_goReply(id) {
  var targetBox;
  var $targetMessage = $('#' + id);

  if ($targetMessage.closest('.hb-chat-pane').length > 0) {
    targetBox = $targetMessage.closest('.hb-chat-pane');
  } else {
    targetBox = $('#chat-pane');
  }

  $targetMessage.addClass('flash');
  targetBox.animate({
    scrollTop: $targetMessage.offset().top
  }, 500);

  // Remove 'flash' class after 3 seconds
  setTimeout(function() {
    $targetMessage.removeClass('flash');
  }, 3000);
};
/** Appends the rendered message to the chat pane
 * @param $pane The chat pane to append to
 * @param $msg Rendered message jQuery object.
 */
function appendToChatPane($pane, $msg) {
  $pane.chatpane("append", $msg);
}

/**
 * Simply find the deleted message and remove it.
 * @param {type} msg Message from server.
 * @returns {undefined}
 */
function handleDeleteMessage(msg) {
  var $msg = $("#msg" + msg.deletedMsgId);
  $msg.find(".msg-delete").detach();
  $msg.remove();
}

/**
 * Server notifies us that we have changed to a different room.
 *
 * @param {type} msg Message from server.
 * @returns {undefined}
 */
function handleChangeRoom(msg) {
  ses.roomId = msg.newRoomId;
  $(".room-name").html("Loading&hellip;");
  tempUserListThing();

  // Fetch the initial chat from the server
  standardAjaxInfo("initialchat-room").done(function (result) {
    $chatPane.children("[leash^='ROOM:']").remove();
    applyRoomEntryData(result);

    // Disable current room on room list
    $("#room-list [data-code='" + ses.roomId + "']")
      .parent()
      .siblings()
      .removeClass("disabled")
      .end()
      .addClass("disabled");

    if (me.settings.enableSound && sounds.roomchange) sounds.roomchange.play();
  });
}
function applyMiniHighlight($ule) {
sounds.highlighted.play();	
  setTimeout(function () {
    $ule.removeClass("mini-highlight");
  }, 5000);
}

function mint_processFilters(ule){
  var oldUle = $("#ule" + ule.sessionId)
  var mint_filters_str = localStorage.getItem("mint_filters");
  var mint_filters = mint_filters_str ? JSON.parse(mint_filters_str) : null;
  mint_filters = mint_filters ? JSON.parse(mint_filters) : [];

  // Iterate through each filter in mint_filters
  mint_filters.forEach(function (filter) {
    // Check if ule.sessionId exists in the names prop array

    if (filter.names && filter.names.includes(ule.charName)) {
	    
      // Variables for reference
      var behave1 = filter.behave;
      var behave2 = filter.behave2;
      var caseValue = filter.case;
      var trigger = filter.trigger;
      ule.greyout = "";
      ule.flash = "";
     if(ule.icons){
	    ule.icons = ule.icons + filter.icon
	    } else {
	    ule.icons = filter.icon    
	    }

      switch (caseValue) {
        case 0:
          if ((behave1 === 1 || behave2 === 1)) {
            ule.greyout = 'greyout';
          }

          if ((behave1 === 2 || behave2 === 2) && oldUle.length === 0) {
            ule.flash = 'mini-highlight';
          }

          if ((behave1 === 3 || behave2 === 3) && !ule.highlighted) {
            ule.highlighted = true;
          }

          if ((behave1 === 4 || behave2 === 4) && !ule.ignored) {
            ule.ignored = true;
          }
          break;

        case 1:
        
          if (
            (trigger === 1 && (!ule.status || ule.status === "online")) ||
            (trigger === 2 &&
              (ule.status === "lfrp" ||
                ule.status === "open" ||
                ule.status === "pred" ||
                ule.status === "prey")) ||
            (trigger === 3 && oldUle.length === 0)
          ) {
            if (behave1 === 1 && !ule.highlighted) {
              ule.greyout = 'greyout';
            }

            if (behave1 === 2) {
              ule.flash = 'mini-highlight';
            }

            if (behave1 === 3 && !ule.highlighted) {
              ule.highlighted = true;
            }

            if (behave1 === 4 && !ule.ignored) {
              ule.ignored = true;
            }
          }
          break;
		      case 2:
        
          if (
            (trigger === 1 && (ule.status || !ule.status === "online")) ||
            (trigger === 2 &&
              (!ule.status === "lfrp" ||
                !ule.status === "open" ||
                !ule.status === "pred" ||
                !ule.status === "prey")) ||
            (trigger === 3 && !oldUle.length === 0)
          ) {
            if (behave1 === 1 && !ule.highlighted) {
              ule.greyout = 'greyout';
            }

            if (behave1 === 2) {
              ule.flash = 'mini-highlight';
            }

            if (behave1 === 3 && !ule.highlighted) {
              ule.highlighted = true;
            }

            if (behave1 === 4 && !ule.ignored) {
              ule.ignored = true;
            }
          }
          break;
      }
    }
  });
}
function handleUserlistUpdate(msg) {
  // Currently expecting just one at a time
  var ule = msg.add;
  var $ule = renderUserListEntry(ule);
  var oldUle = $("#ule" + ule.sessionId).replaceWith($ule);
  if (oldUle.length === 0) $("#ulist-itself").append($ule);
  userlistFontShrink.apply($ule);


}

function handleMinimapPinUpdate(pin) {
  if (typeof pin === "string") {
    pin = $.parseJSON(pin);
  }

  var $pin = $("#minimap-container [data-cid=" + pin.charId + "]");
  if ($pin.length === 0)
    $pin = $("<div class='pin'>")
      .attr("data-cid", pin.charId)
      .attr("title", pin.charName)
      .appendTo("#minimap-container");
  $pin
    .attr("title", pin.charName)
    .css({
      borderColor: pin.nameColor,
      left: pin.props["mm.x"] - 3 + "px",
      top: pin.props["mm.y"] - 3 + "px"
    })
    .attr("class", "pin " + (pin.props["mm.shape"] || "circle"));
}

function setupMinimap(isUsing, url, pins) {
  if (isUsing) {
    var $mm = $("#minimap-container").show();
    $mm.css("background-image", "url(" + url + ")");
  } else {
    $("#minimap-container").hide();
  }
}

function setWeather(newState, transitionMessage, newImage, newIcon) {
  console.log("setWeather", newState, transitionMessage, newImage, newIcon);
  appendToChatPane(
    $chatPane,
    $("<p>" + transitionMessage + "</p>").attr("title", newState)
  );
}

function handleUserlistRemove(msg) {
  // Currently expecting just one at a time
  var oldSesId = msg.remove;
  var oldUle = $("#ule" + oldSesId).remove();
}

function handleGroupchatJoined(msg) {
  // Add to the GC list even if NOT us, since obviously we are in it.
  // Note: hack code, not good solution.
  if (
    $("#groupchat-list .groupchat[data-pmtarget='" + msg.groupchat.leash + "']")
      .length === 0
  ) {
    renderGroupchatList([msg.groupchat]);
  }
}

function handleGroupchatLeft(msg) {
  if (msg.leaver.id === me.charId) {
    // I left a group chat evidently, take it off the list.
    $("#groupchat-list .groupchat[data-pmtarget='" + msg.groupchat.leash + "']")
      .closest("li")
      .andSelf()
      .remove();
  }
}

function handlePragma(msg) {
  try {
    var func = window[msg.funcName];
    if (typeof func === "function") {
      func.apply(msg, msg.args);
    }
  } catch (ex) {
    $.jGrowl("" + ex, {
      sticky: true,
      header: "Unexpected Error"
    });
    if (console && console.error) console.error(ex);
  }
}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

// Declaration of external functions in global.js
var standardAjaxInfo, wrapXhrForStandard;
// Declaration of external functions in Mustache.js
var Mustache;
// Declaration of external functions in sound-setup.js
var sounds;
// Declaration of external variables in mainPage-cmds.js
var COMMAND_HANDLERS;
// Declaration of constants
var TITLE_ALERT = "[!] ";

// Actual Global Variables
var $chatPane,
  lastMsgId = 0,
  selectedColor = 1;

function onDocumentReady() {
  // Initialize Global Variables
  $chatPane = $("#chat-pane");

  // Read data from page load
  loadSessionSettings();

  // Setup event handlers
  attachEventHandlers();

  // Initialize the hoverbox system
  initChatTabs();

  // TODO Obviously
  tempUserListThing();

  // Kickoff load of messages
  loadInitialChat();

  //
  //  JavaScript Powered Layout
  //

  $(window).on("resize", debounce(layoutEntirePage, 5));
  $("#main-sender-body").autoResize({
    extraSpace: 0,
    limit: 300,
    onResize: layoutEntirePage
  });
  //$("#main-sender-body").on("keydown change input", function(event) {console.log("resize", event.target); });

  // Final thing
  layoutEntirePage();
}
$(document).ready(onDocumentReady);

/**
 * Loads the session settings from the JSON on the acutal HTML loaded from server.
 * Doing it this way lets us have zero inline javascript, for security.
 * @returns {undefined}
 */
function loadSessionSettings() {
  var rawData = $.parseJSON($("#session-settings").html());
  window.me = rawData.me;
  window.ses = rawData.ses;

  updateSettings(window.me.settings);

  // Set current status icon
  if (ses.status) $("#status-icon").attr("class", "icon status-" + ses.status);

  // Load selected color from browser session storage
  if ("sessionStorage" in window) {
    selectedColor = sessionStorage.getItem(me.name + ".selectedColor") || 1;
  }

  // Setup Minimap
  if (ses.props["usingMinimap"] === "true") {
    setupMinimap(true, ses.props["mm.imgurl"]);
  }
}

/**
 * Apply the user settings to the page, either on first load or when updated.
 * @param {Object} settings
 * @returns {undefined}
 */
function updateSettings(settings) {
  if (typeof settings === "string") {
    settings = $.parseJSON(settings);
  }

  window.me.settings = settings;
  console.info("Settings Updated", settings);

  // Construct nameding pattern
  var pattern = "(\\b" + me.name + "\\b)";
  $.each(me.settings.nameDingPatterns, function () {
    pattern += "|(\\b" + this + "\\b)";
  });
  me.nameRegex = new RegExp(pattern, "gi");

  // Hide/Show Eyecons
  $("body")[me.settings.hideEyecons ? "addClass" : "removeClass"](
    "hide-eyecons"
  );
}

//
//  Utility Methods
//

//<editor-fold defaultstate="collapsed" desc="Utility Methods">

/**
 * Asynchronously performs a standard chat action.
 *
 * @param {type} action Action to perform
 * @param {type} data Parameters to the action.
 * @returns {Promise} Wrapped promise from $.ajax()
 */
function chatAction(action, data) {
  return standardAjaxAction({
    data: $.extend(
      {
        action: action
      },
      data
    )
  });
}

/** Performs an ajax action, returns a Promise.
 * This rejects if the ajax fails OR if the returned JSON has an
 * error code set
 * This method adds on its own standard fail handler (TODO, make better!, Want to do lazily!)
 *
 * @param {type} options As passed to $.ajax()
 * @returns {Promise} Wrapped promise from $.ajax()
 */
function standardAjaxAction(options) {
  $("body").addClass("busy");
  var flan = $.extend(
    true,
    {
      url: "action.srv",
      type: "post",
      data: {
        csrf: me.csrf
      }
    },
    options
  );
  return wrapXhrForStandard($.ajax(flan))
    .fail(function (error, message) {
      // TODO standard error handler!
      $.jGrowl(error + (message === error ? "" : "\n" + message), {
        sticky: true,
        header: options.data.action + " Failed With Error"
      });
    })
    .always(function () {
      $("body").removeClass("busy");
    });
}

/**
 * Open a character's profile in a new window.
 *
 * @param {type} charName Name of the character
 * @returns {undefined}
 */
function openCharacterProfile(charName) {
  window.open("../../profile/" + encodeURIComponent(charName));
}

//</editor-fold>

//
//  Setup Chat Input Boxes
//

//<editor-fold defaultstate="collapsed" desc="Chat Input Box Functionality">

/**
 * Initialize tab completion on the main chat entry box.
 * @param {type} text The full value of the textbox.
 * @param {type} lastWord The word which we are trying to complete.
 * @returns {Array} Array of possible expansions, in order of tabbing.
 */
function tabCompleteMatch(text, lastWord) {
  var retVal = [];

  // If textbox starts with / then autocomplete to chat commands
  if (text[0] === "/" && lastWord === text) {
    var chatCommands = ["/look", "/me", "/msg", "/pub"];
    $.each(chatCommands, function () {
      if (this.indexOf(lastWord) === 0 && retVal.indexOf(name) < 0) {
        retVal.push(this);
      }
    });
  }
  // Otherwise get list of matching names
  else {
    $("#ulist-itself [data-pmtarget]").each(function () {
      var name = $(this).attr("data-pmtarget");
      if (
        name &&
        name.toLowerCase().indexOf(lastWord) === 0 &&
        retVal.indexOf(name) < 0
      ) {
        retVal.push(name);
      }
    });
  }

  return retVal.sort();
}

/** Chat body formatting shortcut keycodes.
 * keyCode --> bbcode element
 */
var FORMATTING_SHORTCUT_KEYS = {
  73: "i",
  85: "u",
  66: "b"
};

/**
 * Handle formatting shortcuts for the chat input boxes.
 * On keydown, insert the proper bbcode element!
 * @param {type} evt Keydown Event
 * @returns {undefined}
 */
function onKeydownBodyFormatting(evt) {
  var replacement = FORMATTING_SHORTCUT_KEYS[evt.which];
  if (replacement && (evt.ctrlKey || evt.metaKey) && !evt.altKey) {
    formattingReplace($(this), replacement);
    evt.preventDefault();
  }
}

/** Based on highlighted text or caret position, insert html for italics/bold/etc.
 * @param $thing Textbox jQuery object.
 * @param letter single letter for html element (i,u,b)
 */
function formattingReplace($thing, letter) {
  var caret = $thing.caret();
  if (caret.start !== caret.end) {
    // highlited mode!
    var op = "[" + letter + "]";
    var ed = "[/" + letter + "]";
    $thing.val(caret.replace(op + caret.text + ed));
    $thing.caret({
      start: caret.start,
      end: caret.end + 7
    });
  } else {
    // Okay, go thru to see if we are starting or ending.
    var text = $thing.val();
    var lastOpen = text.lastIndexOf("[" + letter + "]", caret.start);
    var lastClose = text.lastIndexOf("[/" + letter + "]", caret.start);
    $thing.val(
      caret.replace(
        lastOpen > lastClose ? "[/" + letter + "]" : "[" + letter + "]"
      )
    );
    var newPos = caret.start + (lastOpen > lastClose ? 4 : 3);
    $thing.caret({
      start: newPos,
      end: newPos
    });
  }
}

/**
 * Make pressing enter in textarea submit the form.
 * @param {Event} event Keydown Event
 */
function onEnterPressedInTextarea(event) {
  if (!event.ctrlKey && event.which === 13) {
    $(this.form).trigger("submit");
    event.preventDefault();
  }
}

/**
 * @deprecated This MIGHT be deprecated? Unsure.
 * @param {type} target
 * @param {type} title
 * @returns {undefined}
 */
function setWhisperTarget(target, title) {
  $("#main-sender-form").addClass("whispering");
  $("#main-sender-msgTarget").val(target);
  $("#main-sender-msgTargetName").html(title || target);
  $("#main-sender-body").focus();
}

/**
 * @deprecated This MIGHT be deprecated? Unsure.
 * @returns {undefined}
 */
function clearWhisperTarget() {
  $("#main-sender-form").removeClass("whispering");
  $("#main-sender-msgTarget").val("");
  $("#main-sender-msgTargetName").html("");
  $("#main-sender-body").focus();
}

//</editor-fold>

//
//  Setup Actually Sending Chat Messages
//

//<editor-fold defaultstate="collapsed" desc="Chat Message Sending">

/**
 * Submit handler for chat sender forms.
 *
 * @param {type} event OnSubmit Event
 * @returns {undefined}
 */
function senderOnSubmit(event) {
  var form = this;
  var $bodyCtl = $(this.elements["body"]);
  var $msgTargetCtl = $(this.elements["msgTarget"]);
  event.preventDefault();

  // Handle browsers (Chrome) which don't block submit while disabled.
  if (form.disabled) {
    return;
  } else if ($bodyCtl.val() === "") {
    return; // Don't bother proceeding if input box is empty.
  } else if (
    $bodyCtl.val()[0] !== "/" ||
    handleChatCommands($bodyCtl.val(), form, $bodyCtl, $msgTargetCtl)
  ) {
    sendMessage(form, $bodyCtl, $msgTargetCtl);
  }
}

/**
 * Handle client-side chat commands.
 *
 * @param {type} body
 * @param {type} form
 * @param {type} $bodyCtl
 * @param {type} $msgTargetCtl
 * @returns {Boolean} Return true to continue sending to server, false if handled.
 */
function handleChatCommands(body, form, $bodyCtl, $msgTargetCtl) {
  var parts = body.split(" ");
  var cmd = parts[0];
  if (!cmd || cmd === "/me" || cmd === "//") {
    return true; // Not a real command, ignore
  }
  cmd = cmd.substr(1);

  var evt = $.Event("chatcommand." + cmd, {
    cmd: cmd.substr(1),
    args: parts.slice(1),
    $bodyCtl: $bodyCtl,
    $msgTargetCtl: $msgTargetCtl
  });

  var handleFunc = COMMAND_HANDLERS[cmd];
  if (typeof handleFunc === "function") {
    var isHandled = handleFunc(evt);
    if (isHandled !== true) evt.preventDefault();
    if (typeof isHandled === "string") {
      // Its an error message, show it
      showChatErrorMessage.call(form, isHandled);
    }
  }

  return !evt.isDefaultPrevented();
}

/**
 * Actually send the chat command to the server.
 *
 * @param {type} form
 * @param {type} $bodyCtl
 * @param {type} $msgTargetCtl
 * @returns {undefined}
 */
function sendMessage(form, $bodyCtl, $msgTargetCtl) {
  var body = $bodyCtl.val();
  var toName = $msgTargetCtl.val();

  // The /msg command is special and is handled client side.
  if (body.substr(0, 5) === "/msg ") {
    var srcParts = body.split(" ");
    toName = srcParts[1];
    body = body.substr(5 + toName.length + 1);
  }

  form.disabled = true; // Disable to prevent double-submits.
  wrapXhrForStandard(
    $.ajax({
      url: "action.srv",
      type: "post",
      data: {
        action: "post",
        msgBody: body,
        msgTarget: toName,
        color: selectedColor,
        csrf: me.csrf
      }
    })
  )
    .fail(function (error, message) {
      // Different error handler than standard for this one.  For some reason.
      showChatErrorMessage.call(form, error, message);
    })
    .done(function () {
      if (me.settings.clearWhisper && form.id === "main-sender-form") {
        clearWhisperTarget();
      }
      $bodyCtl.val("").trigger("change");
      if (me.settings.enableSound && sounds.sent) sounds.sent.play();
    })
    .always(function () {
      form.disabled = false; // Enable now that we have a response.
    });
}

/**
 * Display an error message near the chat sender.
 * The idea is that this message is associated with what the user just tried
 * to send, so the error message will be next to it.
 * @param {string} error
 * @param {string} message
 * @param {number} time
 */
function showChatErrorMessage(error, message, time) {
  var $alert = $(
    '<div role="alert" class="alert alert-warning alert-dismissible fade in">' +
      '<button aria-label="Close" data-dismiss="alert" class="close" type="button">' +
      '<span aria-hidden="true">&times;</span></button></div>'
  );
  $alert.append(
    error + (!!message === false || message === error ? "" : "\n" + message)
  );
  setTimeout(
    function () {
      $alert.alert("close");
    },
    time > 0 ? time : 4000
  );
  $("#errorbox").append($alert);
}

//</editor-fold>

//
//  Chat Fetch Loop
//

//<editor-fold defaultstate="collapsed" desc="Chat Fetch Loop">

function setupMessageFetch() {
  window.errorCount = 0;
  window.leavingPage = false;

  /**
   * Actually attempt to fetch messages from the server.
   * @returns {Promise} Promise from $.ajax()
   */
  function fetchMessages() {
    // We get a little manual here, given how important this one is.
    return $.ajax({
      url: "events.json",
      data: {
        lastEventId: lastMsgId
      },
      dataType: "json",
      cache: false
      //timeout: 45000
    })
      .done(function (data) {
        if (data && data.error && data.error === "NotLoggedIn") {
          // Not logged in... Take care of that and do not fetch again
          onNotLoggedIn(data);
        } else if (data && data.error) {
          // This should never ever happen
          alert(
            "Warning: An impossible error happened. Inform Leshana the server sent: " +
              JSON.stringify(data)
          );
        } else {
          // Set the timeout BEFORE handling, so it is already queued in case of error.
          setTimeout(fetchMessages, 250);
          $.each(data, handleMessage);
        }
      })
      .fail(onFetchError);
  }

  /** Navigating away will abort fetch, but nothing to worry about. */
  $(window).on("beforeunload", function () {
    window.leavingPage = true;
    // Save current hoverbox configuration to local storage.
    HoverBoxSystem.saveOpenTabs(me.name);
  });

  /**
   * Handle network error during fetch of message events.
   *
   * @param {type} jqXHR
   * @param {type} textStatus
   * @param {type} errorThrown
   * @returns {undefined}
   */
  function onFetchError(jqXHR, textStatus, errorThrown) {
    if (window.leavingPage) return; // Avoid ugly splash of leaving page
    if (console && console.trace) console.trace();

    // Okay we failed to fetch, increment error count
    window.errorCount += 1;

    // Notify user we had the problem
    var $warnMsg = $(
      "<p class='error bg-warning'>Problem connecting to server: " +
        errorThrown +
        " (" +
        textStatus +
        ")</p>"
    );
    appendToChatPane($chatPane, $warnMsg);

    // Check whether to give up or keep trying
    if (window.errorCount > 10) {
      appendToChatPane(
        $chatPane,
        $("<p class='error bg-danger'>Giving up. (Too many failures)</p>")
      );
      return;
    } else {
      var waitSecs = (window.errorCount - 1) * 2;
      $warnMsg.append(
        $("<br><span>Trying again in " + waitSecs + " seconds</span>")
      );
      setTimeout(function () {
        fetchMessages().then(function () {
          $warnMsg.after(
            $("<p class='error bg-success'>Reconnection successful!<p>")
          );
          window.errorCount = 0;
        });
      }, waitSecs * 1000);
    }
  }

  /**
   * Handle being told we are not logged in
   *
   * @param {type} data Error response from server.
   * @returns {undefined}
   */
  function onNotLoggedIn(data) {
    $chatPane.chatpane(
      "append",
      $("<p class='error bg-warning'>" + data.message + "</p>")
    );
  }

  // Actually start the loop
  fetchMessages();
}

function loadInitialChat() {
  // Load initial chat - Fetch initial messages and the enter the main fetch loop
  standardAjaxInfo("initialchat-all")
    .done(function (result) {
      // Handle the unique items we load only at the start
      renderFavColors(result.favColors);
      renderRoomList(result.roomList);
      setUnreadPubCount(result.unreadPubs);
      renderGroupchatList(result.groupchats);

      // All the rest of the data items are shared with the room-specific load
      applyRoomEntryData(result);

      // Start the standard message fetch loop
      setupMessageFetch();

      // Now is the time to open saved hoverboxes if any (so they scoop)
      HoverBoxSystem.loadSavedTabs(me.name);
    })
    .fail(function () {
      $chatPane.chatpane(
        "append",
        $(
          "<div class='alert alert-danger'>Failed to connect to chat server.</div>"
        )
      );
    });
}

/**
 * Handle the recipt of initial chat and environment data on entry to a room.
 * This function is designed to handle the shared behaviors between
 * entry into a room and the one time load on page load/refresh.
 *
 * @param {Object} data Room data from server.
 * @returns {undefined}
 */

/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Minor edit to tell people they're running mint. 
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
function applyRoomEntryData(data) {
  $(".room-name").html(data.roomPrettyName);
  $chatPane.chatpane("setbg", data.roomBgImage);
  renderStatusList(data.statusList);

  mergeMessagesIntoChat(
    $chatPane,
    jQuery.map(data.initialChat, function (msg) {
      return renderChatMessage(msg).get(0);
    })
  );

  if (!lastMsgId) {
    lastMsgId = Math.max(lastMsgId, data.lastMsgId);
  }
  data.motd =
    data.motd +
    "<span style='color:#ccffff'>You're running <span style='color:#54f0be'>mint <span style='color:#ccffff'>" +
    mint_version +
    "</span><br> Thank you for helping test mint, " +
    me.name +
    ". Please give your feedback to Jobix.</span></span>";
  renderMotd(data.motd);
}

/**
 * Render and append the Message of The Day.
 * @param {string} motd Room's welcome MOTD.
 * @returns {undefined}
 */

function renderMotd(motd) {
  appendToChatPane(
    $("#chat-pane"),
    $("<div class='motd'>")
      .attr("id", "srt" + lastMsgId)
      .attr("leash", "ROOM:" + ses.roomId)
      .html(motd)
  );
}

/**
 * Merge rendered chat messages into a message pane, maintaining proper order.
 *
 * @param {type} $chatPane
 * @param {type} $initialChat
 * @returns {undefined}
 */
function mergeMessagesIntoChat($chatPane, $initialChat) {
  // 1 - Get items from main window
  var mainList = $chatPane.children().remove();
  // 2 -- Combine them into one array
  var list = mainList.toArray().concat($initialChat);
  // 3 -- Sort it
  list.sort(function (a, b) {
    if (!a.id || !b.id) return console.log("Error comparing: ", a, b);
    return parseInt(a.id.substring(3)) > parseInt(b.id.substring(3)) ? 1 : -1;
  });
  // 4 -- Put it back into main window
  $chatPane.chatpane("append", list);
}

//</editor-fold>

//
// Environment Setup and Handling
//

//<editor-fold defaultstate="collapsed" desc="Status, Room, and FavColor Setup">

// Room List
function refreshRoomList() {
  standardAjaxInfo("roomlist").done(renderRoomList);
}

function renderRoomList(data) {
  var $roomList = $("#room-list").empty();
  var template =
    '{{#.}}<li><a href="#" data-code="{{id}}">{{{prettyName}}} ({{userCount}})</a></li>{{/.}}';
  var rendered = Mustache.render(template, data);
  $(rendered).appendTo($roomList);
  $("#room-list [data-code='" + ses.roomId + "']")
    .parent()
    .siblings()
    .removeClass("disabled")
    .end()
    .addClass("disabled");
}

function onClickRoomList(event) {
  event.preventDefault();

  var newRoom = $(this).attr("data-code");
  if (newRoom === ses.roomId) {
    event.stopPropagation(); // Don't switch, don't even exit menu
    return;
  }
  chatAction("changeRoom", {
    roomId: newRoom
  });
}

// Fav Colors
function refreshFavColors() {
  standardAjaxInfo("favcolors").then(renderFavColors);
}

function renderFavColors(data) {
  var FAVCOLOR_TEMPLATE =
    '{{#.}}<input type="radio" name="color" id="fc{{id}}" value="{{id}}">' +
    '<label for="fc{{id}}" title="{{name}}" style="background-color: {{color}};">' +
    '{{#eyecon}}<img src="../../img/eyecon/{{.}}">{{/eyecon}}' +
    '{{^eyecon}}<img src="../../img/sys/blank.gif" width="25" height="25">{{/eyecon}}' +
    "</label>{{/.}}";
  var $container = $("#textcolor-select-x").empty();
  var rendered = Mustache.render(FAVCOLOR_TEMPLATE, data);
  $($.parseHTML(rendered)).appendTo($container);
  $container.collapse("show");
  $("label[for=fc" + window.selectedColor + "]").trigger("click");
}

function onClickFavColor() {
  window.selectedColor = $("#" + $(this).attr("for")).val();
  $("#sender-body-color").html(
    ".sender-body{color:" + this.style.backgroundColor + ";}"
  );
  // Save in local storage.
  if ("sessionStorage" in window)
    sessionStorage.setItem(me.name + ".selectedColor", window.selectedColor);
}

// Status List
function refreshStatusList() {
  standardAjaxInfo("statuses").done(renderStatusList);
}

function renderStatusList(data) {
  var $statusList = $("#status-list").empty();
  var template =
    '{{#.}}<li><a href="#" data-code="{{code}}"><i class="icon status-{{code}}"></i> {{{name}}}</a></li>{{/.}}';
  var rendered = Mustache.render(template, data);
  $(rendered).appendTo($statusList);
}

function onClickStatusList(event) {
  var newStatus = $(this).attr("data-code");
  chatAction("setStatus", {
    newStatus: newStatus
  }).done(function () {
    ses.status = newStatus;
    $("#status-icon").attr("class", "icon status-" + ses.status);
  });
  event.preventDefault();
}

/**
 * Render the quick-select list of group-chats.
 * The existing list is NOT cleared by this method.
 *
 * @param {type} data GroupChat data to append.
 * @returns {undefined}
 */
function renderGroupchatList(data) {
  var template =
    '{{#.}}<li><a href="#" class="pmclick groupchat" data-pmtarget="{{leash}}" data-open="groupchat" title="{{name}}"><i class="glyphicons glyphicons-conversation"></i> {{{prettyName}}}</a></li>{{/.}}';

  var rendered = Mustache.render(template, data);
  var $list = $.parseHTML(rendered);
  $("#groupchat-list").append($list);
}

/** Update the visual indicator of unread pubs with the number waiting to be read.
 * @param unreadPubs int Number of unread messages.
 */
function setUnreadPubCount(unreadPubs) {
  $("#unread-pub-count").text(parseInt(unreadPubs) === 0 ? "" : unreadPubs);
}

//</editor-fold>

//
// User List Handling
//

//<editor-fold defaultstate="collapsed" desc="The User List!">

function tempUserListThing() {
  var template = $("#ulist-template").html().trim();
  window.renderUserListEntry = function renderUserListEntry(ule) {
 
  ule.highlighted = ses.highlighted[ule.charId] ? true : false;
    ule.ignored = ses.ignored[ule.charId] ? true : false;

	mint_processFilters(ule)  
    var rendered = Mustache.render(template, ule);
    var $ule = $($.parseHTML(rendered)).data("ule", ule);
	   
  if (!ule.highlighted ) {
    $ule.removeClass("highlighted");
  } else {
    $ule.addClass("highlighted");
  }
  if (!ule.ignored ) {
    $ule.removeClass("ignored");
  } else {
    $ule.addClass("ignored");
  }
   if(ule.flash){
 applyMiniHighlight($ule);
   }
    return $ule;
  };

  standardAjaxInfo("userlist").done(function (result) {
    $("#ulist-itself").empty();
    $.each(result, function (i, ule) {
      var $ule = renderUserListEntry(ule);
      $ule.appendTo("#ulist-itself");
      userlistFontShrink.apply($ule);
      if (ses.props["usingMinimap"]) {
        handleMinimapPinUpdate(ule);
      }
    });
  });

  // For now we update the room counts based on client timer.
  setInterval(refreshRoomList, 60000);
}

/** Adjust the width of userlist entries by reducing name font size.
 * Usage: userlistFontShrink.apply($ule);
 **/
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Edited to only do this if it's disabled in settings.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
function userlistFontShrink() {
var mint_theme = localStorage.getItem("mint_theme");	
	if(mint_theme === 0){
        return this.each(function() {
            var $name = $(this).find(".name");
            while ($name.length === 1 && $name.width() > 83) {
                if (parseFloat($name.css('font-size') <= 3)) break;
                $name.css('font-size', (parseInt($name.css('font-size')) - 1) + 'px');
            }
        });
		
	}

}
/*╔════════════════════════════════════════════════════════════════════════════════════════════════*\
░ ║ Highlight and Ignore have been updated to apply styles to the usertlist entry.
\*╚════════════════════════════════════════════════════════════════════════════════════════════════*/
function onClickHighlight(event) {
  var ele = $(this).parents("tr");
  var ule = ele.data("ule");
  var cid = ule.charId;

  if (ses.highlighted[cid]) {
    ses.highlighted[cid] = false;
    $(this).removeClass("highlighted");
    ele.removeClass("highlighted");
  } else {
    ses.highlighted[cid] = true;
    $(this).addClass("highlighted");
    ele.addClass("highlighted");
  }

  chatAction("highlightCharacter", {
    charId: cid,
    newVal: ses.highlighted[cid]
  });
  event.preventDefault();
}

function onClickIgnore(event) {
  var ele = $(this).parents("tr");
  var ule = ele.data("ule");
  var cid = ule.charId;

  if (ses.ignored[cid]) {
    ses.ignored[cid] = false;
    $(this).removeClass("ignored");
    ele.removeClass("ignored");
  } else {
    ses.ignored[cid] = true;
    $(this).addClass("ignored");
    ele.addClass("ignored");
  }

  chatAction("ignoreCharacter", {
    charId: cid,
    newVal: ses.ignored[cid]
  });
  event.preventDefault();
}

function onClickMinimap(e) {
  var rect = document
    .getElementById("minimap-container")
    .getBoundingClientRect();
  var offsetX = e.clientX - rect.left;
  var offsetY = e.clientY - rect.top;
  chatAction("post", {
    msgBody: "/minimap " + offsetX + " " + offsetY
  });
}

//</editor-fold>

//
//  Hoverbox Controls Handling
//

//<editor-fold defaultstate="collapsed" desc="Hoverbox Controls Handling">

function onClickGroupChatShowMembers(event) {
  event.preventDefault();
  var leash = $(this).closest("[data-leash]").data("leash");
  standardAjaxInfo("groupuserlist", {
    data: {
      leash: leash
    }
  }).then(function (result) {
    var $list = $($(event.target).data("target")).children("ul");
    $list.empty();
    $.each(result, function () {
      $list.append(
        $(
          "<li><a href='#' data-pmtarget='" +
            this.charName +
            "'>" +
            this.prettyName +
            "</a></li>"
        )
      );
    });
  });
}

function onClickHoverBoxLoadHistory(event) {
  event.preventDefault();
  var $this = $(this);
  if ($this.hasClass("loading")) return;
  var $flan = $this.closest(".hb-chat-pane").children(".chatmsg:first");
  var msgId =
    $flan.length > 0 ? $flan.closest(".chatmsg").attr("id").substring(3) : 0;
  var data = {
    leash: $this.data().leash,
    before: msgId
  };
  $this.addClass("loading");
  standardAjaxInfo("scrollback", {
    data: data
  })
    .then(function (results) {
      if (results.length === 0) {
        $this.parent().remove();
        // TODO - Do this after having loaded the last, not when they click next.
      }
      $.each(results, function (i, msg) {
        var $msg = renderChatMessage(msg);
        $this.parent().after($msg);
      });
    })
    .always(function () {
      $this.removeClass("loading");
    });
}

//</editor-fold>

//
//  Context Menu Setup
//

//<editor-fold defaultstate="collapsed" desc="Context Menu Setup">

/**
 * When a context menu is opened, set its title if the triggering element
 * has a title attribute.
 *
 * @param {type} options jQuery.contextMenu options object.
 */
function onContextMenuShow(options) {
  if (this.attr("title")) {
    options.$menu
      .attr("data-menutitle", this.attr("title"))
      .addClass("context-titled");
  }
}

/**
 * This function is called whenever an object is right clicked, and needs
 * to build what the menu options should be for this triggering object
 * @param {type} $trigger Element that was clicked.
 * @param {type} e Event object
 * @returns Menu structure.
 */
function buildObjectContextMenu($trigger, e) {
  // If we right clicked one in the hoverbox, we use a different method.
  var pmTargetFunction = ctxOpenHoverbox;
  var isCharacter = !$trigger.hasClass("groupchat");
  if ($trigger.closest("#hoverbox-pane").length === 1) {
    pmTargetFunction = ctxOpenHoverboxForHoverbox;
    isCharacter = true;
  }

  var items = {};
  if (isCharacter)
    items.profile = {
      name: "Open Profile",
      callback: ctxOpenProfile
    };
  items.opentab = {
    name: "Open Hoverbox",
    callback: pmTargetFunction
  };
  if (isCharacter)
    items.invite = {
      name: "Invite to Groupchat",
      callback: ctxInviteToGroupchat,
      items: buildGroupchatListSubMenu()
    };
  if (isCharacter)
    items.sendpub = {
      name: "Send PUB",
      callback: ctxSendPub
    };
  return {
    items: items
  };
}

function buildGroupchatListSubMenu() {
  var groupChats = [];
  $("#groupchat-list .groupchat").each(function () {
    var gid = $(this).data("pmtarget"); // Pmtarget of groupchat list iem
    groupChats.push({
      name: $(this).attr("title"), // Title of groupchat list item
      callback: function () {
        ctxInviteToGroupchat.call(this, gid); // 'this' is character clicked on.
      }
    });
  });
  return groupChats;
}

/**
 * Handle an "Open Hoverbox" command when target is a message inside a hoverbox.
 * Behavior: Open hoverbox for the character the target message is FROM.
 */
function ctxOpenHoverboxForHoverbox() {
  var msg = $(this).closest(".chatmsg").data("msg");
  var tab = HoverBoxSystem(msg.from.name);
  tab.exists()
    ? tab.show()
    : tab
        .create({
          leash: msg.from.name,
          type: "whisper"
        })
        .show();
}

/**
 * Handle an "Open Hoverbox command when target is... not inside a hoverbox.
 */
function ctxOpenHoverbox() {
  // We force it to open by always assigning a type
  var type = $(this).hasClass("groupchat") ? "groupchat" : "whisper";
  var opts = $(this).data();
  var tab = HoverBoxSystem(opts.pmtarget);
  tab.exists()
    ? tab.show()
    : tab
        .create({
          type: type,
          leash: opts.pmtarget,
          title: opts.pmtitle
        })
        .show();
}

function ctxOpenProfile() {
  openCharacterProfile($(this).attr("data-pmtarget"));
}

function ctxInviteToGroupchat(gid) {
  var target = $(this).attr("data-pmtarget");
  chatAction("inviteToGroupChat", {
    charName: target,
    groupId: gid
  });
}

function ctxSendPub() {
  var target = $(this).attr("data-pmtarget");
  window.open("pub.srv?char=" + me.name + "#sendPub=" + target);
}
//</editor-fold>

//
//  Anything to do with the hoverbox system
//

//<editor-fold defaultstate="collapsed" desc="HoverBoxSystem and GroupChats">

function onClickLeaveGroupChat(event) {
  event.preventDefault();
  var leash = $(this).closest("[data-leash]").data("leash");
  chatAction("leaveGroupChat", {
    groupId: leash
  }).then(function () {
    HoverBoxSystem(leash).close();
  });
}

function onClickPmtargetForGroupchat() {
  var msg = $(this).closest(".chatmsg").data("msg");
  var tab = HoverBoxSystem(msg.from.name);
  tab.exists()
    ? tab.show()
    : tab
        .create({
          leash: msg.from.name,
          type: "whisper"
        })
        .show();
}

function onClickPmtarget() {
  var opts = $(this).data();
  var target = opts.pmtarget;
  var tab = HoverBoxSystem(target);
  if (tab.exists()) {
    tab.show();
  } else if (opts.open) {
    tab
      .create({
        type: opts.open,
        leash: opts.pmtarget,
        title: this.title
      })
      .show();
  } else {
    setWhisperTarget(target, opts.pmtitle);
  }
}

function onSubmitCreateGroupchat(event) {
  event.preventDefault();
  wrapXhrForStandard($(this).ajaxSubmit().data("jqxhr")).then(function () {
    $("#createGroupchatModal").modal("hide");
    event.target.reset();
  });
}
//</editor-fold>

//
//  Event Handler Methods
//

//<editor-fold defaultstate="collapsed" desc="Event Handler Hookup">

/**
 * Actually attach all the event handler methods to the DOM.
 * @returns {undefined}
 */
function attachEventHandlers() {
  // Record when window is focused.
  $(window)
    .on("focus", function () {
      window.isFocused = true;
      // Remove the title alert when you look at the window
      if (document.title.substr(0, TITLE_ALERT.length) === TITLE_ALERT) {
        document.title = document.title.substr(TITLE_ALERT.length);
      }
    })
    .on("blur", function () {
      window.isFocused = false;
    });

  // Handle click of Logout link
  $("#logout-link").on("click", onClickLogoutLink);

  // Handle click on item in room list
  $("#room-list").on("click", "a", onClickRoomList);

  // Handle click on item in status list
  $("#status-list").on("click", "a", onClickStatusList);

  // Handle clicks on fav color
  $("#textcolor-select-x").on("click", "label", onClickFavColor);

  // "My Summary"
  $("#editSummaryModal")
    .on("show.bs.modal", function () {
      standardAjaxInfo("charinfo", {
        data: {
          charName: me.name
        }
      }).then(function (result) {
        $("#editSummaryModal [name=charSummary]").val(result.profileSummary);
      });
    })
    .on("submit", "form", function (event) {
      event.preventDefault();
      wrapXhrForStandard($(this).ajaxSubmit().data("jqxhr")).then(function () {
        $("#editSummaryModal").modal("hide");
      });
    });

  // Admin Help
  $("#adminHelpModal")
    .on("shown.bs.modal", function () {
      $("#reportBody").focus();
    })
    .on("submit", "form", function (event) {
      event.preventDefault();
      wrapXhrForStandard($(this).ajaxSubmit().data("jqxhr")).then(function () {
        $("#adminHelpModal").modal("hide");
        event.target.reset();
      });
    });

  // Create New Groupchat
  $("#createGroupchatModal").on("submit", "form", onSubmitCreateGroupchat);
  $("#groupchat-list").on("click", "[data-pmtarget]", onClickPmtarget);

  //
  // User List
  //

  // Handle toggle of highlight
  $("#ulist-itself").on("click", ".highlight", onClickHighlight);

  // Handle toggle of ignore
  $("#ulist-itself").on("click", ".ignore", onClickIgnore);

  $("#minimap-container").on("click", onClickMinimap);

  // Show/Hide Userlist on swipe. Start shown and hide after a second.
  document.addEventListener("swiped-left", function () {
    $("body").removeClass("hide-userlist");
  });
  document.addEventListener("swiped-right", function () {
    $("body").addClass("hide-userlist");
  });
  setTimeout(function () {
    $("body").addClass("hide-userlist");
  }, 1000);

  //
  //  Events related to input boxes
  //

  // Settings & Controls in Hoverboxes
  $("#hoverbox-pane").on("click", ".leave-groupchat", onClickLeaveGroupChat);
  $("#hoverbox-pane").on("click", ".show-members", onClickGroupChatShowMembers);
  $("#hoverbox-pane").on("click", ".load-history", onClickHoverBoxLoadHistory);

  // Chat submit handlers
  $("#main-sender-form").on("submit", senderOnSubmit);
  $("#hoverbox-pane").on("submit", ".sender-form", senderOnSubmit);

  // Make pressing enter in textarea submit the form.
  $("#main-sender-form, #hoverbox-pane").on(
    "keydown",
    "textarea",
    onEnterPressedInTextarea
  );

  // Keyboard shortcuts for formatting - on all textareas.
  $("#main-sender-form, #hoverbox-pane").on(
    "keydown",
    "[name=body]",
    onKeydownBodyFormatting
  );

  // Tab Completion
  $("#main-sender-body").tabcomplete({
    matchFunction: tabCompleteMatch
  });

  // Auto-hide favcolor the first time we start typing
  $("#main-sender-body").on(
    "input.favcolorbox",
    debounce(function () {
      $("#textcolor-select-x").collapse("hide");
      $(this).off("input.favcolorbox");
    }, 500)
  );

  // Clicking on whisper target box clears it
  $("#main-sender-msgTargetName").on("click", clearWhisperTarget);

  // Recalculate scrolling when window resizes
  $(window).resize(
    debounce(function () {
      // $("textarea[name=body]").trigger("input");
      $chatPane.chatpane("scroll"); // Todo, try to preserve actual
    }, 150)
  );

  // Prevent backspace from navigating away.
  $(document).bind("keydown", function (event) {
    var kCode = event.keyCode || event.which;
    if (!$(event.target).is("input,textarea") && kCode === 8) {
      event.preventDefault();
    }
  });

  // Prevent leaving page if text is in main textbox or focused textbox
  // TODO

  //
  //  Events related to chat messages
  //

  // Setup image hover previews using bootstrap popovers.
  $("body").popover({
    selector: ".image-preview",
    html: true,
    trigger: "hover",
    placement: "auto top"
  });

  // Show the deletion button on eligible messages.
  /*
    var $msgDelBtn = $("<div class='msg-delete' title='Delete'>&times;</div>");
    $(document).on("mouseenter", ".deletable", function() {
        $(this).prepend($msgDelBtn);
    }).on("mouseleave", ".deletable", function() {
        $msgDelBtn.detach();
    });
    */

  // Highlight row on hover, and submit on click of button.
  $(document).on("click", ".msg-delete", function () {
    var msgId = $(this).closest(".chatmsg").attr("id").substring(3);
    if (
      confirm(
        "Are you sure you want to delete the message from " +
          $(".name", this.parentNode).text() +
          "?"
      )
    ) {
      chatAction("deleteMessage", {
        msgId: msgId
      });
    }
  });

  // Clicking spoilers toggles them being hidden.
  $("#chat-pane, #hoverbox-pane").on("click", ".spoiler", function (event) {
    if ($(event.target).is("a")) {
      return; // Don't toggle if we were actually clicking on link
    }
    $(this).toggleClass("revealed");
  });

  //
  //  Handle clicking on character/groupchat names
  //

  // Control+Click on a name opens profile
  $("#chat-pane, #hoverbox-pane").on("click", ".name", function (event) {
    if (event.ctrlKey) {
      openCharacterProfile($(this).attr("data-pmtarget") || $(this).text());
      event.stopImmediatePropagation(); // Don't let the pmtarget handler operate.
    }
  });

  /* Clicking on names in a groupchat tab should always treat it as a "from" */
  $("#hoverbox-pane").on(
    "click",
    ".group [data-pmtarget]",
    onClickPmtargetForGroupchat
  );

  /* Clicking on names in the userlist, or main chat pane. */
  $("#ulist-pane").on("click", "[data-pmtarget]", onClickPmtarget);

  $(".name.pmclick").on("click", "[data-pmtarget]", onClickPmtarget);

  /* Context Menu right clicking on names */
  $.contextMenu({
    selector: "[data-pmtarget]",
    //zIndex: 99,
    //className: 'context-titled',
    build: buildObjectContextMenu,
    events: {
      show: onContextMenuShow
    }
  });
}

/**
 * Handle user clicking on the Logout link.
 * First click sets text to "Confirm Logout", resets in 2 seconds.
 * Second click actually logs them out (of the character).
 * @param {type} event Click event.
 */
function onClickLogoutLink(event) {
  var $this = $(this);
  if ($this.data("WaitForConfirm") === true) {
    $("<form method='post' action='action.srv?action=logout'></form>")
      .append("<input name='csrf' value='" + me.csrf + "'>")
      .appendTo("body")
      .trigger("submit");
  } else {
    $this.data("WaitForConfirm", true);
    $this.blur().children("span").text("Confirm Logout");
    setTimeout(function () {
      $this.data("WaitForConfirm", false).children("span").text("Logout");
    }, 2000);
  }
  event.preventDefault();
  event.stopImmediatePropagation();
}

//</editor-fold>

//
//  Page Layout
//

/**
 * Does the entire page layout. We would rather this be done by CSS, but
 * IE sucks so we have to do it manually by javascript.
 * @returns {undefined}
 */
function layoutEntirePage() {
  $("#input-pane").height($("#main-sender-form").height() + 2);

  $("#chat-pane").height(
    $("#left").height() -
      $("#input-pane").outerHeight(true) -
      $("#tabs-pane").outerHeight(true)
  );
}

//# sourceMappingURL=xchat.js.map
