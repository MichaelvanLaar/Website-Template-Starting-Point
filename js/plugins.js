/*☺
JavaScript Plugins for [Project name]
*/


// remap jQuery to $
(function($){


/*
 * Skiplink Focus Fix - jQuery Plugin
 */

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


/*
 * Printed Footer Links - jQuery Plugin
 * http://life.mysiteonline.org/archives/191-jQuery-Printed-Footer-Links.html
 */

$(document).ready(function(){
	//get the container and target
	var links = $('#main a[href]:not([href^=#],[href^=mailto],[href^=javascript:],:has(img))');

	if($(links).length){
		//create a container and heading for the footnotes
		var footnotesWrapper = $('<section></section>', {
			css: {
				clear: 'both'
			}
		}).addClass('print-only print-links-footer');
		var footnotesLabel = $('<h3></h3>', {
			text: 'Erwähnte Webseiten'
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


})(this.jQuery);



// usage: log('inside coolFunc',this,arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};



// catch all document.write() calls
(function(doc){
  var write = doc.write;
  doc.write = function(q){ 
    log('document.write(): ',arguments); 
    if (/docwriteregexwhitelist/.test(q)) write.apply(doc,arguments);  
  };
})(document);