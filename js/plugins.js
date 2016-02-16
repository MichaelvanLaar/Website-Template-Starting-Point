/*
 * ==========================================================================
 * JavaScript Plugins for [Project name]
 * ==========================================================================
 *
 *
 * CONTENTS
 * ==========================================================================
 *
 * JQUERY PLUGINS
 * Skiplink Focus Fix
 * Printed Footer Links
 * jQuery Cookie Plugin 1.4.1
 * jQuery Placeholder Enhanced 1.6.9
 * Sisyphus 1.1.107
 * jQuery outside events 1.1
 * jquery.animate-enhanced plugin 1.10
 * ScrollToFixed 1.0.6
 *
 * NON-JQUERY LIBS
 * Type Rendering Mix 1.1.0
 * enquire.js 2.1.1
 */





/* ==========================================================================
   Avoid console errors in browsers that lack a console
   ========================================================================== */


(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());





/* ==========================================================================
   Skiplink Focus Fix - jQuery Plugin
   ========================================================================== */


// Configuration: Enter a proper selector for your skiplinks
// (the same way you would address these elements in your CSS).
var skiplinkselector = '.skiplinks a';

// From here on no configuration or changes required.
$(document).ready(function() {
    var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
    var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
    if (is_webkit || is_opera) {
        $(skiplinkselector).click(function() {
            var targetname = this.hash.replace("#", "");
            $('<a name="skiptarget-' + targetname + '" tabindex="0"></a>')
                .prependTo('#' + targetname)
                .focus()
                .focusout(function() {
                    $(this).remove();
                });
        });
    }
});





/* ==========================================================================
   Printed Footer Links - jQuery Plugin
   ========================================================================== */


$(document).ready(function() {
    // get the container and target
    var links = $('.page-main-content').find('a[href]:not([href^=#],[href^=mailto],[href^=javascript],:has(img))');

    if ($(links).length) {
        //create a container and heading for the footnotes
        var footnotesWrapper = $('<section></section>', {
            css: {
                clear: 'both'
            }
        }).addClass('print-links-footer print-only');
        var footnotesLabel = $('<h3></h3>', {
            text: 'Links:'
        }).appendTo(footnotesWrapper);

        //create an OL to hold the footnotes
        var footnoteList = $('<ol></ol>').appendTo(footnotesWrapper);

        $.each(links, function(i) {
            var linkText = $(this).text();
            var linkValue = $(this).attr('href');
            if (linkValue.substring(0, 7) !== 'http://' && linkValue.substring(0, 8) !== 'https://') {
                if (linkValue.substring(0, 1) === '/') {
                    linkValue = 'http://' + document.location.host + linkValue;
                } else {
                    linkValue = 'http://' + document.location.host + '/' + linkValue;
                }
            }
            //create element to hold span with class to hide except on print
            var newElement = $('<sup></sup>', {
                text: '[' + ++i + ']'
            }).addClass('print-only').insertAfter($(this));

            var listEntry = $('<li></li>', {
                text: linkValue
            }).appendTo(footnoteList);
        });

        // append the heading and <ol> to the target
        $('.main-container').append(footnotesWrapper);
    }
});





/* ==========================================================================
   jQuery Cookie Plugin 1.4.1 - jQuery Plugin
   https://github.com/carhartl/jquery-cookie
   ========================================================================== */


(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s);
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s);
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value));
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            // This is a quoted cookie as according to RFC2068, unescape...
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
        }

        try {
            // Replace server-side written pluses with spaces.
            // If we can't decode the cookie, ignore it, it's unusable.
            // If we can't parse the cookie, ignore it, it's unusable.
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s;
        } catch(e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value;
    }

    var config = $.cookie = function (key, value, options) {

        // Write

        if (arguments.length > 1 && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
            }

            return (document.cookie = [
                encode(key), '=', stringifyCookieValue(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // Read

        var result = key ? undefined : {},
            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling $.cookie().
            cookies = document.cookie ? document.cookie.split('; ') : [],
            i = 0,
            l = cookies.length;

        for (; i < l; i++) {
            var parts = cookies[i].split('='),
                name = decode(parts.shift()),
                cookie = parts.join('=');

            if (key === name) {
                // If second argument (value) is a function it's a converter...
                result = read(cookie, value);
                break;
            }

            // Prevent storing a cookie that we couldn't decode.
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie;
            }
        }

        return result;
    };

    config.defaults = {};

    $.removeCookie = function (key, options) {
        // Must not alter options, thus extending a fresh object...
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    };

}));





/* ==========================================================================
   jQuery Placeholder Enhanced 1.6.9 - jQuery Plugin
   https://github.com/dciccale/placeholder-enhanced
   ========================================================================== */

(function($, doc) {

    var PLUGIN_NAME = 'placeholderEnhanced';

    // Check for support
    var HAS_NATIVE_SUPPORT = 'placeholder' in doc.createElement('input') &&
        'placeholder' in doc.createElement('textarea');

    // Event namespaces
    var EVENT = {
        FOCUS: 'focus.placeholder',
        BLUR: 'blur.placeholder'
    };

    /*
     * Define defaults here as some options are needed before initialization
     * it also merges with an options object when you call the plugin
     */
    var DEFAULTS = {
        cssClass: 'placeholder',

        /*
         * Normalize behaviour & style across browsers
         * (remove placeholder on focus, show on blur)
         * if false, each browser wil handle behaviour & style natively
         * i.e. in case of Chrome placeholder is still visible on focus
         */
        normalize: true
    };

    // Save original jQuery .val() function
    var $val = $.fn.val;

    // Checks if the node is valid to use with the fixed jQuery .val() function
    var isValidNode = function(el) {
        return ($.nodeName(el, 'input') || $.nodeName(el, 'textarea'));
    };

    // Copy attributes from a DOM node to a plain object to use later
    var copyAttrs = function(el) {
        var exclude = ['placeholder', 'name', 'id'];
        var attrs = {};
        var attr;

        for (var i = 0, l = el.attributes.length; i < l; i++) {
            attr = el.attributes[i];
            if (attr.specified && $.inArray(attr.name, exclude) < 0) {
                attrs[attr.name] = attr.value;
            }
        }

        return attrs;
    };

    // Shows specified password input
    var showInput = function($input) {
        $input.css({
            position: '',
            left: ''
        });
    };

    // Hides specified password input
    var hideInput = function($input) {
        $input.css({
            position: 'absolute',
            left: '-9999em'
        });
    };

    // Don't do anything if there is native placeholder support and normalize mode is off by default
    if (HAS_NATIVE_SUPPORT && !DEFAULTS.normalize) {
        return;
    }

    /*
     * Handle the use of jQuery .val(), if placeholder is not supported, the .val() function
     * returns the placeholder value, wrap the val function to fix this, also useful when
     * using .serialize() or any other jQuery method that uses .val()
     */

    // Fix .val() function for unsupported browsers
    if (!HAS_NATIVE_SUPPORT) {
        $.fn.val = function() {
            var args = arguments;
            var el = this[0];
            var placeholderTxt;

            if (!el) {
                return;
            }

            // Handle .val()
            if (!args.length) {
                placeholderTxt = $(el).attr('placeholder');

                // Handle get if the node has a placeholder
                if (placeholderTxt && isValidNode(el)) {
                    return (el.value === placeholderTxt ? '' : el.value);

                    // No placeholder, call native
                } else {
                    return $val.apply(this, args);
                }
            }

            // Handle .val(...)
            return this.each(function(i, el) {
                var $el = $(el);
                var settings = $.data(el, PLUGIN_NAME);
                var placeholderTxt = $el.attr('placeholder');

                if (settings && placeholderTxt && isValidNode(el)) {

                    // Handle .val(''), .val(null), .val(undefined)
                    if (!args[0] && el.value !== placeholderTxt) {
                        el.value = $el.addClass(settings.cssClass).attr('placeholder');

                        // Handle .val('value')
                    } else if (args[0]) {
                        if ($el.hasClass(settings.cssClass)) {
                            $el.removeClass(settings.cssClass);
                        }
                        $val.apply($el, args);
                    }

                } else {
                    $val.apply($el, args);
                }
            });
        };

        // Fix .val() function for modern browsers when normalize mode is on
    } else if (HAS_NATIVE_SUPPORT && DEFAULTS.normalize) {
        $.fn.val = function() {
            var args = arguments;
            var el = this[0];

            if (!el) {
                return;
            }

            // Handle .val()
            if (!args.length) {
                return $val.apply(this, args);
            }

            // Handle .val(...)
            return this.each(function(i, el) {
                var $el = $(el);
                var settings = $.data(el, PLUGIN_NAME);
                var placeholderTxt = el._placeholder;

                if (settings && placeholderTxt && isValidNode(el)) {

                    // Handle .val(''), .val(null), .val(undefined)
                    if (!args[0] && el.value !== placeholderTxt) {

                        // Restore the placeholder
                        $el.addClass(settings.cssClass).attr('placeholder', placeholderTxt);

                        // Handle .val('value')
                    } else if (args[0]) {
                        if ($el.hasClass(settings.cssClass)) {
                            $el.removeClass(settings.cssClass);
                        }
                    }
                }

                $val.apply($el, args);
            });
        };
    }

    // Placeholder Enhanced plugin
    $.fn[PLUGIN_NAME] = function(options) {

        // Merge passed options with defaults
        var settings = $.extend(DEFAULTS, options);

        // Don't do anything if empty set or if placeholder is supported but
        // don't want to normalize modern browsers
        if (!this.length || (HAS_NATIVE_SUPPORT && !settings.normalize)) {
            return;
        }

        // Check if options param is destroy method
        if (options === 'destroy') {

            // Completely destroy the plugin
            return this

            // Get the elements where the plugin was initialized
            .filter(function(i, el) {
                return $.data(el, PLUGIN_NAME);
            })

            // Remove class
            .removeClass(settings.cssClass)

            // Clean other stuff
            .each(function(i, el) {
                var $el = $(el).unbind('.placeholder');
                var isPassword = (el.type === 'password');
                var placeholderTxt = $el.attr('placeholder');

                // Do all this only for unsupported browsers
                if (!HAS_NATIVE_SUPPORT) {
                    if (el.value === placeholderTxt) {
                        el.value = '';
                    }

                    // Remove fake password input
                    if (isPassword) {
                        showInput($el);
                        $el.prev().unbind('.placeholder').remove();
                    }

                    // Delete backup prop
                } else {
                    delete el._placeholder;
                }

                // Restore original jQuery .val() function
                $.fn.val = $val;

                // Plugin off
                $.removeData(el, PLUGIN_NAME);
            });
        }

        return this.each(function(i, el) {

            // Check if the plugin was already initialized for this element
            if ($.data(el, PLUGIN_NAME)) {
                return;
            }

            // Mark plugin as initialized for the current element at the begining to
            // prevent multiple calls of the plugin for the same set of elements
            $.data(el, PLUGIN_NAME, settings);

            // jQuery object
            var $el = $(el);

            // Passwords have different treatment
            var isPassword = (el.type === 'password');

            // Current placeholder text
            var placeholderTxt = $el.attr('placeholder');

            // A fake input will be created for passwords
            var fakePassw = null;

            var setPlaceholder = null;
            var removePlaceholder = null;

            // Placeholder support for unsupported browsers
            if (!HAS_NATIVE_SUPPORT) {

                setPlaceholder = function() {

                    // If there is no initial value or initial value is equal to the
                    // placeholder (done in the $.fn.val wrapper) show the placeholder
                    if (!$el.val()) {
                        if (isPassword) {
                            showInput(fakePassw);
                            hideInput($el);
                        } else {
                            $el.val(placeholderTxt).addClass(settings.cssClass);
                        }
                    } else if ($el.val() && isPassword) {

                        // If there is a value already, we want to remove the fake
                        // placeholder. Otherwise, we'll have both the fake placeholder
                        // and the actual input visible
                        removePlaceholder();
                    }
                };

                // Remove function for inputs and textareas
                if (!isPassword) {

                    removePlaceholder = function() {
                        if ($el.hasClass(settings.cssClass)) {
                            el.value = '';
                            $el.removeClass(settings.cssClass);
                        }
                    };

                    // And for password inputs
                } else {

                    removePlaceholder = function() {
                        showInput($el);
                        hideInput(fakePassw);
                    };

                    // Create a fake password input
                    fakePassw = $('<input>', $.extend(copyAttrs(el), {
                        'type': 'text',
                        value: placeholderTxt,
                        tabindex: -1 // Skip tabbing
                    }))
                        .addClass(settings.cssClass)

                    // When focus, trigger real input focus
                    .bind(EVENT.FOCUS, function() {
                        $el.trigger(EVENT.FOCUS);
                    })

                    // Insert the fake input
                    .insertBefore($el);
                }

                // Normalize placeholder behaviour and style in modern browsers if normalize mode is on
            } else if (HAS_NATIVE_SUPPORT && settings.normalize) {

                // Save the placeholder to restore it when needed
                el._placeholder = $el.attr('placeholder');

                setPlaceholder = function() {
                    if (!el.value) {
                        $el.addClass(settings.cssClass).attr('placeholder', placeholderTxt);
                    }
                };

                removePlaceholder = function() {
                    $el.removeAttr('placeholder').removeClass(settings.cssClass);
                };

            }

            // Bind events and trigger blur the first time
            $el
                .bind(EVENT.BLUR, setPlaceholder)
                .bind(EVENT.FOCUS, removePlaceholder)
                .trigger(EVENT.BLUR);
        });
    };

    // Auto-initialize the plugin
    $(function() {
        $('input[placeholder], textarea[placeholder]')[PLUGIN_NAME]();
    });

}(jQuery, document));





