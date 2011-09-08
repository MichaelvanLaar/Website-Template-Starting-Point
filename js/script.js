/*☺
Individual JavaScript for [Project name]
*/


/* SCRIPT DIRECTORY

jQuery Scripts

1. Menu initialisation (JQuery Accordion Plugin / Superfish)

*/


// remap jQuery to $
(function($){


	/* =============================================================================
	   1.  Menu initialisation (JQuery Accordion Plugin / Superfish)
	   ========================================================================== */
	
	/* The following script only choses the right script depending on the screen size
	   at pageload. This should be reworked in the future, so that the menu behavior
	   also changes for a fully loaded page each time the window is resized. */

	$(document).ready(function(){
		if (document.documentElement.clientWidth < 571) {   // Initialise Simple JQuery Accordion Plugin for small screens
			$('.ac-menu').initAcMenu();
		} else {   // Initialise Superfish (with Supersubs) for screens wider than 570px (= width of #main)
			$('.sf-menu').supersubs({ 
				minWidth:    12,   // minimum width of sub-menus in em units 
				maxWidth:    27,   // maximum width of sub-menus in em units 
				extraWidth:  1     // extra width can ensure lines don't sometimes turn over due to slight rounding differences and font-family
			}).superfish({dropShadows: false});   // rather use CSS3 box shadows
		}
	});


})(this.jQuery);
