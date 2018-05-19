/**
 * =============================================================================
 * Individual JavaScript
 * =============================================================================
 *
 * CONTENTS
 * -----------------------------------------------------------------------------
 *
 * Caching some repeatedly used elements
 * Menu (accordion menu or dropdown menu, according to screen size)
 * ScrollToFixed application
 * Cookie information banner
 * Adding “rel='noopener'” to all links with “target='_blank'” for more security
 * Adding offset to anchor scroll
 */





/**
 * -----------------------------------------------------------------------------
 * Preventing ESLint errors regarding those variables which are defined in
 * plugins.js
 * -----------------------------------------------------------------------------
 */


/* global enquire */





/**
 * -----------------------------------------------------------------------------
 * Caching some repeatedly used elements
 * -----------------------------------------------------------------------------
 */


var mvl_main_navigation = $('.js-main-navigation');
var mvl_main_navigation__helpers = $('.js-main-navigation__helpers');
var mvl_main_navigation__toggle = $('.js-main-navigation__toggle');
var mvl_main_navigation__list = $('.js-main-navigation__list');
var mvl_dropdown_toggles = mvl_main_navigation__list.find('.has-children');
var mvl_dropdown_toggles__a = mvl_dropdown_toggles.children('a');
var mvl_page_footer = $('.js-page-footer');





/**
 * -----------------------------------------------------------------------------
 * Menu (accordion menu or dropdown menu, according to screen size)
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {

    // remove href attribute from all menu links that are used as submenu toggle links
    mvl_dropdown_toggles__a.each(function () {
        var mvl_dropdown_toggle__href = $(this).attr('href');
        $(this).attr('data-target', mvl_dropdown_toggle__href).removeAttr('href');
    });

    // add functionality to toggle icon which reveals the accordion menu
    mvl_main_navigation__toggle.click(function () {
        mvl_main_navigation__helpers.toggleClass('show-submenu');
        mvl_dropdown_toggles.removeClass('show-submenu'); // hide all "inner" accordion submenus
    });

    // accordion resp. dropdown functionality
    mvl_dropdown_toggles__a.click(function () {
        var mvl_dropdown_toggle = $(this).parent('li'); // the <li class="has-children"> which is a direct parent of the clicked <a href="…">
        mvl_dropdown_toggle.toggleClass('show-submenu'); // show resp. hide clicked dropdown menu
        mvl_dropdown_toggle
            .siblings('.show-submenu')
            .removeClass('show-submenu'); // hide all dropdown menus below all siblings of the <li class="has-children"> which is a direct parent of the clicked <a href="…">
        mvl_dropdown_toggle
            .find('.show-submenu')
            .removeClass('show-submenu'); // hide all dropdown menus below clicked <a href="…">
    });

});

// accordion menu for smaller screen sizes
enquire.register('screen and (max-width: 1019px)', {
    match: function () {
        mvl_main_navigation__list.css('max-height', $(window).height() - $(mvl_main_navigation__helpers).outerHeight()); // max height for dropped down menu
        mvl_main_navigation.bind('clickoutside', function () {
            mvl_main_navigation__helpers.removeClass('show-submenu'); // hide accordion menus when the user clicks anywhere outside the menu area
            mvl_dropdown_toggles.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
        });
    },
    unmatch: function () {
        mvl_main_navigation.unbind('clickoutside');
        mvl_main_navigation__toggle.removeClass('show-submenu');
        mvl_main_navigation__list
            .css('max-height', '')
            .find('.show-submenu')
            .removeClass('show-submenu');
        mvl_main_navigation__toggle.removeClass('show-submenu');
    }
});

// dropdown menu for bigger screen sizes
enquire.register('screen and (min-width: 1020px)', {
    match: function () {
        mvl_main_navigation__list.on('clickoutside', function () {
            mvl_dropdown_toggles.removeClass('show-submenu'); // hide all dropdown menus when the user clicks anywhere outside the menu area
        });
    },
    unmatch: function () {
        mvl_main_navigation__list
            .off('clickoutside')
            .find('.show-submenu')
            .removeClass('show-submenu');
    }
});





/**
 * -----------------------------------------------------------------------------
 * ScrollToFixed application
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {
    mvl_main_navigation.scrollToFixed({
        dontSetWidth: true
    });
});





/**
 * -----------------------------------------------------------------------------
 * Adding “rel='noopener'” to all links with “target='_blank'” for more security
 * https://mathiasbynens.github.io/rel-noopener/ for details
 * -----------------------------------------------------------------------------
 */


$(document).ready(function () {
    $('a[target="_blank"]:not([rel="noopener"])').attr('rel', 'noopener');
});





/**
 * -----------------------------------------------------------------------------
 * Adding offset to anchor scroll
 * Mostly taken from https://jsfiddle.net/ianclark001/aShQL/
 * -----------------------------------------------------------------------------
 */


/**
 * Check a href for an anchor. If exists, and in document, scroll to it.
 * If href argument ommited, assumes context (this) is HTML Element,
 * which will be the case when invoked by jQuery after an event
 */
function mvl_add_offset_to_anchor_scroll(href) {
    href = typeof (href) == "string" ? href : $(this).attr('href');

    var mvl_additional_scroll_offset = $('.js-main-navigation').height() * 1.5;

    // If our Href points to a valid, non-empty anchor, and is on the same page
    // Legacy jQuery and IE7 may have issues: http://stackoverflow.com/q/1593174
    if (href.indexOf('#') == 0) {
        var mvl_scroll_target = $(href);

        // Older browser without pushState might flicker here, as they
        // momentarily jump to the wrong position (IE < 10)
        if (mvl_scroll_target.length) {
            $('html, body').animate({ scrollTop: mvl_scroll_target.offset().top - mvl_additional_scroll_offset });
            if (history && 'pushState' in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}

// When a page loads, check to see if it contains and anchor
mvl_add_offset_to_anchor_scroll(window.location.hash);

// Intercept all anchor clicks
$('body').on('click', 'a', mvl_add_offset_to_anchor_scroll);
