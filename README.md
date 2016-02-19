# Website Template Starting Point 3.3.5

CSS frameworks are not everybody’s cup of tea. Some web designers rather like to write their own code because they don’t want to bow to external specifications. They want to have full control over architectural principles as well as coding and naming conventions – instead of overwriting predefined default styles over and over to achieve the desired result.

If you are one of these web designers, this starting point for building websites resp. CMS templates is for you. It is based on the renowned HTML5 Boilerplate, enhanced and extended with lots of stuff which proved to be useful in many website projects over the last years. It was created as design agnostic as possible, featuring an adaptive layout with a mobile first approach.

**See a demo: <http://dev.michaelvanlaar.de/wtsp/>**  
(It’s only one page, so don’t expect something fancy.)

Version 3.3.5 was published on February 16, 2016.

----

*Please note that the files `css/normalize.css` and `css/main.css` as well as `js/plugins.js` and `js/main.js` should be minified before they are used as part of a live website – either using a [build](https://www.npmjs.com/package/grunt-contrib-cssmin) [process](https://www.npmjs.com/package/grunt-contrib-uglify), a [minify extension for your editor](https://packagecontrol.io/packages/Minify) or a [CMS module](http://modules.processwire.com/modules/all-in-one-minify/).*

----

## Some of the features

* Adaptive layout
* Mobile first approach
* As design agnostic as possible
* Preconfigured three level menu as main navigation
  * Implemented as accordion menu for smaller screens
  * Implemented as dropdown menu for bigger screens
  * Submenus appear on click/tab to avoid :hover problem on touchscreens
  * Fully usable fallback layout for browsers with no JavaScript activated
* Layout can be scaled (e.g. to better fill high resolution screens) simply by adjusting the base font size.
* Additional scrolling if URI contains a fragment identifier, so that the fixed navigation bar doesn’t overlay targeted content
* Skiplink focus fix
* Remove telephone number styling inserted by the Skype browser plug-in.
* URLs of links appear as footnotes in print layout.
* Cookie information banner

## Based on

* [HTML5 Boilerplate 5.0.0](http://html5boilerplate.com/)

## Used frameworks and libraries

### CSS / Sass

* [normalize.scss 4.0.3](https://github.com/JohnAlbin/normalize-scss)
* [support-for 1.0.3](https://github.com/JohnAlbin/support-for)

### JavaScript

* [Modernizr 2.8.3](http://modernizr.com/)
* [Type Rendering Mix 1.1.0](https://github.com/bramstein/trmix)
* [enquire.js 2.1.1](https://github.com/WickyNilliams/enquire.js)
* [jQuery 1.11.2](http://jquery.com/)
* [jQuery Cookie Plugin 1.4.1](https://github.com/carhartl/jquery-cookie)
* [jQuery Placeholder Enhanced 1.6.9](https://github.com/dciccale/placeholder-enhanced)
* [Sisyphus 1.1.107](https://github.com/simsalabim/sisyphus)
* [jQuery outside events 1.1](http://benalman.com/projects/jquery-outside-events-plugin/)
* [jquery.animate-enhanced plugin 1.10](https://github.com/benbarnett/jQuery-Animate-Enhanced)
* [ScrollToFixed 1.0.6](https://github.com/bigspotteddog/ScrollToFixed)
* [lazysizes 1.0.0-RC2](https://github.com/aFarkas/lazysizes)

### Polyfills

* [Respond.js v1.4.2](https://github.com/scottjehl/Respond)
* [matchMedia()](https://github.com/paulirish/matchMedia.js) (included in Respond.js)
* [respimage 1.3.0](https://github.com/aFarkas/respimage)
* [REM unit 1.3.2](https://github.com/chuckcarpenter/REM-unit-polyfill)
* [selectivizr 1.0.2](http://selectivizr.com/)

## Code conventions and tools

* [CSS Guidelines by Harry Roberts 2.2.3](http://cssguidelin.es/)
* [CSScomb 3.0.0](http://csscomb.com/)
* [EditorConfig](http://editorconfig.org/)