/* ==========================================================================
   Sisyphus 1.1.107 - jQuery Plu
   https://github.com/simsalabim/sisyphus
   ========================================================================== */


(function($) {

    $.fn.sisyphus = function(options) {
        var identifier = $.map(this, function(obj, i) {
            return $(obj).attr("id") + $(obj).attr("name")
        }).join();

        var sisyphus = Sisyphus.getInstance(identifier);
        sisyphus.protect(this, options);
        return sisyphus;
    };

    var browserStorage = {};

    /**
     * Check if local storage or other browser storage is available
     *
     * @return Boolean
     */
    browserStorage.isAvailable = function() {
        if (typeof $.jStorage === "object") {
            return true;
        }
        try {
            return localStorage.getItem;
        } catch (e) {
            return false;
        }
    };

    /**
     * Set data to browser storage
     *
     * @param [String] key
     * @param [String] value
     *
     * @return Boolean
     */
    browserStorage.set = function(key, value) {
        if (typeof $.jStorage === "object") {
            $.jStorage.set(key, value + "");
        } else {
            try {
                localStorage.setItem(key, value + "");
            } catch (e) {
                //QUOTA_EXCEEDED_ERR
            }
        }
    };

    /**
     * Get data from browser storage by specified key
     *
     * @param [String] key
     *
     * @return string
     */
    browserStorage.get = function(key) {
        if (typeof $.jStorage === "object") {
            var result = $.jStorage.get(key);
            return result ? result.toString() : result;
        } else {
            return localStorage.getItem(key);
        }
    };

    /**
     * Delete data from browser storage by specified key
     *
     * @param [String] key
     *
     * @return void
     */
    browserStorage.remove = function(key) {
        if (typeof $.jStorage === "object") {
            $.jStorage.deleteKey(key);
        } else {
            localStorage.removeItem(key);
        }
    };

    Sisyphus = (function() {
        var params = {
            instantiated: [],
            started: []
        };

        function init() {

            return {
                setInstanceIdentifier: function(identifier) {
                    this.identifier = identifier
                },

                getInstanceIdentifier: function() {
                    return this.identifier;
                },

                /**
                 * Set plugin initial options
                 *
                 * @param [Object] options
                 *
                 * @return void
                 */
                setInitialOptions: function(options) {
                    var defaults = {
                        excludeFields: [],
                        customKeySuffix: "",
                        locationBased: false,
                        timeout: 0,
                        autoRelease: true,
                        onSave: function() {},
                        onBeforeRestore: function() {},
                        onRestore: function() {},
                        onRelease: function() {}
                    };
                    this.options = this.options || $.extend(defaults, options);
                    this.browserStorage = browserStorage;
                },

                /**
                 * Set plugin options
                 *
                 * @param [Object] options
                 *
                 * @return void
                 */
                setOptions: function(options) {
                    this.options = this.options || this.setInitialOptions(options);
                    this.options = $.extend(this.options, options);
                },

                /**
                 * Protect specified forms, store it's fields data to local storage and restore them on page load
                 *
                 * @param [Object] targets      forms object(s), result of jQuery selector
                 * @param Object options            plugin options
                 *
                 * @return void
                 */
                protect: function(targets, options) {
                    this.setOptions(options);
                    targets = targets || {};
                    var self = this;
                    this.targets = this.targets || [];
                    this.href = location.hostname + location.pathname + location.search + location.hash;
                    this.targets = $.merge(this.targets, targets);
                    this.targets = $.unique(this.targets);
                    this.targets = $(this.targets);
                    if (!this.browserStorage.isAvailable()) {
                        return false;
                    }

                    var callback_result = self.options.onBeforeRestore.call(self);
                    if (callback_result === undefined || callback_result) {
                        self.restoreAllData();
                    }

                    if (this.options.autoRelease) {
                        self.bindReleaseData();
                    }

                    if (!params.started[this.getInstanceIdentifier()]) {
                        if (self.isCKEditorPresent()) {
                            var intervalId = setInterval(function() {
                                if (CKEDITOR.isLoaded) {
                                    clearInterval(intervalId);
                                    self.bindSaveData();
                                    params.started[self.getInstanceIdentifier()] = true;
                                }
                            }, 100);
                        } else {
                            self.bindSaveData();
                            params.started[self.getInstanceIdentifier()] = true;
                        }
                    }
                },

                isCKEditorPresent: function() {
                    if (this.isCKEditorExists()) {
                        CKEDITOR.isLoaded = false;
                        CKEDITOR.on('instanceReady', function() {
                            CKEDITOR.isLoaded = true;
                        });
                        return true;
                    } else {
                        return false;
                    }
                },

                isCKEditorExists: function() {
                    return typeof CKEDITOR != "undefined";
                },

                findFieldsToProtect: function(target) {
                    return target.find(":input").not(":submit").not(":reset").not(":button").not(":file").not(":password").not(":disabled").not("[readonly]");
                },

                /**
                 * Bind saving data
                 *
                 * @return void
                 */
                bindSaveData: function() {
                    var self = this;

                    if (self.options.timeout) {
                        self.saveDataByTimeout();
                    }

                    self.targets.each(function() {
                        var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");
                        self.findFieldsToProtect($(this)).each(function() {
                            if ($.inArray(this, self.options.excludeFields) !== -1) {
                                // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                return true;
                            }
                            var field = $(this);
                            var prefix = (self.options.locationBased ? self.href : "") + targetFormIdAndName + field.attr("name") + self.options.customKeySuffix;
                            if (field.is(":text") || field.is("textarea")) {
                                if (!self.options.timeout) {
                                    self.bindSaveDataImmediately(field, prefix);
                                }
                            }
                            self.bindSaveDataOnChange(field);
                        });
                    });
                },

                /**
                 * Save all protected forms data to Local Storage.
                 * Common method, necessary to not lead astray user firing 'data is saved' when select/checkbox/radio
                 * is changed and saved, while text field data is saved only by timeout
                 *
                 * @return void
                 */
                saveAllData: function() {
                    var self = this;
                    self.targets.each(function() {
                        var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");
                        var multiCheckboxCache = {};

                        self.findFieldsToProtect($(this)).each(function() {
                            var field = $(this);
                            if ($.inArray(this, self.options.excludeFields) !== -1 || field.attr("name") === undefined) {
                                // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                return true;
                            }
                            var prefix = (self.options.locationBased ? self.href : "") + targetFormIdAndName + field.attr("name") + self.options.customKeySuffix;
                            var value = field.val();

                            if (field.is(":checkbox")) {
                                if (field.attr("name").indexOf("[") !== -1) {
                                    if (multiCheckboxCache[field.attr("name")] === true) {
                                        return;
                                    }
                                    value = [];
                                    $("[name='" + field.attr("name") + "']:checked").each(function() {
                                        value.push($(this).val());
                                    });
                                    multiCheckboxCache[field.attr("name")] = true;
                                } else {
                                    value = field.is(":checked");
                                }
                                self.saveToBrowserStorage(prefix, value, false);
                            } else if (field.is(":radio")) {
                                if (field.is(":checked")) {
                                    value = field.val();
                                    self.saveToBrowserStorage(prefix, value, false);
                                }
                            } else {
                                if (self.isCKEditorExists()) {
                                    var editor;
                                    if (editor = CKEDITOR.instances[field.attr("name")] || CKEDITOR.instances[field.attr("id")]) {
                                        editor.updateElement();
                                        self.saveToBrowserStorage(prefix, field.val(), false);
                                    } else {
                                        self.saveToBrowserStorage(prefix, value, false);
                                    }
                                } else {
                                    self.saveToBrowserStorage(prefix, value, false);
                                }
                            }
                        });
                    });
                    self.options.onSave.call(self);
                },

                /**
                 * Restore forms data from Local Storage
                 *
                 * @return void
                 */
                restoreAllData: function() {
                    var self = this;
                    var restored = false;

                    self.targets.each(function() {
                        var target = $(this);
                        var targetFormIdAndName = $(this).attr("id") + $(this).attr("name");

                        self.findFieldsToProtect(target).each(function() {
                            if ($.inArray(this, self.options.excludeFields) !== -1) {
                                // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                                return true;
                            }
                            var field = $(this);
                            var prefix = (self.options.locationBased ? self.href : "") + targetFormIdAndName + field.attr("name") + self.options.customKeySuffix;
                            var resque = self.browserStorage.get(prefix);
                            if (resque !== null) {
                                self.restoreFieldsData(field, resque);
                                restored = true;
                            }
                        });
                    });

                    if (restored) {
                        self.options.onRestore.call(self);
                    }
                },

                /**
                 * Restore form field data from local storage
                 *
                 * @param Object field      jQuery form element object
                 * @param String resque  previously stored fields data
                 *
                 * @return void
                 */
                restoreFieldsData: function(field, resque) {
                    if (field.attr("name") === undefined) {
                        return false;
                    }
                    if (field.is(":checkbox") && resque !== "false" && field.attr("name").indexOf("[") === -1) {
                        field.attr("checked", "checked");
                    } else if (field.is(":checkbox") && resque === "false" && field.attr("name").indexOf("[") === -1) {
                        field.removeAttr("checked");
                    } else if (field.is(":radio")) {
                        if (field.val() === resque) {
                            field.attr("checked", "checked");
                        }
                    } else if (field.attr("name").indexOf("[") === -1) {
                        field.val(resque);
                    } else {
                        resque = resque.split(",");
                        field.val(resque);
                    }
                },

                /**
                 * Bind immediate saving (on typing/checking/changing) field data to local storage when user fills it
                 *
                 * @param Object field      jQuery form element object
                 * @param String prefix  prefix used as key to store data in local storage
                 *
                 * @return void
                 */
                bindSaveDataImmediately: function(field, prefix) {
                    var self = this;
                    if ('onpropertychange' in field) {
                        field.get(0).onpropertychange = function() {
                            self.saveToBrowserStorage(prefix, field.val());
                        };
                    } else {
                        field.get(0).oninput = function() {
                            self.saveToBrowserStorage(prefix, field.val());
                        };
                    }
                    if (this.isCKEditorExists()) {
                        var editor;
                        if (editor = CKEDITOR.instances[field.attr("name")] || CKEDITOR.instances[field.attr("id")]) {
                            editor.document.on('keyup', function() {
                                editor.updateElement();
                                self.saveToBrowserStorage(prefix, field.val());
                            });
                        }
                    }
                },

                /**
                 * Save data to Local Storage and fire callback if defined
                 *
                 * @param String key
                 * @param String value
                 * @param Boolean [true] fireCallback
                 *
                 * @return void
                 */
                saveToBrowserStorage: function(key, value, fireCallback) {
                    // if fireCallback is undefined it should be true
                    fireCallback = fireCallback === undefined ? true : fireCallback;
                    this.browserStorage.set(key, value);
                    if (fireCallback && value !== "") {
                        this.options.onSave.call(this);
                    }
                },

                /**
                 * Bind saving field data on change
                 *
                 * @param Object field      jQuery form element object
                 *
                 * @return void
                 */
                bindSaveDataOnChange: function(field) {
                    var self = this;
                    field.change(function() {
                        self.saveAllData();
                    });
                },

                /**
                 * Saving (by timeout) field data to local storage when user fills it
                 *
                 * @return void
                 */
                saveDataByTimeout: function() {
                    var self = this;
                    var targetForms = self.targets;
                    setTimeout((function() {
                        function timeout() {
                            self.saveAllData();
                            setTimeout(timeout, self.options.timeout * 1000);
                        }
                        return timeout;
                    })(targetForms), self.options.timeout * 1000);
                },

                /**
                 * Bind release form fields data from local storage on submit/reset form
                 *
                 * @return void
                 */
                bindReleaseData: function() {
                    var self = this;
                    self.targets.each(function() {
                        var target = $(this);
                        var formIdAndName = target.attr("id") + target.attr("name");
                        $(this).bind("submit reset", function() {
                            self.releaseData(formIdAndName, self.findFieldsToProtect(target));
                        });
                    });
                },

                /**
                 * Manually release form fields
                 *
                 * @return void
                 */
                manuallyReleaseData: function() {
                    var self = this;
                    self.targets.each(function() {
                        var target = $(this);
                        var formIdAndName = target.attr("id") + target.attr("name");
                        self.releaseData(formIdAndName, self.findFieldsToProtect(target));
                    });
                },

                /**
                 * Bind release form fields data from local storage on submit/resett form
                 *
                 * @param String targetFormIdAndName    a form identifier consists of its id and name glued
                 * @param Object fieldsToProtect        jQuery object contains form fields to protect
                 *
                 * @return void
                 */
                releaseData: function(targetFormIdAndName, fieldsToProtect) {
                    var released = false;
                    var self = this;

                    // Released form, are not started anymore. Fix for ajax loaded forms.
                    params.started[self.getInstanceIdentifier()] = false;

                    fieldsToProtect.each(function() {
                        if ($.inArray(this, self.options.excludeFields) !== -1) {
                            // Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
                            return true;
                        }
                        var field = $(this);
                        var prefix = (self.options.locationBased ? self.href : "") + targetFormIdAndName + field.attr("name") + self.options.customKeySuffix;
                        self.browserStorage.remove(prefix);
                        released = true;
                    });

                    if (released) {
                        self.options.onRelease.call(self);
                    }
                }

            };
        }

        return {
            getInstance: function(identifier) {
                if (!params.instantiated[identifier]) {
                    params.instantiated[identifier] = init();
                    params.instantiated[identifier].setInstanceIdentifier(identifier);
                    params.instantiated[identifier].setInitialOptions();
                }
                if (identifier) {
                    return params.instantiated[identifier];
                }
                return params.instantiated[identifier];
            },

            free: function() {
                params = {
                    instantiated: [],
                    started: []
                };
                return null;
            },
            version: '1.1.107'
        };
    })();
})(jQuery);





