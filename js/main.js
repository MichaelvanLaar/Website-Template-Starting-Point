/*☺
Individual JavaScript for [Project name]
*/


/* SCRIPT DIRECTORY

jQuery Scripts

1. jKit initialisation
2. Cache some repetedly used elements
3. Menu (accordion menu or dropdown menu, according to screen size)
4. ScrollToFixed application
5. Sisyphus initialisation

*/


/* =============================================================================
   1.  jKit initialisation
   ========================================================================== */

$(document).ready(function() {
	$('body').jKit();
});


/* =============================================================================
   2.  Cache some repeatedly used elements
   ========================================================================== */

var mvl_main_navigation_container = $('#main-navigation-container');
var mvl_accordion_toggle = $('#main-navigation-toggle');
var mvl_main_navigation = $('#main-navigation');
var mvl_main_navigation_list = $('#main-navigation-list');
var mvl_dropdown_toggles_li = mvl_main_navigation_list.find('.has_children');
var mvl_dropdown_toggles_a = mvl_dropdown_toggles_li.children('a');


/* =============================================================================
   3.  Menu (accordion menu or dropdown menu, according to screen size)
   ========================================================================== */

$(document).ready(function() {

	// remove href attribute from all menu links that are used as submenu toggle links
	mvl_dropdown_toggles_a.each(function() {
		var mvl_dropdown_href = $(this).attr('href');
		$(this).attr('data-target', mvl_dropdown_href).removeAttr('href');
	});

	// add functionality to "Navigtion" button which reveals the accordion menu
	mvl_accordion_toggle.click(function() {
		mvl_accordion_toggle.toggleClass('show-submenu');
		mvl_dropdown_toggles_li.removeClass('show-submenu'); // hide all "inner" accordion submenus
	});

	// accordion resp. dropdown functionality
	mvl_dropdown_toggles_a.click(function() {
		var mvl_dropdown_toggle_li = $(this).parent('li'); // the <li class="has_children"> which is a direct parent of the clicked <a href="…">
		mvl_dropdown_toggle_li.toggleClass('show-submenu'); // show resp. hide clicked dropdown menu
		mvl_dropdown_toggle_li
				.siblings('.show-submenu')
				.removeClass('show-submenu'); // hide all dropdown menus below all siblings of the <li class="has_children"> which is a direct parent of the clicked <a href="…">
		mvl_dropdown_toggle_li
				.find('.show-submenu')
				.removeClass('show-submenu'); // hide all dropdown menus below clicked <a href="…">
	});

});

// accordion menu for smaller screen sizes
enquire.register('screen and (max-width: 1019px)', {
	match: function() {
		mvl_main_navigation_list.css('max-height', $(window).height() - $(mvl_accordion_toggle).outerHeight() * 2); // max height for dropped down menu
		mvl_main_navigation_container.bind('clickoutside', function() {
			mvl_accordion_toggle.removeClass('show-submenu'); // hide accordion menus when the user clicks anywhere outside the menu area
			mvl_dropdown_toggles_li.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
		});
	},
	unmatch: function() {
		mvl_main_navigation_container.unbind('clickoutside');
		mvl_accordion_toggle.removeClass('show-submenu');
		mvl_main_navigation_list
			.css('max-height', '')
			.find('.show-submenu')
			.removeClass('show-submenu');
		mvl_accordion_toggle.removeClass('show-submenu');
	}
});

// dropdown menu for bigger screen sizes
enquire.register('screen and (min-width: 1020px)', {
	match: function() {
		mvl_main_navigation_list.bind('clickoutside', function() {
			mvl_dropdown_toggles_li.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
		});
	},
	unmatch: function() {
		mvl_main_navigation_list
				.unbind('clickoutside')
				.find('.show-submenu')
				.removeClass('show-submenu');
	}
});


/* =============================================================================
   4.  ScrollToFixed application
   ========================================================================== */

$(document).ready(function() {
	mvl_main_navigation_container.scrollToFixed({
		preFixed: function() {
			mvl_main_navigation.jKit('animation', {
				'speed': '150',
				'to': 'margin-left(3.5rem)' // 56px / 16px
			});
			mvl_main_navigation_container.find('#main-navigation-logo').jKit('show', {
				'delay': '150',
				'speed': '150'
			});
		},
		postFixed: function() {
			mvl_main_navigation_container.find('#main-navigation-logo').jKit('hide', {
				'speed': '150'
			});
			mvl_main_navigation.jKit('animation', {
				'delay': '150',
				'speed': '150',
				'to': 'margin-left(0)'
			});
		}
	});
});


/* =============================================================================
   5.  Sisyphus initialisation
   ========================================================================== */

$(document).ready(function() {
	if ($('form').length > 0) {
		$('form').sisyphus();
	}
});