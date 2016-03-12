# Website Template Starting Point 3.4.1

CSS frameworks are not everybody’s cup of tea. Some web designers rather like to write their own code because they don’t want to bow to external specifications. They want to have full control over architectural principles as well as coding and naming conventions – instead of overwriting predefined default styles over and over to achieve the desired result.

If you are one of these web designers, this starting point for building websites resp. CMS templates is for you. It is based on the renowned HTML5 Boilerplate, enhanced and extended with lots of stuff which proved to be useful in many website projects over the last years. It was created as design agnostic as possible, featuring an adaptive layout with a mobile first approach.

**See a demo: <http://dev.michaelvanlaar.de/wtsp/>**  
(It’s only one page, so don’t expect something fancy.)

----

*Please note that the files `styles/css/main.css` as well as `js/plugins.js` and `js/main.js` should be minified before they are used as part of a live website – either using a [build](https://www.npmjs.com/package/grunt-contrib-cssmin) [process](https://www.npmjs.com/package/grunt-contrib-uglify), a [minify extension for your editor](https://packagecontrol.io/packages/Minify) or a [CMS module](http://modules.processwire.com/modules/all-in-one-minify/). To minify `styles/css/main.css` you can also use the output style “compressed” when compiling the Sass files.*

----

*You can read the documentation of the used Sass variables, mixins and functions by opening `styles/sassdoc/index.html` in your browser.*

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
* Skiplink focus fix
* Remove telephone number styling inserted by the Skype browser plug-in.
* URLs of links appear as footnotes in print layout.
* Cookie information banner

## Browser compatibility

The Website Template Starting Point supports all modern browsers as well as Internet Explorer 10 and above. Please note that Internet Explorer 9 and below are no longer supported due to their lack of important features and their low market share.

## Based on

* [HTML5 Boilerplate 5.3.0](http://html5boilerplate.com/)

## Used frameworks and libraries

### CSS / Sass

* [normalize.scss 4.0.3](https://github.com/JohnAlbin/normalize-scss)
* [support-for 1.0.3](https://github.com/JohnAlbin/support-for)

### JavaScript

* [respimage 1.3.0](https://github.com/aFarkas/respimage)
* [lazysizes 1.0.0-RC2](https://github.com/aFarkas/lazysizes)
* [enquire.js 2.1.2](https://github.com/WickyNilliams/enquire.js)
* [JavaScript Cookie 2.1.0](https://github.com/js-cookie/js-cookie)
* [jQuery 2.2.1](http://jquery.com/)
* [jQuery Placeholder Enhanced 1.6.9](https://github.com/dciccale/placeholder-enhanced)
* [Sisyphus 1.1.2](https://github.com/simsalabim/sisyphus)
* [jQuery outside events 1.1](https://github.com/cowboy/jquery-outside-events)
* [ScrollToFixed 1.0.6](https://github.com/bigspotteddog/ScrollToFixed)

## Used Tools

* [Sass 3.4.20](http://sass-lang.com/)
* [Autoprefixer](https://github.com/postcss/autoprefixer)
* [CSScomb 3.0.0](http://csscomb.com/)
* [SassDoc 2.0](http://sassdoc.com/)
* [EditorConfig](http://editorconfig.org/)
* [RealFaviconGenerator](http://realfavicongenerator.net/)

## Code conventions

* [CSS Guidelines by Harry Roberts 2.2.3](http://cssguidelin.es/)
* [Sass Guidelines by Hugo Giraudel 1.2](http://sass-guidelin.es/)