/* ==========================================================================
   jQuery outside events 1.1 - jQuery Plu
   http://benalman.com/projects/jquery-outside-events-plugin/
   ========================================================================== */


(function($, doc, outside) {
    '$:nomunge'; // Used by YUI compressor.

    $.map(
        // All these events will get an "outside" event counterpart by default.
        'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '),
        function(event_name) {
            jq_addOutsideEvent(event_name);
        }
    );

    // The focus and blur events are really focusin and focusout when it comes
    // to delegation, so they are a special case.
    jq_addOutsideEvent('focusin', 'focus' + outside);
    jq_addOutsideEvent('focusout', 'blur' + outside);

    // Method: jQuery.addOutsideEvent
    //
    // Register a new "outside" event to be with this method. Adding an outside
    // event that already exists will probably blow things up, so check the
    // <Default "outside" events> list before trying to add a new one.
    //
    // Usage:
    //
    // > jQuery.addOutsideEvent( event_name [, outside_event_name ] );
    //
    // Arguments:
    //
    //  event_name - (String) The name of the originating event that the new
    //  "outside" event will be powered by. This event can be a native or
    //  custom event, as long as it bubbles up the DOM tree.
    //  outside_event_name - (String) An optional name for the new "outside"
    //  event. If omitted, the outside event will be named whatever the
    //  value of `event_name` is plus the "outside" suffix.
    //
    // Returns:
    //
    //  Nothing.

    $.addOutsideEvent = jq_addOutsideEvent;

    function jq_addOutsideEvent(event_name, outside_event_name) {

        // The "outside" event name.
        outside_event_name = outside_event_name || event_name + outside;

        // A jQuery object containing all elements to which the "outside" event is
        // bound.
        var elems = $(),

            // The "originating" event, namespaced for easy unbinding.
            event_namespaced = event_name + '.' + outside_event_name + '-special-event';

        // Event: outside events
        //
        // An "outside" event is triggered on an element when its corresponding
        // "originating" event is triggered on an element outside the element in
        // question. See the <Default "outside" events> list for more information.
        //
        // Usage:
        //
        // > jQuery('selector').bind( 'clickoutside', function(event) {
        // >   var clicked_elem = $(event.target);
        // >   ...
        // > });
        //
        // > jQuery('selector').bind( 'dblclickoutside', function(event) {
        // >   var double_clicked_elem = $(event.target);
        // >   ...
        // > });
        //
        // > jQuery('selector').bind( 'mouseoveroutside', function(event) {
        // >   var moused_over_elem = $(event.target);
        // >   ...
        // > });
        //
        // > jQuery('selector').bind( 'focusoutside', function(event) {
        // >   var focused_elem = $(event.target);
        // >   ...
        // > });
        //
        // You get the idea, right?

        $.event.special[outside_event_name] = {

            // Called only when the first "outside" event callback is bound per
            // element.
            setup: function() {

                // Add this element to the list of elements to which this "outside"
                // event is bound.
                elems = elems.add(this);

                // If this is the first element getting the event bound, bind a handler
                // to document to catch all corresponding "originating" events.
                if (elems.length === 1) {
                    $(doc).bind(event_namespaced, handle_event);
                }
            },

            // Called only when the last "outside" event callback is unbound per
            // element.
            teardown: function() {

                // Remove this element from the list of elements to which this
                // "outside" event is bound.
                elems = elems.not(this);

                // If this is the last element removed, remove the "originating" event
                // handler on document that powers this "outside" event.
                if (elems.length === 0) {
                    $(doc).unbind(event_namespaced);
                }
            },

            // Called every time a "outside" event callback is bound to an element.
            add: function(handleObj) {
                var old_handler = handleObj.handler;

                // This function is executed every time the event is triggered. This is
                // used to override the default event.target reference with one that is
                // more useful.
                handleObj.handler = function(event, elem) {

                    // Set the event object's .target property to the element that the
                    // user interacted with, not the element that the "outside" event was
                    // was triggered on.
                    event.target = elem;

                    // Execute the actual bound handler.
                    old_handler.apply(this, arguments);
                };
            }
        };

        // When the "originating" event is triggered..
        function handle_event(event) {

            // Iterate over all elements to which this "outside" event is bound.
            $(elems).each(function() {
                var elem = $(this);

                // If this element isn't the element on which the event was triggered,
                // and this element doesn't contain said element, then said element is
                // considered to be outside, and the "outside" event will be triggered!
                if (this !== event.target && !elem.has(event.target).length) {

                    // Use triggerHandler instead of trigger so that the "outside" event
                    // doesn't bubble. Pass in the "originating" event's .target so that
                    // the "outside" event.target can be overridden with something more
                    // meaningful.
                    elem.triggerHandler(outside_event_name, [event.target]);
                }
            });
        };

    };

})(jQuery, document, "outside");





/* ==========================================================================
   jquery.animate-enhanced plugin 1.10 - jQuery Plu
   https://github.com/benbarnett/jQuery-Animate-Enhanced
   ========================================================================== */


