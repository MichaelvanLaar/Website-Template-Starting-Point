/*☺
Individual JavaScript for [Project name]
*/


/* SCRIPT DIRECTORY

jQuery Scripts

1. SelectNav.js initialisation
2. Sisyphus initialisation
3. enquire.js listener setup (should be the last call in this script file)

*/


/* =============================================================================
   1.  SelectNav.js initialisation
   ========================================================================== */

enquire.register('screen and (max-width: 599px)', {
	match: function(){},
	setup: function(){
		selectnav('main-navigation-list', {
			activeclass: 'current',
			nested: true,
			indent: ' –',
			label: '► Navigation'
		});
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


/* =============================================================================
   3. enquire.js listener setup (should be the last call in this script file)
   ========================================================================== */

enquire.listen();