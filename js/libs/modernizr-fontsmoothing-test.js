// The following is adapted from...

/*
 * TypeHelpers version 1.0
 * Zoltan Hawryluk, Nov 24 2009.  
 *
 * Released under the MIT License. http://www.opensource.org/licenses/mit-license.php
 *
 * -----------------------
 * (Minimal) configuration
 * -----------------------
 *
 * The script performs the fontsmooting test on all plattforms. However, only Windows XP
 * machines are the problematic ones. The following mini configuration only affects
 * Windows. On a usual Mac or iOS plattform you will always receive the "font smooting
 * is on" result - as far as I tested this.
 *
 * Case 1: Use webfonts for any kind of fontsmooting under Windows
 * ---------------------------------------------------------------
 * By default the script will come to the result that font smooting is active if a
 * browser uses either traditional greyscale fontsmooting or modern subpixel rendering.
 * For big font sizes this should be perfectly OK. No configuration needed.
 *
 * Case 2: Use webfonts only for Windows browsers if ClearType is active
 * ---------------------------------------------------------------------
 * If you use webfonts for the website's copy text, you may want to display webfonts
 * only if a Windows user has ClearType (Windows' subpixel rendering technology) turned
 * on. To find out if a chosen webfont looks OK or crappy in copy text size, you have
 * to test this. By the way, testing a lot (and even a lot more) is always a good idea
 * when using webfonts.
 * But back on topic. To have the script grade Window's greyscale fontsmooting (as I
 * said, MacOS and iOS are not affected by this) as not good enough for webfonts, just
 * replace "32px Arial" with "12px Arial". That's all.
 *
 * (For those who are interested: This changes the size of the test letter which is used
 * to detect if the this letter is displayed in plain back and white or if it includes
 * pixels of other colors. Now the trick is, that Windows with activated greyscale
 * fontsmooting will display 12px Arial the same way as if no fontsmooting was used.
 * MacOS and iOS in contrast to this perform fontsmooting for 32px Arial as well as for
 * 12px Arial. Even if iOS "only" uses greyscale fontsmooting. But since this looks OK,
 * that's not a problem.)
 *
 * Credits and thanks to Lars G. Sehested for coming up with this great configuration idea:
 * http://www.useragentman.com/blog/2009/11/29/how-to-detect-font-smoothing-using-javascript/#comment-2311
 *
 */

Modernizr.addTest('fontsmoothing', function() {
	// IE has screen.fontSmoothingEnabled - sweet!      
	if (typeof(screen.fontSmoothingEnabled) != "undefined") {
		return screen.fontSmoothingEnabled;
	} else {
		try {
			// Create a 35x35 Canvas block.
			var canvasNode = document.createElement("canvas")
			  , test = false
			  , fake = false
			  , root = document.body || (function () {
					fake = true;
					return document.documentElement.appendChild(document.createElement('body'));
			  }());
			
			canvasNode.width = "35";
			canvasNode.height = "35"

			// We must put this node into the body, otherwise 
			// Safari Windows does not report correctly.
			canvasNode.style.display = "none";
			root.appendChild(canvasNode);
			var ctx = canvasNode.getContext("2d");

			// draw a black letter "O", 32px Arial.
			ctx.textBaseline = "top";
			ctx.font = "32px Arial";
			ctx.fillStyle = "black";
			ctx.strokeStyle = "black";

			ctx.fillText("O", 0, 0);

			// start at (8,1) and search the canvas from left to right,
			// top to bottom to see if we can find a non-black pixel.  If
			// so we return true.
			for (var j = 8; j <= 32; j++) {
				for (var i = 1; i <= 32; i++) {
					var imageData = ctx.getImageData(i, j, 1, 1).data;
					var alpha = imageData[3];

					if (alpha != 255 && alpha != 0) {
						test = true; // font-smoothing must be on.
						break;
					}
				}
			}
			
			//clean up
			root.removeChild(canvasNode);
			if (fake) {
				document.documentElement.removeChild(root);
			}
			
			return test;
		}
		catch (ex) {
			root.removeChild(canvasNode);
			if (fake) {
				document.documentElement.removeChild(root);
			}
			// Something went wrong (for example, Opera cannot use the
			// canvas fillText() method.  Return false.
			return false;
		}
	}
});