/*☺
JavaScript Plugins for [Project name]
*/


/* PLUGIN DIRECTORY

jQuery Plugins:
1. Skiplink Focus Fix
2. Printed Footer Links
3. Enhanced jQuery Placeholder plugin (polyfill)
4. Sisyphus (autosave form input)
5. hoverIntent
6. Superfish
7. Supersubs (flexible widths for Superfish menu)
8. Simple JQuery Accordion Plugin

Non-jQuery libs:
9. enquire.js

*/


// remap jQuery to $
(function($){


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
	   5.  hoverIntent - jQuery Plugin
	       http://cherne.net/brian/resources/jquery.hoverIntent.html
	   ========================================================================== */

	$.fn.hoverIntent = function(f,g) {
		// default configuration options
		var cfg = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		// override configuration options with user supplied object
		cfg = $.extend(cfg, g ? { over: f, out: g } : f );

		// instantiate variables
		// cX, cY = current X and Y position of mouse, updated by mousemove event
		// pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
		var cX, cY, pX, pY;

		// A private function for getting mouse position
		var track = function(ev) {
			cX = ev.pageX;
			cY = ev.pageY;
		};

		// A private function for comparing current and previous mouse position
		var compare = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			// compare mouse positions to see if they've crossed the threshold
			if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
				$(ob).unbind("mousemove",track);
				// set hoverIntent state to true (so mouseOut can be called)
				ob.hoverIntent_s = 1;
				return cfg.over.apply(ob,[ev]);
			} else {
				// set previous coordinates for next time
				pX = cX; pY = cY;
				// use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
				ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
			}
		};

		// A private function for delaying the mouseOut function
		var delay = function(ev,ob) {
			ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
			ob.hoverIntent_s = 0;
			return cfg.out.apply(ob,[ev]);
		};

		// A private function for handling mouse 'hovering'
		var handleHover = function(e) {
			// copy objects to be passed into t (required for event object to be passed in IE)
			var ev = jQuery.extend({},e);
			var ob = this;

			// cancel hoverIntent timer if it exists
			if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

			// if e.type == "mouseenter"
			if (e.type == "mouseenter") {
				// set "previous" X and Y position based on initial entry point
				pX = ev.pageX; pY = ev.pageY;
				// update "current" X and Y position based on mousemove
				$(ob).bind("mousemove",track);
				// start polling interval (self-calling timeout) to compare mouse coordinates over time
				if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

			// else e.type == "mouseleave"
			} else {
				// unbind expensive mousemove event
				$(ob).unbind("mousemove",track);
				// if hoverIntent state is true, then call the mouseOut function after the specified delay
				if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
			}
		};

		// bind the function to the two event listeners
		return this.bind('mouseenter',handleHover).bind('mouseleave',handleHover);
	};


	/* =============================================================================
	   6.  Superfish v1.4.8 - jQuery Plugin
	       http://users.tpg.com.au/j_birch/plugins/superfish/
	   ========================================================================== */

	$.fn.superfish = function(op){

		var sf = $.fn.superfish,
			c = sf.c,
			$arrow = $(['<span class="',c.arrowClass,'"> &#187;</span>'].join('')),
			over = function(){
				var $$ = $(this), menu = getMenu($$);
				clearTimeout(menu.sfTimer);
				$$.showSuperfishUl().siblings().hideSuperfishUl();
			},
			out = function(){
				var $$ = $(this), menu = getMenu($$), o = sf.op;
				clearTimeout(menu.sfTimer);
				menu.sfTimer=setTimeout(function(){
					o.retainPath=($.inArray($$[0],o.$path)>-1);
					$$.hideSuperfishUl();
					if (o.$path.length && $$.parents(['li.',o.hoverClass].join('')).length<1){over.call(o.$path);}
				},o.delay);
			},
			getMenu = function($menu){
				var menu = $menu.parents(['ul.',c.menuClass,':first'].join(''))[0];
				sf.op = sf.o[menu.serial];
				return menu;
			},
			addArrow = function($a){ $a.addClass(c.anchorClass).append($arrow.clone()); };
			
		return this.each(function() {
			var s = this.serial = sf.o.length;
			var o = $.extend({},sf.defaults,op);
			o.$path = $('li.'+o.pathClass,this).slice(0,o.pathLevels).each(function(){
				$(this).addClass([o.hoverClass,c.bcClass].join(' '))
					.filter('li:has(ul)').removeClass(o.pathClass);
			});
			sf.o[s] = sf.op = o;
			
			$('li:has(ul)',this)[($.fn.hoverIntent && !o.disableHI) ? 'hoverIntent' : 'hover'](over,out).each(function() {
				if (o.autoArrows) addArrow( $('>a:first-child',this) );
			})
			.not('.'+c.bcClass)
				.hideSuperfishUl();
			
			var $a = $('a',this);
			$a.each(function(i){
				var $li = $a.eq(i).parents('li');
				$a.eq(i).focus(function(){over.call($li);}).blur(function(){out.call($li);});
			});
			o.onInit.call(this);
			
		}).each(function() {
			var menuClasses = [c.menuClass];
			if (sf.op.dropShadows  && !($.browser.msie && $.browser.version < 7)) menuClasses.push(c.shadowClass);
			$(this).addClass(menuClasses.join(' '));
		});
	};

	var sf = $.fn.superfish;
	sf.o = [];
	sf.op = {};
	sf.IE7fix = function(){
		var o = sf.op;
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!==undefined)
			this.toggleClass(sf.c.shadowClass+'-off');
		};
	sf.c = {
		bcClass     : 'sf-breadcrumb',
		menuClass   : 'sf-js-enabled',
		anchorClass : 'sf-with-ul',
		arrowClass  : 'sf-sub-indicator',
		shadowClass : 'sf-shadow'
	};
	sf.defaults = {
		hoverClass	: 'sfHover',
		pathClass	: 'overideThisToUse',
		pathLevels	: 1,
		delay		: 800,
		animation	: {opacity:'show'},
		speed		: 'normal',
		autoArrows	: true,
		dropShadows : true,
		disableHI	: false,		// true disables hoverIntent detection
		onInit		: function(){}, // callback functions
		onBeforeShow: function(){},
		onShow		: function(){},
		onHide		: function(){}
	};
	$.fn.extend({
		hideSuperfishUl : function(){
			var o = sf.op,
				not = (o.retainPath===true) ? o.$path : '';
			o.retainPath = false;
			var $ul = $(['li.',o.hoverClass].join(''),this).add(this).not(not).removeClass(o.hoverClass)
					.find('>ul').hide().css('visibility','hidden');
			o.onHide.call($ul);
			return this;
		},
		showSuperfishUl : function(){
			var o = sf.op,
				sh = sf.c.shadowClass+'-off',
				$ul = this.addClass(o.hoverClass)
					.find('>ul:hidden').css('visibility','visible');
			sf.IE7fix.call($ul);
			o.onBeforeShow.call($ul);
			$ul.animate(o.animation,o.speed,function(){ sf.IE7fix.call($ul); o.onShow.call($ul); });
			return this;
		}
	});


	/* =============================================================================
	   7.  Supersubs v0.2b - jQuery Plugin
	       http://users.tpg.com.au/j_birch/plugins/superfish/
	   ========================================================================== */

	$.fn.supersubs = function(options){
		var opts = $.extend({}, $.fn.supersubs.defaults, options);
		// return original object to support chaining
		return this.each(function() {
			// cache selections
			var $$ = $(this);
			// support metadata
			var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
			// get the font size of menu.
			// .css('fontSize') returns various results cross-browser, so measure an em dash instead
			var fontsize = $('<li id="menu-fontsize">&#8212;</li>').css({
				'padding' : 0,
				'position' : 'absolute',
				'top' : '-999em',
				'width' : 'auto'
			}).appendTo($$).width(); //clientWidth is faster, but was incorrect here
			// remove em dash
			$('#menu-fontsize').remove();
			// cache all ul elements
			$ULs = $$.find('ul');
			// loop through each ul in menu
			$ULs.each(function(i) {
				// cache this ul
				var $ul = $ULs.eq(i);
				// get all (li) children of this ul
				var $LIs = $ul.children();
				// get all anchor grand-children
				var $As = $LIs.children('a');
				// force content to one line and save current float property
				var liFloat = $LIs.css('white-space','nowrap').css('float');
				// remove width restrictions and floats so elements remain vertically stacked
				var emWidth = $ul.add($LIs).add($As).css({
					'float' : 'none',
					'width'	: 'auto'
				})
				// this ul will now be shrink-wrapped to longest li due to position:absolute
				// so save its width as ems. Clientwidth is 2 times faster than .width() - thanks Dan Switzer
				.end().end()[0].clientWidth / fontsize;
				// add more width to ensure lines don't turn over at certain sizes in various browsers
				emWidth += o.extraWidth;
				// restrict to at least minWidth and at most maxWidth
				if (emWidth > o.maxWidth)		{ emWidth = o.maxWidth; }
				else if (emWidth < o.minWidth)	{ emWidth = o.minWidth; }
				emWidth += 'em';
				// set ul to width in ems
				$ul.css('width',emWidth);
				// restore li floats to avoid IE bugs
				// set li width to full width of this ul
				// revert white-space to normal
				$LIs.css({
					'float' : liFloat,
					'width' : '100%',
					'white-space' : 'normal'
				})
				// update offset position of descendant ul to reflect new width of parent
				.each(function(){
					var $childUl = $('>ul',this);
					var offsetDirection = $childUl.css('left')!==undefined ? 'left' : 'right';
					$childUl.css(offsetDirection,emWidth);
				});
			});
			
		});
	};
	// expose defaults
	$.fn.supersubs.defaults = {
		minWidth		: 9,		// requires em unit.
		maxWidth		: 25,		// requires em unit.
		extraWidth		: 0			// extra width can ensure lines don't sometimes turn over due to slight browser differences in how they round-off values
	};


	/* =============================================================================
	   8.  Simple JQuery Accordion Plugin - jQuery Plugin
	       http://www.i-marco.nl/weblog/archive/2010/02/27/yup_yet_another_jquery_accordi
	   ========================================================================== */

	jQuery.fn.initAcMenu = function() {
		return this.each(function(){
			var theMenu = $(this).get(0);
			$('.acitem', this).hide();
			$('li.expand > .acitem', this).show();
			$('li.expand > .acitem', this).prev().addClass('active');
			$('li a', this).click(
				function(e) {
					e.stopImmediatePropagation();
					var theElement = $(this).next();
					var parent = this.parentNode.parentNode;
					if($(parent).hasClass('noaccordion')) {
						if(theElement[0] === undefined) {
							window.location.href = this.href;
						}
						$(theElement).slideToggle('normal', function() {
							if ($(this).is(':visible')) {
								$(this).prev().addClass('active');
							}
							else {
								$(this).prev().removeClass('active');
							}
						});
						return false;
					}
					else {
						if(theElement.hasClass('acitem') && theElement.is(':visible')) {
							if($(parent).hasClass('collapsible')) {
								$('.acitem:visible', parent).first().slideUp('normal',
								function() {
									$(this).prev().removeClass('active');
								});
								return false;
							}
							return false;
						}
						if(theElement.hasClass('acitem') && !theElement.is(':visible')) {
							$('.acitem:visible', parent).first().slideUp('normal', function() {
								$(this).prev().removeClass('active');
							});
							theElement.slideDown('normal', function() {
								$(this).prev().addClass('active');
							});
							return false;
						}
					}
				}
			);
		});
	};


})(this.jQuery);



