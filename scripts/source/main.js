/**
 * =============================================================================
 * Main Script
 *
 * Use build process (see “build:scripts” script in package.json) to transpile,
 * bundle and minify this script.
 * =============================================================================
 */

// Setting up jQuery as a global object is required for some jQuery plugins to
// work properly.
global.jQuery = require("jquery");

// Import partials
require("./main-partials/_add-offset-to-anchor-scroll");
require("./main-partials/_ajax-svg-icons-sprite");
require("./main-partials/_cookie-info-banner");
require("./main-partials/_link-security");
require("./main-partials/_main-navigation");
require("./main-partials/_print-links-as-footnotes");