(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], function() {
            return factory.apply(window, arguments);
        });
    } else if (typeof module === 'object' && module.exports) {
        // NodeJS.
        module.exports = factory.call(window, require('jquery'));
    } else {
        // Browser globals
        factory.call(window, window.jQuery);
    }
}(typeof global === 'object' ? global : this, function(jQuery) {
    var originalAnimateMethod = jQuery.fn.animate,
        originalStopMethod = jQuery.fn.stop;

    // ----------
    // Plugin variables
    // ----------
    var cssTransitionProperties = ['top', 'right', 'bottom', 'left', 'opacity', 'height', 'width'],
        directions = ['top', 'right', 'bottom', 'left'],
        cssPrefixes = ['-webkit-', '-moz-', '-o-', ''],
        pluginOptions = ['avoidTransforms', 'useTranslate3d', 'leaveTransforms'],
        rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
        rupper = /([A-Z])/g,
        defaultEnhanceData = {
            secondary: {},
            meta: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        },
        valUnit = 'px',

        DATA_KEY = 'jQe',
        CUBIC_BEZIER_OPEN = 'cubic-bezier(',
        CUBIC_BEZIER_CLOSE = ')',

        originalAnimatedFilter = null,
        pluginDisabledDefault = false;


    // ----------
    // Check if this browser supports CSS3 transitions
    // ----------
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        transitionEndEvent = 'webkitTransitionEnd oTransitionEnd transitionend',
        cssTransitionsSupported = thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.OTransition !== undefined || thisStyle.transition !== undefined,
        has3D = ('WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix()),
        use3DByDefault = has3D;



    // ----------
    // Extended :animated filter
    // ----------
    if (jQuery.expr && jQuery.expr.filters) {
        originalAnimatedFilter = jQuery.expr.filters.animated;
        jQuery.expr.filters.animated = function(elem) {
            return jQuery(elem).data('events') && jQuery(elem).data('events')[transitionEndEvent] ? true : originalAnimatedFilter.call(this, elem);
        };
    }


    /**
        @private
        @name _getUnit
        @function
        @description Return unit value ("px", "%", "em" for re-use correct one when translating)
        @param {variant} [val] Target value
    */
    function _getUnit(val) {
        return val.match(/\D+$/);
    }


    /**
        @private
        @name _interpretValue
        @function
        @description Interpret value ("px", "+=" and "-=" sanitisation)
        @param {object} [element] The Element for current CSS analysis
        @param {variant} [val] Target value
        @param {string} [prop] The property we're looking at
        @param {boolean} [isTransform] Is this a CSS3 transform?
    */
    function _interpretValue(e, val, prop, isTransform) {
        // this is a nasty fix, but we check for prop == 'd' to see if we're dealing with SVG, and abort
        if (prop == "d") return;
        if (!_isValidElement(e)) return;

        var parts = rfxnum.exec(val),
            start = e.css(prop) === 'auto' ? 0 : e.css(prop),
            cleanCSSStart = typeof start == 'string' ? _cleanValue(start) : start,
            cleanTarget = typeof val == 'string' ? _cleanValue(val) : val,
            cleanStart = isTransform === true ? 0 : cleanCSSStart,
            hidden = e.is(':hidden'),
            translation = e.translation();

        if (prop == 'left') cleanStart = parseInt(cleanCSSStart, 10) + translation.x;
        if (prop == 'right') cleanStart = parseInt(cleanCSSStart, 10) + translation.x;
        if (prop == 'top') cleanStart = parseInt(cleanCSSStart, 10) + translation.y;
        if (prop == 'bottom') cleanStart = parseInt(cleanCSSStart, 10) + translation.y;

        // deal with shortcuts
        if (!parts && val == 'show') {
            cleanStart = 1;
            if (hidden) {
                elem = e[0];
                if (elem.style) {
                    display = elem.style.display;

                    // Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    if (!jQuery._data(elem, 'olddisplay') && display === 'none') {
                        display = elem.style.display = '';
                    }

                    // Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    if (display === '' && jQuery.css(elem, 'display') === 'none') {
                        jQuery._data(elem, 'olddisplay', _domElementVisibleDisplayValue(elem.tagName));
                    }

                    if (display === '' || display === 'none') {
                        elem.style.display = jQuery._data(elem, 'olddisplay') || '';
                    }
                }
                e.css('opacity', 0);
            }
        } else if (!parts && val == 'hide') {
            cleanStart = 0;
        }

        if (parts) {
            var end = parseFloat(parts[2]);

            // If a +=/-= token was provided, we're doing a relative animation
            if (parts[1]) end = ((parts[1] === '-=' ? -1 : 1) * end) + parseInt(cleanStart, 10);

            // check for unit  as per issue #69
            if (parts[3] && parts[3] != 'px') end = end + parts[3];

            return end;
        } else {
            return cleanStart;
        }
    }

    /**
        @private
        @name _getTranslation
        @function
        @description Make a translate or translate3d string
        @param {integer} [x]
        @param {integer} [y]
        @param {boolean} [use3D] Use translate3d if available?
    */
    function _getTranslation(x, y, use3D) {
        return ((use3D === true || ((use3DByDefault === true && use3D !== false)) && has3D)) ? 'translate3d(' + x + 'px, ' + y + 'px, 0)' : 'translate(' + x + 'px,' + y + 'px)';
    }


    /**
        @private
        @name _applyCSSTransition
        @function
        @description Build up the CSS object
        @param {object} [e] Element
        @param {string} [property] Property we're dealing with
        @param {integer} [duration] Duration
        @param {string} [easing] Easing function
        @param {variant} [value] String/integer for target value
        @param {boolean} [isTransform] Is this a CSS transformation?
        @param {boolean} [isTranslatable] Is this a CSS translation?
        @param {boolean} [use3D] Use translate3d if available?
    */
    function _applyCSSTransition(e, property, duration, easing, value, isTransform, isTranslatable, use3D) {
        var eCSSData = e.data(DATA_KEY),
            enhanceData = eCSSData && !_isEmptyObject(eCSSData) ? eCSSData : jQuery.extend(true, {}, defaultEnhanceData),
            offsetPosition = value,
            isDirection = jQuery.inArray(property, directions) > -1;


        if (isDirection) {
            var meta = enhanceData.meta,
                cleanPropertyValue = _cleanValue(e.css(property)) || 0,
                stashedProperty = property + '_o';

            offsetPosition = value - cleanPropertyValue;


            meta[property] = offsetPosition;
            meta[stashedProperty] = e.css(property) == 'auto' ? 0 + offsetPosition : cleanPropertyValue + offsetPosition || 0;
            enhanceData.meta = meta;

            // fix 0 issue (transition by 0 = nothing)
            if (isTranslatable && offsetPosition === 0) {
                offsetPosition = 0 - meta[stashedProperty];
                meta[property] = offsetPosition;
                meta[stashedProperty] = 0;
            }
        }

        // reapply data and return
        return e.data(DATA_KEY, _applyCSSWithPrefix(e, enhanceData, property, duration, easing, offsetPosition, isTransform, isTranslatable, use3D));
    }

    /**
        @private
        @name _applyCSSWithPrefix
        @function
        @description Helper function to build up CSS properties using the various prefixes
        @param {object} [cssProperties] Current CSS object to merge with
        @param {string} [property]
        @param {integer} [duration]
        @param {string} [easing]
        @param {variant} [value]
        @param {boolean} [isTransform] Is this a CSS transformation?
        @param {boolean} [isTranslatable] Is this a CSS translation?
        @param {boolean} [use3D] Use translate3d if available?
    */
    function _applyCSSWithPrefix(e, cssProperties, property, duration, easing, value, isTransform, isTranslatable, use3D) {
        var saveOriginal = false,
            transform = isTransform === true && isTranslatable === true;


        cssProperties = cssProperties || {};
        if (!cssProperties.original) {
            cssProperties.original = {};
            saveOriginal = true;
        }
        cssProperties.properties = cssProperties.properties || {};
        cssProperties.secondary = cssProperties.secondary || {};

        var meta = cssProperties.meta,
            original = cssProperties.original,
            properties = cssProperties.properties,
            secondary = cssProperties.secondary;

        for (var i = cssPrefixes.length - 1; i >= 0; i--) {
            var tp = cssPrefixes[i] + 'transition-property',
                td = cssPrefixes[i] + 'transition-duration',
                tf = cssPrefixes[i] + 'transition-timing-function';

            property = (transform ? cssPrefixes[i] + 'transform' : property);

            if (saveOriginal) {
                original[tp] = e.css(tp) || '';
                original[td] = e.css(td) || '';
                original[tf] = e.css(tf) || '';
            }

            secondary[property] = transform ? _getTranslation(meta.left, meta.top, use3D) : value;

            properties[tp] = (properties[tp] ? properties[tp] + ',' : '') + property;
            properties[td] = (properties[td] ? properties[td] + ',' : '') + duration + 'ms';
            properties[tf] = (properties[tf] ? properties[tf] + ',' : '') + easing;
        }

        return cssProperties;
    }

    /**
        @private
        @name _isBoxShortcut
        @function
        @description Shortcut to detect if we need to step away from slideToggle, CSS accelerated transitions (to come later with fx.step support)
        @param {object} [prop]
    */
    function _isBoxShortcut(prop) {
        for (var property in prop) {
            if ((property == 'width' || property == 'height') && (prop[property] == 'show' || prop[property] == 'hide' || prop[property] == 'toggle')) {
                return true;
            }
        }
        return false;
    }


    /**
        @private
        @name _isEmptyObject
        @function
        @description Check if object is empty (<1.4 compatibility)
        @param {object} [obj]
    */
    function _isEmptyObject(obj) {
        for (var i in obj) {
            return false;
        }
        return true;
    }

    /**
     * Fetch most appropriate display value for element types
     * @see  https://github.com/benbarnett/jQuery-Animate-Enhanced/issues/121
     * @private
     * @param  {[type]} tagName [description]
     * @return {[type]}      [description]
     */
    function _domElementVisibleDisplayValue(tagName) {
        tagName = tagName.toUpperCase();
        var displayValues = {
            'LI': 'list-item',
            'TR': 'table-row',
            'TD': 'table-cell',
            'TH': 'table-cell',
            'CAPTION': 'table-caption',
            'COL': 'table-column',
            'COLGROUP': 'table-column-group',
            'TFOOT': 'table-footer-group',
            'THEAD': 'table-header-group',
            'TBODY': 'table-row-group'
        };

        return typeof displayValues[tagName] == 'string' ? displayValues[tagName] : 'block';
    }


    /**
        @private
        @name _cleanValue
        @function
        @description Remove 'px' and other artifacts
        @param {variant} [val]
    */
    function _cleanValue(val) {
        return parseFloat(val.replace(_getUnit(val), ''));
    }


    function _isValidElement(element) {
        var allValid = true;
        element.each(function(index, el) {
            allValid = allValid && el.ownerDocument;
            return allValid;
        });
        return allValid;
    }

    /**
        @private
        @name _appropriateProperty
        @function
        @description Function to check if property should be handled by plugin
        @param {string} [prop]
        @param {variant} [value]
    */
    function _appropriateProperty(prop, value, element) {
        if (!_isValidElement(element)) {
            return false;
        }

        var is = jQuery.inArray(prop, cssTransitionProperties) > -1;
        if ((prop == 'width' || prop == 'height' || prop == 'opacity') && (parseFloat(value) === parseFloat(element.css(prop)))) is = false;
        return is;
    }


    jQuery.extend({
        /**
            @public
            @name toggle3DByDefault
            @function
            @description Toggle for plugin settings to automatically use translate3d (where available). Usage: $.toggle3DByDefault
        */
        toggle3DByDefault: function() {
            return use3DByDefault = !use3DByDefault;
        },


        /**
            @public
            @name toggleDisabledByDefault
            @function
            @description Toggle the plugin to be disabled by default (can be overridden per animation with avoidCSSTransitions)
        */
        toggleDisabledByDefault: function() {
            return pluginDisabledDefault = !pluginDisabledDefault;
        },


        /**
            @public
            @name setDisabledByDefault
            @function
            @description Set or unset the 'disabled by default' value
        */
        setDisabledByDefault: function(newValue) {
            return pluginDisabledDefault = newValue;
        }
    });


    /**
        @public
        @name translation
        @function
        @description Get current X and Y translations
    */
    jQuery.fn.translation = function() {
        if (!this[0]) {
            return null;
        }

        var elem = this[0],
            cStyle = window.getComputedStyle(elem, null),
            translation = {
                x: 0,
                y: 0
            };

        if (cStyle) {
            for (var i = cssPrefixes.length - 1; i >= 0; i--) {
                var transform = cStyle.getPropertyValue(cssPrefixes[i] + 'transform');
                if (transform && (/matrix/i).test(transform)) {
                    var explodedMatrix = transform.replace(/^matrix\(/i, '').split(/, |\)$/g);
                    translation = {
                        x: parseInt(explodedMatrix[4], 10),
                        y: parseInt(explodedMatrix[5], 10)
                    };

                    break;
                }
            }
        }

        return translation;
    };



    /**
        @public
        @name jQuery.fn.animate
        @function
        @description The enhanced jQuery.animate function
        @param {string} [property]
        @param {string} [speed]
        @param {string} [easing]
        @param {function} [callback]
    */
    jQuery.fn.animate = function(prop, speed, easing, callback) {
        prop = prop || {};
        var isTranslatable = !(typeof prop['bottom'] !== 'undefined' || typeof prop['right'] !== 'undefined'),
            optall = jQuery.speed(speed, easing, callback),
            callbackQueue = 0,
            propertyCallback = function() {
                callbackQueue--;
                if (callbackQueue === 0) {
                    // we're done, trigger the user callback
                    if (typeof optall.complete === 'function') {
                        optall.complete.apply(this, arguments);
                    }
                }
            },
            bypassPlugin = (typeof prop['avoidCSSTransitions'] !== 'undefined') ? prop['avoidCSSTransitions'] : pluginDisabledDefault;

        if (bypassPlugin === true || !cssTransitionsSupported || _isEmptyObject(prop) || _isBoxShortcut(prop) || optall.duration <= 0 || optall.step) {
            return originalAnimateMethod.apply(this, arguments);
        }

        return this[optall.queue === true ? 'queue' : 'each'](function() {
            var self = jQuery(this),
                opt = jQuery.extend({}, optall),
                cssCallback = function(e) {
                    var selfCSSData = self.data(DATA_KEY) || {
                            original: {}
                        },
                        restore = {};

                    if (e.eventPhase != 2) // not at dispatching target (thanks @warappa issue #58)
                        return;

                    // convert translations to left & top for layout
                    if (prop.leaveTransforms !== true) {
                        for (var i = cssPrefixes.length - 1; i >= 0; i--) {
                            restore[cssPrefixes[i] + 'transform'] = '';
                        }
                        if (isTranslatable && typeof selfCSSData.meta !== 'undefined') {
                            for (var j = 0, dir;
                                (dir = directions[j]); ++j) {
                                var stashedProperty = selfCSSData.meta[dir + '_o'];
                                if (stashedProperty) {
                                    restore[dir] = stashedProperty + valUnit;
                                    jQuery(this).css(dir, restore[dir]);
                                }
                            }
                        }
                    }

                    // remove transition timing functions
                    self.
                    unbind(transitionEndEvent).
                    css(selfCSSData.original).
                    css(restore).
                    data(DATA_KEY, null);

                    // if we used the fadeOut shortcut make sure elements are display:none
                    if (prop.opacity === 'hide') {
                        elem = self[0];
                        if (elem.style) {
                            display = jQuery.css(elem, 'display');

                            if (display !== 'none' && !jQuery._data(elem, 'olddisplay')) {
                                jQuery._data(elem, 'olddisplay', display);
                            }
                            elem.style.display = 'none';
                        }

                        self.css('opacity', '');
                    }

                    // run the main callback function
                    propertyCallback.call(this);
                },
                easings = {
                    bounce: CUBIC_BEZIER_OPEN + '0.0, 0.35, .5, 1.3' + CUBIC_BEZIER_CLOSE,
                    linear: 'linear',
                    swing: 'ease-in-out',

                    // Penner equation approximations from Matthew Lein's Ceaser: http://matthewlein.com/ceaser/
                    easeInQuad: CUBIC_BEZIER_OPEN + '0.550, 0.085, 0.680, 0.530' + CUBIC_BEZIER_CLOSE,
                    easeInCubic: CUBIC_BEZIER_OPEN + '0.550, 0.055, 0.675, 0.190' + CUBIC_BEZIER_CLOSE,
                    easeInQuart: CUBIC_BEZIER_OPEN + '0.895, 0.030, 0.685, 0.220' + CUBIC_BEZIER_CLOSE,
                    easeInQuint: CUBIC_BEZIER_OPEN + '0.755, 0.050, 0.855, 0.060' + CUBIC_BEZIER_CLOSE,
                    easeInSine: CUBIC_BEZIER_OPEN + '0.470, 0.000, 0.745, 0.715' + CUBIC_BEZIER_CLOSE,
                    easeInExpo: CUBIC_BEZIER_OPEN + '0.950, 0.050, 0.795, 0.035' + CUBIC_BEZIER_CLOSE,
                    easeInCirc: CUBIC_BEZIER_OPEN + '0.600, 0.040, 0.980, 0.335' + CUBIC_BEZIER_CLOSE,
                    easeInBack: CUBIC_BEZIER_OPEN + '0.600, -0.280, 0.735, 0.045' + CUBIC_BEZIER_CLOSE,
                    easeOutQuad: CUBIC_BEZIER_OPEN + '0.250, 0.460, 0.450, 0.940' + CUBIC_BEZIER_CLOSE,
                    easeOutCubic: CUBIC_BEZIER_OPEN + '0.215, 0.610, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutQuart: CUBIC_BEZIER_OPEN + '0.165, 0.840, 0.440, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutQuint: CUBIC_BEZIER_OPEN + '0.230, 1.000, 0.320, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutSine: CUBIC_BEZIER_OPEN + '0.390, 0.575, 0.565, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutExpo: CUBIC_BEZIER_OPEN + '0.190, 1.000, 0.220, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutCirc: CUBIC_BEZIER_OPEN + '0.075, 0.820, 0.165, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeOutBack: CUBIC_BEZIER_OPEN + '0.175, 0.885, 0.320, 1.275' + CUBIC_BEZIER_CLOSE,
                    easeInOutQuad: CUBIC_BEZIER_OPEN + '0.455, 0.030, 0.515, 0.955' + CUBIC_BEZIER_CLOSE,
                    easeInOutCubic: CUBIC_BEZIER_OPEN + '0.645, 0.045, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeInOutQuart: CUBIC_BEZIER_OPEN + '0.770, 0.000, 0.175, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeInOutQuint: CUBIC_BEZIER_OPEN + '0.860, 0.000, 0.070, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeInOutSine: CUBIC_BEZIER_OPEN + '0.445, 0.050, 0.550, 0.950' + CUBIC_BEZIER_CLOSE,
                    easeInOutExpo: CUBIC_BEZIER_OPEN + '1.000, 0.000, 0.000, 1.000' + CUBIC_BEZIER_CLOSE,
                    easeInOutCirc: CUBIC_BEZIER_OPEN + '0.785, 0.135, 0.150, 0.860' + CUBIC_BEZIER_CLOSE,
                    easeInOutBack: CUBIC_BEZIER_OPEN + '0.680, -0.550, 0.265, 1.550' + CUBIC_BEZIER_CLOSE
                },
                domProperties = {},
                cssEasing = easings[opt.easing || 'swing'] ? easings[opt.easing || 'swing'] : opt.easing || 'swing';

            // seperate out the properties for the relevant animation functions
            for (var p in prop) {
                if (jQuery.inArray(p, pluginOptions) === -1) {
                    var isDirection = jQuery.inArray(p, directions) > -1,
                        cleanVal = _interpretValue(self, prop[p], p, (isDirection && prop.avoidTransforms !== true));


                    if ( /**prop.avoidTransforms !== true && **/ _appropriateProperty(p, cleanVal, self)) {
                        _applyCSSTransition(
                            self,
                            p,
                            opt.duration,
                            cssEasing,
                            cleanVal, //isDirection && prop.avoidTransforms === true ? cleanVal + valUnit : cleanVal,
                            isDirection && prop.avoidTransforms !== true,
                            isTranslatable,
                            prop.useTranslate3d);

                    } else {
                        domProperties[p] = prop[p];
                    }
                }
            }

            self.unbind(transitionEndEvent);

            var selfCSSData = self.data(DATA_KEY);


            if (selfCSSData && !_isEmptyObject(selfCSSData) && !_isEmptyObject(selfCSSData.secondary)) {
                callbackQueue++;

                self.css(selfCSSData.properties);

                // store in a var to avoid any timing issues, depending on animation duration
                var secondary = selfCSSData.secondary;

                // has to be done in a timeout to ensure transition properties are set
                setTimeout(function() {
                    self.bind(transitionEndEvent, cssCallback).css(secondary);
                });
            } else {
                // it won't get fired otherwise
                opt.queue = false;
            }

            // fire up DOM based animations
            if (!_isEmptyObject(domProperties)) {
                callbackQueue++;
                originalAnimateMethod.apply(self, [domProperties, {
                    duration: opt.duration,
                    easing: jQuery.easing[opt.easing] ? opt.easing : (jQuery.easing.swing ? 'swing' : 'linear'),
                    complete: propertyCallback,
                    queue: opt.queue
                }]);
            }

            // strict JS compliance
            return true;
        });
    };

    jQuery.fn.animate.defaults = {};


    /**
        @public
        @name jQuery.fn.stop
        @function
        @description The enhanced jQuery.stop function (resets transforms to left/top)
        @param {boolean} [clearQueue]
        @param {boolean} [gotoEnd]
        @param {boolean} [leaveTransforms] Leave transforms/translations as they are? Default: false (reset translations to calculated explicit left/top props)
    */
    jQuery.fn.stop = function(clearQueue, gotoEnd, leaveTransforms) {
        if (!cssTransitionsSupported) return originalStopMethod.apply(this, [clearQueue, gotoEnd]);

        // clear the queue?
        if (clearQueue) this.queue([]);

        // route to appropriate stop methods
        this.each(function() {
            var self = jQuery(this),
                selfCSSData = self.data(DATA_KEY);

            // is this a CSS transition?
            if (selfCSSData && !_isEmptyObject(selfCSSData)) {
                var i, restore = {};

                if (gotoEnd) {
                    // grab end state properties
                    restore = selfCSSData.secondary;

                    if (!leaveTransforms && typeof selfCSSData.meta['left_o'] !== undefined || typeof selfCSSData.meta['top_o'] !== undefined) {
                        restore['left'] = typeof selfCSSData.meta['left_o'] !== undefined ? selfCSSData.meta['left_o'] : 'auto';
                        restore['top'] = typeof selfCSSData.meta['top_o'] !== undefined ? selfCSSData.meta['top_o'] : 'auto';

                        // remove the transformations
                        for (i = cssPrefixes.length - 1; i >= 0; i--) {
                            restore[cssPrefixes[i] + 'transform'] = '';
                        }
                    }
                } else if (!_isEmptyObject(selfCSSData.secondary)) {
                    var cStyle = window.getComputedStyle(self[0], null);
                    if (cStyle) {
                        // grab current properties
                        for (var prop in selfCSSData.secondary) {
                            if (selfCSSData.secondary.hasOwnProperty(prop)) {
                                prop = prop.replace(rupper, '-$1').toLowerCase();
                                restore[prop] = cStyle.getPropertyValue(prop);

                                // is this a matrix property? extract left and top and apply
                                if (!leaveTransforms && (/matrix/i).test(restore[prop])) {
                                    var explodedMatrix = restore[prop].replace(/^matrix\(/i, '').split(/, |\)$/g);

                                    // apply the explicit left/top props
                                    restore['left'] = (parseFloat(explodedMatrix[4]) + parseFloat(self.css('left')) + valUnit) || 'auto';
                                    restore['top'] = (parseFloat(explodedMatrix[5]) + parseFloat(self.css('top')) + valUnit) || 'auto';

                                    // remove the transformations
                                    for (i = cssPrefixes.length - 1; i >= 0; i--) {
                                        restore[cssPrefixes[i] + 'transform'] = '';
                                    }
                                }
                            }
                        }
                    }
                }

                // Remove transition timing functions
                // Moving to seperate thread (re: Animation reverts when finished in Android - issue #91)
                self.unbind(transitionEndEvent);
                self.
                css(selfCSSData.original).
                css(restore).
                data(DATA_KEY, null);
            } else {
                // dom transition
                originalStopMethod.apply(self, [clearQueue, gotoEnd]);
            }
        });

        return this;
    };
}));





