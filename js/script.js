/*☺
Individual JavaScript for [Project name]
*/


/* SCRIPT DIRECTORY

jQuery Scripts

1. Menu initialisation (JQuery Accordion Plugin / Superfish)
2. Sisyphus initialisation
3. enquire.js listener setup (should be the last call in this script file)

*/


// remap jQuery to $
(function($){


	/* =============================================================================
	   1.  Menu initialisation (JQuery Accordion Plugin / Superfish)
	   ========================================================================== */
	
	/* The following script does not yet “unload” the added superfish functionality
	   if the browser window gets too small for the superfish navigation. */

	enquire.register('screen and (max-width: 570px)', {
		match: function(){},
		setup: function(){
			$('.ac-menu').initAcMenu();
		},
		deferSetup: true
	}).register('screen and (min-width: 571px)', {
		match: function(){},
		setup: function(){
			$('.sf-menu').supersubs({
				minWidth:    12,   // minimum width of sub-menus in em units
				maxWidth:    27,   // maximum width of sub-menus in em units
				extraWidth:  1     // extra width can ensure lines don't sometimes turn over due to slight rounding differences and font-family
			}).superfish({dropShadows: false});   // rather use CSS3 box shadows
		},
		deferSetup: true
	});


	/* =============================================================================
	   2.  Sisyphus initialisation
	   ========================================================================== */

	$(document).ready(function(){
		if($('form').length > 0){
			$('form').sisyphus();
		}
	});

	
})(this.jQuery);



/* =============================================================================
   3. enquire.js listener setup (should be the last call in this script file)
   ========================================================================== */

enquire.listen();