/* =============================================================================
   9.  enquire.js
   ========================================================================== */

// enquire v1.5.0 - Awesome Media Queries in JavaScript
// Copyright (c) 2012 Nick Williams - https://www.github.com/WickyNilliams/enquire.js
// License: MIT (http://www.opensource.org/licenses/mit-license.php)


window.enquire = (function(matchMedia) {

    "use strict";

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
        return Object.prototype.toString.apply(target) === "[object Array]";
    }

    /**
     * Helper function for determining whether target object is a function
     *
     * @param target the object under test
     * @return {Boolean} true if function, false otherwise
     */
    function isFunction(target) {
        return typeof target === "function";
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
        this.initialised = false;
        this.options = options;

        if(!options.deferSetup) {
			this.setup();
		}
    }
    QueryHandler.prototype = {

        /**
         * coordinates setup of the handler
         *
         * @function
         */
        setup : function(e) {
            if(this.options.setup){
                this.options.setup(e);
            }
            this.initialised = true;
        },

        /**
         * coordinates setup and triggering of the handler
         *
         * @function
         * @param [e] the browser event which triggered a match
         */
        on : function(e) {
            if(!this.initialised){
                this.setup(e);
            }
            this.options.match(e);
        },

        /**
         * coordinates the unmatch event for the handler
         *
         * @function
         * @param [e] the browser event which triggered a match
         */
        off : function(e) {
            if(this.options.unmatch){
                this.options.unmatch(e);
            }
        },

        /**
         * called when a handler is to be destroyed.
         * delegates to the destroy or unmatch callbacks, depending on availability.
         *
         * @function
         */
        destroy : function() {
            if(this.options.destroy) {
                this.options.destroy();
            }
            else {
                this.off();
            }
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
    this.matched = false;
}
MediaQuery.prototype = {

    /**
     * tests whether this media query is currently matching
     *
     * @function
     * @returns {boolean} true if match, false otherwise
     */
    matchMedia : function() {
        return matchMedia(this.query).matches;
    },

    /**
     * add a handler for this query, triggering if already active
     *
     * @function
     * @param {object} handler
     * @param {function} handler.match callback for when query is activated
     * @param {function} [handler.unmatch] callback for when query is deactivated
     * @param {function} [handler.setup] callback for immediate execution when a query handler is registered
     * @param {boolean} [handler.deferSetup=false] should the setup callback be deferred until the first time the handler is matched?
     * @param {boolean} [turnOn=false] should the handler be turned on if the query is matching?
     */
    addHandler : function(handler, turnOn) {
        var qh = new QueryHandler(handler);
        this.handlers.push(qh);

        turnOn && this.matched && qh.on();
    },

    /**
     * removes the given handler from the collection, and calls it's destroy methods
     *
     * @function
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

    /*
     * assesses the query, turning on all handlers if it matches, turning them off if it doesn't match
     *
     * @function
     */
    assess : function(e) {
        if(this.matchMedia() || this.isUnconditional) {
            this.match(e);
        }
        else {
            this.unmatch(e);
        }
    },

    /**
     * activates a query.
     * callbacks are fired only if the query is currently unmatched
     *
     * @function
     * @param {Event} [e] browser event if triggered as the result of a browser event
     */
    match : function(e) {
        if(this.matched) {
			return; //already on
		}

        each(this.handlers, function(handler) {
            handler.on(e);
        });
        this.matched = true;
    },

    /**
     * deactivates a query.
     * callbacks are fired only if the query is currently matched
     *
     * @function
     * @param {Event} [e] browser event if triggered as the result of a browser event
     */
    unmatch : function(e) {
        if(!this.matched) {
			return; //already off
        }

        each(this.handlers, function(handler){
			handler.off(e);
        });
        this.matched = false;
    }
};
    /**
     * Allows for reigstration of query handlers.
     * Manages the  query handler's state and is responsible for wiring up browser events
     *
     * @constructor
     */
    function MediaQueryDispatch () {
        if(!matchMedia) {
            throw new Error("matchMedia is required");
        }

        var capabilityTest = new MediaQuery("only all");
        this.queries = {};
        this.listening = false;
        this.browserIsIncapable = !capabilityTest.matchMedia();
    }

    MediaQueryDispatch.prototype = {

        /**
         * Registers a handler for the given media query
         *
         * @function
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
                isUnconditional = shouldDegrade && this.browserIsIncapable,
                listening       = this.listening;

            if(!queries.hasOwnProperty(q)) {
                queries[q] = new MediaQuery(q, isUnconditional);
            }

            //normalise to object
            if(isFunction(options)) {
                options = {
                    match : options
                };
            }
            //normalise to array
            if(!isArray(options)) {
                options = [options];
            }
            each(options, function(handler) {
                queries[q].addHandler(handler, listening);
            });

            return this;
        },

        /**
         * unregisters a query and all it's handlers, or a specific handler for a query
         *
         * @function
         * @param {string} q the media query to target
         * @param {object || function} [handler] specific handler to unregister
         */
        unregister : function(q, handler) {
            var queries = this.queries;

            if(!queries.hasOwnProperty(q)) {
                return this;
            }
            
            if(!handler) {
                each(this.queries[q].handlers, function(handler) {
                    handler.destroy();
                });
                delete queries[q];
            }
            else {
                queries[q].removeHandler(handler);
            }

            return this;
        },

        /**
         * Tests all media queries and calls relevant methods depending whether
         * transitioning from unmatched->matched or matched->unmatched
         *
         * @function
         * @param {Event} [e] if fired as a result of a browser event,
         * an event can be supplied to propagate to the various media query handlers
         */
        fire : function(e) {
            var queries = this.queries,
                mediaQuery;

            for(mediaQuery in queries) {
                if(queries.hasOwnProperty(mediaQuery)) {
                    queries[mediaQuery].assess(e);
				}
            }
            return this;
        },

        /**
         * sets up listeners for resize and orientation events
         *
         * @function
         * @param {int} [timeout=500] the time (in milliseconds) after which the queries should be handled
         */
        listen : function(timeout) {
            var eventWireUp = window.addEventListener || window.attachEvent,
                self = this;

            timeout = timeout || 500;

            //prevent multiple event handlers
            if(this.listening) {
				return this;
			}

            //creates closure for separate timed event
            function wireFire(event) {
                var timer;

                eventWireUp(event, function(e) {
                    if(timer) {
						clearTimeout(timer);
					}

                    timer = setTimeout(function() {
                        self.fire(e);
                    }, timeout);
                });
            }

            //handle initial load then listen
            self.fire();
            wireFire("resize");
            wireFire("orientationChange");

            this.listening = true;
            return this;
        }
    };


    return new MediaQueryDispatch();

}(window.matchMedia));