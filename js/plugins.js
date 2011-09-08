/*☺
JavaScript Plugins for [Project name]
*/


/* PLUGIN DIRECTORY

jQuery Plugins

1. Skiplink Focus Fix
2. Printed Footer Links 
3. hoverIntent
4. Superfish
5. Supersubs (flexible widths for Superfish menu)
6. Simple JQuery Accordion Plugin

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
		};
	})


	/* =============================================================================
	   2.  Printed Footer Links - jQuery Plugin
	       http://life.mysiteonline.org/archives/191-jQuery-Printed-Footer-Links.html
	   ========================================================================== */

	$(document).ready(function(){
		//get the container and target
		var links = $('#main a[href]:not([href^=#],[href^=mailto],[href^=javascript],:has(img))');

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
				if(linkValue.substring(0,1) === '/'){
					linkValue = 'http://www.'+document.location.host + linkValue;
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
	   3.  hoverIntent - jQuery Plugin
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
	   4.  Superfish v1.4.8 - jQuery Plugin
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
		if ($.browser.msie && $.browser.version > 6 && o.dropShadows && o.animation.opacity!=undefined)
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
	   5.  Supersubs v0.2b - jQuery Plugin
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
	   6.  Simple JQuery Accordion Plugin - jQuery Plugin
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