/* ==========================================================================
   ScrollToFixed 1.
   https://github.com/bigspotteddog/ScrollToFixed
   ========================================================================== */


(function($) {
    $.isScrollToFixed = function(el) {
        return !!$(el).data('ScrollToFixed');
    };

    $.ScrollToFixed = function(el, options) {
        // To avoid scope issues, use 'base' instead of 'this' to reference this
        // class from internal events and functions.
        var base = this;

        // Access to jQuery and DOM versions of element.
        base.$el = $(el);
        base.el = el;

        // Add a reverse reference to the DOM object.
        base.$el.data('ScrollToFixed', base);

        // A flag so we know if the scroll has been reset.
        var isReset = false;

        // The element that was given to us to fix if scrolled above the top of
        // the page.
        var target = base.$el;

        var position;
        var originalPosition;
        var originalOffsetTop;
        var originalZIndex;

        // The offset top of the element when resetScroll was called. This is
        // used to determine if we have scrolled past the top of the element.
        var offsetTop = 0;

        // The offset left of the element when resetScroll was called. This is
        // used to move the element left or right relative to the horizontal
        // scroll.
        var offsetLeft = 0;
        var originalOffsetLeft = -1;

        // This last offset used to move the element horizontally. This is used
        // to determine if we need to move the element because we would not want
        // to do that for no reason.
        var lastOffsetLeft = -1;

        // This is the element used to fill the void left by the target element
        // when it goes fixed; otherwise, everything below it moves up the page.
        var spacer = null;

        var spacerClass;

        var className;

        // Capture the original offsets for the target element. This needs to be
        // called whenever the page size changes or when the page is first
        // scrolled. For some reason, calling this before the page is first
        // scrolled causes the element to become fixed too late.
        function resetScroll() {
            // Set the element to it original positioning.
            target.trigger('preUnfixed.ScrollToFixed');
            setUnfixed();
            target.trigger('unfixed.ScrollToFixed');

            // Reset the last offset used to determine if the page has moved
            // horizontally.
            lastOffsetLeft = -1;

            // Capture the offset top of the target element.
            offsetTop = target.offset().top;

            // Capture the offset left of the target element.
            offsetLeft = target.offset().left;

            // If the offsets option is on, alter the left offset.
            if (base.options.offsets) {
                offsetLeft += (target.offset().left - target.position().left);
            }

            if (originalOffsetLeft == -1) {
                originalOffsetLeft = offsetLeft;
            }

            position = target.css('position');

            // Set that this has been called at least once.
            isReset = true;

            if (base.options.bottom != -1) {
                target.trigger('preFixed.ScrollToFixed');
                setFixed();
                target.trigger('fixed.ScrollToFixed');
            }
        }

        function getLimit() {
            var limit = base.options.limit;
            if (!limit) return 0;

            if (typeof(limit) === 'function') {
                return limit.apply(target);
            }
            return limit;
        }

        // Returns whether the target element is fixed or not.
        function isFixed() {
            return position === 'fixed';
        }

        // Returns whether the target element is absolute or not.
        function isAbsolute() {
            return position === 'absolute';
        }

        function isUnfixed() {
            return !(isFixed() || isAbsolute());
        }

        // Sets the target element to fixed. Also, sets the spacer to fill the
        // void left by the target element.
        function setFixed() {
            // Only fix the target element and the spacer if we need to.
            if (!isFixed()) {
                // Set the spacer to fill the height and width of the target
                // element, then display it.
                spacer.css({
                    'display' : target.css('display'),
                    'width' : target.outerWidth(true),
                    'height' : target.outerHeight(true),
                    'float' : target.css('float')
                });

                // Set the target element to fixed and set its width so it does
                // not fill the rest of the page horizontally. Also, set its top
                // to the margin top specified in the options.

                cssOptions={
                    'z-index' : base.options.zIndex,
                    'position' : 'fixed',
                    'top' : base.options.bottom == -1?getMarginTop():'',
                    'bottom' : base.options.bottom == -1?'':base.options.bottom,
                    'margin-left' : '0px'
                }
                if (!base.options.dontSetWidth){ cssOptions['width']=target.css('width'); };

                target.css(cssOptions);

                target.addClass(base.options.baseClassName);

                if (base.options.className) {
                    target.addClass(base.options.className);
                }

                position = 'fixed';
            }
        }

        function setAbsolute() {

            var top = getLimit();
            var left = offsetLeft;

            if (base.options.removeOffsets) {
                left = '';
                top = top - offsetTop;
            }

            cssOptions={
              'position' : 'absolute',
              'top' : top,
              'left' : left,
              'margin-left' : '0px',
              'bottom' : ''
            }
            if (!base.options.dontSetWidth){ cssOptions['width']=target.css('width'); };

            target.css(cssOptions);

            position = 'absolute';
        }

        // Sets the target element back to unfixed. Also, hides the spacer.
        function setUnfixed() {
            // Only unfix the target element and the spacer if we need to.
            if (!isUnfixed()) {
                lastOffsetLeft = -1;

                // Hide the spacer now that the target element will fill the
                // space.
                spacer.css('display', 'none');

                // Remove the style attributes that were added to the target.
                // This will reverse the target back to the its original style.
                target.css({
                    'z-index' : originalZIndex,
                    'width' : '',
                    'position' : originalPosition,
                    'left' : '',
                    'top' : originalOffsetTop,
                    'margin-left' : ''
                });

                target.removeClass('scroll-to-fixed-fixed');

                if (base.options.className) {
                    target.removeClass(base.options.className);
                }

                position = null;
            }
        }

        // Moves the target element left or right relative to the horizontal
        // scroll position.
        function setLeft(x) {
            // Only if the scroll is not what it was last time we did this.
            if (x != lastOffsetLeft) {
                // Move the target element horizontally relative to its original
                // horizontal position.
                target.css('left', offsetLeft - x);

                // Hold the last horizontal position set.
                lastOffsetLeft = x;
            }
        }

        function getMarginTop() {
            var marginTop = base.options.marginTop;
            if (!marginTop) return 0;

            if (typeof(marginTop) === 'function') {
                return marginTop.apply(target);
            }
            return marginTop;
        }

        // Checks to see if we need to do something based on new scroll position
        // of the page.
        function checkScroll() {
            if (!$.isScrollToFixed(target)) return;
            var wasReset = isReset;

            // If resetScroll has not yet been called, call it. This only
            // happens once.
            if (!isReset) {
                resetScroll();
            } else if (isUnfixed()) {
                // if the offset has changed since the last scroll,
                // we need to get it again.

                // Capture the offset top of the target element.
                offsetTop = target.offset().top;

                // Capture the offset left of the target element.
                offsetLeft = target.offset().left;
            }

            // Grab the current horizontal scroll position.
            var x = $(window).scrollLeft();

            // Grab the current vertical scroll position.
            var y = $(window).scrollTop();

            // Get the limit, if there is one.
            var limit = getLimit();

            // If the vertical scroll position, plus the optional margin, would
            // put the target element at the specified limit, set the target
            // element to absolute.
            if (base.options.minWidth && $(window).width() < base.options.minWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.maxWidth && $(window).width() > base.options.maxWidth) {
                if (!isUnfixed() || !wasReset) {
                    postPosition();
                    target.trigger('preUnfixed.ScrollToFixed');
                    setUnfixed();
                    target.trigger('unfixed.ScrollToFixed');
                }
            } else if (base.options.bottom == -1) {
                // If the vertical scroll position, plus the optional margin, would
                // put the target element at the specified limit, set the target
                // element to absolute.
                if (limit > 0 && y >= limit - getMarginTop()) {
                    if (!isAbsolute() || !wasReset) {
                        postPosition();
                        target.trigger('preAbsolute.ScrollToFixed');
                        setAbsolute();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                // If the vertical scroll position, plus the optional margin, would
                // put the target element above the top of the page, set the target
                // element to fixed.
                } else if (y >= offsetTop - getMarginTop()) {
                    if (!isFixed() || !wasReset) {
                        postPosition();
                        target.trigger('preFixed.ScrollToFixed');

                        // Set the target element to fixed.
                        setFixed();

                        // Reset the last offset left because we just went fixed.
                        lastOffsetLeft = -1;

                        target.trigger('fixed.ScrollToFixed');
                    }
                    // If the page has been scrolled horizontally as well, move the
                    // target element accordingly.
                    setLeft(x);
                } else {
                    // Set the target element to unfixed, placing it where it was
                    // before.
                    if (!isUnfixed() || !wasReset) {
                        postPosition();
                        target.trigger('preUnfixed.ScrollToFixed');
                        setUnfixed();
                        target.trigger('unfixed.ScrollToFixed');
                    }
                }
            } else {
                if (limit > 0) {
                    if (y + $(window).height() - target.outerHeight(true) >= limit - (getMarginTop() || -getBottom())) {
                        if (isFixed()) {
                            postPosition();
                            target.trigger('preUnfixed.ScrollToFixed');

                            if (originalPosition === 'absolute') {
                                setAbsolute();
                            } else {
                                setUnfixed();
                            }

                            target.trigger('unfixed.ScrollToFixed');
                        }
                    } else {
                        if (!isFixed()) {
                            postPosition();
                            target.trigger('preFixed.ScrollToFixed');
                            setFixed();
                        }
                        setLeft(x);
                        target.trigger('fixed.ScrollToFixed');
                    }
                } else {
                    setLeft(x);
                }
            }
        }

        function getBottom() {
            if (!base.options.bottom) return 0;
            return base.options.bottom;
        }

        function postPosition() {
            var position = target.css('position');

            if (position == 'absolute') {
                target.trigger('postAbsolute.ScrollToFixed');
            } else if (position == 'fixed') {
                target.trigger('postFixed.ScrollToFixed');
            } else {
                target.trigger('postUnfixed.ScrollToFixed');
            }
        }

        var windowResize = function(event) {
            // Check if the element is visible before updating it's position, which
            // improves behavior with responsive designs where this element is hidden.
            if(target.is(':visible')) {
                isReset = false;
                checkScroll();
            }
        }

        var windowScroll = function(event) {
            (!!window.requestAnimationFrame) ? requestAnimationFrame(checkScroll) : checkScroll();
        }

        // From: http://kangax.github.com/cft/#IS_POSITION_FIXED_SUPPORTED
        var isPositionFixedSupported = function() {
            var container = document.body;

            if (document.createElement && container && container.appendChild && container.removeChild) {
                var el = document.createElement('div');

                if (!el.getBoundingClientRect) return null;

                el.innerHTML = 'x';
                el.style.cssText = 'position:fixed;top:100px;';
                container.appendChild(el);

                var originalHeight = container.style.height,
                originalScrollTop = container.scrollTop;

                container.style.height = '3000px';
                container.scrollTop = 500;

                var elementTop = el.getBoundingClientRect().top;
                container.style.height = originalHeight;

                var isSupported = (elementTop === 100);
                container.removeChild(el);
                container.scrollTop = originalScrollTop;

                return isSupported;
            }

            return null;
        }

        var preventDefault = function(e) {
            e = e || window.event;
            if (e.preventDefault) {
                e.preventDefault();
            }
            e.returnValue = false;
        }

        // Initializes this plugin. Captures the options passed in, turns this
        // off for devices that do not support fixed position, adds the spacer,
        // and binds to the window scroll and resize events.
        base.init = function() {
            // Capture the options for this plugin.
            base.options = $.extend({}, $.ScrollToFixed.defaultOptions, options);

            originalZIndex = target.css('z-index')

            // Turn off this functionality for devices that do not support it.
            // if (!(base.options && base.options.dontCheckForPositionFixedSupport)) {
            //   var fixedSupported = isPositionFixedSupported();
            //   if (!fixedSupported) return;
            // }

            // Put the target element on top of everything that could be below
            // it. This reduces flicker when the target element is transitioning
            // to fixed.
            base.$el.css('z-index', base.options.zIndex);

            // Create a spacer element to fill the void left by the target
            // element when it goes fixed.
            spacer = $('<div />');

            position = target.css('position');
            originalPosition = target.css('position');

            originalOffsetTop = target.css('top');

            // Place the spacer right after the target element.
            if (isUnfixed()) base.$el.after(spacer);

            // Reset the target element offsets when the window is resized, then
            // check to see if we need to fix or unfix the target element.
            $(window).bind('resize.ScrollToFixed', windowResize);

            // When the window scrolls, check to see if we need to fix or unfix
            // the target element.
            $(window).bind('scroll.ScrollToFixed', windowScroll);

            // For touch devices, call checkScroll directlly rather than
            // rAF wrapped windowScroll to animate the element
            if ('ontouchmove' in window) {
              $(window).bind('touchmove.ScrollToFixed', checkScroll);
            }

            if (base.options.preFixed) {
                target.bind('preFixed.ScrollToFixed', base.options.preFixed);
            }
            if (base.options.postFixed) {
                target.bind('postFixed.ScrollToFixed', base.options.postFixed);
            }
            if (base.options.preUnfixed) {
                target.bind('preUnfixed.ScrollToFixed', base.options.preUnfixed);
            }
            if (base.options.postUnfixed) {
                target.bind('postUnfixed.ScrollToFixed', base.options.postUnfixed);
            }
            if (base.options.preAbsolute) {
                target.bind('preAbsolute.ScrollToFixed', base.options.preAbsolute);
            }
            if (base.options.postAbsolute) {
                target.bind('postAbsolute.ScrollToFixed', base.options.postAbsolute);
            }
            if (base.options.fixed) {
                target.bind('fixed.ScrollToFixed', base.options.fixed);
            }
            if (base.options.unfixed) {
                target.bind('unfixed.ScrollToFixed', base.options.unfixed);
            }

            if (base.options.spacerClass) {
                spacer.addClass(base.options.spacerClass);
            }

            target.bind('resize.ScrollToFixed', function() {
                spacer.height(target.height());
            });

            target.bind('scroll.ScrollToFixed', function() {
                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');
                checkScroll();
            });

            target.bind('detach.ScrollToFixed', function(ev) {
                preventDefault(ev);

                target.trigger('preUnfixed.ScrollToFixed');
                setUnfixed();
                target.trigger('unfixed.ScrollToFixed');

                $(window).unbind('resize.ScrollToFixed', windowResize);
                $(window).unbind('scroll.ScrollToFixed', windowScroll);

                target.unbind('.ScrollToFixed');

                //remove spacer from dom
                spacer.remove();

                base.$el.removeData('ScrollToFixed');
            });

            // Reset everything.
            windowResize();
        };

        // Initialize the plugin.
        base.init();
    };

    // Sets the option defaults.
    $.ScrollToFixed.defaultOptions = {
        marginTop : 0,
        limit : 0,
        bottom : -1,
        zIndex : 1000,
        baseClassName: 'scroll-to-fixed-fixed'
    };

    // Returns enhanced elements that will fix to the top of the page when the
    // page is scrolled.
    $.fn.scrollToFixed = function(options) {
        return this.each(function() {
            (new $.ScrollToFixed(this, options));
        });
    };
})(jQuery);





/* ==========================================================================
   Type Rendering Mix 1.
   https://github.com/bramstein/trmix/
   ========================================================================== */


(function(){// Input 0
var COMPILED = !0, goog = goog || {};
goog.global = window;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.provide = function $goog$provide$($name$$) {
    if (!COMPILED) {
        if (goog.isProvided_($name$$)) {
            throw Error('Namespace "' + $name$$ + '" already declared.');
        }
        delete goog.implicitNamespaces_[$name$$];
        for (var $namespace$$ = $name$$;($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
            goog.implicitNamespaces_[$namespace$$] = !0;
        }
    }
    goog.exportPath_($name$$);
};
goog.setTestOnly = function $goog$setTestOnly$($opt_message$$) {
    if (COMPILED && !goog.DEBUG) {
        throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + $opt_message$$ ? ": " + $opt_message$$ : ".");
    }
};
COMPILED || (goog.isProvided_ = function $goog$isProvided_$($name$$) {
    return!goog.implicitNamespaces_[$name$$] && !!goog.getObjectByName($name$$);
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function $goog$exportPath_$($name$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
    $name$$ = $name$$.split(".");
    $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
    $name$$[0] in $cur_opt_objectToExportTo$$ || !$cur_opt_objectToExportTo$$.execScript || $cur_opt_objectToExportTo$$.execScript("var " + $name$$[0]);
    for (var $part$$;$name$$.length && ($part$$ = $name$$.shift());) {
        !$name$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {};
    }
};
goog.getObjectByName = function $goog$getObjectByName$($name$$, $opt_obj$$) {
    for (var $parts$$ = $name$$.split("."), $cur$$ = $opt_obj$$ || goog.global, $part$$;$part$$ = $parts$$.shift();) {
        if (goog.isDefAndNotNull($cur$$[$part$$])) {
            $cur$$ = $cur$$[$part$$];
        } else {
            return null;
        }
    }
    return $cur$$;
};
goog.globalize = function $goog$globalize$($obj$$, $opt_global$$) {
    var $global$$ = $opt_global$$ || goog.global, $x$$;
    for ($x$$ in $obj$$) {
        $global$$[$x$$] = $obj$$[$x$$];
    }
};
goog.addDependency = function $goog$addDependency$($path$$, $provides_require$$, $requires$$) {
    if (!COMPILED) {
        var $j_provide$$;
        $path$$ = $path$$.replace(/\\/g, "/");
        for (var $deps$$ = goog.dependencies_, $i$$ = 0;$j_provide$$ = $provides_require$$[$i$$];$i$$++) {
            $deps$$.nameToPath[$j_provide$$] = $path$$, $path$$ in $deps$$.pathToNames || ($deps$$.pathToNames[$path$$] = {}), $deps$$.pathToNames[$path$$][$j_provide$$] = !0;
        }
        for ($j_provide$$ = 0;$provides_require$$ = $requires$$[$j_provide$$];$j_provide$$++) {
            $path$$ in $deps$$.requires || ($deps$$.requires[$path$$] = {}), $deps$$.requires[$path$$][$provides_require$$] = !0;
        }
    }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$($errorMessage_name$$) {
    if (!COMPILED && !goog.isProvided_($errorMessage_name$$)) {
        if (goog.ENABLE_DEBUG_LOADER) {
            var $path$$ = goog.getPathFromDeps_($errorMessage_name$$);
            if ($path$$) {
                goog.included_[$path$$] = !0;
                goog.writeScripts_();
                return;
            }
        }
        $errorMessage_name$$ = "goog.require could not find: " + $errorMessage_name$$;
        goog.global.console && goog.global.console.error($errorMessage_name$$);
        throw Error($errorMessage_name$$);
    }
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$($opt_returnValue$$, $var_args$$) {
    return $opt_returnValue$$;
};
goog.abstractMethod = function $goog$abstractMethod$() {
    throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$($ctor$$) {
    $ctor$$.getInstance = function $$ctor$$$getInstance$() {
        if ($ctor$$.instance_) {
            return $ctor$$.instance_;
        }
        goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = $ctor$$);
        return $ctor$$.instance_ = new $ctor$$;
    };
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
    var $doc$$ = goog.global.document;
    return "undefined" != typeof $doc$$ && "write" in $doc$$;
}, goog.findBasePath_ = function $goog$findBasePath_$() {
    if (goog.global.CLOSURE_BASE_PATH) {
        goog.basePath = goog.global.CLOSURE_BASE_PATH;
    } else {
        if (goog.inHtmlDocument_()) {
            for (var $scripts$$ = goog.global.document.getElementsByTagName("script"), $i$$ = $scripts$$.length - 1;0 <= $i$$;--$i$$) {
                var $src$$ = $scripts$$[$i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?"), $l_qmark$$ = -1 == $l_qmark$$ ? $src$$.length : $l_qmark$$;
                if ("base.js" == $src$$.substr($l_qmark$$ - 7, 7)) {
                    goog.basePath = $src$$.substr(0, $l_qmark$$ - 7);
                    break;
                }
            }
        }
    }
}, goog.importScript_ = function $goog$importScript_$($src$$) {
    var $importScript$$ = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[$src$$] && $importScript$$($src$$) && (goog.dependencies_.written[$src$$] = !0);
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$($src$$) {
    if (goog.inHtmlDocument_()) {
        var $doc$$ = goog.global.document;
        if ("complete" == $doc$$.readyState) {
            if (/\bdeps.js$/.test($src$$)) {
                return!1;
            }
            throw Error('Cannot write "' + $src$$ + '" after document load');
        }
        $doc$$.write('<script type="text/javascript" src="' + $src$$ + '">\x3c/script>');
        return!0;
    }
    return!1;
}, goog.writeScripts_ = function $goog$writeScripts_$() {
    function $visitNode$$($path$$) {
        if (!($path$$ in $deps$$.written)) {
            if (!($path$$ in $deps$$.visited) && ($deps$$.visited[$path$$] = !0, $path$$ in $deps$$.requires)) {
                for (var $requireName$$ in $deps$$.requires[$path$$]) {
                    if (!goog.isProvided_($requireName$$)) {
                        if ($requireName$$ in $deps$$.nameToPath) {
                            $visitNode$$($deps$$.nameToPath[$requireName$$]);
                        } else {
                            throw Error("Undefined nameToPath for " + $requireName$$);
                        }
                    }
                }
            }
            $path$$ in $seenScript$$ || ($seenScript$$[$path$$] = !0, $scripts$$.push($path$$));
        }
    }
    var $scripts$$ = [], $seenScript$$ = {}, $deps$$ = goog.dependencies_, $i$$5_path$$;
    for ($i$$5_path$$ in goog.included_) {
        $deps$$.written[$i$$5_path$$] || $visitNode$$($i$$5_path$$);
    }
    for ($i$$5_path$$ = 0;$i$$5_path$$ < $scripts$$.length;$i$$5_path$$++) {
        if ($scripts$$[$i$$5_path$$]) {
            goog.importScript_(goog.basePath + $scripts$$[$i$$5_path$$]);
        } else {
            throw Error("Undefined script input");
        }
    }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$($rule$$) {
    return $rule$$ in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[$rule$$] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$($value$$) {
    var $s$$ = typeof $value$$;
    if ("object" == $s$$) {
        if ($value$$) {
            if ($value$$ instanceof Array) {
                return "array";
            }
            if ($value$$ instanceof Object) {
                return $s$$;
            }
            var $className$$ = Object.prototype.toString.call($value$$);
            if ("[object Window]" == $className$$) {
                return "object";
            }
            if ("[object Array]" == $className$$ || "number" == typeof $value$$.length && "undefined" != typeof $value$$.splice && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("splice")) {
                return "array";
            }
            if ("[object Function]" == $className$$ || "undefined" != typeof $value$$.call && "undefined" != typeof $value$$.propertyIsEnumerable && !$value$$.propertyIsEnumerable("call")) {
                return "function";
            }
        } else {
            return "null";
        }
    } else {
        if ("function" == $s$$ && "undefined" == typeof $value$$.call) {
            return "object";
        }
    }
    return $s$$;
};
goog.isDef = function $goog$isDef$($val$$) {
    return void 0 !== $val$$;
};
goog.isNull = function $goog$isNull$($val$$) {
    return null === $val$$;
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$($val$$) {
    return null != $val$$;
};
goog.isArray = function $goog$isArray$($val$$) {
    return "array" == goog.typeOf($val$$);
};
goog.isArrayLike = function $goog$isArrayLike$($val$$) {
    var $type$$ = goog.typeOf($val$$);
    return "array" == $type$$ || "object" == $type$$ && "number" == typeof $val$$.length;
};
goog.isDateLike = function $goog$isDateLike$($val$$) {
    return goog.isObject($val$$) && "function" == typeof $val$$.getFullYear;
};
goog.isString = function $goog$isString$($val$$) {
    return "string" == typeof $val$$;
};
goog.isBoolean = function $goog$isBoolean$($val$$) {
    return "boolean" == typeof $val$$;
};
goog.isNumber = function $goog$isNumber$($val$$) {
    return "number" == typeof $val$$;
};
goog.isFunction = function $goog$isFunction$($val$$) {
    return "function" == goog.typeOf($val$$);
};
goog.isObject = function $goog$isObject$($val$$) {
    var $type$$ = typeof $val$$;
    return "object" == $type$$ && null != $val$$ || "function" == $type$$;
};
goog.getUid = function $goog$getUid$($obj$$) {
    return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.removeUid = function $goog$removeUid$($obj$$) {
    "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
    try {
        delete $obj$$[goog.UID_PROPERTY_];
    } catch ($ex$$) {
    }
};
goog.UID_PROPERTY_ = "closure_uid_" + (1E9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$($obj$$) {
    var $clone_type$$ = goog.typeOf($obj$$);
    if ("object" == $clone_type$$ || "array" == $clone_type$$) {
        if ($obj$$.clone) {
            return $obj$$.clone();
        }
        var $clone_type$$ = "array" == $clone_type$$ ? [] : {}, $key$$;
        for ($key$$ in $obj$$) {
            $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$]);
        }
        return $clone_type$$;
    }
    return $obj$$;
};
goog.bindNative_ = function $goog$bindNative_$($fn$$, $selfObj$$, $var_args$$) {
    return $fn$$.call.apply($fn$$.bind, arguments);
};
goog.bindJs_ = function $goog$bindJs_$($fn$$, $selfObj$$, $var_args$$) {
    if (!$fn$$) {
        throw Error();
    }
    if (2 < arguments.length) {
        var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
        return function() {
            var $newArgs$$ = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
            return $fn$$.apply($selfObj$$, $newArgs$$);
        };
    }
    return function() {
        return $fn$$.apply($selfObj$$, arguments);
    };
};
goog.bind = function $goog$bind$($fn$$, $selfObj$$, $var_args$$) {
    Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
    return goog.bind.apply(null, arguments);
};
goog.partial = function $goog$partial$($fn$$, $var_args$$) {
    var $args$$ = Array.prototype.slice.call(arguments, 1);
    return function() {
        var $newArgs$$ = Array.prototype.slice.call(arguments);
        $newArgs$$.unshift.apply($newArgs$$, $args$$);
        return $fn$$.apply(this, $newArgs$$);
    };
};
goog.mixin = function $goog$mixin$($target$$, $source$$) {
    for (var $x$$ in $source$$) {
        $target$$[$x$$] = $source$$[$x$$];
    }
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
    return+new Date;
};
goog.globalEval = function $goog$globalEval$($script$$) {
    if (goog.global.execScript) {
        goog.global.execScript($script$$, "JavaScript");
    } else {
        if (goog.global.eval) {
            if (null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
                goog.global.eval($script$$);
            } else {
                var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("script");
                $scriptElt$$.type = "text/javascript";
                $scriptElt$$.defer = !1;
                $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
                $doc$$.body.appendChild($scriptElt$$);
                $doc$$.body.removeChild($scriptElt$$);
            }
        } else {
            throw Error("goog.globalEval not available");
        }
    }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$($className$$, $opt_modifier$$) {
    var $getMapping$$ = function $$getMapping$$$($cssName$$) {
        return goog.cssNameMapping_[$cssName$$] || $cssName$$;
    }, $rename_renameByParts$$ = function $$rename_renameByParts$$$($cssName$$1_parts$$) {
        $cssName$$1_parts$$ = $cssName$$1_parts$$.split("-");
        for (var $mapped$$ = [], $i$$ = 0;$i$$ < $cssName$$1_parts$$.length;$i$$++) {
            $mapped$$.push($getMapping$$($cssName$$1_parts$$[$i$$]));
        }
        return $mapped$$.join("-");
    }, $rename_renameByParts$$ = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
        return $a$$;
    };
    return $opt_modifier$$ ? $className$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$$);
};
goog.setCssNameMapping = function $goog$setCssNameMapping$($mapping$$, $opt_style$$) {
    goog.cssNameMapping_ = $mapping$$;
    goog.cssNameMappingStyle_ = $opt_style$$;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function $goog$getMsg$($str$$, $opt_values$$) {
    var $values$$ = $opt_values$$ || {}, $key$$;
    for ($key$$ in $values$$) {
        var $value$$ = ("" + $values$$[$key$$]).replace(/\$/g, "$$$$");
        $str$$ = $str$$.replace(new RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$);
    }
    return $str$$;
};
goog.getMsgWithFallback = function $goog$getMsgWithFallback$($a$$, $b$$) {
    return $a$$;
};
goog.exportSymbol = function $goog$exportSymbol$($publicPath$$, $object$$, $opt_objectToExportTo$$) {
    goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$);
};
goog.exportProperty = function $goog$exportProperty$($object$$, $publicName$$, $symbol$$) {
    $object$$[$publicName$$] = $symbol$$;
};
goog.inherits = function $goog$inherits$($childCtor$$, $parentCtor$$) {
    function $tempCtor$$() {
    }
    $tempCtor$$.prototype = $parentCtor$$.prototype;
    $childCtor$$.superClass_ = $parentCtor$$.prototype;
    $childCtor$$.prototype = new $tempCtor$$;
    $childCtor$$.prototype.constructor = $childCtor$$;
};
goog.scope = function $goog$scope$($fn$$) {
    $fn$$.call(goog.global);
};
// Input 1
var tr = {Browser:{UNKNOWN:0, INTERNET_EXPLORER:1, CHROME:2, FIREFOX:3, OPERA:4, SAFARI:5, BUILTIN:6, SILK:7}};
// Input 2
tr.dom = {};
tr.dom.addClass = function $tr$dom$addClass$($element$$, $name$$) {
    tr.dom.hasClass($element$$, $name$$) || ($element$$.className += ("" === $element$$.className ? "" : " ") + $name$$);
};
tr.dom.removeClass = function $tr$dom$removeClass$($element$$, $name$$) {
    for (var $classes$$ = $element$$.className.split(/\s+/), $result$$ = [], $i$$ = 0, $len$$ = $classes$$.length;$i$$ < $len$$;$i$$ += 1) {
        $classes$$[$i$$] !== $name$$ && $result$$.push($classes$$[$i$$]);
    }
    $element$$.className = $result$$.join(" ");
};
tr.dom.hasClass = function $tr$dom$hasClass$($element$$, $name$$) {
    for (var $classes$$ = $element$$.className.split(/\s+/), $i$$ = 0, $len$$ = $classes$$.length;$i$$ < $len$$;$i$$ += 1) {
        if ($classes$$[$i$$] === $name$$) {
            return!0;
        }
    }
    return!1;
};
tr.dom.setAttribute = function $tr$dom$setAttribute$($element$$, $name$$, $value$$) {
    $element$$.setAttribute($name$$, $value$$);
};
tr.dom.createElement = function $tr$dom$createElement$($name$$, $attributes$$) {
    var $element$$ = goog.global.document.createElement($name$$);
    if ($attributes$$) {
        for (var $attributeName$$ in $attributes$$) {
            $attributes$$.hasOwnProperty($attributeName$$) && tr.dom.setAttribute($element$$, $attributeName$$, $attributes$$[$attributeName$$]);
        }
    }
    return $element$$;
};
// Input 3
tr.Platform = {UNKNOWN:0, WINDOWS:1, OSX:2, IOS:3, LINUX:4, ANDROID:5, CHROME_OS:6, FIREFOX_OS:7, WINDOWS_PHONE:8, BLACKBERRY:9};
// Input 4
tr.Version = function $tr$Version$($opt_major$$, $opt_minor$$, $opt_patch$$, $opt_build$$) {
    this.major_ = goog.isDefAndNotNull($opt_major$$) ? $opt_major$$ : null;
    this.minor_ = goog.isDefAndNotNull($opt_minor$$) ? $opt_minor$$ : null;
    this.patch_ = goog.isDefAndNotNull($opt_patch$$) ? $opt_patch$$ : null;
    this.build_ = goog.isDefAndNotNull($opt_build$$) ? $opt_build$$ : null;
};
tr.Version.TOKENIZER = /^([0-9]+)(?:[\._-]([0-9]+))?(?:[\._-]([0-9]+))?(?:[\._+-]?(.*))?$/;
tr.Version.prototype.isValid = function $tr$Version$$isValid$() {
    return!goog.isNull(this.major_);
};
tr.Version.prototype.compare = function $tr$Version$$compare$($version$$) {
    return this.major_ > $version$$.major_ || this.major_ === $version$$.major_ && this.minor_ > $version$$.minor_ || this.major_ === $version$$.major_ && this.minor_ === $version$$.minor_ && this.patch_ > $version$$.patch_ ? 1 : this.major_ < $version$$.major_ || this.major_ === $version$$.major_ && this.minor_ < $version$$.minor_ || this.major_ === $version$$.major_ && this.minor_ === $version$$.minor_ && this.patch_ < $version$$.patch_ ? -1 : 0;
};
tr.Version.prototype.gt = function $tr$Version$$gt$($version$$) {
    return 1 === this.compare($version$$);
};
tr.Version.prototype.lt = function $tr$Version$$lt$($version$$) {
    return-1 === this.compare($version$$);
};
tr.Version.prototype.ge = function $tr$Version$$ge$($version$$) {
    return 0 === this.compare($version$$) || 1 === this.compare($version$$);
};
tr.Version.prototype.le = function $tr$Version$$le$($version$$) {
    return 0 === this.compare($version$$) || -1 === this.compare($version$$);
};
tr.Version.prototype.eq = function $tr$Version$$eq$($version$$) {
    return 0 === this.compare($version$$);
};
tr.Version.prototype.ne = function $tr$Version$$ne$($version$$) {
    return 0 !== this.compare($version$$);
};
tr.Version.parse = function $tr$Version$parse$($match_str$$) {
    $match_str$$ = tr.Version.TOKENIZER.exec($match_str$$);
    var $major$$ = null, $minor$$ = null, $patch$$ = null, $build$$ = null;
    $match_str$$ && (!goog.isNull($match_str$$[1]) && $match_str$$[1] && ($major$$ = parseInt($match_str$$[1], 10)), !goog.isNull($match_str$$[2]) && $match_str$$[2] && ($minor$$ = parseInt($match_str$$[2], 10)), !goog.isNull($match_str$$[3]) && $match_str$$[3] && ($patch$$ = parseInt($match_str$$[3], 10)), !goog.isNull($match_str$$[4]) && $match_str$$[4] && ($build$$ = /^[0-9]+$/.test($match_str$$[4]) ? parseInt($match_str$$[4], 10) : $match_str$$[4]));
    return new tr.Version($major$$, $minor$$, $patch$$, $build$$);
};
// Input 5
tr.Antialiasing = {UNKNOWN:"unknown", NONE:"none", GRAYSCALE:"grayscale", SUBPIXEL:"subpixel"};
tr.Antialiasing.get = function $tr$Antialiasing$get$($userAgent$$) {
    return $userAgent$$.getPlatform() === tr.Platform.IOS || $userAgent$$.getPlatform() === tr.Platform.FIREFOX_OS || $userAgent$$.getPlatform() === tr.Platform.CHROME_OS || $userAgent$$.getPlatform() === tr.Platform.BLACKBERRY || $userAgent$$.getPlatform() === tr.Platform.WINDOWS_PHONE || $userAgent$$.getPlatform() === tr.Platform.ANDROID ? tr.Antialiasing.GRAYSCALE : $userAgent$$.getPlatform() === tr.Platform.WINDOWS && $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 2)) && $userAgent$$.getBrowser() ===
    tr.Browser.INTERNET_EXPLORER ? tr.Antialiasing.GRAYSCALE : tr.Antialiasing.UNKNOWN;
};
tr.Antialiasing.guess = function $tr$Antialiasing$guess$($userAgent$$) {
    var $antialiasing$$ = tr.Antialiasing.get($userAgent$$);
    return $antialiasing$$ !== tr.Antialiasing.UNKNOWN ? $antialiasing$$ : $userAgent$$.getPlatform() === tr.Platform.OSX || $userAgent$$.getPlatform() === tr.Platform.LINUX ? tr.Antialiasing.SUBPIXEL : $userAgent$$.getPlatform() === tr.Platform.WINDOWS ? $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 0)) ? tr.Antialiasing.SUBPIXEL : $userAgent$$.getBrowser() === tr.Browser.INTERNET_EXPLORER ? $userAgent$$.getBrowserVersion().ge(new tr.Version(7, 0)) ? tr.Antialiasing.SUBPIXEL : tr.Antialiasing.GRAYSCALE :
    tr.Antialiasing.SUBPIXEL : tr.Antialiasing.UNKNOWN;
};
// Input 6
tr.Rasterizer = {UNKNOWN:"unknown", GDI:"gdi", DIRECTWRITE:"directwrite", CORETEXT:"coretext", FREETYPE:"freetype"};
tr.Rasterizer.get = function $tr$Rasterizer$get$($userAgent$$) {
    return $userAgent$$.getPlatform() === tr.Platform.WINDOWS ? $userAgent$$.getBrowser() === tr.Browser.CHROME ? $userAgent$$.getBrowserVersion().ge(new tr.Version(37)) && $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 1)) ? tr.Rasterizer.DIRECTWRITE : tr.Rasterizer.GDI : $userAgent$$.getBrowser() === tr.Browser.OPERA ? $userAgent$$.getBrowserVersion().ge(new tr.Version(24)) && $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 1)) ? tr.Rasterizer.DIRECTWRITE : tr.Rasterizer.GDI : $userAgent$$.getPlatformVersion().lt(new tr.Version(6,
    0)) ? tr.Rasterizer.GDI : $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 0)) ? $userAgent$$.getBrowser() === tr.Browser.INTERNET_EXPLORER && $userAgent$$.getBrowserVersion().le(new tr.Version(8, 0)) ? tr.Rasterizer.GDI : tr.Rasterizer.DIRECTWRITE : tr.Rasterizer.UNKNOWN : $userAgent$$.getPlatform() === tr.Platform.WINDOWS_PHONE ? tr.Rasterizer.DIRECTWRITE : $userAgent$$.getPlatform() === tr.Platform.OSX || $userAgent$$.getPlatform() === tr.Platform.IOS ? tr.Rasterizer.CORETEXT : $userAgent$$.getPlatform() ===
    tr.Platform.ANDROID || $userAgent$$.getPlatform() === tr.Platform.LINUX || $userAgent$$.getPlatform() === tr.Platform.CHROME_OS || $userAgent$$.getPlatform() === tr.Platform.FIREFOX_OS || $userAgent$$.getPlatform() === tr.Platform.BLACKBERRY ? tr.Rasterizer.FREETYPE : tr.Rasterizer.UNKNOWN;
};
// Input 7
tr.UserAgent = function $tr$UserAgent$($browser$$, $browserVersion$$, $platform$$, $platformVersion$$) {
    this.browser_ = $browser$$;
    this.browserVersion_ = $browserVersion$$;
    this.platform_ = $platform$$;
    this.platformVersion_ = $platformVersion$$;
};
tr.UserAgent.prototype.getBrowser = function $tr$UserAgent$$getBrowser$() {
    return this.browser_;
};
tr.UserAgent.prototype.getBrowserVersion = function $tr$UserAgent$$getBrowserVersion$() {
    return this.browserVersion_;
};
tr.UserAgent.prototype.getPlatform = function $tr$UserAgent$$getPlatform$() {
    return this.platform_;
};
tr.UserAgent.prototype.getPlatformVersion = function $tr$UserAgent$$getPlatformVersion$() {
    return this.platformVersion_;
};
tr.UserAgent.parse = function $tr$UserAgent$parse$($userAgent$$) {
    var $browser$$ = tr.Browser.UNKNOWN, $browserVersion$$ = new tr.Version, $platform$$ = tr.Platform.UNKNOWN, $platformVersion$$ = new tr.Version, $match$$ = null;
    if ($match$$ = /(?:iPod|iPad|iPhone).*? OS ([\d_]+)/.exec($userAgent$$)) {
        $platform$$ = tr.Platform.IOS, $platformVersion$$ = tr.Version.parse($match$$[1]);
    } else {
        if ($match$$ = /(?:BB\d{2}|BlackBerry).*?Version\/([^\s]*)/.exec($userAgent$$)) {
            $platform$$ = tr.Platform.BLACKBERRY, $platformVersion$$ = tr.Version.parse($match$$[1]);
        } else {
            if ($match$$ = /Android ([^;)]+)|Android/.exec($userAgent$$)) {
                $platform$$ = tr.Platform.ANDROID, $platformVersion$$ = tr.Version.parse($match$$[1]);
            } else {
                if ($match$$ = /Windows Phone(?: OS)? ([^;)]+)/.exec($userAgent$$)) {
                    $platform$$ = tr.Platform.WINDOWS_PHONE, $platformVersion$$ = tr.Version.parse($match$$[1]);
                } else {
                    if ($match$$ = /Linux ([^;)]+)|Linux/.exec($userAgent$$)) {
                        $platform$$ = tr.Platform.LINUX, $platformVersion$$ = tr.Version.parse($match$$[1]);
                    } else {
                        if ($match$$ = /OS X ([^;)]+)/.exec($userAgent$$)) {
                            $platform$$ = tr.Platform.OSX, $platformVersion$$ = tr.Version.parse($match$$[1]);
                        } else {
                            if ($match$$ = /Windows NT ([^;)]+)/.exec($userAgent$$)) {
                                $platform$$ = tr.Platform.WINDOWS, $platformVersion$$ = tr.Version.parse($match$$[1]);
                            } else {
                                if ($match$$ = /CrOS ([^;)]+)/.exec($userAgent$$)) {
                                    $platform$$ = tr.Platform.CHROME_OS, $platformVersion$$ = tr.Version.parse($match$$[1]);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if ($match$$ = /MSIE ([\d\w\.]+)/.exec($userAgent$$)) {
        $browser$$ = tr.Browser.INTERNET_EXPLORER, $browserVersion$$ = tr.Version.parse($match$$[1]);
    } else {
        if ($match$$ = /Trident.*rv:([\d\w\.]+)/.exec($userAgent$$)) {
            $browser$$ = tr.Browser.INTERNET_EXPLORER, $browserVersion$$ = tr.Version.parse($match$$[1]);
        } else {
            if ($match$$ = /OPR\/([\d.]+)/.exec($userAgent$$)) {
                $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
            } else {
                if ($match$$ = /Opera Mini.*Version\/([\d\.]+)/.exec($userAgent$$)) {
                    $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
                } else {
                    if ($match$$ = /Opera(?: |.*Version\/|\/)([\d\.]+)/.exec($userAgent$$)) {
                        $browser$$ = tr.Browser.OPERA, $browserVersion$$ = tr.Version.parse($match$$[1]);
                    } else {
                        if ($match$$ = /Firefox\/([\d\w\.]+)|Firefox/.exec($userAgent$$)) {
                            $browser$$ = tr.Browser.FIREFOX, $browserVersion$$ = tr.Version.parse($match$$[1]);
                        } else {
                            if ($match$$ = /(?:Chrome|CrMo|CriOS)\/([\d\.]+)/.exec($userAgent$$)) {
                                $browser$$ = tr.Browser.CHROME, $browserVersion$$ = tr.Version.parse($match$$[1]);
                            } else {
                                if ($match$$ = /Silk\/([\d\._]+)/.exec($userAgent$$)) {
                                    $browser$$ = tr.Browser.SILK, $browserVersion$$ = tr.Version.parse($match$$[1]);
                                } else {
                                    if ($platform$$ === tr.Platform.ANDROID || $platform$$ === tr.Platform.BLACKBERRY) {
                                        $browser$$ = tr.Browser.BUILTIN;
                                    } else {
                                        if ($match$$ = /Version\/([\d\.\w]+).*Safari/.exec($userAgent$$)) {
                                            $browser$$ = tr.Browser.SAFARI, $browserVersion$$ = tr.Version.parse($match$$[1]);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return new tr.UserAgent($browser$$, $browserVersion$$, $platform$$, $platformVersion$$);
};
// Input 8
var userAgent = tr.UserAgent.parse(goog.global.navigator.userAgent), rasterizer = tr.Rasterizer.get(userAgent), antialiasing = tr.Antialiasing.get(userAgent), antialiasingGuess = tr.Antialiasing.guess(userAgent), documentElement = goog.global.document.documentElement;
tr.dom.addClass(documentElement, "tr-" + rasterizer);
antialiasing === tr.Antialiasing.UNKNOWN && antialiasingGuess !== tr.Antialiasing.UNKNOWN && (antialiasing += "-" + antialiasingGuess);
tr.dom.addClass(documentElement, "tr-aa-" + antialiasing);
}());





/* ==========================================================================
   enquire.js 2.
   https://github.com/WickyNilliams/enquire.js
   ========================================================================== */


(function(name, context, factory) {
    var matchMedia = window.matchMedia;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(matchMedia);
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return (context[name] = factory(matchMedia));
        });
    } else {
        context[name] = factory(matchMedia);
    }
}('enquire', this, function(matchMedia) {

    'use strict';

    /*jshint unused:false */
    /**
     * Helper function for iterating over a collection
     *
     * @param collection
     * @param fn
     */
    function each(collection, fn) {
        var i = 0,
            length = collection.length,
            cont;

        for (i; i < length; i++) {
            cont = fn(collection[i], i);
            if (cont === false) {
                break; //allow early exit
            }
        }
    }

    /**
     * Helper function for determining whether target object is an array
     *
     * @param target the object under test
     * @return {Boolean} true if array, false otherwise
     */
    function isArray(target) {
        return Object.prototype.toString.apply(target) === '[object Array]';
    }

    /**
     * Helper function for determining whether target object is a function
     *
     * @param target the object under test
     * @return {Boolean} true if function, false otherwise
     */
    function isFunction(target) {
        return typeof target === 'function';
    }

    /**
     * Delegate to handle a media query being matched and unmatched.
     *
     * @param {object} options
     * @param {function} options.match callback for when the media query is matched
     * @param {function} [options.unmatch] callback for when the media query is unmatched
     * @param {function} [options.setup] one-time callback triggered the first time a query is matched
     * @param {boolean} [options.deferSetup=false] should the setup callback be run immediately, rather than first time query is matched?
     * @constructor
     */
    function QueryHandler(options) {
        this.options = options;
        !options.deferSetup && this.setup();
    }
    QueryHandler.prototype = {

        /**
         * coordinates setup of the handler
         *
         * @function
         */
        setup: function() {
            if (this.options.setup) {
                this.options.setup();
            }
            this.initialised = true;
        },

        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         */
        on: function() {
            !this.initialised && this.setup();
            this.options.match && this.options.match();
        },

        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         */
        off: function() {
            this.options.unmatch && this.options.unmatch();
        },

        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy: function() {
            this.options.destroy ? this.options.destroy() : this.off();
        },

        /**
         * determines equality by reference.
         * if object is supplied compare options, if function, compare match callback
         *
         * @function
         * @param {object || function} [target] the target for comparison
         */
        equals: function(target) {
            return this.options === target || this.options.match === target;
        }

    };
    /**
     * Represents a single media query, manages it's state and registered handlers for this query
     *
     * @constructor
     * @param {string} query the media query string
     * @param {boolean} [isUnconditional=false] whether the media query should run regardless of whether the conditions are met. Primarily for helping older browsers deal with mobile-first design
     */
    function MediaQuery(query, isUnconditional) {
        this.query = query;
        this.isUnconditional = isUnconditional;
        this.handlers = [];
        this.mql = matchMedia(query);

        var self = this;
        this.listener = function(mql) {
            self.mql = mql;
            self.assess();
        };
        this.mql.addListener(this.listener);
    }
    MediaQuery.prototype = {

        /**
         * add a handler for this query, triggering if already active
         *
         * @param {object} handler
         * @param {function} handler.match callback for when query is activated
         * @param {function} [handler.unmatch] callback for when query is deactivated
         * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
         * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
         */
        addHandler: function(handler) {
            var qh = new QueryHandler(handler);
            this.handlers.push(qh);

            this.matches() && qh.on();
        },

        /**
         * removes the given handler from the collection, and calls it's destroy methods
         *
         * @param {object || function} handler the handler to remove
         */
        removeHandler: function(handler) {
            var handlers = this.handlers;
            each(handlers, function(h, i) {
                if (h.equals(handler)) {
                    h.destroy();
                    return !handlers.splice(i, 1); //remove from array and exit each early
                }
            });
        },

        /**
         * Determine whether the media query should be considered a match
         *
         * @return {Boolean} true if media query can be considered a match, false otherwise
         */
        matches: function() {
            return this.mql.matches || this.isUnconditional;
        },

        /**
         * Clears all handlers and unbinds events
         */
        clear: function() {
            each(this.handlers, function(handler) {
                handler.destroy();
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0; //clear array
        },

        /*
         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
         */
        assess: function() {
            var action = this.matches() ? 'on' : 'off';

            each(this.handlers, function(handler) {
                handler[action]();
            });
        }
    };
    /**
     * Allows for registration of query handlers.
     * Manages the query handler's state and is responsible for wiring up browser events
     *
     * @constructor
     */
    function MediaQueryDispatch() {
        if (!matchMedia) {
            throw new Error('matchMedia not present, legacy browsers require a polyfill');
        }

        this.queries = {};
        this.browserIsIncapable = !matchMedia('only all').matches;
    }

    MediaQueryDispatch.prototype = {

        /**
         * Registers a handler for the given media query
         *
         * @param {string} q the media query
         * @param {object || Array || Function} options either a single query handler object, a function, or an array of query handlers
         * @param {function} options.match fired when query matched
         * @param {function} [options.unmatch] fired when a query is no longer matched
         * @param {function} [options.setup] fired when handler first triggered
         * @param {boolean} [options.deferSetup=false] whether setup should be run immediately or deferred until query is first matched
         * @param {boolean} [shouldDegrade=false] whether this particular media query should always run on incapable browsers
         */
        register: function(q, options, shouldDegrade) {
            var queries = this.queries,
                isUnconditional = shouldDegrade && this.browserIsIncapable;

            if (!queries[q]) {
                queries[q] = new MediaQuery(q, isUnconditional);
            }

            //normalise to object in an array
            if (isFunction(options)) {
                options = {
                    match: options
                };
            }
            if (!isArray(options)) {
                options = [options];
            }
            each(options, function(handler) {
                queries[q].addHandler(handler);
            });

            return this;
        },

        /**
         * unregisters a query and all it's handlers, or a specific handler for a query
         *
         * @param {string} q the media query to target
         * @param {object || function} [handler] specific handler to unregister
         */
        unregister: function(q, handler) {
            var query = this.queries[q];

            if (query) {
                if (handler) {
                    query.removeHandler(handler);
                } else {
                    query.clear();
                    delete this.queries[q];
                }
            }

            return this;
        }
    };

    return new MediaQueryDispatch();

}));
