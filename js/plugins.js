/*☺
JavaScript Plugins for [Project name]
*/


// Avoid `console` errors in browsers that lack a console.
(function() {
	var method;
	var noop = function () {};
	var methods = [
		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
		'timeStamp', 'trace', 'warn'
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


/* PLUGIN DIRECTORY

jQuery Plugins:
1.  Skiplink Focus Fix
2.  Printed Footer Links
3.  Enhanced jQuery Placeholder plugin (polyfill)
4.  Sisyphus (autosave form input)
5.  Automatic event tracking for Google Analytics
6.  jQuery outside events
7.  jquery.animate-enhanced plugin

Non-jQuery libs:
8.  Type Rendering Mix
9.  enquire.js
10. SelectNav.js

*/


/* =============================================================================
   1.  Skiplink Focus Fix - jQuery Plugin
   ========================================================================== */

// Configuration: Enter a proper selector for your skiplinks
// (the same way you would address these elements in your CSS).
var skiplinkselector = '#skiplinks a';

// From here on no configuration or changes required.
$(document).ready(function() {
	var is_webkit = navigator.userAgent.toLowerCase().indexOf('webkit') > -1;
	var is_opera = navigator.userAgent.toLowerCase().indexOf('opera') > -1;
	if(is_webkit || is_opera) {
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


/* =============================================================================
   2.  Printed Footer Links - jQuery Plugin
       http://life.mysiteonline.org/archives/191-jQuery-Printed-Footer-Links.html
   ========================================================================== */

$(document).ready(function(){
	//get the container and target
	var links = $('#main').find('a[href]:not([href^=#],[href^=mailto],[href^=javascript],:has(img))');

	if($(links).length){
		//create a container and heading for the footnotes
		var footnotesWrapper = $('<section></section>', {
			css: {
				clear: 'both'
			}
		}).addClass('print-only print-links-footer');
		var footnotesLabel = $('<h3></h3>', {
			text: 'Erwähnte Webseiten:'
		}).appendTo(footnotesWrapper);

		//create an OL to hold the footnotes
		var footnoteList = $('<ol></ol>').appendTo(footnotesWrapper);

		$.each(links, function(i){
			var linkText = $(this).text();
			var linkValue = $(this).attr('href');
			if(linkValue.substring(0,6) !== 'http://'){
				if(linkValue.substring(0,1) === '/'){
					linkValue = 'http://www.' + document.location.host + linkValue;
				} else {
					linkValue = 'http://www.' + document.location.host + '/' + linkValue;
				}
			}
			//create element to hold span with class to hide except on print
			var newElement = $('<sup></sup>', {
				text: '['+ ++i +']'
			}).addClass('print-only').insertAfter($(this));

			var listEntry = $('<li></li>', {
				text: linkValue
			}).appendTo(footnoteList);
		});

		// append the heading and <ol> to the target
		$('#main').append(footnotesWrapper);
	}
});


/* =============================================================================
   3.  Enhanced jQuery Placeholder plugin (polyfill) - jQuery Plugin
       https://github.com/dciccale/placeholder-enhanced
   ========================================================================== */

$.fn.placeholderEnhanced = function() {

	// don't act on absent elements
	if(!this.length) return;
	
	var // placeholder css class (if you change the class name, be sure to change the c below to "placeholder")
		c = "placeholder",
		// if browser supports placeholder attribute, use native events to show/hide placeholder
		hasNativeSupport = c in document.createElement("input");
		
		
		// extra check for Opera: Opera 11 supports placeholder only for input, and you cannot style it yet, even with a class you can't.
		// http://my.opera.com/ODIN/blog/2010/12/17/new-html5-features-in-opera-11
		// http://dev.opera.com/forums/topic/841252?t=1296553904&page=1#comment8072202
		// this is fixed for version 11.50
		if($.browser.opera && $.browser.version < '11.50') hasNativeSupport = false;
		
	// ensure not sending placeholder value when placeholder is not supported
	if (!hasNativeSupport) {
		$('form').submit(function() {
			// form
			var $this = $(this);
			
			// empty input value if is the same as the placeholder attribute
			$this.find('input[placeholder], textarea[placeholder]').each(function () {
				var e = $(this);
				if (e.attr('value') === e.attr('placeholder')) {
					e.val('');
				}
			});
		});
	}

	return this.each(function () {

		var e = $(this), d = e.attr("placeholder"), ispassword = e.attr('type') === "password";

		// on focus
		var placeholderOnFocus = function () {
			if(e.hasClass(c)) {
				if(!hasNativeSupport) {
					e.val('');
				}
				e.removeClass(c);
			}
		};

		// on blur
		var placeholderOnBlur = function (event) {
			// if there is no initial value
			// or initial value is equal to placeholder, init the placeholder
			if(!e.val() || e.val() === d) {
				if(!hasNativeSupport) {
					if(!ispassword) {
						e.addClass(c).val(d);
					}
					else {
						showInput(fakePassw);
						hideInput(e);
					}
				}
				else {
					e.addClass(c);
				}
			}
		};

		// hides password input
		var hideInput = function(e) {
			e.css({position: 'absolute', left: '-9999em'});
		};

		// shows dummy text input
		var showInput = function(e) {
			return e.removeAttr('style');
		};

		// placeholder for text and textarea
		if(!ispassword || hasNativeSupport) {
			e.bind('focus.placeholder', placeholderOnFocus);
		}

		// placeholder for password
		else {
			// get class from the original input if any (to keep any styling)
			var inputCssClass = (e[0].className) ? ' ' + e[0].className : '',
			// get size attr also
					size = (e[0].size) ? 'size=' + e[0].size : '';
		
			// create input with tabindex="-1" to skip tabbing
			var fakePassw = $('<input type="text" class="' + c + inputCssClass + '" value="' + d + '"' + size + ' tabindex="-1" />');
			
			// trigger password focus when focus is on text input
			fakePassw.bind('focus.placeholder', function() {
				e.trigger('focus.placeholder');
			});
			
			// insert the text input
			e.before(fakePassw)
			// focus event to show the real password input
			.bind('focus.placeholder', function() {
				showInput(e);
				hideInput(fakePassw);
			});
		}
		
		// bind blur event and trigger on load
		e.bind('blur.placeholder', placeholderOnBlur)
		.trigger('blur.placeholder');
	
	});
};

// auto-initialize the plugin
$(function () {
	$('input[placeholder], textarea[placeholder]').placeholderEnhanced();
});

// if placeholder is not supported, the jQuery val function returns the placeholder
// redefine the val function to fix this
var hasNativeSupport = "placeholder" in document.createElement("input");
if($.browser.opera && $.browser.version < '11.50') hasNativeSupport = false;
if(!hasNativeSupport) {
	var jQval = $.fn.val;
	$.fn.val = function (value) {
		if (!arguments.length) {
			return $(this).attr("value") === $(this).attr("placeholder") ? "" : $(this).attr("value");
		}
		return jQval.call(this, value);
	};
}


/* =============================================================================
   4.  Sisyphus - jQuery Plugin
       http://simsalabim.github.com/sisyphus/
   ========================================================================== */

$.sisyphus = function() {
	return Sisyphus.getInstance();
};

$.fn.sisyphus = function( options ) {
	var sisyphus = Sisyphus.getInstance();
	sisyphus.setOptions( options );
	sisyphus.protect( this );
	return sisyphus;
};


Sisyphus = ( function() {
	var params = {
		instantiated: null,
		started: null
	};

	function init () {
	
		return {
		
		
			/**
			 * Set plugin initial options
			 *
			 * @param [Object] options
			 *
			 * @return void
			 */
			setInitialOptions: function ( options ) {
				var defaults = {
					excludeFields: null,
					customKeyPrefix: "",
					timeout: 0,
					onSave: function() {},
					onRestore: function() {},
					onRelease: function() {}
				};
				this.options = this.options || $.extend( defaults, options );
			},
		
			/**
			 * Set plugin options
			 *
			 * @param [Object] options
			 *
			 * @return void
			 */
			setOptions: function ( options ) {
				this.options = this.options || this.setInitialOptions( options );
				this.options = $.extend( this.options, options );
			},
		
		
			/**
			 * Protect specified forms, store it's fields data to local storage and restore them on page load
			 *
			 * @param [Object] targets    forms object(s), result of jQuery selector
			 * @param Object options      plugin options
			 *
			 * @return void
			 */
			protect: function( targets ) {
				targets = targets || {};
				var self = this;
				this.targets = this.targets || [];
				this.href = location.hostname + location.pathname + location.search;
			
				this.targets = $.merge( this.targets, targets );
				this.targets = $.unique( this.targets );
				this.targets = $( this.targets );
				if ( ! this.isLocalStorageAvailable() ) {
					return false;
				}
			
				self.restoreAllData();
				self.bindReleaseData();
				if ( ! params.started ) {
					self.bindSaveData();
					params.started = true;
				}
			},
		
		
			/**
			 * Check if local storage is available
			 *
			 * @return Boolean
			 */
			isLocalStorageAvailable: function() {
				try {
					return localStorage.getItem;
				} catch ( e ) {
					return false;
				}
			},
		
		
			/**
			 * Bind saving data
			 *
			 * @return void
			 */
			bindSaveData: function() {
				var self = this;
			
				if ( self.options.timeout ) {
					self.saveDataByTimeout();
				}
			
				self.targets.each( function() {
					var targetFormId = $( this ).attr( "id" );
					var fieldsToProtect = $( this ).find( ":input" ).not( ":submit" ).not( ":reset" ).not( ":button" );
					
					fieldsToProtect.each( function() {
						if ( $.inArray( this, self.options.excludeFields ) !== -1 ) {
							// Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
							return true;
						}
						var field = $( this );
						var prefix = self.href + targetFormId + field.attr( "name" ) + self.options.customKeyPrefix;
						if ( field.is( ":text" ) || field.is( "textarea" ) ) {
							if ( ! self.options.timeout ) {
								self.bindSaveDataImmediately( field, prefix );
							}
						} else {
							self.bindSaveDataOnChange( field, prefix );
						}
					});
				});
			},
		
		
			/**
			 * Save all protected forms data to Local Storage.
			 * Common method, necessary to not lead astray user firing 'data are saved' when select/checkbox/radio
			 * is changed and saved, while textfield data are saved only by timeout
			 *
			 * @return void
			 */
			saveAllData: function() {
				var self = this;
				self.targets.each( function() {
					var targetFormId = $( this ).attr( "id" );
					var fieldsToProtect = $( this ).find( ":input" ).not( ":submit" ).not( ":reset" ).not( ":button" );
					
					fieldsToProtect.each( function() {
						if ( $.inArray( this, self.options.excludeFields ) !== -1 ) {
							// Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
							return true;
						}
						var field = $( this );
						var prefix = self.href + targetFormId + field.attr( "name" ) + self.options.customKeyPrefix;
						var value = field.val();
					
						if ( field.is(":checkbox") ) {
							if ( field.attr( "name" ).indexOf( "[" ) != -1 ) {
								value = [];
								$( "[name='" + field.attr( "name" ) +"']:checked" ).each( function() {
									value.push( $( this ).val() );
								} );
							} else {
								value = field.is( ":checked" );
							}
							self.saveToLocalStorage( prefix, value, false );
						} else if ( field.is( ":radio" ) ) {
							if ( field.is( ":checked" ) ) {
								value = field.val();
								self.saveToLocalStorage( prefix, value, false );
							}
						} else {
							self.saveToLocalStorage( prefix, value, false );
						}
					} );
				} );
				if ( $.isFunction( self.options.onSave ) ) {
					self.options.onSave.call();
				}
			},
		
		
			/**
			 * Restore forms data from Local Storage
			 *
			 * @return void
			 */
			restoreAllData: function() {
				var self = this;
				var restored = false;
			
				self.targets.each( function() {
					var target = $( this );
					var targetFormId = target.attr( "id" );
					var fieldsToProtect = target.find( ":input" ).not( ":submit" ).not( ":reset" ).not( ":button" );
					
					fieldsToProtect.each( function() {
						if ( $.inArray( this, self.options.excludeFields ) !== -1 ) {
							// Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
							return true;
						}
						var field = $( this );
						var prefix = self.href + targetFormId + field.attr( "name" ) + self.options.customKeyPrefix;
						var resque = localStorage.getItem( prefix );
						if ( resque ) {
							self.restoreFieldsData( field, resque );
							restored = true;
						}
					} );
				} );
			
				if ( restored && $.isFunction( self.options.onRestore ) ) {
					self.options.onRestore.call();
				}
			},
		
		
			/**
			 * Restore form field data from local storage
			 *
			 * @param Object field    jQuery form element object
			 * @param String resque   previously stored fields data
			 *
			 * @return void
			 */
			restoreFieldsData: function( field, resque ) {
				if ( field.is(":checkbox") && resque !== 'false' && field.attr("name").indexOf("[") === -1 ) {
					field.attr( "checked", "checked" );
				} else if ( field.is(":radio") ) {
					if (field.val() === resque) {
						field.attr("checked", "checked");
					}
				} else if ( field.attr( "name" ).indexOf( "[" ) === -1 ) {
					field.val( resque );
				} else {
					resque = resque.split( "," );
					field.val( resque );
				}
			},
		
		
			/**
			 * Bind immediate saving (on typing/checking/changing) field data to local storage when user fills it
			 *
			 * @param Object field    jQuery form element object
			 * @param String prefix   prefix used as key to store data in local storage
			 *
			 * @return void
			 */
			bindSaveDataImmediately: function( field, prefix ) {
				var self = this;
				if ( $.browser.msie === null ) {
					field.get(0).oninput = function() {
						self.saveToLocalStorage( prefix, field.val() );
					};
				} else {
					field.get(0).onpropertychange = function() {
						self.saveToLocalStorage( prefix, field.val() );
					};
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
			saveToLocalStorage: function( key, value, fireCallback ) {
				// if fireCallback is undefined it should be true
				fireCallback = fireCallback === null ? true : fireCallback;
				try {
					localStorage.setItem( key, value + "" );
				} catch (e) {
					//QUOTA_EXCEEDED_ERR
				}
				if ( fireCallback && value !== "" && $.isFunction( this.options.onSave ) ) {
					this.options.onSave.call();
				}
			},
		
		
			/**
			 * Bind saving field data on change
			 *
			 * @param Object field    jQuery form element object
			 * @param String prefix   prefix used as key to store data in local storage
			 *
			 * @return void
			 */
			bindSaveDataOnChange: function( field, prefix ) {
				var self = this;
				field.change( function() {
					self.saveAllData();
				} );
			},
		
		
			/**
			 * Saving (by timeout) field data to local storage when user fills it
			 *
			 * @return void
			 */
			saveDataByTimeout: function() {
				var self = this;
				var targetForms = self.targets;
				setTimeout( ( function( targetForms ) {
					function timeout() {
						self.saveAllData();
						setTimeout( timeout, self.options.timeout * 1000 );
					}
					return timeout;
				} )( targetForms ), self.options.timeout * 1000 );
			},
		
		
			/**
			 * Bind release form fields data from local storage on submit/reset form
			 *
			 * @return void
			 */
			bindReleaseData: function() {
				var self = this;
				self.targets.each( function( i ) {
					var target = $( this );
					var fieldsToProtect = target.find( ":input" ).not( ":submit" ).not( ":reset" ).not( ":button" );
					var formId = target.attr( "id" );
					$( this ).bind( "submit reset", function() {
						self.releaseData( formId, fieldsToProtect );
					});
				});
			
			
			},
		
		
			/**
			 * Bind release form fields data from local storage on submit/resett form
			 *
			 * @param String targetFormId
			 * @param Object fieldsToProtect    jQuery object contains form fields to protect
			 *
			 * @return void
			 */
			releaseData: function( targetFormId, fieldsToProtect ) {
				var released = false;
				var self = this;
				fieldsToProtect.each( function() {
					if ( $.inArray( this, self.options.excludeFields ) !== -1 ) {
						// Returning non-false is the same as a continue statement in a for loop; it will skip immediately to the next iteration.
						return true;
					}
					var field = $( this );
					var prefix = self.href + targetFormId + field.attr( "name" ) + self.options.customKeyPrefix;
					localStorage.removeItem( prefix );
					released = true;
				} );
			
				if ( released && $.isFunction( self.options.onRelease ) ) {
					self.options.onRelease.call();
				}
			}
		
		};
	}

	return {
	
		getInstance: function() {
			if ( ! params.instantiated ) {
				params.instantiated = init();
				params.instantiated.setInitialOptions();
			}
			return params.instantiated;
		},
	
		free: function() {
			params = {};
			return null;
		}
	};
} )();


/* =============================================================================
   5.  Automatic event tracking for Google Analytics - jQuery Plugin
       http://www.thomashutter.com/index.php/2011/10/google-analytics-klicks-mit-automatisiertem-klick-event-tracking-messen/
   ========================================================================== */

jQuery(document).ready(function($) {
	var filetypes = /\.(zip|exe|pdf|doc*|xls*|ppt*|mp3)$/i;
	var baseHref = '';
	if (jQuery('base').attr('href') !== undefined) {
		baseHref = jQuery('base').attr('href');
	}
	jQuery('a').each(function() {
		var href = jQuery(this).attr('href');
		if (href && (href.match(/^https?\:/i)) && (!href.match(document.domain))) {
			jQuery(this).click(function() {
				var extLink = href.replace(/^https?\:\/\//i, '');
				_gaq.push(['_trackEvent', 'Extern', 'Klick', extLink]);
				if (jQuery(this).attr('target') !== undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
					setTimeout(function() { location.href = href; }, 200);
					return false;
				}
			});
		}
		else if (href && href.match(/^mailto\:/i)) {
			jQuery(this).click(function() {
				var mailLink = href.replace(/^mailto\:/i, '');
				_gaq.push(['_trackEvent', 'E-Mail', 'Klick', mailLink]);
			});
		}
		else if (href && href.match(filetypes)) {
			jQuery(this).click(function() {
				var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
				var filePath = href;
				_gaq.push(['_trackEvent', 'Download', 'Klick-' + extension, filePath]);
				if (jQuery(this).attr('target') !== undefined && jQuery(this).attr('target').toLowerCase() != '_blank') {
					setTimeout(function() { location.href = baseHref + href; }, 200);
					return false;
				}
			});
		}
	});
});


/* =============================================================================
   6.   jQuery outside events
        http://benalman.com/projects/jquery-outside-events-plugin/
   ========================================================================== */

/*!
 * jQuery outside events - v1.1 - 3/16/2010
 * http://benalman.com/projects/jquery-outside-events-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */

// Script: jQuery outside events
//
// *Version: 1.1, Last updated: 3/16/2010*
// 
// Project Home - http://benalman.com/projects/jquery-outside-events-plugin/
// GitHub       - http://github.com/cowboy/jquery-outside-events/
// Source       - http://github.com/cowboy/jquery-outside-events/raw/master/jquery.ba-outside-events.js
// (Minified)   - http://github.com/cowboy/jquery-outside-events/raw/master/jquery.ba-outside-events.min.js (0.9kb)
// 
// About: License
// 
// Copyright (c) 2010 "Cowboy" Ben Alman,
// Dual licensed under the MIT and GPL licenses.
// http://benalman.com/about/license/
// 
// About: Examples
// 
// These working examples, complete with fully commented code, illustrate a few
// ways in which this plugin can be used.
// 
// clickoutside - http://benalman.com/code/projects/jquery-outside-events/examples/clickoutside/
// dblclickoutside - http://benalman.com/code/projects/jquery-outside-events/examples/dblclickoutside/
// mouseoveroutside - http://benalman.com/code/projects/jquery-outside-events/examples/mouseoveroutside/
// focusoutside - http://benalman.com/code/projects/jquery-outside-events/examples/focusoutside/
// 
// About: Support and Testing
// 
// Information about what version or versions of jQuery this plugin has been
// tested with, what browsers it has been tested in, and where the unit tests
// reside (so you can test it yourself).
// 
// jQuery Versions - 1.4.2
// Browsers Tested - Internet Explorer 6-8, Firefox 2-3.6, Safari 3-4, Chrome, Opera 9.6-10.1.
// Unit Tests      - http://benalman.com/code/projects/jquery-outside-events/unit/
// 
// About: Release History
// 
// 1.1 - (3/16/2010) Made "clickoutside" plugin more general, resulting in a
//       whole new plugin with more than a dozen default "outside" events and
//       a method that can be used to add new ones.
// 1.0 - (2/27/2010) Initial release
//
// Topic: Default "outside" events
// 
// Note that each "outside" event is powered by an "originating" event. Only
// when the originating event is triggered on an element outside the element
// to which that outside event is bound will the bound event be triggered.
// 
// Because each outside event is powered by a separate originating event,
// stopping propagation of that originating event will prevent its related
// outside event from triggering.
// 
//  OUTSIDE EVENT     - ORIGINATING EVENT
//  clickoutside      - click
//  dblclickoutside   - dblclick
//  focusoutside      - focusin
//  bluroutside       - focusout
//  mousemoveoutside  - mousemove
//  mousedownoutside  - mousedown
//  mouseupoutside    - mouseup
//  mouseoveroutside  - mouseover
//  mouseoutoutside   - mouseout
//  keydownoutside    - keydown
//  keypressoutside   - keypress
//  keyupoutside      - keyup
//  changeoutside     - change
//  selectoutside     - select
//  submitoutside     - submit

(function($,doc,outside){
  '$:nomunge'; // Used by YUI compressor.
  
  $.map(
    // All these events will get an "outside" event counterpart by default.
    'click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup'.split(' '),
    function( event_name ) { jq_addOutsideEvent( event_name ); }
  );
  
  // The focus and blur events are really focusin and focusout when it comes
  // to delegation, so they are a special case.
  jq_addOutsideEvent( 'focusin',  'focus' + outside );
  jq_addOutsideEvent( 'focusout', 'blur' + outside );
  
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
  //    "outside" event will be powered by. This event can be a native or
  //    custom event, as long as it bubbles up the DOM tree.
  //  outside_event_name - (String) An optional name for the new "outside"
  //    event. If omitted, the outside event will be named whatever the
  //    value of `event_name` is plus the "outside" suffix.
  // 
  // Returns:
  // 
  //  Nothing.
  
  $.addOutsideEvent = jq_addOutsideEvent;
  
  function jq_addOutsideEvent( event_name, outside_event_name ) {
    
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
    
    $.event.special[ outside_event_name ] = {
      
      // Called only when the first "outside" event callback is bound per
      // element.
      setup: function(){
        
        // Add this element to the list of elements to which this "outside"
        // event is bound.
        elems = elems.add( this );
        
        // If this is the first element getting the event bound, bind a handler
        // to document to catch all corresponding "originating" events.
        if ( elems.length === 1 ) {
          $(doc).bind( event_namespaced, handle_event );
        }
      },
      
      // Called only when the last "outside" event callback is unbound per
      // element.
      teardown: function(){
        
        // Remove this element from the list of elements to which this
        // "outside" event is bound.
        elems = elems.not( this );
        
        // If this is the last element removed, remove the "originating" event
        // handler on document that powers this "outside" event.
        if ( elems.length === 0 ) {
          $(doc).unbind( event_namespaced );
        }
      },
      
      // Called every time a "outside" event callback is bound to an element.
      add: function( handleObj ) {
        var old_handler = handleObj.handler;
        
        // This function is executed every time the event is triggered. This is
        // used to override the default event.target reference with one that is
        // more useful.
        handleObj.handler = function( event, elem ) {
          
          // Set the event object's .target property to the element that the
          // user interacted with, not the element that the "outside" event was
          // was triggered on.
          event.target = elem;
          
          // Execute the actual bound handler.
          old_handler.apply( this, arguments );
        };
      }
    };
    
    // When the "originating" event is triggered..
    function handle_event( event ) {
      
      // Iterate over all elements to which this "outside" event is bound.
      $(elems).each(function(){
        var elem = $(this);
        
        // If this element isn't the element on which the event was triggered,
        // and this element doesn't contain said element, then said element is
        // considered to be outside, and the "outside" event will be triggered!
        if ( this !== event.target && !elem.has(event.target).length ) {
          
          // Use triggerHandler instead of trigger so that the "outside" event
          // doesn't bubble. Pass in the "originating" event's .target so that
          // the "outside" event.target can be overridden with something more
          // meaningful.
          elem.triggerHandler( outside_event_name, [ event.target ] );
        }
      });
    };
    
  };
  
})(jQuery,document,"outside");


/* =============================================================================
   7.  jquery.animate-enhanced plugin
       https://github.com/benbarnett/jQuery-Animate-Enhanced
   ========================================================================== */

/*
jquery.animate-enhanced plugin v1.05
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
---
Copyright (c) 2012 Ben Barnett

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
---
Extends jQuery.animate() to automatically use CSS3 transformations where applicable.
Tested with jQuery 1.3.2+

Supports -moz-transition, -webkit-transition, -o-transition, transition

Targetted properties (for now):
	- left
	- top
	- opacity
	- width
	- height

Usage (exactly the same as it would be normally):

	jQuery(element).animate({left: 200},  500, function() {
		// callback
	});

Changelog:
	1.05 (14/08/2013):
		- Merging PR #124 fix for highcharts clash. Thanks @bensonc!

	1.04 (14/08/2013):
		- Using fix from issue #69 by @rickyk586 to support percentages

	1.03 (19/7/2013):
		- Merge PR #129 (Use originalAnimateMethod if a step callback function is provided.) /thx @lehni

	1.02 (8/5/2013):
		- Fixing use3D default flags. It must explicitly be set to false to disable 3d now, the plugin by default will use it if available.

	1.01 (8/5/2013):
		- Adding appropriate display value for wider range of elements (issue #121 - thanks smacky)

	1.0 (8/5/2103):
		- Fix avoidTransforms: true behaviour for directional transitions

	0.99.1 (3/4/2013):
		- Add Set or unset the 'disabled by default' value (PR #117)

	0.99 (5/12/2012):
		- PR #109 Added support for list-item nodes. FadeIn on tags was omitting the list-style support. (thx @SeanCannon)
		
	0.98 (12/11/2012):
		- Merging pull request #106 thx @gboysko - checking for ownerDocument before using getComputedStyle

	0.97 (6/11/2012):
		- Merging pull request #104 thx @gavrochelegnou - .bind instead of .one

	0.96a (20/08/2012):
		- Checking event is from dispatch target (issue #58)

	0.96 (20/08/2012):
		- Fixes for context, all elements returned as context (issue #84)
		- Reset position with leaveTransforms !== true fixes (issue #93)
		

	0.95 (20/08/2012):
		- If target opacity == current opacity, pass back to jquery native to get callback firing (#94)

	0.94 (20/08/2012):
		- Addresses Firefox callback mechanisms (issue #94)
		- using $.one() to bind to CSS callbacks in a more generic way

	0.93 (6/8/2012):
		- Adding other Opera 'transitionend' event (re: issue #90)

	0.92 (6/8/2012):
		- Seperate unbinds into different threads (re: issue #91)

	0.91 (2/4/2012):
		- Merge Pull Request #74 - Unit Management

	0.90 (7/3/2012):
		- Adding public $.toggleDisabledByDefault() feature to disable entire plugin by default (Issue #73)

	0.89 (24/1/2012):
		- Adding 'avoidCSSTransitions' property. Set to true to disable entire plugin. (Issue #47)

	0.88 (24/1/2012):
		- Fix Issue #67 for HighchartsJS compatibility

	0.87 (24/1/2012):
		- Fix Issue #66 selfCSSData.original is undefined

	0.86 (9/1/2012):
		- Strict JS fix for undefined variable

	0.85 (20/12/2011):
		- Merge Pull request #57 from Kronuz
		- Codebase cleaned and now passes jshint.
		- Fixed a few bugs (it now saves and restores the original css transition properties).
		- fadeOut() is fixed, it wasn't restoring the opacity after hiding it.

	0.80 (13/09/2011):
		- Issue #28 - Report $(el).is(':animated') fix

	0.79 (06/09/2011):
		- Issue #42 - Right negative position animation: please see issue notes on Github.

	0.78 (02/09/2011):
		- Issue #18 - jQuery/$ reference joys

	0.77 (02/09/2011):
		- Adding feature on Github issue #44 - Use 3D Transitions by default

	0.76 (28/06/2011):
		- Fixing issue #37 - fixed stop() method (with gotoEnd == false)

	0.75 (15/06/2011):
		- Fixing issue #35 to pass actual object back as context for callback

	0.74 (28/05/2011):
		- Fixing issue #29 to play nice with 1.6+

	0.73 (05/03/2011):
		- Merged Pull Request #26: Fixed issue with fadeOut() / "hide" shortcut

	0.72 (05/03/2011):
		- Merged Pull Request #23: Added Penner equation approximations from Matthew Lein's Ceaser, and added failsafe fallbacks

	0.71 (05/03/2011):
		- Merged Pull Request #24: Changes translation object to integers instead of strings to fix relative values bug with leaveTransforms = true

	0.70 (17/03/2011):
		- Merged Pull Request from amlw-nyt to add bottom/right handling

	0.68 (15/02/2011):
		- width/height fixes & queue issues resolved.

	0.67 (15/02/2011):
		- Code cleanups & file size improvements for compression.

	0.66 (15/02/2011):
		- Zero second fadeOut(), fadeIn() fixes

	0.65 (01/02/2011):
		- Callbacks with queue() support refactored to support element arrays

	0.64 (27/01/2011):
		- BUGFIX #13: .slideUp(), .slideToggle(), .slideDown() bugfixes in Webkit

	0.63 (12/01/2011):
		- BUGFIX #11: callbacks not firing when new value == old value

	0.62 (10/01/2011):
		- BUGFIX #11: queue is not a function issue fixed

	0.61 (10/01/2011):
		- BUGFIX #10: Negative positions converting to positive

	0.60 (06/01/2011):
		- Animate function rewrite in accordance with new queue system
		- BUGFIX #8: Left/top position values always assumed relative rather than absolute
		- BUGFIX #9: animation as last item in a chain - the chain is ignored?
		- BUGFIX: width/height CSS3 transformation with left/top working

	0.55 (22/12/2010):
		- isEmptyObject function for <jQuery 1.4 (requires 1.3.2)

	0.54a (22/12/2010):
		- License changed to MIT (http://www.opensource.org/licenses/mit-license.php)

	0.54 (22/12/2010):
		- Removed silly check for 'jQuery UI' bailouts. Sorry.
		- Scoping issues fixed - Issue #4: $(this) should give you a reference to the selector being animated.. per jquery's core animation funciton.

	0.53 (17/11/2010):
		- New $.translate() method to easily calculate current transformed translation
		- Repeater callback bug fix for leaveTransforms:true (was constantly appending properties)

	0.52 (16/11/2010):
		- leaveTransforms: true bug fixes
		- 'Applying' user callback function to retain 'this' context

	0.51 (08/11/2010):
		- Bailing out with jQuery UI. This is only so the plugin plays nice with others and is TEMPORARY.

	0.50 (08/11/2010):
		- Support for $.fn.stop()
		- Fewer jQuery.fn entries to preserve namespace
		- All references $ converted to jQuery
		- jsDoc Toolkit style commenting for docs (coming soon)

	0.49 (19/10/2010):
		- Handling of 'undefined' errors for secondary CSS objects
		- Support to enhance 'width' and 'height' properties (except shortcuts involving jQuery.fx.step, e.g slideToggle)
		- Bugfix: Positioning when using avoidTransforms: true (thanks Ralf Santbergen reports)
		- Bugfix: Callbacks and Scope issues

	0.48 (13/10/2010):
		- Checks for 3d support before applying

	0.47 (12/10/2010);
		- Compatible with .fadeIn(), .fadeOut()
		- Use shortcuts, no duration for jQuery default or "fast" and "slow"
		- Clean up callback event listeners on complete (preventing multiple callbacks)

	0.46 (07/10/2010);
		- Compatible with .slideUp(), .slideDown(), .slideToggle()

	0.45 (06/10/2010):
		- 'Zero' position bug fix (was originally translating by 0 zero pixels, i.e. no movement)

	0.4 (05/10/2010):
		- Iterate over multiple elements and store transforms in jQuery.data per element
		- Include support for relative values (+= / -=)
		- Better unit sanitization
		- Performance tweaks
		- Fix for optional callback function (was required)
		- Applies data[translateX] and data[translateY] to elements for easy access
		- Added 'easeInOutQuint' easing function for CSS transitions (requires jQuery UI for JS anims)
		- Less need for leaveTransforms = true due to better position detections
*/

(function(jQuery, originalAnimateMethod, originalStopMethod) {

	// ----------
	// Plugin variables
	// ----------
	var	cssTransitionProperties = ['top', 'right', 'bottom', 'left', 'opacity', 'height', 'width'],
		directions = ['top', 'right', 'bottom', 'left'],
		cssPrefixes = ['-webkit-', '-moz-', '-o-', ''],
		pluginOptions = ['avoidTransforms', 'useTranslate3d', 'leaveTransforms'],
		rfxnum = /^([+-]=)?([\d+-.]+)(.*)$/,
		rupper = /([A-Z])/g,
		defaultEnhanceData = {
			secondary: {},
			meta: {
				top : 0,
				right : 0,
				bottom : 0,
				left : 0
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
	if ( jQuery.expr && jQuery.expr.filters ) {
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
	function _getUnit(val){
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
			if (hidden) e.css({'display': _domElementVisibleDisplayValue(e.context.tagName), 'opacity': 0});
		} else if (!parts && val == "hide") {
			cleanStart = 0;
		}

		if (parts) {
			var end = parseFloat(parts[2]);

			// If a +=/-= token was provided, we're doing a relative animation
			if (parts[1]) end = ((parts[1] === '-=' ? -1 : 1) * end) + parseInt(cleanStart, 10);

			// check for unit  as per issue #69
			if (parts[3] == '%') end = end + '%';

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
	 * @return {[type]}         [description]
	 */
	function _domElementVisibleDisplayValue(tagName) {
		tagName = tagName.toUpperCase();
		var displayValues = {
			'LI'       : 'list-item',
			'TR'       : 'table-row',
			'TD'       : 'table-cell',
			'TH'       : 'table-cell',
			'CAPTION'  : 'table-caption',
			'COL'      : 'table-column',
			'COLGROUP' : 'table-column-group',
			'TFOOT'      : 'table-footer-group',
			'THEAD'      : 'table-header-group',
			'TBODY'      : 'table-row-group'
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
		var allValid=true;
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

		var	elem = this[0],
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

		return this[ optall.queue === true ? 'queue' : 'each' ](function() {
			var self = jQuery(this),
				opt = jQuery.extend({}, optall),
				cssCallback = function(e) {
					var selfCSSData = self.data(DATA_KEY) || { original: {} },
						restore = {};

					if (e.eventPhase != 2)  // not at dispatching target (thanks @warappa issue #58)
						return;

					// convert translations to left & top for layout
					if (prop.leaveTransforms !== true) {
						for (var i = cssPrefixes.length - 1; i >= 0; i--) {
							restore[cssPrefixes[i] + 'transform'] = '';
						}
						if (isTranslatable && typeof selfCSSData.meta !== 'undefined') {
							for (var j = 0, dir; (dir = directions[j]); ++j) {
								restore[dir] = selfCSSData.meta[dir + '_o'] + valUnit;
								jQuery(this).css(dir, restore[dir]);
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
						self.css({'display': 'none', 'opacity': ''});
					}

					// run the main callback function
					propertyCallback.call(this);
				},
				easings = {
					bounce: CUBIC_BEZIER_OPEN + '0.0, 0.35, .5, 1.3' + CUBIC_BEZIER_CLOSE,
					linear: 'linear',
					swing: 'ease-in-out',

					// Penner equation approximations from Matthew Lein's Ceaser: http://matthewlein.com/ceaser/
					easeInQuad:     CUBIC_BEZIER_OPEN + '0.550, 0.085, 0.680, 0.530' + CUBIC_BEZIER_CLOSE,
					easeInCubic:    CUBIC_BEZIER_OPEN + '0.550, 0.055, 0.675, 0.190' + CUBIC_BEZIER_CLOSE,
					easeInQuart:    CUBIC_BEZIER_OPEN + '0.895, 0.030, 0.685, 0.220' + CUBIC_BEZIER_CLOSE,
					easeInQuint:    CUBIC_BEZIER_OPEN + '0.755, 0.050, 0.855, 0.060' + CUBIC_BEZIER_CLOSE,
					easeInSine:     CUBIC_BEZIER_OPEN + '0.470, 0.000, 0.745, 0.715' + CUBIC_BEZIER_CLOSE,
					easeInExpo:     CUBIC_BEZIER_OPEN + '0.950, 0.050, 0.795, 0.035' + CUBIC_BEZIER_CLOSE,
					easeInCirc:     CUBIC_BEZIER_OPEN + '0.600, 0.040, 0.980, 0.335' + CUBIC_BEZIER_CLOSE,
					easeInBack:     CUBIC_BEZIER_OPEN + '0.600, -0.280, 0.735, 0.045' + CUBIC_BEZIER_CLOSE,
					easeOutQuad:    CUBIC_BEZIER_OPEN + '0.250, 0.460, 0.450, 0.940' + CUBIC_BEZIER_CLOSE,
					easeOutCubic:   CUBIC_BEZIER_OPEN + '0.215, 0.610, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutQuart:   CUBIC_BEZIER_OPEN + '0.165, 0.840, 0.440, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutQuint:   CUBIC_BEZIER_OPEN + '0.230, 1.000, 0.320, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutSine:    CUBIC_BEZIER_OPEN + '0.390, 0.575, 0.565, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutExpo:    CUBIC_BEZIER_OPEN + '0.190, 1.000, 0.220, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutCirc:    CUBIC_BEZIER_OPEN + '0.075, 0.820, 0.165, 1.000' + CUBIC_BEZIER_CLOSE,
					easeOutBack:    CUBIC_BEZIER_OPEN + '0.175, 0.885, 0.320, 1.275' + CUBIC_BEZIER_CLOSE,
					easeInOutQuad:  CUBIC_BEZIER_OPEN + '0.455, 0.030, 0.515, 0.955' + CUBIC_BEZIER_CLOSE,
					easeInOutCubic: CUBIC_BEZIER_OPEN + '0.645, 0.045, 0.355, 1.000' + CUBIC_BEZIER_CLOSE,
					easeInOutQuart: CUBIC_BEZIER_OPEN + '0.770, 0.000, 0.175, 1.000' + CUBIC_BEZIER_CLOSE,
					easeInOutQuint: CUBIC_BEZIER_OPEN + '0.860, 0.000, 0.070, 1.000' + CUBIC_BEZIER_CLOSE,
					easeInOutSine:  CUBIC_BEZIER_OPEN + '0.445, 0.050, 0.550, 0.950' + CUBIC_BEZIER_CLOSE,
					easeInOutExpo:  CUBIC_BEZIER_OPEN + '1.000, 0.000, 0.000, 1.000' + CUBIC_BEZIER_CLOSE,
					easeInOutCirc:  CUBIC_BEZIER_OPEN + '0.785, 0.135, 0.150, 0.860' + CUBIC_BEZIER_CLOSE,
					easeInOutBack:  CUBIC_BEZIER_OPEN + '0.680, -0.550, 0.265, 1.550' + CUBIC_BEZIER_CLOSE
				},
				domProperties = {},
				cssEasing = easings[opt.easing || 'swing'] ? easings[opt.easing || 'swing'] : opt.easing || 'swing';

			// seperate out the properties for the relevant animation functions
			for (var p in prop) {
				if (jQuery.inArray(p, pluginOptions) === -1) {
					var isDirection = jQuery.inArray(p, directions) > -1,
						cleanVal = _interpretValue(self, prop[p], p, (isDirection && prop.avoidTransforms !== true));


					if (/**prop.avoidTransforms !== true && **/_appropriateProperty(p, cleanVal, self)) {
						_applyCSSTransition(
							self,
							p,
							opt.duration,
							cssEasing,
							cleanVal, //isDirection && prop.avoidTransforms === true ? cleanVal + valUnit : cleanVal,
							isDirection && prop.avoidTransforms !== true,
							isTranslatable,
							prop.useTranslate3d);

					}
					else {
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
			}
			else {
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
							restore[cssPrefixes[i]+'transform'] = '';
						}
					}
				} else if (!_isEmptyObject(selfCSSData.secondary)) {
					var cStyle = window.getComputedStyle(self[0], null);
					if (cStyle) {
						// grab current properties
						for (var prop in selfCSSData.secondary) {
							if(selfCSSData.secondary.hasOwnProperty(prop)) {
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
										restore[cssPrefixes[i]+'transform'] = '';
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
			}
			else {
				// dom transition
				originalStopMethod.apply(self, [clearQueue, gotoEnd]);
			}
		});

		return this;
	};
})(jQuery, jQuery.fn.animate, jQuery.fn.stop);


/* =============================================================================
   8.  Type Rendering Mix
       http://typerendering.com/
   ========================================================================== */

/* Type Rendering Mix JS - (c) 2013 Tim Brown, Bram Stein. License: new BSD */(function(){// Input 0
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
    $str$$ = $str$$.replace(RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$);
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
goog.base = function $goog$base$($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if ($caller$$.superClass_) {
    return $caller$$.superClass_.constructor.apply($me$$, Array.prototype.slice.call(arguments, 1));
  }
  for (var $args$$ = Array.prototype.slice.call(arguments, 2), $foundCaller$$ = !1, $ctor$$ = $me$$.constructor;$ctor$$;$ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if ($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller$$ = !0;
    } else {
      if ($foundCaller$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$);
      }
    }
  }
  if ($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$);
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
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
  return $userAgent$$.getPlatform() === tr.Platform.WINDOWS ? $userAgent$$.getBrowser() === tr.Browser.CHROME || $userAgent$$.getBrowser() === tr.Browser.OPERA || $userAgent$$.getPlatformVersion().lt(new tr.Version(6, 0)) ? tr.Rasterizer.GDI : $userAgent$$.getPlatformVersion().ge(new tr.Version(6, 0)) ? $userAgent$$.getBrowser() === tr.Browser.INTERNET_EXPLORER && $userAgent$$.getBrowserVersion().le(new tr.Version(8, 0)) ? tr.Rasterizer.GDI : tr.Rasterizer.DIRECTWRITE : tr.Rasterizer.UNKNOWN : $userAgent$$.getPlatform() === 
  tr.Platform.WINDOWS_PHONE ? tr.Rasterizer.DIRECTWRITE : $userAgent$$.getPlatform() === tr.Platform.OSX || $userAgent$$.getPlatform() === tr.Platform.IOS ? tr.Rasterizer.CORETEXT : $userAgent$$.getPlatform() === tr.Platform.ANDROID || $userAgent$$.getPlatform() === tr.Platform.LINUX || $userAgent$$.getPlatform() === tr.Platform.CHROME_OS || $userAgent$$.getPlatform() === tr.Platform.FIREFOX_OS || $userAgent$$.getPlatform() === tr.Platform.BLACKBERRY ? tr.Rasterizer.FREETYPE : tr.Rasterizer.UNKNOWN;
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


/* =============================================================================
   9.  enquire.js
   ========================================================================== */

/*!
 * enquire.js v2.1.0 - Awesome Media Queries in JavaScript
 * Copyright (c) 2013 Nick Williams - http://wicky.nillia.ms/enquire.js
 * License: MIT (http://www.opensource.org/licenses/mit-license.php)
 */

;(function (name, context, factory) {
	var matchMedia = context.matchMedia;

	if (typeof module !== 'undefined' && module.exports) {
		module.exports = factory(matchMedia);
	}
	else if (typeof define === 'function' && define.amd) {
		define(function() {
			return (context[name] = factory(matchMedia));
		});
	}
	else {
		context[name] = factory(matchMedia);
	}
}('enquire', this, function (matchMedia) {

	'use strict';

    /*jshint unused:false */
    /**
     * Helper function for iterating over a collection
     *
     * @param collection
     * @param fn
     */
    function each(collection, fn) {
        var i      = 0,
            length = collection.length,
            cont;

        for(i; i < length; i++) {
            cont = fn(collection[i], i);
            if(cont === false) {
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
        setup : function() {
            if(this.options.setup) {
                this.options.setup();
            }
            this.initialised = true;
        },

        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         */
        on : function() {
            !this.initialised && this.setup();
            this.options.match && this.options.match();
        },

        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         */
        off : function() {
            this.options.unmatch && this.options.unmatch();
        },

        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy : function() {
            this.options.destroy ? this.options.destroy() : this.off();
        },

        /**
         * determines equality by reference.
         * if object is supplied compare options, if function, compare match callback
         *
         * @function
         * @param {object || function} [target] the target for comparison
         */
        equals : function(target) {
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
        addHandler : function(handler) {
            var qh = new QueryHandler(handler);
            this.handlers.push(qh);

            this.matches() && qh.on();
        },

        /**
         * removes the given handler from the collection, and calls it's destroy methods
         * 
         * @param {object || function} handler the handler to remove
         */
        removeHandler : function(handler) {
            var handlers = this.handlers;
            each(handlers, function(h, i) {
                if(h.equals(handler)) {
                    h.destroy();
                    return !handlers.splice(i,1); //remove from array and exit each early
                }
            });
        },

        /**
         * Determine whether the media query should be considered a match
         * 
         * @return {Boolean} true if media query can be considered a match, false otherwise
         */
        matches : function() {
            return this.mql.matches || this.isUnconditional;
        },

        /**
         * Clears all handlers and unbinds events
         */
        clear : function() {
            each(this.handlers, function(handler) {
                handler.destroy();
            });
            this.mql.removeListener(this.listener);
            this.handlers.length = 0; //clear array
        },

        /*
         * Assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
         */
        assess : function() {
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
    function MediaQueryDispatch () {
        if(!matchMedia) {
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
        register : function(q, options, shouldDegrade) {
            var queries         = this.queries,
                isUnconditional = shouldDegrade && this.browserIsIncapable;

            if(!queries[q]) {
                queries[q] = new MediaQuery(q, isUnconditional);
            }

            //normalise to object in an array
            if(isFunction(options)) {
                options = { match : options };
            }
            if(!isArray(options)) {
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
        unregister : function(q, handler) {
            var query = this.queries[q];

            if(query) {
                if(handler) {
                    query.removeHandler(handler);
                }
                else {
                    query.clear();
                    delete this.queries[q];
                }
            }

            return this;
        }
    };

	return new MediaQueryDispatch();

}));


/* =============================================================================
   10. SelectNav.js
   ========================================================================== */

/**
 * @preserve SelectNav.js (v. 0.1)
 * Converts your <ul>/<ol> navigation into a dropdown list for small screens
 * https://github.com/lukaszfiszer/selectnav.js
 */

window.selectnav = (function(){

"use strict";

  var selectnav = function(element,options){

    element = document.getElementById(element);

    // return immediately if element doesn't exist
    if( ! element){
      return;
    }

    // return immediately if element is not a list
    if( ! islist(element) ){
      return;
    }

    // add a js class to <html> tag
    // document.documentElement.className += " js";

    // retreive options and set defaults
    var o = options || {},

      activeclass = o.activeclass || 'active',
      autoselect = typeof(o.autoselect) === "boolean" ? o.autoselect : true,
      nested = typeof(o.nested) === "boolean" ? o.nested : true,
      indent = o.indent || "→",
      label = o.label || "- Navigation -",

      // helper variables
      level = 0,
      selected = " selected ";

    // insert the freshly created dropdown navigation after the existing navigation
    element.insertAdjacentHTML('afterend', parselist(element) );

    var nav = document.getElementById(id());

    // autoforward on click
    if (nav.addEventListener) {
      nav.addEventListener('change',goTo);
    }
    if (nav.attachEvent) {
      nav.attachEvent('onchange', goTo);
    }

    return nav;

    function goTo(e){

      // Crossbrowser issues - http://www.quirksmode.org/js/events_properties.html
      var targ;
      if (!e) e = window.event;
      if (e.target) targ = e.target;
      else if (e.srcElement) targ = e.srcElement;
      if (targ.nodeType === 3) // defeat Safari bug
        targ = targ.parentNode;

      if(targ.value) window.location.href = targ.value;
    }

    function islist(list){
      var n = list.nodeName.toLowerCase();
      return (n === 'ul' || n === 'ol');
    }

    function id(nextId){
      for(var j=1; document.getElementById('selectnav'+j);j++);
      return (nextId) ? 'selectnav'+j : 'selectnav'+(j-1);
    }

    function parselist(list){

      // go one level down
      level++;

      var length = list.children.length,
        html = '',
        prefix = '',
        k = level-1
        ;

      // return immediately if has no children
      if (!length) {
        return;
      }

      if(k) {
        while(k--){
          prefix += indent;
        }
        prefix += " ";
      }

      for(var i=0; i < length; i++){

        var link = list.children[i].children[0];
        if(typeof(link) !== 'undefined'){
          var text = link.innerText || link.textContent;
          var isselected = '';

          if(activeclass){
            isselected = link.className.search(activeclass) !== -1 || link.parentElement.className.search(activeclass) !== -1 ? selected : '';
          }

          if(autoselect && !isselected){
            isselected = link.href === document.URL ? selected : '';
          }

          html += '<option value="' + link.href + '" ' + isselected + '>' + prefix + text +'</option>';

          if(nested){
            var subElement = list.children[i].children[1];
            if( subElement && islist(subElement) ){
              html += parselist(subElement);
            }
          }
        }
      }

      // adds label
      if(level === 1 && label) {
        html = '<option value="">' + label + '</option>' + html;
      }

      // add <select> tag to the top level of the list
      if(level === 1) {
        html = '<select class="selectnav" id="'+id(true)+'">' + html + '</select>';
      }

      // go 1 level up
      level--;

      return html;
    }

  };

  return function (element,options) {
    selectnav(element,options);
  };


})();