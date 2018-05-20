/**
 * =============================================================================
 * Main navigation
 *
 * - Sticky position at the top when the page is scrolled down
 * - Accordion menu or dropdown menu, according to screen size
 * =============================================================================
 */

// This script requires jQuery to be required as a global object in main.js

require("../jquery-plugins/jquery-scrolltofixed");
const enquire = require("enquire.js");
require("../jquery-plugins/jquery-outside-events");

const mvl_main_navigation = $(".js-main-navigation");
const mvl_main_navigation__helpers = $(".js-main-navigation__helpers");
const mvl_main_navigation__toggle = $(".js-main-navigation__toggle");
const mvl_main_navigation__list = $(".js-main-navigation__list");
const mvl_dropdown_toggles = mvl_main_navigation__list.find(".has-children");
const mvl_dropdown_toggles__a = mvl_dropdown_toggles.children("a");

/**
 * -----------------------------------------------------------------------------
 * Sticky position at the top when the page is scrolled down
 * -----------------------------------------------------------------------------
 */

mvl_main_navigation.scrollToFixed({
  dontSetWidth: true
});

/**
 * -----------------------------------------------------------------------------
 * Accordion menu or dropdown menu, according to screen size
 * -----------------------------------------------------------------------------
 */

// Remove href attribute from all menu links which are used as submenu toggle
// links
mvl_dropdown_toggles__a.each(function() {
  const mvl_dropdown_toggle__href = $(this).attr("href");
  $(this)
    .attr("data-target", mvl_dropdown_toggle__href)
    .removeAttr("href");
});

// Add functionality to toggle icon which reveals the accordion menu
mvl_main_navigation__toggle.click(() => {
  mvl_main_navigation__helpers.toggleClass("show-submenu");
  // Hide all "inner" accordion submenus
  mvl_dropdown_toggles.removeClass("show-submenu");
});

// Accordion resp. dropdown functionality
mvl_dropdown_toggles__a.click(function() {
  // The <li class="has-children"> which is a direct parent of the clicked
  // <a href="…">
  const mvl_dropdown_toggle = $(this).parent("li");
  // Show resp. hide clicked dropdown menu
  mvl_dropdown_toggle.toggleClass("show-submenu");
  // Hide all dropdown menus below all siblings of the <li class="has-children">
  // which is a direct parent of the clicked <a href="…">
  mvl_dropdown_toggle.siblings(".show-submenu").removeClass("show-submenu");
  // Hide all dropdown menus below clicked <a href="…">
  mvl_dropdown_toggle.find(".show-submenu").removeClass("show-submenu");
});

// Accordion menu for smaller screen sizes
enquire.register("screen and (max-width: 1019px)", {
  match() {
    // Set max. height for dropped down menu
    mvl_main_navigation__list.css(
      "max-height",
      $(window).height() - $(mvl_main_navigation__helpers).outerHeight()
    );
    mvl_main_navigation.bind("clickoutside", () => {
      // Hide accordion menus when the user clicks outside the menu area
      mvl_main_navigation__helpers.removeClass("show-submenu");
      // Hide all dropdown menus when the user clicks outside the menu area
      mvl_dropdown_toggles.removeClass("show-submenu");
    });
  },
  unmatch() {
    mvl_main_navigation.unbind("clickoutside");
    mvl_main_navigation__toggle.removeClass("show-submenu");
    mvl_main_navigation__list
      .css("max-height", "")
      .find(".show-submenu")
      .removeClass("show-submenu");
    mvl_main_navigation__toggle.removeClass("show-submenu");
  }
});

// Dropdown menu for bigger screen sizes
enquire.register("screen and (min-width: 1020px)", {
  match() {
    mvl_main_navigation__list.on("clickoutside", () => {
      // Hide all dropdown menus when the user clicks outside the menu area
      mvl_dropdown_toggles.removeClass("show-submenu");
    });
  },
  unmatch() {
    mvl_main_navigation__list
      .off("clickoutside")
      .find(".show-submenu")
      .removeClass("show-submenu");
  }
});
