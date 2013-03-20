/*☺
Individual JavaScript for [Project name]
*/


/* SCRIPT DIRECTORY

jQuery Scripts

1. Menu (dropdown menu functionality and SelectNav.js initialisation)
2. Sisyphus initialisation
3. enquire.js listener setup (should be the last call in this script file)

*/


/* =============================================================================
   1.  Menu (dropdown menu functionality and SelectNav.js initialisation)
   ========================================================================== */

enquire.register('screen and (min-width: 570px)', {
	match: function(){
		$(mvl_dropdown_toggles_a).each(function(){
			var mvl_dropdown_href = $(this).attr('href');
			$(this).attr('data-target', mvl_dropdown_href).removeAttr('href');
		});
		$(mvl_dropdown_toggles_a).click(function(){
			var mvl_dropdown_toggle_li = $(this).parent('li');                       // the <li class="has_children"> which is a direct parent of the clicked <a href="…">
			$(mvl_dropdown_toggle_li).toggleClass('show-submenu');                   // show resp. hide clicked dropdown menu
			$(mvl_dropdown_toggle_li)
				.siblings('.show-submenu')
				.removeClass('show-submenu');                                        // hide all dropdown menus below all siblings of the <li class="has_children"> which is a direct parent of the clicked <a href="…">
			$(mvl_dropdown_toggle_li)
				.find('.show-submenu')
				.removeClass('show-submenu');                                        // hide all dropdown menus below clicked <a href="…">
		});
		$('#main-navigation-list').bind('clickoutside', function(event){
			$(mvl_dropdown_toggles_li).removeClass('show-submenu');                  // hide all dropdown menus when the user clicks anywhere outside the menu area
		});
	},
	unmatch: function() {
		$('#main-navigation-list').unbind('clickoutside');
		$(mvl_dropdown_toggles_a).each(function(){
			var mvl_dropdown_href = $(this).attr('data-target');
			$(this).attr('href', mvl_dropdown_href).removeAttr('data-target');
		});
	},
	setup: function(){

		// preparation for dropdown menu
		mvl_dropdown_toggles_li = $('#main-navigation-list').find('.has_children');  // cache all <li class="has_children">
		mvl_dropdown_toggles_a = $(mvl_dropdown_toggles_li).children('a');             // cache all <a href="…"> which are direct children of <li class="has_children">

		// SelectNav.js initialization
		selectnav('main-navigation-list', {
			activeclass: 'current',
			nested: true,
			indent: ' –',
			label: '► Navigation'

		});
	}
});


/* =============================================================================
   2.  Sisyphus initialisation
   ========================================================================== */

$(document).ready(function(){
	if($('form').length > 0){
		$('form').sisyphus();
	}
});


/* =============================================================================
   3. enquire.js listener setup (should be the last call in this script file)
   ========================================================================== */

enquire.listen();